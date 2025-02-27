'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CarouselClientWrapperProps {
  children: React.ReactNode;
  itemCount: number;
  itemWidth: number;
}

const revolveSpeed = 0.05;

const CarouselWrapperRight = ({ children, itemWidth }: CarouselClientWrapperProps) => {
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const childWidth = itemWidth + 24; // 24px는 좌우 마진

  const [childrenArray, setChildrenArray] = useState(() => {
    const array = React.Children.toArray(children);
    return [...array].reverse();
  });
  const scrollPosition = time;

  const animate = useCallback(() => {
    const speed = -revolveSpeed;
    setTime((time) => time + speed);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  useEffect(() => {
    if (Math.abs(scrollPosition) % childWidth < revolveSpeed) {
      setChildrenArray((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);
      setTime((time) => time + childWidth);
    }
  }, [scrollPosition, childWidth]);

  return (
    <div
      className="relative overflow-hidden"
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      role="region"
      aria-label="이미지 캐러셀(슬라이드)"
      ref={containerRef}
    >
      <div
        className="relative flex"
        style={{
          transform: `translateX(-${ scrollPosition }px)`,
        }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className={`mx-3 w-[${ itemWidth }px] shrink-0`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselWrapperRight;