(function() {
/* =========================================================
   TRADUCCIONES Y DATOS DEL JUEGO POR IDIOMA
========================================================= */
const translations = {
    es: {
        title: "Pareo de Emojis y Palabras",
        levelWord: "Nivel",
        ofWord: "de",
        restartBtn: "Reiniciar nivel",
        helpBtn: "Cómo jugar",
        settingsTitle: "Ajustes",
        soundLabel: "Sonido",
        calmLabel: "Modo de calma",
        autoHintLabel: "Pista automática",
        resetAllBtn: "Volver al inicio",
        instructionText: "Toca el emoji de:",
        howToTitle: "Cómo jugar",
        step1Text: "Mira la palabra que aparece arriba",
        step2Text: "Toca el emoji que representa esa palabra",
        step3Text: "Gana estrellas por cada respuesta correcta",
        step4Text: "Si necesitas ayuda, toca el botón de pista",
        closeHowTo: "Entendido",
        nextLevelBtn: "Siguiente nivel",
        playAgainBtn: "Jugar de nuevo",
        tryAgainMsg: "¡Inténtalo de nuevo!",
        streakMsg: (s) => `¡Racha de ${s}! `,
        levelCompleteTitle: (lvl) => `¡Nivel ${lvl} completado!`,
        starsEarnedMsg: (earned, max) => `Conseguiste ${earned} de ${max} estrellas.`,
        matchMsgs: ['¡Muy bien!', '¡Excelente!', '¡Genial!', '¡Sigue así!', '¡Buen trabajo!'],
        levelCompleteMsgs: ['', '¡Lo lograste! Buen esfuerzo.', '¡Muy bien! Sigue practicando.', '¡Excelente! ¡Respuestas perfectas!'],
        levels: [
            { name: 'Animales', pairs: [{ word: 'perro', emoji: '🐶' }, { word: 'gato', emoji: '🐱' }, { word: 'rana', emoji: '🐸' }, { word: 'pez', emoji: '🐟' }] },
            { name: 'Comida', pairs: [{ word: 'manzana', emoji: '🍎' }, { word: 'banana', emoji: '🍌' }, { word: 'pizza', emoji: '🍕' }, { word: 'helado', emoji: '🍦' }] },
            { name: 'Naturaleza', pairs: [{ word: 'sol', emoji: '☀️' }, { word: 'luna', emoji: '🌙' }, { word: 'estrella', emoji: '⭐' }, { word: 'nube', emoji: '☁️' }, { word: 'flor', emoji: '🌸' }] },
            { name: 'Objetos', pairs: [{ word: 'libro', emoji: '📚' }, { word: 'lápiz', emoji: '✏️' }, { word: 'casa', emoji: '🏠' }, { word: 'carro', emoji: '🚗' }, { word: 'silla', emoji: '🪑' }, { word: 'crayón', emoji: '🖍️' }] },
            { name: 'Mezcla', pairs: [{ word: 'oso', emoji: '🐻' }, { word: 'conejo', emoji: '🐰' }, { word: 'uva', emoji: '🍇' }, { word: 'sandía', emoji: '🍉' }, { word: 'avión', emoji: '✈️' }, { word: 'guitarra', emoji: '🎸' }, { word: 'pan', emoji: '🍞' }, { word: 'dona', emoji: '🍩' }] }
        ]
    },
    en: {
        title: "Match Emojis and Words",
        levelWord: "Level",
        ofWord: "of",
        restartBtn: "Restart level",
        helpBtn: "How to play",
        settingsTitle: "Settings",
        soundLabel: "Sound",
        calmLabel: "Calm mode",
        autoHintLabel: "Auto hint",
        resetAllBtn: "Back to start",
        instructionText: "Tap the emoji of:",
        howToTitle: "How to play",
        step1Text: "Look at the word that appears above",
        step2Text: "Tap the emoji that represents that word",
        step3Text: "Earn stars for each correct answer",
        step4Text: "If you need help, tap the hint button",
        closeHowTo: "Got it",
        nextLevelBtn: "Next level",
        playAgainBtn: "Play again",
        tryAgainMsg: "Try again!",
        streakMsg: (s) => `Streak of ${s}! `,
        levelCompleteTitle: (lvl) => `Level ${lvl} completed!`,
        starsEarnedMsg: (earned, max) => `You got ${earned} out of ${max} stars.`,
        matchMsgs: ['Very good!', 'Excellent!', 'Great!', 'Keep it up!', 'Good job!'],
        levelCompleteMsgs: ['', 'You did it! Good effort.', 'Very good! Keep practicing.', 'Excellent! Perfect answers!'],
        levels: [
            { name: 'Animals', pairs: [{ word: 'dog', emoji: '🐶' }, { word: 'cat', emoji: '🐱' }, { word: 'frog', emoji: '🐸' }, { word: 'fish', emoji: '🐟' }] },
            { name: 'Food', pairs: [{ word: 'apple', emoji: '🍎' }, { word: 'banana', emoji: '🍌' }, { word: 'pizza', emoji: '🍕' }, { word: 'ice cream', emoji: '🍦' }] },
            { name: 'Nature', pairs: [{ word: 'sun', emoji: '☀️' }, { word: 'moon', emoji: '🌙' }, { word: 'star', emoji: '⭐' }, { word: 'cloud', emoji: '☁️' }, { word: 'flower', emoji: '🌸' }] },
            { name: 'Objects', pairs: [{ word: 'book', emoji: '📚' }, { word: 'pencil', emoji: '✏️' }, { word: 'house', emoji: '🏠' }, { word: 'car', emoji: '🚗' }, { word: 'chair', emoji: '🪑' }, { word: 'crayon', emoji: '🖍️' }] },
            { name: 'Mix', pairs: [{ word: 'bear', emoji: '🐻' }, { word: 'rabbit', emoji: '🐰' }, { word: 'grape', emoji: '🍇' }, { word: 'watermelon', emoji: '🍉' }, { word: 'plane', emoji: '✈️' }, { word: 'guitar', emoji: '🎸' }, { word: 'bread', emoji: '🍞' }, { word: 'donut', emoji: '🍩' }] }
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
    document.title = t.title;
    setText("instructionText", t.instructionText);
    setText("restartBtnText", t.restartBtn);
    setText("helpBtnText", t.helpBtn);
    setText("settingsTitle", t.settingsTitle);
    setText("soundLabel", t.soundLabel);
    setText("calmLabel", t.calmLabel);
    setText("autoHintLabel", t.autoHintLabel);
    setText("resetAllBtnText", t.resetAllBtn);
    setText("howToTitle", t.howToTitle);
    setText("step1Text", t.step1Text);
    setText("step2Text", t.step2Text);
    setText("step3Text", t.step3Text);
    setText("step4Text", t.step4Text);
    setText("closeHowTo", t.closeHowTo);

    const langEsBtn = document.getElementById("langEs");
    const langEnBtn = document.getElementById("langEn");
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");

    // Actualizar UI dinámica del juego con el nuevo idioma
    updateHeader();
    renderGrid();
    if (targetIndex !== -1 && !locked) {
        els.targetWord.textContent = t.levels[currentLevel].pairs[targetIndex].word;
    }
}

// Configurar menú de ajustes de idioma
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

/* =========================================
   ESTADO DEL JUEGO
========================================= */
let currentLevel = 0;
let completedWords = [];
let targetIndex = -1;
let attempts = 0;
let hintUsed = false;
let locked = false;
let totalStars = 0;
let levelStars = 0;
let streak = 0;
let completedLevels = [];

let settings = { sound: false, calmMode: false, autoHint: false };

/* =========================================
   ELEMENTOS DEL DOM
========================================= */
const $ = id => document.getElementById(id);
const els = {
    levelBadge: $('levelBadge'), levelName: $('levelName'), levelMap: $('levelMap'),
    progressFill: $('progressFill'), progressText: $('progressText'), starCount: $('starCount'),
    targetWord: $('targetWord'), emojiGrid: $('emojiGrid'), feedbackArea: $('feedbackArea'),
    hintBtn: $('hintBtn'), settingsBtn: $('settingsBtn'), restartBtn: $('restartBtn'), helpBtn: $('helpBtn'),
    settingsOverlay: $('settingsOverlay'), closeSettings: $('closeSettings'), soundToggle: $('soundToggle'),
    calmToggle: $('calmToggle'), autoHintToggle: $('autoHintToggle'), resetAllBtn: $('resetAllBtn'),
    modalOverlay: $('modalOverlay'), modalIcon: $('modalIcon'), modalTitle: $('modalTitle'),
    modalText: $('modalText'), modalStars: $('modalStars'), modalBtn: $('modalBtn'),
    howToPlayOverlay: $('howToPlayOverlay'), closeHowToPlay: $('closeHowToPlay')
};

/* =========================================
   AUDIO
========================================= */
let audioCtx = null;
function getAudioCtx() {
    if (!audioCtx) { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    return audioCtx;
}
function playTone(freq, dur, delay = 0) {
    if (!settings.sound) return;
    try {
        const ctx = getAudioCtx();
        const t = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(.12, t);
        gain.gain.exponentialRampToValueAtTime(.001, t + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + dur);
    } catch (e) {}
}
function playCorrectSound() { playTone(523.25, .15, 0); playTone(659.25, .18, .1); playTone(783.99, .22, .2); }
function playWrongSound() { playTone(329.63, .18, 0); playTone(261.63, .22, .1); }
function playLevelSound() { playTone(523.25, .15, 0); playTone(659.25, .15, .12); playTone(783.99, .15, .24); playTone(1046.50, .3, .36); }

/* =========================================
   UTILIDADES
========================================= */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* =========================================
   MAPA DE NIVELES
========================================= */
function renderLevelMap() {
    const map = els.levelMap;
    map.innerHTML = '';
    t.levels.forEach((lvl, i) => {
        if (i > 0) {
            const conn = document.createElement('div');
            conn.className = 'level-connector' + (completedLevels.includes(i - 1) ? ' completed' : '');
            map.appendChild(conn);
        }
        const dot = document.createElement('div');
        dot.className = 'level-dot';
        if (completedLevels.includes(i)) dot.classList.add('completed');
        if (i === currentLevel) dot.classList.add('current');
        dot.textContent = i + 1;
        map.appendChild(dot);
    });
}

/* =========================================
   ACTUALIZAR UI
========================================= */
function updateHeader() {
    const level = t.levels[currentLevel];
    els.levelBadge.textContent = t.levelWord + ' ' + (currentLevel + 1);
    els.levelName.textContent = level.name;
    els.progressText.textContent = completedWords.length + ' ' + t.ofWord + ' ' + level.pairs.length;
    els.progressFill.style.width = (completedWords.length / level.pairs.length * 100) + '%';
    els.starCount.textContent = totalStars;
    renderLevelMap();
}

function updateHintBtn() {
    els.hintBtn.classList.toggle('used', hintUsed);
    els.hintBtn.disabled = hintUsed;
}

function showFeedback(text, type) {
    els.feedbackArea.textContent = text;
    els.feedbackArea.className = 'feedback-area feedback-' + type;
}

function clearFeedback() {
    els.feedbackArea.textContent = '';
    els.feedbackArea.className = 'feedback-area';
}

/* =========================================
   RENDERIZAR CUADRÍCULA
========================================= */
function renderGrid() {
    const level = t.levels[currentLevel];
    const grid = els.emojiGrid;
    grid.innerHTML = '';
    const count = level.pairs.length;
    let cols = count <= 4 ? 2 : count <= 6 ? 3 : 4;
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    const shuffled = shuffle(level.pairs.map((p, i) => ({ ...p, idx: i })));

    shuffled.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'emoji-card';
        btn.textContent = item.emoji;
        btn.setAttribute('aria-label', item.word);
        btn.dataset.idx = item.idx;
        btn.addEventListener('click', () => handleChoice(item.idx, btn));
        grid.appendChild(btn);
    });
}

/* =========================================
   INICIAR NIVEL
========================================= */
function startLevel(lvl) {
    currentLevel = lvl;
    completedWords = [];
    levelStars = 0;
    streak = 0;
    locked = false;
    updateHeader();
    nextWord();
}

/* =========================================
   SIGUIENTE PALABRA
========================================= */
function nextWord() {
    const level = t.levels[currentLevel];
    const available = level.pairs.map((_, i) => i).filter(i => !completedWords.includes(i));

    if (available.length === 0) {
        levelComplete();
        return;
    }

    targetIndex = available[Math.floor(Math.random() * available.length)];
    attempts = 0;
    hintUsed = false;
    locked = false;

    const tw = els.targetWord;
    tw.classList.add('fading');

    setTimeout(() => {
        tw.textContent = level.pairs[targetIndex].word;
        tw.classList.remove('fading');
    }, 200);

    clearFeedback();
    renderGrid();
    updateHintBtn();
}

/* =========================================
   MANEJAR ELECCIÓN
========================================= */
function handleChoice(idx, btn) {
    if (locked) return;

    if (idx === targetIndex) {
        locked = true;
        attempts++;
        streak++;

        const wordStars = attempts === 1 ? (hintUsed ? 2 : 3) : 1;
        levelStars += wordStars;
        totalStars += wordStars;

        btn.classList.add('correct');
        document.querySelectorAll('.emoji-card').forEach(card => {
            if (card !== btn) card.classList.add('disabled');
        });

        let msg = t.matchMsgs[Math.floor(Math.random() * t.matchMsgs.length)];
        if (streak >= 3) msg = t.streakMsg(streak) + msg;

        showFeedback(msg, 'success');
        playCorrectSound();
        completedWords.push(targetIndex);
        updateHeader();

        setTimeout(() => nextWord(), 1000);
        return;
    }

    attempts++;
    streak = 0;
    btn.classList.add('wrong');
    showFeedback(t.tryAgainMsg, 'warning');
    playWrongSound();

    setTimeout(() => {
        btn.classList.remove('wrong');
        if (settings.autoHint && attempts >= 2 && !hintUsed) {
            showHint();
        }
    }, 700);
}

/* =========================================
   PISTA
========================================= */
function showHint() {
    if (hintUsed) return;
    hintUsed = true;
    updateHintBtn();

    document.querySelectorAll('.emoji-card').forEach(card => {
        if (parseInt(card.dataset.idx) === targetIndex) {
            card.classList.add('hint');
            setTimeout(() => card.classList.remove('hint'), 2500);
        }
    });
}

/* =========================================
   NIVEL COMPLETADO
========================================= */
function levelComplete() {
    const level = t.levels[currentLevel];
    const maxStars = level.pairs.length * 3;
    const pct = levelStars / maxStars;
    let earned = 1;

    if (pct >= .9) earned = 3;
    else if (pct >= .6) earned = 2;

    if (!completedLevels.includes(currentLevel)) {
        completedLevels.push(currentLevel);
    }

    playLevelSound();

    const msg = t.levelCompleteMsgs[earned] + ' ' + t.starsEarnedMsg(levelStars, maxStars);
    const btnText = currentLevel < t.levels.length - 1 ? t.nextLevelBtn : t.playAgainBtn;

    showModal('🌟', t.levelCompleteTitle(currentLevel + 1), msg, earned, btnText, () => {
        if (currentLevel < t.levels.length - 1) {
            startLevel(currentLevel + 1);
        } else {
            totalStars = 0;
            completedLevels = [];
            startLevel(0);
        }
    });
}

/* =========================================
   MODALES
========================================= */
function showModal(icon, title, text, stars, btnText, onClick) {
    els.modalIcon.textContent = icon;
    els.modalTitle.textContent = title;
    els.modalText.textContent = text;

    const sc = els.modalStars;
    sc.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        const s = document.createElement('i');
        s.className = 'fas fa-star modal-star';
        if (i < stars) {
            s.classList.add('earned');
            s.style.animationDelay = (i * .2) + 's';
        }
        sc.appendChild(s);
    }

    els.modalBtn.textContent = btnText;
    els.modalBtn.onclick = () => {
        hideModal();
        onClick();
    };

    els.modalOverlay.classList.add('active');
}

function hideModal() {
    els.modalOverlay.classList.remove('active');
}

/* =========================================
   AJUSTES
========================================= */
function loadSettings() {
    try {
        const saved = localStorage.getItem('emojiMatchSettings');
        if (saved) {
            settings = { ...settings, ...JSON.parse(saved) };
        }
    } catch (e) {}
}

function saveSettings() {
    try {
        localStorage.setItem('emojiMatchSettings', JSON.stringify(settings));
    } catch (e) {}
}

function applySettings() {
    els.soundToggle.classList.toggle('active', settings.sound);
    els.soundToggle.setAttribute('aria-checked', settings.sound);
    els.calmToggle.classList.toggle('active', settings.calmMode);
    els.calmToggle.setAttribute('aria-checked', settings.calmMode);
    document.body.classList.toggle('calm-mode', settings.calmMode);
    els.autoHintToggle.classList.toggle('active', settings.autoHint);
    els.autoHintToggle.setAttribute('aria-checked', settings.autoHint);
}

function toggleSetting(key) {
    settings[key] = !settings[key];
    applySettings();
    saveSettings();
}

/* =========================================
   EVENTOS
========================================= */
els.hintBtn.addEventListener('click', showHint);

els.settingsBtn.addEventListener('click', () => {
    els.settingsOverlay.classList.add('active');
});

els.closeSettings.addEventListener('click', () => {
    els.settingsOverlay.classList.remove('active');
});

els.settingsOverlay.addEventListener('click', e => {
    if (e.target === els.settingsOverlay) {
        els.settingsOverlay.classList.remove('active');
    }
});

els.soundToggle.addEventListener('click', () => toggleSetting('sound'));
els.calmToggle.addEventListener('click', () => toggleSetting('calmMode'));
els.autoHintToggle.addEventListener('click', () => toggleSetting('autoHint'));

els.resetAllBtn.addEventListener('click', () => {
    els.settingsOverlay.classList.remove('active');
    totalStars = 0;
    completedLevels = [];
    startLevel(0);
});

els.restartBtn.addEventListener('click', () => {
    startLevel(currentLevel);
});

els.helpBtn.addEventListener('click', () => {
    els.howToPlayOverlay.classList.add('active');
});

els.closeHowToPlay.addEventListener('click', () => {
    els.howToPlayOverlay.classList.remove('active');
});

els.howToPlayOverlay.addEventListener('click', e => {
    if (e.target === els.howToPlayOverlay) {
        els.howToPlayOverlay.classList.remove('active');
    }
});

/* =========================================
   INICIALIZACIÓN
========================================= */
loadSettings();
applySettings();
changeLanguage(currentLang); // Aplica el idioma y arranca la traducción
startLevel(0);

try {
    if (!localStorage.getItem('emojiMatchVisited')) {
        setTimeout(() => {
            els.howToPlayOverlay.classList.add('active');
        }, 400);
        localStorage.setItem('emojiMatchVisited', '1');
    }
} catch (e) {}

})();