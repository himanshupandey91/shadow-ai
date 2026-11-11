:root {
  --bg: #050b17;
  --bg-alt: #0d1728;
  --panel: rgba(16, 23, 36, 0.9);
  --panel-soft: rgba(16, 23, 36, 0.7);
  --line: rgba(120, 180, 255, 0.28);
  --text: #ebf5ff;
  --muted: #99b7d5;
  --primary: #4dbdff;
  --primary-2: #75f3ff;
  --success: #3ee6a4;
  --danger: #ff6e8b;
  --shadow: 0 0 32px rgba(77, 189, 255, 0.25);
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: Inter, "Segoe UI", sans-serif;
  background: radial-gradient(circle at top, rgba(77,189,255,0.12), transparent 30%), var(--bg);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: rgba(9, 15, 25, 0.92);
  border-right: 1px solid var(--line);
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary), var(--primary-2));
  color: #04111d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  box-shadow: var(--shadow);
}

.brand-name {
  font-weight: 800;
  letter-spacing: 0.08em;
}

.brand-subtitle {
  color: var(--muted);
  font-size: 12px;
}

.nav-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item, .primary-btn, .secondary-btn {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel-soft);
  color: var(--text);
  padding: 12px 14px;
  transition: 0.2s ease;
}

.nav-item.active, .nav-item:hover, .primary-btn:hover, .secondary-btn:hover {
  border-color: rgba(117, 243, 255, 0.7);
  box-shadow: 0 0 0 1px rgba(117,243,255,0.18), var(--shadow);
}

.primary-btn {
  background: linear-gradient(135deg, rgba(77,189,255,0.2), rgba(117,243,255,0.12));
}

.secondary-btn {
  background: transparent;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-dot-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 12px var(--success);
}

.workspace {
  flex: 1;
  padding: 24px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.eyebrow {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.topbar h1 {
  margin: 6px 0 0;
  font-size: clamp(1.6rem, 2vw, 2.4rem);
}

.header-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.panel {
  display: none;
  min-height: calc(100vh - 140px);
}

.panel.active {
  display: block;
}

.conversation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.conversation-pill {
  background: rgba(77,189,255,0.08);
  border: 1px solid var(--line);
  color: var(--text);
  border-radius: 999px;
  padding: 7px 12px;
}

.chat-messages {
  min-height: 350px;
  border: 1px solid var(--line);
  background: rgba(8, 16, 26, 0.76);
  border-radius: 18px;
  padding: 18px;
  overflow: auto;
}

.message {
  max-width: min(78%, 780px);
  margin: 14px 0;
  border-radius: 16px;
  padding: 12px 14px;
  line-height: 1.6;
  white-space: pre-wrap;
}

.message.user {
  margin-left: auto;
  background: linear-gradient(135deg, rgba(77,189,255,0.2), rgba(117,243,255,0.08));
}

.message.assistant {
  background: rgba(117,243,255,0.06);
  border: 1px solid rgba(117,243,255,0.12);
}

.composer {
  margin-top: 18px;
  border: 1px solid var(--line);
  background: rgba(10,17,28,0.92);
  border-radius: 18px;
  padding: 12px;
}

textarea, input, select {
  width: 100%;
  background: rgba(5, 11, 20, 0.92);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 12px 14px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.composer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
}

.meta-text {
  color: var(--muted);
  font-size: 13px;
}

.panel-card {
  background: rgba(8, 16, 26, 0.82);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px;
}

.stack-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.research-output, .code-output, .file-output, .memory-output {
  margin-top: 14px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(7, 13, 21, 0.88);
  color: var(--text);
  white-space: pre-wrap;
}

pre {
  background: rgba(117,243,255,0.06);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 12px;
  overflow-x: auto;
}

code {
  font-family: "SFMono-Regular", Consolas, monospace;
}

.source-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.source-item {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(77,189,255,0.06);
  padding: 10px 12px;
}

@media (max-width: 860px) {
  .app-shell {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--line);
  }

  .workspace {
    padding: 14px;
  }

  .message {
    max-width: 90%;
  }
}
