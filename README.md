# SHADOW AI

SHADOW AI is a production-oriented AI assistant for chat, deep research, coding assistance, and secure file analysis. The project includes a modular TypeScript backend, a responsive futuristic UI, and installable PWA support designed for Android and desktop browsers.

## Features

- AI chat with persistent conversation history
- Provider-independent LLM abstraction for OpenAI-compatible APIs
- Deep research workflow with citations and source links
- File analysis for TXT, CSV, DOCX, PDF, and image uploads
- Memory controls with user consent and deletion support
- English and Hindi UI mode switching
- Secure environment-based API key storage
- PWA manifest and service worker for installability
- Queries and exports for conversation management
- Comprehensive test suite for API, security, auth, and error paths

## Repository structure

- `server/src` — backend, services, providers, validation, and persistence
- `public/` — static frontend, theme, manifest, and service worker
- `server/tests/` — unit and API tests

## Prerequisites

- Node.js 20+
- npm 10+

## Installation

1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Update configuration values for your deployment.
4. Install dependencies:

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open:

- http://localhost:4000

## Production build

```bash
npm run build
npm start
```

## Security and configuration notes

- API keys are stored only in `.env` or server-side secret storage.
- Frontend code never receives raw secrets.
- File uploads are validated and size-limited.
- Rate limiting and security headers are enabled.
- PWA support does not claim to be a native APK.

## Environment variables

Supported variables:

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

If you do not configure a real AI provider, the app remains functional in a safe "not configured" state and clearly tells the user what is missing instead of pretending the integration works.

## Testing

```bash
npm test
```

## PWA / Android

The application includes a web app manifest and service worker for browser install prompts. On Android, use the browser menu and choose “Add to Home Screen” to install the app as a PWA. This is not a native APK and is ready for future Android client wrapping.

## License

This project is intentionally scaffolded for extension and adaptation in production deployments.
