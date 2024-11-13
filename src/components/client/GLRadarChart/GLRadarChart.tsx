'use client';

import React from 'react';
import frag from './default.frag';
import vert from './default.vert';
import { initializeGL, render, createClipPathCSS, createAbsoluteLabelsCSS } from './utils';
import { RadarChartStyle, RadarLoadingStyle } from './types';
import { useTheme } from 'next-themes';
import Stars from '@/components/server/ui/Stars';

export interface RadarChartProps {
  targetData?: number[]; // 1~5 범위의 자연수 배열
  labelData?: string[];
  className?: string;
  style?: React.CSSProperties;
  chartStyle?: RadarChartStyle;
  loadingStyle?: RadarLoadingStyle;
  init?: boolean;
  rotate?: boolean;
  breathe?: boolean;
  error?: boolean;
}

const darkChartStyle: RadarChartStyle = {
  backgroundColor: [0.07, 0.07, 0.07, 1],
  lineColor: [1, 1, 1, 0.4],
  outlineColor: [0.012, 0.325, 0.498, 0.8],
  dataColor: [0.2, 0.635, 0.718, 0.5],
  dataOutlineColor: [0.2, 0.635, 0.718, 0.8],
  centerPointColor: [0.4, 0.635, 0.718, 1],
};

const darkLoadingStyle = {
  backgroundColor: [0.118, 0.227, 0.278, 1],
  outlineColor: [0.4, 0.635, 0.718, 1],
};

const lightChartStyle: RadarChartStyle = {
  backgroundColor: [0.973, 0.973, 0.973, 1],
  lineColor: [0.3, 0.6, 0.6, 0.3],
  outlineColor: [0, 0.6, 0.8, 0.8],
  dataColor: [0.2, 0.812, 1, 0.25],
  dataOutlineColor: [0.2, 0.812, 1, 0.6],
  centerPointColor: [0, 0.6, 0.8, 1],
};

const lightLoadingStyle: RadarLoadingStyle = {
  backgroundColor: [0.878, 0.912, 0.929, 1],
  outlineColor: [0, 0.6, 0.8, 1],
};

function GLRadarChart(props: RadarChartProps) {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const {
    targetData = [1, 1, 1],
    labelData,
    className,
    style,
    chartStyle = theme === 'dark' ? darkChartStyle : lightChartStyle,
    loadingStyle = theme === 'dark' ? darkLoadingStyle : lightLoadingStyle,
    rotate,
    breathe,
    error,
  } = props;

  const normalizeValue = (value: number) => {
    const clampedValue = Math.max(1, Math.min(5, Math.round(value)));
    return 0.2 + ((clampedValue - 1) * (0.72 / 4));
  };

  const vertices = 3;
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  const glRef = React.useRef<WebGL2RenderingContext | null>(null);
  const positiveRef = React.useRef([false, false, false]);
  const rotationRef = React.useRef(0);
  const breatheRef = React.useRef(0);
  const breathePositiveRef = React.useRef(false);
  const animationRef = React.useRef<number | null>(null);
  const animData = React.useRef(new Float32Array([0.6, 0.6, 0.6]));

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (chartRef.current) glRef.current = initializeGL(chartRef.current, vert, frag);
  });

  const initAnimation = React.useCallback(() => {
    if (!glRef.current) return;
    if (rotate) {
      if (rotationRef.current >= 360) rotationRef.current = 0;
      else rotationRef.current += 0.05;
    } else {
      rotationRef.current = 0;
    }
    if (breathe) {
      if (breatheRef.current >= 1) breathePositiveRef.current = false;
      if (breatheRef.current <= 0) breathePositiveRef.current = true;
      breatheRef.current = breathePositiveRef.current ? breatheRef.current + 0.01 : breatheRef.current - 0.01;
    } else {
      breatheRef.current = 0;
    }

    // targetData를 정규화하여 애니메이션 적용
    animData.current = animData.current.map((v, i) => {
      const normalizedTarget = normalizeValue(targetData[i] ?? 3);
      if (!positiveRef.current[i]) {
        if (v - 0.03 < 0) {
          positiveRef.current[i] = true;
          return 0;
        }
        return v - 0.03;
      } else {
        if (v + 0.03 > normalizedTarget) return normalizedTarget;
        return v + 0.03;
      }
    });

    animationRef.current = requestAnimationFrame(() => {
      if (!glRef.current) return;
      render(glRef.current, animData.current, vertices, chartStyle, rotationRef.current, breatheRef.current);
      initAnimation();
    });
  }, [targetData, chartStyle, breathe, rotate]);

  React.useEffect(() => {
    if (glRef.current) {
      console.log('GLRadarChart: Animation started');
      setLoaded(true);
      animationRef.current = requestAnimationFrame(() => {
        initAnimation();
      });
      return () => cancelAnimationFrame(animationRef.current ?? 0);
    }
  }, [initAnimation]);

  return (
    <div id="GLRadarChart" style={style} className={'relative p-6 transition-all' + (className ? ` ${ className }` : '')}>
      {labelData?.length && createAbsoluteLabelsCSS(vertices, 5, 3, 1).map((label, i) => (
        <button
          key={i}
          style={{ top: label[1], left: label[0] }}
          className={
            'group absolute w-20 h-6 text-sm transition-all text-main hover:font-bold'
            + (loaded ? ' opacity-100' : ' opacity-0 translate-y-1')
          }
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span
            className={`absolute left-0 top-[-16px] transition-opacity ${
              hoveredIndex === i ? 'sm:opacity-100' : 'sm:opacity-0'
            }`}
          >
            <Stars rating={targetData[i]} size={12} />
          </span>
          {labelData[i]}
        </button>
      ))}
      <div className="relative size-[250px]">
        {!loaded && (
          <>
            <div
              id="GLRadarChartLoading"
              style={{ clipPath: createClipPathCSS(vertices, 0.96), backgroundColor: `rgba(${ loadingStyle.outlineColor?.join(',') })` }}
              className="absolute top-0 size-full border-light"
            />
            <div
              id="GLRadarChartLoading"
              style={{ clipPath: createClipPathCSS(vertices, 0.94), backgroundColor: `rgba(${ loadingStyle.backgroundColor?.join(',') })` }}
              className="absolute top-0 flex size-full items-center justify-center border-light text-3xl font-bold text-main"
            />
          </>
        )}
        <canvas
          ref={chartRef}
          width="1000"
          height="1000"
          className="absolute top-0 size-full"
        />
        {loaded && error && (
          <div className="absolute top-0 flex size-full items-center justify-center text-3xl font-bold text-main">
            {'?'}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(GLRadarChart);