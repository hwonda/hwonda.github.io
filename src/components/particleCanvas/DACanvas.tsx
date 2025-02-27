'use client';

import React, { useEffect, useRef } from 'react';
import { Particle } from '@/libs/DAParticleSystem';
import { useTheme } from 'next-themes';

interface ParticleStreamProps {
  width?: number;
  height?: number;
  title?: string;
  score?: number;
  description?: string;
}

export default function DACanvas(props: ParticleStreamProps) {
  const { width = 250, height = 400, title, score, description } = props;
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MAX_DEPTH = 2000;
    const PARTICLE_COUNT = 70;

    canvas.width = width;
    canvas.height = height;

    // Theme-aware particle initialization
    particlesRef.current = Array.from(
      { length: PARTICLE_COUNT },
      () => new Particle(width, height, MAX_DEPTH, theme || 'light')
    );

    function animate() {
      if(!ctx) return;

      // Clear with transparency
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => particle.update(ctx, particlesRef.current));
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height, theme]);

  return (
    <div className="relative w-full min-h-[300px] rounded-2xl overflow-hidden
      shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]
      bg-white/30 dark:bg-black/20 backdrop-blur-md
      border border-green-500/20
      before:absolute before:inset-0 before:z-0
      before:bg-gradient-to-b before:from-transparent before:to-white/5 dark:before:to-white/5"
    style={{ boxShadow: theme === 'dark' ? 'inset 0px 0px 10px rgba(34, 197, 94, 0.3)' : '0px 0px 4px rgba(34, 197, 94, 0.5), inset 0px 2px 4px rgba(34, 197, 94, 0.2)' }}
    >
      <div className="absolute top-2 right-2 text-main backdrop-blur-md rounded px-2 z-20">
        {'DA | L'}
        <span className='text-green-700 dark:text-green-500'>{score}</span>
      </div>
      <div className='absolute w-full bottom-0 left-0 p-2 z-20
      min-h-[100px] flex flex-col justify-start
        before:absolute before:inset-0 before:-z-10
        before:backdrop-blur-3xl'
      >
        <div className='text-green-700 dark:text-green-500 text-lg font-bold mb-1'>
          {title}
        </div>
        <div className='text-main text-sm'>
          {description}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="relative z-10 size-full"
      />
    </div>
  );
}