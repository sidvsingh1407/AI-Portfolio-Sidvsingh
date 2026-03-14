
import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  particleCount?: number;
  speed?: number;
  opacity?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  particleCount = 80,
  speed = 0.4,
  opacity = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 });
  const animationFrameId = useRef<number | null>(null);

  // Cap particle count at 100 for performance
  const actualCount = Math.min(particleCount, 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      targetAlpha: number;
      fadeSpeed: number;
      isFadingOut: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1; // 1px to 3px
        
        // Drift slowly upward and sideways
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() * -0.5 - 0.1) * speed; // Biased upward
        
        this.alpha = 0;
        this.targetAlpha = (Math.random() * 0.4 + 0.2) * opacity;
        this.fadeSpeed = 0.005 + Math.random() * 0.005;
        this.isFadingOut = false;
      }

      update() {
        // Subtle mouse interaction - gentle drift away from cursor
        const dx = mousePosition.current.x - this.x;
        const dy = mousePosition.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x -= (dx / dist) * force * 0.5;
          this.y -= (dy / dist) * force * 0.5;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Fade out near edges or if moving out of bounds
        const padding = 20;
        if (
          this.x < padding || 
          this.x > width - padding || 
          this.y < padding || 
          this.y > height - padding
        ) {
          this.isFadingOut = true;
        }

        if (this.isFadingOut) {
          this.alpha -= this.fadeSpeed;
          if (this.alpha <= 0) {
            this.reset();
          }
        } else if (this.alpha < this.targetAlpha) {
          this.alpha += this.fadeSpeed;
        }
      }

      reset() {
        // Respawn at a random edge or random position
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { // Bottom
          this.x = Math.random() * width;
          this.y = height;
        } else if (edge === 1) { // Left
          this.x = 0;
          this.y = Math.random() * height;
        } else if (edge === 2) { // Right
          this.x = width;
          this.y = Math.random() * height;
        } else { // Top
          this.x = Math.random() * width;
          this.y = 0;
        }
        
        this.alpha = 0;
        this.isFadingOut = false;
        this.targetAlpha = (Math.random() * 0.4 + 0.2) * opacity;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      width = parent.clientWidth || window.innerWidth;
      height = parent.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = Array.from({ length: actualCount }).map(() => new Particle());
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    init();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [actualCount, speed, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }} // Changed from -1 to 1 to stay above parent background
    />
  );
};

export default FloatingParticles;
