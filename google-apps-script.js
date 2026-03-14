// IMPORTANT: Do NOT use Extensions → Apps Script inside the shared spreadsheet.
// Instead, create a STANDALONE script:
//   1. Go to https://script.google.com
//   2. Click "New project"
//   3. Paste this code
//   4. Deploy as a Web App: Execute as "Me", Who has access "Anyone"
//   5. Copy the deployment URL into the <form action="..."> in index.html
//
// Using a standalone script means it runs under your Google account,
// so shared-spreadsheet ownership issues don't cause 403 errors.

// ── Configuration ──────────────────────────────────────────────────────────

// Spreadsheet ID — found in the sheet URL:
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

const RSVP_SHEET_NAME = 'RSVP';       // Tab for RSVP submissions
const GUESTS_SHEET_NAME = 'Guest IDs';    // Tab with uuid → name mapping

// ──────────────────────────────────────────────────────────────────────────

/**
 * Look up the guest_id in the Guests sheet.
 * Returns the assigned name if found, or null if not.
 */
function lookupGuest(guestId) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return null;

  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 2).getValues();
  for (const [uuid, name] of data) {
    if (uuid === guestId) return name;
  }
  return null;
}

function doPost(e) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const rsvpSheet = ss.getSheetByName(RSVP_SHEET_NAME);

  if (!rsvpSheet) {
    throw new Error('Sheet "' + RSVP_SHEET_NAME + '" not found.');
  }

  // Add header row on first submission
  if (rsvpSheet.getLastRow() === 0) {
    rsvpSheet.appendRow([
      'Timestamp', 'Guest ID', 'Assigned Names', 'Submitted Names',
      'Email', 'Attendance', 'Adults', 'Kids', 'Kids Names',
      'Song', 'Note', 'Valid'
    ]);
  }

  const p = e.parameter;
  const guestId = p.guest_id || '';
  const assignedName = lookupGuest(guestId);
  const isValid = assignedName !== null;

  // Always log the attempt
  rsvpSheet.appendRow([
    new Date(),
    guestId,
    assignedName || (p.user_agent || '(unknown)'),
    p.name         || '',
    p.email        || '',
    p.attendance   || '',
    p.adults       || '',
    p.kids         || '',
    p.kid_names    || '',
    p.song         || '',
    p.note         || '',
    isValid ? 'YES' : 'INVALID',
  ]);

  if (!isValid) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: 'Invalid guest ID' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
