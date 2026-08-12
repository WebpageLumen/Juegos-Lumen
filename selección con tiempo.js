'use strict';

/* =========================================================
   CONFIGURACIÓN DE NIVELES
========================================================= */

const LEVELS = [
    {
        id: 1,
        name: 'Principiante',
        icon: '🐸',
        duration: 30,
        targetCount: 20,
        distractors: 6,
        figureSize: 78,
        minDistance: 100,
        lifetime: 5000,
        simultaneousTargets: 1,
        animations: ['float', 'sway', 'bounce'],
        speed: 1.0
    },

    {
        id: 2,
        name: 'Explorador',
        icon: '🦋',
        duration: 60,
        targetCount: 30,
        distractors: 9,
        figureSize: 68,
        minDistance: 88,
        lifetime: 4500,
        simultaneousTargets: 2,
        animations: ['float', 'sway', 'bounce', 'wave'],
        speed: 1.15
    },

    {
        id: 3,
        name: 'Aventurero',
        icon: '🌟',
        duration: 75,
        targetCount: 40,
        distractors: 12,
        figureSize: 60,
        minDistance: 76,
        lifetime: 4000,
        simultaneousTargets: 3,
        animations: ['float', 'sway', 'bounce', 'wave', 'spin'],
        speed: 1.3
    },

    {
        id: 4,
        name: 'Maestro',
        icon: '🏆',
        duration: 90,
        targetCount: 50,
        distractors: 15,
        figureSize: 54,
        minDistance: 68,
        lifetime: 3500,
        simultaneousTargets: 4,
        animations: ['float', 'sway', 'bounce', 'wave', 'spin', 'orbit'],
        speed: 1.5
    }
];


/* =========================================================
   FIGURAS
========================================================= */

const FIGURES = [
    {
        emoji: '🐸',
        name: 'Rana',
        similars: ['🐢', '🦎', '🐍', '🦗']
    },

    {
        emoji: '🦋',
        name: 'Mariposa',
        similars: ['🐝', '🐛', '🦟', '🪲']
    },

    {
        emoji: '🌟',
        name: 'Estrella',
        similars: ['⭐', '✨', '💫', '🌠']
    },

    {
        emoji: '🎈',
        name: 'Globo',
        similars: ['🔴', '🟡', '🟢', '🔵']
    },

    {
        emoji: '🍓',
        name: 'Fresa',
        similars: ['🍎', '🍒', '🍅', '🫐']
    },

    {
        emoji: '🌸',
        name: 'Flor',
        similars: ['🌺', '🌷', '🌼', '🌻']
    },

    {
        emoji: '🐠',
        name: 'Pez',
        similars: ['🐟', '🐡', '🦈', '🐙']
    },

    {
        emoji: '🦉',
        name: 'Búho',
        similars: ['🐦', '🦅', '🐤', '🦆']
    },

    {
        emoji: '🍦',
        name: 'Helado',
        similars: ['🍰', '🧁', '🍪', '🍩']
    },

    {
        emoji: '🚗',
        name: 'Auto',
        similars: ['🚕', '🚙', '🚌', '🚎']
    }
];


const GENERIC_DISTRACTORS = [
    '☁️', '🌈', '🍀', '🎨', '🎵', '💧',
    '🌙', '❄️', '🔥', '🍃', '🦄', '🐰',
    '🐱', '🐶', '🦊', '🐻', '🐼', '🐨',
    '🦁', '🐮', '🐷', '🐔', '🐧', '🦒',
    '🐘', '🦓', '🌵', '🌴', '🌻', '🌺',
    '⭐', '✨', '💫', '🌟', '🍭', '🎮',
    '🪁', '🎈', '🎀', '🎁'
];


const MOTIVATIONAL_MESSAGES = [
    '¡Excelente!',
    '¡Muy bien!',
    '¡Fantástico!',
    '¡Increíble!',
    '¡Sigue así!',
    '¡Genial!',
    '¡Brillante!',
    '¡Maravilloso!',
    '¡Perfecto!',
    '¡Lo lograste!'
];


/* =========================================================
   ESTADO DEL JUEGO
========================================================= */

const Game = {
    unlockedLevels: 1,
    records: {},
    settings: {
        sound: true,
        music: true
    },
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

        Game.unlockedLevels =
            data.unlockedLevels || 1;

        Game.records =
            data.records || {};

        Game.settings = {
            ...Game.settings,
            ...(data.settings || {})
        };
    }

} catch (e) {
    console.warn('No se pudo cargar el progreso guardado.');
}


function saveState() {

    try {

        localStorage.setItem(
            'busca_encuentra_save',

            JSON.stringify({
                unlockedLevels: Game.unlockedLevels,
                records: Game.records,
                settings: Game.settings
            })
        );

    } catch (e) {
        console.warn('No se pudo guardar el progreso.');
    }
}


