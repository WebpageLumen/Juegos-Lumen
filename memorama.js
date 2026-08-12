/* =====================================================
   MEMORAMA EXTREMO
   Juego completo en JavaScript puro
   ===================================================== */


/* =====================================================
   CONFIGURACIÓN DE NIVELES
   ===================================================== */

const LEVELS = [
    { cols: 4, rows: 4, pairs: 8 },
    { cols: 5, rows: 4, pairs: 10 },
    { cols: 6, rows: 4, pairs: 12 },
    { cols: 6, rows: 5, pairs: 15 },
    { cols: 7, rows: 6, pairs: 21 },
    { cols: 8, rows: 6, pairs: 24 },
    { cols: 9, rows: 6, pairs: 27 },
    { cols: 10, rows: 6, pairs: 30 }
];


const CARD_EMOJIS = [
    '🌟', '🌙', '☀️', '🌈', '🌸', '🍎', '🍇', '🍓',
    '🍰', '🎈', '🎁', '🎨', '🎵', '🦋', '🐳', '🍀',
    '🔮', '⭐', '🌼', '🍒', '🥝', '🍑', '🥥', '🍍',
    '🚀', '🛸', '🎤', '🎧', '🎸', '🎹', '🥁', '🎰',
    '🎲', '🎳', '🎯', '🎮', '👾', '🤖', '🎃', '💘',
    '💖', '💎', '🔥', '💧', '⚡', '❄️', '🌪️', '🍕',
    '🍔', '🍟', '🌮', '🍣', '🍦', '🍩', '🍫', '🍿',
    '🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐨'
];


const MATCH_MESSAGES = [
    "¡Genial!",
    "¡Vas muy bien!",
    "¡Excelente!",
    "¡Tú puedes!",
    "¡Fresco!",
    "¡Eso es!",
    "¡Sigue así!",
    "¡Brutal!",
    "¡Wow!",
    "¡Memorión!",
    "¡Perfecto!",
    "¡Crack!"
];


const LEVEL_COMPLETE_MESSAGES = [
    "¡Eres imparable!",
    "¡Memoria de elefante!",
    "¡Desafío superado!",
    "¡Nivel dominado!",
    "¡Cada vez mejor!",
    "¡La mente es poder!",
    "¡Vas por buen camino!"
];


/* =====================================================
   SETTINGS
   ===================================================== */

const Settings = {

    music: true,
    sound: true,
    anim: true,

    load() {

        const saved =
            localStorage.getItem('memorama_settings');

        if (saved) {

            try {

                const obj = JSON.parse(saved);

                this.music = obj.music ?? true;
                this.sound = obj.sound ?? true;
                this.anim = obj.anim ?? true;

            } catch (e) {}
        }

        this.updateUI();
    },

    save() {

        localStorage.setItem(
            'memorama_settings',
            JSON.stringify({
                music: this.music,
                sound: this.sound,
                anim: this.anim
            })
        );
    },

    toggle(key) {

        this[key] = !this[key];

        this.save();
        this.updateUI();

        if (key === 'music') {

            if (this.music) {
                AudioManager.startMusic();
            } else {
                AudioManager.stopMusic();
            }
        }

        if (key === 'sound' && this.sound) {
            AudioManager.play('flip');
        }
    },

    updateUI() {

        document
            .getElementById('switch-music')
            .classList.toggle('active', this.music);

        document
            .getElementById('switch-sound')
            .classList.toggle('active', this.sound);

        document
            .getElementById('switch-anim')
            .classList.toggle('active', this.anim);

        document.documentElement.style.setProperty(
            '--transition',
            this.anim
                ? '350ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                : '150ms ease'
        );
    }
};


/* =====================================================
   STORAGE
   ===================================================== */

const Storage = {

    getKey() {
        return 'memorama_scores_extreme_v1';
    },

    getScores() {

        try {

            return JSON.parse(
                localStorage.getItem(this.getKey())
            ) || {};

        } catch (e) {

            return {};
        }
    },

    saveScore(level, stars, time, moves) {

        const scores = this.getScores();

        const existing = scores[level];

        if (
            !existing ||
            stars > existing.stars ||
            (
                stars === existing.stars &&
                time < existing.time
            )
        ) {

            scores[level] = {
                stars,
                time,
                moves,
                date: Date.now()
            };

            localStorage.setItem(
                this.getKey(),
                JSON.stringify(scores)
            );
        }
    },

    clearScores() {

        localStorage.removeItem(
            this.getKey()
        );

        UI.renderScores();

        UI.showToast(
            '🗑️ Puntuaciones borradas'
        );
    }
};


