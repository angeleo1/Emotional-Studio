"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  isExplosion?: boolean;
}

interface ParticleConfig {
  text: string;
  particleSize: number;
  animationSpeed: number;
  mouseForce: number;
  interactionMode: 'attract' | 'repel';
}

interface ParticleTextEffectProps {
  text?: string;
  className?: string;
}

// WebGL Shader sources
const vertexShaderSource = `
  precision mediump float;
  
  attribute vec2 a_position;
  attribute float a_size;
  attribute float a_opacity;
  
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  varying float v_opacity;
  varying vec2 v_position;
  
  void main() {
    vec2 position = (a_position / u_resolution) * 2.0 - 1.0;
    position.y *= -1.0;
    
    gl_Position = vec4(position, 0.0, 1.0);
    gl_PointSize = a_size;
    
    v_opacity = a_opacity;
    v_position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform float u_time;
  
  varying float v_opacity;
  varying vec2 v_position;
  
  void main() {
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    
    if (dist > 0.5) {
      discard;
    }
    
    // Enhanced glow effect with multiple layers
    float innerGlow = 1.0 - smoothstep(0.0, 0.2, dist);
    float outerGlow = 1.0 - smoothstep(0.2, 0.5, dist);
    float glow = pow(innerGlow, 3.0) + pow(outerGlow, 1.5) * 0.6;
    
    // Mouse interaction effects
    float mouseDist = distance(v_position, u_mouse);
    float mouseGlow = 1.0 / (1.0 + mouseDist * 0.008);
    float mouseIntensity = smoothstep(300.0, 0.0, mouseDist);
    
    // Enhanced color gradient with better text definition
    vec3 primaryColor = vec3(1.0, 0.5, 0.0);
    vec3 secondaryColor = vec3(1.0, 0.3, 0.0);
    vec3 accentColor = vec3(1.0, 0.7, 0.2);
    vec3 glowColor = vec3(1.0, 0.6, 0.1);
    vec3 coreColor = vec3(1.0, 0.9, 0.7);
    
    // Multi-layered color mixing
    float timeWave = sin(u_time * 0.0008) * 0.5 + 0.5;
    float positionGradient = (v_position.x / u_resolution.x + v_position.y / u_resolution.y) * 0.5;
    
    vec3 baseColor = mix(primaryColor, secondaryColor, timeWave);
    baseColor = mix(baseColor, accentColor, positionGradient * 0.3);
    
    // Core particle color (bright center)
    vec3 color = mix(baseColor, coreColor, innerGlow * 0.8);
    
    // Mouse interaction coloring
    color = mix(color, glowColor, mouseGlow * mouseIntensity * 0.6);
    
    // Particle bloom effect
    float bloom = glow * (1.0 + mouseGlow * 0.8);
    float finalAlpha = bloom * v_opacity * (0.9 + mouseIntensity * 0.4);
    
    gl_FragColor = vec4(color, finalAlpha);
  }
`;

// Post-processing shader for bloom and film grain
const postVertexShader = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = (a_position + 1.0) * 0.5;
  }
