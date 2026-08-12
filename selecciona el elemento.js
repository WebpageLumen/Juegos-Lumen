/* =====================================================
   DECORACIÓN DEL PAISAJE
   ===================================================== */

const paisaje = document.getElementById('paisaje');

// Estrellas
for (let i = 0; i < 70; i++) {
    const s = document.createElement('div');

    s.className = 'estrella';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 55 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    s.style.animationDuration = (1.5 + Math.random() * 3) + 's';

    const size = 1.5 + Math.random() * 3;

    s.style.width = size + 'px';
    s.style.height = size + 'px';

    paisaje.appendChild(s);
}

// Estrellas fugaces
for (let i = 0; i < 3; i++) {
    const sf = document.createElement('div');

    sf.className = 'estrella-fugaz';
    sf.style.left = (10 + Math.random() * 60) + '%';
    sf.style.top = (5 + Math.random() * 30) + '%';
    sf.style.animationDelay = (i * 8 + Math.random() * 4) + 's';
    sf.style.animationDuration = (6 + Math.random() * 4) + 's';

    paisaje.appendChild(sf);
}

// Luciérnagas
for (let i = 0; i < 14; i++) {
    const l = document.createElement('div');

    l.className = 'luciernaga';
    l.style.left = Math.random() * 100 + '%';
    l.style.top = (20 + Math.random() * 60) + '%';
    l.style.animationDelay = Math.random() * 7 + 's';
    l.style.animationDuration = (5 + Math.random() * 5) + 's';

    paisaje.appendChild(l);
}

// Partículas flotantes
for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');

    p.className = 'particula';

    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animationDuration = (10 + Math.random() * 8) + 's';

    const colors = [
        'rgba(124,92,252,.3)',
        'rgba(0,229,255,.25)',
        'rgba(46,213,115,.2)',
        'rgba(200,200,255,.2)'
    ];

    p.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    const size = 3 + Math.random() * 5;

    p.style.width = size + 'px';
    p.style.height = size + 'px';

    document.body.appendChild(p);
}

// Parallax
document.addEventListener('mousemove', e => {

    const x =
        (e.clientX / window.innerWidth - 0.5) * 12;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 6;

    paisaje.style.transform =
        `translate(${x}px,${y}px)`;
});


/* =====================================================
   CONFETTI
   ===================================================== */

function crearConfetti(x, y, cantidad = 25) {

    const container = document.createElement('div');

    container.className = 'confetti-container';

    container.style.left = x + 'px';
    container.style.top = y + 'px';

    const colors = [
        '#7c5cfc',
        '#00e5ff',
        '#2ed573',
        '#ffa502',
        '#ff4757',
        '#ff9ff3',
        '#5cd85c',
        '#feca57'
    ];

    for (let i = 0; i < cantidad; i++) {

        const piece = document.createElement('div');

        piece.className = 'confetti-piece';

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        const angle =
            Math.random() * Math.PI * 2;

        const dist =
            60 + Math.random() * 160;

        piece.style.setProperty(
            '--tx',
            Math.cos(angle) * dist + 'px'
        );

        piece.style.setProperty(
            '--ty',
            Math.sin(angle) * dist + 'px'
        );

        piece.style.setProperty(
            '--rot',
            (360 + Math.random() * 720) + 'deg'
        );

        const size =
            5 + Math.random() * 8;

        piece.style.width = size + 'px';

        piece.style.height =
            size * (.3 + Math.random() * .5) + 'px';

        if (Math.random() > .5) {
            piece.style.borderRadius = '50%';
        }

        piece.style.animationDuration =
            (.7 + Math.random() * .7) + 's';

        piece.style.animationDelay =
            Math.random() * .12 + 's';

        container.appendChild(piece);
    }

    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 2000);
}


/* =====================================================
   RIPPLE
   ===================================================== */

function crearRipple(el, e) {

    const rect = el.getBoundingClientRect();

    const ripple =
        document.createElement('div');

    ripple.className = 'ripple-effect';

    const size =
        Math.max(rect.width, rect.height);

    ripple.style.width =
        ripple.style.height =
        size + 'px';

    ripple.style.left =
        (e.clientX - rect.left - size / 2) + 'px';

    ripple.style.top =
        (e.clientY - rect.top - size / 2) + 'px';

    el.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 500);
}


