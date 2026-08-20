(function() {
/* =========================================================
   TRADUCCIONES (DICCIONARIO DE IDIOMAS)
========================================================= */
const translations = {
    es: {
        title: "Laberinto Fluido",
        subtitle: "Desafía la inercia y encuentra la salida",
        instructionsTitle: "Cómo Jugar",
        step1: 'Controla la <b>bolita roja</b> a través del laberinto.',
        step2: 'Llega a la <b>estrella dorada</b> para ganar el nivel.',
        step3: 'Usa las <b>Flechas</b> o teclas <b>W A S D</b> para moverte.',
        startBtn: "Iniciar Juego",
        hudLevelText: "Nivel",
        victoryTitle: "¡Completado!",
        victoryTimeLabel: "Tu tiempo:",
        nextLevelBtn: "Siguiente Nivel",
        menuBtn: "Menú",
        motivationalMsgs: [
            "¡Vas por buen camino!",
            "¡Excelente instinto!",
            "¡Sigue así, lo estás logrando!",
            "¡Imparable!",
            "¡Casi llegas, no te rindas!",
            "¡Ese es el espíritu!",
            "¡Increíble avance!",
            "¡Intuir así es un talento!"
        ]
    },
    en: {
        title: "Fluid Maze",
        subtitle: "Challenge inertia and find the way out",
        instructionsTitle: "How to Play",
        step1: 'Control the <b>red ball</b> through the maze.',
        step2: 'Reach the <b>golden star</b> to win the level.',
        step3: 'Use the <b>Arrows</b> or <b>W A S D</b> keys to move.',
        startBtn: "Start Game",
        hudLevelText: "Level",
        victoryTitle: "Completed!",
        victoryTimeLabel: "Your time:",
        nextLevelBtn: "Next Level",
        menuBtn: "Menu",
        motivationalMsgs: [
            "You're on the right track!",
            "Excellent instinct!",
            "Keep it up, you're doing it!",
            "Unstoppable!",
            "Almost there, don't give up!",
            "That's the spirit!",
            "Amazing progress!",
            "Intuition like that is a talent!"
        ]
    }
};

let currentLang = localStorage.getItem("lumen-lang") || "es";
let t = translations[currentLang] || translations["es"];
let motivationalMessages = t.motivationalMsgs;

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lumen-lang", lang);
    t = translations[lang] || translations["es"];
    motivationalMessages = t.motivationalMsgs;

    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.innerHTML = text; };
    setText("titleText", t.title);
    setText("subtitleText", t.subtitle);
    setText("instructionsTitle", t.instructionsTitle);
    setText("step1", t.step1);
    setText("step2", t.step2);
    setText("step3", t.step3);
    setText("startBtn", t.startBtn);
    setText("hudLevelText", t.hudLevelText);
    setText("victoryTitle", t.victoryTitle);
    setText("victoryTimeLabel", t.victoryTimeLabel);
    setText("nextLevelBtn", t.nextLevelBtn);
    setText("menuBtn", t.menuBtn);

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

const LEVELS = [
    { rows: 11, cols: 11, tileSize: 50, accel: 0.55, friction: 0.82, maxSpeed: 5 },
    { rows: 21, cols: 21, tileSize: 32, accel: 0.60, friction: 0.81, maxSpeed: 5.5 },
    { rows: 35, cols: 35, tileSize: 22, accel: 0.65, friction: 0.80, maxSpeed: 6 },
    { rows: 51, cols: 51, tileSize: 16, accel: 0.70, friction: 0.79, maxSpeed: 6.5 }
];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const msgEl = document.getElementById('motivationalMessage');

const menuScreen = document.getElementById('menuScreen');
const gameScreen = document.getElementById('gameScreen');
const victoryScreen = document.getElementById('victoryScreen');

const startBtn = document.getElementById('startBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const menuBtn = document.getElementById('menuBtn');

const levelBtns = document.querySelectorAll('.level-btn');

const hudLevel = document.getElementById('hudLevel');
const hudTimer = document.getElementById('hudTimer');
const victoryTime = document.getElementById('victoryTime');

let currentLevelIndex = 0;
let maze = [];
let player = {};
let goal = {};
let keys = {};
let isPlaying = false;
let startTime = 0;
let elapsedTime = 0;
let animFrameId = null;
let correctPath = [];
let pathMap = new Map();
let furthestPathIndex = 0;
let reachedMilestones = new Set();
let messageTimeout = null;

const COLORS = {
    wall: '#B8A9E8',
    path: '#FFFFFF',
    goal: '#F6E05E',
    goalGlow: 'rgba(246, 224, 94, 0.6)',
    trail: 'rgba(239, 68, 68, ALPHA)'
};

/* =========================
   CAMBIAR DE PANTALLA
========================= */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

/* =========================
   GENERAR LABERINTO
========================= */
function generateMaze(rows, cols) {
    maze = Array.from({ length: rows }, () => Array(cols).fill(1));
    const stack = [[1, 1]];
    maze[1][1] = 0;

    while (stack.length > 0) {
        const [x, y] = stack[stack.length - 1];
        const directions = [[0, -2], [0, 2], [-2, 0], [2, 0]];

        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        let found = false;
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && maze[ny][nx] === 1) {
                maze[ny][nx] = 0;
                maze[y + dy / 2][x + dx / 2] = 0;
                stack.push([nx, ny]);
                found = true;
                break;
            }
        }
        if (!found) stack.pop();
    }
}

