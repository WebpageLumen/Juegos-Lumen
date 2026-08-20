(function() {
/* =========================================================
   TRADUCCIONES Y DATOS DEL JUEGO POR IDIOMA
========================================================= */
const translations = {
    es: {
        title: "Secuencias lógicas",
        mainTitle: "Secuencias lógicas",
        ruleTitle: "Instrucción",
        levelText: (lvl) => `Nivel ${lvl} de 20`,
        findText: (val) => `Busca: ${val}`,
        findNumberText: (val) => `Busca el número ${val}`,
        finalTitleWin: "🏆 ¡Gran Trabajo!",
        finalSubWin: "Has superado los 20 niveles.",
        finalBtnRestart: "Reiniciar Juego 🔄",
        finalTitleNormal: "⭐ ¡Muy bien!",
        finalSubNormal: (lvl) => `Nivel ${lvl} superado`,
        finalBtnNext: "Siguiente Nivel ➜",
        successMsgs: [
            "¡Excelente!", "¡Lo lograste!", "Tu mente es brillante 💡", "Cada paso te acerca a la meta 🚀",
            "¡Sigue así, vas genial!", "La lógica es tu fuerte 🧠", "¡Perfecto!", "Nunca dejes de aprender 🌟",
            "¡Estás imparable!", "Tu potencial es infinito ✨", "Gran precisión 🎯", "¡Magnífico!"
        ],
        levels: [
            { tipo: "multi", bombillas: 9, objetivo: 3, regla: "Apaga SOLO las estrellas (⭐)", validos: ["⭐", "⭐", "⭐"], distractores: ["🔵", "🔺", "🟡", "🟩", "🔴", "🟠"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 4, regla: "Apaga SOLO los triángulos (🔺)", validos: ["🔺", "🔺", "🔺", "🔺"], distractores: ["⭐", "🔵", "🟡", "🟩", "🔴", "🟠", "🟣"], azules: 0 },
            { tipo: "sequence", bombillas: 9, objetivo: 3, regla: "Apaga en orden de color: 🔴, 🟢, 🔵", secuencia: ["🔴", "🟢", "🔵"], distractores: ["🟡", "🟣", "🟠"], azules: 0 },
            { tipo: "sequence", bombillas: 9, objetivo: 4, regla: "Patrón Espejo: 1, 2, 3, 2", secuencia: ["1", "2", "3", "2"], distractores: ["4", "5", "6"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Apaga las luces con 3 puntos (•••)", validos: ["•••", "•••", "•••"], distractores: ["•", "••", "••••", "•••••"], azules: 0 },
            { tipo: "sequence", bombillas: 12, objetivo: 4, regla: "Cuenta regresiva: 4, 3, 2, 1", secuencia: ["4", "3", "2", "1"], distractores: ["5", "6", "7", "8"], azules: 0 },
            { tipo: "filter_sequence", bombillas: 12, objetivo: 3, regla: "Apaga en orden (1, 2, 3). Ignora las azules", secuencia: ["1", "2", "3"], distractores: ["4", "5", "6"], azules: 3 },
            { tipo: "single", bombillas: 9, objetivo: 1, regla: "Apaga el resultado de 2 + 2", respuesta: "4", distractores: ["2", "3", "5", "1", "6"], azules: 0 },
            { tipo: "single", bombillas: 9, objetivo: 1, regla: "Apaga el resultado de 5 - 3", respuesta: "2", distractores: ["1", "3", "5", "4", "8"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Apaga los números PARES", validos: ["2", "4", "6"], distractores: ["1", "3", "5", "7", "8", "9"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Apaga los números IMPARES", validos: ["1", "3", "5"], distractores: ["2", "4", "6", "8", "9", "7"], azules: 0 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Apaga los números MAYORES que 5", validos: ["6", "7", "8"], distractores: ["1", "2", "3", "4", "5", "9"], azules: 0 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Apaga los números MENORES que 4", validos: ["1", "2", "3"], distractores: ["4", "5", "6", "7", "8", "9"], azules: 0 },
            { tipo: "single", bombillas: 16, objetivo: 1, regla: "Apaga el resultado de 3 x 2", respuesta: "6", distractores: ["1", "4", "5", "9", "8"], azules: 3 },
            { tipo: "sequence", bombillas: 16, objetivo: 4, regla: "Secuencia de 2 en 2: 2, 4, 6, 8", secuencia: ["2", "4", "6", "8"], distractores: ["1", "3", "5", "7"], azules: 0 },
            { tipo: "filter_sequence", bombillas: 16, objetivo: 4, regla: "Cuenta regresiva (4, 3, 2, 1). Ignora azules", secuencia: ["4", "3", "2", "1"], distractores: ["5", "6"], azules: 4 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Apaga los múltiplos de 3 (3, 6, 9)", validos: ["3", "6", "9"], distractores: ["1", "2", "4", "5", "7", "8"], azules: 0 },
            { tipo: "sequence", bombillas: 25, objetivo: 4, regla: "Suma 3 cada vez: 3, 6, 9, 12", secuencia: ["3", "6", "9", "12"], distractores: ["1", "2", "4", "5", "7", "8"], azules: 0 },
            { tipo: "multi", bombillas: 25, objetivo: 4, regla: "Apaga los PARES (2,4,6,8). Ignora azules", validos: ["2", "4", "6", "8"], distractores: ["1", "3", "5", "7", "9"], azules: 6 },
            { tipo: "sequence", bombillas: 25, objetivo: 4, regla: "Cuenta regresiva: 8, 6, 4, 2", secuencia: ["8", "6", "4", "2"], distractores: ["1", "3", "5", "7", "9"], azules: 0 }
        ]
    },
    en: {
        title: "Logical sequences",
        mainTitle: "Logical sequences",
        ruleTitle: "Instruction",
        levelText: (lvl) => `Level ${lvl} of 20`,
        findText: (val) => `Find: ${val}`,
        findNumberText: (val) => `Find the number ${val}`,
        finalTitleWin: "🏆 Great Job!",
        finalSubWin: "You have passed the 20 levels.",
        finalBtnRestart: "Restart Game 🔄",
        finalTitleNormal: "⭐ Very good!",
        finalSubNormal: (lvl) => `Level ${lvl} passed`,
        finalBtnNext: "Next Level ➜",
        successMsgs: [
            "Excellent!", "You did it!", "Your mind is brilliant 💡", "Every step brings you closer 🚀",
            "Keep it up, you're doing great!", "Logic is your strength 🧠", "Perfect!", "Never stop learning 🌟",
            "You're unstoppable!", "Your potential is infinite ✨", "Great precision 🎯", "Magnificent!"
        ],
        levels: [
            { tipo: "multi", bombillas: 9, objetivo: 3, regla: "Turn off ONLY the stars (⭐)", validos: ["⭐", "⭐", "⭐"], distractores: ["🔵", "🔺", "🟡", "🟩", "🔴", "🟠"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 4, regla: "Turn off ONLY the triangles (🔺)", validos: ["🔺", "🔺", "🔺", "🔺"], distractores: ["⭐", "🔵", "🟡", "🟩", "🔴", "🟠", "🟣"], azules: 0 },
            { tipo: "sequence", bombillas: 9, objetivo: 3, regla: "Turn off in color order: 🔴, 🟢, 🔵", secuencia: ["🔴", "🟢", "🔵"], distractores: ["🟡", "🟣", "🟠"], azules: 0 },
            { tipo: "sequence", bombillas: 9, objetivo: 4, regla: "Mirror Pattern: 1, 2, 3, 2", secuencia: ["1", "2", "3", "2"], distractores: ["4", "5", "6"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Turn off lights with 3 dots (•••)", validos: ["•••", "•••", "•••"], distractores: ["•", "••", "••••", "•••••"], azules: 0 },
            { tipo: "sequence", bombillas: 12, objetivo: 4, regla: "Countdown: 4, 3, 2, 1", secuencia: ["4", "3", "2", "1"], distractores: ["5", "6", "7", "8"], azules: 0 },
            { tipo: "filter_sequence", bombillas: 12, objetivo: 3, regla: "Turn off in order (1, 2, 3). Ignore blue ones", secuencia: ["1", "2", "3"], distractores: ["4", "5", "6"], azules: 3 },
            { tipo: "single", bombillas: 9, objetivo: 1, regla: "Turn off the result of 2 + 2", respuesta: "4", distractores: ["2", "3", "5", "1", "6"], azules: 0 },
            { tipo: "single", bombillas: 9, objetivo: 1, regla: "Turn off the result of 5 - 3", respuesta: "2", distractores: ["1", "3", "5", "4", "8"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Turn off EVEN numbers", validos: ["2", "4", "6"], distractores: ["1", "3", "5", "7", "8", "9"], azules: 0 },
            { tipo: "multi", bombillas: 12, objetivo: 3, regla: "Turn off ODD numbers", validos: ["1", "3", "5"], distractores: ["2", "4", "6", "8", "9", "7"], azules: 0 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Turn off numbers GREATER than 5", validos: ["6", "7", "8"], distractores: ["1", "2", "3", "4", "5", "9"], azules: 0 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Turn off numbers LESS than 4", validos: ["1", "2", "3"], distractores: ["4", "5", "6", "7", "8", "9"], azules: 0 },
            { tipo: "single", bombillas: 16, objetivo: 1, regla: "Turn off the result of 3 x 2", respuesta: "6", distractores: ["1", "4", "5", "9", "8"], azules: 3 },
            { tipo: "sequence", bombillas: 16, objetivo: 4, regla: "Sequence of 2 by 2: 2, 4, 6, 8", secuencia: ["2", "4", "6", "8"], distractores: ["1", "3", "5", "7"], azules: 0 },
            { tipo: "filter_sequence", bombillas: 16, objetivo: 4, regla: "Countdown (4, 3, 2, 1). Ignore blue ones", secuencia: ["4", "3", "2", "1"], distractores: ["5", "6"], azules: 4 },
            { tipo: "multi", bombillas: 16, objetivo: 3, regla: "Turn off multiples of 3 (3, 6, 9)", validos: ["3", "6", "9"], distractores: ["1", "2", "4", "5", "7", "8"], azules: 0 },
            { tipo: "sequence", bombillas: 25, objetivo: 4, regla: "Add 3 each time: 3, 6, 9, 12", secuencia: ["3", "6", "9", "12"], distractores: ["1", "2", "4", "5", "7", "8"], azules: 0 },
            { tipo: "multi", bombillas: 25, objetivo: 4, regla: "Turn off EVEN numbers (2,4,6,8). Ignore blue ones", validos: ["2", "4", "6", "8"], distractores: ["1", "3", "5", "7", "9"], azules: 6 },
            { tipo: "sequence", bombillas: 25, objetivo: 4, regla: "Countdown: 8, 6, 4, 2", secuencia: ["8", "6", "4", "2"], distractores: ["1", "3", "5", "7", "9"], azules: 0 }
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
    setText("mainTitle", t.mainTitle);
    setText("ruleTitle", t.ruleTitle);

    const langEsBtn = document.getElementById("langEs");
    const langEnBtn = document.getElementById("langEn");
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");

    // Reiniciar el nivel actual para aplicar las nuevas reglas e instrucciones
    if (typeof nivelActual !== 'undefined') {
        iniciarNivel();
    }
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
   LÓGICA ORIGINAL DEL JUEGO
========================================================= */

let nivelActual = 0;
let apagadas = 0;
let pasoActualSecuencia = 0;
let efectosActivos = true;

const tablero = document.getElementById("tablero");
const progreso = document.getElementById("progreso");
const nivelTxt = document.getElementById("nivelTxt");
const reglaTxt = document.getElementById("reglaTxt");
const iconosProgreso = document.getElementById("iconosProgreso");
const final = document.getElementById("final");
const mensajeFinal = document.getElementById("mensajeFinal");
const subMensajeFinal = document.getElementById("subMensajeFinal");
const btnSiguiente = document.getElementById("btnSiguiente");
const divMensajeAcierto = document.getElementById("mensajeAcierto");

function iniciarNivel() {
    tablero.innerHTML = "";
    apagadas = 0;
    pasoActualSecuencia = 0;

    const nivel = t.levels[nivelActual];

    nivelTxt.textContent = t.levelText(nivelActual + 1);
    reglaTxt.textContent = nivel.regla;

    let iconos = "";
    for (let i = 0; i < nivel.objetivo; i++) iconos += "☆ ";
    iconosProgreso.textContent = iconos;
    progreso.style.width = "0%";

    const columnas = Math.ceil(Math.sqrt(nivel.bombillas));
    tablero.style.gridTemplateColumns = `repeat(${columnas}, var(--bulb-size))`;

    let elementosEnTablero = [];

    if (nivel.tipo === "multi" && nivel.validos) {
        elementosEnTablero.push(...nivel.validos);
    } else if ((nivel.tipo === "sequence" || nivel.tipo === "filter_sequence") && nivel.secuencia) {
        elementosEnTablero.push(...nivel.secuencia);
    } else if (nivel.tipo === "single" && nivel.respuesta) {
        elementosEnTablero.push(nivel.respuesta);
    }

    if (nivel.distractores) {
        elementosEnTablero.push(...nivel.distractores);
    }

    const espaciosVacios = nivel.bombillas - elementosEnTablero.length - nivel.azules;

    for (let i = 0; i < espaciosVacios; i++) {
        elementosEnTablero.push("•");
    }

    elementosEnTablero.sort(() => Math.random() - 0.5);

    let indiceElemento = 0;

    for (let i = 0; i < nivel.bombillas; i++) {
        const luz = document.createElement("div");
        luz.className = "bombilla";

        if (i < nivel.azules) {
            luz.classList.add("encendida", "azul");
            luz.textContent = "";
        } else {
            luz.classList.add("encendida");
            luz.textContent = elementosEnTablero[indiceElemento];
            indiceElemento++;
        }

        luz.addEventListener("click", () => manejarClick(luz));
        tablero.appendChild(luz);
    }
}

function manejarClick(luz) {
    if (!luz.classList.contains("encendida")) return;

    const nivel = t.levels[nivelActual];
    let esValido = false;

    if (luz.classList.contains("azul")) {
        esValido = false;
    } else {
        const valorLuz = luz.textContent;

        if (nivel.tipo === "multi") {
            if (nivel.validos.includes(valorLuz)) esValido = true;
        } else if (nivel.tipo === "sequence" || nivel.tipo === "filter_sequence") {
            if (valorLuz === nivel.secuencia[pasoActualSecuencia]) {
                esValido = true;
                pasoActualSecuencia++;
            }
        } else if (nivel.tipo === "single") {
            if (valorLuz === nivel.respuesta) esValido = true;
        }
    }

    if (esValido) {
        luz.classList.remove("encendida");
        luz.textContent = "";
        apagadas++;

        mostrarMensajeAcierto();
        actualizarProgreso(nivel);

        if (apagadas >= nivel.objetivo) {
            setTimeout(completarNivel, 900);
        }
    } else {
        luz.classList.add("wiggle");
        setTimeout(() => luz.classList.remove("wiggle"), 400);
    }
}

function mostrarMensajeAcierto() {
    const mensajeRandom = t.successMsgs[Math.floor(Math.random() * t.successMsgs.length)];
    divMensajeAcierto.textContent = mensajeRandom;
    divMensajeAcierto.classList.remove("animar");
    void divMensajeAcierto.offsetWidth;
    divMensajeAcierto.classList.add("animar");
}

function actualizarProgreso(nivel) {
    progreso.style.width = (apagadas / nivel.objetivo) * 100 + "%";

    let iconos = "";
    for (let i = 0; i < nivel.objetivo; i++) {
        iconos += i < apagadas ? "⭐ " : "☆ ";
    }
    iconosProgreso.textContent = iconos;

    if ((nivel.tipo === "sequence" || nivel.tipo === "filter_sequence") && apagadas < nivel.objetivo) {
        const siguiente = nivel.secuencia[pasoActualSecuencia];
        if (isNaN(siguiente)) {
            reglaTxt.textContent = t.findText(siguiente);
        } else {
            reglaTxt.textContent = t.findNumberText(siguiente);
        }
    }
}

function completarNivel() {
    if (efectosActivos) crearConfeti();

    if (nivelActual === t.levels.length - 1) {
        mensajeFinal.textContent = t.finalTitleWin;
        subMensajeFinal.textContent = t.finalSubWin;
        btnSiguiente.textContent = t.finalBtnRestart;
    } else {
        mensajeFinal.textContent = t.finalTitleNormal;
        subMensajeFinal.textContent = t.finalSubNormal(nivelActual + 1);
        btnSiguiente.textContent = t.finalBtnNext;
    }

    final.style.display = "flex";
}

function siguienteNivel() {
    final.style.display = "none";

    if (nivelActual === t.levels.length - 1) {
        nivelActual = 0;
    } else {
        nivelActual++;
    }

    iniciarNivel();
}

function crearConfeti() {
    const colores = ["#f8a4b8", "#b8d4f8", "#c8f0d0", "#fff8e1", "#e8d8f8", "#f8d8a4"];

    for (let i = 0; i < 60; i++) {
        const c = document.createElement("div");
        c.className = "confeti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colores[Math.floor(Math.random() * colores.length)];
        c.style.animationDuration = (3 + Math.random() * 2) + "s";
        c.style.width = (10 + Math.random() * 8) + "px";
        c.style.height = c.style.width;
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5000);
    }
}

btnSiguiente.addEventListener("click", siguienteNivel);

/* =========================================================
   INICIAR IDIOMA Y JUEGO
========================================================= */
changeLanguage(currentLang); // Llama a iniciarNivel internamente

})();