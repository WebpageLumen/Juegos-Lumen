(function() {
/* =========================================================
   TRADUCCIONES (DICCIONARIO DE IDIOMAS)
========================================================= */
const translations = {
    es: {
        title: "Encuentra la Figura Mágica",
        basketTitle: "🪄 Bolsa Mágica",
        statLevel: "Nivel", statTime: "Tiempo", statScore: "Progreso",
        hintBtn: "Necesito una Pista ✨",
        levelText: (lvl, sub) => `Nivel ${lvl} - ${sub}/10`,
        targetText: (lvl) => `Nivel ${lvl}: Encuentra la figura intrusa. Mira su borde brillante!`,
        hintMsg: "La figura intrusa tiene un suave resplandor mágico en su borde. Obsérvala con atención.",
        winTitle: "¡Completaste todos los niveles!",
        winDesc: (count) => `Encontraste las ${count} figuras mágicas. ¡Tu vista es poderosa!`,
        winBtn: "✨ Jugar de nuevo",
        loseTitle: "¡Se acabó el tiempo!",
        loseDesc: "Respira hondo y vuelve a intentarlo. ¡Cada intento te hace mejor!",
        loseBtn: "✨ Comenzar de nuevo",
        praiseMsgs: [
            "¡Brillante! La encontraste como un verdadero mago.",
            "¡Súper! Tu atención está creciendo muchísimo.",
            "¡Genial! Eres rapidísimo buscando la intrusa.",
            "¡Fantástico! Vas dominando cada nivel.",
            "¡Excelente! Tu mirada está muy entrenada.",
            "¡Wow! Lo hiciste con mucha precisión.",
            "¡Perfecto! Cada vez lo haces mejor.",
            "¡Increíble! Estás concentrando de maravilla.",
            "¡Muy bien! Tu ojo mágico está afinadísimo.",
            "¡Lo lograste! Sigue así, vas excelente."
        ]
    },
    en: {
        title: "Find the Magic Figure",
        basketTitle: "🪄 Magic Bag",
        statLevel: "Level", statTime: "Time", statScore: "Progress",
        hintBtn: "Need a Hint ✨",
        levelText: (lvl, sub) => `Level ${lvl} - ${sub}/10`,
        targetText: (lvl) => `Level ${lvl}: Find the intruder figure. Look at its shiny edge!`,
        hintMsg: "The intruder figure has a soft magical glow on its edge. Look at it carefully.",
        winTitle: "You completed all levels!",
        winDesc: (count) => `You found the ${count} magic figures. Your sight is powerful!`,
        winBtn: "✨ Play again",
        loseTitle: "Time is up!",
        loseDesc: "Take a deep breath and try again. Every attempt makes you better!",
        loseBtn: "✨ Start over",
        praiseMsgs: [
            "Brilliant! You found it like a true magician.",
            "Super! Your attention is growing so much.",
            "Great! You are super fast finding the intruder.",
            "Fantastic! You are mastering each level.",
            "Excellent! Your sight is well trained.",
            "Wow! You did it with great precision.",
            "Perfect! You do it better every time.",
            "Incredible! You are concentrating wonderfully.",
            "Very good! Your magic eye is finely tuned.",
            "You did it! Keep it up, you are doing great."
        ]
    }
};

let currentLang = localStorage.getItem("lumen-lang") || "es";
let t = translations[currentLang] || translations["es"];

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lumen-lang", lang);
    t = translations[lang] || translations["es"];

    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    setText("titleText", t.title);
    setText("basketTitle", t.basketTitle);
    setText("statLevel", t.statLevel);
    setText("statTime", t.statTime);
    setText("statScore", t.statScore);
    setText("hintBtn", t.hintBtn);

    // Actualizar textos dinámicos si el juego está activo
    if (typeof state !== 'undefined' && !state.gameOver) {
        const levelNum = state.level < 10 ? 1 : 2;
        const subLevelNum = (state.level % 10) + 1;
        setText("level", t.levelText(levelNum, subLevelNum));
        setText("targetText", t.targetText(levelNum));
    }

    const langEsBtn = document.getElementById("langEs");
    const langEnBtn = document.getElementById("langEn");
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");
}

// Configurar menú de ajustes
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
        const isVisible = settingsMenu.style.display === "flex";
        settingsMenu.style.display = isVisible ? "none" : "flex";
    });
}
if (document.getElementById("langEs")) {
    document.getElementById("langEs").addEventListener("click", () => {
        changeLanguage("es");
        settingsMenu.style.display = "none";
    });
}
if (document.getElementById("langEn")) {
    document.getElementById("langEn").addEventListener("click", () => {
        changeLanguage("en");
        settingsMenu.style.display = "none";
    });
}