/* =========================================================
   UTILIDADES
========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);

const randInt = (min, max) =>
    Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

const randChoice = (array) =>
    array[
        Math.floor(Math.random() * array.length)
    ];

const clamp = (value, min, max) =>
    Math.min(max, Math.max(min, value));


/* =========================================================
   PANTALLAS
========================================================= */

function showScreen(name) {

    $$('.screen').forEach(screen => {
        screen.classList.remove('is-active');
    });

    const target =
        $('#screen-' + name);

    if (target) {

        target.classList.add('is-active');

        Game.currentScreen = name;
    }
}


/* =========================================================
   TOAST
========================================================= */

function showToast(
    message,
    type = 'success'
) {

    const container =
        $('#toast-container');

    const toast =
        document.createElement('div');

    toast.className =
        'toast toast--' + type;

    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 1800);
}


/* =========================================================
   AUDIO
========================================================= */

const Audio = {

    ctx: null,
    musicTimer: null,

    init() {

        if (this.ctx) return;

        try {

            const AC =
                window.AudioContext ||
                window.webkitAudioContext;

            this.ctx = new AC();

        } catch (e) {
            console.warn('Audio no disponible.');
        }
    },

    resume() {

        if (
            this.ctx &&
            this.ctx.state === 'suspended'
        ) {
            this.ctx.resume();
        }
    },

    playTone(
        freq,
        duration = 0.15,
        type = 'sine',
        volume = 0.12,
        when = 0
    ) {

        if (
            !Game.settings.sound ||
            !this.ctx
        ) {
            return;
        }

        const t =
            this.ctx.currentTime + when;

        const osc =
            this.ctx.createOscillator();

        const gain =
            this.ctx.createGain();

        osc.type = type;

        osc.frequency.value = freq;

        gain.gain.setValueAtTime(
            0,
            t
        );

        gain.gain.linearRampToValueAtTime(
            volume,
            t + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            t + duration
        );

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);

        osc.stop(
            t + duration + 0.05
        );
    },

    success() {

        if (!Game.settings.sound) return;

        [
            523.25,
            659.25,
            783.99,
            1046.5
        ].forEach((frequency, index) => {

            this.playTone(
                frequency,
                0.22,
                'sine',
                0.11,
                index * 0.07
            );
        });
    },

    error() {

        if (!Game.settings.sound) return;

        [
            392,
            311.13
        ].forEach((frequency, index) => {

            this.playTone(
                frequency,
                0.18,
                'sine',
                0.09,
                index * 0.08
            );
        });
    },

    click() {

        this.playTone(
            880,
            0.06,
            'sine',
            0.07
        );
    },

    victory() {

        if (!Game.settings.sound) return;

        [
            523.25,
            659.25,
            783.99,
            1046.5,
            783.99,
            1046.5
        ].forEach((frequency, index) => {

            this.playTone(
                frequency,
                0.3,
                'sine',
                0.13,
                index * 0.14
            );
        });
    },

    levelUp() {

        if (!Game.settings.sound) return;

        [
            659.25,
            783.99,
            1046.5
        ].forEach((frequency, index) => {

            this.playTone(
                frequency,
                0.25,
                'triangle',
                0.1,
                index * 0.1
            );
        });
    },

    startMusic() {

        this.stopMusic();

        if (
            !Game.settings.music ||
            !this.ctx
        ) {
            return;
        }

        const notes = [
            392,
            440,
            523.25,
            587.33,
            523.25,
            440,
            392,
            349.23
        ];

        let i = 0;

        const playNext = () => {

            if (
                !Game.settings.music ||
                !this.ctx
            ) {
                return;
            }

            const frequency =
                notes[i % notes.length];

            const t =
                this.ctx.currentTime;

            const osc =
                this.ctx.createOscillator();

            const gain =
                this.ctx.createGain();

            osc.type = 'sine';

            osc.frequency.value =
                frequency / 2;

            gain.gain.setValueAtTime(
                0,
                t
            );

            gain.gain.linearRampToValueAtTime(
                0.04,
                t + 0.3
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                t + 1.6
            );

            osc.connect(gain);

            gain.connect(
                this.ctx.destination
            );

            osc.start(t);

            osc.stop(t + 1.7);

            i++;
        };

        playNext();

        this.musicTimer =
            setInterval(
                playNext,
                1800
            );
    },

    stopMusic() {

        if (this.musicTimer) {

            clearInterval(
                this.musicTimer
            );

            this.musicTimer = null;
        }
    }
};


/* =========================================================
   FONDO
========================================================= */