/* =========================
   BUSCAR CAMINO MÁS CORTO
========================= */
function getShortestPath() {
    const start = [1, 1];
    const end = [LEVELS[currentLevelIndex].cols - 2, LEVELS[currentLevelIndex].rows - 2];
    const queue = [[start]];
    const visited = new Set();
    visited.add(`${start[0]},${start[1]}`);

    while (queue.length > 0) {
        const path = queue.shift();
        const [cx, cy] = path[path.length - 1];

        if (cx === end[0] && cy === end[1]) return path;

        const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for (const [dx, dy] of dirs) {
            const nx = cx + dx;
            const ny = cy + dy;
            const key = `${nx},${ny}`;

            if (ny > 0 && ny < LEVELS[currentLevelIndex].rows && nx > 0 && nx < LEVELS[currentLevelIndex].cols && maze[ny][nx] !== 1 && !visited.has(key)) {
                visited.add(key);
                queue.push([...path, [nx, ny]]);
            }
        }
    }
    return [];
}

/* =========================
   INICIAR NIVEL
========================= */
function startLevel(levelIndex) {
    currentLevelIndex = levelIndex;
    const config = LEVELS[currentLevelIndex];

    canvas.width = config.cols * config.tileSize;
    canvas.height = config.rows * config.tileSize;

    generateMaze(config.rows, config.cols);
    correctPath = getShortestPath();

    pathMap.clear();
    correctPath.forEach((coord, index) => pathMap.set(`${coord[0]},${coord[1]}`, index));

    furthestPathIndex = 0;
    reachedMilestones.clear();

    const ts = config.tileSize;
    player = { x: ts + ts / 2, y: ts + ts / 2, radius: ts * 0.32, vx: 0, vy: 0, trail: [], pulse: 0 };
    goal = { x: (config.cols - 2) * ts, y: (config.rows - 2) * ts, size: ts, pulse: 0 };

    hudLevel.textContent = currentLevelIndex + 1;
    startTime = performance.now();
    elapsedTime = 0;
    isPlaying = true;

    msgEl.classList.remove('show');
    showScreen('gameScreen');

    if (animFrameId) cancelAnimationFrame(animFrameId);
    gameLoop();
}

/* =========================
   COLISIÓN CÍRCULO / RECTÁNGULO
========================= */
function circleRectCollision(cx, cy, r, rx, ry, rw, rh) {
    const nearestX = Math.max(rx, Math.min(cx, rx + rw));
    const nearestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - nearestX;
    const dy = cy - nearestY;
    return (dx * dx + dy * dy) < (r * r);
}

/* =========================
   MENSAJE MOTIVACIONAL
========================= */
function showMotivationalMessage() {
    const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    msgEl.textContent = randomMsg;
    msgEl.classList.add('show');
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => msgEl.classList.remove('show'), 2500);
}