/* =========================================================
   LÓGICA ORIGINAL DEL JUEGO
========================================================= */

const board = document.getElementById('board');
const fxLayer = document.getElementById('fxLayer');
const basketBox = document.getElementById('basketBox');
const basket = document.getElementById('basket');
const magicBag = document.getElementById('magicBag');
const bagParticles = document.getElementById('bagParticles');
const magicCount = document.getElementById('magicCount');
const basketInnerGlow = document.getElementById('basketInnerGlow');
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlayContent');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const timerEl = document.getElementById('timer');
const targetBubble = document.getElementById('targetBubble');
const targetText = document.getElementById('targetText');
const progressBar = document.getElementById('progressBar');
const toast = document.getElementById('toast');
const hintBtn = document.getElementById('hintBtn');

const GAME_TIME = 150;
const TOTAL_SUBLEVELS = 20; // 2 niveles x 10 subniveles

function generateLevelConfig(levelIdx) {
  if (levelIdx < 10) {
    const i = levelIdx;
    const h = 286 + (i % 3) * 2;
    return {
      levelName: 1,
      shapes: ['circle'],
      colors: [{ h, s: 38 - (i % 4), l: 52 - (i % 5) * 2 }],
      count: 20 + (i % 5)
    };
  } else {
    const i = levelIdx - 10;
    const h1 = (20 + (i % 5) * 15) % 360;
    const h2 = (h1 + 30 + (i % 3) * 10) % 360;
    return {
      levelName: 2,
      shapes: ['square'],
      colors: i < 5 ? [{ h: h1, s: 65, l: 50 }] : [{ h: h1, s: 65, l: 50 }, { h: h2, s: 65, l: 50 }],
      count: 22 + (i % 5)
    };
  }
}

let state = {
  level: 0,
  remaining: GAME_TIME,
  timerId: null,
  gameOver: false,
  bagCount: 0
};

let ambientTimer = null;
let bagParticleTimer = null;
let lastPraise = -1;
let hintTimeout = null;

