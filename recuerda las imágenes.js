const mensajesExito = [
    "¡Increíble, tu memoria es superpoderosa!",
    "¡Lo lograste! ¡Eres un genio visual!",
    "¡Fantástico! ¡Tu enfoque es increíble!",
    "¡Brillante! ¡Tu mente es un tesoro!",
    "¡Excelente! ¡Ves cosas que otros no pueden!",
    "¡Asombroso! ¡Tu atención es mágica!",
    "¡Maravilloso! ¡Tu intuición es un regalo!",
    "¡Perfecto! ¡Eres imparable!",
    "¡Espectacular! ¡Tu cerebro es una maravilla!"
];

const mensajesError = [
    "¡Casi lo logras! ¡Inténtalo de nuevo!",
    "¡Estás muy cerca! ¡Un intento más!",
    "Respira profundo, ¡lo puedes conseguir!",
    "No pasa nada, ¡cada intento te hace más fuerte!",
    "Tu ritmo es el correcto, ¡intenta otra vez!",
    "¡Los genios también practican! ¡Vamos!",
    "Tranquilo, ¡la próxima vez será perfecto!"
];


const niveles = [
    {
        mostrar: ["🍎", "🍌", "🍇"],
        opciones: [
            "🍎", "🍌", "🍇",
            "🍏", "🍒", "🍐"
        ],
        cols: 3
    },

    {
        mostrar: ["🐶", "🐱", "🐰", "🦁"],
        opciones: [
            "🐶", "🐱", "🐰", "🦁",
            "🐩", "🐯", "🐈", "🐇"
        ],
        cols: 4
    },

    {
        mostrar: ["🚗", "🚕", "🏎️", "🚙"],
        opciones: [
            "🚗", "🚕", "🏎️", "🚙",
            "🚐", "🚓", "🚎", "🚍"
        ],
        cols: 4
    },

    {
        mostrar: [
            "🎨",
            "🖌️",
            "🖼️",
            "👩‍🎨",
            "🧑‍🎨"
        ],

        opciones: [
            "🎨",
            "🖌️",
            "🖼️",
            "👩‍🎨",
            "🧑‍🎨",
            "🖍️",
            "🧹",
            "📷",
            "👷"
        ],

        cols: 3
    },

    {
        mostrar: [
            "🌅",
            "🌄",
            "🌉",
            "🌌",
            "🌠"
        ],

        opciones: [
            "🌅",
            "🌄",
            "🌉",
            "🌌",
            "🌠",
            "🌇",
            "🏙️",
            "🌃",
            "🌁"
        ],

        cols: 3
    },

    {
        mostrar: [
            "⚽",
            "🏀",
            "🎾",
            "🏐",
            "🥎"
        ],

        opciones: [
            "⚽",
            "🏀",
            "🎾",
            "🏐",
            "🥎",
            "🏉",
            "🎱",
            "🪀",
            "🥏"
        ],

        cols: 3
    },

    {
        mostrar: [
            "🏛️",
            "⛪",
            "🕌",
            "⛩️",
            "🏰"
        ],

        opciones: [
            "🏛️",
            "⛪",
            "🕌",
            "⛩️",
            "🏰",
            "🗼",
            "🏢",
            "🏥",
            "🏫"
        ],

        cols: 3
    },

    {
        mostrar: [
            "🚁",
            "✈️",
            "🚀",
            "🛸",
            "⛵",
            "🚢"
        ],

        opciones: [
            "🚁",
            "✈️",
            "🚀",
            "🛸",
            "⛵",
            "🚢",
            "🚂",
            "🚜",
            "🛩️",
            "🛶"
        ],

        cols: 5
    },

    {
        mostrar: [
            "🐼",
            "🦊",
            "🐯",
            "🐨",
            "🦓",
            "🐘",
            "🦒"
        ],

        opciones: [
            "🐼",
            "🦊",
            "🐯",
            "🐨",
            "🦓",
            "🐘",
            "🦒",
            "🐻",
            "🦝",
            "🐮",
            "🐆"
        ],

        cols: 4
    },

    {
        mostrar: [
            "🍎",
            "🐶",
            "🚗",
            "🌻",
            "👨",
            "⚽",
            "🎨",
            "✈️"
        ],

        opciones: [
            "🍎",
            "🐶",
            "🚗",
            "🌻",
            "👨",
            "⚽",
            "🎨",
            "✈️",
            "🍏",
            "🐩",
            "🚙",
            "🌷",
            "👩",
            "🏉",
            "🖼️",
            "🛩️"
        ],

        cols: 4
    }
];


