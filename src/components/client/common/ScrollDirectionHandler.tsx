'use client';

import { useEffect } from 'react';

// 스크롤 방향 감지 및 클래스 토글을 위한 유틸리티
const useScrollDirection = () => {
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';

      if (direction === 'down' && scrollY > 64) {
        document.documentElement.style.setProperty('--header-transform', '-64px');
      } else {
        document.documentElement.style.setProperty('--header-transform', '0px');
      }

      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);
};

const ScrollDirectionHandler = () => {
  useScrollDirection();
  return null;
};

export default ScrollDirectionHandler;