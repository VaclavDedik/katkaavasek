'use strict';

const i18n = {
  cs: {
    subtitle: 'Zveme vás na naši svatbu',
    date: '5. září 2026',
  },
  en: {
    subtitle: 'We invite you to our wedding',
    date: 'September 5, 2026',
  },
};

let currentLang = navigator.language.startsWith('cs') ? 'cs' : 'en';

function applyLang(lang) {
  currentLang = lang;
  const t = i18n[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(currentLang);