let nivelActual = 0;
let seleccionados = [];
let timerInterval;
let fase = "instrucciones";

const TIEMPO_MEMORIA = 4000;


// =====================================================
// ELEMENTOS DEL DOM
// =====================================================

const grid = document.getElementById("grid");

const mensaje = document.getElementById("mensaje");

const nivelTexto = document.getElementById("nivel");

const resultado = document.getElementById("resultado");

const btnRow = document.getElementById("btnRow");

const progressContainer =
    document.getElementById("progressContainer");

const progressBar =
    document.getElementById("progressBar");

const confettiContainer =
    document.getElementById("confettiContainer");

const selectorInfo =
    document.getElementById("selectorInfo");

const selCount =
    document.getElementById("selCount");

const selTotal =
    document.getElementById("selTotal");

const gameContainer =
    document.getElementById("gameContainer");

const instructionsOverlay =
    document.getElementById("instructionsOverlay");

const btnJugar =
    document.getElementById("btnJugar");


// =====================================================
// BOTÓN JUGAR
// =====================================================

btnJugar.addEventListener("click", function () {

    instructionsOverlay.classList.add("hidden");

    gameContainer.classList.add("visible");

    fase = "memoria";

    setTimeout(function () {
        mostrarMemoria();
    }, 300);
});


// =====================================================
// MEZCLAR
// =====================================================

function mezclar(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );
}


// =====================================================
// CONFETI
// =====================================================

function lanzarConfetti() {

    const colores = [
        "#F5A0A0",
        "#C5A3D0",
        "#A0C8E0",
        "#A8D8A8",
        "#FFD8A8",
        "#F5C6D0",
        "#B8D8C0"
    ];

    for (let i = 0; i < 55; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        const color =
            colores[
                Math.floor(
                    Math.random() * colores.length
                )
            ];

        const size =
            Math.random() * 10 + 8;

        piece.style.width =
            size + "px";

        piece.style.height =
            size + "px";

        piece.style.background =
            color;

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.borderRadius =
            Math.random() > 0.5
                ? "50%"
                : "2px";

        piece.style.animationDuration =
            Math.random() * 2 + 1.5 + "s";

        piece.style.animationDelay =
            Math.random() * 0.5 + "s";

        confettiContainer.appendChild(piece);

        setTimeout(
            () => piece.remove(),
            4000
        );
    }
}


// =====================================================
// BARRA DE PROGRESO
// =====================================================

function iniciarBarraProgreso() {

    progressContainer.classList.add("active");

    progressBar.style.width = "0%";

    let tiempoTranscurrido = 0;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        tiempoTranscurrido += 50;

        const porcentaje =
            (tiempoTranscurrido / TIEMPO_MEMORIA) * 100;

        progressBar.style.width =
            porcentaje + "%";

        if (
            tiempoTranscurrido >=
            TIEMPO_MEMORIA
        ) {
            clearInterval(timerInterval);
        }

    }, 50);
}


// =====================================================
// LIMPIAR UI
// =====================================================

function limpiarUI() {

    grid.innerHTML = "";

    resultado.textContent = "";

    resultado.className = "";

    btnRow.innerHTML = "";

    selectorInfo.style.display = "none";

    progressContainer.classList.remove("active");
}


// =====================================================
// FASE 1: MEMORIZAR
// =====================================================

