'use client';

import React, { useEffect, useRef } from 'react';
import { Node, Wave } from '@/libs/DEParticleSystem';
import { useTheme } from 'next-themes';

interface DEParticleStreamProps {
  width?: number;
  height?: number;
  title: string;
  score: number;
  description: string;
}

export default function DECanvas(props: DEParticleStreamProps) {
  const { width = 250, height = 400, title, score, description } = props;
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const wavesRef = useRef<Wave[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const MAX_DEPTH = 1500;
    const NODE_COUNT = 25;
    const WAVE_COUNT = 20;

    canvas.width = width;
    canvas.height = height;

    // Initialize nodes and waves with theme-dependent colors
    nodesRef.current = Array.from(
      { length: NODE_COUNT },
      () => new Node(width, height, MAX_DEPTH)
    );

    wavesRef.current = Array.from(
      { length: WAVE_COUNT },
      () => new Wave(width, height)
    );

    function animate() {
      if(!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Update waves and nodes
      wavesRef.current.forEach((wave) => wave.update(ctx));
      nodesRef.current.forEach((node) => node.update(ctx));

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
    <div
      className={`relative w-full min-h-[300px] rounded-2xl overflow-hidden
      bg-white/30 dark:bg-black/20 backdrop-blur-md
      before:absolute before:inset-0 before:z-0
      border border-amber-500/20
      before:bg-gradient-to-b before:from-transparent before:to-white/5 dark:before:to-white/5`}
      style={{ boxShadow: theme === 'dark' ? 'inset 0px 0px 10px rgba(255, 193, 7, 0.3)' : '0px 0px 4px rgba(255, 193, 7, 0.5), inset 0px 2px 4px rgba(255, 193, 7, 0.2)' }}
    >
      <div className="absolute top-2 right-2 text-main backdrop-blur-md rounded px-2 z-20">
        {'DE | L'}
        <span className='text-amber-600 dark:text-amber-400'>{score}</span>
      </div>
      <div className='absolute w-full bottom-0 left-0 p-2 z-20
        min-h-[100px] flex flex-col justify-start
        before:absolute before:inset-0 before:-z-10
        before:backdrop-blur-3xl'
      >
        <div className='text-amber-600 dark:text-amber-400 text-lg font-bold mb-1'>
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