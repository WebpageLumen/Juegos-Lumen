/* =========================================================
   DECORACIÓN DEL PAISAJE
   ========================================================= */

const paisaje = document.getElementById("paisaje");

/* ===== ESTRELLAS ===== */

for (let i = 0; i < 50; i++) {

    const estrella = document.createElement("div");

    estrella.className = "estrella";

    estrella.style.left =
        Math.random() * 100 + "%";

    estrella.style.top =
        Math.random() * 48 + "%";

    estrella.style.animationDelay =
        Math.random() * 2 + "s";

    estrella.style.animationDuration =
        (1.5 + Math.random() * 2.5) + "s";

    const size =
        2 + Math.random() * 3;

    estrella.style.width = size + "px";
    estrella.style.height = size + "px";

    paisaje.appendChild(estrella);
}


/* ===== LUCIÉRNAGAS ===== */

for (let i = 0; i < 18; i++) {

    const luciernaga =
        document.createElement("div");

    luciernaga.className = "luciernaga";

    luciernaga.style.left =
        Math.random() * 100 + "%";

    luciernaga.style.top =
        (25 + Math.random() * 55) + "%";

    luciernaga.style.animationDelay =
        Math.random() * 6 + "s";

    luciernaga.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    paisaje.appendChild(luciernaga);
}


/* ===== PARTÍCULAS FLOTANTES ===== */

for (let i = 0; i < 12; i++) {

    const particula =
        document.createElement("div");

    particula.className = "particula-ui";

    particula.style.left =
        Math.random() * 100 + "%";

    particula.style.animationDelay =
        Math.random() * 8 + "s";

    particula.style.animationDuration =
        (8 + Math.random() * 6) + "s";

    const colors = [
        "rgba(45,212,191,.4)",
        "rgba(94,234,212,.3)",
        "rgba(251,191,36,.3)",
        "rgba(153,246,228,.3)"
    ];

    particula.style.background =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    const size =
        3 + Math.random() * 4;

    particula.style.width =
        size + "px";

    particula.style.height =
        size + "px";

    document.body.appendChild(particula);
}


/* ===== PARALLAX CON RATÓN ===== */

document.addEventListener("mousemove", (e) => {

    const x =
        (e.clientX / window.innerWidth - 0.5) * 15;

    const y =
        (e.clientY / window.innerHeight - 0.5) * 8;

    paisaje.style.transform =
        `translate(${x}px, ${y}px)`;
});


/* =========================================================
   LÓGICA DEL JUEGO
   ========================================================= */

const bancoOriginal = [

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
    { letra: "N", emoji: "☁️" }, // Nube (Corregido)
    { letra: "O", emoji: "🐻" }, // Oso
    { letra: "P", emoji: "🐶" }, // Perro
    { letra: "Q", emoji: "🧀" }, // Queso
    { letra: "R", emoji: "🤖" }, // Robot
    { letra: "S", emoji: "☀️" }, // Sol
    { letra: "T", emoji: "🐢" }, // Tortuga
    { letra: "U", emoji: "🍇" }, // Uva
    { letra: "V", emoji: "🐄" }, // Vaca
    { letra: "W", emoji: "🌐" }, // Web (Corregido)
    { letra: "X", emoji: "❌" }, // Equis
    { letra: "Y", emoji: "🪀" }, // Yoyó
    { letra: "Z", emoji: "🦊" }  // Zorro (Corregido)

];

let bancoDisponible = [];
let setJuego = [];
let ronda = 0;
let bloqueado = false;


/* ===== MEZCLAR ===== */

function mezclar(arr) {

    return arr.sort(
        () => Math.random() - 0.5
    );
}


/* ===== PREPARAR PARTIDA ===== */

function prepararNuevaPartida() {

    if (bancoDisponible.length < 10) {

        bancoDisponible =
            mezclar([...bancoOriginal]);

    }

    setJuego =
        bancoDisponible.splice(0, 10);

    ronda = 0;
}


/* =========================================================
   CONFETTI
   ========================================================= */

function crearConfetti(x, y) {

    const container =
        document.createElement("div");

    container.className =
        "confetti-container";

    container.style.left =
        x + "px";

    container.style.top =
        y + "px";

    const colors = [
        "#fbbf24",
        "#2dd4bf",
        "#14b8a6",
        "#f59e0b",
        "#5eead4",
        "#ef4444",
        "#8b5cf6",
        "#ec4899",
        "#22d3ee"
    ];

    for (let i = 0; i < 30; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti-piece";

        const color =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        piece.style.background =
            color;

        const angle =
            Math.random() * Math.PI * 2;

        const dist =
            80 + Math.random() * 180;

        const tx =
            Math.cos(angle) * dist;

        const ty =
            Math.sin(angle) * dist - 60;

        piece.style.setProperty(
            "--tx",
            tx + "px"
        );

        piece.style.setProperty(
            "--ty",
            ty + "px"
        );

        piece.style.setProperty(
            "--rot",
            (360 + Math.random() * 720) + "deg"
        );

        const size =
            6 + Math.random() * 8;

        piece.style.width =
            size + "px";

        piece.style.height =
            size * (
                .4 + Math.random() * .6
            ) + "px";

        if (Math.random() > .5) {

            piece.style.borderRadius =
                "50%";

        }

        piece.style.animationDuration =
            (.8 + Math.random() * .8) + "s";

        piece.style.animationDelay =
            Math.random() * .15 + "s";

        container.appendChild(piece);
    }

    document.body.appendChild(container);

    setTimeout(() => {
        container.remove();
    }, 2200);
}