/* =====================================================
   AUDIO MANAGER
   ===================================================== */

const AudioManager = {

    ctx: null,
    musicInterval: null,
    initialized: false,

    init() {

        if (this.initialized) return;

        try {

            this.ctx =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

            this.initialized = true;

        } catch (e) {}
    },

    playTone(
        freq,
        duration = 0.15,
        type = 'sine',
        volume = 0.15
    ) {

        if (!Settings.sound || !this.ctx) {
            return;
        }

        const osc =
            this.ctx.createOscillator();

        const gain =
            this.ctx.createGain();

        osc.type = type;
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(
            0,
            this.ctx.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            volume,
            this.ctx.currentTime + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.ctx.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();

        osc.stop(
            this.ctx.currentTime + duration
        );
    },

    play(type) {

        if (!this.ctx) {
            this.init();
        }

        if (!this.ctx) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        switch (type) {

            case 'flip':

                this.playTone(
                    440,
                    0.12,
                    'sine',
                    0.12
                );

                setTimeout(() => {
                    this.playTone(
                        660,
                        0.1,
                        'sine',
                        0.08
                    );
                }, 60);

                break;


            case 'match':

                this.playTone(
                    523,
                    0.15,
                    'sine',
                    0.15
                );

                setTimeout(() => {
                    this.playTone(
                        659,
                        0.15,
                        'sine',
                        0.15
                    );
                }, 100);

                setTimeout(() => {
                    this.playTone(
                        784,
                        0.2,
                        'sine',
                        0.15
                    );
                }, 200);

                setTimeout(() => {
                    this.playTone(
                        1047,
                        0.25,
                        'sine',
                        0.12
                    );
                }, 300);

                break;


            case 'nomatch':

                this.playTone(
                    330,
                    0.18,
                    'sine',
                    0.08
                );

                break;


            case 'levelComplete':

                this.playTone(
                    523,
                    0.2,
                    'sine',
                    0.15
                );

                setTimeout(() => {
                    this.playTone(
                        659,
                        0.2,
                        'sine',
                        0.15
                    );
                }, 120);

                setTimeout(() => {
                    this.playTone(
                        784,
                        0.3,
                        'sine',
                        0.15
                    );
                }, 240);

                break;


            case 'gameComplete': {

                const melody = [
                    523,
                    587,
                    659,
                    698,
                    784,
                    880,
                    988,
                    1047,
                    1047,
                    1319
                ];

                melody.forEach((n, i) => {

                    setTimeout(() => {

                        this.playTone(
                            n,
                            0.25,
                            'sine',
                            0.16
                        );

                    }, i * 130);
                });

                break;
            }


            case 'powerup':

                this.playTone(
                    880,
                    0.1,
                    'square',
                    0.06
                );

                setTimeout(() => {

                    this.playTone(
                        1100,
                        0.15,
                        'sine',
                        0.1
                    );

                }, 80);

                break;
        }
    },

    startMusic() {

        if (!Settings.music) return;

        if (!this.ctx) {
            this.init();
        }

        if (!this.ctx) return;

        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        if (this.musicInterval) return;

        const chords = [
            [261.63, 329.63, 392.00],
            [220.00, 277.18, 329.63],
            [196.00, 246.94, 293.66],
            [174.61, 220.00, 261.63]
        ];

        let chordIndex = 0;

        const playChord = () => {

            if (!Settings.music || !this.ctx) {
                return;
            }

            const chord =
                chords[chordIndex];

            chord.forEach(freq => {

                const osc =
                    this.ctx.createOscillator();

                const gain =
                    this.ctx.createGain();

                osc.type = 'sine';
                osc.frequency.value = freq;

                gain.gain.setValueAtTime(
                    0,
                    this.ctx.currentTime
                );

                gain.gain.linearRampToValueAtTime(
                    0.025,
                    this.ctx.currentTime + 0.5
                );

                gain.gain.linearRampToValueAtTime(
                    0,
                    this.ctx.currentTime + 3.5
                );

                osc.connect(gain);
                gain.connect(
                    this.ctx.destination
                );

                osc.start();

                osc.stop(
                    this.ctx.currentTime + 3.5
                );
            });

            chordIndex =
                (chordIndex + 1) % chords.length;
        };

        playChord();

        this.musicInterval =
            setInterval(playChord, 3500);
    },

    stopMusic() {

        if (this.musicInterval) {

            clearInterval(
                this.musicInterval
            );

            this.musicInterval = null;
        }
    }
};


/* =====================================================
   PARTICLE SYSTEM
   ===================================================== */

const ParticleSystem = {

    canvas: null,
    ctx: null,
    particles: [],
    rafId: null,

    init() {

        this.canvas =
            document.getElementById('fx-canvas');

        this.ctx =
            this.canvas.getContext('2d');

        this.resize();

        window.addEventListener(
            'resize',
            () => this.resize()
        );

        this.loop();
    },

    resize() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;
    },

    confetti(
        x,
        y,
        count = 80
    ) {

        const colors = [
            '#4A90E2',
            '#F5D547',
            '#9B6BFF',
            '#8FD9B6',
            '#FF6B9D',
            '#5BC0EB'
        ];

        for (let i = 0; i < count; i++) {

            this.particles.push({

                x,
                y,

                vx:
                    (Math.random() - 0.5) * 12,

                vy:
                    Math.random() * -15 - 5,

                gravity: 0.4,

                size:
                    Math.random() * 8 + 4,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ],

                rotation:
                    Math.random() * 360,

                rotationSpeed:
                    (Math.random() - 0.5) * 15,

                life: 1,
                decay: 0.008,

                shape:
                    Math.random() > 0.5
                        ? 'rect'
                        : 'circle'
            });
        }
    },

    confettiRain(duration = 3000) {

        const colors = [
            '#4A90E2',
            '#F5D547',
            '#9B6BFF',
            '#8FD9B6',
            '#FF6B9D',
            '#5BC0EB'
        ];

        const startTime = Date.now();

        const interval =
            setInterval(() => {

                if (
                    Date.now() - startTime >
                    duration
                ) {

                    clearInterval(interval);
                    return;
                }

                for (let i = 0; i < 3; i++) {

                    this.particles.push({

                        x:
                            Math.random() *
                            this.canvas.width,

                        y: -20,

                        vx:
                            (Math.random() - 0.5) * 4,

                        vy:
                            Math.random() * 3 + 2,

                        gravity: 0.1,

                        size:
                            Math.random() * 8 + 4,

                        color:
                            colors[
                                Math.floor(
                                    Math.random() *
                                    colors.length
                                )
                            ],

                        rotation:
                            Math.random() * 360,

                        rotationSpeed:
                            (Math.random() - 0.5) * 10,

                        life: 1,
                        decay: 0.005,

                        shape:
                            Math.random() > 0.5
                                ? 'rect'
                                : 'circle'
                    });
                }

            }, 50);
    },

    stars(x, y, count = 12) {

        const colors = [
            '#F5D547',
            '#FFD700',
            '#FFA500',
            '#FFF8DC'
        ];

        for (let i = 0; i < count; i++) {

            const angle =
                (Math.PI * 2 * i) / count;

            const speed =
                Math.random() * 4 + 2;

            this.particles.push({

                x,
                y,

                vx:
                    Math.cos(angle) * speed,

                vy:
                    Math.sin(angle) * speed - 2,

                gravity: 0.15,

                size:
                    Math.random() * 6 + 3,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ],

                rotation: 0,
                rotationSpeed: 0,

                life: 1,
                decay: 0.025,

                shape: 'star'
            });
        }
    },

    ripple(x, y) {

        this.particles.push({

            x,
            y,

            vx: 0,
            vy: 0,
            gravity: 0,

            size: 10,
            maxSize: 80,

            rotation: 0,
            rotationSpeed: 0,

            life: 1,
            decay: 0.04,

            shape: 'ripple'
        });
    },

    loop() {

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        for (
            let i = this.particles.length - 1;
            i >= 0;
            i--
        ) {

            const p =
                this.particles[i];

            if (p.shape === 'ripple') {

                p.size +=
                    (p.maxSize - p.size) * 0.15;

                this.ctx.beginPath();

                this.ctx.arc(
                    p.x,
                    p.y,
                    p.size,
                    0,
                    Math.PI * 2
                );

                this.ctx.strokeStyle =
                    `rgba(74, 144, 226, ${p.life * 0.5})`;

                this.ctx.lineWidth = 3;

                this.ctx.stroke();

            } else {

                p.x += p.vx;
                p.y += p.vy;

                p.vy += p.gravity;

                p.rotation += p.rotationSpeed;

                this.ctx.save();

                this.ctx.translate(
                    p.x,
                    p.y
                );

                this.ctx.rotate(
                    p.rotation * Math.PI / 180
                );

                this.ctx.globalAlpha =
                    p.life;

                if (p.shape === 'rect') {

                    this.ctx.fillStyle =
                        p.color;

                    this.ctx.fillRect(
                        -p.size / 2,
                        -p.size / 2,
                        p.size,
                        p.size * 0.6
                    );

                } else if (p.shape === 'circle') {

                    this.ctx.fillStyle =
                        p.color;

                    this.ctx.beginPath();

                    this.ctx.arc(
                        0,
                        0,
                        p.size / 2,
                        0,
                        Math.PI * 2
                    );

                    this.ctx.fill();

                } else if (p.shape === 'star') {

                    this.drawStar(
                        0,
                        0,
                        5,
                        p.size / 2,
                        p.size / 4,
                        p.color
                    );
                }

                this.ctx.restore();
            }

            p.life -= p.decay;

            if (
                p.life <= 0 ||
                p.y > this.canvas.height + 50
            ) {

                this.particles.splice(i, 1);
            }
        }

        this.rafId =
            requestAnimationFrame(
                () => this.loop()
            );
    },

    drawStar(
        cx,
        cy,
        spikes,
        outerRadius,
        innerRadius,
        color
    ) {

        let rot =
            Math.PI / 2 * 3;

        let x = cx;
        let y = cy;

        const step =
            Math.PI / spikes;

        this.ctx.beginPath();

        this.ctx.moveTo(
            cx,
            cy - outerRadius
        );

        for (let i = 0; i < spikes; i++) {

            x =
                cx +
                Math.cos(rot) *
                outerRadius;

            y =
                cy +
                Math.sin(rot) *
                outerRadius;

            this.ctx.lineTo(x, y);

            rot += step;

            x =
                cx +
                Math.cos(rot) *
                innerRadius;

            y =
                cy +
                Math.sin(rot) *
                innerRadius;

            this.ctx.lineTo(x, y);

            rot += step;
        }

        this.ctx.lineTo(
            cx,
            cy - outerRadius
        );

        this.ctx.closePath();

        this.ctx.fillStyle = color;

        this.ctx.fill();
    }
};


