// ---- CONFIG ----
const LANG_KEY = "cloudcode_lang";
let lang = localStorage.getItem(LANG_KEY) || "es";
const langToggle = document.getElementById("langToggle");

// Cargar JSON de idioma
async function loadLanguage(langCode) {
  try {
    const res = await fetch(`assets/i18n/${langCode}.json`);
    if (!res.ok) throw new Error("Idioma no encontrado");
    return await res.json();
  } catch (err) {
    console.warn(
      `Error cargando ${langCode}.json, usando español por defecto.`
    );
    const fallback = await fetch(`assets/i18n/es.json`);
    return await fallback.json();
  }
}

// Aplicar traducciones
async function updateText(langCode) {
  const dictionary = await loadLanguage(langCode);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const text = dictionary[key];
    if (!text) return;

    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = text;
    } else {
      el.innerHTML = text;
    }
  });

  langToggle.textContent = langCode.toUpperCase();
  document.documentElement.lang = langCode;
  localStorage.setItem(LANG_KEY, langCode);
}

// Toggle idioma
langToggle.addEventListener("click", () => {
  lang = lang === "es" ? "en" : "es";
  updateText(lang);
});

// Inicial
updateText(lang);
