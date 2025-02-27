/* eslint-disable @typescript-eslint/no-unused-vars */
import { DSParticleType, DSTransform } from '@/components/particleCanvas/types/index';

export const CONSTANTS = {
  FADE_DURATION: 2,
  SPIRAL_TIGHTNESS: 0.4,
  MAX_RADIUS: 500,
  MIN_RADIUS: 5,
  BASE_ANGULAR_SPEED: 0.001,
  PERSPECTIVE_ANGLE: Math.PI * 0.65,
  VERTICAL_SQUEEZE: 0.8,
};

export function apply3DTransform(x: number, y: number, radius: number): DSTransform {
  const tiltedY = y * Math.cos(CONSTANTS.PERSPECTIVE_ANGLE) * CONSTANTS.VERTICAL_SQUEEZE;
  const z = y * Math.sin(CONSTANTS.PERSPECTIVE_ANGLE);
  const scale = 1 + (z / 5000);

  return {
    x: x * scale,
    y: tiltedY * scale,
    scale: scale,
  };
}

export class Particle implements DSParticleType {
  radius!: number;
  angle!: number;
  angularSpeed!: number;
  radialSpeed!: number;
  opacity!: number;
  fadeState!: 'fadingIn' | 'visible' | 'fadingOut';
  fadeProgress!: number;
  baseSize!: number;
  pulsePhase!: number;
  pulseSpeed!: number;
  color!: string;
  originalColor!: string;
  connectionOffset!: number;
  isFlashing!: boolean;
  flashProgress!: number;
  theme!: string;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.radius = CONSTANTS.MAX_RADIUS;
    this.angle = Math.random() * Math.PI * 2;
    this.angularSpeed = CONSTANTS.BASE_ANGULAR_SPEED * (0.6 + (Math.random() * 0.8));
    this.radialSpeed = (Math.random() * 0.0001);

    this.opacity = 0;
    this.fadeState = 'fadingIn';
    this.fadeProgress = 0;

    this.baseSize = 3 + (Math.random() * 1.5);
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.01 + (Math.random() * 0.01);
    this.color = this.getRandomColor();
    this.originalColor = this.color;
    this.connectionOffset = Math.random() * Math.PI * 10;

    this.isFlashing = false;
    this.flashProgress = 0;
  }

  private getRandomColor(): string {
    const isDark = this.theme === 'dark';
    const colors = isDark ? [
      'rgba(255, 0, 0, ',
      'rgba(255, 69, 0, ',
      'rgba(188, 34, 34, ',
      'rgba(159, 0, 0, ',
    ] : [
      'rgba(240, 20, 60, ',
      'rgba(178, 34, 34, ',
      'rgba(189, 0, 0, ',
      'rgba(255, 0, 0, ',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(
    ctx: CanvasRenderingContext2D,
    deltaTime: number,
    particles: Particle[],
    connectionPhase: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    if (this.fadeState === 'fadingIn') {
      this.fadeProgress += deltaTime / CONSTANTS.FADE_DURATION;
      if (this.fadeProgress >= 1) {
        this.fadeProgress = 1;
        this.fadeState = 'visible';
      }
    }

    this.opacity = Math.max(0, Math.min(1, this.fadeProgress));

    if (this.isFlashing) {
      this.flashProgress += deltaTime * 2;
      if (this.flashProgress >= 1) {
        this.isFlashing = false;
        this.flashProgress = 0;
        this.color = this.originalColor;
      } else {
        if(this.theme === 'dark') {
          this.color = 'rgba(255, 255, 255, ';
        } else {
          this.color = 'rgba(80, 0, 0, ';
        }
      }
    }

    const radiusFactor = this.radius / CONSTANTS.MAX_RADIUS;
    this.angularSpeed = CONSTANTS.BASE_ANGULAR_SPEED * (2 - radiusFactor) * 0.3;

    this.angle += this.angularSpeed;
    this.radius -= this.radialSpeed * (2 - radiusFactor);

    if (this.radius <= CONSTANTS.MIN_RADIUS) {
      this.reset();
    }

    const baseX = Math.cos(this.angle + (this.radius * CONSTANTS.SPIRAL_TIGHTNESS)) * this.radius;
    const baseY = Math.sin(this.angle + (this.radius * CONSTANTS.SPIRAL_TIGHTNESS)) * this.radius;

    const transformed = apply3DTransform(baseX, baseY, this.radius);
    const x2d = transformed.x + (canvasWidth / 2);
    const y2d = transformed.y + (canvasHeight / 2);

    const pulseFactor = (Math.sin(this.pulsePhase) * 0.5) + 1;
    this.pulsePhase += this.pulseSpeed;

    const distanceScale = Math.max(0.1, 1 - (this.radius / CONSTANTS.MAX_RADIUS));
    const currentSize = Math.max(0.1, this.baseSize * pulseFactor * distanceScale * 2 * transformed.scale);
    const alpha = distanceScale * 0.8 * this.opacity;

    ctx.beginPath();
    ctx.arc(x2d, y2d, currentSize, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha + ')';
    ctx.fill();

    this.drawConnections(ctx, particles, x2d, y2d, transformed.scale, distanceScale, connectionPhase, canvasWidth, canvasHeight);
  }

  private drawConnections(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    x2d: number,
    y2d: number,
    scale: number,
    distanceScale: number,
    connectionPhase: number,
    canvasWidth: number,
    canvasHeight: number
  ): void {
    particles.forEach((p) => {
      if (p === this) return;
      const pBaseX = Math.cos(p.angle + (p.radius * CONSTANTS.SPIRAL_TIGHTNESS)) * p.radius;
      const pBaseY = Math.sin(p.angle + (p.radius * CONSTANTS.SPIRAL_TIGHTNESS)) * p.radius;
      const pTransformed = apply3DTransform(pBaseX, pBaseY, p.radius);
      const px = pTransformed.x + (canvasWidth / 2);
      const py = pTransformed.y + (canvasHeight / 2);

      const distance = Math.hypot(px - x2d, py - y2d);
      const maxDistance = 60 * distanceScale * scale;

      if (distance < maxDistance) {
        const baseAlpha = (1 - (distance / maxDistance));
        const pulsingAlpha = (Math.sin(connectionPhase + this.connectionOffset + p.connectionOffset) + 1) * 0.5;
        const finalAlpha = baseAlpha * pulsingAlpha * 0.6 * distanceScale
                          * Math.min(this.opacity, p.opacity) * scale;

        ctx.beginPath();
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(px, py);
        ctx.strokeStyle = this.theme === 'dark'
          ? `rgba(225, 20, 60, ${ finalAlpha })`
          : `rgba(220, 20, 60, ${ finalAlpha })`; // Crimson 색상 사용
        ctx.lineWidth = distanceScale * scale * 1.5;
        ctx.stroke();
      }
    });
  }
}