/* =====================================================
   LÓGICA DEL JUEGO
   ===================================================== */

const levels = [

    {
        label: "las estrellas",
        targets: [
            {
                symbol: "⭐",
                validColors: ["blue", "yellow"]
            }
        ],
        count: 6
    },

    {
        label: "las manzanas",
        targets: [
            {
                symbol: "🍎",
                validColors: ["red"]
            }
        ],
        count: 8
    },

    {
        label: "los perros",
        targets: [
            {
                symbol: "🐶",
                validColors: ["brown"]
            }
        ],
        count: 10
    },

    {
        label: "los gatos",
        targets: [
            {
                symbol: "🐱",
                validColors: ["white", "black"]
            }
        ],
        count: 9
    },

    {
        label: "los círculos",
        targets: [
            {
                symbol: "⚪",
                validColors: ["blue"]
            }
        ],
        count: 5
    },

    {
        label: "las fresas",
        targets: [
            {
                symbol: "🍓",
                validColors: ["red"]
            }
        ],
        count: 7
    },

    {
        label: "los peces",
        targets: [
            {
                symbol: "🐟",
                validColors: ["green"]
            }
        ],
        count: 4
    },

    {
        label: "las lunas",
        targets: [
            {
                symbol: "🌙",
                validColors: ["white"]
            }
        ],
        count: 3
    },

    {
        label: "las mariposas",
        targets: [
            {
                symbol: "🦋",
                validColors: ["pink"]
            }
        ],
        count: 6
    },

    {
        label: "los balones de fútbol",
        targets: [
            {
                symbol: "⚽",
                validColors: ["white"]
            }
        ],
        count: 1
    },

    {
        label: "los balones de baloncesto",
        targets: [
            {
                symbol: "🏀",
                validColors: ["orange"]
            }
        ],
        count: 2
    },

    {
        label: "las pelotas de béisbol",
        targets: [
            {
                symbol: "🥎",
                validColors: ["white"]
            }
        ],
        count: 3
    },

    {
        label: "los autos",
        targets: [
            {
                symbol: "🚗",
                validColors: ["red"]
            }
        ],
        count: 5
    },

    {
        label: "las notas musicales",
        targets: [
            {
                symbol: "🎵",
                validColors: ["blue"]
            }
        ],
        count: 4
    },

    {
        label: "los pingüinos",
        targets: [
            {
                symbol: "🐧",
                validColors: ["black"]
            }
        ],
        count: 6
    },

    {
        label: "los regalos",
        targets: [
            {
                symbol: "🎁",
                validColors: ["green"]
            }
        ],
        count: 8
    },

    {
        label: "los castillos",
        targets: [
            {
                symbol: "🏰",
                validColors: ["gray"]
            }
        ],
        count: 5
    },

    {
        label: "los monos",
        targets: [
            {
                symbol: "🐒",
                validColors: ["brown"]
            }
        ],
        count: 7
    },

    {
        label: "las uvas",
        targets: [
            {
                symbol: "🍇",
                validColors: ["purple"]
            }
        ],
        count: 4
    },

    {
        label: "los unicornios",
        targets: [
            {
                symbol: "🦄",
                validColors: ["white"]
            }
        ],
        count: 2
    },

    {
        label: "las gafas",
        targets: [
            {
                symbol: "🕶️",
                validColors: ["black"]
            }
        ],
        count: 3
    },

    {
        label: "las ranas",
        targets: [
            {
                symbol: "🐸",
                validColors: ["green"]
            }
        ],
        count: 6
    },

    {
        label: "las hamburguesas",
        targets: [
            {
                symbol: "🍔",
                validColors: ["brown"]
            }
        ],
        count: 7
    },

    {
        label: "los dinosaurios",
        targets: [
            {
                symbol: "🦖",
                validColors: ["green"]
            }
        ],
        count: 4
    }
];


