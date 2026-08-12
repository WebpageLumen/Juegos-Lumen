/* =========================================================
   FIGURAS
========================================================= */

const SHAPES = [
  'M50 5 L61 38 L95 38 L67 59 L78 91 L50 71 L22 91 L33 59 L5 38 L39 38 Z',
  'M50 5 L95 50 L50 95 L5 50 Z',
  'M50 6 L61 34 L91 34 L67 52 L77 82 L50 64 L23 82 L33 52 L9 34 L39 34 Z',
  'M28 6 L72 6 L95 50 L72 94 L28 94 L5 50 Z',
  'M50 88 L12 50 C1 38 5 18 21 12 C33 7 44 12 50 23 C56 12 67 7 79 12 C95 18 99 38 88 50 Z',
  'M50 5 C68 25 84 43 84 60 C84 79 69 95 50 95 C31 95 16 79 16 60 C16 43 32 25 50 5 Z',
  'M58 5 L24 55 L49 55 L38 95 L76 42 L52 42 Z',
  'M50 7 C75 18 91 43 83 67 C74 92 44 96 24 81 C7 73 5 39 18 23 C26 13 38 7 50 7 Z',
  'M50 15 C58 2 77 4 82 19 C94 18 100 33 92 43 C99 53 93 67 81 66 C76 82 57 84 49 71 C37 84 18 82 13 66 C1 67 -5 53 2 43 C-6 33 0 18 12 19 C17 4 36 2 44 15 Z',
  'M62 8 C45 8 31 20 27 36 C21 62 39 86 65 86 C75 86 85 83 92 76 C85 85 72 94 55 94 C29 94 8 73 8 47 C8 24 25 5 48 5 C53 5 58 6 62 8 Z',
  'M50 6 L93 38 L76 89 L24 89 L7 38 Z',
  'M50 5 L91 18 L86 58 C83 77 68 90 50 95 C32 90 17 77 14 58 L9 18 Z',
  'M28 70 C15 70 5 60 5 47 C5 35 14 25 26 24 C31 11 44 2 58 5 C72 8 82 20 83 34 C93 35 100 43 100 53 C100 64 91 73 80 73 Z',
  'M50 8 C59 8 65 16 66 24 C73 18 84 18 89 26 C95 35 90 46 82 50 C90 54 95 65 89 74 C84 82 73 82 66 76 C65 84 59 92 50 92 C41 92 35 84 34 76 C27 82 16 82 11 74 C5 65 10 54 18 50 C10 46 5 35 11 26 C16 18 27 18 34 24 C35 16 41 8 50 8 Z',
  'M10 50 L55 50 L55 25 L92 58 L55 91 L55 66 L10 66 Z',
  'M12 12 H88 V88 H12 Z',
  'M50 8 L95 92 L5 92 Z',
  'M35 10 L65 10 L65 35 L90 35 L90 65 L65 65 L65 90 L35 90 L35 65 L10 65 L10 35 L35 35 Z',
  'M30 10 L70 10 L90 30 L90 70 L70 90 L30 90 L10 70 L10 30 Z',
  'M40 10 L60 10 L60 40 L90 40 L90 60 L60 60 L60 90 L40 90 L40 60 L10 60 L10 40 L40 40 Z',
  'M50 20 A30 30 0 1 1 50 80 A30 30 0 1 1 50 20',
  'M10 30 L50 10 L90 30 L90 50 L50 30 L10 50 Z M10 60 L50 40 L90 60 L90 80 L50 60 L10 80 Z',
  'M50 95 C20 80 5 60 5 40 C5 15 25 5 50 5 C75 5 95 15 95 40 C95 60 80 80 50 95 Z',
  'M50 50 m-45 0 a45 45 0 1 0 90 0 a45 45 0 0 0 -60 -45 Z',
  'M50 5 A45 45 0 1 1 50 95 A45 45 0 1 1 50 5 M50 25 A25 25 0 1 0 50 75 A25 25 0 1 0 50 25 Z'
];

/* =========================================================
   COLORES
========================================================= */

