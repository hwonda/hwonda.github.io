export interface DAParticleType {
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
  speed: number;
  isFlashing?: boolean;
  theme?: string;
}

export interface DAPoint2D {
  x: number;
  y: number;
}