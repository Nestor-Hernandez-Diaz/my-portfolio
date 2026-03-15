'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  twinkleDur: number;
  twinkleDelay: number;
  driftX: number;
  driftY: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const rand = Math.random();
    const size = rand < 0.6 ? 'sm' : rand < 0.85 ? 'md' : 'lg';
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      twinkleDur: 3 + Math.random() * 4,
      twinkleDelay: Math.random() * 5,
      driftX: (Math.random() - 0.5) * 30,
      driftY: (Math.random() - 0.5) * 30,
    };
  });
}

const SIZES = {
  sm: 1,
  md: 2,
  lg: 3,
};

export default function StarBackground() {
  const particles = useRef<Particle[]>(generateParticles(100));

  return (
    <div className="stars-wrapper" aria-hidden="true">
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          className={`particle star-${p.size}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${SIZES[p.size]}px`,
            height: `${SIZES[p.size]}px`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.3, 1],
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
          }}
          transition={{
            duration: p.twinkleDur,
            delay: p.twinkleDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
