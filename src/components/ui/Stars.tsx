'use client';

import { Star } from 'lucide-react';

interface StarsProps {
  rating: number;
  size?: number;
  className?: string;
}

const Stars = ({ rating, size = 20, className }: StarsProps) => {
  return (
    <div className={`flex wrap gap-1 ${ className }`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill={i < rating ? 'var(--primary)' : 'transparent'}
          className={i < rating ? 'text-primary' : 'text-light'} // rating에 따라 채워진 별과 빈 별의 스타일 적용
        />
      ))}
    </div>
  );
};

export default Stars;