function mostrarMemoria() {

    fase = "memoria";

    seleccionados = [];

    limpiarUI();

    const nivel =
        niveles[nivelActual];

    const cols =
        nivel.cols || 4;

    grid.style.gridTemplateColumns =
        "repeat(" + cols + ", 150px)";


    mensaje.style.opacity = 0;

    setTimeout(() => {

        mensaje.textContent =
            "¡Observa con atención! Memoriza estos elementos.";

        mensaje.style.opacity = 1;

    }, 200);


    nivel.mostrar.forEach(
        (item, index) => {

            const card =
                document.createElement("div");

            card.className =
                "card";

            card.textContent =
                item;

            card.style.animationDelay =
                index * 0.1 + "s";

            grid.appendChild(card);
        }
    );


    iniciarBarraProgreso();


    setTimeout(() => {

        progressContainer.classList.remove(
            "active"
        );

        mostrarOpciones();

    }, TIEMPO_MEMORIA);
}


// =====================================================
// FASE 2: SELECCIONAR
// =====================================================

function mostrarOpciones() {

    fase = "seleccion";

    seleccionados = [];

    grid.innerHTML = "";

    resultado.textContent = "";

    resultado.className = "";

    btnRow.innerHTML = "";


    const nivel =
        niveles[nivelActual];

    const totalOpciones =
        nivel.opciones.length;

    const objetivo =
        nivel.mostrar.length;


    let cols;

    if (totalOpciones <= 6) {

        cols = 3;

    } else if (totalOpciones <= 8) {

        cols = 4;

    } else if (totalOpciones <= 10) {

        cols = 5;

    } else {

        cols = 4;
    }


    grid.style.gridTemplateColumns =
        "repeat(" + cols + ", 150px)";


    mensaje.style.opacity = 0;


    setTimeout(() => {

        mensaje.textContent =
            "¡Selecciona los " +
            objetivo +
            " elementos que viste!";

        mensaje.style.opacity = 1;

    }, 200);


    selCount.textContent = "0";

    selTotal.textContent = objetivo;

    selectorInfo.style.display = "flex";


    // BOTÓN VER OTRA VEZ

    const btnVer =
        document.createElement("button");

    btnVer.className =
        "btn-ver";

    btnVer.textContent =
        "Ver otra vez";


    // BOTÓN COMPROBAR

    const btnComprobar =
        document.createElement("button");

    btnComprobar.className =
        "btn-comprobar";

    btnComprobar.textContent =
        "Comprobar";

    btnComprobar.disabled = true;

    btnComprobar.id =
        "btnComprobar";


    btnVer.addEventListener(
        "click",
        mostrarMemoria
    );

    btnComprobar.addEventListener(
        "click",
        comprobar
    );


    btnRow.appendChild(btnVer);

    btnRow.appendChild(btnComprobar);


    // MEZCLAR OPCIONES

    const opciones =
        mezclar(nivel.opciones);


    opciones.forEach(
        (item, index) => {

            const card =
                document.createElement("div");

            card.className =
                "card";

            card.dataset.emoji =
                item;

            card.textContent =
                item;

            card.style.animationDelay =
                index * 0.05 + "s";


            card.addEventListener(
                "click",
                () => {

                    if (
                        fase !== "seleccion"
                    ) {
                        return;
                    }


                    if (
                        card.classList.contains(
                            "selected"
                        )
                    ) {

                        card.classList.remove(
                            "selected"
                        );

                        seleccionados =
                            seleccionados.filter(
                                x => x !== item
                            );

                    } else {

                        card.classList.add(
                            "selected"
                        );

                        seleccionados.push(
                            item
                        );
                    }


                    selCount.textContent =
                        seleccionados.length;


                    const btnComp =
                        document.getElementById(
                            "btnComprobar"
                        );


                    if (btnComp) {

                        btnComp.disabled =
                            seleccionados.length !==
                            objetivo;
                    }

                }
            );


            grid.appendChild(card);
        }
    );
}


// =====================================================
// COMPROBAR
// =====================================================

