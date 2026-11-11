# SHADOW AI

SHADOW AI is a production-oriented AI assistant designed for chat, deep research, coding assistance, file analysis, multilingual UI, and secure server-side configuration.

## What is included

- AI chat with persistent conversations
- Provider-independent LLM abstraction with OpenAI-compatible APIs
- Research workflow with citations and source lists
- File analysis for TXT, CSV, PDF, DOCX, and image-bearing uploads
- Memory controls and consent-based save/delete flows
- Futuristic black/neon-blue dashboard and mobile-first UI
- Installable PWA manifest and service worker
- English and Hindi UI toggling
- Secure config using environment variables only
- Basic API and security tests

## Repository structure

- `server/src/` — backend app, providers, auth, and persistence
- `public/` — frontend HTML/CSS/JS and PWA files
- `server/tests/` — Node tests for auth and security

## Prerequisites

- Node.js 20+
- npm 10+

## Local setup

1. Copy `.env.example` to `.env`
2. Update secrets and connection values for your deployment
3. Install dependencies:

```bash
npm install
```

4. Start dev server:

```bash
npm run dev
```

5. Open the app in a browser:

```text
http://localhost:4000
```

## Production build

```bash
npm run build
npm start
```

## Environment variables

The app expects these variables in `.env`:

- `OPENAI_API_KEY`
- `OPENAI_BASE_URL`
- `OPENAI_MODEL`
- `SEARCH_API_KEY`
- `SEARCH_ENGINE`
- `JWT_SECRET`
- `DEFAULT_USERNAME`
- `DEFAULT_PASSWORD`
- `ALLOWED_ORIGINS`
- `PORT`
- `MAX_UPLOAD_SIZE_MB`

## Security notes

- API keys remain server-side and are never embedded in frontend code
- File uploads are size-limited and validated
- Inputs are sanitized before processing
- CORS and security headers are enabled
- Users can delete memory entries
- This project does not claim to be a native Android APK; it supports installable PWA behavior on supported mobile browsers

## Testing

```bash
npm test
```

## PWA / Android

The app includes a manifest and service worker so it can be installed from a mobile browser as a standalone app. It is designed for future native wrapping and does not claim to be a native APK.

## Notes

If real AI provider credentials are not configured, the app shows clear configuration errors instead of pretending a provider is active.
