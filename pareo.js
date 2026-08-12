/* =========================================
   DATOS DEL JUEGO
========================================= */

const levelData = [

    {
        name: 'Animales',

        pairs: [
            { word: 'perro', emoji: '🐶' },
            { word: 'gato', emoji: '🐱' },
            { word: 'rana', emoji: '🐸' },
            { word: 'pez', emoji: '🐟' }
        ]
    },

    {
        name: 'Comida',

        pairs: [
            { word: 'manzana', emoji: '🍎' },
            { word: 'banana', emoji: '🍌' },
            { word: 'pizza', emoji: '🍕' },
            { word: 'helado', emoji: '🍦' }
        ]
    },

    {
        name: 'Naturaleza',

        pairs: [
            { word: 'sol', emoji: '☀️' },
            { word: 'luna', emoji: '🌙' },
            { word: 'estrella', emoji: '⭐' },
            { word: 'nube', emoji: '☁️' },
            { word: 'flor', emoji: '🌸' }
        ]
    },

    {
        name: 'Objetos',

        pairs: [
            { word: 'libro', emoji: '📚' },
            { word: 'lápiz', emoji: '✏️' },
            { word: 'casa', emoji: '🏠' },
            { word: 'carro', emoji: '🚗' },
            { word: 'silla', emoji: '🪑' },
            { word: 'crayón', emoji: '🖍️' }
        ]
    },

    {
        name: 'Mezcla',

        pairs: [
            { word: 'oso', emoji: '🐻' },
            { word: 'conejo', emoji: '🐰' },
            { word: 'uva', emoji: '🍇' },
            { word: 'sandía', emoji: '🍉' },
            { word: 'avión', emoji: '✈️' },
            { word: 'guitarra', emoji: '🎸' },
            { word: 'pan', emoji: '🍞' },
            { word: 'dona', emoji: '🍩' }
        ]
    }

];


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


let settings = {
    sound: false,
    calmMode: false,
    autoHint: false
};


/* =========================================
   ELEMENTOS DEL DOM
========================================= */

const $ = id => document.getElementById(id);


const els = {

    levelBadge: $('levelBadge'),

    levelName: $('levelName'),

    levelMap: $('levelMap'),

    progressFill: $('progressFill'),

    progressText: $('progressText'),

    starCount: $('starCount'),

    targetWord: $('targetWord'),

    emojiGrid: $('emojiGrid'),

    feedbackArea: $('feedbackArea'),

    hintBtn: $('hintBtn'),

    settingsBtn: $('settingsBtn'),

    restartBtn: $('restartBtn'),

    helpBtn: $('helpBtn'),

    settingsOverlay: $('settingsOverlay'),

    closeSettings: $('closeSettings'),

    soundToggle: $('soundToggle'),

    calmToggle: $('calmToggle'),

    autoHintToggle: $('autoHintToggle'),

    resetAllBtn: $('resetAllBtn'),

    modalOverlay: $('modalOverlay'),

    modalIcon: $('modalIcon'),

    modalTitle: $('modalTitle'),

    modalText: $('modalText'),

    modalStars: $('modalStars'),

    modalBtn: $('modalBtn'),

    howToPlayOverlay: $('howToPlayOverlay'),

    closeHowToPlay: $('closeHowToPlay')

};


/* =========================================
   AUDIO
========================================= */

let audioCtx = null;


function getAudioCtx() {

    if (!audioCtx) {

        audioCtx = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    }

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

        gain.gain.exponentialRampToValueAtTime(
            .001,
            t + dur
        );

        osc.connect(gain);

        gain.connect(ctx.destination);

        osc.start(t);

        osc.stop(t + dur);

    } catch (e) {

        // El audio no debe detener el juego.

    }
}


function playCorrectSound() {

    playTone(523.25, .15, 0);

    playTone(659.25, .18, .1);

    playTone(783.99, .22, .2);

}


function playWrongSound() {

    playTone(329.63, .18, 0);

    playTone(261.63, .22, .1);

}


function playLevelSound() {

    playTone(523.25, .15, 0);

    playTone(659.25, .15, .12);

    playTone(783.99, .15, .24);

    playTone(1046.50, .3, .36);

}


/* =========================================
   UTILIDADES
========================================= */

function shuffle(arr) {

    for (
        let i = arr.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [
            arr[i],
            arr[j]
        ] = [
            arr[j],
            arr[i]
        ];

    }

    return arr;
}


/* =========================================
   MAPA DE NIVELES
========================================= */

function renderLevelMap() {

    const map = els.levelMap;

    map.innerHTML = '';


    levelData.forEach((lvl, i) => {

        if (i > 0) {

            const conn =
                document.createElement('div');

            conn.className =
                'level-connector' +
                (
                    completedLevels.includes(i - 1)
                        ? ' completed'
                        : ''
                );

            map.appendChild(conn);

        }


        const dot =
            document.createElement('div');

        dot.className = 'level-dot';


        if (completedLevels.includes(i)) {

            dot.classList.add('completed');

        }


        if (i === currentLevel) {

            dot.classList.add('current');

        }


        dot.textContent = i + 1;

        map.appendChild(dot);

    });

}