const Background = {

    canvas: null,
    ctx: null,

    bubbles: [],
    shapes: [],
    sparkles: [],

    init() {

        this.canvas =
            $('#bg-canvas');

        this.ctx =
            this.canvas.getContext('2d');

        this.resize();

        window.addEventListener(
            'resize',
            () => this.resize()
        );

        this.create();

        this.animate();
    },

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;
    },

    randomPastel() {

        const colors = [
            [191, 227, 245],
            [220, 208, 242],
            [251, 232, 169],
            [156, 206, 242],
            [158, 217, 176]
        ];

        return randChoice(colors);
    },

    create() {

        this.bubbles = [];
        this.shapes = [];
        this.sparkles = [];

        for (let i = 0; i < 7; i++) {

            this.shapes.push({

                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                r:
                    120 +
                    Math.random() * 180,

                vx:
                    (Math.random() - 0.5) *
                    0.12,

                vy:
                    (Math.random() - 0.5) *
                    0.12,

                opacity:
                    0.12 +
                    Math.random() * 0.08,

                color:
                    this.randomPastel()
            });
        }

        for (let i = 0; i < 22; i++) {

            this.bubbles.push({

                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                r:
                    24 +
                    Math.random() * 50,

                vy:
                    -0.15 -
                    Math.random() * 0.3,

                vx:
                    (Math.random() - 0.5) *
                    0.15,

                opacity:
                    0.15 +
                    Math.random() * 0.2,

                color:
                    this.randomPastel(),

                phase:
                    Math.random() *
                    Math.PI *
                    2
            });
        }

        for (let i = 0; i < 30; i++) {

            this.sparkles.push({

                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                size:
                    1.5 +
                    Math.random() * 2.5,

                phase:
                    Math.random() *
                    Math.PI *
                    2,

                speed:
                    0.02 +
                    Math.random() * 0.03,

                opacity:
                    0.4 +
                    Math.random() * 0.4
            });
        }
    },

    animate() {

        const ctx = this.ctx;

        const w =
            this.canvas.width;

        const h =
            this.canvas.height;

        ctx.clearRect(
            0,
            0,
            w,
            h
        );

        this.shapes.forEach(shape => {

            shape.x += shape.vx;
            shape.y += shape.vy;

            if (shape.x < -shape.r) {
                shape.x = w + shape.r;
            }

            if (shape.x > w + shape.r) {
                shape.x = -shape.r;
            }

            if (shape.y < -shape.r) {
                shape.y = h + shape.r;
            }

            if (shape.y > h + shape.r) {
                shape.y = -shape.r;
            }

            const [r, g, b] =
                shape.color;

            const gradient =
                ctx.createRadialGradient(
                    shape.x,
                    shape.y,
                    0,
                    shape.x,
                    shape.y,
                    Math.max(1, shape.r)
                );

            gradient.addColorStop(
                0,
                `rgba(${r},${g},${b},${shape.opacity})`
            );

            gradient.addColorStop(
                1,
                `rgba(${r},${g},${b},0)`
            );

            ctx.fillStyle = gradient;

            ctx.beginPath();

            ctx.arc(
                shape.x,
                shape.y,
                Math.max(1, shape.r),
                0,
                Math.PI * 2
            );

            ctx.fill();
        });

        const time =
            Date.now() * 0.001;

        this.bubbles.forEach(bubble => {

            bubble.x +=
                bubble.vx +
                Math.sin(
                    time + bubble.phase
                ) * 0.15;

            bubble.y += bubble.vy;

            if (bubble.y < -bubble.r) {

                bubble.y =
                    h + bubble.r;

                bubble.x =
                    Math.random() * w;
            }

            if (bubble.x < -bubble.r) {
                bubble.x = w + bubble.r;
            }

            if (bubble.x > w + bubble.r) {
                bubble.x = -bubble.r;
            }

            const [r, g, b] =
                bubble.color;

            const gradient =
                ctx.createRadialGradient(
                    bubble.x,
                    bubble.y,
                    0,
                    bubble.x,
                    bubble.y,
                    Math.max(1, bubble.r)
                );

            gradient.addColorStop(
                0,
                `rgba(${r},${g},${b},${bubble.opacity * 1.5})`
            );

            gradient.addColorStop(
                0.6,
                `rgba(${r},${g},${b},${bubble.opacity * 0.6})`
            );

            gradient.addColorStop(
                1,
                `rgba(${r},${g},${b},0)`
            );

            ctx.fillStyle = gradient;

            ctx.beginPath();

            ctx.arc(
                bubble.x,
                bubble.y,
                Math.max(1, bubble.r),
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.fillStyle =
                `rgba(255,255,255,${bubble.opacity * 0.5})`;

            ctx.beginPath();

            ctx.arc(
                bubble.x - bubble.r * 0.3,
                bubble.y - bubble.r * 0.3,
                Math.max(
                    1,
                    bubble.r * 0.2
                ),
                0,
                Math.PI * 2
            );

            ctx.fill();
        });

        this.sparkles.forEach(sparkle => {

            sparkle.phase +=
                sparkle.speed;

            const twinkle =
                (Math.sin(sparkle.phase) + 1) *
                0.5;

            ctx.save();

            ctx.globalAlpha =
                sparkle.opacity *
                twinkle;

            ctx.fillStyle =
                '#FFFFFF';

            ctx.shadowColor =
                'rgba(156, 206, 242, 0.8)';

            ctx.shadowBlur = 8;

            ctx.beginPath();

            ctx.arc(
                sparkle.x,
                sparkle.y,
                Math.max(
                    0.5,
                    sparkle.size
                ),
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();
        });

        requestAnimationFrame(
            () => this.animate()
        );
    }
};


/* =========================================================
   PARTÍCULAS
========================================================= */

const Particles = {

    canvas: null,
    ctx: null,
    list: [],

    init() {

        this.canvas =
            $('#particles-canvas');

        this.ctx =
            this.canvas.getContext('2d');

        this.resize();

        window.addEventListener(
            'resize',
            () => this.resize()
        );

        this.animate();
    },

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;
    },

    burst(
        x,
        y,
        type = 'success'
    ) {

        const count =
            type === 'success'
                ? 28
                : 14;

        const colors =
            type === 'success'
                ? [
                    '#9ED9B0',
                    '#FBE8A9',
                    '#BFE3F5',
                    '#DCD0F2',
                    '#9CCEF2',
                    '#F8C8DC'
                ]
                : [
                    '#F2A6A6',
                    '#F5C99B',
                    '#E8B6B6'
                ];

        for (let i = 0; i < count; i++) {

            const angle =
                (Math.PI * 2 * i) /
                count +
                (Math.random() - 0.5) *
                0.5;

            const speed =
                2.5 +
                Math.random() * 5;

            this.list.push({

                x,
                y,

                vx:
                    Math.cos(angle) *
                    speed,

                vy:
                    Math.sin(angle) *
                    speed -
                    1.5,

                life: 1,

                decay:
                    0.012 +
                    Math.random() * 0.015,

                size:
                    4 +
                    Math.random() * 7,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ],

                type:
                    type === 'success' &&
                    Math.random() < 0.35
                        ? 'star'
                        : 'circle',

                rotation:
                    Math.random() *
                    Math.PI *
                    2,

                rotationSpeed:
                    (Math.random() - 0.5) *
                    0.3,

                gravity: 0.12
            });
        }
    },

    drawStar(
        cx,
        cy,
        size
    ) {

        const ctx = this.ctx;

        const spikes = 5;

        const outer =
            Math.max(1, size);

        const inner =
            outer * 0.4;

        ctx.beginPath();

        for (
            let i = 0;
            i < spikes * 2;
            i++
        ) {

            const r =
                i % 2 === 0
                    ? outer
                    : inner;

            const angle =
                (i * Math.PI) /
                spikes -
                Math.PI / 2;

            const x =
                cx +
                Math.cos(angle) *
                r;

            const y =
                cy +
                Math.sin(angle) *
                r;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.closePath();

        ctx.fill();
    },

    animate() {

        const ctx = this.ctx;

        ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.list =
            this.list.filter(particle => {

                particle.x +=
                    particle.vx;

                particle.y +=
                    particle.vy;

                particle.vy +=
                    particle.gravity;

                particle.vx *= 0.99;

                particle.life -=
                    particle.decay;

                particle.rotation +=
                    particle.rotationSpeed;

                if (particle.life <= 0) {
                    return false;
                }

                ctx.save();

                ctx.translate(
                    particle.x,
                    particle.y
                );

                ctx.rotate(
                    particle.rotation
                );

                ctx.globalAlpha =
                    Math.min(
                        1,
                        particle.life
                    );

                ctx.fillStyle =
                    particle.color;

                if (
                    particle.type ===
                    'star'
                ) {

                    this.drawStar(
                        0,
                        0,
                        particle.size
                    );

                } else {

                    ctx.beginPath();

                    ctx.arc(
                        0,
                        0,
                        Math.max(
                            0.5,
                            particle.size
                        ),
                        0,
                        Math.PI * 2
                    );

                    ctx.fill();
                }

                ctx.restore();

                return true;
            });

        requestAnimationFrame(
            () => this.animate()
        );
    }
};


