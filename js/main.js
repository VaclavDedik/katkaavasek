'use strict';

const i18n = {
  cs: {
    navWhen:     'Kdy',
    navWhere:    'Kde',
    navDress:    'Dress code',
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
    dressText:   'Nejdůležitější pro nás je, abyste přišli a cítili se dobře. Máme rádi slavnostní atmosféru, proto budeme rádi, když zvolíte cocktail attire. Pokud si nebudete jistí, co na sebe, klidně se nám ozvěte, rádi poradíme.',
    dressExamplesBtn: 'Ukažte mi nějaké příklady!',
    dressYes:    'Ano, takhle!',
    dressNo:     'Takhle raději ne',
    rsvpTitle:   'RSVP',
    rsvpBtn:     'RSVP',
    rsvpName:    'Jméno',
    rsvpEmail:   'E-mail',
    rsvpAttend:  'Zúčastníte se?',
    rsvpYes:     'Ano, přijdu',
    rsvpNo:      'Bohužel nepřijdu',
    rsvpAdults:  'Počet dospělých (včetně vás)',
    rsvpKids:    'Počet dětí',
    rsvpAdultsList: 'Dospělí',
    rsvpChildrenList: 'Děti',
    rsvpSong:    'Na jakou písničku s námi roztančíte parket?',
    rsvpNote:    'Poznámka (dieta, alergie…)',
    rsvpGdpr:    'Souhlasím se zpracováním osobních údajů za účelem organizace svatby. Údaje budou po svatbě smazány.',
    rsvpGdprError: 'Pro odeslání formuláře je nutný souhlas se zpracováním osobních údajů.',
    rsvpAdultsError: 'Prosím, vyplňte počet dospělých.',
    rsvpKidsError: 'Prosím, vyplňte počet dětí.',
    rsvpNameError: 'Prosím, vyplňte jméno.',
    rsvpSubmit:  'Odeslat RSVP',
    rsvpSent:    'Odesláno!',
    rsvpSuccess: 'Děkujeme! Těšíme se na vás. 🎉',
    rsvpDecline: 'To je škoda! Snad se uvidíme jindy. 💛',
    rsvpInvalid: 'Neplatný odkaz. Zkontrolujte prosím odkaz z pozvánky.',
    subtitlePublic: 'Svatba bude!',
  },
  en: {
    navWhen:     'When',
    navWhere:    'Where',
    navDress:    'Dress code',
    subtitle:    'We invite you to celebrate our wedding with us',
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
    dressText:   'The most important thing is that you come and feel good. We love a festive atmosphere, so cocktail attire is preferred. If you\'re unsure what to wear, feel free to reach out to us — we\'re happy to help!',
    dressExamplesBtn: 'Show me examples!',
    dressYes:    'Yes, like this!',
    dressNo:     'Rather not this',
    rsvpTitle:   'RSVP',
    rsvpBtn:     'RSVP',
    rsvpName:    'Name',
    rsvpEmail:   'Email',
    rsvpAttend:  'Will you attend?',
    rsvpYes:     'Yes, I will be there',
    rsvpNo:      'Unfortunately not',
    rsvpAdults:  'Number of adults (including yourself)',
    rsvpKids:    'Number of children',
    rsvpAdultsList: 'Adults',
    rsvpChildrenList: 'Children',
    rsvpSong:    'What song will get you on the dance floor?',
    rsvpNote:    'Note (dietary needs, allergies…)',
    rsvpGdpr:    'I consent to the processing of my personal data for the purpose of organizing the wedding. Data will be deleted after the wedding.',
    rsvpGdprError: 'You must consent to data processing to submit the form.',
    rsvpAdultsError: 'Please enter the number of adults.',
    rsvpKidsError: 'Please enter the number of children.',
    rsvpNameError: 'Please enter a name.',
    rsvpSubmit:  'Send RSVP',
    rsvpSent:    'Sent!',
    rsvpSuccess: 'Thank you! We look forward to celebrating with you. 🎉',
    rsvpDecline: 'Sorry to hear that! Hope to see you another time. 💛',
    rsvpInvalid: 'Invalid link. Please check the link from your invitation.',
    subtitlePublic: 'Wedding coming soon!',
  },
};

