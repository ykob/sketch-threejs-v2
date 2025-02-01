import { clamp } from './clamp';

export const smoothstep = (e0: number, e1: number, x: number): number => {
  if (e0 >= e1) return 0;
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};