function rand(min, max) { return Math.random() * (max - min) + min; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function fmtTime(total) {
  const m = Math.floor(total / 60);
  const s = Math.max(0, total % 60);
  return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}
function hsl(h, s, l) { return `hsl(${h} ${s}% ${l}%)`; }

function praiseMessages() {
  return t.praiseMsgs;
}

function showPraise() {
  const msgs = praiseMessages();
  let idx = Math.floor(Math.random() * msgs.length);
  if (idx === lastPraise) idx = (idx + 1) % msgs.length;
  lastPraise = idx;
  toast.textContent = msgs[idx];
  toast.classList.remove('show-hint');
  toast.classList.remove('show-praise');
  void toast.offsetWidth;
  toast.classList.add('show-praise');
  if (hintTimeout) clearTimeout(hintTimeout);
}

function showHint() {
  if (state.gameOver) return;
  toast.textContent = t.hintMsg;
  toast.classList.remove('show-praise');
  toast.classList.remove('show-hint');
  void toast.offsetWidth;
  toast.classList.add('show-hint');
  if (hintTimeout) clearTimeout(hintTimeout);
  hintTimeout = setTimeout(() => {
    toast.classList.remove('show-hint');
  }, 5000);
}

function updateMagicCount() {
  magicCount.textContent = `✨ ×${state.bagCount}`;
}

function updateUI() {
  scoreEl.textContent = state.level;
  const levelNum = state.level < 10 ? 1 : 2;
  const subLevelNum = (state.level % 10) + 1;
  
  levelEl.textContent = t.levelText(levelNum, subLevelNum);
  timerEl.textContent = fmtTime(state.remaining);
  progressBar.style.width = `${(state.level / TOTAL_SUBLEVELS) * 100}%`;

  const cfg = generateLevelConfig(state.level);
  const targetColor = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
  const targetH = clamp(targetColor.h, 0, 360);
  const targetS = clamp(targetColor.s, 0, 100);
  const targetL = clamp(targetColor.l, 0, 100);

  targetBubble.style.background = `radial-gradient(circle at 30% 30%, ${hsl(targetH, targetS + 18, Math.min(92, targetL + 18))}, ${hsl(targetH, targetS, targetL)} 58%, ${hsl(targetH - 5, targetS + 8, Math.max(8, targetL - 16))} 100%)`;

  targetBubble.style.clipPath = 'none';
  targetBubble.style.borderRadius = '50%';
  if (levelNum === 2) {
    targetBubble.style.borderRadius = '15%';
  }

  targetText.textContent = t.targetText(levelNum);
}

function clearTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function startTimer() {
  clearTimer();
  state.remaining = GAME_TIME;
  updateUI();
  state.timerId = setInterval(() => {
    if (state.gameOver) return;
    state.remaining -= 1;
    updateUI();
    if (state.remaining <= 0) {
      state.remaining = 0;
      updateUI();
      endGame(false);
    }
  }, 1000);
}

function buildBubbleGradient(h, s, l) {
  return `radial-gradient(circle at 30% 30%, ${hsl(h, clamp(s + 16, 0, 100), clamp(l + 18, 0, 100))}, ${hsl(h, s, l)} 60%, ${hsl(h - 6, clamp(s + 8, 0, 100), clamp(l - 16, 0, 100))} 100%)`;
}

function createBubble({ x, y, size, shape, role, bg }) {
  const el = document.createElement('div');
  el.className = 'bubble' + (role === 'intruder' ? ' intruder' : '');
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  el.style.background = bg;
  el.dataset.role = role;

  if (shape === 'square') {
    el.style.borderRadius = '15%';
  } else {
    el.style.borderRadius = '50%';
  }

  el.addEventListener('click', () => {
    if (state.gameOver) return;
    if (el.dataset.role === 'intruder') hitIntruder(el);
  });

  board.appendChild(el);
  return el;
}

function ambientParticles() {
  fxLayer.querySelectorAll('.ambient-particle').forEach(n => n.remove());
  const rect = board.getBoundingClientRect();
  const total = Math.max(18, Math.min(32, Math.round((rect.width * rect.height) / 45000)));

  for (let i = 0; i < total; i++) {
    const p = document.createElement('div');
    p.className = 'ambient-particle';
    const size = rand(3, 8);
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = rand(0, rect.width) + 'px';
    p.style.top = rand(0, rect.height) + 'px';
    p.style.background = `radial-gradient(circle, rgba(255,255,255,.95), rgba(224,206,255,.65) 55%, rgba(184,233,255,.18) 100%)`;
    p.style.setProperty('--x', '0px');
    p.style.setProperty('--y', '0px');
    p.style.setProperty('--dx', rand(-80, 80) + 'px');
    p.style.setProperty('--s', rand(.6, 1.2));
    p.style.animationDuration = rand(12, 22) + 's';
    p.style.animationDelay = rand(0, 6) + 's';
    fxLayer.appendChild(p);
  }
}

function bagParticlesBurst(amount = 10) {
  for (let i = 0; i < amount; i++) {
    const p = document.createElement('div');
    p.className = 'bagParticle' + (Math.random() > 0.72 ? ' star' : '');
    const angle = rand(0, Math.PI * 2);
    const dist = rand(18, 90);
    const x = 110 + rand(-20, 20);
    const y = 110 + rand(-25, 20);
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.animationDuration = rand(1.8, 2.8) + 's';
    p.style.animationDelay = rand(0, .05) + 's';
    bagParticles.appendChild(p);
    setTimeout(() => p.remove(), 3000);
  }
}

function basketPulse() {
  basket.classList.remove('basketPop');
  void basket.offsetWidth;
  basket.classList.add('basketPop');
}

function bagDropFx() {
  magicBag.animate([
    { transform: 'translateY(0) rotate(-3deg)' },
    { transform: 'translateY(5px) rotate(-2deg)' },
    { transform: 'translateY(0) rotate(-3deg)' }
  ], { duration: 420, easing: 'ease-out' });

  basketInnerGlow.animate([
    { opacity: .7, transform: 'translateX(-50%) scale(1)' },
    { opacity: 1, transform: 'translateX(-50%) scale(1.12)' },
    { opacity: .78, transform: 'translateX(-50%) scale(1)' }
  ], { duration: 460, easing: 'ease-out' });

  bagParticlesBurst(14);
  basketPulse();
}

function generateLevel() {
  const cfg = generateLevelConfig(state.level);
  board.innerHTML = '';
  nextFrameBuild(cfg);
  updateUI();
  startTimer();
}

function nextFrameBuild(cfg) {
  board.classList.remove('enter');
  void board.offsetWidth;
  board.classList.add('enter');

  requestAnimationFrame(() => {
    const rect = board.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    const count = cfg.count;
    const size = clamp(Math.min(W, H) / 11, 90, 130);
    const cols = Math.max(4, Math.ceil(Math.sqrt(count)));
    const rows = Math.ceil(count / cols);
    const cellW = W / cols;
    const cellH = H / rows;
    const positions = [];

    for (let i = 0; i < count; i++) {
      const gx = i % cols;
      const gy = Math.floor(i / cols);
      const x = gx * cellW + (cellW - size) / 2;
      const y = gy * cellH + (cellH - size) / 2;
      positions.push({ x, y });
    }

    positions.sort(() => Math.random() - 0.5);

    const pool = [];
    for (let i = 0; i < count; i++) {
      const shape = cfg.shapes[Math.floor(Math.random() * cfg.shapes.length)];
      const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
      pool.push({ shape, color });
    }

    const intruderIdx = Math.floor(Math.random() * count);
    const intruderShape = pool[intruderIdx].shape;
    const intruderColor = pool[intruderIdx].color;

    let hasDuplicate = false;
    for (let i = 0; i < count; i++) {
      if (i !== intruderIdx && pool[i].shape === intruderShape && pool[i].color.h === intruderColor.h) {
        hasDuplicate = true;
        break;
      }
    }
    if (!hasDuplicate && count > 1) {
      const replaceIdx = (intruderIdx + 1) % count;
      pool[replaceIdx] = { shape: intruderShape, color: intruderColor };
    }

    for (let i = 0; i < count; i++) {
      const isIntruder = i === intruderIdx;
      const { shape, color } = pool[i];
      const bg = buildBubbleGradient(color.h, color.s, color.l);
      createBubble({
        x: positions[i].x,
        y: positions[i].y,
        size,
        shape,
        role: isIntruder ? 'intruder' : 'normal',
        bg
      });
    }
  });
}

function flyToBasket(sourceEl) {
  const src = sourceEl.getBoundingClientRect();
  const dest = magicBag.getBoundingClientRect();
  const clone = document.createElement('div');
  clone.style.position = 'fixed';
  clone.style.left = src.left + 'px';
  clone.style.top = src.top + 'px';
  clone.style.width = src.width + 'px';
  clone.style.height = src.height + 'px';
  clone.style.borderRadius = sourceEl.style.borderRadius;
  clone.style.clipPath = sourceEl.style.clipPath;
  clone.style.pointerEvents = 'none';
  clone.style.zIndex = '10000';
  clone.style.background = sourceEl.style.background;
  clone.style.transition = 'left .55s ease, top .55s ease, transform .55s ease, opacity .55s ease';
  document.body.appendChild(clone);

  requestAnimationFrame(() => {
    clone.style.left = (dest.left + dest.width * .47) + 'px';
    clone.style.top = (dest.top + 38) + 'px';
    clone.style.transform = 'scale(.18)';
    clone.style.opacity = '0';
  });

  setTimeout(() => clone.remove(), 580);
}

function addBasketItem(sourceEl) {
  const item = document.createElement('div');
  item.className = 'basketItem';
  item.style.background = sourceEl.style.background;
  item.style.borderRadius = sourceEl.style.borderRadius || '50%';
  item.style.clipPath = sourceEl.style.clipPath;
  basketBox.appendChild(item);
  updateMagicCount();
}

function spawnPointFx(el) {
  const r = el.getBoundingClientRect();
  const boardRect = board.getBoundingClientRect();
  const x = r.left - boardRect.left + r.width / 2;
  const y = r.top - boardRect.top + r.height / 2;

  const fx = [['flash'], ['wave']];

  fx.forEach(([cls]) => {
    const n = document.createElement('div');
    n.className = cls;
    n.style.left = x + 'px';
    n.style.top = y + 'px';
    n.style.width = cls === 'flash' ? (r.width * 2.0) + 'px' : (r.width * 1.1) + 'px';
    n.style.height = n.style.width;
    fxLayer.appendChild(n);
    setTimeout(() => n.remove(), cls === 'flash' ? 650 : 1100);
  });

  const burstCount = Math.floor(rand(20, 31));
  for (let i = 0; i < burstCount; i++) {
    const p = document.createElement('div');
    p.className = Math.random() > 0.4 ? 'burst' : 'spark';
    const angle = rand(0, Math.PI * 2);
    const dist = rand(18, 70);
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.width = p.className === 'spark' ? rand(6, 11) + 'px' : rand(4, 9) + 'px';
    p.style.height = p.style.width;
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    p.style.setProperty('--rot', rand(-180, 180) + 'deg');
    p.style.animationDelay = rand(0, .05) + 's';
    fxLayer.appendChild(p);
    setTimeout(() => p.remove(), 1250);
  }

  const smokeCount = Math.floor(rand(4, 8));
  for (let i = 0; i < smokeCount; i++) {
    const s = document.createElement('div');
    s.className = 'smoke';
    s.style.left = (x + rand(-10, 10)) + 'px';
    s.style.top = (y + rand(-4, 8)) + 'px';
    s.style.width = rand(10, 22) + 'px';
    s.style.height = rand(8, 16) + 'px';
    s.style.background = `rgba(255,255,255,${rand(.25, .5)})`;
    s.style.setProperty('--tx', rand(-24, 24) + 'px');
    s.style.setProperty('--ty', rand(-60, -26) + 'px');
    s.style.animationDelay = rand(0, .08) + 's';
    fxLayer.appendChild(s);
    setTimeout(() => s.remove(), 1350);
  }
}

function confettiRain(amount, duration) {
  const colors = ['#ffd6f6', '#d8e7ff', '#efe4ff', '#fff3bf', '#c8f7e3', '#f8d7ff'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = rand(0, 100) + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = rand(duration * .85, duration * 1.1) + 's';
    piece.style.animationDelay = rand(0, 0.25) + 's';
    piece.style.transform = `rotate(${rand(0, 360)}deg)`;
    overlay.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + .5) * 1000);
  }
}