const COLORS = [
  '#F48FB1',
  '#29B6F6',
  '#FFEE58',
  '#CE93D8',
  '#FF8A65',
  '#EC407A',
  '#0288D1',
  '#FDD835',
  '#AB47BC',
  '#FF7043',
  '#F06292',
  '#03A9F4',
  '#FFCA28',
  '#BA68C8',
  '#FFA726',
  '#FF80AB',
  '#4FC3F7',
  '#FFF176',
  '#E040FB',
  '#FFAB91',
  '#F8BBD0',
  '#B3E5FC',
  '#FFF9C4',
  '#EA80FC',
  '#FFCC80'
];

/* =========================================================
   NIVELES
========================================================= */

const LEVELS = [
  {
    rows: 3,
    cols: 3,
    theme: {
      bg1: '#E0F7FA',
      bg2: '#B3E5FC',
      panel: '#81D4FA',
      accent: '#29B6F6',
      text: '#5D5D81',
      elements: 'clouds',
      name: 'Cielo Celeste'
    }
  },

  {
    rows: 4,
    cols: 4,
    theme: {
      bg1: '#FCE4EC',
      bg2: '#F8BBD0',
      panel: '#F48FB1',
      accent: '#F06292',
      text: '#5D5D81',
      elements: 'bubbles',
      name: 'Rosa Pastel'
    }
  },

  {
    rows: 5,
    cols: 5,
    theme: {
      bg1: '#FFFDE7',
      bg2: '#FFF9C4',
      panel: '#FFF176',
      accent: '#FDD835',
      text: '#5D5D81',
      elements: 'stars',
      name: 'Sol Amarillo'
    }
  },

  {
    rows: 6,
    cols: 6,
    theme: {
      bg1: '#F3E5F5',
      bg2: '#E1BEE7',
      panel: '#CE93D8',
      accent: '#AB47BC',
      text: '#5D5D81',
      elements: 'flowers',
      name: 'Lunas Violetas'
    }
  }
];

/* =========================================================
   MENSAJES
========================================================= */

const MASCOT_MSGS = [
  '¡Muy bien!',
  '¡Excelente!',
  '¡Sigue así!',
  '¡Lo lograste!',
  '¡Genial!',
  '¡Gran trabajo!'
];

const INSPIRE_MSGS = [
  '¡Eres increíble! 🌟',
  '¡Lo hiciste genial! 🎉',
  '¡Muy buen trabajo! 🧩',
  '¡Sigue así, campeón! 🚀',
  '¡Tu mente es brillante! ✨',
  '¡Fantástico! 🌈',
  '¡Eres imparable! 💪'
];

/* =========================================================
   VARIABLES DEL JUEGO
========================================================= */

let currentLevel = 0;
let placedCount = 0;
let totalSlots = 9;

let activeShapes = [];
let slots = [];
let pieces = [];

let dragging = null;

/* =========================================================
   ELEMENTOS DEL INDEX.HTML
========================================================= */

const appRoot = document.getElementById('appRoot');
const puzzleEl = document.getElementById('puzzle');
const trayEl = document.getElementById('tray');
const progressStars = document.getElementById('progressStars');

const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');

const levelCompleteEl =
  document.getElementById('levelComplete');

const completeText =
  document.getElementById('completeText');

const continueBtn =
  document.getElementById('continueBtn');

const bgLayer =
  document.getElementById('bgLayer');

const mascotBubble =
  document.getElementById('mascotBubble');

const mascotFox =
  document.getElementById('mascotFox');

const infoBtn =
  document.getElementById('infoBtn');

const infoModal =
  document.getElementById('infoModal');

const closeInfoBtn =
  document.getElementById('closeInfoBtn');

/* =========================================================
   COMPROBAR ELEMENTOS DEL HTML
========================================================= */

const requiredElements = {
  appRoot,
  puzzleEl,
  trayEl,
  progressStars,
  nextBtn,
  resetBtn,
  levelCompleteEl,
  completeText,
  continueBtn,
  bgLayer,
  mascotBubble,
  mascotFox,
  infoBtn,
  infoModal,
  closeInfoBtn
};

Object.entries(requiredElements).forEach(
  ([name, element]) => {
    if (!element) {
      console.warn(
        `No se encontró el elemento #${name} en index.html`
      );
    }
  }
);

/* =========================================================
   CREAR SVG
========================================================= */

