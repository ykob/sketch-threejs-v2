const sleep = (delay: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

const MathEx = {
  degrees: (radian: number): number => {
    return (radian / Math.PI) * 180
  },
  radians: (degree: number): number => {
    return (degree * Math.PI) / 180
  },
  clamp: (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
  },
  mix: (x1: number, x2: number, a: number): number => {
    return x1 * (1 - a) + x2 * a
  },
  step: (e: number, x: number): number => {
    return x >= e ? 1 : 0
  },
  smoothstep: (e0: number, e1: number, x: number): number => {
    if (e0 >= e1) {
      return 0
    }
    const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1)
    return t * t * (3 - 2 * t)
  },
  spherical: (radian1: number, radian2: number, radius: number): number[] => {
    return [
      Math.cos(radian1) * Math.cos(radian2) * radius,
      Math.sin(radian1) * radius,
      Math.cos(radian1) * Math.sin(radian2) * radius,
    ]
  },
  randomArbitrary: (min: number, max: number): number => {
    return Math.random() * (max - min) + min
  },
  randomInt: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  randomNorm: (): number => {
    const r1 = Math.random()
    const r2 = Math.random()
    const value = Math.sqrt(-2 * Math.log(r1)) * Math.sin(2 * Math.PI * r2)

    return (value + 3) / 6
  },
}

export { sleep, MathEx }
