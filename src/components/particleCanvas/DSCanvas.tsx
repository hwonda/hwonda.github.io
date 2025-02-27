'use client';

import React, { useEffect, useRef } from 'react';
import { Particle, CONSTANTS } from '@/libs/DSParticleSystem';
import { useTheme } from 'next-themes';

interface DSParticleStreamProps {
  width?: number;
  height?: number;
  title: string;
  score: number;
  description: string;
}

export default function DSParticleStream(props: DSParticleStreamProps) {
  const { width = 250, height = 400, title, score, description } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const connectionPhaseRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastFlashTimeRef = useRef<number>(0);
  const currentFlashIntervalRef = useRef<number>(Math.random());
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_COUNT = 60;

    canvas.width = width;
    canvas.height = height;

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const particle = new Particle();
      particle.radius = (Math.random() * (CONSTANTS.MAX_RADIUS - CONSTANTS.MIN_RADIUS)) + CONSTANTS.MIN_RADIUS;
      return particle;
    });

    function animate(currentTime: number) {
      if (!ctx || !canvas) return;

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      lastFlashTimeRef.current += deltaTime;
      if (lastFlashTimeRef.current > currentFlashIntervalRef.current) {
        lastFlashTimeRef.current = 0;
        currentFlashIntervalRef.current = Math.random();

        const availableParticles = particlesRef.current.filter((p) => !p.isFlashing);
        const flashCount = Math.floor(Math.random() * 4);

        for (let i = 0; i < Math.min(flashCount, availableParticles.length); i++) {
          const randomIndex = Math.floor(Math.random() * availableParticles.length);
          const particle = availableParticles[randomIndex];
          particle.isFlashing = true;
          particle.flashProgress = 0;
          availableParticles.splice(randomIndex, 1);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      connectionPhaseRef.current += 0.005;
      particlesRef.current.forEach((particle) =>
        particle.update(ctx, deltaTime, particlesRef.current, connectionPhaseRef.current, width, height)
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate(0);

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
      border border-red-500/20
      before:absolute before:inset-0 before:z-0
      before:bg-gradient-to-b before:from-transparent before:to-white/5 dark:before:to-white/5"
    style={{ boxShadow: theme === 'dark' ? 'inset 0px 0px 10px rgba(239, 68, 68, 0.3)' : '0px 0px 4px rgba(239, 68, 68, 0.5), inset 0px 2px 4px rgba(239, 68, 68, 0.2)' }}
    >
      <div className="absolute top-2 right-2 text-main backdrop-blur-md rounded px-2 z-20">
        {'DS | L'}
        <span className='text-red-700 dark:text-red-500'>{score}</span>
      </div>
      <div className='absolute w-full bottom-0 left-0 p-2 z-20
        min-h-[100px] flex flex-col justify-start
        before:absolute before:inset-0 before:-z-10
        before:backdrop-blur-3xl'
      >
        <div className='text-red-700 dark:text-red-500 text-lg font-bold mb-1'>
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