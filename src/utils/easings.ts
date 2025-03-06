const easeInQuad = (t: number) => t * t;
const easeOutQuad = (t: number) => t * (2 - t);
const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
const easeInCubic = (t: number) => t * t * t;
const easeOutCubic = (t: number) => --t * t * t + 1;
const easeInOutCubic = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
const easeInQuart = (t: number) => t * t * t * t;
const easeOutQuart = (t: number) => 1 - --t * t * t * t;
const easeInOutQuart = (t: number) => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
const easeInQuint = (t: number) => t * t * t * t * t;
const easeOutQuint = (t: number) => 1 + --t * t * t * t * t;
const easeInOutQuint = (t: number) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
const easeInSine = (t: number) => 1 - Math.cos((t * Math.PI) / 2);
const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
const easeInOutSine = (t: number) => (1 - Math.cos(Math.PI * t)) / 2;
const easeInExpo = (t: number) => Math.pow(2, 10 * (t - 1));
const easeOutExpo = (t: number) => 1 - Math.pow(2, -10 * t);
const easeInOutExpo = (t: number) => {
  return t < 0.5
    ? Math.pow(2, 20 * t - 10) / 2
    : (2 - Math.pow(2, -20 * t + 10)) / 2;
};
const easeInCirc = (t: number) => 1 - Math.sqrt(1 - t * t);
const easeOutCirc = (t: number) => Math.sqrt(1 - --t * t);
const easeInOutCirc = (t: number) => {
  return t < 0.5
    ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
    : (Math.sqrt(1 - 4 * --t * t) + 1) / 2;
};
const easeInBack = (t: number) => t * t * (2.70158 * t - 1.70158);
const easeOutBack = (t: number) => 1 + --t * t * (2.70158 * t + 1.70158);
const easeInOutBack = (t: number) => {
  const s = 1.70158 * 1.525;
  if (t < 0.5) {
    return 2 * t * t * ((s + 1) * 2 * t - s);
  } else {
    return 1 + 2 * --t * t * ((s + 1) * 2 * t + s);
  }
};
const easeInElastic = (t: number) => {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  return (
    -Math.pow(2, 10 * t - 10) * Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3)
  );
};
const easeOutElastic = (t: number) => {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  return (
    Math.pow(2, -10 * t) * Math.sin(((t * 10 - 0.75) * (2 * Math.PI)) / 3) + 1
  );
};
const easeInOutElastic = (t: number) => {
  if (t === 0) {
    return 0;
  }
  if (t === 1) {
    return 1;
  }
  t *= 2;
  if (t < 1) {
    return (
      -0.5 *
      Math.pow(2, 10 * t - 10) *
      Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3)
    );
  }
  return (
    Math.pow(2, -10 * (t - 1)) *
      Math.sin(((t * 10 - 10.75) * (2 * Math.PI)) / 3) *
      0.5 +
    1
  );
};
export {
  easeInBack,
  easeInCirc,
  easeInCubic,
  easeInElastic,
  easeInExpo,
  easeInOutBack,
  easeInOutCirc,
  easeInOutCubic,
  easeInOutElastic,
  easeInOutExpo,
  easeInOutQuad,
  easeInOutQuart,
  easeInOutQuint,
  easeInOutSine,
  easeInQuad,
  easeInQuart,
  easeInQuint,
  easeInSine,
  easeOutBack,
  easeOutCirc,
  easeOutCubic,
  easeOutElastic,
  easeOutExpo,
  easeOutQuad,
  easeOutQuart,
  easeOutQuint,
  easeOutSine,
};
