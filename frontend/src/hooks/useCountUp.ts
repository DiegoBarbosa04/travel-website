import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Anima um número do valor atual até `target`, com desaceleração no final.
export function useCountUp(target: number, duration = 1600, delay = 0) {
  const [value, setValue] = useState(0);
  const valueRef = useRef(0);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const from = valueRef.current;
    let frame = 0;
    let start: number | null = null;

    const step = (now: number) => {
      start ??= now + delay;
      const progress = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      valueRef.current = from + (target - from) * eased;
      setValue(valueRef.current);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, delay, reducedMotion]);

  return reducedMotion ? target : value;
}