function comprobar() {

    const nivel =
        niveles[nivelActual];

    const correctos =
        nivel.mostrar;


    const acierto =
        correctos.length ===
            seleccionados.length &&

        correctos.every(
            item =>
                seleccionados.includes(item)
        ) &&

        seleccionados.every(
            item =>
                correctos.includes(item)
        );


    // =================================================
    // RESPUESTA CORRECTA
    // =================================================

    if (acierto) {

        fase = "acierto";


        resultado.textContent =
            mensajesExito[
                Math.floor(
                    Math.random() *
                    mensajesExito.length
                )
            ];

        resultado.className =
            "success";


        lanzarConfetti();


        document
            .querySelectorAll(".card.selected")
            .forEach(card => {

                card.classList.remove(
                    "selected"
                );

                card.classList.add(
                    "correct"
                );
            });


        document
            .querySelectorAll(".card")
            .forEach(card => {

                card.classList.add(
                    "disabled"
                );
            });


        btnRow.innerHTML = "";


        // SIGUIENTE NIVEL

        if (
            nivelActual <
            niveles.length - 1
        ) {

            const btnSiguiente =
                document.createElement(
                    "button"
                );

            btnSiguiente.className =
                "btn-siguiente";

            btnSiguiente.textContent =
                "Siguiente nivel";


            btnSiguiente.addEventListener(
                "click",
                () => {

                    nivelActual++;

                    nivelTexto.textContent =
                        "Nivel " +
                        (nivelActual + 1);

                    mostrarMemoria();
                }
            );


            btnRow.appendChild(
                btnSiguiente
            );


        // JUEGO COMPLETADO

        } else {

            const btnSiguiente =
                document.createElement(
                    "button"
                );

            btnSiguiente.className =
                "btn-siguiente";

            btnSiguiente.textContent =
                "Jugar de nuevo";


            btnSiguiente.addEventListener(
                "click",
                () => {

                    nivelActual = 0;

                    nivelTexto.textContent =
                        "Nivel 1";

                    mostrarMemoria();
                }
            );


            btnRow.appendChild(
                btnSiguiente
            );


            resultado.textContent =
                "¡Completaste todos los niveles! " +
                "¡Tu mente es una maravilla!";

            resultado.className =
                "success";


            lanzarConfetti();

            setTimeout(
                () => lanzarConfetti(),
                800
            );
        }


    // =================================================
    // RESPUESTA INCORRECTA
    // =================================================

    } else {

        fase = "error";


        resultado.textContent =
            mensajesError[
                Math.floor(
                    Math.random() *
                    mensajesError.length
                )
            ];

        resultado.className =
            "error";


        document
            .querySelectorAll(".card.selected")
            .forEach(card => {

                const emoji =
                    card.dataset.emoji;


                if (
                    !correctos.includes(
                        emoji
                    )
                ) {

                    card.classList.remove(
                        "selected"
                    );

                    card.classList.add(
                        "wrong"
                    );
                }
            });


        document
            .querySelectorAll(".card")
            .forEach(card => {

                card.classList.add(
                    "disabled"
                );
            });


        setTimeout(() => {

            resultado.textContent = "";

            resultado.className = "";

            seleccionados = [];

            selCount.textContent = "0";


            document
                .querySelectorAll(".card")
                .forEach(card => {

                    card.classList.remove(
                        "wrong",
                        "selected",
                        "disabled"
                    );
                });


            btnRow.innerHTML = "";


            // VER OTRA VEZ

            const btnVer =
                document.createElement(
                    "button"
                );

            btnVer.className =
                "btn-ver";

            btnVer.textContent =
                "Ver otra vez";

            btnVer.addEventListener(
                "click",
                mostrarMemoria
            );


            // REINTENTAR

            const btnReintentar =
                document.createElement(
                    "button"
                );

            btnReintentar.className =
                "btn-reintentar";

            btnReintentar.textContent =
                "Reintentar";


            btnReintentar.addEventListener(
                "click",
                () => {

                    mostrarOpciones();
                }
            );


            btnRow.appendChild(
                btnVer
            );

            btnRow.appendChild(
                btnReintentar
            );


            fase = "seleccion";

        }, 1500);
    }
}