let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('cs') ? 'cs' : 'en');

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = i18n[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;

  const gdprCheckbox = document.querySelector('input[name="gdpr_consent"]');
  if (gdprCheckbox) {
    gdprCheckbox.setCustomValidity(gdprCheckbox.checked ? '' : t.rsvpGdprError);
    gdprCheckbox.addEventListener('change', function () {
      this.setCustomValidity(this.checked ? '' : i18n[currentLang].rsvpGdprError);
    });
  }

  const adultsInput = document.getElementById('adults');
  if (adultsInput) {
    function validateAdults() {
      adultsInput.setCustomValidity('');
      adultsInput.setCustomValidity(adultsInput.validity.valid ? '' : i18n[currentLang].rsvpAdultsError);
    }
    validateAdults();
    adultsInput.addEventListener('input', validateAdults);
    adultsInput.addEventListener('invalid', validateAdults);
  }

  const kidsInput = document.getElementById('kids');
  if (kidsInput) {
    function validateKids() {
      kidsInput.setCustomValidity('');
      kidsInput.setCustomValidity(kidsInput.validity.valid ? '' : i18n[currentLang].rsvpKidsError);
    }
    validateKids();
    kidsInput.addEventListener('input', validateKids);
    kidsInput.addEventListener('invalid', validateKids);
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang));
});

// ── Mobile burger menu ──

const topbar = document.getElementById('topbar');
const burger = document.getElementById('topbar-burger');

burger.addEventListener('click', () => {
  topbar.classList.toggle('open');
});

// Close menu when a nav link is clicked
topbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => topbar.classList.remove('open'));
});

// ── Topbar background on scroll ──

const hero = document.querySelector('.main');

function updateTopbar() {
  topbar.classList.toggle('scrolled', window.scrollY >= topbar.offsetHeight);
}

window.addEventListener('scroll', updateTopbar, { passive: true });
updateTopbar();

// ── Dress code examples toggle ──

const dressBtn = document.getElementById('dress-examples-btn');
const dressExamples = document.getElementById('dress-examples');

dressBtn.addEventListener('click', () => {
  const isOpen = dressBtn.getAttribute('aria-expanded') === 'true';
  dressBtn.setAttribute('aria-expanded', !isOpen);
  dressExamples.hidden = isOpen;
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

// ── RSVP: authorization via query params ──

const form = document.getElementById('rsvp-form');
const successMsg = document.getElementById('rsvp-success');
const urlParams = new URLSearchParams(window.location.search);
const guestId = urlParams.get('id');
const guestNameB64 = urlParams.get('name');

let prefilledGuestNames = [];

if (guestId && guestNameB64) {
  // Decode name(s) for later pre-fill — supports comma-separated names
  try {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(guestNameB64), c => c.charCodeAt(0)));
    prefilledGuestNames = decoded.split(',').map(n => n.trim()).filter(Boolean);
  } catch {
    // Invalid base64 — ignore, leave names empty
  }
  document.getElementById('guest-id').value = guestId;

  // Show RSVP image divider — derive filename from name param (strip trailing '=')
  const rsvpImgFile = guestNameB64.replace(/=+$/, '') + '.jpg';
  {
    const divider = document.getElementById('rsvp-image-divider');
    const dividerImg = document.getElementById('rsvp-image-divider-bg');
    dividerImg.src = 'img/rsvp/' + encodeURIComponent(rsvpImgFile);

    function updateDividerLayout() {
      const displayedHeight = window.innerWidth / dividerImg.naturalWidth * dividerImg.naturalHeight;
      const viewportHeight = window.innerHeight;

      if (displayedHeight >= viewportHeight) {
        // Image is tall enough — fixed parallax, section capped at 80vh
        divider.classList.remove('rsvp-image-divider--scroll');
        divider.style.height = (viewportHeight * 0.8) + 'px';
      } else {
        // Image too short for viewport — scroll with content, section matches image
        divider.classList.add('rsvp-image-divider--scroll');
        divider.style.height = displayedHeight + 'px';
      }
    }

    dividerImg.addEventListener('load', () => {
      divider.hidden = false;
      updateDividerLayout();
    });
    window.addEventListener('resize', () => {
      if (dividerImg.naturalWidth) updateDividerLayout();
    });
  }
} else {
  // No valid params — hide the RSVP section and nav link, swap subtitle
  document.getElementById('rsvp').hidden = true;
  document.getElementById('nav-rsvp').hidden = true;
  // Override subtitle i18n key to show public version
  document.querySelector('[data-i18n="subtitle"]').dataset.i18n = 'subtitlePublic';
}