const distractorPool = [
    "❤️","🍌","🍉","🐱","🐰","🐹","⬛","🍒","🍍","🥭",
    "🦀","🐢","🐙","☀️","🌍","🐝","🐞","🐜",
    "🏈","🎾","🚲","🛵","✈️","🎸","🥁","🎺",
    "🦆","🦉","🦢","🎂","🎈","🎉","🏠","🏢",
    "🏡","🦍","🐯","🐻","🐴","🐮","🐷","👒",
    "🎩","👑","🐍","🦎","🌭","🍕","🥪","🐘",
    "🦒","🦓","🔑","🗝️","📎","✂️","🍩","🍪",
    "🍫","🍰"
];


const colorMap = {
    red: "#ff6b6b",
    blue: "#54a0ff",
    yellow: "#feca57",
    white: "#ffffff",
    green: "#5cd85c",
    brown: "#cd853f",
    black: "#cccccc",
    gray: "#a0a0b8",
    pink: "#ff9ff3",
    purple: "#a55eea",
    orange: "#ff9f43"
};

const colorClasses =
    Object.keys(colorMap);


const correctMsgs = [
    "¡Excelente! 🌟",
    "¡Lo lograste! 🚀",
    "¡Muy bien! 👏",
    "¡Eres un genio! 🧠",
    "¡Perfecto! 🎯",
    "¡Sigue así! 💪",
    "¡Buen ojo! 👁️",
    "¡Fantástico! ✨"
];


const wrongMsgs = [
    "¡Casi! Inténtalo otra vez 🤔",
    "¡Uy! Esa no era 😅",
    "Concéntrate, tú puedes 🧘",
    "¡Oops! Revisa bien 🔍",
    "No te rindas, intenta de nuevo 🛡️"
];


const levelUpMsgs = [
    "¡Nivel superado! 🏆",
    "¡Genial, vamos por más! 🚀",
    "¡Lo dominas! Siguiente... ⏭️",
    "¡Increíble habilidad! 🌟",
    "¡Tu atención es de otro nivel! 🧠✨"
];


let currentLevel = 0;
let score = 0;
let remainingTargets = 0;


/* =====================================================
   ELEMENTOS DEL DOM
   ===================================================== */

const board =
    document.getElementById('board');

const titleEl =
    document.getElementById('title');

const scoreEl =
    document.getElementById('score');

const levelNumEl =
    document.getElementById('levelNum');

const messageEl =
    document.getElementById('message');

const levelBarFill =
    document.getElementById('levelBarFill');

const btnRestart =
    document.getElementById('btnRestart');

const btnNext =
    document.getElementById('btnNext');

const btnPrev =
    document.getElementById('btnPrev');

const gameEl =
    document.querySelector('.game');


/* =====================================================
   BOTONES
   ===================================================== */

btnRestart.addEventListener('click', () => {
    loadLevel(currentLevel);
});


btnNext.addEventListener('click', () => {

    if (currentLevel >= levels.length - 1) {
        showWin();
    } else {
        currentLevel =
            Math.min(
                levels.length - 1,
                currentLevel + 1
            );

        loadLevel(currentLevel);
    }

});


btnPrev.addEventListener('click', () => {

    currentLevel =
        Math.max(0, currentLevel - 1);

    loadLevel(currentLevel);

});


/* =====================================================
   UTILIDADES
   ===================================================== */

function pickRandom(arr) {

    return arr[
        Math.floor(Math.random() * arr.length)
    ];

}


/* =====================================================
   GENERAR OBJETIVOS
   ===================================================== */

