export const percent = (fraction: number): string => `${fraction * 100}%`;
export const easeInCubic = (x: number) => Math.min(Math.max(x * x * x, 0), 1);
