(function() {
/* =========================================================
   TRADUCCIONES (DICCIONARIO DE IDIOMAS)
========================================================= */

const translations = {
    es: {
        levels: [
            { name: "Animales" }, { name: "Naturaleza" }, { name: "Transportes" }, { name: "Situaciones" }
        ],
        stages: [
            { correct: ["Peludo", "Juguetón", "Fiel", "Cariñoso", "Leal", "Doméstico"], options: ["Peludo", "Juguetón", "Fiel", "Cariñoso", "Leal", "Doméstico", "Acuático", "Metálico", "Escamoso", "Volador", "Feroz", "Solitario"] },
            { correct: ["Ágil", "Curioso", "Felino", "Sigiloso", "Elegante", "Peludo"], options: ["Ágil", "Curioso", "Felino", "Sigiloso", "Elegante", "Peludo", "Pesado", "Ruidoso", "Lento", "Acuático", "Gigante", "Escamoso"] },
            { correct: ["Masivo", "Trompa", "Gris", "Pesado", "Grande", "Herbívoro"], options: ["Masivo", "Trompa", "Gris", "Pesado", "Grande", "Herbívoro", "Diminuto", "Volador", "Ligero", "Acuático", "Doméstico", "Metálico"] },
            { correct: ["Colorido", "Plumaje", "Tropical", "Volador", "Cantor", "Exótico"], options: ["Colorido", "Plumaje", "Tropical", "Volador", "Cantor", "Exótico", "Congelado", "Robótico", "Silencioso", "Escamoso", "Peludo", "Opaco"] },
            { correct: ["Arena", "Olas", "Costa", "Salado", "Marino", "Horizonte"], options: ["Arena", "Olas", "Costa", "Salado", "Marino", "Horizonte", "Luminoso", "Industrial", "Gélido", "Montaña", "Urbano", "Seco"] },
            { correct: ["Frondoso", "Tranquilo", "Verde", "Árboles", "Fresco", "Natural"], options: ["Frondoso", "Tranquilo", "Verde", "Árboles", "Fresco", "Natural", "Árido", "Metálico", "Helado", "Industrial", "Caluroso", "Urbano"] },
            { correct: ["Majestuoso", "Picos", "Rocoso", "Nevado", "Elevado", "Frío"], options: ["Majestuoso", "Picos", "Rocoso", "Nevado", "Elevado", "Frío", "Acuático", "Caluroso", "Llanura", "Doméstico", "Diminuto", "Artificial"] },
            { correct: ["Cascada", "Fresca", "Natural", "Brillante", "Mojado", "Espectacular"], options: ["Cascada", "Fresca", "Natural", "Brillante", "Mojado", "Espectacular", "Seco", "Sintético", "Estático", "Árido", "Congelado", "Opaco"] },
            { correct: ["Veloz", "Motor", "Automóvil", "Ruedas", "Moderno", "Terrestre"], options: ["Veloz", "Motor", "Automóvil", "Ruedas", "Moderno", "Terrestre", "Fluvial", "Volador", "Submarino", "Manual", "Silencioso", "Acuático"] },
            { correct: ["Aeronave", "Altura", "Vuelo", "Veloz", "Aéreo", "Moderno"], options: ["Aeronave", "Altura", "Vuelo", "Veloz", "Aéreo", "Moderno", "Submarino", "Terrestre", "Minúsculo", "Fluvial", "Doméstico", "Subterráneo"] },
            { correct: ["Ferroviario", "Vagón", "Viaje", "Potente", "Terrestre", "Pesado"], options: ["Ferroviario", "Vagón", "Viaje", "Potente", "Terrestre", "Pesado", "Aéreo", "Marítimo", "Doméstico", "Acuático", "Volador", "Diminuto"] },
            { correct: ["Ecológico", "Pedalea", "Ligera", "Ruedas", "Deportiva", "Sostenible"], options: ["Ecológico", "Pedalea", "Ligera", "Ruedas", "Deportiva", "Sostenible", "Combustión", "Pesada", "Gigante", "Motorizada", "Ruidosa", "Contaminante"] },
            { correct: ["Alegría", "Compañía", "Risas", "Infancia", "Divertido", "Libre"], options: ["Alegría", "Compañía", "Risas", "Infancia", "Divertido", "Libre", "Apatía", "Soledad", "Tristeza", "Silencio", "Frío", "Monotonía"] },
            { correct: ["Aula", "Estudio", "Docente", "Concentración", "Aprendizaje", "Educativo"], options: ["Aula", "Estudio", "Docente", "Concentración", "Aprendizaje", "Educativo", "Salvaje", "Caos", "Fábrica", "Desorden", "Ruido", "Industrial"] },
            { correct: ["Competencia", "Balón", "Equipo", "Cancha", "Atlético", "Deportivo"], options: ["Competencia", "Balón", "Equipo", "Cancha", "Atlético", "Deportivo", "Silencio", "Individual", "Quieto", "Virtual", "Soledad", "Apatía"] },
            { correct: ["Celebración", "Globos", "Pastel", "Música", "Festivo", "Feliz"], options: ["Celebración", "Globos", "Pastel", "Música", "Festivo", "Feliz", "Tristeza", "Vacío", "Apatía", "Silencio", "Soledad", "Oscuro"] }
        ],
        ui: {
            title: "🖼️ Describe la Imagen",
            subtitle: "Selecciona 4 palabras que describan correctamente lo que ves",
            levelLabel: "Nivel:", scoreLabel: "Puntos:", streakLabel: "🔥 Racha:",
            checkBtn: "Comprobar", hintBtn: "💡 Pista (-5 pts)", levelName: "Nivel",
            warning: "⚠️ Solo puedes seleccionar 4 palabras", hintAllSelected: "👀 ¡Ya tienes todas las correctas seleccionadas!",
            hintReveal: "💡 Pista: \"{word}\" es correcta (-5 pts)", levelComplete: "🎉 ¡Nivel completado! +30 puntos extra",
            victoryTitle: "🏆 ¡Felicidades!", victoryDesc: "Completaste todos los niveles del juego.",
            victoryScoreLabel: "Puntaje final:", playAgain: "Jugar de nuevo 🔄"
        },
        messages: {
            success: ["✅ ¡Excelente!", "🌟 ¡Increíble!", "🧠 ¡Gran vocabulario!", "🎨 ¡Perfecto!", "👏 ¡Bravo!", "🎯 ¡Preciso!"],
            fail: ["❌ Ups, alguna no describe la imagen", "🤔 Revisa cuáles encajan mejor", "👀 ¡Observa con más detalle!"],
            streak: ["🔥 ¡Racha activa!", "⚡ ¡Eres imparable!", "🚀 ¡Máximo nivel!"]
        }
    },
    en: {
        levels: [
            { name: "Animals" }, { name: "Nature" }, { name: "Transportation" }, { name: "Situations" }
        ],
        stages: [
            { correct: ["Furry", "Playful", "Loyal", "Affectionate", "Faithful", "Domestic"], options: ["Furry", "Playful", "Loyal", "Affectionate", "Faithful", "Domestic", "Aquatic", "Metallic", "Scaly", "Flying", "Fierce", "Lonely"] },
            { correct: ["Agile", "Curious", "Feline", "Stealthy", "Elegant", "Furry"], options: ["Agile", "Curious", "Feline", "Stealthy", "Elegant", "Furry", "Heavy", "Noisy", "Slow", "Aquatic", "Giant", "Scaly"] },
            { correct: ["Massive", "Trunk", "Gray", "Heavy", "Big", "Herbivore"], options: ["Massive", "Trunk", "Gray", "Heavy", "Big", "Herbivore", "Tiny", "Flying", "Light", "Aquatic", "Domestic", "Metallic"] },
            { correct: ["Colorful", "Plumage", "Tropical", "Flying", "Singing", "Exotic"], options: ["Colorful", "Plumage", "Tropical", "Flying", "Singing", "Exotic", "Frozen", "Robotic", "Silent", "Scaly", "Furry", "Dull"] },
            { correct: ["Sand", "Waves", "Coast", "Salty", "Marine", "Horizon"], options: ["Sand", "Waves", "Coast", "Salty", "Marine", "Horizon", "Bright", "Industrial", "Freezing", "Mountain", "Urban", "Dry"] },
            { correct: ["Leafy", "Calm", "Green", "Trees", "Fresh", "Natural"], options: ["Leafy", "Calm", "Green", "Trees", "Fresh", "Natural", "Arid", "Metallic", "Frozen", "Industrial", "Hot", "Urban"] },
            { correct: ["Majestic", "Peaks", "Rocky", "Snowy", "Elevated", "Cold"], options: ["Majestic", "Peaks", "Rocky", "Snowy", "Elevated", "Cold", "Aquatic", "Hot", "Plain", "Domestic", "Tiny", "Artificial"] },
            { correct: ["Waterfall", "Fresh", "Natural", "Bright", "Wet", "Spectacular"], options: ["Waterfall", "Fresh", "Natural", "Bright", "Wet", "Spectacular", "Dry", "Synthetic", "Static", "Arid", "Frozen", "Dull"] },
            { correct: ["Fast", "Engine", "Automobile", "Wheels", "Modern", "Land"], options: ["Fast", "Engine", "Automobile", "Wheels", "Modern", "Land", "River", "Flying", "Submarine", "Manual", "Silent", "Aquatic"] },
            { correct: ["Aircraft", "Height", "Flight", "Fast", "Aerial", "Modern"], options: ["Aircraft", "Height", "Flight", "Fast", "Aerial", "Modern", "Submarine", "Land", "Tiny", "River", "Domestic", "Underground"] },
            { correct: ["Railway", "Car", "Journey", "Powerful", "Land", "Heavy"], options: ["Railway", "Car", "Journey", "Powerful", "Land", "Heavy", "Aerial", "Maritime", "Domestic", "Aquatic", "Flying", "Tiny"] },
            { correct: ["Eco-friendly", "Pedals", "Light", "Wheels", "Sporty", "Sustainable"], options: ["Eco-friendly", "Pedals", "Light", "Wheels", "Sporty", "Sustainable", "Combustion", "Heavy", "Giant", "Motorized", "Noisy", "Polluting"] },
            { correct: ["Joy", "Company", "Laughs", "Childhood", "Fun", "Free"], options: ["Joy", "Company", "Laughs", "Childhood", "Fun", "Free", "Apathy", "Loneliness", "Sadness", "Silence", "Cold", "Monotony"] },
            { correct: ["Classroom", "Study", "Teacher", "Concentration", "Learning", "Educational"], options: ["Classroom", "Study", "Teacher", "Concentration", "Learning", "Educational", "Wild", "Chaos", "Factory", "Mess", "Noise", "Industrial"] },
            { correct: ["Competition", "Ball", "Team", "Court", "Athletic", "Sporty"], options: ["Competition", "Ball", "Team", "Court", "Athletic", "Sporty", "Silence", "Individual", "Still", "Virtual", "Loneliness", "Apathy"] },
            { correct: ["Celebration", "Balloons", "Cake", "Music", "Festive", "Happy"], options: ["Celebration", "Balloons", "Cake", "Music", "Festive", "Happy", "Sadness", "Empty", "Apathy", "Silence", "Loneliness", "Dark"] }
        ],
        ui: {
            title: "🖼️ Describe the Image",
            subtitle: "Select 4 words that correctly describe what you see",
            levelLabel: "Level:", scoreLabel: "Points:", streakLabel: "🔥 Streak:",
            checkBtn: "Check", hintBtn: "💡 Hint (-5 pts)", levelName: "Level",
            warning: "⚠️ You can only select 4 words", hintAllSelected: "👀 You already have all the correct ones selected!",
            hintReveal: "💡 Hint: \"{word}\" is correct (-5 pts)", levelComplete: "🎉 Level completed! +30 extra points",
            victoryTitle: "🏆 Congratulations!", victoryDesc: "You completed all levels of the game.",
            victoryScoreLabel: "Final score:", playAgain: "Play again 🔄"
        },
        messages: {
            success: ["✅ Excellent!", "🌟 Amazing!", "🧠 Great vocabulary!", "🎨 Perfect!", "👏 Bravo!", "🎯 Accurate!"],
            fail: ["❌ Oops, one doesn't describe the image", "🤔 Check which ones fit better", "👀 Look closer!"],
            streak: ["🔥 Streak active!", "⚡ You are unstoppable!", "🚀 Maximum level!"]
        }
    }
};

/* =========================================================
   SINCRONIZACIÓN DE IDIOMA CON EL RESTO DE LA WEB
========================================================= */
let currentLang = localStorage.getItem("lumen-lang") || "es";
let t = translations[currentLang] || translations["es"];

/* ===== VARIABLES Y ELEMENTOS ===== */
let level = 0, stage = 0, score = 0, selected = [], streak = 0, hintUsedThisStage = false;

const stageImages = [
    "https://www.anipedia.net/imagenes/que-comen-los-perros.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9mePXvUD4IAX-OEvx4PvxJDmdj5e8bPXw_BvRrqcrLii36a4jaNsjMhE&s=10",
    "https://d80g3k8vowjyp.cloudfront.net/img/elefante_africano_100750.jpg",
    "https://cdn.prod.website-files.com/692da62b1095e881eb691deb/695bd570feb507224e911af5_zoo-martinique-animaux-oiseaux-amazone-front-jaune-02.jpg",
    "https://plus.unsplash.com/premium_photo-1669748157617-a3a83cc8ea23?fm=jpg&q=60&w=3000&auto=format&fit=crop",
    "https://ecosistemas.ovacen.com/wp-content/uploads/2018/01/bosque.jpg",
    "https://concepto.de/wp-content/uploads/2018/08/monta%C3%B1a-clima-min-e1533762913759.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM_dEPx1jCqM1STgIUZ-_xz0irTn05lDOFIzRQIQCp_d3nV2KqpnpG5g39&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfmnCla16AwmhQxaBXAZ5aJjwUbbIg82EOTMUKqLS9zTX8ghN0Wq4QWaqI&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq44aR7_Rs9WVi9-sEK_Xg9uC_7tOAqVeaGi6Cq6ue2JxhzqHj9HcGnp8B&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA07H-2HtArrtPqLI_z9kBFoDFpc8F7tTZ6be5RzXerAH7KGj4fwzLd3qY&s=10",
    "https://d31f1ehqijlcua.cloudfront.net/n/7/c/5/5/7c5563954f43948bc2e54af9f501bf4b4a2937fd_Cycling_499344_01.jpg",
    "https://img.magnific.com/foto-gratis/ninos-felices-jugando-juntos-al-aire-libre-bailando-sobre-cesped-disfrutando-actividades-al-aire-libre-divirtiendose-parque-concepto-fiesta-o-amistad-ninos_74855-11760.jpg?semt=ais_hybrid&w=740&q=80",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-4lAh6Xb6kDqKfzTmufVNX4QO43D3i3jRMB92LR99xAcz3jT8w8Tqtac&s=10",
    "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/B5B9/production/_92212564_gettyimages-185933155.jpg.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeA2I97remQSZ6ipPWVW8_mOudtNkWpyOJtG0pfuwA2PKIC0dqUIp9nrpn&s=10"
];

const imageEl = document.getElementById("image");
const wordsEl = document.getElementById("words");
const messageEl = document.getElementById("message");
const checkBtn = document.getElementById("check");
const hintBtn = document.getElementById("hintBtn");
const mainContainer = document.getElementById("mainContainer");
const streakBadge = document.getElementById("streakBadge");
const streakSpan = document.getElementById("streak");

const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const langEsBtn = document.getElementById("langEs");
const langEnBtn = document.getElementById("langEn");

/* ===== LÓGICA DE IDIOMA ===== */
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lumen-lang", lang); 
    t = translations[lang] || translations["es"];
    
    // Textos estáticos de la interfaz
    if (document.getElementById("mainTitle")) document.getElementById("mainTitle").textContent = t.ui.title;
    if (document.getElementById("subtitleText")) document.getElementById("subtitleText").textContent = t.ui.subtitle;
    if (document.getElementById("levelLabel")) document.getElementById("levelLabel").textContent = t.ui.levelLabel;
    if (document.getElementById("scoreLabel")) document.getElementById("scoreLabel").textContent = t.ui.scoreLabel;
    if (document.getElementById("streakLabel")) document.getElementById("streakLabel").textContent = t.ui.streakLabel;
    
    if (checkBtn) checkBtn.textContent = `${t.ui.checkBtn} (${selected.length}/4)`;
    if (hintBtn) hintBtn.textContent = t.ui.hintBtn;
    
    const levelNameEl = document.getElementById("levelName");
    if (levelNameEl) levelNameEl.textContent = `${t.ui.levelName}: ${t.levels[level].name}`;
    
    // Pantalla de victoria
    if (document.getElementById("victoryTitle")) document.getElementById("victoryTitle").textContent = t.ui.victoryTitle;
    if (document.getElementById("victoryDesc")) document.getElementById("victoryDesc").textContent = t.ui.victoryDesc;
    if (document.getElementById("victoryScoreLabel")) document.getElementById("victoryScoreLabel").innerHTML = `${t.ui.victoryScoreLabel} <span id="finalScore"></span>`;
    if (document.getElementById("playAgainBtn")) document.getElementById("playAgainBtn").textContent = t.ui.playAgain;
    
    // Resaltar botón de idioma
    if (langEsBtn) langEsBtn.classList.toggle("selected", lang === "es");
    if (langEnBtn) langEnBtn.classList.toggle("selected", lang === "en");
}

if (settingsBtn) {
    settingsBtn.addEventListener("click", () => {
        const isVisible = settingsMenu.classList.toggle("visible");
        settingsBtn.classList.toggle("active", isVisible);
    });
}

if (langEsBtn) {
    langEsBtn.addEventListener("click", () => {
        changeLanguage("es");
        settingsMenu.classList.remove("visible");
        settingsBtn.classList.remove("active");
    });
}

if (langEnBtn) {
    langEnBtn.addEventListener("click", () => {
        changeLanguage("en");
        settingsMenu.classList.remove("visible");
        settingsBtn.classList.remove("active");
    });
}

/* ===== ESTRELLAS EN EL CIELO ===== */
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
        s.style.setProperty("--dur", Math.random() * 3 + 2 + "s");
        s.style.setProperty("--op-min", (Math.random() * 0.15 + 0.05).toFixed(2));
        s.style.setProperty("--op-max", (Math.random() * 0.3 + 0.2).toFixed(2));
        s.style.animationDelay = Math.random() * 5 + "s";
        contenedor.appendChild(s);
    }
})();