function generateCorrectItems(level, count) {

    const items = [];

    const targets =
        level.targets;

    const pools =
        targets.map(t => {

            if (
                !t.validColors ||
                t.validColors.includes('any')
            ) {
                return colorClasses.slice();
            }

            const filtered =
                t.validColors.filter(
                    c => colorClasses.includes(c)
                );

            return filtered.length
                ? filtered
                : colorClasses.slice();

        });


    let remaining = count;

    const allocations =
        new Array(targets.length).fill(0);


    if (count >= targets.length) {

        for (
            let i = 0;
            i < targets.length;
            i++
        ) {
            allocations[i] = 1;
            remaining--;
        }

    }


    while (remaining > 0) {

        const idx =
            Math.floor(
                Math.random() * targets.length
            );

        allocations[idx]++;
        remaining--;

    }


    for (
        let i = 0;
        i < targets.length;
        i++
    ) {

        const t =
            targets[i];

        const pool =
            pools[i];

        for (
            let j = 0;
            j < allocations[i];
            j++
        ) {

            items.push({
                symbol: t.symbol,
                color: pickRandom(pool)
            });

        }

    }

    return items;
}


/* =====================================================
   GENERAR DISTRACTORES
   ===================================================== */

function generateDistractors(level, count) {

    const items = [];

    const targetSymbols =
        new Set(
            level.targets.map(
                t => t.symbol
            )
        );

    const pool =
        distractorPool.filter(
            x => !targetSymbols.has(x)
        );

    const fallback = [
        "❓",
        "🔸",
        "🔹",
        "🔺"
    ];


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const other =
            pool.length
                ? pickRandom(pool)
                : pickRandom(fallback);

        items.push({
            symbol: other,
            color: pickRandom(colorClasses)
        });

    }

    return items;
}


/* =====================================================
   CARGAR NIVEL
   ===================================================== */

function loadLevel(index = 0) {

    currentLevel = index;

    const level =
        levels[currentLevel];


    levelNumEl.textContent =
        (currentLevel + 1) +
        '/' +
        levels.length;


    levelBarFill.style.width =
        (currentLevel / levels.length * 100) +
        '%';


    messageEl.textContent =
        '¡Tú puedes! Encuentra los objetos 🧐';

    messageEl.className = '';

    board.innerHTML = '';


    // Transición de nivel
    gameEl.classList.remove(
        'level-transition'
    );

    void gameEl.offsetHeight;

    gameEl.classList.add(
        'level-transition'
    );


    const correctItems =
        generateCorrectItems(
            level,
            level.count
        );


    const distractors =
        generateDistractors(
            level,
            81 - level.count
        );


    const items =
        correctItems.concat(
            distractors
        );


    items.sort(
        () => Math.random() - 0.5
    );


    remainingTargets =
        items.filter(it => {

            const targetEntry =
                level.targets.find(
                    t => t.symbol === it.symbol
                );

            if (!targetEntry) {
                return false;
            }

            if (
                !targetEntry.validColors ||
                targetEntry.validColors.includes('any')
            ) {
                return true;
            }

            return targetEntry.validColors.includes(
                it.color
            );

        }).length;


    items.forEach((obj, idx) => {

        const el =
            document.createElement('div');


        el.className = 'item';

        el.setAttribute(
            'role',
            'button'
        );

        el.setAttribute(
            'tabindex',
            '0'
        );


        el.dataset.symbol =
            obj.symbol;

        el.dataset.color =
            obj.color;


        el.innerText =
            obj.symbol;


        if (
            obj.color &&
            colorClasses.includes(obj.color)
        ) {
            el.classList.add(
                obj.color
            );
        }


        // Animación escalonada
        el.style.opacity = '0';

        el.style.transform =
            'scale(.7) translateY(10px)';


        setTimeout(() => {

            el.style.transition =
                'all .3s cubic-bezier(.175,.885,.32,1.275)';

            el.style.opacity = '1';

            el.style.transform =
                'scale(1) translateY(0)';

        }, 20 + idx * 8);


        el.addEventListener(
            'click',
            e => handleChoice(el, e)
        );


        el.addEventListener(
            'keydown',
            e => {

                if (
                    e.key === 'Enter' ||
                    e.key === ' '
                ) {

                    e.preventDefault();

                    handleChoice(
                        el,
                        e
                    );

                }

            }
        );


        board.appendChild(el);

    });


    updateStatus();
    updateNavButtons();

}


/* =====================================================
   MANEJAR ELECCIÓN
   ===================================================== */

