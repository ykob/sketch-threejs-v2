export const debounce = (fn: Function, delay: number) => {
  let timer: number;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