/* =====================================================
   UI
   ===================================================== */

const UI = {

    currentScreen: 'home',

    showScreen(name) {

        document
            .querySelectorAll('.screen')
            .forEach(screen => {
                screen.classList.remove('active');
            });

        const screen =
            document.getElementById(
                'screen-' + name
            );

        if (screen) {

            screen.classList.add('active');

            this.currentScreen = name;
        }

        if (name === 'scores') {
            this.renderScores();
        }
    },

    showToast(
        message,
        duration = 2500
    ) {

        const toast =
            document.getElementById('toast');

        toast.innerHTML = message;

        toast.classList.add('show');

        clearTimeout(this._toastTimer);

        this._toastTimer =
            setTimeout(() => {

                toast.classList.remove('show');

            }, duration);
    },

    showFloatingText(
        x,
        y,
        text
    ) {

        const el =
            document.createElement('div');

        el.className =
            'floating-text';

        el.textContent = text;

        el.style.left =
            x + 'px';

        el.style.top =
            y + 'px';

        document.body.appendChild(el);

        setTimeout(
            () => el.remove(),
            1200
        );
    },

    runBull() {

        const bull =
            document.createElement('div');

        bull.className =
            'bull-container';

        bull.innerHTML = `
            <span class="bull-emoji">🐂</span>
            <span class="bull-text">¡TORO!</span>
        `;

        document.body.appendChild(bull);

        setTimeout(
            () => bull.remove(),
            1700
        );
    },

    renderScores() {

        const scores =
            Storage.getScores();

        const list =
            document.getElementById(
                'scores-list'
            );

        list.innerHTML = '';

        let hasScores = false;

        LEVELS.forEach((level, i) => {

            const levelNum = i + 1;

            const score =
                scores[levelNum];

            if (score) {

                hasScores = true;

                const row =
                    document.createElement('div');

                row.className =
                    'score-row';

                const stars =
                    '⭐'.repeat(score.stars) +
                    '☆'.repeat(3 - score.stars);

                row.innerHTML = `
                    <div class="score-level">
                        Nivel ${levelNum}
                    </div>

                    <div class="score-stars">
                        ${stars}
                    </div>

                    <div class="score-time">
                        ${Game.formatTime(score.time)}
                        · ${score.moves} mov
                    </div>
                `;

                list.appendChild(row);
            }
        });

        if (!hasScores) {

            list.innerHTML = `
                <div class="empty-state">
                    Aún no hay puntuaciones guardadas.
                    <br>
                    ¡Juega para aparecer aquí!
                </div>
            `;
        }
    }
};