/* =========================================================
   SISTEMA DE FIGURAS
========================================================= */

const FigureSystem = {

    findFreePosition(
        size,
        minDistance,
        existing
    ) {

        const area =
            $('#game-area');

        const rect =
            area.getBoundingClientRect();

        const padding =
            size / 2 + 8;

        const maxX =
            rect.width - padding;

        const maxY =
            rect.height - padding;

        const minX =
            padding;

        const minY =
            padding;

        if (
            maxX <= minX ||
            maxY <= minY
        ) {

            return {
                x: rect.width / 2,
                y: rect.height / 2
            };
        }

        for (
            let attempt = 0;
            attempt < 80;
            attempt++
        ) {

            const x =
                minX +
                Math.random() *
                (maxX - minX);

            const y =
                minY +
                Math.random() *
                (maxY - minY);

            let collides = false;

            for (const figure of existing) {

                const dx =
                    figure.x - x;

                const dy =
                    figure.y - y;

                if (
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    ) < minDistance
                ) {

                    collides = true;
                    break;
                }
            }

            if (!collides) {
                return { x, y };
            }
        }

        return {

            x:
                minX +
                Math.random() *
                (maxX - minX),

            y:
                minY +
                Math.random() *
                (maxY - minY)
        };
    },

    create(
        emoji,
        isTarget,
        level,
        existing
    ) {

        const size =
            level.figureSize;

        const position =
            this.findFreePosition(
                size,
                level.minDistance,
                existing
            );

        const wrapper =
            document.createElement('div');

        wrapper.className =
            'figure is-appearing';

        wrapper.style.width =
            size + 'px';

        wrapper.style.height =
            size + 'px';

        wrapper.style.left =
            (position.x - size / 2) +
            'px';

        wrapper.style.top =
            (position.y - size / 2) +
            'px';

        const animClass =
            'anim-' +
            randChoice(
                level.animations
            );

        wrapper.classList.add(
            animClass
        );

        const inner =
            document.createElement('div');

        inner.className =
            'figure-inner';

        inner.style.fontSize =
            size * 0.7 + 'px';

        inner.textContent =
            emoji;

        wrapper.appendChild(inner);

        const figure = {

            el: wrapper,

            inner,

            x: position.x,
            y: position.y,

            emoji,

            isTarget,

            bornAt:
                performance.now(),

            lifetime:
                level.lifetime +
                (Math.random() - 0.5) *
                600,

            animClass,

            size
        };

        const handleTap = event => {

            event.preventDefault();
            event.stopPropagation();

            if (
                Game.session &&
                !Game.session.paused &&
                !Game.session.ending
            ) {

                if (figure.isTarget) {

                    GameSession.onTargetHit(
                        figure
                    );

                } else {

                    GameSession.onDistractorHit(
                        figure
                    );
                }
            }
        };

        wrapper.addEventListener(
            'click',
            handleTap
        );

        wrapper.addEventListener(
            'touchstart',
            handleTap,
            {
                passive: false
            }
        );

        $('#game-area')
            .appendChild(wrapper);

        existing.push(figure);

        setTimeout(() => {

            if (wrapper.parentNode) {

                wrapper.classList.remove(
                    'is-appearing'
                );
            }

        }, 500);

        return figure;
    },

    removeAsCorrect(
        figure,
        list
    ) {

        figure.el.classList.add(
            'is-correct'
        );

        setTimeout(() => {

            if (figure.el.parentNode) {
                figure.el.remove();
            }

        }, 500);

        const index =
            list.indexOf(figure);

        if (index > -1) {
            list.splice(index, 1);
        }
    },

    removeAsWrong(
        figure,
        list
    ) {

        figure.el.classList.add(
            'is-wrong'
        );

        setTimeout(() => {

            if (figure.el.parentNode) {
                figure.el.remove();
            }

        }, 500);

        const index =
            list.indexOf(figure);

        if (index > -1) {
            list.splice(index, 1);
        }
    },

    clearAll(list) {

        list.forEach(figure => {

            if (figure.el.parentNode) {
                figure.el.remove();
            }
        });

        list.length = 0;
    }
};


