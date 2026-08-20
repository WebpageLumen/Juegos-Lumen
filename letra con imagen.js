(function() {
/* =========================================================
   TRADUCCIONES Y BANCO DE PALABRAS POR IDIOMA
========================================================= */
const translations = {
    es: {
        title: "Empareja la letra con la imagen",
        roundText: (ronda) => `Ronda ${ronda} de 10`,
        correctMsg: "🎉 ¡Muy bien!",
        incorrectMsg: "💫 Intenta otra vez",
        finalText: "¡Excelente!",
        restartBtn: "Volver a jugar",
        bank: [
            { letra: "A", emoji: "🌳" }, // Árbol
            { letra: "B", emoji: "🚢" }, // Barco
            { letra: "C", emoji: "🏠" }, // Casa
            { letra: "D", emoji: "🎲" }, // Dado
            { letra: "E", emoji: "🐘" }, // Elefante
            { letra: "F", emoji: "🍓" }, // Fresa
            { letra: "G", emoji: "🐱" }, // Gato
            { letra: "H", emoji: "🧊" }, // Hielo
            { letra: "I", emoji: "🏝️" }, // Isla
            { letra: "J", emoji: "🦒" }, // Jirafa
            { letra: "K", emoji: "🥝" }, // Kiwi
            { letra: "L", emoji: "🦁" }, // León
            { letra: "M", emoji: "🍎" }, // Manzana
            { letra: "N", emoji: "☁️" }, // Nube
            { letra: "O", emoji: "🐻" }, // Oso
            { letra: "P", emoji: "🐶" }, // Perro
            { letra: "Q", emoji: "🧀" }, // Queso
            { letra: "R", emoji: "🤖" }, // Robot
            { letra: "S", emoji: "☀️" }, // Sol
            { letra: "T", emoji: "🐢" }, // Tortuga
            { letra: "U", emoji: "🍇" }, // Uva
            { letra: "V", emoji: "🐄" }, // Vaca
            { letra: "W", emoji: "🌐" }, // Web
            { letra: "X", emoji: "❌" }, // Equis
            { letra: "Y", emoji: "🪀" }, // Yoyó
            { letra: "Z", emoji: "🦊" }  // Zorro
        ]
    },
    en: {
        title: "Match the letter with the image",
        roundText: (ronda) => `Round ${ronda} of 10`,
        correctMsg: "🎉 Very good!",
        incorrectMsg: "💫 Try again",
        finalText: "Excellent!",
        restartBtn: "Play again",
        bank: [
            { letra: "A", emoji: "🍎" }, // Apple
            { letra: "B", emoji: "🚢" }, // Boat
            { letra: "C", emoji: "🐱" }, // Cat
            { letra: "D", emoji: "🐕" }, // Dog
            { letra: "E", emoji: "🐘" }, // Elephant
            { letra: "F", emoji: "🐟" }, // Fish
            { letra: "G", emoji: "🍇" }, // Grapes
            { letra: "H", emoji: "🏠" }, // House
            { letra: "I", emoji: "🏝️" }, // Island
            { letra: "J", emoji: "🧃" }, // Juice
            { letra: "K", emoji: "🥝" }, // Kiwi
            { letra: "L", emoji: "🦁" }, // Lion
            { letra: "M", emoji: "🐵" }, // Monkey
            { letra: "N", emoji: "🥜" }, // Nut
            { letra: "O", emoji: "🐙" }, // Octopus
            { letra: "P", emoji: "🐧" }, // Penguin
            { letra: "Q", emoji: "👸" }, // Queen
            { letra: "R", emoji: "🌹" }, // Rose
            { letra: "S", emoji: "⭐" }, // Star
            { letra: "T", emoji: "🌳" }, // Tree
            { letra: "U", emoji: "🌂" }, // Umbrella
            { letra: "V", emoji: "🎻" }, // Violin
            { letra: "W", emoji: "🍉" }, // Watermelon
            { letra: "X", emoji: "❌" }, // X
            { letra: "Y", emoji: "🪀" }, // Yoyo
            { letra: "Z", emoji: "🦓" }  // Zebra
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
    setText("titleText", t.title);
    setText("finalTexto", t.finalText);
    setText("reiniciarBtn", t.restartBtn);

    const langEsBtn = document.getElementById("langEs");
    const langEnBtn = document.getElementById("langEn");
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");

    // Reiniciar el juego con el nuevo idioma para que las letras coincidan
    reiniciarJuego();
}

// Configurar menú de ajustes
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
        const isVisible = settingsMenu.style.display === "flex";
        settingsMenu.style.display = isVisible ? "none" : "flex";
    });
}
if (document.getElementById("langEs")) {
    document.getElementById("langEs").addEventListener("click", () => {
        changeLanguage("es");
        settingsMenu.style.display = "none";
    });
}
if (document.getElementById("langEn")) {
    document.getElementById("langEn").addEventListener("click", () => {
        changeLanguage("en");
        settingsMenu.style.display = "none";
    });
}


/* =========================================================
   LÓGICA ORIGINAL DEL JUEGO
========================================================= */

/* ===== DECORACIÓN DEL PAISAJE ===== */
const paisaje = document.getElementById("paisaje");

for (let i = 0; i < 50; i++) {
    const estrella = document.createElement("div");
    estrella.className = "estrella";
    estrella.style.left = Math.random() * 100 + "%";
    estrella.style.top = Math.random() * 48 + "%";
    estrella.style.animationDelay = Math.random() * 2 + "s";
    estrella.style.animationDuration = (1.5 + Math.random() * 2.5) + "s";
    const size = 2 + Math.random() * 3;
    estrella.style.width = size + "px";
    estrella.style.height = size + "px";
    paisaje.appendChild(estrella);
}

for (let i = 0; i < 18; i++) {
    const luciernaga = document.createElement("div");
    luciernaga.className = "luciernaga";
    luciernaga.style.left = Math.random() * 100 + "%";
    luciernaga.style.top = (25 + Math.random() * 55) + "%";
    luciernaga.style.animationDelay = Math.random() * 6 + "s";
    luciernaga.style.animationDuration = (5 + Math.random() * 5) + "s";
    paisaje.appendChild(luciernaga);
}

for (let i = 0; i < 12; i++) {
    const particula = document.createElement("div");
    particula.className = "particula-ui";
    particula.style.left = Math.random() * 100 + "%";
    particula.style.animationDelay = Math.random() * 8 + "s";
    particula.style.animationDuration = (8 + Math.random() * 6) + "s";
    const colors = ["rgba(45,212,191,.4)", "rgba(94,234,212,.3)", "rgba(251,191,36,.3)", "rgba(153,246,228,.3)"];
    particula.style.background = colors[Math.floor(Math.random() * colors.length)];
    const size = 3 + Math.random() * 4;
    particula.style.width = size + "px";
    particula.style.height = size + "px";
    document.body.appendChild(particula);
}

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    paisaje.style.transform = `translate(${x}px, ${y}px)`;
});


