// =====================================================
// CONFIGURACIÓN DE LOS 20 NIVELES
// =====================================================

const niveles = [

    // =========================
    // FASE 1
    // =========================

    {
        tipo: "multi",
        bombillas: 9,
        objetivo: 3,
        regla: "Apaga SOLO las estrellas (⭐)",
        validos: ["⭐", "⭐", "⭐"],
        distractores: ["🔵", "🔺", "🟡", "🟩", "🔴", "🟠"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 12,
        objetivo: 4,
        regla: "Apaga SOLO los triángulos (🔺)",
        validos: ["🔺", "🔺", "🔺", "🔺"],
        distractores: ["⭐", "🔵", "🟡", "🟩", "🔴", "🟠", "🟣"],
        azules: 0
    },

    {
        tipo: "sequence",
        bombillas: 9,
        objetivo: 3,
        regla: "Apaga en orden de color: 🔴, 🟢, 🔵",
        secuencia: ["🔴", "🟢", "🔵"],
        distractores: ["🟡", "🟣", "🟠"],
        azules: 0
    },


    // =========================
    // FASE 2
    // =========================

    {
        tipo: "sequence",
        bombillas: 9,
        objetivo: 4,
        regla: "Patrón Espejo: 1, 2, 3, 2",
        secuencia: ["1", "2", "3", "2"],
        distractores: ["4", "5", "6"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 12,
        objetivo: 3,
        regla: "Apaga las luces con 3 puntos (•••)",
        validos: ["•••", "•••", "•••"],
        distractores: ["•", "••", "••••", "•••••"],
        azules: 0
    },

    {
        tipo: "sequence",
        bombillas: 12,
        objetivo: 4,
        regla: "Cuenta regresiva: 4, 3, 2, 1",
        secuencia: ["4", "3", "2", "1"],
        distractores: ["5", "6", "7", "8"],
        azules: 0
    },

    {
        tipo: "filter_sequence",
        bombillas: 12,
        objetivo: 3,
        regla: "Apaga en orden (1, 2, 3). Ignora las azules",
        secuencia: ["1", "2", "3"],
        distractores: ["4", "5", "6"],
        azules: 3
    },


    // =========================
    // FASE 3
    // =========================

    {
        tipo: "single",
        bombillas: 9,
        objetivo: 1,
        regla: "Apaga el resultado de 2 + 2",
        respuesta: "4",
        distractores: ["2", "3", "5", "1", "6"],
        azules: 0
    },

    {
        tipo: "single",
        bombillas: 9,
        objetivo: 1,
        regla: "Apaga el resultado de 5 - 3",
        respuesta: "2",
        distractores: ["1", "3", "5", "4", "8"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 12,
        objetivo: 3,
        regla: "Apaga los números PARES",
        validos: ["2", "4", "6"],
        distractores: ["1", "3", "5", "7", "8", "9"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 12,
        objetivo: 3,
        regla: "Apaga los números IMPARES",
        validos: ["1", "3", "5"],
        distractores: ["2", "4", "6", "8", "9", "7"],
        azules: 0
    },


    // =========================
    // FASE 4
    // =========================

    {
        tipo: "multi",
        bombillas: 16,
        objetivo: 3,
        regla: "Apaga los números MAYORES que 5",
        validos: ["6", "7", "8"],
        distractores: ["1", "2", "3", "4", "5", "9"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 16,
        objetivo: 3,
        regla: "Apaga los números MENORES que 4",
        validos: ["1", "2", "3"],
        distractores: ["4", "5", "6", "7", "8", "9"],
        azules: 0
    },

    {
        tipo: "single",
        bombillas: 16,
        objetivo: 1,
        regla: "Apaga el resultado de 3 x 2",
        respuesta: "6",
        distractores: ["1", "4", "5", "9", "8"],
        azules: 3
    },

    {
        tipo: "sequence",
        bombillas: 16,
        objetivo: 4,
        regla: "Secuencia de 2 en 2: 2, 4, 6, 8",
        secuencia: ["2", "4", "6", "8"],
        distractores: ["1", "3", "5", "7"],
        azules: 0
    },


    // =========================
    // FASE 5
    // =========================

    {
        tipo: "filter_sequence",
        bombillas: 16,
        objetivo: 4,
        regla: "Cuenta regresiva (4, 3, 2, 1). Ignora azules",
        secuencia: ["4", "3", "2", "1"],
        distractores: ["5", "6"],
        azules: 4
    },

    {
        tipo: "multi",
        bombillas: 16,
        objetivo: 3,
        regla: "Apaga los múltiplos de 3 (3, 6, 9)",
        validos: ["3", "6", "9"],
        distractores: ["1", "2", "4", "5", "7", "8"],
        azules: 0
    },

    {
        tipo: "sequence",
        bombillas: 25,
        objetivo: 4,
        regla: "Suma 3 cada vez: 3, 6, 9, 12",
        secuencia: ["3", "6", "9", "12"],
        distractores: ["1", "2", "4", "5", "7", "8"],
        azules: 0
    },

    {
        tipo: "multi",
        bombillas: 25,
        objetivo: 4,
        regla: "Apaga los PARES (2,4,6,8). Ignora azules",
        validos: ["2", "4", "6", "8"],
        distractores: ["1", "3", "5", "7", "9"],
        azules: 6
    }
];


// =====================================================
// MENSAJES
// =====================================================

const mensajesAcierto = [
    "¡Excelente!",
    "¡Lo lograste!",
    "Tu mente es brillante 💡",
    "Cada paso te acerca a la meta 🚀",
    "¡Sigue así, vas genial!",
    "La lógica es tu fuerte 🧠",
    "¡Perfecto!",
    "Nunca dejes de aprender 🌟",
    "¡Estás imparable!",
    "Tu potencial es infinito ✨",
    "Gran precisión 🎯",
    "¡Magnífico!"
];


// =====================================================
// VARIABLES DEL JUEGO
// =====================================================

let nivelActual = 0;
let apagadas = 0;
let pasoActualSecuencia = 0;
let efectosActivos = true;


// =====================================================
// ELEMENTOS DEL DOM
// =====================================================

const tablero = document.getElementById("tablero");

const progreso = document.getElementById("progreso");

const nivelTxt = document.getElementById("nivelTxt");

const reglaTxt = document.getElementById("reglaTxt");

const iconosProgreso =
    document.getElementById("iconosProgreso");

const final =
    document.getElementById("final");

const mensajeFinal =
    document.getElementById("mensajeFinal");

const subMensajeFinal =
    document.getElementById("subMensajeFinal");

const btnSiguiente =
    document.getElementById("btnSiguiente");

const divMensajeAcierto =
    document.getElementById("mensajeAcierto");


// =====================================================
// INICIAR NIVEL
// =====================================================

function iniciarNivel() {

    tablero.innerHTML = "";

    apagadas = 0;

    pasoActualSecuencia = 0;

    const nivel = niveles[nivelActual];

    nivelTxt.textContent =
        `Nivel ${nivelActual + 1} de 20`;

    reglaTxt.textContent =
        nivel.regla;


    // Crear estrellas de progreso

    let iconos = "";

    for (let i = 0; i < nivel.objetivo; i++) {
        iconos += "☆ ";
    }

    iconosProgreso.textContent = iconos;

    progreso.style.width = "0%";


    // Calcular columnas

    const columnas =
        Math.ceil(Math.sqrt(nivel.bombillas));

    tablero.style.gridTemplateColumns =
        `repeat(${columnas}, var(--bulb-size))`;


    // Crear elementos

    let elementosEnTablero = [];


    if (
        nivel.tipo === "multi" &&
        nivel.validos
    ) {

        elementosEnTablero.push(
            ...nivel.validos
        );

    }

    else if (
        (
            nivel.tipo === "sequence" ||
            nivel.tipo === "filter_sequence"
        ) &&
        nivel.secuencia
    ) {

        elementosEnTablero.push(
            ...nivel.secuencia
        );

    }

    else if (
        nivel.tipo === "single" &&
        nivel.respuesta
    ) {

        elementosEnTablero.push(
            nivel.respuesta
        );
    }


    if (nivel.distractores) {

        elementosEnTablero.push(
            ...nivel.distractores
        );
    }


    // Rellenar espacios vacíos

    const espaciosVacios =
        nivel.bombillas -
        elementosEnTablero.length -
        nivel.azules;


    for (
        let i = 0;
        i < espaciosVacios;
        i++
    ) {

        elementosEnTablero.push("•");
    }


    // Mezclar elementos

    elementosEnTablero.sort(
        () => Math.random() - 0.5
    );


    let indiceElemento = 0;


    // Crear bombillas

    for (
        let i = 0;
        i < nivel.bombillas;
        i++
    ) {

        const luz =
            document.createElement("div");

        luz.className = "bombilla";


        if (i < nivel.azules) {

            luz.classList.add(
                "encendida",
                "azul"
            );

            luz.textContent = "";

        } else {

            luz.classList.add(
                "encendida"
            );

            luz.textContent =
                elementosEnTablero[
                    indiceElemento
                ];

            indiceElemento++;
        }


        luz.addEventListener(
            "click",
            () => manejarClick(luz)
        );


        tablero.appendChild(luz);
    }
}


// =====================================================
// MANEJAR CLICK
// =====================================================

function manejarClick(luz) {

    if (
        !luz.classList.contains("encendida")
    ) {
        return;
    }


    const nivel =
        niveles[nivelActual];

    let esValido = false;


    // Bombilla azul

    if (
        luz.classList.contains("azul")
    ) {

        esValido = false;

    }

    else {

        const valorLuz =
            luz.textContent;


        // Tipo MULTI

        if (nivel.tipo === "multi") {

            if (
                nivel.validos.includes(
                    valorLuz
                )
            ) {

                esValido = true;
            }
        }


        // Tipo SEQUENCE

        else if (
            nivel.tipo === "sequence" ||
            nivel.tipo === "filter_sequence"
        ) {

            if (
                valorLuz ===
                nivel.secuencia[
                    pasoActualSecuencia
                ]
            ) {

                esValido = true;

                pasoActualSecuencia++;
            }
        }


        // Tipo SINGLE

        else if (
            nivel.tipo === "single"
        ) {

            if (
                valorLuz ===
                nivel.respuesta
            ) {

                esValido = true;
            }
        }
    }


    // Respuesta correcta

    if (esValido) {

        luz.classList.remove(
            "encendida"
        );

        luz.textContent = "";

        apagadas++;


        mostrarMensajeAcierto();

        actualizarProgreso(nivel);


        if (
            apagadas >= nivel.objetivo
        ) {

            setTimeout(
                completarNivel,
                900
            );
        }

    }

    // Respuesta incorrecta

    else {

        luz.classList.add("wiggle");

        setTimeout(() => {

            luz.classList.remove(
                "wiggle"
            );

        }, 400);
    }
}


// =====================================================
// MENSAJE DE ACIERTO
// =====================================================

function mostrarMensajeAcierto() {

    const mensajeRandom =
        mensajesAcierto[
            Math.floor(
                Math.random() *
                mensajesAcierto.length
            )
        ];


    divMensajeAcierto.textContent =
        mensajeRandom;


    divMensajeAcierto.classList.remove(
        "animar"
    );


    void divMensajeAcierto.offsetWidth;


    divMensajeAcierto.classList.add(
        "animar"
    );
}


// =====================================================
// ACTUALIZAR PROGRESO
// =====================================================

function actualizarProgreso(nivel) {

    progreso.style.width =
        (apagadas / nivel.objetivo) * 100 +
        "%";


    let iconos = "";


    for (
        let i = 0;
        i < nivel.objetivo;
        i++
    ) {

        iconos +=
            i < apagadas
                ? "⭐ "
                : "☆ ";
    }


    iconosProgreso.textContent =
        iconos;


    // Actualizar instrucción
    // en secuencias

    if (
        (
            nivel.tipo === "sequence" ||
            nivel.tipo === "filter_sequence"
        ) &&
        apagadas < nivel.objetivo
    ) {

        const siguiente =
            nivel.secuencia[
                pasoActualSecuencia
            ];


        if (isNaN(siguiente)) {

            reglaTxt.textContent =
                `Busca: ${siguiente}`;

        } else {

            reglaTxt.textContent =
                `Busca el número ${siguiente}`;
        }
    }
}


// =====================================================
// COMPLETAR NIVEL
// =====================================================

function completarNivel() {

    if (efectosActivos) {
        crearConfeti();
    }


    // Último nivel

    if (
        nivelActual ===
        niveles.length - 1
    ) {

        mensajeFinal.textContent =
            "🏆 ¡Gran Trabajo!";


        subMensajeFinal.textContent =
            "Has superado los 20 niveles.";


        btnSiguiente.textContent =
            "Reiniciar Juego 🔄";

    }

    // Nivel normal

    else {

        mensajeFinal.textContent =
            "⭐ ¡Muy bien!";


        subMensajeFinal.textContent =
            `Nivel ${nivelActual + 1} superado`;


        btnSiguiente.textContent =
            "Siguiente Nivel ➜";
    }


    final.style.display = "flex";
}


// =====================================================
// SIGUIENTE NIVEL
// =====================================================

function siguienteNivel() {

    final.style.display = "none";


    if (
        nivelActual ===
        niveles.length - 1
    ) {

        nivelActual = 0;

    } else {

        nivelActual++;
    }


    iniciarNivel();
}


// =====================================================
// CONFETI
// =====================================================

function crearConfeti() {

    const colores = [
        "#f8a4b8",
        "#b8d4f8",
        "#c8f0d0",
        "#fff8e1",
        "#e8d8f8",
        "#f8d8a4"
    ];


    for (let i = 0; i < 60; i++) {

        const c =
            document.createElement("div");


        c.className = "confeti";


        c.style.left =
            Math.random() * 100 + "vw";


        c.style.background =
            colores[
                Math.floor(
                    Math.random() *
                    colores.length
                )
            ];


        c.style.animationDuration =
            (3 + Math.random() * 2) +
            "s";


        c.style.width =
            (10 + Math.random() * 8) +
            "px";


        c.style.height =
            c.style.width;


        document.body.appendChild(c);


        setTimeout(() => {

            c.remove();

        }, 5000);
    }
}


// =====================================================
// BOTÓN SIGUIENTE
// =====================================================

btnSiguiente.addEventListener(
    "click",
    siguienteNivel
);


// =====================================================
// INICIAR JUEGO
// =====================================================

iniciarNivel();