"use client";

import React, { useEffect, useRef, useState, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface RippleProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none select-none absolute inset-0 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.03;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`absolute animate-ripple rounded-full bg-foreground/25 shadow-xl border [--i:${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "1px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 100})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";

function SplashCursor({
  SIM_RESOLUTION = 256,
  DYE_RESOLUTION = 1024,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 0.97,
  VELOCITY_DISSIPATION = 0.98,
  PRESSURE = 0.8,
  PRESSURE_ITERATIONS = 20,
  CURL = 30,
  SPLAT_RADIUS = 0.25,
  SPLAT_FORCE = 6000,
  SUPPORT_FLOAT_TEXTURES = false,
  SHADING = true,
  COLORFUL = true,
  COLOR_UPDATE_SPEED = 10,
  PAUSED = false,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = false,
  BLOOM = true,
  BLOOM_ITERATIONS = 8,
  BLOOM_RESOLUTION = 256,
  BLOOM_INTENSITY = 0.8,
  BLOOM_THRESHOLD = 0.6,
  BLOOM_SOFT_KNEE = 0.7,
  SUNRAYS = true,
  SUNRAYS_RESOLUTION = 196,
  SUNRAYS_WEIGHT = 1.0
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isFirstMove = useRef(true);
  const [isHolding, setIsHolding] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);
  const lastTouchTime = useRef(0);
  const [showStaticElements, setShowStaticElements] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl) {
      console.error("Unable to initialize WebGL");
      return;
    }

    let pointers: Pointer[] = [{
      id: -1,
      texcoordX: 0,
      texcoordY: 0,
      prevTexcoordX: 0,
      prevTexcoordY: 0,
      deltaX: 0,
      deltaY: 0,
      down: false,
      moved: false,
      color: { r: 0, g: 0, b: 0 }
    }];
    
    const updatePointerDownData = (pointer: Pointer, id: number, posX: number, posY: number, canvas: HTMLCanvasElement) => {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    };
    
    const updatePointerMoveData = (pointer: Pointer, posX: number, posY: number, color: { r: number; g: number; b: number }, canvas: HTMLCanvasElement) => {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX, canvas, gl.drawingBufferWidth);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY, canvas, gl.drawingBufferHeight);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    };
    
    const updatePointerUpData = (pointer: Pointer) => {
      pointer.down = false;
    };

    const correctDeltaX = (delta: number, canvas: HTMLCanvasElement, width: number) => {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) delta *= aspectRatio;
      return delta;
    }
    
    const correctDeltaY = (delta: number, canvas: HTMLCanvasElement, height: number) => {
      let aspectRatio = canvas.width / canvas.height;
      if (aspectRatio > 1) delta /= aspectRatio;
      return delta;
    }

    const getWebGLContext = (canvas: HTMLCanvasElement): { gl: WebGLRenderingContext | WebGL2RenderingContext | null, ext: any } => {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
      let isWebGL2 = !!gl;
      if (!isWebGL2) {
        gl = canvas.getContext('webgl', params) as WebGLRenderingContext | null;
      }
      if (!gl) return { gl: null, ext: null };
    
      let halfFloat, supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      const halfFloatTexType = isWebGL2 ? (gl as WebGL2RenderingContext).HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      let formatRGBA, formatRG, formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RGBA16F, (gl as WebGL2RenderingContext).RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, (gl as WebGL2RenderingContext).RG16F, (gl as WebGL2RenderingContext).RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, (gl as WebGL2RenderingContext).R16F, (gl as WebGL2RenderingContext).RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering
    }
      };
    };

    const getSupportedFormat = (gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: any, format: any, type: any) => {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case (gl as WebGL2RenderingContext).R16F:
            return getSupportedFormat(gl, gl.RGBA, gl.RGBA, type);
          case (gl as WebGL2RenderingContext).RG16F:
            return getSupportedFormat(gl, gl.RGBA, gl.RGBA, type);
          case (gl as WebGL2RenderingContext).RGBA16F:
            return getSupportedFormat(gl, gl.RGBA, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat, format };
      };

    const supportRenderTextureFormat = (gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: any, format: any, type: any) => {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
    
      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
      return status === gl.FRAMEBUFFER_COMPLETE;
    };
    
    const clickSplat = (pointer: Pointer, canvas: HTMLCanvasElement) => {
      splat(pointer.texcoordX, pointer.texcoordY, pointer.deltaX, pointer.deltaY, pointer.color, canvas);
    };

    const updateFrame = () => {
      // implementation details
    };

    window.addEventListener("mousedown", (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointer, -1, posX, posY, canvas);
      clickSplat(pointer, canvas);
    });

    document.body.addEventListener(
      "mousemove",
      function handleFirstMouseMove(e: MouseEvent) {
        let pointer = pointers[0];
        let posX = scaleByPixelRatio(e.clientX);
        let posY = scaleByPixelRatio(e.clientY);
        let color = generateColor();
        updateFrame();
        updatePointerMoveData(pointer, posX, posY, color, canvas);
        document.body.removeEventListener("mousemove", handleFirstMouseMove);
      }
    );

    window.addEventListener("mousemove", (e: MouseEvent) => {
      let pointer = pointers[0];
      let posX = scaleByPixelRatio(e.clientX);
      let posY = scaleByPixelRatio(e.clientY);
      let color = pointer.color;
      updatePointerMoveData(pointer, posX, posY, color, canvas);
    });

    document.body.addEventListener(
      "touchstart",
      function handleFirstTouchStart(e: TouchEvent) {
        const touches = e.targetTouches;
        let pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          let posX = scaleByPixelRatio(touches[i].clientX);
          let posY = scaleByPixelRatio(touches[i].clientY);
          updateFrame();
          updatePointerDownData(pointer, touches[i].identifier, posX, posY, canvas);
        }
        document.body.removeEventListener("touchstart", handleFirstTouchStart);
      }
    );

    window.addEventListener("touchstart", (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        let posX = scaleByPixelRatio(touches[i].clientX);
        let posY = scaleByPixelRatio(touches[i].clientY);
        updatePointerDownData(pointer, touches[i].identifier, posX, posY, canvas);
      }
    });

    window.addEventListener(
      "touchmove",
      (e: TouchEvent) => {
        e.preventDefault();
        const touches = e.targetTouches;
        let pointer = pointers[0];
        for (let i = 0; i < touches.length; i++) {
          let posX = scaleByPixelRatio(touches[i].clientX);
          let posY = scaleByPixelRatio(touches[i].clientY);
          updatePointerMoveData(pointer, posX, posY, pointer.color, canvas);
        }
      },
      false
    );

    window.addEventListener("touchend", (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.changedTouches;
      let pointer = pointers[0];
      for (let i = 0; i < touches.length; i++) {
        updatePointerUpData(pointer);
      }
    });

    updateFrame();
  }, [
    SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION, DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, SPLAT_RADIUS,
    SPLAT_FORCE, SUPPORT_FLOAT_TEXTURES, SHADING, COLORFUL, COLOR_UPDATE_SPEED,
    PAUSED, BACK_COLOR, TRANSPARENT, BLOOM, BLOOM_ITERATIONS,
    BLOOM_RESOLUTION, BLOOM_INTENSITY, BLOOM_THRESHOLD, BLOOM_SOFT_KNEE,
    SUNRAYS, SUNRAYS_RESOLUTION, SUNRAYS_WEIGHT
  ]);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

function SplashCursorDemo() {
  return (
    <div className="relative h-screen w-full bg-background overflow-hidden">
      <style jsx global>{`
        @keyframes ripple {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.9);
          }
        }
        .animate-ripple {
          animation: ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite;
        }
      `}</style>
      
      <SplashCursor />
      
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-foreground">
            스플래시 커서
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            마우스를 움직이거나 클릭하여 아름다운 유체 시뮬레이션 효과를 경험해보세요
          </p>
          <div className="relative">
            <Ripple />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashCursorDemo; 