function svgMarkup(d, fill, isSlot = false) {
  const stroke = isSlot ? 'none' : 'white';
  const strokeWidth = isSlot ? '0' : '4';

  return `
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="${d}"
        fill="${fill}"
        stroke="${stroke}"
        stroke-width="${strokeWidth}"
        stroke-linejoin="round"
      />
    </svg>
  `;
}

/* =========================================================
   MEZCLAR ARRAY
========================================================= */

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/* =========================================================
   ELEMENTOS DEL FONDO
========================================================= */

function generateBgElements(type) {
  if (!bgLayer) return;

  bgLayer.innerHTML = '';

  const count = 15;

  const colors = [
    'rgba(255,255,255,0.6)',
    'rgba(244,143,177,0.2)',
    'rgba(41,182,246,0.2)'
  ];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');

    el.classList.add('floating-element');

    el.style.left =
      Math.random() * 100 + 'vw';

    el.style.animationDuration =
      10 + Math.random() * 15 + 's';

    el.style.animationDelay =
      Math.random() * 5 + 's';

    if (type === 'clouds') {
      el.classList.add('cloud');

      el.style.width =
        60 + Math.random() * 60 + 'px';

      el.style.background =
        colors[
          Math.floor(
            Math.random() * colors.length
          )
        ];

    } else if (type === 'bubbles') {
      el.style.width =
        20 + Math.random() * 30 + 'px';

      el.style.height =
        el.style.width;

      el.style.background =
        'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(244,143,177,0.3))';

    } else if (type === 'stars') {
      el.style.width =
        15 + Math.random() * 20 + 'px';

      el.style.height =
        el.style.width;

      el.style.borderRadius = '0';

      el.style.background = '#FFF9C4';

      el.style.transform = 'rotate(45deg)';

    } else if (type === 'flowers') {
      el.style.width =
        20 + Math.random() * 20 + 'px';

      el.style.height =
        el.style.width;

      const flowerColors = [
        '#F8BBD0',
        '#E1BEE7',
        '#B3E5FC',
        '#FFF9C4'
      ];

      el.style.background =
        flowerColors[
          Math.floor(
            Math.random() * flowerColors.length
          )
        ];
    }

    bgLayer.appendChild(el);
  }
}

/* =========================================================
   APLICAR TEMA
========================================================= */

function applyTheme(theme) {
  const root = document.documentElement;

  root.style.setProperty(
    '--bg-1',
    theme.bg1
  );

  root.style.setProperty(
    '--bg-2',
    theme.bg2
  );

  root.style.setProperty(
    '--panel-border',
    theme.panel
  );

  root.style.setProperty(
    '--accent',
    theme.accent
  );

  root.style.setProperty(
    '--text',
    theme.text
  );

  generateBgElements(theme.elements);
}

/* =========================================================
   INICIAR NIVEL
========================================================= */