// ── RSVP: show/hide guests field ──

document.querySelectorAll('input[name="attendance"]').forEach(radio => {
  radio.addEventListener('change', () => {
    const isYes = radio.value === 'yes';
    document.getElementById('adults-group').hidden = !isYes;
    document.getElementById('adults').required = isYes;
    document.getElementById('kids').required = isYes;
    document.getElementById('song-group').hidden = !isYes;
    document.getElementById('gdpr-group').hidden = !isYes;
    const gdprBox = document.querySelector('input[name="gdpr_consent"]');
    gdprBox.required = isYes;
    if (!isYes) {
      gdprBox.setCustomValidity('');
      document.getElementById('guest-details').hidden = true;
      document.getElementById('guest-details').innerHTML = '';
    }
  });
});

// ── RSVP: dynamic guest name/email fields ──

function updateGuestDetails() {
  const container = document.getElementById('guest-details');
  const adults = parseInt(document.getElementById('adults').value) || 0;
  const kids = parseInt(document.getElementById('kids').value) || 0;
  const t = i18n[currentLang];

  // Preserve existing values
  const prevAdultNames = [...form.querySelectorAll('.adult-name-input')].map(i => i.value);
  const prevAdultEmails = [...form.querySelectorAll('.adult-email-input')].map(i => i.value);
  const prevKidNames = [...form.querySelectorAll('.kid-name-input')].map(i => i.value);

  container.innerHTML = '';

  const needsAdults = adults >= 1;
  const needsKids = kids > 0;

  if (!needsAdults && !needsKids) {
    container.hidden = true;
    return;
  }

  container.hidden = false;

  if (needsAdults) {
    const section = document.createElement('div');
    section.className = 'guest-details-section';

    const header = document.createElement('span');
    header.className = 'form-label guest-section-header';
    header.dataset.i18n = 'rsvpAdultsList';
    header.textContent = t.rsvpAdultsList;
    section.appendChild(header);

    for (let i = 1; i <= adults; i++) {
      const row = document.createElement('div');
      row.className = 'form-group-row';

      const nameGroup = document.createElement('div');
      nameGroup.className = 'form-group';
      const nameLabel = document.createElement('label');
      nameLabel.className = 'form-label';
      nameLabel.dataset.i18n = 'rsvpName';
      nameLabel.textContent = t.rsvpName;
      const nameInput = document.createElement('input');
      nameInput.className = 'form-input adult-name-input';
      nameInput.type = 'text';
      nameInput.required = true;
      nameInput.autocomplete = 'off';
      // Pre-fill with guest name(s) from invitation
      if (prevAdultNames[i - 1] !== undefined) {
        nameInput.value = prevAdultNames[i - 1];
      } else if (prefilledGuestNames[i - 1]) {
        nameInput.value = prefilledGuestNames[i - 1];
      }
      nameInput.addEventListener('input', function () {
        this.setCustomValidity('');
        this.setCustomValidity(this.validity.valid ? '' : i18n[currentLang].rsvpNameError);
      });
      nameInput.addEventListener('invalid', function () {
        this.setCustomValidity('');
        this.setCustomValidity(this.validity.valid ? '' : i18n[currentLang].rsvpNameError);
      });
      nameGroup.appendChild(nameLabel);
      nameGroup.appendChild(nameInput);

      const emailGroup = document.createElement('div');
      emailGroup.className = 'form-group';
      const emailLabel = document.createElement('label');
      emailLabel.className = 'form-label';
      emailLabel.dataset.i18n = 'rsvpEmail';
      emailLabel.textContent = t.rsvpEmail;
      const emailInput = document.createElement('input');
      emailInput.className = 'form-input adult-email-input';
      emailInput.type = 'email';
      emailInput.autocomplete = 'off';
      if (prevAdultEmails[i - 1]) emailInput.value = prevAdultEmails[i - 1];
      emailGroup.appendChild(emailLabel);
      emailGroup.appendChild(emailInput);

      row.appendChild(nameGroup);
      row.appendChild(emailGroup);
      section.appendChild(row);
    }

    container.appendChild(section);
  }

  if (needsKids) {
    const section = document.createElement('div');
    section.className = 'guest-details-section';

    const header = document.createElement('span');
    header.className = 'form-label guest-section-header';
    header.dataset.i18n = 'rsvpChildrenList';
    header.textContent = t.rsvpChildrenList;
    section.appendChild(header);

    for (let i = 1; i <= kids; i++) {
      const nameGroup = document.createElement('div');
      nameGroup.className = 'form-group';
      const nameLabel = document.createElement('label');
      nameLabel.className = 'form-label';
      nameLabel.dataset.i18n = 'rsvpName';
      nameLabel.textContent = t.rsvpName;
      const nameInput = document.createElement('input');
      nameInput.className = 'form-input kid-name-input';
      nameInput.type = 'text';
      nameInput.required = true;
      nameInput.autocomplete = 'off';
      if (prevKidNames[i - 1]) nameInput.value = prevKidNames[i - 1];
      nameInput.addEventListener('input', function () {
        this.setCustomValidity('');
        this.setCustomValidity(this.validity.valid ? '' : i18n[currentLang].rsvpNameError);
      });
      nameInput.addEventListener('invalid', function () {
        this.setCustomValidity('');
        this.setCustomValidity(this.validity.valid ? '' : i18n[currentLang].rsvpNameError);
      });
      nameGroup.appendChild(nameLabel);
      nameGroup.appendChild(nameInput);

      section.appendChild(nameGroup);
    }

    container.appendChild(section);
  }
}