/* =====================================================
   GAME
   ===================================================== */

const Game = {

    currentLevel: 0,

    cards: [],
    flippedCards: [],

    matchedPairs: 0,
    moves: 0,

    startTime: 0,
    elapsedTime: 0,

    timerInterval: null,

    isPaused: false,
    isProcessing: false,
    canFlip: true,

    peekUsed: false,
    shuffleUsed: false,

    totalTime: 0,
    totalMoves: 0,
    totalStars: 0,

    startGame() {

        AudioManager.init();

        if (Settings.music) {
            AudioManager.startMusic();
        }

        this.currentLevel = 0;

        this.totalTime = 0;
        this.totalMoves = 0;
        this.totalStars = 0;

        this.loadLevel(0);
    },

    loadLevel(levelIndex) {

        this.currentLevel =
            levelIndex;

        const config =
            LEVELS[levelIndex];

        this.cards = [];
        this.flippedCards = [];

        this.matchedPairs = 0;
        this.moves = 0;

        this.elapsedTime = 0;

        this.isPaused = false;
        this.isProcessing = false;
        this.canFlip = true;

        this.peekUsed = false;
        this.shuffleUsed = false;

        const emojis =
            CARD_EMOJIS.slice(
                0,
                config.pairs
            );

        let cardData = [];

        emojis.forEach(
            (emoji, i) => {

                cardData.push({
                    id: i * 2,
                    emoji,
                    pairId: i
                });

                cardData.push({
                    id: i * 2 + 1,
                    emoji,
                    pairId: i
                });
            }
        );

        this.shuffle(cardData);

        this.cards = cardData;

        this.renderBoard(config);

        this.updateHUD();
        this.updatePowerups();

        this.startTime =
            Date.now();

        if (this.timerInterval) {
            clearInterval(
                this.timerInterval
            );
        }

        this.timerInterval =
            setInterval(() => {

                if (!this.isPaused) {

                    this.elapsedTime =
                        Date.now() -
                        this.startTime;

                    this.updateHUD();
                }

            }, 100);

        UI.showScreen('game');
    },

    shuffle(arr) {

        for (
            let i = arr.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() *
                    (i + 1)
                );

            [
                arr[i],
                arr[j]
            ] = [
                arr[j],
                arr[i]
            ];
        }
    },

    renderBoard(config) {

        const board =
            document.getElementById('board');

        board.innerHTML = '';

        board.style.gridTemplateColumns =
            `repeat(${config.cols}, 1fr)`;

        board.style.gridTemplateRows =
            `repeat(${config.rows}, 1fr)`;

        const isMobile =
            window.innerWidth < 600;

        const gap =
            isMobile ? 4 : 8;

        const maxWidth =
            Math.min(
                window.innerWidth - 20,
                1100
            );

        const maxHeight =
            window.innerHeight - 180;

        const cardSizeByWidth =
            (
                maxWidth -
                gap * (config.cols - 1)
            ) / config.cols;

        const cardSizeByHeight =
            (
                maxHeight -
                gap * (config.rows - 1)
            ) / config.rows;

        const cardSize =
            Math.min(
                cardSizeByWidth,
                cardSizeByHeight
            );

        const boardWidth =
            cardSize * config.cols +
            gap * (config.cols - 1);

        const boardHeight =
            cardSize * config.rows +
            gap * (config.rows - 1);

        board.style.width =
            boardWidth + 'px';

        board.style.height =
            boardHeight + 'px';

        board.style.maxWidth =
            '100%';

        this.cards.forEach(
            (card, index) => {

                const cardEl =
                    document.createElement('div');

                cardEl.className =
                    'card';

                cardEl.dataset.index =
                    index;

                cardEl.style.animationDelay =
                    Math.min(
                        index * 25,
                        800
                    ) + 'ms';

                cardEl.innerHTML = `
                    <div class="card-face card-front"></div>

                    <div class="card-face card-back">
                        ${card.emoji}
                    </div>
                `;

                cardEl.addEventListener(
                    'click',
                    event =>
                        this.flipCard(
                            index,
                            event
                        )
                );

                board.appendChild(cardEl);
            }
        );
    },

    flipCard(index, event) {

        if (
            !this.canFlip ||
            this.isPaused ||
            this.isProcessing
        ) {
            return;
        }

        const cardEl =
            document.querySelector(
                `.card[data-index="${index}"]`
            );

        if (
            !cardEl ||
            cardEl.classList.contains('flipped') ||
            cardEl.classList.contains('matched')
        ) {
            return;
        }

        if (event && Settings.anim) {

            const rect =
                event.target.getBoundingClientRect();

            ParticleSystem.ripple(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }

        cardEl.classList.add('flipped');

        AudioManager.play('flip');

        this.flippedCards.push({
            index,
            card: this.cards[index],
            el: cardEl
        });

        if (this.flippedCards.length === 2) {

            this.canFlip = false;

            this.moves++;

            this.updateHUD();

            this.checkMatch();
        }
    },

    checkMatch() {

        const [
            first,
            second
        ] = this.flippedCards;

        this.isProcessing = true;

        if (
            first.card.pairId ===
            second.card.pairId
        ) {

            setTimeout(() => {

                first.el.classList.add(
                    'matched'
                );

                second.el.classList.add(
                    'matched'
                );

                AudioManager.play('match');

                if (Settings.anim) {

                    const rect1 =
                        first.el.getBoundingClientRect();

                    const rect2 =
                        second.el.getBoundingClientRect();

                    ParticleSystem.stars(
                        rect1.left +
                            rect1.width / 2,
                        rect1.top +
                            rect1.height / 2,
                        10
                    );

                    ParticleSystem.stars(
                        rect2.left +
                            rect2.width / 2,
                        rect2.top +
                            rect2.height / 2,
                        10
                    );

                    const msg =
                        MATCH_MESSAGES[
                            Math.floor(
                                Math.random() *
                                MATCH_MESSAGES.length
                            )
                        ];

                    const midX =
                        (
                            rect1.left +
                            rect2.left
                        ) / 2 +
                        rect1.width / 2;

                    const midY =
                        (
                            rect1.top +
                            rect2.top
                        ) / 2 +
                        rect1.height / 2;

                    UI.showFloatingText(
                        midX,
                        midY,
                        msg
                    );
                }

                this.matchedPairs++;

                this.flippedCards = [];

                this.canFlip = true;

                this.isProcessing = false;

                this.updateHUD();

                if (
                    this.matchedPairs ===
                    LEVELS[
                        this.currentLevel
                    ].pairs
                ) {

                    setTimeout(
                        () => this.completeLevel(),
                        600
                    );
                }

            }, 500);

        } else {

            setTimeout(() => {

                AudioManager.play(
                    'nomatch'
                );

                first.el.classList.remove(
                    'flipped'
                );

                second.el.classList.remove(
                    'flipped'
                );

                this.flippedCards = [];

                this.canFlip = true;

                this.isProcessing = false;

            }, 900);
        }
    },

    completeLevel() {

        clearInterval(
            this.timerInterval
        );

        const time =
            this.elapsedTime;

        const moves =
            this.moves;

        const pairs =
            LEVELS[
                this.currentLevel
            ].pairs;

        const idealMoves =
            pairs;

        const veryGoodMoves =
            pairs * 1.8;

        let stars;

        if (
            moves <=
            idealMoves * 1.4
        ) {

            stars = 3;

        } else if (
            moves <=
            veryGoodMoves
        ) {

            stars = 2;

        } else {

            stars = 1;
        }

        Storage.saveScore(
            this.currentLevel + 1,
            stars,
            time,
            moves
        );

        this.totalTime += time;
        this.totalMoves += moves;
        this.totalStars += stars;

        AudioManager.play(
            'levelComplete'
        );

        if (Settings.anim) {

            ParticleSystem.confettiRain(
                2500
            );

            ParticleSystem.confetti(
                window.innerWidth / 2,
                window.innerHeight / 2,
                60
            );

            UI.runBull();
        }

        this.showLevelComplete(
            stars,
            time,
            moves,
            pairs
        );
    },

    showLevelComplete(
        stars,
        time,
        moves,
        pairs
    ) {

        const accuracy =
            Math.round(
                (pairs / moves) * 100
            );

        document.getElementById(
            'celebration-time'
        ).textContent =
            this.formatTime(time);

        document.getElementById(
            'celebration-moves'
        ).textContent =
            moves;

        document.getElementById(
            'celebration-accuracy'
        ).textContent =
            accuracy + '%';

        const starsEl =
            document.getElementById(
                'celebration-stars'
            );

        starsEl.innerHTML = '';

        for (let i = 0; i < 3; i++) {

            const star =
                document.createElement('span');

            star.className =
                'star';

            star.textContent =
                i < stars
                    ? '⭐'
                    : '☆';

            star.style.animationDelay =
                (i * 150 + 200) + 'ms';

            starsEl.appendChild(star);
        }

        const title =
            document.getElementById(
                'celebration-title'
            );

        const subtitle =
            document.getElementById(
                'celebration-subtitle'
            );

        if (stars === 3) {

            title.textContent =
                '⭐ ¡Excelente!';

        } else if (stars === 2) {

            title.textContent =
                '✨ ¡Muy bien!';

        } else {

            title.textContent =
                '🎉 ¡Nivel completado!';
        }

        const motivationMsg =
            LEVEL_COMPLETE_MESSAGES[
                Math.floor(
                    Math.random() *
                    LEVEL_COMPLETE_MESSAGES.length
                )
            ];

        subtitle.textContent =
            motivationMsg;

        const nextBtn =
            document.getElementById(
                'celebration-next'
            );

        if (
            this.currentLevel >=
            LEVELS.length - 1
        ) {

            nextBtn.textContent =
                '🎉 Ver final';

        } else {

            nextBtn.textContent =
                'Siguiente nivel →';
        }

        setTimeout(
            () =>
                UI.showScreen(
                    'level-complete'
                ),
            300
        );
    },

    nextLevel() {

        if (
            this.currentLevel >=
            LEVELS.length - 1
        ) {

            this.showGameComplete();

        } else {

            this.loadLevel(
                this.currentLevel + 1
            );
        }
    },

    showGameComplete() {

        AudioManager.play(
            'gameComplete'
        );

        if (Settings.anim) {

            ParticleSystem.confettiRain(
                5000
            );

            UI.runBull();
        }

        document.getElementById(
            'final-time'
        ).textContent =
            this.formatTime(
                this.totalTime
            );

        document.getElementById(
            'final-moves'
        ).textContent =
            this.totalMoves;

        document.getElementById(
            'final-stars-count'
        ).textContent =
            this.totalStars +
            '/' +
            (LEVELS.length * 3);

        const starsEl =
            document.getElementById(
                'final-stars'
            );

        starsEl.innerHTML = '';

        const maxStars =
            LEVELS.length * 3;

        const ratio =
            this.totalStars /
            maxStars;

        const displayStars =
            ratio >= 0.9
                ? 3
                : ratio >= 0.6
                    ? 2
                    : 1;

        for (let i = 0; i < 3; i++) {

            const star =
                document.createElement('span');

            star.className =
                'star';

            star.textContent =
                i < displayStars
                    ? '🏆'
                    : '🎖️';

            star.style.animationDelay =
                (i * 200 + 200) + 'ms';

            starsEl.appendChild(star);
        }

        UI.showScreen(
            'game-complete'
        );
    },

    restartAll() {

        this.totalTime = 0;
        this.totalMoves = 0;
        this.totalStars = 0;

        this.loadLevel(0);
    },

    restartLevel() {

        this.loadLevel(
            this.currentLevel
        );

        UI.showToast(
            '🔄 Nivel reiniciado'
        );
    },

    quitGame() {

        clearInterval(
            this.timerInterval
        );

        AudioManager.stopMusic();

        UI.showScreen('home');
    },

    togglePause() {

        this.isPaused =
            !this.isPaused;

        document
            .getElementById(
                'pause-overlay'
            )
            .classList.toggle(
                'active',
                this.isPaused
            );

        if (this.isPaused) {

            this._pauseStart =
                Date.now();

        } else {

            this.startTime +=
                Date.now() -
                this._pauseStart;
        }
    },

    usePeek() {

        if (
            this.peekUsed ||
            this.isPaused ||
            this.isProcessing
        ) {
            return;
        }

        this.peekUsed = true;

        AudioManager.play(
            'powerup'
        );

        this.updatePowerups();

        const allCards =
            document.querySelectorAll(
                '.card:not(.matched)'
            );

        allCards.forEach(card => {
            card.classList.add(
                'flipped'
            );
        });

        this.canFlip = false;

        setTimeout(() => {

            allCards.forEach(card => {

                if (
                    !card.classList.contains(
                        'matched'
                    )
                ) {

                    card.classList.remove(
                        'flipped'
                    );
                }
            });

            this.canFlip = true;

        }, 3000);

        UI.showToast(
            '👀 ¡Recuerda las cartas!'
        );
    },

    updateHUD() {

        document.getElementById(
            'hud-level'
        ).textContent =
            this.currentLevel + 1;

        document.getElementById(
            'hud-moves'
        ).textContent =
            this.moves;

        document.getElementById(
            'hud-time'
        ).textContent =
            this.formatTime(
                this.elapsedTime
            );

        document.getElementById(
            'hud-pairs'
        ).textContent =
            this.matchedPairs +
            '/' +
            LEVELS[
                this.currentLevel
            ].pairs;
    },

    updatePowerups() {

        document.getElementById(
            'btn-peek'
        ).disabled =
            this.peekUsed;

        document.getElementById(
            'btn-shuffle'
        ).disabled =
            this.shuffleUsed;
    },

    formatTime(ms) {

        const totalSeconds =
            Math.floor(ms / 1000);

        const minutes =
            Math.floor(
                totalSeconds / 60
            );

        const seconds =
            totalSeconds % 60;

        return (
            minutes +
            ':' +
            seconds
                .toString()
                .padStart(2, '0')
        );
    }
};


