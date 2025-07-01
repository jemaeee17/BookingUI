const html = document.documentElement;
const lang = localStorage.getItem("lang") || "en"; // Read language from localStorage

async function loadLanguage(lang) {
    try {
        const res = await fetch(`assets/i18n/${lang}.json`);
        const data = await res.json();
        applyTranslations(data);
        html.setAttribute("lang", lang);
        html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    } catch (e) {
        console.error("❌ Language file load error", e);
    }
}

function applyTranslations(data) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(el => {
        const key = el.getAttribute("data-i18n-html");
        if (data[key]) el.innerHTML = data[key];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (data[key]) el.placeholder = data[key];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(lang);
});
