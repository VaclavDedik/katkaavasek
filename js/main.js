'use strict';

const i18n = {
  cs: {
    subtitle:    'Zveme vás na naši svatbu',
    date:        '5. září 2026',
    whenTitle:   'Kdy',
    whenDate:    '5. září 2026',
    whenTime:    'Čas bude upřesněn',
    whenCalendar: 'Uložit do Google Kalendáře',
    whereTitle:  'Kde',
    whereVenue:  'Vila Engelsmann',
    whereAddress: 'Hlinky 510/110, 603 00 Brno',
    whereMap:    'Zobrazit na mapě',
    dressTitle:  'Dress code',
    dressText:   'Nejdůležitější je, že přijdete. Přesto nám záleží na slavnostní atmosféře — uvítáme formální oblečení. Prosíme, vyhněte se bílým šatům.',
    rsvpTitle:   'RSVP',
    rsvpBtn:     'Pošlete nám vaše RSVP',
    rsvpName:    'Jméno',
    rsvpAttend:  'Zúčastníte se?',
    rsvpYes:     'Ano, přijdu',
    rsvpNo:      'Bohužel nepřijdu',
    rsvpGuests:  'Počet hostů (včetně vás)',
    rsvpNote:    'Poznámka (dieta, alergie…)',
    rsvpSubmit:  'Odeslat RSVP',
    rsvpSent:    'Odesláno!',
    rsvpSuccess: 'Děkujeme! Těšíme se na vás. 🎉',
  },
  en: {
    subtitle:    'We invite you to our wedding',
    date:        'September 5, 2026',
    whenTitle:   'When',
    whenDate:    'September 5, 2026',
    whenTime:    'Time to be announced',
    whenCalendar: 'Save to Google Calendar',
    whereTitle:  'Where',
    whereVenue:  'Vila Engelsmann',
    whereAddress: 'Hlinky 510/110, 603 00 Brno',
    whereMap:    'View on map',
    dressTitle:  'Dress code',
    dressText:   'The most important thing is that you come. That said, we love a festive atmosphere — formal attire is preferred. Please avoid white dresses.',
    rsvpTitle:   'RSVP',
    rsvpBtn:     'Send us your RSVP',
    rsvpName:    'Name',
    rsvpAttend:  'Will you attend?',
    rsvpYes:     'Yes, I will be there',
    rsvpNo:      'Unfortunately not',
    rsvpGuests:  'Number of guests (including yourself)',
    rsvpNote:    'Note (dietary needs, allergies…)',
    rsvpSubmit:  'Send RSVP',
    rsvpSent:    'Sent!',
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
// Google Apps Script doesn't return CORS headers, so we use no-cors and
// show success optimistically — the data is saved to the sheet regardless.

const form = document.getElementById('rsvp-form');
const successMsg = document.getElementById('rsvp-success');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const submitBtn = form.querySelector('.form-submit');
  const submitLabel = form.querySelector('.submit-label');
  const submitSpinner = form.querySelector('.submit-spinner');

  submitBtn.disabled = true;
  submitLabel.hidden = true;
  submitSpinner.hidden = false;

  try {
    await fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(new FormData(form)),
    });
  } catch {
    // Network error — re-enable so the user can retry
    submitBtn.disabled = false;
    submitLabel.hidden = false;
    submitSpinner.hidden = true;
    alert(currentLang === 'cs'
      ? 'Odeslání selhalo, zkuste to prosím znovu.'
      : 'Submission failed, please try again.');
    return;
  }

  submitLabel.hidden = false;
  submitSpinner.hidden = true;
  submitLabel.textContent = i18n[currentLang].rsvpSent;
  successMsg.hidden = false;
});

applyLang(currentLang);
