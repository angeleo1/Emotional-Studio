'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BlendTextProps {
  text: string;
  className?: string;
}

export default function BlendText({ text, className = '' }: BlendTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !textRef.current) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create background texture from text
    const createTextTexture = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const { width, height } = textRef.current!.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = 'white';
      ctx.font = window.getComputedStyle(textRef.current!).font;
      ctx.fillText(text, 0, height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: createTextTexture() },
        uBackground: { value: new THREE.Color(0xffffff) },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uBackground;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          vec4 texel = texture2D(tDiffuse, vUv);
          vec3 color = mix(uBackground, vec3(1.0) - uBackground, texel.r);
          gl_FragColor = vec4(color, texel.a);
        }
      `,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current) return;
      
      const rect = containerRef.current!.getBoundingClientRect();
      const { width, height } = rect;
      
      rendererRef.current.setSize(width, height);
      material.uniforms.uTime.value += 0.01;

      // Get background color at current position
      const elementAtPoint = document.elementFromPoint(rect.left + width / 2, rect.top + height / 2);
      if (elementAtPoint) {
        const bgColor = window.getComputedStyle(elementAtPoint).backgroundColor;
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          material.uniforms.uBackground.value = new THREE.Color(
            parseInt(rgb[0]) / 255,
            parseInt(rgb[1]) / 255,
            parseInt(rgb[2]) / 255
          );
        }
      }

      rendererRef.current.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
    };
  }, [text]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div
        ref={textRef}
        className="invisible"
        aria-hidden="true"
      >
        {text}
      </div>
      <span className="relative z-10">{text}</span>
    </div>
  );
} 