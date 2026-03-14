// src/scripts/theme-toggle.js
export function setupThemeToggle() {
  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('theme-toggle-icon');

  if (!toggleBtn) return;

  function updateTheme(isDark) {
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (toggleIcon) toggleIcon.textContent = '☀️';
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (toggleIcon) toggleIcon.textContent = '🌙';
    }
  }

  const isDarkMode = html.classList.contains('dark');
  if (toggleIcon) toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';

  toggleBtn.addEventListener('click', () => {
    const newDarkMode = !html.classList.contains('dark');
    updateTheme(newDarkMode);
  });
}

setupThemeToggle();