/* =========================
   PROGRESO
========================= */
function checkPathProgress() {
    const config = LEVELS[currentLevelIndex];
    const currentCol = Math.floor(player.x / config.tileSize);
    const currentRow = Math.floor(player.y / config.tileSize);
    const cellKey = `${currentCol},${currentRow}`;

    if (pathMap.has(cellKey)) {
        const currentIdx = pathMap.get(cellKey);
        if (currentIdx > furthestPathIndex) {
            furthestPathIndex = currentIdx;
            const progress = furthestPathIndex / (correctPath.length - 1);
            const milestones = [0.25, 0.50, 0.75, 0.90];

            for (let i = 0; i < milestones.length; i++) {
                if (progress >= milestones[i] && !reachedMilestones.has(i)) {
                    reachedMilestones.add(i);
                    showMotivationalMessage();
                    break;
                }
            }
        }
    }
}

/* =========================
   ACTUALIZAR JUGADOR
========================= */
function update() {
    if (!isPlaying) return;
    const config = LEVELS[currentLevelIndex];
    const { accel, friction, maxSpeed, tileSize } = config;

    if (keys['arrowup'] || keys['w']) player.vy -= accel;
    if (keys['arrowdown'] || keys['s']) player.vy += accel;
    if (keys['arrowleft'] || keys['a']) player.vx -= accel;
    if (keys['arrowright'] || keys['d']) player.vx += accel;

    player.vx *= friction;
    player.vy *= friction;
    const speed = Math.hypot(player.vx, player.vy);

    if (speed > maxSpeed) {
        player.vx = (player.vx / speed) * maxSpeed;
        player.vy = (player.vy / speed) * maxSpeed;
    }

    let nextX = player.x + player.vx;
    const r = player.radius;

    const minColX = Math.floor((nextX - r) / tileSize);
    const maxColX = Math.floor((nextX + r) / tileSize);
    const minRowX = Math.floor((player.y - r) / tileSize);
    const maxRowX = Math.floor((player.y + r) / tileSize);

    for (let y = minRowX; y <= maxRowX; y++) {
        for (let x = minColX; x <= maxColX; x++) {
            if (maze[y] && maze[y][x] === 1) {
                if (circleRectCollision(nextX, player.y, r, x * tileSize, y * tileSize, tileSize, tileSize)) {
                    player.vx *= -0.1;
                    nextX = player.x;
                }
            }
        }
    }
    player.x = nextX;

    let nextY = player.y + player.vy;
    const minColY = Math.floor((player.x - r) / tileSize);
    const maxColY = Math.floor((player.x + r) / tileSize);
    const minRowY = Math.floor((nextY - r) / tileSize);
    const maxRowY = Math.floor((nextY + r) / tileSize);

    for (let y = minRowY; y <= maxRowY; y++) {
        for (let x = minColY; x <= maxColY; x++) {
            if (maze[y] && maze[y][x] === 1) {
                if (circleRectCollision(player.x, nextY, r, x * tileSize, y * tileSize, tileSize, tileSize)) {
                    player.vy *= -0.1;
                    nextY = player.y;
                }
            }
        }
    }
    player.y = nextY;

    player.trail.push({ x: player.x, y: player.y, size: player.radius * (0.3 + (speed / maxSpeed) * 0.7) });
    if (player.trail.length > 12) player.trail.shift();

    goal.pulse += 0.05;
    player.pulse += 0.08;
    checkPathProgress();

    const nearestX = Math.max(goal.x, Math.min(player.x, goal.x + goal.size));
    const nearestY = Math.max(goal.y, Math.min(player.y, goal.y + goal.size));

    if (Math.hypot(player.x - nearestX, player.y - nearestY) <= player.radius + player.radius * 0.5) {
        winGame();
    }
}

/* =========================
   DIBUJAR ESTRELLA
========================= */
function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
}