/* ===== FUNCIONES GENERALES ===== */
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function getRandomMsg(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function launchConfetti() {
    const colors = ["#b899e0", "#9a7cd4", "#d4c0f0", "#e0d5f5", "#f0e8f8", "#c8b5e5"];
    for (let i = 0; i < 60; i++) {
        const c = document.createElement("div");
        c.className = "confetti-piece";
        c.style.left = Math.random() * 100 + "vw";
        c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = Math.random() * 2 + 2 + "s";
        document.body.appendChild(c);
        setTimeout(() => { c.remove(); }, 4000);
    }
}

function updateUI() {
    const total = 16, completed = level * 4 + stage;
    const bar = document.getElementById("bar");
    if (bar) { bar.style.width = (completed / total) * 100 + "%"; }
    if (checkBtn) {
        checkBtn.textContent = `${t.ui.checkBtn} (${selected.length}/4)`;
        checkBtn.classList.toggle("btn-disabled", selected.length !== 4);
    }
    if (streakSpan) streakSpan.textContent = streak;
    if (streakBadge) streakBadge.style.display = streak >= 2 ? "inline-block" : "none";
}

function toggleWords(disabled) {
    if (!wordsEl) return;
    wordsEl.querySelectorAll(".word").forEach(btn => {
        if (!btn.classList.contains("selected") && disabled) btn.classList.add("disabled");
        else btn.classList.remove("disabled");
    });
}

function loadStage() {
    if (!imageEl || !wordsEl) return; 

    selected = [];
    hintUsedThisStage = false;
    if (hintBtn) hintBtn.classList.remove("btn-disabled");
    if (messageEl) messageEl.textContent = "";

    const stageIndex = level * 4 + stage;
    const cur = t.stages[stageIndex];

    const levelEl = document.getElementById("level");
    const scoreEl = document.getElementById("score");
    const levelNameEl = document.getElementById("levelName");

    if (levelEl) levelEl.textContent = level + 1;
    if (scoreEl) scoreEl.textContent = score;
    if (levelNameEl) levelNameEl.textContent = `${t.ui.levelName}: ${t.levels[level].name}`;

    imageEl.classList.add("loading");
    imageEl.src = stageImages[stageIndex];
    imageEl.onload = () => { imageEl.classList.remove("loading"); };

    wordsEl.innerHTML = "";
    shuffle(cur.options).forEach(word => {
        const btn = document.createElement("button");
        btn.className = "word";
        btn.textContent = word;
        btn.onclick = () => {
            if (btn.classList.contains("selected")) {
                btn.classList.remove("selected");
                selected = selected.filter(x => x !== word);
                toggleWords(false);
            } else {
                if (selected.length >= 4) {
                    if (messageEl) {
                        messageEl.style.color = "#7a5aaa";
                        messageEl.textContent = t.ui.warning;
                    }
                    return;
                }
                btn.classList.add("selected");
                selected.push(word);
                if (selected.length === 4) {
                    toggleWords(true);
                    if (messageEl) messageEl.textContent = "";
                }
            }
            updateUI();
        };
        wordsEl.appendChild(btn);
    });
    updateUI();
}

if (hintBtn) {
    hintBtn.onclick = () => {
        if (hintUsedThisStage) return;
        const stageIndex = level * 4 + stage;
        const cur = t.stages[stageIndex];
        const available = cur.correct.filter(c => !selected.includes(c));

        if (available.length === 0) {
            if (messageEl) {
                messageEl.style.color = "#7a5aaa";
                messageEl.textContent = t.ui.hintAllSelected;
            }
            return;
        }

        hintUsedThisStage = true;
        hintBtn.classList.add("btn-disabled");
        score = Math.max(0, score - 5);
        
        const scoreEl = document.getElementById("score");
        if (scoreEl) scoreEl.textContent = score;

        const hintWord = available[Math.floor(Math.random() * available.length)];
        wordsEl.querySelectorAll(".word").forEach(btn => {
            if (btn.textContent === hintWord) {
                btn.classList.add("hint-highlight");
                setTimeout(() => btn.classList.remove("hint-highlight"), 2500);
            }
        });

        if (messageEl) {
            messageEl.style.color = "#8a6d10";
            messageEl.textContent = t.ui.hintReveal.replace("{word}", hintWord);
        }
    };
}

if (checkBtn) {
    checkBtn.onclick = () => {
        if (selected.length !== 4) return;
        const stageIndex = level * 4 + stage;
        const cur = t.stages[stageIndex];
        const isCorrect = selected.every(w => cur.correct.includes(w));

        if (isCorrect) {
            streak++;
            let pts = 10;
            if (streak >= 3) {
                pts += 5;
                if (messageEl) {
                    messageEl.style.color = "#7a5aaa";
                    messageEl.textContent = getRandomMsg(t.messages.success) + " " + getRandomMsg(t.messages.streak) + " (+15 pts)";
                }
            } else {
                if (messageEl) {
                    messageEl.style.color = "#43e97b";
                    messageEl.textContent = getRandomMsg(t.messages.success) + " (+10 pts)";
                }
            }

            score += pts;
            const scoreEl = document.getElementById("score");
            if (scoreEl) scoreEl.textContent = score;

            setTimeout(() => {
                stage++;
                if (stage === 4) {
                    score += 30;
                    if (scoreEl) scoreEl.textContent = score;
                    if (messageEl) messageEl.textContent = t.ui.levelComplete;
                    launchConfetti();
                    level++;
                    stage = 0;
                    if (level === 4) {
                        score += 50;
                        const finalScoreEl = document.getElementById("finalScore");
                        const gameDiv = document.getElementById("game");
                        const victoryDiv = document.getElementById("victory");
                        
                        if (finalScoreEl) finalScoreEl.textContent = score;
                        if (gameDiv) gameDiv.style.display = "none";
                        if (victoryDiv) victoryDiv.style.display = "block";
                        
                        launchConfetti();
                        return;
                    }
                }
                loadStage();
            }, 1200);

        } else {
            streak = 0;
            if (messageEl) {
                messageEl.style.color = "#ff5252";
                messageEl.textContent = getRandomMsg(t.messages.fail);
            }
            if (mainContainer) {
                mainContainer.classList.add("shake");
                setTimeout(() => mainContainer.classList.remove("shake"), 400);
            }
        }
    };
}

/* ===== INICIAR JUEGO ===== */
changeLanguage(currentLang);
loadStage();

})();