function initLevel() {
  if (
    !puzzleEl ||
    !trayEl ||
    !progressStars
  ) {
    return;
  }

  const lvl = LEVELS[currentLevel];

  totalSlots =
    lvl.rows * lvl.cols;

  placedCount = 0;

  document.documentElement.style.setProperty(
    '--piece-size',
    lvl.rows > 4
      ? '60px'
      : '75px'
  );

  puzzleEl.style.gap =
    lvl.rows > 4
      ? '10px'
      : '15px';

  applyTheme(lvl.theme);

  /* Crear lista de figuras */

  let availableShapes =
    Array.from(
      { length: SHAPES.length },
      (_, i) => i
    );

  shuffleArray(availableShapes);

  activeShapes =
    availableShapes.slice(
      0,
      totalSlots
    );

  shuffleArray(activeShapes);

  /* Ocultar pantalla de victoria */

  if (levelCompleteEl) {
    levelCompleteEl.classList.remove(
      'show'
    );

    levelCompleteEl
      .querySelectorAll(
        '.confetti-piece'
      )
      .forEach(conf => conf.remove());
  }

  /* Estrellas */

  progressStars.innerHTML = '';

  for (
    let i = 0;
    i < totalSlots;
    i++
  ) {
    const starSvg = `
      <svg
        class="star-icon"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87
             1.18 6.88L12 17.77l-6.18 3.25
             L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    `;

    progressStars.insertAdjacentHTML(
      'beforeend',
      starSvg
    );
  }

  /* Configurar grid */

  puzzleEl.style.setProperty(
    '--rows',
    lvl.rows
  );

  puzzleEl.style.setProperty(
    '--cols',
    lvl.cols
  );

  puzzleEl.innerHTML = '';
  trayEl.innerHTML = '';

  slots = [];
  pieces = [];

  /* Crear espacios */

  activeShapes.forEach(
    (shapeIdx, i) => {
      const slotDiv =
        document.createElement('div');

      slotDiv.className = 'slot';

      slotDiv.dataset.slotId = i;

      slotDiv.dataset.shapeIdx =
        shapeIdx;

      slotDiv.innerHTML =
        svgMarkup(
          SHAPES[shapeIdx],
          'rgba(93,93,129,0.25)',
          true
        );

      puzzleEl.appendChild(
        slotDiv
      );

      slots.push({
        id: i,
        el: slotDiv,
        shapeIdx: shapeIdx,
        occupied: false
      });
    }
  );

  /* Crear piezas */

  const trayShapes =
    [...activeShapes];

  shuffleArray(trayShapes);

  trayShapes.forEach(
    shapeIdx => {
      const color =
        COLORS[
          shapeIdx %
          COLORS.length
        ];

      const pieceDiv =
        document.createElement('div');

      pieceDiv.className = 'piece';

      pieceDiv.dataset.shapeIdx =
        shapeIdx;

      pieceDiv.innerHTML =
        svgMarkup(
          SHAPES[shapeIdx],
          color,
          false
        );

      trayEl.appendChild(
        pieceDiv
      );

      pieces.push({
        el: pieceDiv,
        shapeIdx: shapeIdx,
        placed: false,
        isAnimating: false,
        forceCleanup: null,
        originRect: null
      });
    }
  );
}

/* =========================================================
   ÉXITO
========================================================= */

