'use strict';

const i18n = {
  cs: {
    subtitle:    'Zveme vás na naši svatbu',
    date:        '5. září 2026',
    whenTitle:   'Kdy',
    whenDate:    '5. září 2026',
    whenTime:    'Čas bude upřesněn',
    whereTitle:  'Kde',
    whereVenue:  'Místo bude upřesněno',
    rsvpTitle:   'RSVP',
    rsvpName:    'Jméno',
    rsvpAttend:  'Zúčastníte se?',
    rsvpYes:     'Ano, přijdu',
    rsvpNo:      'Bohužel nepřijdu',
    rsvpGuests:  'Počet hostů (včetně vás)',
    rsvpNote:    'Poznámka (dieta, alergie…)',
    rsvpSubmit:  'Odeslat RSVP',
    rsvpSuccess: 'Děkujeme! Těšíme se na vás. 🎉',
  },
  en: {
    subtitle:    'We invite you to our wedding',
    date:        'September 5, 2026',
    whenTitle:   'When',
    whenDate:    'September 5, 2026',
    whenTime:    'Time to be announced',
    whereTitle:  'Where',
    whereVenue:  'Venue to be announced',
    rsvpTitle:   'RSVP',
    rsvpName:    'Name',
    rsvpAttend:  'Will you attend?',
    rsvpYes:     'Yes, I will be there',
    rsvpNo:      'Unfortunately not',
    rsvpGuests:  'Number of guests (including yourself)',
    rsvpNote:    'Note (dietary needs, allergies…)',
    rsvpSubmit:  'Send RSVP',
    rsvpSuccess: 'Thank you! We look forward to celebrating with you. 🎉',
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

// ── Scroll reveal ──

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── RSVP: show/hide guests field ──

document.querySelectorAll('input[name="attendance"]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.getElementById('guests-group').hidden = radio.value !== 'yes';
  });
});

// ── RSVP: form submission ──

const form = document.getElementById('rsvp-form');
const successMsg = document.getElementById('rsvp-success');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const data = new FormData(form);
  const submitBtn = form.querySelector('.form-submit');

  submitBtn.disabled = true;

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      form.hidden = true;
      successMsg.hidden = false;
    } else {
      submitBtn.disabled = false;
      alert(currentLang === 'cs'
        ? 'Odeslání selhalo, zkuste to prosím znovu.'
        : 'Submission failed, please try again.');
    }
  } catch {
    submitBtn.disabled = false;
    alert(currentLang === 'cs'
      ? 'Odeslání selhalo, zkuste to prosím znovu.'
      : 'Submission failed, please try again.');
  }
});

applyLang(currentLang);
