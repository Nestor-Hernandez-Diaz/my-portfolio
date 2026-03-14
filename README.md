# Nestor Portfolio 2026 - Clean Tech Luxury

Portfolio personal de **Nestor Hernández Díaz** - Estudiante de Ingeniería de Sistemas e Informática especializado en experiencias digitales de alto impacto.

## Project Overview

Este proyecto es un portfolio web de alto impacto diseñado con **Stitch (Google)** e implementado con **Astro** para máxima performance y escalabilidad.

### Features

✨ **Diseño de lujo**: Interfaz minimalista y sofisticada  
🌓 **Tema dual**: Modo oscuro y claro con toggle dinámico  
⚡ **Ultra rápido**: Astro + Static HTML para máxima velocidad  
🎨 **Altamente personalizado**: Tailwind CSS + Stitch design system  
📱 **Responsive**: Optimizado para desktop, tablet y mobile  
♿ **Accesible**: Cumple con estándares WCAG  
🔍 **SEO optimizado**: Metadatos y structured data  

## Stack Técnico

- **Framework**: [Astro](https://astro.build)
- **Diseño**: [Stitch (Google)](https://stitch.googleapis.com)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com) + CSS personalizado
- **Fonts**: Plus Jakarta Sans (Google Fonts)
- **Tema**: Sistema de variables CSS con soporte dark/light mode
- **Hosting**: [Vercel](https://vercel.com)

## Instalación & Desarrollo

```bash
# Clonar repositorio
git clone <repository-url>
cd my-portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (localhost:3000)
npm run dev

# Compilar para producción
npm run build

# Pre visualizar build estático
npm run preview
```

## Estructura de Carpetas

```
src/
├── pages/
│   └── index.astro          # Página principal con ambos temas
├── components/
│   └── ThemeToggle.astro    # Componente de toggle de tema
├── assets/
│   ├── stitch-light.html    # HTML tema claro (Stitch)
│   ├── stitch-dark.html     # HTML tema oscuro (Stitch)
│   └── ...
├── styles/
│   └── global.css           # Estilos globales
└── ...
```

## Tema Oscuro/Claro

El toggle de tema está ubicado en la esquina superior derecha (🌙/☀️):

- **Dark Mode**: Clase `.dark` en `<html>`
- **Light Mode**: Sin clase (default)
- **Persistencia**: Guardado en localStorage
- **Auto-detección**: Respeta `prefers-color-scheme` del SO

### Cambiar tema programáticamente:

```js
// Cambiar a oscuro
document.documentElement.classList.add('dark');
localStorage.setItem('theme', 'dark');

// Cambiar a claro
document.documentElement.classList.remove('dark');
localStorage.setItem('theme', 'light');
```

## Deployment en Vercel

1. **Conectar repositorio**:
   - Push el código a GitHub
   - Ir a [Vercel](https://vercel.com)
   - Importar proyecto desde GitHub

2. **Configuración automática**:
   - Vercel detectará que es un proyecto Astro
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy**:
   ```bash
   npm run build
   # o simplemente hacer push a main branch
   ```

## Optimizaciones

- ✅ Imágenes optimizadas (Stitch)
- ✅ Tailwind CSS purged (producción)
- ✅ JavaScript inline para tema (sin flash of unstyled content)
- ✅ CSS variables para transiciones suaves
- ✅ Fonts pre-conectadas (Google Fonts)

## Mantenimiento

### Actualizar contenido de Stitch:

1. Editar diseño en Stitch
2. Descargar HTML (light y dark)
3. Reemplazar `src/assets/stitch-light.html` y `stitch-dark.html`
4. Commitear cambios: `git add . && git commit -m "update: sync with stitch"`
5. Vercel deployará automáticamente

## Contacto

- Email: [tu-email@example.com]
- LinkedIn: [tu-perfil]
- GitHub: [tu-perfil]
- Portfolio: https://nestor-portfolio.vercel.app

## Licencia

© 2026 Nestor Hernández Díaz. Todos los derechos reservados.
