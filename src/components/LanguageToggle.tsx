'use client';

import { useState, useEffect } from 'react';

type Language = 'es' | 'en';

export default function LanguageToggle() {
  const [lang, setLang] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('language') as Language;
    if (stored === 'en' || stored === 'es') {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const toggle = () => {
    const nextLang: Language = lang === 'es' ? 'en' : 'es';
    setLang(nextLang);
    localStorage.setItem('language', nextLang);
    document.documentElement.lang = nextLang;

    // Dispatch custom event para que otros componentes puedan reaccionar
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: nextLang } }));
  };

  if (!mounted) {
    return (
      <div
        className="w-12 h-8 rounded-full glass-panel"
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="glass-panel px-3 py-1.5 rounded-full text-xs font-semibold
                 transition-colors duration-200 hover:text-[var(--text)]"
      style={{ color: 'var(--text-muted)' }}
    >
      {lang.toUpperCase()}
    </button>
  );
}