function hitIntruder(el) {
  clearTimer();
  spawnPointFx(el);
  el.classList.add('remove');
  flyToBasket(el);

  setTimeout(() => {
    addBasketItem(el);
    state.bagCount += 1;
    updateMagicCount();
    showPraise();
    el.remove();
    state.level += 1;
    scoreEl.textContent = state.level;
    progressBar.style.width = `${(state.level / TOTAL_SUBLEVELS) * 100}%`;
    bagDropFx();

    if (state.level < TOTAL_SUBLEVELS) {
      generateLevel();
    } else {
      endGame(true);
    }
  }, 420);
}

function endGame(won) {
  state.gameOver = true;
  clearTimer();
  if (ambientTimer) clearInterval(ambientTimer);

  overlay.classList.add('show');

  if (won) {
    overlayContent.className = 'modal winModal';
    overlayContent.innerHTML = `
      <div class="winIcon">🏆</div>
      <h2>${t.winTitle}</h2>
      <div class="winStars">⭐⭐⭐</div>
      <p>${t.winDesc(state.bagCount)}</p>
      <button id="overlayRestartBtn">${t.winBtn}</button>
    `;
    confettiRain(90, 3.2);
  } else {
    overlayContent.className = 'modal';
    overlayContent.innerHTML = `
      <h2>${t.loseTitle}</h2>
      <p>${t.loseDesc}</p>
      <button id="overlayRestartBtn">${t.loseBtn}</button>
    `;
  }

  document.getElementById('overlayRestartBtn').addEventListener('click', restartGame);
}

function restartGame() {
  overlay.classList.remove('show');
  overlay.querySelectorAll('.confetti').forEach(c => c.remove());
  state = {
    level: 0,
    remaining: GAME_TIME,
    timerId: null,
    gameOver: false,
    bagCount: 0
  };
  basketBox.innerHTML = '';
  updateMagicCount();
  board.innerHTML = '';
  generateLevel();
}

hintBtn.addEventListener('click', showHint);

// Iniciar idioma y juego
changeLanguage(currentLang);
generateLevel();
ambientParticles();
ambientTimer = setInterval(ambientParticles, 18000);

window.addEventListener('resize', () => {
  if (!state.gameOver) {
    const cfg = generateLevelConfig(state.level);
    board.innerHTML = '';
    nextFrameBuild(cfg);
  }
});

})();