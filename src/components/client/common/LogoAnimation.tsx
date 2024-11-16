'use client';

import { useState, useEffect } from 'react';

interface LogoAnimationProps {
  fontSize?: string;
}

interface LogoText {
  prefix: string;
  key: number;
}

const LogoAnimation = ({ fontSize = '2rem' }: LogoAnimationProps) => {
  const [currentLogo, setCurrentLogo] = useState<LogoText>({ prefix: 'DataW', key: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextLogo, setNextLogo] = useState<LogoText>({ prefix: 'DxW', key: 1 });

  useEffect(() => {
    const logos: LogoText[] = [
      { prefix: 'DataW', key: 0 },
      { prefix: 'DxW', key: 1 },
      { prefix: 'D', key: 2 },
    ];

    const interval = setInterval(() => {
      setIsAnimating(true);

      const nextIndex = (logos.findIndex((logo) => logo.key === currentLogo.key) + 1) % logos.length;
      const upcomingLogo = logos[nextIndex];
      setNextLogo(upcomingLogo);

      setTimeout(() => {
        setCurrentLogo(upcomingLogo);
        setIsAnimating(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentLogo]);

  return (
    <h1 className="flex font-bold text-main" style={{ fontSize }}>
      <div className="relative flex justify-end overflow-hidden w-[5ch]">
        {/* 현재 텍스트 */}
        <span
          className={`absolute flex justify-end top-0 right-0 w-full text-primary ${
            isAnimating ? 'animate-slideDownOut' : ''
          }`}
        >
          {currentLogo.prefix}
        </span>
        {/* 다음 텍스트 */}
        {isAnimating && (
          <span
            className="absolute flex justify-end top-0 right-0 w-full text-primary animate-slideDownIn"
          >
            {nextLogo.prefix}
          </span>
        )}
      </div>
      <span className="text-main">{'iki'}</span>
    </h1>
  );
};

export default LogoAnimation;