/* =========================================================
   SESIÓN DEL JUEGO
========================================================= */

const GameSession = {

    start(levelId) {

        const level =
            LEVELS.find(
                level => level.id === levelId
            );

        if (!level) return;

        const targetFigure =
            randChoice(FIGURES);

        const distractorPool = [];

        targetFigure.similars.forEach(
            emoji => {
                distractorPool.push(emoji);
            }
        );

        GENERIC_DISTRACTORS.forEach(
            emoji => {
                distractorPool.push(emoji);
            }
        );

        FIGURES.forEach(figure => {

            if (
                figure.emoji !==
                targetFigure.emoji
            ) {

                distractorPool.push(
                    figure.emoji
                );
            }
        });

        Game.session = {

            level,

            targetFigure,

            distractorPool,

            figures: [],

            targetAppeared: 0,

            targetFound: 0,

            targetRequired:
                level.targetCount,

            errors: 0,

            score: 0,

            startTimestamp: 0,

            pausedAt: 0,

            pausedDuration: 0,

            timeLeft:
                level.duration,

            paused: false,

            active: true,

            ending: false,

            rafId: null
        };

        $('#hud-target').textContent =
            targetFigure.emoji;

        $('#hud-level').textContent =
            level.id;

        $('#hud-time').textContent =
            level.duration + 's';

        $('#hud-score').textContent =
            '0';

        $('#hud-found').textContent =
            '0/' + level.targetCount;

        $('#hud-errors').textContent =
            '0';

        $('#hud-progress-fill')
            .style.width = '0%';

        $('#game-area').innerHTML = '';

        showScreen('game');

        Game.session.startTimestamp =
            performance.now();

        this.loop(
            Game.session.startTimestamp
        );
    },

    loop(timestamp) {

        const session =
            Game.session;

        if (
            !session ||
            !session.active
        ) {
            return;
        }

        if (!session.paused) {

            const elapsed =
                (
                    timestamp -
                    session.startTimestamp -
                    session.pausedDuration
                ) / 1000;

            session.timeLeft =
                Math.max(
                    0,
                    session.level.duration -
                    elapsed
                );

            this.maintainFigures(
                timestamp
            );

            this.removeExpired(
                timestamp
            );

            this.updateHUD();

            if (
                session.timeLeft <= 0 &&
                !session.ending
            ) {

                session.ending = true;

                this.end();

                return;
            }

            if (
                session.targetFound >=
                session.targetRequired &&
                !session.ending
            ) {

                session.ending = true;

                this.end();

                return;
            }
        }

        session.rafId =
            requestAnimationFrame(
                timestamp =>
                    this.loop(timestamp)
            );
    },

    maintainFigures(timestamp) {

        const session =
            Game.session;

        const level =
            session.level;

        let activeTargets = 0;

        let activeDistractors = 0;

        session.figures.forEach(
            figure => {

                if (figure.isTarget) {
                    activeTargets++;
                } else {
                    activeDistractors++;
                }
            }
        );

        while (
            activeTargets <
                level.simultaneousTargets &&
            session.targetAppeared <
                session.targetRequired
        ) {

            const figure =
                FigureSystem.create(
                    session.targetFigure.emoji,
                    true,
                    level,
                    session.figures
                );

            if (figure) {

                session.targetAppeared++;

                activeTargets++;

            } else {
                break;
            }
        }

        while (
            activeDistractors <
            level.distractors
        ) {

            const emoji =
                randChoice(
                    session.distractorPool
                );

            const figure =
                FigureSystem.create(
                    emoji,
                    false,
                    level,
                    session.figures
                );

            if (figure) {

                activeDistractors++;

            } else {
                break;
            }
        }
    },

    removeExpired(timestamp) {

        const session =
            Game.session;

        const expired = [];

        session.figures.forEach(
            figure => {

                if (
                    timestamp -
                    figure.bornAt >
                    figure.lifetime
                ) {

                    expired.push(
                        figure
                    );
                }
            }
        );

        expired.forEach(figure => {

            figure.el.classList.add(
                'is-disappearing'
            );

            setTimeout(() => {

                if (figure.el.parentNode) {
                    figure.el.remove();
                }

            }, 400);

            const index =
                session.figures.indexOf(
                    figure
                );

            if (index > -1) {

                session.figures.splice(
                    index,
                    1
                );
            }

            /*
             * Si expira un objetivo,
             * permitimos que vuelva a aparecer.
             */

            if (
                figure.isTarget &&
                session.targetAppeared > 0
            ) {

                session.targetAppeared--;
            }
        });
    },

    onTargetHit(figure) {

        const session =
            Game.session;

        if (
            !session ||
            session.ending
        ) {
            return;
        }

        session.targetFound++;

        session.score += 10;

        const rect =
            figure.el.getBoundingClientRect();

        Particles.burst(
            rect.left +
                rect.width / 2,

            rect.top +
                rect.height / 2,

            'success'
        );

        FigureSystem.removeAsCorrect(
            figure,
            session.figures
        );

        Audio.success();

        if (
            Math.random() < 0.18
        ) {

            showToast(
                randChoice(
                    MOTIVATIONAL_MESSAGES
                ),
                'success'
            );
        }

        this.updateHUD();
    },

    onDistractorHit(figure) {

        const session =
            Game.session;

        if (
            !session ||
            session.ending
        ) {
            return;
        }

        session.errors++;

        session.score =
            Math.max(
                0,
                session.score - 3
            );

        const rect =
            figure.el.getBoundingClientRect();

        Particles.burst(
            rect.left +
                rect.width / 2,

            rect.top +
                rect.height / 2,

            'error'
        );

        FigureSystem.removeAsWrong(
            figure,
            session.figures
        );

        Audio.error();

        $('#app').classList.add(
            'shake-screen'
        );

        setTimeout(() => {

            $('#app').classList.remove(
                'shake-screen'
            );

        }, 400);

        showToast(
            '¡Inténtalo otra vez!',
            'error'
        );

        this.updateHUD();
    },

    updateHUD() {

        const session =
            Game.session;

        if (!session) return;

        $('#hud-time').textContent =
            Math.ceil(
                session.timeLeft
            ) + 's';

        $('#hud-score').textContent =
            session.score;

        $('#hud-found').textContent =
            session.targetFound +
            '/' +
            session.targetRequired;

        $('#hud-errors').textContent =
            session.errors;

        $('#hud-progress-fill')
            .style.width =
                (
                    session.targetFound /
                    session.targetRequired
                ) * 100 + '%';
    },

    pause() {

        const session =
            Game.session;

        if (
            !session ||
            !session.active ||
            session.paused
        ) {
            return;
        }

        session.paused = true;

        session.pausedAt =
            performance.now();

        showScreen('pause');
    },

    resume() {

        const session =
            Game.session;

        if (
            !session ||
            !session.active ||
            !session.paused
        ) {
            return;
        }

        session.paused = false;

        session.pausedDuration +=
            performance.now() -
            session.pausedAt;

        showScreen('game');

        session.rafId =
            requestAnimationFrame(
                timestamp =>
                    this.loop(timestamp)
            );
    },

    end() {

        const session =
            Game.session;

        if (!session) return;

        session.active = false;

        cancelAnimationFrame(
            session.rafId
        );

        setTimeout(() => {

            FigureSystem.clearAll(
                session.figures
            );

        }, 100);

        const success =
            session.targetFound >=
            session.targetRequired;

        if (success) {

            let stars = 1;

            if (session.errors <= 5) {
                stars = 2;
            }

            if (session.errors <= 2) {
                stars = 3;
            }

            const previousRecord =
                Game.records[
                    session.level.id
                ] || {
                    stars: 0,
                    score: 0,
                    errors: 999
                };

            Game.records[
                session.level.id
            ] = {

                stars:
                    Math.max(
                        previousRecord.stars,
                        stars
                    ),

                score:
                    Math.max(
                        previousRecord.score,
                        session.score
                    ),

                errors:
                    Math.min(
                        previousRecord.errors,
                        session.errors
                    )
            };

            if (
                session.level.id ===
                    Game.unlockedLevels &&
                session.level.id <
                    LEVELS.length
            ) {

                Game.unlockedLevels =
                    session.level.id + 1;
            }

            saveState();

            $('#complete-found')
                .textContent =
                session.targetFound +
                '/' +
                session.targetRequired;

            $('#complete-errors')
                .textContent =
                session.errors;

            $('#complete-score')
                .textContent =
                session.score;

            $$('#complete-stars .star')
                .forEach(
                    (element, index) => {

                        element.classList.toggle(
                            'is-active',
                            index < stars
                        );
                    }
                );

            $('#complete-title')
                .textContent =
                randChoice(
                    MOTIVATIONAL_MESSAGES
                );

            const nextButton =
                $('#btn-next');

            if (
                session.level.id <
                LEVELS.length
            ) {

                nextButton.textContent =
                    'Siguiente Nivel';

                nextButton.dataset.action =
                    'next-level';

            } else {

                nextButton.textContent =
                    'Ver Trofeo';

                nextButton.dataset.action =
                    'go-victory';
            }

            Audio.levelUp();

            setTimeout(() => {

                showScreen('complete');

            }, 600);

        } else {

            $('#defeat-found')
                .textContent =
                session.targetFound +
                '/' +
                session.targetRequired;

            setTimeout(() => {

                showScreen('defeat');

            }, 400);
        }
    },

    restart() {

        if (!Game.session) {
            return;
        }

        this.start(
            Game.session.level.id
        );
    },

    nextLevel() {

        if (!Game.session) {
            return;
        }

        const nextId =
            Game.session.level.id + 1;

        if (
            nextId <= LEVELS.length
        ) {

            this.start(nextId);

        } else {

            this.showVictory();
        }
    },

    showVictory() {

        let totalStars = 0;

        let totalScore = 0;

        Object.values(
            Game.records
        ).forEach(record => {

            totalStars +=
                record.stars;

            totalScore +=
                record.score;
        });

        $('#victory-stars')
            .textContent =
            totalStars;

        $('#victory-score')
            .textContent =
            totalScore;

        Audio.victory();

        showScreen('victory');
    }
};