/* =========================
   DIBUJAR PELOTA
========================= */
function drawBall(cx, cy, r) {
    ctx.save();

    const shadowGrad = ctx.createRadialGradient(cx, cy + r * 0.75, 0, cx, cy + r * 0.75, r * 1.1);
    shadowGrad.addColorStop(0, 'rgba(120, 20, 20, 0.35)');
    shadowGrad.addColorStop(0.5, 'rgba(120, 20, 20, 0.15)');
    shadowGrad.addColorStop(1, 'rgba(120, 20, 20, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy + r * 0.75, r * 1.05, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    const bodyGrad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.05, cx + r * 0.1, cy + r * 0.1, r);
    bodyGrad.addColorStop(0, '#FF8A8A');
    bodyGrad.addColorStop(0.2, '#EF4444');
    bodyGrad.addColorStop(0.55, '#DC2626');
    bodyGrad.addColorStop(0.8, '#B91C1C');
    bodyGrad.addColorStop(1, '#7F1D1D');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(127, 29, 29, 0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    const mainHighlight = ctx.createRadialGradient(cx - r * 0.28, cy - r * 0.32, 0, cx - r * 0.15, cy - r * 0.2, r * 0.55);
    mainHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
    mainHighlight.addColorStop(0.3, 'rgba(255, 255, 255, 0.4)');
    mainHighlight.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    mainHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = mainHighlight;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    const dotHighlight = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, 0, cx - r * 0.3, cy - r * 0.35, r * 0.18);
    dotHighlight.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    dotHighlight.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    dotHighlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = dotHighlight;
    ctx.beginPath();
    ctx.arc(cx - r * 0.3, cy - r * 0.35, r * 0.18, 0, Math.PI * 2);
    ctx.fill();

    const rimGrad = ctx.createRadialGradient(cx + r * 0.2, cy + r * 0.45, r * 0.1, cx + r * 0.1, cy + r * 0.3, r * 0.7);
    rimGrad.addColorStop(0, 'rgba(255, 160, 160, 0.25)');
    rimGrad.addColorStop(1, 'rgba(255, 160, 160, 0)');
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

/* =========================
   DIBUJAR JUEGO
========================= */
function draw() {
    const config = LEVELS[currentLevelIndex];
    const { tileSize } = config;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < config.rows; y++) {
        for (let x = 0; x < config.cols; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? COLORS.wall : COLORS.path;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

    const goalScale = 1 + Math.sin(goal.pulse) * 0.15;
    ctx.fillStyle = COLORS.goal;
    ctx.shadowColor = COLORS.goalGlow;
    ctx.shadowBlur = 15;

    drawStar(
        goal.x + goal.size / 2,
        goal.y + goal.size / 2,
        5,
        (goal.size / 2.5) * goalScale,
        (goal.size / 6) * goalScale
    );

    ctx.fill();
    ctx.shadowBlur = 0;

    const trail = player.trail;
    for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const alpha = (i / trail.length) * 0.25;
        ctx.fillStyle = COLORS.trail.replace('ALPHA', alpha.toFixed(2));
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.size, 0, Math.PI * 2);
        ctx.fill();
    }

    drawBall(player.x, player.y, player.radius);
}

/* =========================
   TEMPORIZADOR
========================= */
function updateTimer() {
    if (!isPlaying) return;
    elapsedTime = performance.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    hudTimer.textContent = `${minutes}:${seconds}`;
}

/* =========================
   GANAR
========================= */
function winGame() {
    isPlaying = false;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    victoryTime.textContent = `${minutes}:${seconds}`;

    nextLevelBtn.style.display = currentLevelIndex >= LEVELS.length - 1 ? 'none' : 'inline-block';
    msgEl.classList.remove('show');

    setTimeout(() => showScreen('victoryScreen'), 300);
}

/* =========================
   BUCLE DEL JUEGO
========================= */
function gameLoop() {
    update();
    draw();
    updateTimer();
    if (isPlaying) {
        animFrameId = requestAnimationFrame(gameLoop);
    }
}

/* =========================
   TECLADO
========================= */
document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    keys[key] = true;
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', e => {
    keys[e.key.toLowerCase()] = false;
});

/* =========================
   SELECCIÓN DE NIVEL
========================= */
levelBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        levelBtns.forEach(b => b.classList.remove('selected'));
        e.target.classList.add('selected');
        currentLevelIndex = parseInt(e.target.dataset.level) - 1;
    });
});

/* =========================
   BOTONES
========================= */
startBtn.addEventListener('click', () => startLevel(currentLevelIndex));

nextLevelBtn.addEventListener('click', () => startLevel(currentLevelIndex + 1));

menuBtn.addEventListener('click', () => {
    isPlaying = false;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    showScreen('menuScreen');
});

/* =========================
   INICIAR IDIOMA Y JUEGO
========================= */
changeLanguage(currentLang);

})();