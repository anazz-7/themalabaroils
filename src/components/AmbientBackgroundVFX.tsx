import React, { useEffect, useRef } from 'react';

export const AmbientBackgroundVFX: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle golden & botanical organic orbs that gently drift
    const orbs = [
      { x: width * 0.15, y: height * 0.2, r: 240, dx: 0.18, dy: 0.12, color: 'rgba(212, 175, 55, 0.045)' }, // Gold
      { x: width * 0.82, y: height * 0.35, r: 280, dx: -0.15, dy: 0.14, color: 'rgba(45, 90, 39, 0.04)' },  // Emerald
      { x: width * 0.45, y: height * 0.75, r: 260, dx: 0.12, dy: -0.16, color: 'rgba(180, 83, 9, 0.035)' }, // Warm Amber
      { x: width * 0.75, y: height * 0.85, r: 220, dx: -0.14, dy: -0.12, color: 'rgba(212, 175, 55, 0.04)' }  // Golden Sand
    ];

    // Micro light motes
    const particles = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedY: -(Math.random() * 0.3 + 0.1),
      opacity: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render drifting orbs with soft radial gradients
      orbs.forEach((orb) => {
        orb.x += orb.dx;
        orb.y += orb.dy;

        if (orb.x - orb.r < 0 || orb.x + orb.r > width) orb.dx *= -1;
        if (orb.y - orb.r < 0 || orb.y + orb.r > height) orb.dy *= -1;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'rgba(251, 249, 245, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render micro drifting particles
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(180, 140, 60, ${p.opacity * 0.35})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};