/* ===== LÓGICA DEL JUEGO ===== */

let bancoDisponible = [];
let setJuego = [];
let ronda = 0;
let bloqueado = false;

function mezclar(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function prepararNuevaPartida() {
    if (bancoDisponible.length < 10) {
        bancoDisponible = mezclar([...t.bank]);
    }
    setJuego = bancoDisponible.splice(0, 10);
    ronda = 0;
}

function crearConfetti(x, y) {
    const container = document.createElement("div");
    container.className = "confetti-container";
    container.style.left = x + "px";
    container.style.top = y + "px";

    const colors = ["#fbbf24", "#2dd4bf", "#14b8a6", "#f59e0b", "#5eead4", "#ef4444", "#8b5cf6", "#ec4899", "#22d3ee"];

    for (let i = 0; i < 30; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        const color = colors[Math.floor(Math.random() * colors.length)];
        piece.style.background = color;

        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 180;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist - 60;

        piece.style.setProperty("--tx", tx + "px");
        piece.style.setProperty("--ty", ty + "px");
        piece.style.setProperty("--rot", (360 + Math.random() * 720) + "deg");

        const size = 6 + Math.random() * 8;
        piece.style.width = size + "px";
        piece.style.height = size * (.4 + Math.random() * .6) + "px";

        if (Math.random() > .5) piece.style.borderRadius = "50%";

        piece.style.animationDuration = (.8 + Math.random() * .8) + "s";
        piece.style.animationDelay = Math.random() * .15 + "s";

        container.appendChild(piece);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2200);
}

function crearRipple(el, e) {
    const rect = el.getBoundingClientRect();
    const ripple = document.createElement("div");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function mostrarRonda() {
    if (ronda >= 10) {
        document.getElementById("juego").style.display = "none";
        document.getElementById("pantallaFinal").style.display = "block";
        document.getElementById("finalTexto").textContent = t.finalText;

        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                crearConfetti(
                    100 + Math.random() * (window.innerWidth - 200),
                    50 + Math.random() * (window.innerHeight * .4)
                );
            }, i * 250);
        }
        return;
    }

    bloqueado = false;

    const msgEl = document.getElementById("mensaje");
    msgEl.innerHTML = "";
    msgEl.className = "";

    const letraEl = document.getElementById("letra");
    letraEl.innerHTML = setJuego[ronda].letra;
    letraEl.classList.remove("letra-entra");
    void letraEl.offsetHeight;
    letraEl.classList.add("letra-entra");

    document.getElementById("progreso").innerHTML = t.roundText(ronda + 1);
    document.getElementById("barraRelleno").style.width = (ronda / 10 * 100) + "%";

    const correcta = setJuego[ronda];
    const extras = mezclar(t.bank.filter(x => x.letra !== correcta.letra)).slice(0, 2);
    const opciones = mezclar([correcta, ...extras]);

    const cont = document.getElementById("opciones");
    cont.innerHTML = "";

    opciones.forEach((op, idx) => {
        const div = document.createElement("div");
        div.className = "opcion";
        div.innerHTML = op.emoji;
        div.style.animationDelay = (idx * 0.12 + 0.08) + "s";

        div.addEventListener("click", (e) => verificar(op.letra, div, e));
        cont.appendChild(div);
    });
}

