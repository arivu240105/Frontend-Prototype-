"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Cpu, Code2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || 600;
    };

    window.addEventListener("resize", handleResize);

    // Node particle class for data flow animation
    class DataNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulseSpeed: number;
      pulseTimer: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 2 + 1;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.pulseTimer = Math.random() * Math.PI;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseTimer += this.pulseSpeed;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(c: CanvasRenderingContext2D) {
        const opacity = 0.15 + Math.sin(this.pulseTimer) * 0.1;
        c.fillStyle = `rgba(99, 91, 255, ${opacity})`;
        c.beginPath();
        c.arc(this.x, this.y, this.size + Math.sin(this.pulseTimer) * 0.5, 0, Math.PI * 2);
        c.fill();
      }
    }

    const particles: DataNode[] = [];
    const particleCount = Math.min(Math.floor(width / 20), 80);

    for (let i = 0; i < particleCount; i++) {
      particles.push(new DataNode());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid lines (Stripe-like grid)
      ctx.strokeStyle = "rgba(99, 91, 255, 0.025)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw connecting lines between particles close to each other
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(99, 91, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFCFF] via-[#F6F8FF] to-white py-20 lg:py-32 flex flex-col justify-center min-h-[85vh]">
      {/* Subtle Mouse Following Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 91, 255, 0.04), rgba(6, 182, 212, 0.02) 50%, transparent 80%)`
        }}
      />

      {/* Interactive Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Decorative Gradient Blobs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/5 blur-[120px] pointer-events-none animate-pulse-slow animate-float-blob" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-brand-accent/8 blur-[100px] pointer-events-none animate-float-blob-reverse" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-brand-secondary/8 blur-[110px] pointer-events-none animate-float-blob" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Feature Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-primary/10 bg-brand-primary/5 px-4 py-1.5 text-sm font-semibold text-brand-primary mb-8 shadow-sm"
        >
          <ShieldCheck className="h-4 w-4 text-brand-secondary" />
          <span>Announcing GroundSet v2.4 Enterprise Decision Suite</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-brand-neutral-dark sm:text-6xl md:text-7xl lg:leading-[1.1]"
        >
          Every Enterprise Decision <br />
          <span className="text-gradient-cyan">Should Be Explainable.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-brand-muted leading-relaxed"
        >
          GroundSet is an enterprise AI decision engine that converts complex evidence into structured data, applies deterministic business rules, validates decisions with your own private models, and generates mathematical audit trails. Zero black boxes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="#simulation"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="group flex items-center gap-2 rounded-xl btn-premium-gradient btn-animate-gradient px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-primary/15 transition-all"
          >
            Try Interactive Decision Journey
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#architecture"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/85 backdrop-blur-sm px-6 py-4 text-base font-bold text-brand-neutral-dark hover:bg-gray-50/50 hover:border-brand-primary/25 hover:shadow-sm transition-all"
          >
            View Engine Specs
          </motion.a>
        </motion.div>

        {/* Mini stats section banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-20 max-w-5xl border-t border-gray-100 pt-10"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary mb-3 animate-float-icon">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-brand-neutral-dark">100% Deterministic</span>
              <span className="text-xs text-brand-muted mt-1">Mathematical policy guarantees</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent mb-3 animate-float-icon" style={{ animationDelay: "1s" }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-brand-neutral-dark">Explainable AI Audits</span>
              <span className="text-xs text-brand-muted mt-1">Cryptographic decision logs</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary mb-3 animate-float-icon" style={{ animationDelay: "2s" }}>
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-brand-neutral-dark">Customer Owned Models</span>
              <span className="text-xs text-brand-muted mt-1">Run locally on your VPC infrastructure</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
