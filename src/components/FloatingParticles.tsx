
import React, { useEffect, useRef } from 'react';

interface FloatingParticlesProps {
  particleCount?: number;
  speed?: number;
  opacity?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  particleCount = 450,
  speed = 0.4,
  opacity = 0.5,
  colors = ['#D4B76A', '#2D4A53', '#1A1A1A', '#F5F5DC'], // Gold, Teal, Graphite, Off-white
  minSize = 1.5,
  maxSize = 4.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: -1000, y: -1000 });
  const animationFrameId = useRef<number | null>(null);

  // Increased cap for hero immersion
  const actualCount = Math.min(particleCount, 800);

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
      color: string;
      blur: number;
      depth: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // Depth mapping: smaller = further = slower = dimmer
        this.depth = Math.random();
        this.size = minSize + this.depth * (maxSize - minSize);
        this.blur = this.depth * 4;
        
        // Drift slowly
        const speedMult = 0.2 + this.depth * 0.8;
        this.vx = (Math.random() - 0.5) * speed * speedMult;
        this.vy = (Math.random() * -0.6 - 0.2) * speed * speedMult; // Biased upward
        
        this.alpha = 0;
        this.targetAlpha = (0.2 + Math.random() * 0.5) * opacity * speedMult;
        this.fadeSpeed = 0.002 + Math.random() * 0.003;
        this.isFadingOut = false;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Subtle mouse interaction - gentle drift
        const dx = mousePosition.current.x - this.x;
        const dy = mousePosition.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (dist < maxDist) {
          const force = (maxDist - dist) / maxDist;
          this.x -= (dx / dist) * force * 0.2 * this.depth;
          this.y -= (dy / dist) * force * 0.2 * this.depth;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap or reset? User likes "drifting atmosphere", resets feel better for density management
        const padding = 50;
        if (
          this.x < -padding || 
          this.x > width + padding || 
          this.y < -padding || 
          this.y > height + padding
        ) {
          this.isFadingOut = true;
        }

        if (this.isFadingOut) {
          this.alpha -= this.fadeSpeed * 2;
          if (this.alpha <= 0) {
            this.reset();
          }
        } else if (this.alpha < this.targetAlpha) {
          this.alpha += this.fadeSpeed;
        }
      }

      reset() {
        // Edge spawning
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { // Bottom
          this.x = Math.random() * width;
          this.y = height + 40;
        } else if (side === 1) { // Left
          this.x = -40;
          this.y = Math.random() * height;
        } else if (side === 2) { // Right
          this.x = width + 40;
          this.y = Math.random() * height;
        } else { // Top
          this.x = Math.random() * width;
          this.y = -40;
        }
        
        this.alpha = 0;
        this.isFadingOut = false;
        
        // Slightly change properties on reset for variety
        this.depth = Math.random();
        this.size = minSize + this.depth * (maxSize - minSize);
        this.blur = this.depth * 4;
        const speedMult = 0.2 + this.depth * 0.8;
        this.targetAlpha = (0.2 + Math.random() * 0.5) * opacity * speedMult;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Apply color with alpha
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        
        if (this.blur > 1) {
          ctx.shadowBlur = this.blur;
          ctx.shadowColor = this.color;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    let particles: Particle[] = [];

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);
      
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
      style={{ zIndex: 5, background: 'transparent' }} // Increased z-index and explicit transparent background
    />
  );
};

export default FloatingParticles;
