import React from 'react';

interface LevelProps {
  level?: number;
}

const Level = ({ level = 0 }: LevelProps) => {
  const getLevelInfo = (level: number) => {
    switch (level) {
      case 1:
        return {
          label: '기초',
          gradientColors: ['from-green-300', 'to-blue-300'],
          bgColor: 'bg-background',
        };
      case 2:
        return {
          label: '초급',
          gradientColors: ['from-blue-300', 'to-purple-300'],
          bgColor: 'bg-background',
        };
      case 3:
        return {
          label: '중급',
          gradientColors: ['from-purple-300', 'to-yellow-300'],
          bgColor: 'bg-background',
        };
      case 4:
        return {
          label: '고급',
          gradientColors: ['from-yellow-300', 'to-orange-300'],
          bgColor: 'bg-background',
        };
      case 5:
        return {
          label: '전문',
          gradientColors: ['from-orange-300', 'to-red-300'],
          bgColor: 'bg-background',
        };
      default:
        return {
          label: '요약',
          gradientColors: ['from-pink-300', 'to-emerald-300'],
          bgColor: 'bg-background',
        };
    }
  };

  const { label, gradientColors, bgColor } = getLevelInfo(level);

  return (
    <div className="inline-block">
      {/* Outermost border */}
      <div className={`p-[1.3px] bg-gradient-to-br ${ gradientColors[0] } ${ gradientColors[1] } rounded-2xl`}>
        {/* Middle spacing */}
        <div className={`mac:p-px windows:p-[1.6px] ${ bgColor } rounded-2xl`}>
          {/* Inner border */}
          <div className={`p-[1.3px] bg-gradient-to-br ${ gradientColors[0] } ${ gradientColors[1] } rounded-xl`}>
            {/* Content */}
            <div className="bg-background rounded-xl w-11 pl-0.5 flex items-center justify-center ">
              <span className="font-medium text-xs text-sub shrink-0 tracking-widest">{label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level;