`;

const postFragmentShader = `
  precision mediump float;
  
  uniform sampler2D u_texture;
  uniform vec2 u_texelSize;
  uniform float u_time;
  uniform vec2 u_resolution;
  
  varying vec2 v_texCoord;
  
  // Random function for film grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Film grain noise
  float filmGrain(vec2 uv, float time) {
    float grain = random(uv + time * 0.001);
    grain = pow(grain, 1.5);
    return grain * 0.1; // Grain intensity
  }
  
  void main() {
    vec4 color = texture2D(u_texture, v_texCoord);
    
    // Multi-pass bloom effect
    vec4 bloom = vec4(0.0);
    float totalWeight = 0.0;
    
    // Bloom sampling with gaussian weights
    for (int i = -4; i <= 4; i++) {
      for (int j = -4; j <= 4; j++) {
        vec2 offset = vec2(float(i), float(j)) * u_texelSize * 2.5;
        vec4 sample = texture2D(u_texture, v_texCoord + offset);
        
        float weight = exp(-float(i*i + j*j) * 0.2);
        bloom += sample * weight;
        totalWeight += weight;
      }
    }
    bloom /= totalWeight;
    
    // Enhanced bloom for bright particles
    vec4 brightPass = max(color - 0.4, 0.0) * 3.0;
    bloom = bloom + brightPass * 0.9;
    
    // Film grain
    float grain = filmGrain(v_texCoord * u_resolution, u_time);
    
    // Chromatic aberration for retro effect
    vec2 center = v_texCoord - 0.5;
    float aberration = length(center) * 0.015;
    
    vec4 r = texture2D(u_texture, v_texCoord + center * aberration * vec2(1.0, 0.0));
    vec4 g = texture2D(u_texture, v_texCoord);
    vec4 b = texture2D(u_texture, v_texCoord - center * aberration * vec2(0.0, 1.0));
    
    vec4 aberrated = vec4(r.r, g.g, b.b, g.a);
    
    // Vignette effect
    float vignette = 1.0 - length(center) * 0.8;
    vignette = smoothstep(0.3, 1.0, vignette);
    
    // Final composition
    vec4 final = aberrated + bloom * 0.6;
    final.rgb += grain;
    final.rgb *= vignette;
    
    // Color grading for cinematic look
    final.rgb = pow(final.rgb, vec3(0.9)); // Slight gamma adjustment
    final.rgb = mix(final.rgb, final.rgb * vec3(1.1, 0.95, 1.05), 0.3); // Color tint
    
    gl_FragColor = final;
  }
