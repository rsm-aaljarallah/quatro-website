// Web Worker for OffscreenCanvas particle physics simulation
let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let width = 800;
let height = 600;
let mouseX = 0;
let mouseY = 0;
let isThinking = false;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  color: string;
}

const particles: Particle[] = [];
const colors = ['#06b6d4', '#a855f7', '#3b82f6', '#10b981']; // cyan, purple, blue, emerald

function initParticles() {
  particles.length = 0;
  const count = Math.min(Math.floor((width * height) / 15000), 80);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

function loop() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, width, height);

  // Draw connecting lines and particles
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx * (isThinking ? 2.5 : 1);
    p.y += p.vy * (isThinking ? 2.5 : 1);

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Mouse interaction physics
    const dx = mouseX - p.x;
    const dy = mouseY - p.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && dist > 0) {
      const force = (150 - dist) / 150;
      p.x -= (dx / dist) * force * 2;
      p.y -= (dy / dist) * force * 2;
    }

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * (isThinking ? 1.5 : 1), 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.baseAlpha * (isThinking ? 0.9 : 0.6);
    ctx.fill();

    // Draw connections
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const cdx = p2.x - p.x;
      const cdy = p2.y - p.y;
      const cdist = Math.sqrt(cdx * cdx + cdy * cdy);

      if (cdist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = (1 - cdist / 120) * 0.25;
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1.0;

  requestAnimationFrame(loop);
}

self.onmessage = (e: MessageEvent) => {
  const { type, offscreen, newWidth, newHeight, x, y, thinking } = e.data;

  if (type === 'init') {
    canvas = offscreen;
    width = newWidth || 800;
    height = newHeight || 600;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d') as OffscreenCanvasRenderingContext2D | null;
      initParticles();
      requestAnimationFrame(loop);
    }
  } else if (type === 'resize') {
    width = newWidth;
    height = newHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }
  } else if (type === 'mousemove') {
    mouseX = x;
    mouseY = y;
  } else if (type === 'thinking') {
    isThinking = thinking;
  }
};