/* =========================================
   ACTUALIZAR UI
========================================= */

function updateHeader() {

    const level =
        levelData[currentLevel];


    els.levelBadge.textContent =
        'Nivel ' + (currentLevel + 1);


    els.levelName.textContent =
        level.name;


    els.progressText.textContent =
        completedWords.length +
        ' de ' +
        level.pairs.length;


    els.progressFill.style.width =
        (
            completedWords.length /
            level.pairs.length *
            100
        ) + '%';


    els.starCount.textContent =
        totalStars;


    renderLevelMap();

}


function updateHintBtn() {

    els.hintBtn.classList.toggle(
        'used',
        hintUsed
    );

    els.hintBtn.disabled =
        hintUsed;

}


function showFeedback(text, type) {

    els.feedbackArea.textContent =
        text;

    els.feedbackArea.className =
        'feedback-area feedback-' +
        type;

}


function clearFeedback() {

    els.feedbackArea.textContent =
        '';

    els.feedbackArea.className =
        'feedback-area';

}


/* =========================================
   RENDERIZAR CUADRÍCULA
========================================= */

function renderGrid() {

    const level =
        levelData[currentLevel];

    const grid =
        els.emojiGrid;


    grid.innerHTML = '';


    const count =
        level.pairs.length;


    let cols =
        count <= 4
            ? 2
            : count <= 6
                ? 3
                : 4;


    grid.style.gridTemplateColumns =
        `repeat(${cols}, 1fr)`;


    const shuffled =
        shuffle(
            level.pairs.map(
                (p, i) => ({
                    ...p,
                    idx: i
                })
            )
        );


    shuffled.forEach(item => {

        const btn =
            document.createElement('button');


        btn.className =
            'emoji-card';


        btn.textContent =
            item.emoji;


        btn.setAttribute(
            'aria-label',
            item.word
        );


        btn.dataset.idx =
            item.idx;


        btn.addEventListener(
            'click',
            () => handleChoice(
                item.idx,
                btn
            )
        );


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

    const level =
        levelData[currentLevel];


    const available =
        level.pairs
            .map((_, i) => i)
            .filter(
                i => !completedWords.includes(i)
            );


    if (available.length === 0) {

        levelComplete();

        return;

    }


    targetIndex =
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ];


    attempts = 0;

    hintUsed = false;

    locked = false;


    const tw =
        els.targetWord;


    tw.classList.add('fading');


    setTimeout(() => {

        tw.textContent =
            level.pairs[targetIndex].word;

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


    /* RESPUESTA CORRECTA */

    if (idx === targetIndex) {

        locked = true;

        attempts++;

        streak++;


        const wordStars =
            attempts === 1
                ? (hintUsed ? 2 : 3)
                : 1;


        levelStars += wordStars;

        totalStars += wordStars;


        btn.classList.add('correct');


        document
            .querySelectorAll('.emoji-card')
            .forEach(card => {

                if (card !== btn) {

                    card.classList.add(
                        'disabled'
                    );

                }

            });


        const messages = [

            '¡Muy bien!',

            '¡Excelente!',

            '¡Genial!',

            '¡Sigue así!',

            '¡Buen trabajo!'

        ];


        let msg =
            messages[
                Math.floor(
                    Math.random() *
                    messages.length
                )
            ];


        if (streak >= 3) {

            msg =
                '¡Racha de ' +
                streak +
                '! ' +
                msg;

        }


        showFeedback(
            msg,
            'success'
        );


        playCorrectSound();


        completedWords.push(
            targetIndex
        );


        updateHeader();


        setTimeout(
            () => nextWord(),
            1000
        );


        return;

    }


    /* RESPUESTA INCORRECTA */

    attempts++;

    streak = 0;


    btn.classList.add('wrong');


    showFeedback(
        '¡Inténtalo de nuevo!',
        'warning'
    );


    playWrongSound();


    setTimeout(() => {

        btn.classList.remove('wrong');


        if (
            settings.autoHint &&
            attempts >= 2 &&
            !hintUsed
        ) {

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


    document
        .querySelectorAll('.emoji-card')
        .forEach(card => {

            if (
                parseInt(card.dataset.idx) ===
                targetIndex
            ) {

                card.classList.add('hint');


                setTimeout(() => {

                    card.classList.remove(
                        'hint'
                    );

                }, 2500);

            }

        });

}


/* =========================================
   NIVEL COMPLETADO
========================================= */

function levelComplete() {

    const level =
        levelData[currentLevel];


    const maxStars =
        level.pairs.length * 3;


    const pct =
        levelStars / maxStars;


    let earned = 1;


    if (pct >= .9) {

        earned = 3;

    } else if (pct >= .6) {

        earned = 2;

    }


    if (
        !completedLevels.includes(
            currentLevel
        )
    ) {

        completedLevels.push(
            currentLevel
        );

    }


    playLevelSound();


    const messages = [

        '',

        '¡Lo lograste! Buen esfuerzo.',

        '¡Muy bien! Sigue practicando.',

        '¡Excelente! ¡Respuestas perfectas!'

    ];


    showModal(

        '🌟',

        '¡Nivel ' +
        (currentLevel + 1) +
        ' completado!',

        messages[earned] +
        ' Conseguiste ' +
        levelStars +
        ' de ' +
        maxStars +
        ' estrellas.',

        earned,

        currentLevel <
        levelData.length - 1
            ? 'Siguiente nivel'
            : 'Jugar de nuevo',

        () => {

            if (
                currentLevel <
                levelData.length - 1
            ) {

                startLevel(
                    currentLevel + 1
                );

            } else {

                totalStars = 0;

                completedLevels = [];

                startLevel(0);

            }

        }

    );

}


/* =========================================
   MODALES
========================================= */

function showModal(
    icon,
    title,
    text,
    stars,
    btnText,
    onClick
) {

    els.modalIcon.textContent =
        icon;


    els.modalTitle.textContent =
        title;


    els.modalText.textContent =
        text;


    const sc =
        els.modalStars;


    sc.innerHTML = '';


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const s =
            document.createElement('i');


        s.className =
            'fas fa-star modal-star';


        if (i < stars) {

            s.classList.add('earned');

            s.style.animationDelay =
                (i * .2) + 's';

        }


        sc.appendChild(s);

    }


    els.modalBtn.textContent =
        btnText;


    els.modalBtn.onclick =
        () => {

            hideModal();

            onClick();

        };


    els.modalOverlay.classList.add(
        'active'
    );

}


function hideModal() {

    els.modalOverlay.classList.remove(
        'active'
    );

}


/* =========================================
   AJUSTES
========================================= */

function loadSettings() {

    try {

        const saved =
            localStorage.getItem(
                'emojiMatchSettings'
            );


        if (saved) {

            settings = {
                ...settings,
                ...JSON.parse(saved)
            };

        }

    } catch (e) {

        // Ignorar errores de localStorage.

    }

}


function saveSettings() {

    try {

        localStorage.setItem(
            'emojiMatchSettings',
            JSON.stringify(settings)
        );

    } catch (e) {

        // Ignorar errores de localStorage.

    }

}


function applySettings() {

    els.soundToggle.classList.toggle(
        'active',
        settings.sound
    );


    els.soundToggle.setAttribute(
        'aria-checked',
        settings.sound
    );


    els.calmToggle.classList.toggle(
        'active',
        settings.calmMode
    );


    els.calmToggle.setAttribute(
        'aria-checked',
        settings.calmMode
    );


    document.body.classList.toggle(
        'calm-mode',
        settings.calmMode
    );


    els.autoHintToggle.classList.toggle(
        'active',
        settings.autoHint
    );


    els.autoHintToggle.setAttribute(
        'aria-checked',
        settings.autoHint
    );

}


function toggleSetting(key) {

    settings[key] =
        !settings[key];


    applySettings();

    saveSettings();

}


/* =========================================
   EVENTOS
========================================= */

els.hintBtn.addEventListener(
    'click',
    showHint
);


els.settingsBtn.addEventListener(
    'click',
    () => {

        els.settingsOverlay.classList.add(
            'active'
        );

    }
);


els.closeSettings.addEventListener(
    'click',
    () => {

        els.settingsOverlay.classList.remove(
            'active'
        );

    }
);


els.settingsOverlay.addEventListener(
    'click',
    e => {

        if (
            e.target ===
            els.settingsOverlay
        ) {

            els.settingsOverlay.classList.remove(
                'active'
            );

        }

    }
);


els.soundToggle.addEventListener(
    'click',
    () => toggleSetting('sound')
);


els.calmToggle.addEventListener(
    'click',
    () => toggleSetting('calmMode')
);


els.autoHintToggle.addEventListener(
    'click',
    () => toggleSetting('autoHint')
);


els.resetAllBtn.addEventListener(
    'click',
    () => {

        els.settingsOverlay.classList.remove(
            'active'
        );

        totalStars = 0;

        completedLevels = [];

        startLevel(0);

    }
);


els.restartBtn.addEventListener(
    'click',
    () => {

        startLevel(currentLevel);

    }
);


els.helpBtn.addEventListener(
    'click',
    () => {

        els.howToPlayOverlay.classList.add(
            'active'
        );

    }
);


els.closeHowToPlay.addEventListener(
    'click',
    () => {

        els.howToPlayOverlay.classList.remove(
            'active'
        );

    }
);


els.howToPlayOverlay.addEventListener(
    'click',
    e => {

        if (
            e.target ===
            els.howToPlayOverlay
        ) {

            els.howToPlayOverlay.classList.remove(
                'active'
            );

        }

    }
);


/* =========================================
   INICIALIZACIÓN
========================================= */

loadSettings();

applySettings();

startLevel(0);


try {

    if (
        !localStorage.getItem(
            'emojiMatchVisited'
        )
    ) {

        setTimeout(() => {

            els.howToPlayOverlay.classList.add(
                'active'
            );

        }, 400);


        localStorage.setItem(
            'emojiMatchVisited',
            '1'
        );

    }

} catch (e) {

    // Ignorar errores de localStorage.

}