`;

const ParticleTextEffect = ({ text = "Capture the moment", className }: ParticleTextEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const postProgramRef = useRef<WebGLProgram | null>(null);
  const framebufferRef = useRef<WebGLFramebuffer | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const buffersRef = useRef<{
    position: WebGLBuffer | null;
    size: WebGLBuffer | null;
    opacity: WebGLBuffer | null;
  }>({ position: null, size: null, opacity: null });

  const [config, setConfig] = useState<ParticleConfig>({
    text,
    particleSize: 0.05,
    animationSpeed: 1.5,
    mouseForce: 250,
    interactionMode: 'repel'
  });

  useEffect(() => {
    setConfig((prev) => ({ ...prev, text }));
  }, [text]);

  // --- AppleHelloEffect 내부 함수들 복사 시작 ---
  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = webglCanvasRef.current;
    if (!canvas) return false;
    const gl = canvas.getContext('webgl', { 
      alpha: true, 
      premultipliedAlpha: false,
      antialias: true,
      preserveDrawingBuffer: false
    });
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }
    glRef.current = gl;
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return false;
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return false;
    programRef.current = program;
    const postVertex = createShader(gl, gl.VERTEX_SHADER, postVertexShader);
    const postFragment = createShader(gl, gl.FRAGMENT_SHADER, postFragmentShader);
    if (!postVertex || !postFragment) return false;
    const postProgram = createProgram(gl, postVertex, postFragment);
    if (!postProgram) return false;
    postProgramRef.current = postProgram;
    const framebuffer = gl.createFramebuffer();
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      console.error('Framebuffer not complete');
      return false;
    }
    framebufferRef.current = framebuffer;
    textureRef.current = texture;
    buffersRef.current = {
      position: gl.createBuffer(),
      size: gl.createBuffer(),
      opacity: gl.createBuffer()
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    return true;
  }, [createShader, createProgram]);

  const createParticlesFromText = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    particlesRef.current = [];
    const lines = (config.text || '').split('\n');
    const fontSize = Math.min(140, window.innerWidth / 7);
    ctx.font = `bold ${fontSize}px Montserrat, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const totalHeight = fontSize * lines.length + (lines.length - 1) * fontSize * 0.3;
    const startY = canvas.height / 2 - totalHeight / 2 + fontSize / 2;
    lines.forEach((line, idx) => {
      const textWidth = ctx.measureText(line).width;
      const startX = canvas.width / 2;
      const y = startY + idx * (fontSize * 1.3);
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      tempCanvas.width = textWidth + 100;
      tempCanvas.height = fontSize + 50;
      tempCtx.font = ctx.font;
      tempCtx.fillStyle = '#FFFFFF';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(line, tempCanvas.width / 2, tempCanvas.height / 2);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;
      const step = 2;
      for (let y2 = 0; y2 < tempCanvas.height; y2 += step) {
        for (let x2 = 0; x2 < tempCanvas.width; x2 += step) {
          const index = (y2 * tempCanvas.width + x2) * 4;
          const alpha = data[index + 3];
          if (alpha > 128) {
            const particleX = startX + x2 - tempCanvas.width / 2;
            const particleY = y + y2 - tempCanvas.height / 2;
            particlesRef.current.push({
              x: particleX + (Math.random() - 0.5) * 120,
              y: particleY + (Math.random() - 0.5) * 120,
              targetX: particleX,
              targetY: particleY,
              originalX: particleX,
              originalY: particleY,
              vx: 0,
              vy: 0,
              size: config.particleSize + Math.random() * 3,
              opacity: Math.random() * 0.4 + 0.6,
              life: 1
            });
          }
        }
      }
    });
  }, [config.text, config.particleSize]);

  const updateParticle = useCallback((particle: Particle) => {
    const mouse = mouseRef.current;
    if (particle.isExplosion) {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.96;
      particle.vy *= 0.96;
      particle.life -= 0.025;
      particle.opacity = Math.max(0, particle.life);
      return;
    }
    const dx = mouse.x - particle.x;
    const dy = mouse.y - particle.y;
    const distanceSquared = dx * dx + dy * dy;
    const mouseForceSquared = config.mouseForce * config.mouseForce;
    if (distanceSquared < mouseForceSquared) {
      const distance = Math.sqrt(distanceSquared);
      const force = (config.mouseForce - distance) / config.mouseForce;
      const angle = Math.atan2(dy, dx);
      const forceMultiplier = config.interactionMode === 'attract' ? 1 : -1;
      particle.vx += Math.cos(angle) * force * 3 * forceMultiplier;
      particle.vy += Math.sin(angle) * force * 3 * forceMultiplier;
    }
    const returnForceX = (particle.targetX - particle.x) * 0.04 * config.animationSpeed;
    const returnForceY = (particle.targetY - particle.y) * 0.04 * config.animationSpeed;
    particle.vx += returnForceX;
    particle.vy += returnForceY;
    particle.vx *= 0.94;
    particle.vy *= 0.94;
    particle.x += particle.vx;
    particle.y += particle.vy;
  }, [config.mouseForce, config.animationSpeed, config.interactionMode]);

  const renderWebGL = useCallback((currentTime: number) => {
    const gl = glRef.current;
    const program = programRef.current;
    const postProgram = postProgramRef.current;
    const canvas = webglCanvasRef.current;
    if (!gl || !program || !postProgram || !canvas) return;
    const particles = particlesRef.current;
    if (particles.length === 0) return;
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferRef.current);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.094, 0.094, 0.106, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
    gl.uniform1f(timeLocation, currentTime);
    const positions = new Float32Array(particles.length * 2);
    const sizes = new Float32Array(particles.length);
    const opacities = new Float32Array(particles.length);
    for (let i = 0; i < particles.length; i++) {
      positions[i * 2] = particles[i].x;
      positions[i * 2 + 1] = particles[i].y;
      sizes[i] = particles[i].size * 7;
      opacities[i] = particles[i].opacity;
    }
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const sizeLocation = gl.getAttribLocation(program, 'a_size');
    const opacityLocation = gl.getAttribLocation(program, 'a_opacity');
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.position);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.size);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(sizeLocation);
    gl.vertexAttribPointer(sizeLocation, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffersRef.current.opacity);
    gl.bufferData(gl.ARRAY_BUFFER, opacities, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(opacityLocation);
    gl.vertexAttribPointer(opacityLocation, 1, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.POINTS, 0, particles.length);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(postProgram);
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]);
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    const postPositionLocation = gl.getAttribLocation(postProgram, 'a_position');
    gl.enableVertexAttribArray(postPositionLocation);
    gl.vertexAttribPointer(postPositionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
    const textureLocation = gl.getUniformLocation(postProgram, 'u_texture');
    const texelSizeLocation = gl.getUniformLocation(postProgram, 'u_texelSize');
    const postTimeLocation = gl.getUniformLocation(postProgram, 'u_time');
    const postResolutionLocation = gl.getUniformLocation(postProgram, 'u_resolution');
    gl.uniform1i(textureLocation, 0);
    gl.uniform2f(texelSizeLocation, 1.0 / canvas.width, 1.0 / canvas.height);
    gl.uniform1f(postTimeLocation, currentTime);
    gl.uniform2f(postResolutionLocation, canvas.width, canvas.height);
    gl.disable(gl.BLEND);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.enable(gl.BLEND);
    gl.deleteBuffer(quadBuffer);
  }, []);

  const animate = useCallback((currentTime: number) => {
    particlesRef.current = particlesRef.current.filter(particle => {
      updateParticle(particle);
      return !particle.isExplosion || particle.life > 0;
    });
    renderWebGL(currentTime);
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticle, renderWebGL]);

  const handleCanvasResize = useCallback(() => {
    const canvas = canvasRef.current;
    const webglCanvas = webglCanvasRef.current;
    if (!canvas || !webglCanvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    webglCanvas.width = window.innerWidth;
    webglCanvas.height = window.innerHeight;
    const gl = glRef.current;
    if (gl && textureRef.current) {
      gl.viewport(0, 0, webglCanvas.width, webglCanvas.height);
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, webglCanvas.width, webglCanvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }
    createParticlesFromText();
  }, [createParticlesFromText]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const mouse = mouseRef.current;
    const explosionParticles = 120;
    for (let i = 0; i < explosionParticles; i++) {
      const angle = (Math.PI * 2 * i) / explosionParticles;
      const velocity = 4 + Math.random() * 60;
      particlesRef.current.push({
        x: mouse.x,
        y: mouse.y,
        targetX: mouse.x,
        targetY: mouse.y,
        originalX: mouse.x,
        originalY: mouse.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: config.particleSize * 0.4,
        opacity: 1,
        life: 1,
        isExplosion: true
      });
    }
    particlesRef.current.forEach(particle => {
      if (particle.isExplosion) return;
      const dx = particle.x - mouse.x;
      const dy = particle.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 120) {
        const force = (120 - distance) / 120;
        const angle = Math.atan2(dy, dx);
        particle.vx += Math.cos(angle) * force * 90;
        particle.vy += Math.sin(angle) * force * 90;
      }
    });
  }, [config.particleSize]);

  useEffect(() => {
    if (initWebGL()) {
      handleCanvasResize();
      window.addEventListener('resize', handleCanvasResize);
      return () => {
        window.removeEventListener('resize', handleCanvasResize);
      };
    }
  }, [initWebGL, handleCanvasResize]);

  useEffect(() => {
    createParticlesFromText();
  }, [createParticlesFromText]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  // ... existing code ...

  return (
    <div className={className ? `relative w-full h-screen overflow-hidden bg-[#18181b] ${className}` : "relative w-full h-screen overflow-hidden bg-[#18181b]"}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
      />
      <canvas
        ref={webglCanvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default ParticleTextEffect; 