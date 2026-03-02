'use strict';

const i18n = {
  cs: {
    subtitle: 'Zveme vás na naši svatbu',
    date: '5. září 2026',
    days: 'dní',
    hours: 'hodin',
    minutes: 'minut',
    seconds: 'vteřin',
    married: 'Právě jsme se vzali! 💍',
  },
  en: {
    subtitle: 'We invite you to our wedding',
    date: 'September 5, 2026',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    married: 'We just got married! 💍',
  },
};

const WEDDING_DATE = new Date('2026-09-05T00:00:00');

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

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const married = document.getElementById('married-msg');
  const countdown = document.getElementById('countdown');

  if (diff <= 0) {
    countdown.hidden = true;
    married.hidden = false;
    married.textContent = i18n[currentLang].married;
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  document.getElementById('cd-days').textContent = days;
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-minutes').textContent = pad(minutes);
  document.getElementById('cd-seconds').textContent = pad(seconds);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

applyLang(currentLang);
updateCountdown();
setInterval(updateCountdown, 1000);
