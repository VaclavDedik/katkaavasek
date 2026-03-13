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

const SHEET_NAME = 'RSVP'; // Name of the tab in your Google Sheet

// ──────────────────────────────────────────────────────────────────────────

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Check the SHEET_NAME setting.');
  }

  // Add header row on first submission
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attendance', 'Adults', 'Kids', 'Song', 'Note']);
  }

  const p = e.parameter;
  sheet.appendRow([
    new Date(),
    p.name       || '',
    p.email      || '',
    p.attendance || '',
    p.adults     || '',
    p.kids       || '',
    p.song       || '',
    p.note       || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
