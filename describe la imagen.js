/* =========================================================
   ESTRELLAS EN EL CIELO
========================================================= */

(function crearEstrellas() {
    const contenedor = document.getElementById("estrellas");
    const cantidad = 40;

    if (!contenedor) return;

    for (let i = 0; i < cantidad; i++) {
        const s = document.createElement("div");

        s.className = "star";

        const tamaño = Math.random() * 2 + 1;

        s.style.width = tamaño + "px";
        s.style.height = tamaño + "px";
        s.style.left = Math.random() * 100 + "%";
        s.style.top = Math.random() * 100 + "%";

        s.style.setProperty(
            "--dur",
            Math.random() * 3 + 2 + "s"
        );

        s.style.setProperty(
            "--op-min",
            (Math.random() * 0.15 + 0.05).toFixed(2)
        );

        s.style.setProperty(
            "--op-max",
            (Math.random() * 0.3 + 0.2).toFixed(2)
        );

        s.style.animationDelay =
            Math.random() * 5 + "s";

        contenedor.appendChild(s);
    }
})();


/* =========================================================
   NIVELES
   Cada stage tiene:
   - 6 palabras correctas
   - 6 distractores
   - 12 opciones en total
   - El jugador debe seleccionar 4
========================================================= */

const levels = [
    {
        name: "Animales",

        stages: [
            {
                image: "https://www.anipedia.net/imagenes/que-comen-los-perros.jpg",

                correct: [
                    "Peludo",
                    "Juguetón",
                    "Fiel",
                    "Cariñoso",
                    "Leal",
                    "Doméstico"
                ],

                options: [
                    "Peludo",
                    "Juguetón",
                    "Fiel",
                    "Cariñoso",
                    "Leal",
                    "Doméstico",
                    "Acuático",
                    "Metálico",
                    "Escamoso",
                    "Volador",
                    "Feroz",
                    "Solitario"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mePXvUD4IAX-OEvx4PvxJDmdj5e8bPXw_BvRrqcrLii36a4jaNsjMhE&s=10",

                correct: [
                    "Ágil",
                    "Curioso",
                    "Felino",
                    "Sigiloso",
                    "Elegante",
                    "Peludo"
                ],

                options: [
                    "Ágil",
                    "Curioso",
                    "Felino",
                    "Sigiloso",
                    "Elegante",
                    "Peludo",
                    "Pesado",
                    "Ruidoso",
                    "Lento",
                    "Acuático",
                    "Gigante",
                    "Escamoso"
                ]
            },

            {
                image: "https://d80g3k8vowjyp.cloudfront.net/img/elefante_africano_100750.jpg",

                correct: [
                    "Masivo",
                    "Trompa",
                    "Gris",
                    "Pesado",
                    "Grande",
                    "Herbívoro"
                ],

                options: [
                    "Masivo",
                    "Trompa",
                    "Gris",
                    "Pesado",
                    "Grande",
                    "Herbívoro",
                    "Diminuto",
                    "Volador",
                    "Ligero",
                    "Acuático",
                    "Doméstico",
                    "Metálico"
                ]
            },

            {
                image: "https://cdn.prod.website-files.com/692da62b1095e881eb691deb/695bd570feb507224e911af5_zoo-martinique-animaux-oiseaux-amazone-front-jaune-02.jpg",

                correct: [
                    "Colorido",
                    "Plumaje",
                    "Tropical",
                    "Volador",
                    "Cantor",
                    "Exótico"
                ],

                options: [
                    "Colorido",
                    "Plumaje",
                    "Tropical",
                    "Volador",
                    "Cantor",
                    "Exótico",
                    "Congelado",
                    "Robótico",
                    "Silencioso",
                    "Escamoso",
                    "Peludo",
                    "Opaco"
                ]
            }
        ]
    },

    {
        name: "Naturaleza",

        stages: [
            {
                image: "https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?fm=jpg&q=60&w=3000&auto=format&fit=crop",

                correct: [
                    "Arena",
                    "Olas",
                    "Costa",
                    "Salado",
                    "Marino",
                    "Horizonte"
                ],

                options: [
                    "Arena",
                    "Olas",
                    "Costa",
                    "Salado",
                    "Marino",
                    "Horizonte",
                    "Luminoso",
                    "Industrial",
                    "Gélido",
                    "Montaña",
                    "Urbano",
                    "Seco"
                ]
            },

            {
                image: "https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg",

                correct: [
                    "Frondoso",
                    "Tranquilo",
                    "Verde",
                    "Árboles",
                    "Fresco",
                    "Natural"
                ],

                options: [
                    "Frondoso",
                    "Tranquilo",
                    "Verde",
                    "Árboles",
                    "Fresco",
                    "Natural",
                    "Árido",
                    "Metálico",
                    "Helado",
                    "Industrial",
                    "Caluroso",
                    "Urbano"
                ]
            },

            {
                image: "https://concepto.de/wp-content/uploads/2018/08/monta%C3%B1a-clima-min-e1533762913759.jpg",

                correct: [
                    "Majestuoso",
                    "Picos",
                    "Rocoso",
                    "Nevado",
                    "Elevado",
                    "Frío"
                ],

                options: [
                    "Majestuoso",
                    "Picos",
                    "Rocoso",
                    "Nevado",
                    "Elevado",
                    "Frío",
                    "Acuático",
                    "Caluroso",
                    "Llanura",
                    "Doméstico",
                    "Diminuto",
                    "Artificial"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_dEPx1jCqM1STgIUZ-_xz0irTn05lDOFIzRQIQCp_d3nV2KqpnpG5g39&s=10",

                correct: [
                    "Cascada",
                    "Fresca",
                    "Natural",
                    "Brillante",
                    "Mojado",
                    "Espectacular"
                ],

                options: [
                    "Cascada",
                    "Fresca",
                    "Natural",
                    "Brillante",
                    "Mojado",
                    "Espectacular",
                    "Seco",
                    "Sintético",
                    "Estático",
                    "Árido",
                    "Congelado",
                    "Opaco"
                ]
            }
        ]
    },

    {
        name: "Transportes",

        stages: [
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfmnCla16AwmhQxaBXAZ5aJjwUbbIg82EOTMUKqLS9zTX8ghN0Wq4QWaqI&s=10",

                correct: [
                    "Veloz",
                    "Motor",
                    "Automóvil",
                    "Ruedas",
                    "Moderno",
                    "Terrestre"
                ],

                options: [
                    "Veloz",
                    "Motor",
                    "Automóvil",
                    "Ruedas",
                    "Moderno",
                    "Terrestre",
                    "Fluvial",
                    "Volador",
                    "Submarino",
                    "Manual",
                    "Silencioso",
                    "Acuático"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44aR7_Rs9WVi9-sEK_Xg9uC_7tOAqVeaGi6Cq6ue2JxhzqHj9HcGnp8B&s=10",

                correct: [
                    "Aeronave",
                    "Altura",
                    "Vuelo",
                    "Veloz",
                    "Aéreo",
                    "Moderno"
                ],

                options: [
                    "Aeronave",
                    "Altura",
                    "Vuelo",
                    "Veloz",
                    "Aéreo",
                    "Moderno",
                    "Submarino",
                    "Terrestre",
                    "Minúsculo",
                    "Fluvial",
                    "Doméstico",
                    "Subterráneo"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA07H-2HtArrtPqLI_z9kBFoDFpc8F7tTZ6be5RzXerAH7KGj4fwzLd3qY&s=10",

                correct: [
                    "Ferroviario",
                    "Vagón",
                    "Viaje",
                    "Potente",
                    "Terrestre",
                    "Pesado"
                ],

                options: [
                    "Ferroviario",
                    "Vagón",
                    "Viaje",
                    "Potente",
                    "Terrestre",
                    "Pesado",
                    "Aéreo",
                    "Marítimo",
                    "Doméstico",
                    "Acuático",
                    "Volador",
                    "Diminuto"
                ]
            },

            {
                image: "https://d31f1ehqijlcua.cloudfront.net/n/7/c/5/5/7c5563954f43948bc2e54af9f501bf4b4a2937fd_Cycling_499344_01.jpg",

                correct: [
                    "Ecológico",
                    "Pedalea",
                    "Ligera",
                    "Ruedas",
                    "Deportiva",
                    "Sostenible"
                ],

                options: [
                    "Ecológico",
                    "Pedalea",
                    "Ligera",
                    "Ruedas",
                    "Deportiva",
                    "Sostenible",
                    "Combustión",
                    "Pesada",
                    "Gigante",
                    "Motorizada",
                    "Ruidosa",
                    "Contaminante"
                ]
            }
        ]
    },

    {
        name: "Situaciones",

        stages: [
            {
                image: "https://img.magnific.com/foto-gratis/ninos-felices-jugando-juntos-al-aire-libre-bailando-sobre-cesped-disfrutando-actividades-al-aire-libre-divirtiendose-parque-concepto-fiesta-o-amistad-ninos_74855-11760.jpg?semt=ais_hybrid&w=740&q=80",

                correct: [
                    "Alegría",
                    "Compañía",
                    "Risas",
                    "Infancia",
                    "Divertido",
                    "Libre"
                ],

                options: [
                    "Alegría",
                    "Compañía",
                    "Risas",
                    "Infancia",
                    "Divertido",
                    "Libre",
                    "Apatía",
                    "Soledad",
                    "Tristeza",
                    "Silencio",
                    "Frío",
                    "Monotonía"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-4lAh6Xb6kDqKfzTmufVNX4QO43D3i3jRMB92LR99xAcz3jT8w8Tqtac&s=10",

                correct: [
                    "Aula",
                    "Estudio",
                    "Docente",
                    "Concentración",
                    "Aprendizaje",
                    "Educativo"
                ],

                options: [
                    "Aula",
                    "Estudio",
                    "Docente",
                    "Concentración",
                    "Aprendizaje",
                    "Educativo",
                    "Salvaje",
                    "Caos",
                    "Fábrica",
                    "Desorden",
                    "Ruido",
                    "Industrial"
                ]
            },

            {
                image: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/B5B9/production/_92212564_gettyimages-185933155.jpg.webp",

                correct: [
                    "Competencia",
                    "Balón",
                    "Equipo",
                    "Cancha",
                    "Atlético",
                    "Deportivo"
                ],

                options: [
                    "Competencia",
                    "Balón",
                    "Equipo",
                    "Cancha",
                    "Atlético",
                    "Deportivo",
                    "Silencio",
                    "Individual",
                    "Quieto",
                    "Virtual",
                    "Soledad",
                    "Apatía"
                ]
            },

            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeA2I97remQSZ6ipPWVW8_mOudtNkWpyOJtG0pfuwA2PKIC0dqUIp9nrpn&s=10",

                correct: [
                    "Celebración",
                    "Globos",
                    "Pastel",
                    "Música",
                    "Festivo",
                    "Feliz"
                ],

                options: [
                    "Celebración",
                    "Globos",
                    "Pastel",
                    "Música",
                    "Festivo",
                    "Feliz",
                    "Tristeza",
                    "Vacío",
                    "Apatía",
                    "Silencio",
                    "Soledad",
                    "Oscuro"
                ]
            }
        ]
    }
];


/* =========================================================
   VARIABLES DEL JUEGO
========================================================= */

let level = 0;
let stage = 0;
let score = 0;
let selected = [];
let streak = 0;
let hintUsedThisStage = false;


/* =========================================================
   ELEMENTOS DEL HTML
========================================================= */

const imageEl = document.getElementById("image");
const wordsEl = document.getElementById("words");
const messageEl = document.getElementById("message");
const checkBtn = document.getElementById("check");
const hintBtn = document.getElementById("hintBtn");
const mainContainer = document.getElementById("mainContainer");
const streakBadge = document.getElementById("streakBadge");
const streakSpan = document.getElementById("streak");


/* =========================================================
   MENSAJES
========================================================= */

const successMessages = [
    "✅ ¡Excelente!",
    "🌟 ¡Increíble!",
    "🧠 ¡Gran vocabulario!",
    "🎨 ¡Perfecto!",
    "👏 ¡Bravo!",
    "🎯 ¡Preciso!"
];

const failMessages = [
    "❌ Ups, alguna no describe la imagen",
    "🤔 Revisa cuáles encajan mejor",
    "👀 ¡Observa con más detalle!"
];

const streakMessages = [
    "🔥 ¡Racha activa!",
    "⚡ ¡Eres imparable!",
    "🚀 ¡Máximo nivel!"
];


/* =========================================================
   FUNCIONES GENERALES
========================================================= */

function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}


function getRandomMsg(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


/* =========================================================
   CONFETI
========================================================= */

function launchConfetti() {
    const colors = [
        "#b899e0",
        "#9a7cd4",
        "#d4c0f0",
        "#e0d5f5",
        "#f0e8f8",
        "#c8b5e5"
    ];

    for (let i = 0; i < 60; i++) {
        const c = document.createElement("div");

        c.className = "confetti-piece";

        c.style.left =
            Math.random() * 100 + "vw";

        c.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        c.style.animationDuration =
            Math.random() * 2 + 2 + "s";

        document.body.appendChild(c);

        setTimeout(() => {
            c.remove();
        }, 4000);
    }
}


/* =========================================================
   ACTUALIZAR INTERFAZ
========================================================= */

function updateUI() {
    const total = 16;

    const completed =
        level * 4 + stage;

    const bar = document.getElementById("bar");

    if (bar) {
        bar.style.width =
            (completed / total) * 100 + "%";
    }

    checkBtn.textContent =
        `Comprobar (${selected.length}/4)`;

    if (selected.length === 4) {
        checkBtn.classList.remove("btn-disabled");
    } else {
        checkBtn.classList.add("btn-disabled");
    }

    streakSpan.textContent = streak;

    streakBadge.style.display =
        streak >= 2 ? "inline-block" : "none";
}


/* =========================================================
   BLOQUEAR / DESBLOQUEAR PALABRAS
========================================================= */

function toggleWords(disabled) {
    wordsEl.querySelectorAll(".word").forEach(btn => {

        if (
            !btn.classList.contains("selected") &&
            disabled
        ) {
            btn.classList.add("disabled");
        } else {
            btn.classList.remove("disabled");
        }

    });
}


/* =========================================================
   CARGAR STAGE
========================================================= */

function loadStage() {
    selected = [];
    hintUsedThisStage = false;

    hintBtn.classList.remove("btn-disabled");

    messageEl.textContent = "";

    const cur =
        levels[level].stages[stage];

    document.getElementById("level").textContent =
        level + 1;

    document.getElementById("score").textContent =
        score;

    document.getElementById("levelName").textContent =
        `Nivel: ${levels[level].name}`;

    imageEl.classList.add("loading");

    imageEl.src = cur.image;

    imageEl.onload = () => {
        imageEl.classList.remove("loading");
    };

    wordsEl.innerHTML = "";

    shuffle(cur.options).forEach(word => {

        const btn =
            document.createElement("button");

        btn.className = "word";

        btn.textContent = word;

        btn.onclick = () => {

            if (btn.classList.contains("selected")) {

                btn.classList.remove("selected");

                selected =
                    selected.filter(x => x !== word);

                toggleWords(false);

            } else {

                if (selected.length >= 4) {

                    messageEl.style.color =
                        "#7a5aaa";

                    messageEl.textContent =
                        "⚠️ Solo puedes seleccionar 4 palabras";

                    return;
                }

                btn.classList.add("selected");

                selected.push(word);

                if (selected.length === 4) {
                    toggleWords(true);
                    messageEl.textContent = "";
                }
            }

            updateUI();
        };

        wordsEl.appendChild(btn);
    });

    updateUI();
}


/* =========================================================
   SISTEMA DE PISTAS
========================================================= */

hintBtn.onclick = () => {

    if (hintUsedThisStage) return;

    const cur =
        levels[level].stages[stage];

    const available =
        cur.correct.filter(
            c => !selected.includes(c)
        );

    if (available.length === 0) {

        messageEl.style.color =
            "#7a5aaa";

        messageEl.textContent =
            "👀 ¡Ya tienes todas las correctas seleccionadas!";

        return;
    }

    hintUsedThisStage = true;

    hintBtn.classList.add("btn-disabled");

    score = Math.max(0, score - 5);

    document.getElementById("score").textContent =
        score;

    const hintWord =
        available[
            Math.floor(Math.random() * available.length)
        ];

    wordsEl.querySelectorAll(".word").forEach(btn => {

        if (btn.textContent === hintWord) {

            btn.classList.add("hint-highlight");

            setTimeout(
                () => btn.classList.remove("hint-highlight"),
                2500
            );
        }
    });

    messageEl.style.color =
        "#8a6d10";

    messageEl.textContent =
        `💡 Pista: "${hintWord}" es correcta (-5 pts)`;
};


/* =========================================================
   COMPROBAR RESPUESTA
========================================================= */

checkBtn.onclick = () => {

    if (selected.length !== 4) return;

    const cur =
        levels[level].stages[stage];

    const isCorrect =
        selected.every(
            w => cur.correct.includes(w)
        );

    if (isCorrect) {

        streak++;

        let pts = 10;

        if (streak >= 3) {

            pts += 5;

            messageEl.style.color =
                "#7a5aaa";

            messageEl.textContent =
                getRandomMsg(successMessages) +
                " " +
                getRandomMsg(streakMessages) +
                " (+15 pts)";

        } else {

            messageEl.style.color =
                "#43e97b";

            messageEl.textContent =
                getRandomMsg(successMessages) +
                " (+10 pts)";
        }

        score += pts;

        document.getElementById("score").textContent =
            score;

        setTimeout(() => {

            stage++;

            /* =========================================
               TERMINÓ EL NIVEL ACTUAL
            ========================================= */

            if (stage === 4) {

                score += 30;

                document.getElementById("score").textContent =
                    score;

                messageEl.textContent =
                    "🎉 ¡Nivel completado! +30 puntos extra";

                launchConfetti();

                level++;

                stage = 0;

                /* =====================================
                   TERMINÓ TODO EL JUEGO
                ===================================== */

                if (level === 4) {

                    score += 50;

                    document.getElementById("finalScore").textContent =
                        score;

                    document.getElementById("game").style.display =
                        "none";

                    document.getElementById("victory").style.display =
                        "block";

                    launchConfetti();

                    return;
                }
            }

            loadStage();

        }, 1200);

    } else {

        streak = 0;

        messageEl.style.color =
            "#ff5252";

        messageEl.textContent =
            getRandomMsg(failMessages);

        mainContainer.classList.add("shake");

        setTimeout(
            () => mainContainer.classList.remove("shake"),
            400
        );
    }
};


/* =========================================================
   INICIAR JUEGO
========================================================= */

loadStage();