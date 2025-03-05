export const spherical = (radian1: number, radian2: number, radius: number) => {
  const x = radius * Math.sin(radian1) * Math.cos(radian2);
  const y = radius * Math.sin(radian1) * Math.sin(radian2);
  const z = radius * Math.cos(radian1);

  return { x, y, z };
};