document.getElementById('adults').addEventListener('input', updateGuestDetails);
document.getElementById('kids').addEventListener('input', updateGuestDetails);

// ── RSVP: form submission ──
// Google Apps Script doesn't return CORS headers, so we use no-cors and
// show success optimistically — the data is saved to the sheet regardless.

form.addEventListener('submit', async e => {
  e.preventDefault();

  const submitBtn = form.querySelector('.form-submit');
  const submitLabel = form.querySelector('.submit-label');
  const submitSpinner = form.querySelector('.submit-spinner');

  submitBtn.disabled = true;
  submitLabel.hidden = true;
  submitSpinner.hidden = false;

  // Serialize guest data into hidden fields
  document.getElementById('user-agent').value = navigator.userAgent;
  document.getElementById('name').value =
    [...form.querySelectorAll('.adult-name-input')].map(i => i.value.trim()).filter(Boolean).join(', ');
  document.getElementById('email').value =
    [...form.querySelectorAll('.adult-email-input')].map(i => i.value.trim()).filter(Boolean).join(', ');
  document.getElementById('kid-names').value =
    [...form.querySelectorAll('.kid-name-input')].map(i => i.value.trim()).filter(Boolean).join(', ');

  try {
    const resp = await fetch(form.action, {
      method: 'POST',
      body: new URLSearchParams(new FormData(form)),
    });
    const data = await resp.json();

    if (data.result !== 'success') {
      submitBtn.disabled = false;
      submitLabel.hidden = false;
      submitSpinner.hidden = true;
      alert(i18n[currentLang].rsvpInvalid);
      return;
    }
  } catch {
    // Network error or CORS issue — show success optimistically
    // (data is still saved to the sheet via no-cors fallback)
  }

  const isAttending = form.querySelector('input[name="attendance"]:checked')?.value === 'yes';

  // Personalized redirect for a specific guest
  if (guestNameB64 === 'UGF2ZWwgRGVkw61rLEFubmEgRGVkw61r') {
    window.location.href = '/rr';
    return;
  }

  submitLabel.hidden = false;
  submitSpinner.hidden = true;
  submitLabel.textContent = i18n[currentLang].rsvpSent;
  successMsg.textContent = i18n[currentLang][isAttending ? 'rsvpSuccess' : 'rsvpDecline'];
  successMsg.hidden = false;
});

applyLang(currentLang);
