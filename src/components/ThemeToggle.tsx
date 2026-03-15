'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    // Evita hydration mismatch — renderiza placeholder del mismo tamaño
    return (
      <div
        className="w-9 h-9 rounded-full glass-panel"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="p-2 rounded-full glass-panel transition-all duration-200 hover:scale-110"
      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
    >
      {/* Ambos iconos en gris neutro — sin colores llamativos */}
      {isDark
        ? <Sun size={18} style={{ color: 'var(--text-muted)' }} />
        : <Moon size={18} style={{ color: 'var(--text-muted)' }} />
      }
    </button>
  );
}
