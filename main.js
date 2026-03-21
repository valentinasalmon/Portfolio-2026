/**
 * Valentina Salmon — Portfolio
 * main.js
 * Author: Valentina Salmon
 * Last updated: Marzo 2026
 */

'use strict';

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById('cur');
  const trail  = document.getElementById('curt');
  if (!cursor || !trail) return;

  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    trail.style.left = trailX + 'px';
    trail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
  })();
})();

/* ── PROGRESS BAR ──────────────────────────────────────────── */
(function initProgressBar() {
  const bar = document.getElementById('bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const doc    = document.documentElement;
    const pct    = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ── SCROLL REVEAL ─────────────────────────────────────────── */
(function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.07,
    rootMargin: '0px 0px -30px 0px',
  });

  document.querySelectorAll('.reveal, .stagger, .section-label')
    .forEach((el) => observer.observe(el));
})();

/* ── ICON LIBRARY ──────────────────────────────────────────── */
const ICONS = {
  python: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.3 2 7.5 3.2 7.5 4.8V6h4.5v.5H5.3C3.4 6.5 2 8 2 10.5s1.4 4 3.3 4H6v-2.1c0-2 1.4-3.4 3-3.4h6c1.4 0 2.5-1 2.5-2.5V4.8C17.5 3.2 14.7 2 12 2zm-1.5 1.8a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="currentColor"/><path d="M12 22c2.7 0 4.5-1.2 4.5-2.8V18H12v-.5h6.7c1.9 0 3.3-1.5 3.3-4s-1.4-4-3.3-4H18v2.1c0 2-1.4 3.4-3 3.4H9c-1.4 0-2.5 1-2.5 2.5v2.7C6.5 20.8 9.3 22 12 22zm1.5-1.8a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="currentColor"/></svg>`,
  js:     `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" opacity=".15"/><rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" stroke-width="1.5"/><path d="M8 16.5c0 1.2.7 2 1.9 2 1.3 0 2.1-.8 2.1-2V11h-1.5v5.4c0 .5-.2.8-.6.8s-.6-.3-.6-.8L8 16.5zM14 16.1l1.4-.8c.3.5.6.9 1.2.9.5 0 .9-.2.9-.9V11H19v4.3c0 2-1.2 2.8-2.6 2.8-1.3 0-2.1-.7-2.4-1.9z" fill="currentColor"/></svg>`,
  react:  `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" stroke-width="1.5" transform="rotate(120 12 12)"/></svg>`,
  html:   `<svg viewBox="0 0 24 24" fill="none"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 8h8l-.6 6.5L12 16l-3.4-1.5L8 8z" fill="currentColor" opacity=".2" stroke="currentColor" stroke-width="1.2"/></svg>`,
  css:    `<svg viewBox="0 0 24 24" fill="none"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 8h8M8.4 12h7.2M9 16h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  tailwind:`<svg viewBox="0 0 24 24" fill="none"><path d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.1 2.15 4.6 2.15 2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C17.62 7.15 16.5 6 14 6h-2zM7 12c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.5 18 12 18c2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.76-.19-1.3-.74-1.9-1.35-.98-1-2.1-2.15-4.6-2.15H7z" fill="currentColor"/></svg>`,
  mysql:  `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" stroke-width="1.5"/><path d="M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" stroke="currentColor" stroke-width="1.5"/></svg>`,
  mongo:  `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2s-6 7.5-6 12a6 6 0 0012 0C18 9.5 12 2 12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 6v14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  node:   `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 2v20M3 7l9 5 9-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  supabase:`<svg viewBox="0 0 24 24" fill="none"><path d="M3 12l9-9 9 9-9 9-9-9z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3 12h18M12 3v18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>`,
  paint:  `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4z" fill="currentColor"/><path d="M5 16s-1 2-1 3a2 2 0 004 0c0-1-1-3-1-3H5z" fill="currentColor" opacity=".65"/><path d="M8 14l8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  robot:  `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="9" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 13h.01M15 13h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9 17h6M12 9V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="5" r="1.5" fill="currentColor"/><path d="M5 13H3M21 13h-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  wave:   `<svg viewBox="0 0 24 24" fill="none"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".5"/></svg>`,
  team:   `<svg viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="17" cy="9" r="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6M17 14c2.2.8 4 2.7 4 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  puzzle: `<svg viewBox="0 0 24 24" fill="none"><path d="M9 3h6v3.5c.8-.3 1.8 0 1.8 1s-1 1.3-1.8 1V12h-3.5c.3.8 0 1.8-1 1.8S9 12.8 9 12H5.5V9c-.8.3-1.8 0-1.8-1s1-1.3 1.8-1V3zM15 12h3.5v3c.8-.3 1.8 0 1.8 1s-1 1.3-1.8 1V21H9v-3.5c-.8.3-1.8 0-1.8-1s1-1.3 1.8-1V12h3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  book:   `<svg viewBox="0 0 24 24" fill="none"><path d="M4 19V7a2 2 0 012-2h12a2 2 0 012 2v12M4 19a2 2 0 002 2h12a2 2 0 002-2M8 7v14M12 9h4M12 12h4M12 15h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  chat:   `<svg viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
};

/* ── TECH STACK ─────────────────────────────────────────────── */
(function initSkills() {
  const container = document.getElementById('skills-row');
  if (!container) return;

  /** @type {Array<{name: string, icon: string, accent: string, hover: string}>} */
  const SKILLS = [
    { name: 'Python',     icon: ICONS.python,    accent: '#9B30FF', hover: '#1e0040' },
    { name: 'JavaScript', icon: ICONS.js,         accent: '#FFE500', hover: '#1a1500' },
    { name: 'React',      icon: ICONS.react,      accent: '#00BFFF', hover: '#001525' },
    { name: 'HTML',       icon: ICONS.html,       accent: '#FF2D78', hover: '#200010' },
    { name: 'CSS',        icon: ICONS.css,        accent: '#CC80FF', hover: '#1a0030' },
    { name: 'Tailwind',   icon: ICONS.tailwind,   accent: '#38BDF8', hover: '#001820' },
    { name: 'MySQL',      icon: ICONS.mysql,      accent: '#FF6B00', hover: '#1a0a00' },
    { name: 'Next.js',    icon: ICONS.node,       accent: '#6DBF67', hover: '#0a1f09' },
    { name: 'Supabase',   icon: ICONS.supabase,   accent: '#3ECF8E', hover: '#001a0e' },
    { name: 'MongoDB',    icon: ICONS.mongo,      accent: '#00C896', hover: '#001a12' },
  ];

  const fragment = document.createDocumentFragment();

  SKILLS.forEach(({ name, icon, accent, hover }) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.style.setProperty('--card-accent', accent);
    card.style.setProperty('--card-hover', hover);
    card.setAttribute('aria-label', name);
    card.innerHTML = `
      <div class="skill-icon" style="color:${accent}">${icon}</div>
      <div class="skill-name">${name}</div>`;
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
})();

/* ── SOFT SKILL ICONS ───────────────────────────────────────── */
(function initSoftIcons() {
  /** @type {Record<string, {icon: string, color: string}>} */
  const SOFT_ICONS = {
    'soft-paint':  { icon: ICONS.paint,  color: '#fff' },
    'soft-robot':  { icon: ICONS.robot,  color: '#fff' },
    'soft-wave':   { icon: ICONS.wave,   color: '#0D0010' },
    'soft-team':   { icon: ICONS.team,   color: '#0D0010' },
    'soft-puzzle': { icon: ICONS.puzzle, color: '#0D0010' },
    'soft-book':   { icon: ICONS.book,   color: '#fff' },
    'soft-chat':   { icon: ICONS.chat,   color: '#fff' },
  };

  Object.entries(SOFT_ICONS).forEach(([id, { icon, color }]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = icon;
    el.style.color = color;
  });
})();

/* ── PHOTO UPLOAD ───────────────────────────────────────────── */
(function initPhotoUpload() {
  const input = document.getElementById('photo-input');
  if (!input) return;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const box  = document.getElementById('photo-box');
    if (!box) return;

    box.innerHTML = `<img class="photo-img" src="${url}" alt="Valentina Salmon">`;
  });
})();

/* ── HERO CANVAS (Y2K animated background) ──────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const hero = document.getElementById('hero');
  let W, H;

  function resize() {
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  const PALETTE = [
    [255, 45,  120],
    [0,   191, 255],
    [204, 255, 0  ],
    [155, 48,  255],
    [255, 229, 0  ],
    [255, 107, 0  ],
  ];

  // Morphing blobs
  const blobs = PALETTE.map((color, i) => ({
    px: W * (0.08 + 0.84 / PALETTE.length * i),
    py: H * (0.2  + Math.random() * 0.6),
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.4,
    r:  Math.min(W, H) * (0.18 + Math.random() * 0.13),
    color,
    t:  Math.random() * 6.28,
    ox: Math.random() * 6.28,
    oy: Math.random() * 6.28,
    speed: 0.0005 + Math.random() * 0.0004,
  }));

  // Particle stars
  const particles = Array.from({ length: 75 }, () => ({
    x:  Math.random() * 1400,
    y:  Math.random() * 900,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.22,
    size: Math.random() * 2.2 + 0.5,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    opacity: Math.random() * 0.55 + 0.2,
    pulse:   Math.random() * 6.28,
    pulseSpeed: 0.022 + Math.random() * 0.025,
    isStar: Math.random() > 0.62,
  }));

  /**
   * Draws a 4-pointed star
   * @param {number} x
   * @param {number} y
   * @param {number} r
   * @param {number[]} color
   * @param {number} alpha
   */
  function drawStar(x, y, r, color, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle  = i * Math.PI / 4;
      const radius = i % 2 === 0 ? r : r * 0.38;
      ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw blobs
    blobs.forEach((b) => {
      b.t  += b.speed * 16;
      b.px += b.vx + Math.sin(b.t + b.ox) * 0.55;
      b.py += b.vy + Math.cos(b.t + b.oy) * 0.45;

      if (b.px < -b.r * 1.2) { b.px = -b.r * 1.2; b.vx =  Math.abs(b.vx); }
      if (b.px >  W + b.r * 1.2) { b.px = W + b.r * 1.2; b.vx = -Math.abs(b.vx); }
      if (b.py < -b.r * 1.2) { b.py = -b.r * 1.2; b.vy =  Math.abs(b.vy); }
      if (b.py >  H + b.r * 1.2) { b.py = H + b.r * 1.2; b.vy = -Math.abs(b.vy); }

      const R = b.r * (1 + 0.11 * Math.sin(b.t * 0.9 + b.ox));
      const [r, g, bl] = b.color;
      const grad = ctx.createRadialGradient(b.px, b.py, 0, b.px, b.py, R);
      grad.addColorStop(0,    `rgba(${r},${g},${bl},.22)`);
      grad.addColorStop(0.45, `rgba(${r},${g},${bl},.09)`);
      grad.addColorStop(1,    `rgba(${r},${g},${bl},0)`);

      ctx.beginPath();
      ctx.arc(b.px, b.py, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });

    // Draw particles
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      p.pulse += p.pulseSpeed;
      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      const [r, g, b] = p.color;

      if (p.isStar) {
        drawStar(p.x, p.y, p.size * 1.8, p.color, alpha * 0.9);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }
    });

    // Connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < 120) {
          const [r, g, b] = particles[i].color;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${0.1 * (1 - d / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // CRT scanlines overlay
    ctx.globalAlpha = 0.022;
    ctx.fillStyle = '#000';
    for (let y = 0; y < H; y += 3) {
      ctx.fillRect(0, y, W, 1);
    }
    ctx.globalAlpha = 1;

    requestAnimationFrame(draw);
  }

  draw();
})();

/* ── LANGUAGE TOGGLE ────────────────────────────────────────── */
(function initLang() {
  'use strict';

  const T = {
    es: {
      'nav-about':       'Sobre mí',
      'nav-skills':      'Skills',
      'nav-projects':    'Proyectos',
      'nav-edu':         'Educación',
      'nav-contact':     'Contacto',
      'nav-badge':       'Disponible',
      'hero-eyebrow':    '✦ Desarrollo web · IA & Automatización · Corrientes, AR',
      'hero-desc':       'Estudiante de Ingeniería en Sistemas de Información, apasionada por <em>inteligencia artificial y automatización</em>. Construyo software con criterio técnico y estético, busco espacios donde pueda desarrollar mi potencial.',
      'tag-ia':          'IA & Automatización',
      'tag-web':         'Desarrollo web',
      'tag-creative':    'Creatividad',
      'tag-year':        '5° año UCP',
      'tag-city':        'Corrientes, AR',
      'scroll-label':    'scroll',
      'about-label':     '✦ Sobre mí',
      'about-title':     'Hola, soy <span class="accent">Valen</span> <span class="outline">✦</span>',
      'about-quote':     '"Construyo cosas que se ven tan bien como funcionan."',
      'about-p1':        'Soy estudiante avanzada de Ingeniería en Sistemas de Información en la Universidad de la Cuenca del Plata, Corrientes. Me apasiona el cruce entre la tecnología y el diseño, potenciando al máximo mi creatividad.',
      'about-p2':        'Lo que más me entusiasma es el futuro: <strong>IA, automatizaciones y sistemas inteligentes</strong>.',
      'chip-ia':         'IA & Automatización',
      'chip-web':        'Desarrollo web',
      'chip-year':       '5° año UCP',
      'chip-lang':       'Inglés B1',
      'chip-city':       'Corrientes',
      'photo-label':     'Tu foto · click para subir',
      'sticker':         '✦ Disponible',
      'skills-label':    '✦ Tecnologías',
      'skills-title':    'El <span class="accent">stack</span> que uso',
      'soft-label':      '✦ Más que código',
      'soft-title':      'La persona <span class="accent">detrás</span> <span class="outline">del stack</span>',
      'soft-desc':       'El código lo escribe cualquiera. Lo que lo hace memorable es la persona que lo piensa.',
      'soft-c1-title':   'Creatividad & diseño',
      'soft-c1-desc':    'Me apasiona que las cosas se vean tan bien como funcionan.',
      'soft-c1-t1':      'UI/UX thinking',
      'soft-c1-t2':      'Diseño web',
      'soft-c1-t3':      'Detalle visual',
      'soft-c2-title':   'IA & futuro',
      'soft-c2-desc':    'Fascinada por la inteligencia artificial y la automatización.',
      'soft-c3-title':   'Adaptabilidad',
      'soft-c3-desc':    'Cada proyecto es un contexto nuevo. Me amoldo rápido.',
      'soft-c4-title':   'Trabajo en equipo',
      'soft-c4-desc':    'El mejor código se escribe junto.',
      'soft-c5-title':   'Resolución de problemas',
      'soft-c5-desc':    'Entiendo el problema antes de la primera línea.',
      'soft-c6-title':   'Aprendizaje continuo',
      'soft-c6-desc':    'La tecnología no para — yo tampoco.',
      'soft-c6-t1':      'Curiosidad constante',
      'soft-c6-t2':      'Proyectos propios',
      'soft-c6-t3':      'Comunidad tech',
      'soft-c7-title':   'Comunicación',
      'soft-c7-desc':    'Explicar lo complejo de forma simple.',
      'projects-label':  '✦ Proyectos',
      'projects-title':  'Lo que <span class="accent">construí</span>',
      'proj1-desc':      'Plataforma web completa para una concesionaria de motos de Corrientes. Catálogo por marca y modelo, sección de indumentaria, financiación, seguros y contacto por WhatsApp. Diseño responsive con identidad visual propia.',
      'proj1-badge':     'Web App · En producción',
      'proj1-arrow':     'Ver proyecto →',
      'proj2-desc':      'Aplicación web educativa e interactiva destinada al fortalecimiento de habilidades lingüísticas infantiles. Interfaz dinámica desarrollada con JavaScript, enfocada en la experiencia del usuario y la accesibilidad.',
      'proj2-badge':     'Ver código',
      'proj2-arrow':     'Ver en GitHub →',
      'soon-title':      'Próximo proyecto',
      'soon-label':      'En construcción',
      'edu-label':       '✦ Educación',
      'edu-title':       'Ingeniería en Sistemas de <span>Información</span>',
      'edu-uni':         'Universidad de la Cuenca del Plata',
      'edu-lbl1':        'Año actual',
      'edu-val1':        '5° año en curso',
      'edu-lbl2':        'Período',
      'edu-val2':        '2022 — Presente',
      'edu-lbl3':        'Sede',
      'edu-val3':        'Corrientes, Argentina',
      'edu-lbl4':        'Inglés',
      'edu-val4':        'Nivel B1',
      'edu-lbl5':        'Interés',
      'edu-val5':        'IA & Automatización',
      'edu-chip1':       '⚡ Estudiante avanzada',
      'edu-chip2':       'Desarrolladora Web',
      'edu-chip3':       'Bases de Datos',
      'edu-chip4':       'Ing. de Software',
      'edu-chip5':       'IA & Machine Learning',
      'contact-label':   '✦ Contacto',
      'contact-title':   'Hagamos algo <span class="accent">increíble</span>',
      'contact-meta':    'Corrientes, AR · Marzo 2026',
      'btn-email':       '✉ Email',
      'btn-linkedin':    '↗ LinkedIn',
      'btn-github':      '↗ GitHub',
      'btn-wa':          '💬 WhatsApp',
      'btn-video':       '▶ Video de presentación',
      'btn-cv':          '↓ Descargar CV',
    },
    en: {
      'nav-about':       'About',
      'nav-skills':      'Skills',
      'nav-projects':    'Projects',
      'nav-edu':         'Education',
      'nav-contact':     'Contact',
      'nav-badge':       'Available',
      'hero-eyebrow':    '✦ Web Development · AI & Automation · Corrientes, AR',
      'hero-desc':       'Information Systems Engineering student, passionate about <em>artificial intelligence and automation</em>. I build software with technical and aesthetic criteria, looking for spaces where I can develop my full potential.',
      'tag-ia':          'AI & Automation',
      'tag-web':         'Web Development',
      'tag-creative':    'Creativity',
      'tag-year':        '5th year',
      'tag-city':        'Corrientes, AR',
      'scroll-label':    'scroll',
      'about-label':     '✦ About me',
      'about-title':     'Hi, I\'m <span class="accent">Valen</span> <span class="outline">✦</span>',
      'about-quote':     '"I build things that work as good as they look."',
      'about-p1':        'I\'m an advanced student of Information Systems Engineering at Universidad de la Cuenca del Plata, Corrientes. I\'m passionate about the intersection of technology and design, pushing my creativity to the fullest.',
      'about-p2':        'What excites me most about the future: <strong>AI, automation and intelligent systems</strong>.',
      'chip-ia':         'AI & Automation',
      'chip-web':        'Web Development',
      'chip-year':       '5th year ',
      'chip-lang':       'English B1',
      'chip-city':       'Corrientes',
      'photo-label':     'Your photo · click to upload',
      'sticker':         '✦ Available',
      'skills-label':    '✦ Technologies',
      'skills-title':    'The <span class="accent">stack</span> I use',
      'soft-label':      '✦ More than code',
      'soft-title':      'The person <span class="accent">behind</span> <span class="outline">the stack</span>',
      'soft-desc':       'Anyone can write code. What makes it memorable is the person behind it.',
      'soft-c1-title':   'Creativity & design',
      'soft-c1-desc':    'I\'m passionate about things that look as good as they work.',
      'soft-c1-t1':      'UI/UX thinking',
      'soft-c1-t2':      'Web design',
      'soft-c1-t3':      'Visual detail',
      'soft-c2-title':   'AI & the future',
      'soft-c2-desc':    'Fascinated by artificial intelligence and automation.',
      'soft-c3-title':   'Adaptability',
      'soft-c3-desc':    'Every project is a new context. I adapt quickly.',
      'soft-c4-title':   'Teamwork',
      'soft-c4-desc':    'The best code is written together.',
      'soft-c5-title':   'Problem solving',
      'soft-c5-desc':    'I understand the problem before writing the first line.',
      'soft-c6-title':   'Continuous learning',
      'soft-c6-desc':    'Technology never stops — neither do I.',
      'soft-c6-t1':      'Constant curiosity',
      'soft-c6-t2':      'Personal projects',
      'soft-c6-t3':      'Tech community',
      'soft-c7-title':   'Communication',
      'soft-c7-desc':    'Explaining complex things in simple ways.',
      'projects-label':  '✦ Projects',
      'projects-title':  'What I\'ve <span class="accent">built</span>',
      'proj1-desc':      'Full stack web platform for a motorcycle dealership in Corrientes. Product catalog by brand and model, clothing section, financing, insurance and WhatsApp contact. Responsive design with its own visual identity.',
      'proj1-badge':     'Web App · Live',
      'proj1-arrow':     'View project →',
      'proj2-desc':      'Interactive educational web app aimed at strengthening children\'s language skills. Dynamic interface built with JavaScript, focused on user experience and accessibility.',
      'proj2-badge':     'View code',
      'proj2-arrow':     'View on GitHub →',
      'soon-title':      'Next project',
      'soon-label':      'Coming soon',
      'edu-label':       '✦ Education',
      'edu-title':       'Information <span>Systems</span> Engineering',
      'edu-uni':         'Universidad de la Cuenca del Plata',
      'edu-lbl1':        'Current year',
      'edu-val1':        '5th year (ongoing)',
      'edu-lbl2':        'Period',
      'edu-val2':        '2022 — Present',
      'edu-lbl3':        'Location',
      'edu-val3':        'Corrientes, Argentina',
      'edu-lbl4':        'English',
      'edu-val4':        'B1 Level',
      'edu-lbl5':        'Interest',
      'edu-val5':        'AI & Automation',
      'edu-chip1':       '⚡ Advanced student',
      'edu-chip2':       'Web Developer',
      'edu-chip3':       'Databases',
      'edu-chip4':       'Software Eng.',
      'edu-chip5':       'AI & Machine Learning',
      'contact-label':   '✦ Contact',
      'contact-title':   'Let\'s build something <span class="accent">amazing</span>',
      'contact-meta':    'Corrientes, AR · March 2026',
      'btn-email':       '✉ Email',
      'btn-linkedin':    '↗ LinkedIn',
      'btn-github':      '↗ GitHub',
      'btn-wa':          '💬 WhatsApp',
      'btn-video':       '▶ Presentation video',
      'btn-cv':          '↓ Download CV',
    }
  };

  let lang = 'es';
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  function applyLang(l) {
    const t = T[l];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.documentElement.lang = l;
    btn.textContent = l === 'es' ? 'EN' : 'ES';
    lang = l;
  }

  btn.addEventListener('click', () => applyLang(lang === 'es' ? 'en' : 'es'));
})();