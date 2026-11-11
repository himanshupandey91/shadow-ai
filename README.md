# SHADOW AI

SHADOW AI is a production-oriented AI assistant designed for chat, deep research, coding assistance, and secure document/image analysis. The project is built as a full-stack TypeScript application with a responsive futuristic UI and a server-side API architecture.

## Features

- AI chat with persistent conversation history
- Provider-independent LLM architecture for OpenAI-compatible APIs
- Deep research workflow with citations and source links
- File analysis for TXT, CSV, DOCX, PDF, and image inputs
- RSS-like conversations and export tools
- PWA install support for Android and desktop
- Hindi and English UI support
- Secure environment-based configuration
- Memory controls and user consent flows
- Rate limiting, validation, and server-side security headers

## Project structure

- `server/src` — backend API, services, providers, validation, and persistence
- `public/` — static frontend with mobile-first UI and PWA files
- `server/tests/` — API and security tests

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

Then open:

- http://localhost:4000

## Production build

```bash
npm run build
npm start
```

## Environment configuration

The backend expects values in `.env` for secure server-side storage. The following keys are supported:

- `OPENAI_API_KEY` — API key for OpenAI-compatible networks
- `OPENAI_BASE_URL` — provider base URL (optional)
- `OPENAI_MODEL` — default model selector
- `SEARCH_API_KEY` — provider for research endpoints
- `SEARCH_ENGINE` — `tavily` or `serpapi`
- `JWT_SECRET` — session secret
- `DEFAULT_USERNAME` / `DEFAULT_PASSWORD` — initial admin account

If credentials or external services are not available, the app stays in a safe, clearly documented configuration state and reveals the exact missing configuration rather than pretending the integration works.

## Security notes

- API keys are never placed in frontend code
- Browser storage never contains secrets
- All uploads are validated and size-limited
- Input is sanitized and validated server-side
- CORS and security headers are enabled
- Memory deletion is user controlled

## PWA support

The app ships with a web manifest and service worker for installability. This supports Android installation via the browser “Add to Home Screen” flow and is ready for future native wrappers without claiming to be a native APK.

## Testing

```bash
npm test
```

## Deployment notes

- Use a reverse proxy such as Nginx or Traefik in front of the Node server.
- Keep `.env` outside the repository in production.
- Prefer managed secrets in hosting providers.
- Keep the app behind HTTPS in production.

## License

This project is provided as a working starter and can be adapted for production deployment.
