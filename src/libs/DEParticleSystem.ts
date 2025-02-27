import { DENodeType, DEWaveType } from '@/components/particleCanvas/types/index';

export function getRandomFloat(min: number, max: number): number {
  return (Math.random() * (max - min)) + min;
}

export class Node implements DENodeType {
  x!: number;
  y!: number;
  z!: number;
  radius!: number;
  color!: string;
  speed!: number;
  pulsePhase!: number;
  pulseSpeed!: number;
  angleX!: number;
  angleY!: number;
  moveSpeed!: number;
  theme!: string;
  private canvasWidth!: number;
  private canvasHeight!: number;
  private MAX_DEPTH!: number;
  opacity!: number;
  fadeState!: 'fadingIn' | 'visible';
  fadeProgress!: number;
  private static readonly FADE_DURATION = 2;

  constructor(canvasWidth: number, canvasHeight: number, maxDepth: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.MAX_DEPTH = maxDepth;
    this.reset();
    this.opacity = 0;
    this.fadeState = 'fadingIn';
    this.fadeProgress = 0;
  }

  reset(): void {
    this.x = (Math.random() - 0.5) * this.canvasWidth;
    this.y = (Math.random() - 0.5) * this.canvasHeight;
    this.z = Math.random() * this.MAX_DEPTH;
    this.radius = 2;
    this.color = this.getRandomColor();
    this.speed = (1 + Math.random()) / 10;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = (0.05 + (Math.random() * 0.05)) / 50;
    this.angleX = Math.random() * Math.PI * 2;
    this.angleY = Math.random() * Math.PI * 2;
    this.moveSpeed = (0.5 + Math.random()) / 20;
  }

  private getRandomColor(): string {
    const isDark = this.theme === 'dark';
    const colors = isDark ? [
      'rgba(255, 255, 0, ',
      'rgba(255, 215, 0, ',
      'rgba(255, 200, 0, ',
      'rgba(255, 180, 0, ',
    ] : [
      'rgba(255, 193, 7, ', // Amber
      'rgba(255, 167, 38, ', // Orange
      'rgba(251, 192, 45, ', // Golden Yellow
      'rgba(255, 234, 0, ', // Golden
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(ctx: CanvasRenderingContext2D): void {
    if (this.fadeState === 'fadingIn') {
      this.fadeProgress += (1 / 60) / Node.FADE_DURATION;
      if (this.fadeProgress >= 1) {
        this.fadeProgress = 1;
        this.fadeState = 'visible';
      }
    }
    this.opacity = Math.max(0, Math.min(1, this.fadeProgress));

    this.x += Math.cos(this.angleX) * this.moveSpeed;
    this.y += Math.sin(this.angleY) * this.moveSpeed;
    this.z -= this.speed;

    this.angleX += 0.02;
    this.angleY += 0.02;
    this.pulsePhase += this.pulseSpeed;

    if (this.z < 1) {
      this.reset();
    }

    const scale = this.MAX_DEPTH / (this.MAX_DEPTH - this.z);
    const x2d = (this.x * scale) + (this.canvasWidth / 2);
    const y2d = (this.y * scale) + (this.canvasHeight / 2);
    const pulseSize = 1 + (Math.sin(this.pulsePhase) * 0.3);
    const r = this.radius * scale * pulseSize;

    if (
      x2d < -50
      || x2d > this.canvasWidth + 50
      || y2d < -50
      || y2d > this.canvasHeight + 50
    ) {
      this.reset();
      return;
    }

    const alpha = (1 - (this.z / this.MAX_DEPTH)) * 0.8 * this.opacity;

    ctx.beginPath();
    ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha + ')';
    ctx.fill();
  }
}

export class Wave implements DEWaveType {
  y!: number;
  amplitude!: number;
  frequency!: number;
  speed!: number;
  color!: string;
  lineWidth!: number;
  startX!: number;
  theme!: string;
  private canvasWidth!: number;
  private canvasHeight: number;
  opacity!: number;
  fadeState!: 'fadingIn' | 'visible';
  fadeProgress!: number;
  private static readonly FADE_DURATION = 2;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.reset();
    this.opacity = 0;
    this.fadeState = 'fadingIn';
    this.fadeProgress = 0;
  }

  reset(): void {
    this.y = this.canvasHeight * 0.3;
    this.amplitude = getRandomFloat(20, 60);
    this.frequency = getRandomFloat(0.01, 0.03);
    this.speed = getRandomFloat(0.002, 0.004);
    this.color = this.getRandomColor();
    this.lineWidth = getRandomFloat(1, 3);
    this.startX = 0;
  }

  private getRandomColor(): string {
    const isDark = this.theme === 'dark';
    const colors = isDark ? [
      'rgba(255, 255, 0, ',
      'rgba(255, 215, 0, ',
      'rgba(255, 200, 0, ',
    ] : [
      'rgba(255, 193, 7, ', // Amber
      'rgba(251, 192, 45, ', // Golden Yellow
      'rgba(255, 234, 0, ', // Golden
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(ctx: CanvasRenderingContext2D): void {
    if (this.fadeState === 'fadingIn') {
      this.fadeProgress += (1 / 60) / Wave.FADE_DURATION;
      if (this.fadeProgress >= 1) {
        this.fadeProgress = 1;
        this.fadeState = 'visible';
      }
    }
    this.opacity = Math.max(0, Math.min(1, this.fadeProgress));

    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;

    const startY = this.canvasHeight * 0;
    const angle = (40 * Math.PI) / 180;

    for (let x = 0; x < this.canvasWidth + 100; x++) {
      const normalizedX = x / this.canvasWidth;
      const y = startY
                + (normalizedX * (this.amplitude + ( x * Math.tan(angle))))
                + (Math.sin((x * this.frequency) + this.startX) * this.amplitude);

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.strokeStyle = this.color + (0.3 * this.opacity) + ')';
    ctx.stroke();

    this.startX += this.speed;

    if (this.startX > this.canvasWidth * 1.2) {
      this.reset();
    }
  }
}