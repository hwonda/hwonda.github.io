'use client';

import { useState, useEffect } from 'react';

interface LogoText {
  prefix: string;
  key: number;
}

const LogoAnimation = () => {
  const [currentLogo, setCurrentLogo] = useState<LogoText>({ prefix: 'DataW', key: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextLogo, setNextLogo] = useState<LogoText>({ prefix: 'DxW', key: 1 });

  const logos: LogoText[] = [
    { prefix: 'DataW', key: 0 },
    { prefix: 'DxW', key: 1 },
    { prefix: 'D', key: 2 },
  ];

  useEffect(() => {
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
    <h1 className="flex text-3xl font-bold text-main">
      <div className="relative flex justify-end overflow-hidden w-[7ch] h-[1.2em]">
        {/* 현재 텍스트 */}
        <span
          className="absolute flex justify-end top-0 right-0 w-full text-accent"
          style={{
            animation: isAnimating ? 'slideDownOut 400ms ease-in-out forwards' : 'none',
          }}
        >
          {currentLogo.prefix}
        </span>

        {/* 다음 텍스트 */}
        {isAnimating && (
          <span
            className="absolute flex justify-end top-0 right-0 w-full text-accent"
            style={{
              animation: 'slideDownIn 400ms ease-in-out forwards',
            }}
          >
            {nextLogo.prefix}
          </span>
        )}
      </div>
      <span>{'iki'}</span>

      <style jsx>{`
        @keyframes slideDownOut {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes slideDownIn {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}
      </style>
    </h1>
  );
};

export default LogoAnimation;