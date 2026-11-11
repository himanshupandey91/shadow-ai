:root {
  --bg: #050b17;
  --panel: rgba(14, 21, 31, 0.9);
  --panel-soft: rgba(10, 16, 25, 0.8);
  --line: rgba(90, 175, 255, 0.3);
  --text: #eaf6ff;
  --muted: #9cb6d2;
  --primary: #4dbdff;
  --primary-2: #6fe5ff;
  --success: #59e5a8;
  --shadow: 0 0 22px rgba(77, 189, 255, 0.28);
}

* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; background: linear-gradient(180deg, #050b17, #091522); color: var(--text); font-family: Inter, "Segoe UI", sans-serif; }
button, input, textarea, select { font: inherit; }
button { cursor: pointer; }

.app-shell { display: flex; min-height: 100vh; }
.sidebar { width: 280px; background: rgba(8, 13, 21, 0.95); border-right: 1px solid var(--line); padding: 20px 16px; display: flex; flex-direction: column; gap: 18px; }
.brand-row { display: flex; align-items: center; gap: 12px; }
.brand-mark { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; background: linear-gradient(135deg, var(--primary), var(--primary-2)); color: #031321; box-shadow: var(--shadow); }
.brand-name { font-weight: 800; letter-spacing: 0.08em; }
.brand-subtitle { color: var(--muted); font-size: 12px; }
.nav-stack { display: flex; flex-direction: column; gap: 8px; }
.nav-item, .primary-btn, .secondary-btn { border: 1px solid var(--line); border-radius: 12px; background: var(--panel-soft); color: var(--text); padding: 12px 14px; }
.nav-item.active, .nav-item:hover, .primary-btn:hover, .secondary-btn:hover { box-shadow: var(--shadow); border-color: rgba(111, 229, 255, 0.7); }
.primary-btn { background: linear-gradient(135deg, rgba(77,189,255,0.18), rgba(111,229,255,0.08)); }
.secondary-btn { background: transparent; }
.sidebar-footer { margin-top: auto; display: flex; flex-direction: column; gap: 10px; }
.status-row { display: flex; align-items: center; gap: 8px; color: var(--muted); }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--success); box-shadow: 0 0 12px var(--success); }
.workspace { flex: 1; padding: 24px; }
.topbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 18px; }
.eyebrow { text-transform: uppercase; letter-spacing: 0.12em; color: var(--muted); font-size: 12px; }
.topbar h1 { margin: 6px 0 0; }
.header-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.panel { display: none; min-height: calc(100vh - 150px); }
.panel.active { display: block; }
.conversation-list { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.conversation-pill { background: rgba(77,189,255,0.08); border: 1px solid var(--line); border-radius: 999px; padding: 8px 12px; color: var(--text); }
.chat-messages { min-height: 340px; border: 1px solid var(--line); border-radius: 18px; padding: 18px; background: rgba(7, 14, 22, 0.85); overflow: auto; }
.message { max-width: min(78%, 780px); margin: 14px 0; padding: 12px 14px; border-radius: 16px; white-space: pre-wrap; line-height: 1.6; }
.message.user { margin-left: auto; background: linear-gradient(135deg, rgba(77,189,255,0.18), rgba(111,229,255,0.08)); }
.message.assistant { background: rgba(111,229,255,0.06); border: 1px solid var(--line); }
.composer { margin-top: 18px; border: 1px solid var(--line); border-radius: 18px; padding: 12px; background: rgba(8, 15, 24, 0.88); }
textarea, input, select { width: 100%; background: rgba(4,10,18,0.9); color: var(--text); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
textarea { resize: vertical; min-height: 90px; }
.composer-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 10px; }
.meta-text { color: var(--muted); font-size: 12px; }
.panel-card { background: rgba(8, 15, 24, 0.85); border: 1px solid var(--line); border-radius: 18px; padding: 18px; }
.stack-form { display: flex; flex-direction: column; gap: 12px; }
.field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.result-box { margin-top: 14px; border: 1px solid var(--line); border-radius: 12px; padding: 12px; background: rgba(5, 10, 16, 0.9); white-space: pre-wrap; }
.source-card { border: 1px solid var(--line); border-radius: 10px; padding: 10px; background: rgba(77,189,255,0.06); margin-top: 8px; }
pre { overflow-x: auto; }

@media (max-width: 860px) {
  .app-shell { flex-direction: column; }
  .sidebar { width: 100%; border-right: none; border-bottom: 1px solid var(--line); }
  .workspace { padding: 14px; }
  .message { max-width: 90%; }
}
