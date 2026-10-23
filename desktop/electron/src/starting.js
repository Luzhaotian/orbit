"use strict";
const { BrowserWindow } = require("electron");

const TEXT = {
  en: ["Orbit Studio is starting", "Waiting for the local service to be ready. This window will close automatically."],
  zh: ["Orbit Studio 正在启动", "正在等待本地服务就绪，完成后此窗口会自动关闭。"],
};

function startingPage(locale) {
  const [title, note] = String(locale).toLowerCase().startsWith("zh") ? TEXT.zh : TEXT.en;
  return `<!doctype html><meta charset="utf-8"><title>${title}</title><style>
:root{color-scheme:light dark;--bg:#fafafa;--fg:#1c1c1e;--mute:#6b6b70;--orb:#0284c7;--orb2:#38bdf8;--sat:#7dd3fc}
@media(prefers-color-scheme:dark){:root{--bg:#1b1b1d;--fg:#ececee;--mute:#9a9aa0;--orb:#38bdf8;--orb2:#7dd3fc;--sat:#e0f2fe}}
body{margin:0;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:stretch;gap:10px;padding:0 28px;box-sizing:border-box;background:var(--bg);color:var(--fg);font:14px system-ui,sans-serif}
.brand{display:flex;align-items:center;gap:14px}
.mark{width:44px;height:44px;flex:none}
.mark svg{display:block;width:100%;height:100%}
.sat{transform-origin:40px 40px;animation:orbit 2.6s linear infinite}
.core{animation:pulse 1.8s ease-in-out infinite}
@keyframes orbit{to{transform:rotate(360deg)}}
@keyframes pulse{0%,100%{opacity:.92}50%{opacity:1}}
@media(prefers-reduced-motion:reduce){.sat{animation:none}.core{animation:none}}
h1{margin:0;font-size:16px;font-weight:600}p{margin:0;color:var(--mute);line-height:1.5}
.bar{height:3px;margin-top:4px;border-radius:2px;background:var(--mute);opacity:.35;overflow:hidden;position:relative}
.bar::after{content:"";position:absolute;inset:0 70% 0 0;background:var(--orb);animation:run 1.4s ease-in-out infinite}
@keyframes run{from{transform:translateX(-100%)}to{transform:translateX(340%)}}
</style>
<div class="brand">
  <div class="mark" aria-hidden="true">
    <svg viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="40" rx="34" ry="14" stroke="var(--orb)" stroke-width="3.2" transform="rotate(-28 40 40)" opacity=".95"/>
      <circle class="core" cx="40" cy="40" r="16" fill="var(--orb)"/>
      <circle cx="35" cy="36" r="5" fill="#fff" opacity=".28"/>
      <g class="sat">
        <circle cx="66" cy="40" r="5.2" fill="var(--sat)"/>
        <circle cx="66" cy="40" r="2" fill="#fff" opacity=".55"/>
      </g>
    </svg>
  </div>
  <div>
    <h1>${title}</h1>
    <p>${note}</p>
  </div>
</div>
<div class="bar"></div>`;
}

// showStarting is the only sign of life while the kernel has not answered: until
// it does there is no window of the application's own to draw.
function showStarting(locale) {
  const win = new BrowserWindow({
    width: 420,
    height: 168,
    resizable: false,
    minimizable: false,
    maximizable: false,
    frame: true,
    title: "Orbit Studio",
    autoHideMenuBar: true,
    webPreferences: { sandbox: true, contextIsolation: true, nodeIntegration: false },
  });
  win.removeMenu();
  void win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(startingPage(locale))}`);
  return win;
}

module.exports = { showStarting, startingPage };