function triggerSuccess(
  pieceData,
  pieceDiv,
  targetSlot
) {
  if (
    !pieceData ||
    !pieceDiv ||
    !targetSlot
  ) {
    return;
  }

  pieceData.isAnimating = true;

  const appRect =
    appRoot.getBoundingClientRect();

  const slotRect =
    targetSlot.el.getBoundingClientRect();

  const pieceRect =
    pieceDiv.getBoundingClientRect();

  pieceDiv.classList.remove(
    'dragging'
  );

  pieceDiv.style.transition =
    'left 0.4s cubic-bezier(.25,.75,.5,1.25), top 0.4s cubic-bezier(.25,.75,.5,1.25), transform 0.4s cubic-bezier(.25,.75,.5,1.25)';

  const targetLeftView =
    slotRect.left +
    slotRect.width / 2 -
    pieceRect.width / 2;

  const targetTopView =
    slotRect.top +
    slotRect.height / 2 -
    pieceRect.height / 2;

  pieceDiv.style.left =
    targetLeftView -
    appRect.left +
    'px';

  pieceDiv.style.top =
    targetTopView -
    appRect.top +
    'px';

  pieceDiv.classList.add(
    'snap-success'
  );

  targetSlot.el.classList.add(
    'flash-success'
  );

  targetSlot.occupied = true;

  pieceData.placed = true;

  /* Brillos */

  const sparkleContainer =
    document.createElement('div');

  sparkleContainer.classList.add(
    'sparkle-container'
  );

  sparkleContainer.style.left =
    slotRect.left +
    slotRect.width / 2 +
    'px';

  sparkleContainer.style.top =
    slotRect.top +
    slotRect.height / 2 +
    'px';

  document.body.appendChild(
    sparkleContainer
  );

  for (let i = 0; i < 8; i++) {
    const sp =
      document.createElement('div');

    sp.classList.add('sparkle');

    sp.style.background = [
      '#F48FB1',
      '#29B6F6',
      '#FFEE58',
      '#FFFFFF'
    ][
      Math.floor(
        Math.random() * 4
      )
    ];

    const angle =
      Math.random() *
      Math.PI *
      2;

    const dist =
      20 +
      Math.random() * 30;

    sp.style.transform =
      `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;

    sparkleContainer.appendChild(sp);
  }

  setTimeout(() => {
    sparkleContainer.remove();
  }, 1200);

  showMascotMessage();

  let isCleanedUp = false;

  const cleanup = () => {
    if (isCleanedUp) return;

    isCleanedUp = true;

    pieceDiv.classList.remove(
      'snap-success'
    );

    pieceDiv.style.transition =
      'none';

    pieceDiv.style.position =
      'absolute';

    pieceDiv.style.width =
      '100%';

    pieceDiv.style.height =
      '100%';

    pieceDiv.style.left = '0';
    pieceDiv.style.top = '0';

    pieceDiv.style.zIndex = '5';

    pieceDiv.classList.add(
      'placed'
    );

    targetSlot.el.appendChild(
      pieceDiv
    );

    targetSlot.el.classList.add(
      'occupied'
    );

    placedCount++;

    if (
      progressStars.children[
        placedCount - 1
      ]
    ) {
      progressStars.children[
        placedCount - 1
      ].classList.add(
        'earned'
      );
    }

    pieceData.isAnimating =
      false;

    pieceData.forceCleanup =
      null;

    if (
      placedCount ===
      totalSlots
    ) {
      setTimeout(
        showLevelComplete,
        600
      );
    }
  };

  const transitionHandler =
    e => {
      if (
        e.propertyName !== 'left'
      ) {
        return;
      }

      pieceDiv.removeEventListener(
        'transitionend',
        transitionHandler
      );

      cleanup();
    };

  pieceDiv.addEventListener(
    'transitionend',
    transitionHandler
  );

  setTimeout(
    cleanup,
    500
  );
}

/* =========================================================
   FALLA
========================================================= */

function triggerFail(
  pieceData,
  pieceDiv
) {
  if (
    !pieceData ||
    !pieceDiv
  ) {
    return;
  }

  pieceData.isAnimating = true;

  pieceDiv.classList.remove(
    'dragging'
  );

  pieceDiv.classList.add(
    'snap-fail'
  );

  pieceDiv.style.transition =
    'left 0.6s ease-in-out, top 0.6s ease-in-out, transform 0.6s ease-in-out';

  pieceDiv.style.left =
    pieceData.originRect.left +
    'px';

  pieceDiv.style.top =
    pieceData.originRect.top +
    'px';

  let isCleanedUp = false;

  const cleanup = () => {
    if (isCleanedUp) return;

    isCleanedUp = true;

    pieceDiv.classList.remove(
      'snap-fail'
    );

    pieceDiv.style.transition =
      'none';

    pieceDiv.style.position =
      'relative';

    pieceDiv.style.width = '';
    pieceDiv.style.height = '';
    pieceDiv.style.left = '';
    pieceDiv.style.top = '';

    pieceDiv.style.zIndex = '10';

    trayEl.appendChild(
      pieceDiv
    );

    pieceData.isAnimating =
      false;

    pieceData.forceCleanup =
      null;
  };

  pieceData.forceCleanup =
    cleanup;

  const transitionHandler =
    e => {
      if (
        e.propertyName !== 'left'
      ) {
        return;
      }

      pieceDiv.removeEventListener(
        'transitionend',
        transitionHandler
      );

      cleanup();
    };

  pieceDiv.addEventListener(
    'transitionend',
    transitionHandler
  );

  setTimeout(
    cleanup,
    700
  );
}

/* =========================================================
   INICIAR ARRASTRE
========================================================= */

function startDrag(
  e,
  pieceDiv
) {
  if (dragging) return;

  e.preventDefault();

  const shapeIdx =
    parseInt(
      pieceDiv.dataset.shapeIdx,
      10
    );

  const pieceData =
    pieces.find(
      p =>
        p.shapeIdx === shapeIdx &&
        !p.placed
    );

  if (!pieceData) {
    return;
  }

  if (
    pieceData.isAnimating &&
    pieceData.forceCleanup
  ) {
    pieceData.forceCleanup();
  }

  const appRect =
    appRoot.getBoundingClientRect();

  const rect =
    pieceDiv.getBoundingClientRect();

  pieceData.originRect = {
    left:
      rect.left -
      appRect.left,

    top:
      rect.top -
      appRect.top,

    width:
      rect.width,

    height:
      rect.height
  };

  pieceDiv.classList.add(
    'dragging'
  );

  pieceDiv.style.position =
    'absolute';

  pieceDiv.style.left =
    pieceData.originRect.left +
    'px';

  pieceDiv.style.top =
    pieceData.originRect.top +
    'px';

  pieceDiv.style.width =
    pieceData.originRect.width +
    'px';

  pieceDiv.style.height =
    pieceData.originRect.height +
    'px';

  pieceDiv.style.zIndex =
    '9999';

  appRoot.appendChild(
    pieceDiv
  );

  dragging = {
    piece: pieceData,
    el: pieceDiv,
    offsetX:
      e.clientX -
      rect.left,

    offsetY:
      e.clientY -
      rect.top,

    pointerId:
      e.pointerId
  };

  try {
    pieceDiv.setPointerCapture(
      e.pointerId
    );
  } catch (error) {
    console.warn(
      'No se pudo capturar el puntero.',
      error
    );
  }
}

/* =========================================================
   MOVER PIEZA
========================================================= */

function moveDrag(e) {
  if (!dragging) {
    return;
  }

  const appRect =
    appRoot.getBoundingClientRect();

  dragging.el.style.left =
    e.clientX -
    appRect.left -
    dragging.offsetX +
    'px';

  dragging.el.style.top =
    e.clientY -
    appRect.top -
    dragging.offsetY +
    'px';

  const correctSlot =
    slots.find(
      s =>
        s.shapeIdx ===
          dragging.piece.shapeIdx &&
        !s.occupied
    );

  if (!correctSlot) {
    return;
  }

  const r =
    correctSlot.el.getBoundingClientRect();

  const cx =
    r.left +
    r.width / 2;

  const cy =
    r.top +
    r.height / 2;

  const dist =
    Math.hypot(
      e.clientX - cx,
      e.clientY - cy
    );

  if (
    dist <
    r.width * 0.3
  ) {
    correctSlot.el.classList.add(
      'magnet-hover'
    );

    const pd =
      dragging.piece;

    const el =
      dragging.el;

    dragging = null;

    triggerSuccess(
      pd,
      el,
      correctSlot
    );

    return;
  }

  if (
    dist <
    r.width * 0.6
  ) {
    correctSlot.el.classList.add(
      'magnet-hover'
    );
  } else {
    correctSlot.el.classList.remove(
      'magnet-hover'
    );
  }
}

/* =========================================================
   SOLTAR PIEZA
========================================================= */

function endDrag() {
  if (!dragging) {
    return;
  }

  const pieceData =
    dragging.piece;

  const pieceDiv =
    dragging.el;

  dragging = null;

  slots.forEach(
    s => {
      s.el.classList.remove(
        'magnet-hover'
      );
    }
  );

  const pieceRect =
    pieceDiv.getBoundingClientRect();

  const pcx =
    pieceRect.left +
    pieceRect.width / 2;

  const pcy =
    pieceRect.top +
    pieceRect.height / 2;

  let targetSlot = null;

  let minDist =
    Infinity;

  slots.forEach(
    s => {
      if (s.occupied) {
        return;
      }

      const r =
        s.el.getBoundingClientRect();

      const cx =
        r.left +
        r.width / 2;

      const cy =
        r.top +
        r.height / 2;

      const dist =
        Math.hypot(
          pcx - cx,
          pcy - cy
        );

      if (
        dist <
          r.width * 0.6 &&
        dist <
          minDist
      ) {
        minDist = dist;
        targetSlot = s;
      }
    }
  );

  if (
    targetSlot &&
    targetSlot.shapeIdx ===
      pieceData.shapeIdx
  ) {
    triggerSuccess(
      pieceData,
      pieceDiv,
      targetSlot
    );
  } else {
    triggerFail(
      pieceData,
      pieceDiv
    );
  }
}

/* =========================================================
   MENSAJE DE MASCOTA
========================================================= */

function showMascotMessage() {
  if (!mascotBubble) {
    return;
  }

  const msg =
    MASCOT_MSGS[
      Math.floor(
        Math.random() *
        MASCOT_MSGS.length
      )
    ];

  mascotBubble.textContent =
    msg;

  mascotBubble.classList.add(
    'show'
  );

  if (mascotFox) {
    mascotFox.classList.add(
      'bounce'
    );
  }

  setTimeout(() => {
    mascotBubble.classList.remove(
      'show'
    );
  }, 2500);

  if (mascotFox) {
    setTimeout(() => {
      mascotFox.classList.remove(
        'bounce'
      );
    }, 600);
  }
}

/* =========================================================
   COMPLETAR NIVEL
========================================================= */

function showLevelComplete() {
  if (!levelCompleteEl) {
    return;
  }

  const msg =
    INSPIRE_MSGS[
      Math.floor(
        Math.random() *
        INSPIRE_MSGS.length
      )
    ];

  if (completeText) {
    completeText.textContent =
      msg;
  }

  levelCompleteEl.classList.add(
    'show'
  );

  const theme =
    LEVELS[currentLevel].theme;

  const pastelColors = [
    theme.bg1,
    theme.bg2,
    theme.panel,
    theme.accent,
    '#FFD700',
    '#FFFFFF'
  ];

  for (
    let i = 0;
    i < 50;
    i++
  ) {
    const conf =
      document.createElement('div');

    conf.classList.add(
      'confetti-piece'
    );

    conf.style.left =
      Math.random() * 100 +
      'vw';

    conf.style.top =
      '-50px';

    conf.style.background =
      pastelColors[
        Math.floor(
          Math.random() *
          pastelColors.length
        )
      ];

    conf.style.animationDelay =
      Math.random() * 2 +
      's';

    levelCompleteEl.appendChild(
      conf
    );
  }
}

/* =========================================================
   LIMPIAR CONFETI
========================================================= */

function clearConfetti() {
  if (!levelCompleteEl) {
    return;
  }

  levelCompleteEl
    .querySelectorAll(
      '.confetti-piece'
    )
    .forEach(
      conf => conf.remove()
    );
}

/* =========================================================
   EVENTOS
========================================================= */

/* Arrastrar */

document.addEventListener(
  'pointerdown',
  e => {
    const pieceDiv =
      e.target.closest(
        '.piece:not(.placed)'
      );

    if (pieceDiv) {
      startDrag(
        e,
        pieceDiv
      );
    }
  }
);

document.addEventListener(
  'pointermove',
  moveDrag
);

document.addEventListener(
  'pointerup',
  endDrag
);

document.addEventListener(
  'pointercancel',
  endDrag
);

/* =========================================================
   BOTÓN INFORMACIÓN
========================================================= */

if (infoBtn && infoModal) {
  infoBtn.addEventListener(
    'click',
    () => {
      infoModal.classList.add(
        'show'
      );
    }
  );
}

/* =========================================================
   CERRAR INFORMACIÓN
========================================================= */

if (
  closeInfoBtn &&
  infoModal
) {
  closeInfoBtn.addEventListener(
    'click',
    () => {
      infoModal.classList.remove(
        'show'
      );
    }
  );
}

/* =========================================================
   SIGUIENTE NIVEL
========================================================= */

if (nextBtn) {
  nextBtn.addEventListener(
    'click',
    () => {
      currentLevel =
        (currentLevel + 1) %
        LEVELS.length;

      initLevel();
    }
  );
}

/* =========================================================
   REINICIAR
========================================================= */

if (resetBtn) {
  resetBtn.addEventListener(
    'click',
    () => {
      if (levelCompleteEl) {
        levelCompleteEl.classList.remove(
          'show'
        );
      }

      clearConfetti();

      initLevel();
    }
  );
}

/* =========================================================
   CONTINUAR
========================================================= */

if (continueBtn) {
  continueBtn.addEventListener(
    'click',
    () => {
      if (levelCompleteEl) {
        levelCompleteEl.classList.remove(
          'show'
        );
      }

      clearConfetti();

      currentLevel =
        (currentLevel + 1) %
        LEVELS.length;

      initLevel();
    }
  );
}

/* =========================================================
   CERRAR MODAL AL HACER CLICK FUERA
========================================================= */

if (infoModal) {
  infoModal.addEventListener(
    'click',
    e => {
      if (
        e.target === infoModal
      ) {
        infoModal.classList.remove(
          'show'
        );
      }
    }
  );
}

/* =========================================================
   INICIAR JUEGO
========================================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (infoModal) {
      infoModal.classList.add(
        'show'
      );
    }

    initLevel();
  }
);