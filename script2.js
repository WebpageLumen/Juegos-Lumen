/* =========================================================
   TRADUCCIONES
   Objeto con todos los textos del sitio en cada idioma.
   Para agregar un idioma nuevo: duplica el bloque "es"
   con su código (ej: "fr") y traduce cada valor.
========================================================= */
const TRANSLATIONS = {
  es: {
    nav_home:    "Inicio",
    nav_info:    "Información general",
    nav_shop:    "Lumen Shop",
    nav_centers: "Centros",
    nav_tours:   "Giras inclusivas",
    nav_pros:    "Profesionales",
    nav_about:   "Sobre nosotros",

    drop_autism:      "¿Qué es el autismo?",
    drop_causes:      "Causas del autismo",
    drop_levels:      "Niveles de autismo",
    drop_signs:       "Señales de alerta",
    drop_girls:       "Autismo en niñas y...",
    drop_conditions:  "Condiciones asociadas...",

    drop_who:         "¿Quiénes somos?",
    drop_mission:     "Misión y visión",
    drop_contact:     "Contacto",

    hero_title_1:         "Un espacio pensado<br>para acompañarte<br>en ",
    hero_title_highlight: "cada paso",
    hero_desc:            "Lumen acompaña a niños, niñas y jóvenes en su desarrollo, brindando herramientas, actividades y experiencias inclusivas que promueven su bienestar y autonomía.",

    sections_title:   "¿Qué encuentras en Lumen?",
    card_juegos:      "Juegos<br>educativos",
    card_actividades: "Actividades<br>sociales",
    card_regulacion:  "Regulación<br>emocional",
    card_recursos:    "Recursos<br>extras",

    tours_title:  "Giras inclusivas",
    tours_desc:   "Experiencias reales, lugares increíbles y recuerdos que iluminan.",
    tours_btn:    "Ver todas las giras →",
    tour1_name:   "Explora",
    tour1_tag:    "Educativa",
    tour2_name:   "Crea",
    tour2_tag:    "Recreativa",
    tour3_name:   "Descubre",
    tour3_tag:    "Explorativa",

    shop_label:   "Lumen Shop",
    shop_title:   "Lumen Shop",
    shop_desc:    "Productos pensados para acompañar el bienestar emocional, sensorial y reforzar conocimientos.",
    shop_btn:     "Ir a la tienda →",
    prod1:        "Spinner<br>Cromado",
    prod2:        "Cubo<br>Antiestres",
    prod3:        "Pop it<br>Arcoiris",
    prod4:        "Pelota<br>Antiestres",

    footer_copy:      "2026 Lumen. Todos los derechos reservados.",
    footer_access:    "Accesos rápidos",
    footer_community: "¡Visita nuestra comunidad!",
    footer_contact:   "Contáctanos",
    footer_email_label: "Correo electrónico:",
  },

  en: {
    nav_home:    "Home",
    nav_info:    "General information",
    nav_shop:    "Lumen Shop",
    nav_centers: "Centers",
    nav_tours:   "Inclusive tours",
    nav_pros:    "Professionals",
    nav_about:   "About us",

    drop_autism:      "What is autism?",
    drop_causes:      "Causes of autism",
    drop_levels:      "Levels of autism",
    drop_signs:       "Warning signs",
    drop_girls:       "Autism in girls...",
    drop_conditions:  "Associated conditions...",

    drop_who:         "Who are we?",
    drop_mission:     "Mission and vision",
    drop_contact:     "Contact",

    hero_title_1:         "A space designed<br>to support you<br>at ",
    hero_title_highlight: "every step",
    hero_desc:            "Lumen accompanies children and young people in their development, providing inclusive tools, activities, and experiences that promote their well-being and autonomy.",

    sections_title:   "What do you find at Lumen?",
    card_juegos:      "Educational<br>games",
    card_actividades: "Social<br>activities",
    card_regulacion:  "Emotional<br>regulation",
    card_recursos:    "Extra<br>resources",

    tours_title:  "Inclusive tours",
    tours_desc:   "Real experiences, incredible places and memories that light the way.",
    tours_btn:    "See all tours →",
    tour1_name:   "Explore",
    tour1_tag:    "Educational",
    tour2_name:   "Create",
    tour2_tag:    "Recreational",
    tour3_name:   "Discover",
    tour3_tag:    "Exploratory",

    shop_label:   "Lumen Shop",
    shop_title:   "Lumen Shop",
    shop_desc:    "Products designed to support emotional and sensory well-being and reinforce learning.",
    shop_btn:     "Go to the store →",
    prod1:        "Chrome<br>Spinner",
    prod2:        "Anti-stress<br>Cube",
    prod3:        "Rainbow<br>Pop it",
    prod4:        "Anti-stress<br>Ball",

    footer_copy:      "2026 Lumen. All rights reserved.",
    footer_access:    "Quick access",
    footer_community: "Visit our community!",
    footer_contact:   "Contact us",
    footer_email_label: "Email:",
  }
};