/* =====================================================
   POWERUP: MEZCLAR
   ===================================================== */

Game.useShuffle = function () {

    if (
        this.shuffleUsed ||
        this.isPaused ||
        this.isProcessing
    ) {
        return;
    }

    if (this.flippedCards.length > 0) {
        return;
    }

    this.shuffleUsed = true;

    AudioManager.play(
        'powerup'
    );

    this.updatePowerups();

    const matchedPairIds =
        new Set();

    document
        .querySelectorAll('.card.matched')
        .forEach(el => {

            const idx =
                parseInt(
                    el.dataset.index
                );

            matchedPairIds.add(
                this.cards[idx].pairId
            );
        });

    const unmatched = [];
    const unmatchedIndices = [];

    this.cards.forEach(
        (card, i) => {

            if (
                !matchedPairIds.has(
                    card.pairId
                )
            ) {

                unmatched.push(card);

                unmatchedIndices.push(i);
            }
        }
    );

    this.shuffle(unmatched);

    unmatchedIndices.forEach(
        (origIdx, i) => {

            this.cards[origIdx] =
                unmatched[i];
        }
    );

    const board =
        document.getElementById(
            'board'
        );

    const oldMatched = [];

    board
        .querySelectorAll('.card.matched')
        .forEach(el => {

            oldMatched.push({
                index:
                    parseInt(
                        el.dataset.index
                    ),

                emoji:
                    el.querySelector(
                        '.card-back'
                    ).textContent
            });
        });

    this.renderBoard(
        LEVELS[this.currentLevel]
    );

    oldMatched.forEach(m => {

        const newCard =
            this.cards[m.index];

        const el =
            document.querySelector(
                `.card[data-index="${m.index}"]`
            );

        if (el) {

            el.querySelector(
                '.card-back'
            ).textContent =
                newCard.emoji;

            el.classList.add(
                'flipped',
                'matched'
            );
        }
    });

    UI.showToast(
        '🔄 ¡Cartas mezcladas!'
    );
};