/* =========================================================
   SELECTOR DE NIVELES
========================================================= */

function buildLevelSelect() {

    const grid =
        $('#levels-grid');

    grid.innerHTML = '';

    LEVELS.forEach(level => {

        const card =
            document.createElement('div');

        const isLocked =
            level.id >
            Game.unlockedLevels;

        card.className =
            'level-card' +
            (
                isLocked
                    ? ' is-locked'
                    : ''
            );

        const record =
            Game.records[level.id];

        const stars =
            record
                ? record.stars
                : 0;

        let starsHTML = '';

        for (
            let i = 0;
            i < 3;
            i++
        ) {

            starsHTML +=
                i < stars

                    ? '<span class="star-active">⭐</span>'

                    : '<span style="opacity:0.3">⭐</span>';
        }

        card.innerHTML = `
            <div class="level-number">
                Nivel ${level.id}
            </div>

            <div class="level-icon">
                ${level.icon}
            </div>

            <div class="level-name">
                ${level.name}
            </div>

            <div class="level-stars">
                ${starsHTML}
            </div>
        `;

        if (!isLocked) {

            card.addEventListener(
                'click',
                () => {

                    Audio.click();

                    GameSession.start(
                        level.id
                    );
                }
            );
        }

        grid.appendChild(card);
    });
}


