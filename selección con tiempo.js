'use strict';

(function() {
/* =========================================================
   TRADUCCIONES (DICCIONARIO DE IDIOMAS)
========================================================= */
const translations = {
    es: {
        pageTitle: "Busca y Encuentra · Aventura Visual",
        splashTitle: "Busca y Encuentra",
        splashSubtitle: "Una aventura visual para descubrir",
        splashBtn: "Comenzar",
        menuTitle: "Menú Principal",
        menuBtnPlay: "🎮 Jugar",
        menuBtnInstructions: "📖 Instrucciones",
        soundOn: "🔊 Sonido", soundOff: "🔇 Sonido",
        musicOn: "🎵 Música", musicOff: "🔕 Música",
        statLabelStars: "Estrellas", statLabelTrophies: "Trofeos", statLabelPoints: "Puntos",
        statLabelHits: "Aciertos", statLabelErrors: "Errores", statLabelLevels: "Niveles",
        levelsTitle: "Selecciona un Nivel",
        levelsBtnBack: "Volver",
        instructionsTitle: "¿Cómo Jugar?",
        step1Text: "Mira la figura que aparece arriba de la pantalla.",
        step2Text: "Toca la figura igual entre todas las que se mueven.",
        step3Text: "Encuentra todas las apariciones antes de que se acabe el tiempo.",
        step4Text: "Necesitas el 100% de aciertos para avanzar al siguiente nivel.",
        step5Text: "Si tocas una figura incorrecta, suma un error. ¡Sin estrés!",
        instructionsBtn: "Entendido",
        hudTargetLabel: "Busca:",
        hudStatLabelLevel: "Nivel", hudStatLabelTime: "Tiempo", hudStatLabelScore: "Puntos",
        hudFoundLabel: "Encontrados:", hudErrorsLabel: "Errores:",
        pauseTitle: "Pausa", pauseDescription: "Tómate un respiro",
        pauseBtnResume: "▶ Continuar", pauseBtnRestart: "🔄 Reiniciar", pauseBtnMenu: "🏠 Menú Principal",
        completeBtnNext: "Siguiente Nivel", completeBtnMenu: "Menú Principal",
        defeatTitle: "¡Casi lo logras!",
        defeatMsg1: "Encontraste", defeatMsg2: "figuras.",
        defeatEncourage: "¡Inténtalo de nuevo, tú puedes!",
        defeatBtnRetry: "🔄 Reintentar", defeatBtnMenu: "🏠 Menú Principal",
        victoryTitle: "¡Victoria Final!",
        victoryMessage: "Has completado todos los niveles con éxito.",
        victoryBtnMenu: "Volver al Menú",
        levelWord: "Nivel",
        seeTrophyBtn: "Ver Trofeo",
        tryAgainMsg: "¡Inténtalo otra vez!",
        levels: [
            { name: 'Principiante' }, { name: 'Explorador' }, { name: 'Aventurero' }, { name: 'Maestro' }
        ],
        motivationalMessages: ['¡Excelente!', '¡Muy bien!', '¡Fantástico!', '¡Increíble!', '¡Sigue así!', '¡Genial!', '¡Brillante!', '¡Maravilloso!', '¡Perfecto!', '¡Lo lograste!']
    },
    en: {
        pageTitle: "Search and Find · Visual Adventure",
        splashTitle: "Search and Find",
        splashSubtitle: "A visual adventure to discover",
        splashBtn: "Start",
        menuTitle: "Main Menu",
        menuBtnPlay: "🎮 Play",
        menuBtnInstructions: "📖 Instructions",
        soundOn: "🔊 Sound", soundOff: "🔇 Sound",
        musicOn: "🎵 Music", musicOff: "🔕 Music",
        statLabelStars: "Stars", statLabelTrophies: "Trophies", statLabelPoints: "Points",
        statLabelHits: "Hits", statLabelErrors: "Errors", statLabelLevels: "Levels",
        levelsTitle: "Select a Level",
        levelsBtnBack: "Back",
        instructionsTitle: "How to Play?",
        step1Text: "Look at the figure that appears at the top of the screen.",
        step2Text: "Tap the matching figure among all the moving ones.",
        step3Text: "Find all appearances before the time runs out.",
        step4Text: "You need 100% accuracy to advance to the next level.",
        step5Text: "If you tap an incorrect figure, it counts as an error. No stress!",
        instructionsBtn: "Got it",
        hudTargetLabel: "Find:",
        hudStatLabelLevel: "Level", hudStatLabelTime: "Time", hudStatLabelScore: "Score",
        hudFoundLabel: "Found:", hudErrorsLabel: "Errors:",
        pauseTitle: "Pause", pauseDescription: "Take a breather",
        pauseBtnResume: "▶ Continue", pauseBtnRestart: "🔄 Restart", pauseBtnMenu: "🏠 Main Menu",
        completeBtnNext: "Next Level", completeBtnMenu: "Main Menu",
        defeatTitle: "Almost there!",
        defeatMsg1: "You found", defeatMsg2: "figures.",
        defeatEncourage: "Try again, you can do it!",
        defeatBtnRetry: "🔄 Retry", defeatBtnMenu: "🏠 Main Menu",
        victoryTitle: "Final Victory!",
        victoryMessage: "You have successfully completed all levels.",
        victoryBtnMenu: "Back to Menu",
        levelWord: "Level",
        seeTrophyBtn: "See Trophy",
        tryAgainMsg: "Try again!",
        levels: [
            { name: 'Beginner' }, { name: 'Explorer' }, { name: 'Adventurer' }, { name: 'Master' }
        ],
        motivationalMessages: ['Excellent!', 'Very good!', 'Fantastic!', 'Amazing!', 'Keep it up!', 'Great!', 'Brilliant!', 'Wonderful!', 'Perfect!', 'You did it!']
    }
};

let currentLang = localStorage.getItem("lumen-lang") || "es";
let t = translations[currentLang] || translations["es"];

function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lumen-lang", lang);
    t = translations[lang] || translations["es"];

    const setText = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
    document.title = t.title;
    setText("splashTitle", t.splashTitle);
    setText("splashSubtitle", t.splashSubtitle);
    setText("splashBtn", t.splashBtn);
    setText("menuTitle", t.menuTitle);
    setText("menuBtnPlay", t.menuBtnPlay);
    setText("menuBtnInstructions", t.menuBtnInstructions);
    setText("statLabelStarsMenu", t.statLabelStars);
    setText("statLabelTrophiesMenu", t.statLabelTrophies);
    setText("statLabelPointsMenu", t.statLabelPoints);
    setText("levelsTitle", t.levelsTitle);
    setText("levelsBtnBack", t.levelsBtnBack);
    setText("instructionsTitle", t.instructionsTitle);
    setText("step1Text", t.step1Text);
    setText("step2Text", t.step2Text);
    setText("step3Text", t.step3Text);
    setText("step4Text", t.step4Text);
    setText("step5Text", t.step5Text);
    setText("instructionsBtn", t.instructionsBtn);
    setText("hudTargetLabel", t.hudTargetLabel);
    setText("hudStatLabelLevel", t.hudStatLabelLevel);
    setText("hudStatLabelTime", t.hudStatLabelTime);
    setText("hudStatLabelScore", t.hudStatLabelScore);
    
    const hudFoundLabel = document.getElementById('hudFoundLabel');
    if (hudFoundLabel) hudFoundLabel.innerHTML = `${t.hudFoundLabel} <strong id="hud-found">0/20</strong>`;
    const hudErrorsLabel = document.getElementById('hudErrorsLabel');
    if (hudErrorsLabel) hudErrorsLabel.innerHTML = `${t.hudErrorsLabel} <strong id="hud-errors">0</strong>`;

    setText("pauseTitle", t.pauseTitle);
    setText("pauseDescription", t.pauseDescription);
    setText("pauseBtnResume", t.pauseBtnResume);
    setText("pauseBtnRestart", t.pauseBtnRestart);
    setText("pauseBtnMenu", t.pauseBtnMenu);
    
    setText("statLabelHitsComplete", t.statLabelHits);
    setText("statLabelErrorsComplete", t.statLabelErrors);
    setText("statLabelPointsComplete", t.statLabelPoints);
    setText("completeBtnMenu", t.completeBtnMenu);
    
    setText("defeatTitle", t.defeatTitle);
    setText("defeatMsg1", t.defeatMsg1);
    setText("defeatMsg2", t.defeatMsg2);
    setText("defeatEncourage", t.defeatEncourage);
    setText("defeatBtnRetry", t.defeatBtnRetry);
    setText("defeatBtnMenu", t.defeatBtnMenu);
    
    setText("victoryTitle", t.victoryTitle);
    setText("victoryMessage", t.victoryMessage);
    setText("statLabelStarsVictory", t.statLabelStars);
    setText("statLabelLevelsVictory", t.statLabelLevels);
    setText("statLabelPointsVictory", t.statLabelPoints);
    setText("victoryBtnMenu", t.victoryBtnMenu);

    // Actualizar botones de sonido/música si están visibles
    if (typeof Game !== 'undefined') {
        const btnSound = document.getElementById('btn-sound');
        const btnMusic = document.getElementById('btn-music');
        if (btnSound) btnSound.innerHTML = Game.settings.sound ? t.soundOn : t.soundOff;
        if (btnMusic) btnMusic.innerHTML = Game.settings.music ? t.musicOn : t.musicOff;
    }

    // Actualizar pantallas dinámicas si están activas
    if (typeof Game !== 'undefined') {
        if (Game.currentScreen === 'levels') buildLevelSelect();
        if (Game.currentScreen === 'menu') updateMainMenuStats();
        
        const btnNext = document.getElementById('btn-next');
        if (btnNext && Game.currentScreen === 'complete') {
            const isLastLevel = Game.session && Game.session.level.id === LEVELS.length;
            btnNext.textContent = isLastLevel ? t.seeTrophyBtn : t.completeBtnNext;
        }
    }

    const langEsBtn = document.getElementById("langEs");
    const langEnBtn = document.getElementById("langEn");
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");
}

// Configurar menú de ajustes
const settingsBtnLang = document.getElementById("settingsBtnLang");
const settingsMenuLang = document.getElementById("settingsMenuLang");
if (settingsBtnLang) {
    settingsBtnLang.addEventListener("click", () => {
        const isVisible = settingsMenuLang.style.display === "flex";
        settingsMenuLang.style.display = isVisible ? "none" : "flex";
    });
}
if (document.getElementById("langEs")) {
    document.getElementById("langEs").addEventListener("click", () => {
        changeLanguage("es");
        settingsMenuLang.style.display = "none";
    });
}
if (document.getElementById("langEn")) {
    document.getElementById("langEn").addEventListener("click", () => {
        changeLanguage("en");
        settingsMenuLang.style.display = "none";
    });
}

/* =========================================================
   CONFIGURACIÓN DE NIVELES
========================================================= */

const LEVELS = [
    { id: 1, name: 'Principiante', icon: '🐸', duration: 30, targetCount: 20, distractors: 6, figureSize: 78, minDistance: 100, lifetime: 5000, simultaneousTargets: 1, animations: ['float', 'sway', 'bounce'], speed: 1.0 },
    { id: 2, name: 'Explorador', icon: '🦋', duration: 60, targetCount: 30, distractors: 9, figureSize: 68, minDistance: 88, lifetime: 4500, simultaneousTargets: 2, animations: ['float', 'sway', 'bounce', 'wave'], speed: 1.15 },
    { id: 3, name: 'Aventurero', icon: '🌟', duration: 75, targetCount: 40, distractors: 12, figureSize: 60, minDistance: 76, lifetime: 4000, simultaneousTargets: 3, animations: ['float', 'sway', 'bounce', 'wave', 'spin'], speed: 1.3 },
    { id: 4, name: 'Maestro', icon: '🏆', duration: 90, targetCount: 50, distractors: 15, figureSize: 54, minDistance: 68, lifetime: 3500, simultaneousTargets: 4, animations: ['float', 'sway', 'bounce', 'wave', 'spin', 'orbit'], speed: 1.5 }
];

const FIGURES = [
    { emoji: '🐸', name: 'Rana', similars: ['🐢', '🦎', '🐍', '🦗'] },
    { emoji: '🦋', name: 'Mariposa', similars: ['🐝', '🐛', '🦟', '🪲'] },
    { emoji: '🌟', name: 'Estrella', similars: ['⭐', '✨', '💫', '🌠'] },
    { emoji: '🎈', name: 'Globo', similars: ['🔴', '🟡', '🟢', '🔵'] },
    { emoji: '🍓', name: 'Fresa', similars: ['🍎', '🍒', '🍅', '🫐'] },
    { emoji: '🌸', name: 'Flor', similars: ['🌺', '🌷', '🌼', '🌻'] },
    { emoji: '🐠', name: 'Pez', similars: ['🐟', '🐡', '🦈', '🐙'] },
    { emoji: '🦉', name: 'Búho', similars: ['🐦', '🦅', '🐤', '🦆'] },
    { emoji: '🍦', name: 'Helado', similars: ['🍰', '🧁', '🍪', '🍩'] },
    { emoji: '🚗', name: 'Auto', similars: ['🚕', '🚙', '🚌', '🚎'] }
];

const GENERIC_DISTRACTORS = [
    '☁️', '🌈', '🍀', '🎨', '🎵', '💧', '🌙', '❄️', '🔥', '🍃', '🦄', '🐰', '🐱', '🐶', '🦊', '🐻', '🐼', '🐨',
    '🦁', '🐮', '🐷', '🐔', '🐧', '🦒', '🐘', '🦓', '🌵', '🌴', '🌻', '🌺', '⭐', '✨', '💫', '🌟', '🍭', '🎮', '🪁', '🎈', '🎀', '🎁'
];

/* =========================================================
   ESTADO DEL JUEGO
========================================================= */

const Game = {
    unlockedLevels: 1,
    records: {},
    settings: { sound: true, music: true },
    currentLevel: 1,
    currentScreen: 'splash',
    session: null
};

/* =========================================================
   LOCAL STORAGE
========================================================= */

try {
    const saved = localStorage.getItem('busca_encuentra_save');
    if (saved) {
        const data = JSON.parse(saved);
        Game.unlockedLevels = data.unlockedLevels || 1;
        Game.records = data.records || {};
        Game.settings = { ...Game.settings, ...(data.settings || {}) };
    }
} catch (e) { console.warn('No se pudo cargar el progreso guardado.'); }

function saveState() {
    try {
        localStorage.setItem('busca_encuentra_save', JSON.stringify({
            unlockedLevels: Game.unlockedLevels,
            records: Game.records,
            settings: Game.settings
        }));
    } catch (e) { console.warn('No se pudo guardar el progreso.'); }
}

/* =========================================================
   UTILIDADES
========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randChoice = (array) => array[Math.floor(Math.random() * array.length)];
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

/* =========================================================
   PANTALLAS
========================================================= */

function showScreen(name) {
    $$('.screen').forEach(screen => screen.classList.remove('is-active'));
    const target = $('#screen-' + name);
    if (target) {
        target.classList.add('is-active');
        Game.currentScreen = name;
    }
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = 'success') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 1800);
}