function handleChoice(el, e) {

    if (
        el.classList.contains('hidden')
    ) {
        return;
    }


    crearRipple(el, e);


    const level =
        levels[currentLevel];


    const symbol =
        String(
            el.dataset.symbol || ''
        ).trim();


    const color =
        String(
            el.dataset.color || ''
        ).trim();


    const targetEntry =
        level.targets.find(
            t => t.symbol === symbol
        );


    const isTarget =
        !!targetEntry;


    const colorOk =
        !targetEntry
            ? false
            : (
                !targetEntry.validColors ||
                targetEntry.validColors.includes('any')
            )
                ? true
                : targetEntry.validColors.includes(color);


    /* ===== RESPUESTA CORRECTA ===== */

    if (isTarget && colorOk) {

        el.classList.add('hidden');

        remainingTargets--;

        score++;

        scoreEl.textContent =
            score;


        // Confetti
        const rect =
            el.getBoundingClientRect();


        crearConfetti(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            15
        );


        // Animar puntuación
        const scorePill =
            document.querySelector(
                '.pill.score'
            );


        scorePill.style.transform =
            'scale(1.2)';


        setTimeout(() => {

            scorePill.style.transform =
                '';

        }, 200);


        updateStatus();


        messageEl.textContent =
            pickRandom(correctMsgs);

        messageEl.className =
            'ok';


        /* ===== NIVEL COMPLETADO ===== */

        if (remainingTargets <= 0) {

            messageEl.textContent =
                pickRandom(levelUpMsgs);

            messageEl.className =
                'ok';


            levelBarFill.style.width =
                (
                    (currentLevel + 1) /
                    levels.length *
                    100
                ) + '%';


            setTimeout(() => {

                if (
                    currentLevel >=
                    levels.length - 1
                ) {

                    showWin();

                } else {

                    currentLevel++;

                    loadLevel(
                        currentLevel
                    );

                }

            }, 1300);

        }

    }

    /* ===== RESPUESTA INCORRECTA ===== */

    else {

        messageEl.textContent =
            pickRandom(wrongMsgs);

        messageEl.className =
            'err';


        el.classList.add(
            'wrong'
        );


        setTimeout(() => {

            el.classList.remove(
                'wrong'
            );

        }, 450);

    }

}


/* =====================================================
   ACTUALIZAR ESTADO
   ===================================================== */

function updateStatus() {

    const level =
        levels[currentLevel];


    titleEl.innerHTML = `
        Toca solo <span>${level.label}</span>
        <small>
            Quedan: ${remainingTargets} por encontrar
        </small>
    `;

}


/* =====================================================
   BOTONES DE NAVEGACIÓN
   ===================================================== */

function updateNavButtons() {

    btnNext.innerHTML =
        currentLevel >= levels.length - 1
            ? 'Finalizar 🏁'
            : 'Saltar ➡';


    if (currentLevel === 0) {

        btnPrev.classList.add(
            'disabled'
        );

    } else {

        btnPrev.classList.remove(
            'disabled'
        );

    }

}


/* =====================================================
   PANTALLA FINAL
   ===================================================== */

function showWin() {

    // Confetti masivo
    for (let i = 0; i < 8; i++) {

        setTimeout(() => {

            crearConfetti(
                80 +
                    Math.random() *
                    (window.innerWidth - 160),

                40 +
                    Math.random() *
                    (window.innerHeight * .4),

                30
            );

        }, i * 200);

    }


    gameEl.innerHTML = `

        <div class="win-screen">

            <div class="icon">
                🏆
            </div>

            <h1>
                ¡Felicidades!
            </h1>

            <h2>
                Completaste los
                ${levels.length}
                niveles
            </h2>

            <div class="final-score">

                <span
                    style="
                        font-size:16px;
                        color:rgba(200,200,255,.7);
                        font-weight:700;
                    "
                >
                    PUNTUACIÓN FINAL
                </span>

                <span>
                    ${score}
                </span>

            </div>

            <br>

            <button
                onclick="location.reload()"
            >
                Jugar de nuevo 🔄
            </button>

        </div>

    `;

}


/* =====================================================
   INICIAR JUEGO
   ===================================================== */

loadLevel(0);