/* =========================================================
   ESTADÍSTICAS DEL MENÚ
========================================================= */

function updateMainMenuStats() {

    let totalStars = 0;

    let totalScore = 0;

    let totalTrophies = 0;

    Object.values(
        Game.records
    ).forEach(record => {

        totalStars +=
            record.stars;

        totalScore +=
            record.score;
    });

    if (
        Game.unlockedLevels >=
        LEVELS.length
    ) {

        const allThreeStars =
            LEVELS.every(level =>
                Game.records[level.id] &&
                Game.records[level.id].stars === 3
            );

        if (allThreeStars) {
            totalTrophies = 1;
        }
    }

    $('#stat-total-stars')
        .textContent =
        totalStars;

    $('#stat-total-trophies')
        .textContent =
        totalTrophies;

    $('#stat-total-score')
        .textContent =
        totalScore;

    $('#btn-sound').innerHTML =
        Game.settings.sound
            ? '🔊 Sonido'
            : '🔇 Sonido';

    $('#btn-music').innerHTML =
        Game.settings.music
            ? '🎵 Música'
            : '🔕 Música';
}


/* =========================================================
   ACCIONES
========================================================= */

document.body.addEventListener(
    'click',
    event => {

        let target =
            event.target;

        while (
            target &&
            target !== document.body
        ) {

            if (
                target.dataset.action
            ) {

                handleAction(
                    target.dataset.action
                );

                break;
            }

            target =
                target.parentElement;
        }
    }
);


