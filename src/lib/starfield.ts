import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

// Fondo "Hiperespacio": estrellas que viajan hacia la cámara.
// Velocidad en unidades por segundo; ajusta estos valores para cambiar el ritmo.
const CRUISE_SPEED = 9;      // velocidad de crucero, sin interacción
const BOOST_SPEED = 22;      // velocidad extra máxima al mover el mouse o hacer scroll
const PARALLAX = 0.12;       // cuánto gira la cámara hacia el cursor (radianes)
const DEPTH = 150;

const THEMES = {
  dark: { colors: ['#ffffff', '#ffffff', '#ffffff', '#a6c4ff'], opacity: 1, blending: AdditiveBlending, size: 0.6 },
  light: { colors: ['#334155', '#475569', '#1e293b', '#2563eb'], opacity: 0.55, blending: NormalBlending, size: 0.5 },
};

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)');
  gr.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  gr.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

/** Monta el fondo en `container` y devuelve la función que lo desmonta. */
export function startStarfield(container: HTMLElement): () => void {
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDark = () => document.documentElement.classList.contains('dark');

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(70, 1, 0.1, DEPTH + 50);

  const count = Math.round(Math.min(3200, Math.max(900, (innerWidth * innerHeight) / 550)));
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const shade = new Float32Array(count); // índice de color de cada estrella, para cambiar de tema
  let spanX = 60;

  const respawn = (i: number, far: boolean) => {
    positions[i * 3] = (Math.random() - 0.5) * 2 * spanX;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = far ? -DEPTH : -Math.random() * DEPTH;
  };
  for (let i = 0; i < count; i++) {
    respawn(i, false);
    shade[i] = Math.random();
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new BufferAttribute(positions, 3));
  geometry.setAttribute('color', new BufferAttribute(colors, 3));

  const material = new PointsMaterial({
    map: dotTexture(),
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new Points(geometry, material));

  const applyTheme = () => {
    const theme = isDark() ? THEMES.dark : THEMES.light;
    const palette = theme.colors.map((c) => new Color(c));
    for (let i = 0; i < count; i++) {
      const c = palette[Math.min(palette.length - 1, Math.floor(shade[i] * palette.length))];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.attributes.color.needsUpdate = true;
    material.opacity = theme.opacity;
    material.blending = theme.blending;
    material.size = theme.size;
    material.needsUpdate = true;
  };

  const resize = () => {
    const w = innerWidth, h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    spanX = 60 * Math.max(w / h, 0.75);
  };

  // Interacción: el puntero mueve la cámara; moverlo o hacer scroll acelera un poco
  const pointer = { x: 0, y: 0 };
  let boost = 0;
  let lastMove = { x: 0, y: 0, t: performance.now() };
  const onPointerMove = (e: PointerEvent) => {
    pointer.x = e.clientX / innerWidth - 0.5;
    pointer.y = e.clientY / innerHeight - 0.5;
    const now = performance.now();
    const dt = Math.max(16, now - lastMove.t);
    const pxPerSec = (Math.hypot(e.clientX - lastMove.x, e.clientY - lastMove.y) / dt) * 1000;
    boost = Math.max(boost, Math.min(1, pxPerSec / 2500));
    lastMove = { x: e.clientX, y: e.clientY, t: now };
  };
  let lastScroll = scrollY;
  const onScroll = () => {
    boost = Math.max(boost, Math.min(1, Math.abs(scrollY - lastScroll) / 120));
    lastScroll = scrollY;
  };

  let speed = CRUISE_SPEED;
  let frame = 0;
  let last = performance.now();
  const tick = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    boost = Math.max(0, boost - dt * 0.9);
    const target = CRUISE_SPEED + BOOST_SPEED * boost;
    speed += (target - speed) * Math.min(1, dt * (target > speed ? 2.5 : 1.2));

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += speed * dt;
      if (positions[i * 3 + 2] > 1) respawn(i, true);
    }
    geometry.attributes.position.needsUpdate = true;

    camera.rotation.y += (-pointer.x * PARALLAX - camera.rotation.y) * Math.min(1, dt * 2);
    camera.rotation.x += (pointer.y * PARALLAX * 0.7 - camera.rotation.x) * Math.min(1, dt * 2);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(tick);
  };

  const themeObserver = new MutationObserver(() => {
    applyTheme();
    if (reduceMotion) renderer.render(scene, camera);
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  const onResize = () => {
    resize();
    if (reduceMotion) renderer.render(scene, camera);
  };

  resize();
  applyTheme();
  addEventListener('resize', onResize);
  if (reduceMotion) {
    renderer.render(scene, camera);
  } else {
    addEventListener('pointermove', onPointerMove, { passive: true });
    addEventListener('scroll', onScroll, { passive: true });
    frame = requestAnimationFrame(tick);
  }

  return () => {
    cancelAnimationFrame(frame);
    themeObserver.disconnect();
    removeEventListener('resize', onResize);
    removeEventListener('pointermove', onPointerMove);
    removeEventListener('scroll', onScroll);
    geometry.dispose();
    material.map?.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