/* =========================================================
   AUDIO
========================================================= */

const Audio = {
    ctx: null, musicTimer: null,
    init() {
        if (this.ctx) return;
        try {
            const AC = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AC();
        } catch (e) { console.warn('Audio no disponible.'); }
    },
    resume() {
        if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    },
    playTone(freq, duration = 0.15, type = 'sine', volume = 0.12, when = 0) {
        if (!Game.settings.sound || !this.ctx) return;
        const t = this.ctx.currentTime + when;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(volume, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(t); osc.stop(t + duration + 0.05);
    },
    success() {
        if (!Game.settings.sound) return;
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.playTone(f, 0.22, 'sine', 0.11, i * 0.07));
    },
    error() {
        if (!Game.settings.sound) return;
        [392, 311.13].forEach((f, i) => this.playTone(f, 0.18, 'sine', 0.09, i * 0.08));
    },
    click() { this.playTone(880, 0.06, 'sine', 0.07); },
    victory() {
        if (!Game.settings.sound) return;
        [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach((f, i) => this.playTone(f, 0.3, 'sine', 0.13, i * 0.14));
    },
    levelUp() {
        if (!Game.settings.sound) return;
        [659.25, 783.99, 1046.5].forEach((f, i) => this.playTone(f, 0.25, 'triangle', 0.1, i * 0.1));
    },
    startMusic() {
        this.stopMusic();
        if (!Game.settings.music || !this.ctx) return;
        const notes = [392, 440, 523.25, 587.33, 523.25, 440, 392, 349.23];
        let i = 0;
        const playNext = () => {
            if (!Game.settings.music || !this.ctx) return;
            const f = notes[i % notes.length];
            const t = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine'; osc.frequency.value = f / 2;
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.04, t + 0.3);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(t); osc.stop(t + 1.7);
            i++;
        };
        playNext();
        this.musicTimer = setInterval(playNext, 1800);
    },
    stopMusic() {
        if (this.musicTimer) { clearInterval(this.musicTimer); this.musicTimer = null; }
    }
};