function handleAction(action) {

    if (!Audio.ctx) {

        Audio.init();

        Audio.resume();

        if (Game.settings.music) {
            Audio.startMusic();
        }
    }

    switch (action) {

        case 'go-menu':

            Audio.click();

            if (Game.session) {
                Game.session.active =
                    false;
            }

            updateMainMenuStats();

            showScreen('menu');

            break;


        case 'go-levels':

            Audio.click();

            buildLevelSelect();

            showScreen('levels');

            break;


        case 'go-instructions':

            Audio.click();

            showScreen(
                'instructions'
            );

            break;


        case 'pause':

            Audio.click();

            GameSession.pause();

            break;


        case 'resume':

            Audio.click();

            GameSession.resume();

            break;


        case 'restart':

            Audio.click();

            GameSession.restart();

            break;


        case 'next-level':

            Audio.click();

            GameSession.nextLevel();

            break;


        case 'go-victory':

            Audio.click();

            GameSession.showVictory();

            break;


        case 'toggle-sound':

            Game.settings.sound =
                !Game.settings.sound;

            saveState();

            updateMainMenuStats();

            if (
                Game.settings.sound
            ) {

                Audio.click();
            }

            break;


        case 'toggle-music':

            Game.settings.music =
                !Game.settings.music;

            saveState();

            updateMainMenuStats();

            if (
                Game.settings.music
            ) {

                Audio.startMusic();

            } else {

                Audio.stopMusic();
            }

            Audio.click();

            break;
    }
}


/* =========================================================
   CONTROLES TÁCTILES
========================================================= */

document.addEventListener(
    'touchmove',
    event => {

        if (
            event.touches.length > 1
        ) {

            event.preventDefault();
        }

    },
    {
        passive: false
    }
);


let lastTouchEnd = 0;


document.addEventListener(
    'touchend',
    event => {

        const now =
            Date.now();

        if (
            now - lastTouchEnd <= 300
        ) {

            event.preventDefault();
        }

        lastTouchEnd = now;

    },
    {
        passive: false
    }
);


/* =========================================================
   INICIO
========================================================= */

window.addEventListener(
    'DOMContentLoaded',
    () => {

        Background.init();

        Particles.init();

        updateMainMenuStats();
    }
);