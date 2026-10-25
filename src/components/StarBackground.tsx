import { useEffect, useRef } from 'react';

// Fondo "Hiperespacio" en Three.js. Se carga aparte (import dinámico)
// para no retrasar el primer render de la página.
export default function StarBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import('../lib/starfield').then(({ startStarfield }) => {
      if (!cancelled && ref.current) stop = startStarfield(ref.current);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <div ref={ref} className="stars-wrapper" aria-hidden="true" />;
}