/* =========================================================
   RIPPLE
   ========================================================= */

function crearRipple(el, e) {

    const rect =
        el.getBoundingClientRect();

    const ripple =
        document.createElement("div");

    ripple.className = "ripple";

    const size =
        Math.max(
            rect.width,
            rect.height
        );

    ripple.style.width =
        size + "px";

    ripple.style.height =
        size + "px";

    ripple.style.left =
        (e.clientX -
            rect.left -
            size / 2) + "px";

    ripple.style.top =
        (e.clientY -
            rect.top -
            size / 2) + "px";

    el.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}


/* =========================================================
   MOSTRAR RONDA
   ========================================================= */

function mostrarRonda() {

    /* ===== FINAL ===== */

    if (ronda >= 10) {

        document.getElementById(
            "juego"
        ).style.display = "none";

        document.getElementById(
            "pantallaFinal"
        ).style.display = "block";

        for (let i = 0; i < 6; i++) {

            setTimeout(() => {

                crearConfetti(
                    100 +
                    Math.random() *
                    (window.innerWidth - 200),

                    50 +
                    Math.random() *
                    (window.innerHeight * .4)
                );

            }, i * 250);
        }

        return;
    }


    bloqueado = false;


    /* ===== MENSAJE ===== */

    const msgEl =
        document.getElementById("mensaje");

    msgEl.innerHTML = "";
    msgEl.className = "";


    /* ===== LETRA ===== */

    const letraEl =
        document.getElementById("letra");

    letraEl.innerHTML =
        setJuego[ronda].letra;

    letraEl.classList.remove(
        "letra-entra"
    );

    void letraEl.offsetHeight;

    letraEl.classList.add(
        "letra-entra"
    );


    /* ===== PROGRESO ===== */

    document.getElementById(
        "progreso"
    ).innerHTML =
        "Ronda " +
        (ronda + 1) +
        " de 10";

    document.getElementById(
        "barraRelleno"
    ).style.width =
        (ronda / 10 * 100) + "%";


    /* ===== OPCIONES ===== */

    const correcta =
        setJuego[ronda];

    const extras =
        mezclar(
            bancoOriginal.filter(
                x => x.letra !== correcta.letra
            )
        ).slice(0, 2);

    const opciones =
        mezclar([
            correcta,
            ...extras
        ]);


    const cont =
        document.getElementById(
            "opciones"
        );

    cont.innerHTML = "";


    opciones.forEach(
        (op, idx) => {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "opcion";

            div.innerHTML =
                op.emoji;

            div.style.animationDelay =
                (idx * 0.12 + 0.08) +
                "s";


            div.addEventListener(
                "click",
                (e) => {

                    verificar(
                        op.letra,
                        div,
                        e
                    );

                }
            );


            cont.appendChild(div);

        }
    );
}


/* =========================================================
   VERIFICAR RESPUESTA
   ========================================================= */

function verificar(
    letra,
    elemento,
    e
) {

    if (bloqueado) {
        return;
    }


    crearRipple(
        elemento,
        e
    );


    const msgEl =
        document.getElementById(
            "mensaje"
        );


    /* ===== RESPUESTA CORRECTA ===== */

    if (
        letra ===
        setJuego[ronda].letra
    ) {

        bloqueado = true;

        elemento.classList.add(
            "correcta"
        );

        msgEl.innerHTML =
            "🎉 ¡Muy bien!";

        msgEl.className =
            "mensaje-correcto";


        document.getElementById(
            "barraRelleno"
        ).style.width =
            ((ronda + 1) / 10 * 100) +
            "%";


        const rect =
            elemento.getBoundingClientRect();


        crearConfetti(
            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2
        );


        setTimeout(() => {

            ronda++;

            mostrarRonda();

        }, 1300);

    }

    /* ===== RESPUESTA INCORRECTA ===== */

    else {

        elemento.classList.add(
            "incorrecta"
        );

        msgEl.innerHTML =
            "💫 Intenta otra vez";

        msgEl.className =
            "mensaje-intentar";


        setTimeout(() => {

            elemento.classList.remove(
                "incorrecta"
            );

        }, 550);
    }
}


/* =========================================================
   REINICIAR JUEGO
   ========================================================= */

function reiniciarJuego() {

    document.getElementById(
        "pantallaFinal"
    ).style.display = "none";

    document.getElementById(
        "juego"
    ).style.display = "block";

    document.getElementById(
        "barraRelleno"
    ).style.width = "0%";


    prepararNuevaPartida();

    mostrarRonda();
}


/* ===== BOTÓN REINICIAR ===== */

document.getElementById(
    "reiniciarBtn"
).addEventListener(
    "click",
    reiniciarJuego
);


/* =========================================================
   INICIAR JUEGO
   ========================================================= */

bancoDisponible =
    mezclar([...bancoOriginal]);

prepararNuevaPartida();

mostrarRonda();