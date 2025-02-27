export interface DSParticleType {
  radius: number;
  angle: number;
  angularSpeed: number;
  radialSpeed: number;
  opacity: number;
  fadeState: 'fadingIn' | 'visible' | 'fadingOut';
  fadeProgress: number;
  baseSize: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  originalColor: string;
  connectionOffset: number;
  isFlashing: boolean;
  flashProgress: number;
  theme: string;
}

export interface DSTransform {
  x: number;
  y: number;
  scale: number;
}