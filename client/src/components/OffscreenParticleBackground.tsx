import React, { useEffect, useRef } from 'react';

export default function OffscreenParticleBackground({ isThinking = false }: { isThinking?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const fallbackAnimRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if OffscreenCanvas is supported
    if ('OffscreenCanvas' in window && 'transferControlToOffscreen' in canvas) {
      try {
        const offscreen = canvas.transferControlToOffscreen();
        const worker = new Worker(new URL('../lib/canvasWorker.ts', import.meta.url), { type: 'module' });
        workerRef.current = worker;

        worker.postMessage(
          {
            type: 'init',
            offscreen,
            newWidth: window.innerWidth,
            newHeight: window.innerHeight,
          },
          [offscreen]
        );

        const handleResize = () => {
          worker.postMessage({
            type: 'resize',
            newWidth: window.innerWidth,
            newHeight: window.innerHeight,
          });
        };

        const handleMouseMove = (e: MouseEvent) => {
          worker.postMessage({
            type: 'mousemove',
            x: e.clientX,
            y: e.clientY,
          });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('mousemove', handleMouseMove);
          worker.terminate();
        };
      } catch (err) {
        console.warn('OffscreenCanvas transfer failed, using fallback canvas rendering', err);
        initFallbackCanvas(canvas);
      }
    } else {
      console.warn('OffscreenCanvas not supported, using fallback canvas rendering');
      initFallbackCanvas(canvas);
    }

    return () => {
      if (fallbackAnimRef.current) {
        cancelAnimationFrame(fallbackAnimRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'thinking', thinking: isThinking });
    }
  }, [isThinking]);

  // Fallback rendering for browsers without OffscreenCanvas support
  const initFallbackCanvas = (canvas: HTMLCanvasElement) => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    const colors = ['#06b6d4', '#a855f7', '#3b82f6', '#10b981'];

    const count = Math.min(Math.floor((width * height) / 15000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      fallbackAnimRef.current = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
  };

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full opacity-60" />;
}