/* =========================================================
   METADATOS DE IDIOMA
========================================================= */
const LANG_META = {
  es: { label: "ES", flagSrc: "https://flagcdn.com/w80/es.png", htmlLang: "es" },
  en: { label: "EN", flagSrc: "https://flagcdn.com/w80/gb.png", htmlLang: "en" },
};

let currentLang = localStorage.getItem("lumen-lang") || "es";

/* =========================================================
   APLICAR TRADUCCIONES
========================================================= */
function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  document.documentElement.lang = LANG_META[lang].htmlLang;
}

/* =========================================================
   CAMBIO DE IDIOMA
========================================================= */
function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lumen-lang", lang);
  document.getElementById("langLabel").textContent = LANG_META[lang].label;
  document.getElementById("langFlag").src = LANG_META[lang].flagSrc;

  document.querySelectorAll(".lang-option").forEach(opt => {
    opt.classList.toggle("selected", opt.dataset.lang === lang);
  });

  applyTranslations(lang);
  closeLangDropdown();
}

/* =========================================================
   DROPDOWN DE IDIOMA
========================================================= */
const langBtn = document.getElementById("langBtn");
const langDropdown = document.getElementById("langDropdown");

function openLangDropdown() {
  langDropdown.classList.add("open");
  langBtn.setAttribute("aria-expanded", "true");
}

function closeLangDropdown() {
  langDropdown.classList.remove("open");
  langBtn.setAttribute("aria-expanded", "false");
}

function toggleLangDropdown() {
  langDropdown.classList.contains("open") ? closeLangDropdown() : openLangDropdown();
}

langBtn.addEventListener("click", e => {
  e.stopPropagation();
  toggleLangDropdown();
});

document.querySelectorAll(".lang-option").forEach(opt => {
  opt.addEventListener("click", () => switchLanguage(opt.dataset.lang));
  opt.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      switchLanguage(opt.dataset.lang);
    }
  });
});

/* =========================================================
   DROPDOWN DE NAVEGACIÓN
========================================================= */
const NAV_DROPDOWNS = {
  nav_info: true,
  nav_about: true
};

document.querySelectorAll(".nav-item").forEach(item => {
  const dropdown = item.querySelector(".nav-dropdown");
  let closeTimeout;

  function abrir() {
    clearTimeout(closeTimeout);
    item.classList.add("open");
  }

  function cerrar() {
    closeTimeout = setTimeout(() => {
      item.classList.remove("open");
    }, 500);
  }

  item.addEventListener("mouseenter", abrir);
  item.addEventListener("mouseleave", cerrar);

  dropdown.addEventListener("mouseenter", abrir);
  dropdown.addEventListener("mouseleave", cerrar);
});

/* =========================================================
   CERRAR DROPDOWNS AL HACER CLIC FUERA
========================================================= */
document.addEventListener("click", () => {
  closeLangDropdown();
  document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
});

/* =========================================================
   SISTEMA DE MODO CALMA
========================================================= */
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

const THEME_ICONS = {
  normal: "🌙",
  calm: "☀️"
};

function getInitialTheme() {
  return localStorage.getItem("lumen-theme") || "normal";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeIcon.textContent = THEME_ICONS[theme];
  localStorage.setItem("lumen-theme", theme);
}

themeBtn.addEventListener("click", () => {
  const temaActual = document.documentElement.getAttribute("data-theme") || "normal";
  applyTheme(temaActual === "normal" ? "calm" : "normal");
});

applyTheme(getInitialTheme());
switchLanguage(currentLang);

// Delay para todos los dropdowns del navbar
document.querySelectorAll('.nav-item').forEach(item => {
  const dropdown = item.querySelector('.nav-dropdown');
  if (!dropdown) return;

  let hideTimeout;

  item.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    dropdown.classList.add('show');
  });

  item.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      dropdown.classList.remove('show');
    }, 350); // mismo tiempo que el delay del CSS
  });
});