/* =====================================================
   INICIALIZACIÓN
   ===================================================== */

window.addEventListener(
    'DOMContentLoaded',
    () => {

        Settings.load();

        ParticleSystem.init();

        let resizeTimer;

        window.addEventListener(
            'resize',
            () => {

                clearTimeout(
                    resizeTimer
                );

                resizeTimer =
                    setTimeout(() => {

                        if (
                            UI.currentScreen ===
                                'game' &&
                            Game.cards.length > 0
                        ) {

                            const flippedIndices = [];
                            const matchedIndices = [];

                            document
                                .querySelectorAll(
                                    '.card'
                                )
                                .forEach(el => {

                                    const idx =
                                        parseInt(
                                            el.dataset.index
                                        );

                                    if (
                                        el.classList.contains(
                                            'matched'
                                        )
                                    ) {

                                        matchedIndices.push(
                                            idx
                                        );

                                    } else if (
                                        el.classList.contains(
                                            'flipped'
                                        )
                                    ) {

                                        flippedIndices.push(
                                            idx
                                        );
                                    }
                                });

                            Game.renderBoard(
                                LEVELS[
                                    Game.currentLevel
                                ]
                            );

                            matchedIndices.forEach(
                                idx => {

                                    const el =
                                        document.querySelector(
                                            `.card[data-index="${idx}"]`
                                        );

                                    if (el) {

                                        el.classList.add(
                                            'flipped',
                                            'matched'
                                        );
                                    }
                                }
                            );

                            flippedIndices.forEach(
                                idx => {

                                    const el =
                                        document.querySelector(
                                            `.card[data-index="${idx}"]`
                                        );

                                    if (el) {

                                        el.classList.add(
                                            'flipped'
                                        );
                                    }
                                }
                            );
                        }

                    }, 200);
            }
        );

        document.addEventListener(
            'click',
            () => {
                AudioManager.init();
            },
            { once: true }
        );

        let lastTouch = 0;

        document.addEventListener(
            'touchend',
            event => {

                const now =
                    Date.now();

                if (
                    now - lastTouch <= 300
                ) {

                    event.preventDefault();
                }

                lastTouch = now;

            },
            {
                passive: false
            }
        );
    }
);