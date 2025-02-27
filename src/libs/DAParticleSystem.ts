import { DAParticleType } from '@/components/particleCanvas/types/index';

export class Particle implements DAParticleType {
  x!: number;
  y!: number;
  z!: number;
  radius!: number;
  color!: string;
  speed!: number;
  theme: string;
  static lineCount = 0;
  static readonly MAX_LINES = 100;
  private canvasWidth: number;
  private canvasHeight: number;
  private MAX_DEPTH: number;
  opacity!: number;
  fadeState!: 'fadingIn' | 'visible';
  fadeProgress!: number;
  private static readonly FADE_DURATION = 2;

  constructor(canvasWidth: number, canvasHeight: number, maxDepth: number, theme: string) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.MAX_DEPTH = maxDepth;
    this.theme = theme;
    this.reset();
    this.opacity = 0;
    this.fadeState = 'fadingIn';
    this.fadeProgress = 0;
  }

  reset(): void {
    this.x = (Math.random() - 0.5) * this.canvasWidth * 2;
    this.y = (Math.random() - 0.5) * this.canvasHeight * 2;
    this.z = Math.random() * this.MAX_DEPTH;
    this.radius = 2;
    this.color = this.getRandomColor();
    this.speed = (0.2 + Math.random()) / 2;
  }

  private getRandomColor(): string {
    const isDark = this.theme === 'dark';
    const colors = isDark ? [
      'rgba(0, 255, 0, ', // 밝은 초록
      'rgba(50, 255, 50, ', // 밝은 연두
      'rgba(100, 255, 100, ', // 밝은 라임
      'rgba(144, 238, 144, ', // 연한 초록
    ] : [
      'rgba(0, 100, 0, ', // 진한 초록
      'rgba(34, 139, 34, ', // 포레스트 그린
      'rgba(25, 120, 25, ', // 중간 톤 초록
      'rgba(48, 128, 48, ', // 어두운 라임
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
    if (this.fadeState === 'fadingIn') {
      this.fadeProgress += (1 / 60) / Particle.FADE_DURATION; // assuming 60fps
      if (this.fadeProgress >= 1) {
        this.fadeProgress = 1;
        this.fadeState = 'visible';
      }
    }
    this.opacity = Math.max(0, Math.min(1, this.fadeProgress));

    this.z -= this.speed;
    if (this.z < 1) {
      this.reset();
    }

    const scale = this.MAX_DEPTH / (this.MAX_DEPTH - this.z);
    const x2d = (this.x * scale) + (this.canvasWidth / 2);
    const y2d = (this.y * scale) + (this.canvasHeight / 2);
    const r = this.radius * scale;

    if (
      x2d < -50
      || x2d > this.canvasWidth + 50
      || y2d < -50
      || y2d > this.canvasHeight + 50
    ) {
      this.reset();
      return;
    }

    const isDark = this.theme === 'dark';
    let alpha = isDark
      ? (1 - (this.z / this.MAX_DEPTH)) * 0.8 * this.opacity
      : (1 - (this.z / this.MAX_DEPTH)) * 0.9 * this.opacity;

    const bottomFadeStart = this.canvasHeight - 150;
    if (y2d > bottomFadeStart) {
      const fadeProgress = (y2d - bottomFadeStart) / 150;
      alpha *= (1 - fadeProgress);
    }

    ctx.beginPath();
    ctx.arc(x2d, y2d, r, 0, Math.PI * 2);
    ctx.fillStyle = this.color + alpha + ')';
    ctx.fill();

    if (this === particles[0]) {
      Particle.lineCount = 0;
    }

    if (Particle.lineCount < Particle.MAX_LINES) {
      this.drawConnections(ctx, particles, x2d, y2d);
    }
  }

  private drawConnections(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    x2d: number,
    y2d: number,
  ): void {
    particles.forEach((p) => {
      if (p === this) return;

      const pScale = this.MAX_DEPTH / (this.MAX_DEPTH - p.z);
      const px2d = (p.x * pScale) + (this.canvasWidth / 2);
      const py2d = (p.y * pScale) + (this.canvasHeight / 2);

      if (
        px2d >= 0
        && px2d <= this.canvasWidth
        && py2d >= 0
        && py2d <= this.canvasHeight
      ) {
        const distance = Math.hypot(px2d - x2d, py2d - y2d);

        if (distance < 50) {
          ctx.beginPath();
          ctx.moveTo(x2d, y2d);
          ctx.lineTo(px2d, py2d);
          const isDark = this.theme === 'dark';
          let alpha = isDark
            ? (1 - (distance / 50)) * 0.5
            : (1 - (distance / 50)) * 0.4;

          const bottomFadeStart = this.canvasHeight - 150;
          const maxY = Math.max(y2d, py2d);
          if (maxY > bottomFadeStart) {
            const fadeProgress = (maxY - bottomFadeStart) / 150;
            alpha *= (1 - fadeProgress);
          }

          ctx.strokeStyle = `rgba(${ isDark ? '0, 255, 0' : '0, 100, 0' }, ${ alpha })`;
          ctx.lineWidth = isDark ? 1 : 0.7;
          ctx.stroke();
          Particle.lineCount++;
        }
      }
    });
  }
}