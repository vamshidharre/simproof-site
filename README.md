# SimProof website

Static SimProof marketing site hosted at https://simproof.netlify.app/.

## Files

- `index.html`, `home.css`, `home.js`: plain-language homepage, synthetic evidence example, workflow, FAQ and free-pilot form.
- `engineers.html`, `styles.css`: detailed checks, reader scope and interactive technical report. Shares the homepage's typeface and core colours.
- `app.js`: existing evidence demo, terminal and Netlify form handler used by both pages.
- `favicon.svg`: existing evidence-bracket logo.
- `docs/website-research-2026-11-20.md`: product research, evaluated skills, source links, design decisions and validation limits.

## Content evidence

Numeric examples come from the existing synthetic fixtures described in `app.js`. Do not add customer data, invented statistics or unverified solver capabilities. Ansys is the main workflow; other listed readers are early support. A passing check does not certify a design.

## Local preview

From this directory:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080/. There are no package dependencies or build step. Google Fonts are optional external requests with local font fallbacks.

## Contact form

Both pages retain `study-request`, its Netlify form declaration, hidden form-name, honeypot and existing field names. `app.js` validates email, then posts URL-encoded form data to `/`. It displays progress, success or failure feedback. A local Python static server does not accept POST requests, so it can verify the error path only. Production Netlify receipt and notification delivery require a separate authorised end-to-end check. Do not send a real request during routine preview testing.

## Publication

The public site deploys from main. Ask the founder before pushing or publishing. Do not mix this repo with the private SimProof engine, real study files or CASE-A data.