/* =========================================================
   FONDO Y PARTÍCULAS (Canvas)
========================================================= */

const Background = {
    canvas: null, ctx: null, bubbles: [], shapes: [], sparkles: [],
    init() {
        this.canvas = $('#bg-canvas'); this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.create(); this.animate();
    },
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; },
    randomPastel() {
        const c = [[191, 227, 245], [220, 208, 242], [251, 232, 169], [156, 206, 242], [158, 217, 176]];
        return randChoice(c);
    },
    create() {
        this.shapes = []; this.bubbles = []; this.sparkles = [];
        for (let i = 0; i < 7; i++) this.shapes.push({ x: Math.random()*this.canvas.width, y: Math.random()*this.canvas.height, r: 120+Math.random()*180, vx: (Math.random()-0.5)*0.12, vy: (Math.random()-0.5)*0.12, opacity: 0.12+Math.random()*0.08, color: this.randomPastel() });
        for (let i = 0; i < 22; i++) this.bubbles.push({ x: Math.random()*this.canvas.width, y: Math.random()*this.canvas.height, r: 24+Math.random()*50, vy: -0.15-Math.random()*0.3, vx: (Math.random()-0.5)*0.15, opacity: 0.15+Math.random()*0.2, color: this.randomPastel(), phase: Math.random()*Math.PI*2 });
        for (let i = 0; i < 30; i++) this.sparkles.push({ x: Math.random()*this.canvas.width, y: Math.random()*this.canvas.height, size: 1.5+Math.random()*2.5, phase: Math.random()*Math.PI*2, speed: 0.02+Math.random()*0.03, opacity: 0.4+Math.random()*0.4 });
    },
    animate() {
        const ctx = this.ctx, w = this.canvas.width, h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);
        this.shapes.forEach(s => {
            s.x += s.vx; s.y += s.vy;
            if (s.x < -s.r) s.x = w + s.r; if (s.x > w + s.r) s.x = -s.r;
            if (s.y < -s.r) s.y = h + s.r; if (s.y > h + s.r) s.y = -s.r;
            const [r, g, b] = s.color;
            const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, Math.max(1, s.r));
            grad.addColorStop(0, `rgba(${r},${g},${b},${s.opacity})`); grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(s.x, s.y, Math.max(1, s.r), 0, Math.PI*2); ctx.fill();
        });
        const time = Date.now() * 0.001;
        this.bubbles.forEach(b => {
            b.x += b.vx + Math.sin(time + b.phase) * 0.15; b.y += b.vy;
            if (b.y < -b.r) { b.y = h + b.r; b.x = Math.random()*w; }
            if (b.x < -b.r) b.x = w + b.r; if (b.x > w + b.r) b.x = -b.r;
            const [r, g, b_col] = b.color;
            const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, Math.max(1, b.r));
            grad.addColorStop(0, `rgba(${r},${g},${b_col},${b.opacity * 1.5})`); grad.addColorStop(0.6, `rgba(${r},${g},${b_col},${b.opacity * 0.6})`); grad.addColorStop(1, `rgba(${r},${g},${b_col},0)`);
            ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(b.x, b.y, Math.max(1, b.r), 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.5})`; ctx.beginPath(); ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, Math.max(1, b.r * 0.2), 0, Math.PI*2); ctx.fill();
        });
        this.sparkles.forEach(sp => {
            sp.phase += sp.speed;
            const tw = (Math.sin(sp.phase) + 1) * 0.5;
            ctx.save(); ctx.globalAlpha = sp.opacity * tw; ctx.fillStyle = '#FFFFFF'; ctx.shadowColor = 'rgba(156, 206, 242, 0.8)'; ctx.shadowBlur = 8;
            ctx.beginPath(); ctx.arc(sp.x, sp.y, Math.max(0.5, sp.size), 0, Math.PI*2); ctx.fill(); ctx.restore();
        });
        requestAnimationFrame(() => this.animate());
    }
};

const Particles = {
    canvas: null, ctx: null, list: [],
    init() {
        this.canvas = $('#particles-canvas'); this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    },
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; },
    burst(x, y, type = 'success') {
        const count = type === 'success' ? 28 : 14;
        const colors = type === 'success' ? ['#9ED9B0', '#FBE8A9', '#BFE3F5', '#DCD0F2', '#9CCEF2', '#F8C8DC'] : ['#F2A6A6', '#F5C99B', '#E8B6B6'];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
            const speed = 2.5 + Math.random() * 5;
            this.list.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5, life: 1, decay: 0.012 + Math.random() * 0.015, size: 4 + Math.random() * 7, color: colors[Math.floor(Math.random() * colors.length)], type: type === 'success' && Math.random() < 0.35 ? 'star' : 'circle', rotation: Math.random() * Math.PI * 2, rotationSpeed: (Math.random() - 0.5) * 0.3, gravity: 0.12 });
        }
    },
    drawStar(cx, cy, size) {
        const ctx = this.ctx, spikes = 5, outer = Math.max(1, size), inner = outer * 0.4;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const r = i % 2 === 0 ? outer : inner;
            const angle = (i * Math.PI) / spikes - Math.PI / 2;
            const x = cx + Math.cos(angle) * r, y = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath(); ctx.fill();
    },
    animate() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.list = this.list.filter(p => {
            p.x += p.vx; p.y += p.vy; p.vy += p.gravity; p.vx *= 0.99; p.life -= p.decay; p.rotation += p.rotationSpeed;
            if (p.life <= 0) return false;
            ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.globalAlpha = Math.min(1, p.life); ctx.fillStyle = p.color;
            if (p.type === 'star') this.drawStar(0, 0, p.size);
            else { ctx.beginPath(); ctx.arc(0, 0, Math.max(0.5, p.size), 0, Math.PI * 2); ctx.fill(); }
            ctx.restore();
            return true;
        });
        requestAnimationFrame(() => this.animate());
    }
};

/* =========================================================
   SISTEMA DE FIGURAS Y SESIÓN
========================================================= */

const FigureSystem = {
    findFreePosition(size, minDistance, existing) {
        const area = $('#game-area'), rect = area.getBoundingClientRect();
        const padding = size / 2 + 8;
        const maxX = rect.width - padding, maxY = rect.height - padding, minX = padding, minY = padding;
        if (maxX <= minX || maxY <= minY) return { x: rect.width / 2, y: rect.height / 2 };
        for (let attempt = 0; attempt < 80; attempt++) {
            const x = minX + Math.random() * (maxX - minX), y = minY + Math.random() * (maxY - minY);
            let collides = false;
            for (const f of existing) {
                if (Math.sqrt((f.x - x) ** 2 + (f.y - y) ** 2) < minDistance) { collides = true; break; }
            }
            if (!collides) return { x, y };
        }
        return { x: minX + Math.random() * (maxX - minX), y: minY + Math.random() * (maxY - minY) };
    },
    create(emoji, isTarget, level, existing) {
        const size = level.figureSize, pos = this.findFreePosition(size, level.minDistance, existing);
        const wrapper = document.createElement('div');
        wrapper.className = 'figure is-appearing';
        wrapper.style.width = wrapper.style.height = size + 'px';
        wrapper.style.left = (pos.x - size / 2) + 'px'; wrapper.style.top = (pos.y - size / 2) + 'px';
        const animClass = 'anim-' + randChoice(level.animations);
        wrapper.classList.add(animClass);
        const inner = document.createElement('div');
        inner.className = 'figure-inner'; inner.style.fontSize = size * 0.7 + 'px'; inner.textContent = emoji;
        wrapper.appendChild(inner);
        const figure = { el: wrapper, inner, x: pos.x, y: pos.y, emoji, isTarget, bornAt: performance.now(), lifetime: level.lifetime + (Math.random() - 0.5) * 600, animClass, size };
        const handleTap = e => {
            e.preventDefault(); e.stopPropagation();
            if (Game.session && !Game.session.paused && !Game.session.ending) {
                if (figure.isTarget) GameSession.onTargetHit(figure);
                else GameSession.onDistractorHit(figure);
            }
        };
        wrapper.addEventListener('click', handleTap);
        wrapper.addEventListener('touchstart', handleTap, { passive: false });
        $('#game-area').appendChild(wrapper);
        existing.push(figure);
        setTimeout(() => { if (wrapper.parentNode) wrapper.classList.remove('is-appearing'); }, 500);
        return figure;
    },
    removeAsCorrect(f, list) {
        f.el.classList.add('is-correct');
        setTimeout(() => { if (f.el.parentNode) f.el.remove(); }, 500);
        const i = list.indexOf(f); if (i > -1) list.splice(i, 1);
    },
    removeAsWrong(f, list) {
        f.el.classList.add('is-wrong');
        setTimeout(() => { if (f.el.parentNode) f.el.remove(); }, 500);
        const i = list.indexOf(f); if (i > -1) list.splice(i, 1);
    },
    clearAll(list) {
        list.forEach(f => { if (f.el.parentNode) f.el.remove(); });
        list.length = 0;
    }
};

const GameSession = {
    start(levelId) {
        const level = LEVELS.find(l => l.id === levelId);
        if (!level) return;
        const targetFigure = randChoice(FIGURES);
        const distractorPool = [...targetFigure.similars, ...GENERIC_DISTRACTORS];
        FIGURES.forEach(f => { if (f.emoji !== targetFigure.emoji) distractorPool.push(f.emoji); });
        
        Game.session = { level, targetFigure, distractorPool, figures: [], targetAppeared: 0, targetFound: 0, targetRequired: level.targetCount, errors: 0, score: 0, startTimestamp: 0, pausedAt: 0, pausedDuration: 0, timeLeft: level.duration, paused: false, active: true, ending: false, rafId: null };
        
        $('#hud-target').textContent = targetFigure.emoji;
        $('#hud-level').textContent = level.id;
        $('#hud-time').textContent = level.duration + 's';
        $('#hud-score').textContent = '0';
        $('#hud-found').textContent = '0/' + level.targetCount;
        $('#hud-errors').textContent = '0';
        $('#hud-progress-fill').style.width = '0%';
        $('#game-area').innerHTML = '';
        
        showScreen('game');
        Game.session.startTimestamp = performance.now();
        this.loop(Game.session.startTimestamp);
    },
    loop(timestamp) {
        const s = Game.session;
        if (!s || !s.active) return;
        if (!s.paused) {
            const elapsed = (timestamp - s.startTimestamp - s.pausedDuration) / 1000;
            s.timeLeft = Math.max(0, s.level.duration - elapsed);
            this.maintainFigures(timestamp);
            this.removeExpired(timestamp);
            this.updateHUD();
            if (s.timeLeft <= 0 && !s.ending) { s.ending = true; this.end(); return; }
            if (s.targetFound >= s.targetRequired && !s.ending) { s.ending = true; this.end(); return; }
        }
        s.rafId = requestAnimationFrame(t => this.loop(t));
    },
    maintainFigures(ts) {
        const s = Game.session, lvl = s.level;
        let activeT = 0, activeD = 0;
        s.figures.forEach(f => f.isTarget ? activeT++ : activeD++);
        while (activeT < lvl.simultaneousTargets && s.targetAppeared < s.targetRequired) {
            const f = FigureSystem.create(s.targetFigure.emoji, true, lvl, s.figures);
            if (f) { s.targetAppeared++; activeT++; } else break;
        }
        while (activeD < lvl.distractors) {
            const f = FigureSystem.create(randChoice(s.distractorPool), false, lvl, s.figures);
            if (f) activeD++; else break;
        }
    },
    removeExpired(ts) {
        const s = Game.session, expired = [];
        s.figures.forEach(f => { if (ts - f.bornAt > f.lifetime) expired.push(f); });
        expired.forEach(f => {
            f.el.classList.add('is-disappearing');
            setTimeout(() => { if (f.el.parentNode) f.el.remove(); }, 400);
            const i = s.figures.indexOf(f);
            if (i > -1) s.figures.splice(i, 1);
            if (f.isTarget && s.targetAppeared > 0) s.targetAppeared--;
        });
    },
    onTargetHit(f) {
        const s = Game.session;
        if (!s || s.ending) return;
        s.targetFound++; s.score += 10;
        const r = f.el.getBoundingClientRect();
        Particles.burst(r.left + r.width / 2, r.top + r.height / 2, 'success');
        FigureSystem.removeAsCorrect(f, s.figures);
        Audio.success();
        if (Math.random() < 0.18) showToast(randChoice(t.motivationalMessages), 'success');
        this.updateHUD();
    },
    onDistractorHit(f) {
        const s = Game.session;
        if (!s || s.ending) return;
        s.errors++; s.score = Math.max(0, s.score - 3);
        const r = f.el.getBoundingClientRect();
        Particles.burst(r.left + r.width / 2, r.top + r.height / 2, 'error');
        FigureSystem.removeAsWrong(f, s.figures);
        Audio.error();
        $('#app').classList.add('shake-screen');
        setTimeout(() => $('#app').classList.remove('shake-screen'), 400);
        showToast(t.tryAgainMsg, 'error');
        this.updateHUD();
    },
    updateHUD() {
        const s = Game.session;
        if (!s) return;
        $('#hud-time').textContent = Math.ceil(s.timeLeft) + 's';
        $('#hud-score').textContent = s.score;
        $('#hud-found').textContent = s.targetFound + '/' + s.targetRequired;
        $('#hud-errors').textContent = s.errors;
        $('#hud-progress-fill').style.width = (s.targetFound / s.targetRequired) * 100 + '%';
    },
    pause() {
        const s = Game.session;
        if (!s || !s.active || s.paused) return;
        s.paused = true; s.pausedAt = performance.now();
        showScreen('pause');
    },
    resume() {
        const s = Game.session;
        if (!s || !s.active || !s.paused) return;
        s.paused = false; s.pausedDuration += performance.now() - s.pausedAt;
        showScreen('game');
        s.rafId = requestAnimationFrame(ts => this.loop(ts));
    },
    end() {
        const s = Game.session;
        if (!s) return;
        s.active = false; cancelAnimationFrame(s.rafId);
        setTimeout(() => FigureSystem.clearAll(s.figures), 100);
        const success = s.targetFound >= s.targetRequired;
        if (success) {
            let stars = 1;
            if (s.errors <= 5) stars = 2;
            if (s.errors <= 2) stars = 3;
            const prev = Game.records[s.level.id] || { stars: 0, score: 0, errors: 999 };
            Game.records[s.level.id] = { stars: Math.max(prev.stars, stars), score: Math.max(prev.score, s.score), errors: Math.min(prev.errors, s.errors) };
            if (s.level.id === Game.unlockedLevels && s.level.id < LEVELS.length) Game.unlockedLevels = s.level.id + 1;
            saveState();
            $('#complete-found').textContent = s.targetFound + '/' + s.targetRequired;
            $('#complete-errors').textContent = s.errors;
            $('#complete-score').textContent = s.score;
            $$('#complete-stars .star').forEach((el, i) => el.classList.toggle('is-active', i < stars));
            $('#complete-title').textContent = randChoice(t.motivationalMessages);
            const nextBtn = $('#btn-next');
            if (s.level.id < LEVELS.length) {
                nextBtn.textContent = t.completeBtnNext; nextBtn.dataset.action = 'next-level';
            } else {
                nextBtn.textContent = t.seeTrophyBtn; nextBtn.dataset.action = 'go-victory';
            }
            Audio.levelUp();
            setTimeout(() => showScreen('complete'), 600);
        } else {
            $('#defeat-found').textContent = s.targetFound + '/' + s.targetRequired;
            setTimeout(() => showScreen('defeat'), 400);
        }
    },
    restart() { if (Game.session) this.start(Game.session.level.id); },
    nextLevel() {
        if (!Game.session) return;
        const nextId = Game.session.level.id + 1;
        if (nextId <= LEVELS.length) this.start(nextId);
        else this.showVictory();
    },
    showVictory() {
        let totalStars = 0, totalScore = 0;
        Object.values(Game.records).forEach(r => { totalStars += r.stars; totalScore += r.score; });
        $('#victory-stars').textContent = totalStars;
        $('#victory-score').textContent = totalScore;
        Audio.victory();
        showScreen('victory');
    }
};

/* =========================================================
   SELECTOR DE NIVELES Y STATS
========================================================= */

function buildLevelSelect() {
    const grid = $('#levels-grid');
    grid.innerHTML = '';
    LEVELS.forEach(level => {
        const card = document.createElement('div');
        const isLocked = level.id > Game.unlockedLevels;
        card.className = 'level-card' + (isLocked ? ' is-locked' : '');
        const record = Game.records[level.id];
        const stars = record ? record.stars : 0;
        let starsHTML = '';
        for (let i = 0; i < 3; i++) {
            starsHTML += i < stars ? '<span class="star-active">⭐</span>' : '<span style="opacity:0.3">⭐</span>';
        }
        card.innerHTML = `
            <div class="level-number">${t.levelWord} ${level.id}</div>
            <div class="level-icon">${level.icon}</div>
            <div class="level-name">${t.levels[level.id - 1].name}</div>
            <div class="level-stars">${starsHTML}</div>
        `;
        if (!isLocked) {
            card.addEventListener('click', () => {
                Audio.click();
                GameSession.start(level.id);
            });
        }
        grid.appendChild(card);
    });
}

function updateMainMenuStats() {
    let totalStars = 0, totalScore = 0, totalTrophies = 0;
    Object.values(Game.records).forEach(r => { totalStars += r.stars; totalScore += r.score; });
    if (Game.unlockedLevels >= LEVELS.length) {
        const allThree = LEVELS.every(l => Game.records[l.id] && Game.records[l.id].stars === 3);
        if (allThree) totalTrophies = 1;
    }
    $('#stat-total-stars').textContent = totalStars;
    $('#stat-total-trophies').textContent = totalTrophies;
    $('#stat-total-score').textContent = totalScore;
    $('#btn-sound').innerHTML = Game.settings.sound ? t.soundOn : t.soundOff;
    $('#btn-music').innerHTML = Game.settings.music ? t.musicOn : t.musicOff;
}

/* =========================================================
   ACCIONES
========================================================= */

document.body.addEventListener('click', event => {
    let target = event.target;
    while (target && target !== document.body) {
        if (target.dataset.action) {
            handleAction(target.dataset.action);
            break;
        }
        target = target.parentElement;
    }
});

function handleAction(action) {
    if (!Audio.ctx) {
        Audio.init(); Audio.resume();
        if (Game.settings.music) Audio.startMusic();
    }
    switch (action) {
        case 'go-menu': Audio.click(); if (Game.session) Game.session.active = false; updateMainMenuStats(); showScreen('menu'); break;
        case 'go-levels': Audio.click(); buildLevelSelect(); showScreen('levels'); break;
        case 'go-instructions': Audio.click(); showScreen('instructions'); break;
        case 'pause': Audio.click(); GameSession.pause(); break;
        case 'resume': Audio.click(); GameSession.resume(); break;
        case 'restart': Audio.click(); GameSession.restart(); break;
        case 'next-level': Audio.click(); GameSession.nextLevel(); break;
        case 'go-victory': Audio.click(); GameSession.showVictory(); break;
        case 'toggle-sound': Game.settings.sound = !Game.settings.sound; saveState(); updateMainMenuStats(); if (Game.settings.sound) Audio.click(); break;
        case 'toggle-music': Game.settings.music = !Game.settings.music; saveState(); updateMainMenuStats(); if (Game.settings.music) Audio.startMusic(); else Audio.stopMusic(); Audio.click(); break;
    }
}

/* =========================================================
   CONTROLES TÁCTILES
========================================================= */

document.addEventListener('touchmove', e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
let lastTouchEnd = 0;
document.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, { passive: false });

/* =========================================================
   INICIO
========================================================= */

window.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
    Background.init();
    Particles.init();
    updateMainMenuStats();
});

})();