function verificar(letra, elemento, e) {
    if (bloqueado) return;
    crearRipple(elemento, e);

    const msgEl = document.getElementById("mensaje");

    if (letra === setJuego[ronda].letra) {
        bloqueado = true;
        elemento.classList.add("correcta");
        msgEl.innerHTML = t.correctMsg;
        msgEl.className = "mensaje-correcto";

        document.getElementById("barraRelleno").style.width = ((ronda + 1) / 10 * 100) + "%";

        const rect = elemento.getBoundingClientRect();
        crearConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);

        setTimeout(() => {
            ronda++;
            mostrarRonda();
        }, 1300);

    } else {
        elemento.classList.add("incorrecta");
        msgEl.innerHTML = t.incorrectMsg;
        msgEl.className = "mensaje-intentar";

        setTimeout(() => elemento.classList.remove("incorrecta"), 550);
    }
}

function reiniciarJuego() {
    document.getElementById("pantallaFinal").style.display = "none";
    document.getElementById("juego").style.display = "block";
    document.getElementById("barraRelleno").style.width = "0%";
    
    bancoDisponible = mezclar([...t.bank]); // Mezclar el banco del idioma actual
    prepararNuevaPartida();
    mostrarRonda();
}

document.getElementById("reiniciarBtn").addEventListener("click", reiniciarJuego);

/* =========================================================
   INICIAR IDIOMA Y JUEGO
========================================================= */
changeLanguage(currentLang); // Esto ejecutará reiniciarJuego() internamente al inicio

})();