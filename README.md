# ⚡ Anonyte Headway Solver

<p align="center">
  <img src="https://img.shields.io/badge/version-6.0.0-ef4444?style=for-the-badge&logo=speedtest&logoColor=white" alt="Version 6.0.0" />
  <img src="https://img.shields.io/badge/Oxford-Headway%205e-f59e0b?style=for-the-badge&logo=oxforduniversitypress&logoColor=white" alt="Headway 5e" />
  <img src="https://img.shields.io/badge/Status-Fully%20Autonomous-10b981?style=for-the-badge&logo=powershell&logoColor=white" alt="Autonomous" />
  <img src="https://img.shields.io/badge/Quota-Zero%20API%20Cost-10b981?style=for-the-badge" alt="Zero Quota" />
  <img src="https://img.shields.io/badge/License-MIT-gray?style=for-the-badge" alt="License MIT" />
</p>

<p align="center">
  <strong>Universal Autonomous Client-Side AI Solver & Virtual Mic Engine for Oxford Online Practice (Headway 5th Edition).</strong>
</p>

---

## 🎨 UI & Aesthetics: Red, Black, Green & Yellow

The floating on-screen solver is designed with a sleek, high-contrast Cyberpunk aesthetic:

- 🔴 **Crimson Red (`#ef4444`)**: Glowing outer border, Anonyte brand insignia, minimize controls, error alerts.
- ⬛ **Obsidian Black (`#0a0b0e`)**: Glassmorphism card backdrop with 16px blur (`backdrop-filter: blur(16px)`), deep shadow.
- 🟡 **Cyber Amber / Yellow (`#f59e0b` / `#fbbf24`)**: Dynamic detected activity engine pill, subheadings, warning tags, drag indicators.
- 🟢 **Neon Emerald Green (`#10b981` / `#34d399`)**: Glowing **AUTO-SOLVE TASK** action button, live status beacon, 100% completion badge.

> **Draggable & Collapsible:** Drag the widget anywhere on your screen using the top bar. Click `−` to collapse into a mini floating badge when reading long exercise questions!

---

## 🚀 Instant Usage Methods

Choose the method that fits your workflow:

```
┌────────────────────────────────────────────────────────────────────────┐
│  METHOD 1: Instant DevTools Console 1-Liner (Zero Install / "curl")    │
│  METHOD 2: Self-Host on your Subdomain (Vercel / Cloudflare / Custom)  │
│  METHOD 3: Tampermonkey Userscript (Auto-runs on page load)            │
│  METHOD 4: Drag-and-Drop Bookmarklet (1-Click in browser bar)          │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Method 1: Instant Console 1-Liner (No Extension Required!)

If you or your friends don't want to install Tampermonkey, you can launch the solver directly from Chrome DevTools (the browser's version of `curl`):

1. Open any activity on [Oxford Online Practice](https://headway5e.oxfordonlinepractice.com/).
2. Press <kbd>F12</kbd> (or <kbd>Ctrl + Shift + J</kbd> on Windows / <kbd>Cmd + Option + J</kbd> on Mac) to open the **Console**.
3. Paste **either** of the commands below and hit **Enter**:

#### Option A: Script Injector (Recommended — 100% immune to CORS)
```javascript
(function(d,s){s=d.createElement('script');s.src='https://YOUR-SUBDOMAIN/anonyte-solver.js?t='+Date.now();d.head.appendChild(s)})(document);
```

#### Option B: Fetch One-Liner ("curl-style" execution)
```javascript
fetch('https://YOUR-SUBDOMAIN/anonyte-solver.js').then(r=>r.text()).then(eval);
```

⚡ **Result:** The floating **Anonyte Headway Solver** widget immediately appears on the bottom-right corner of your screen! Click **AUTO-SOLVE TASK** to complete the exercise.

---

### Method 2: Self-Hosting on your Subdomain

You can host `anonyte-solver.js` on your own custom subdomain (e.g., `solver.yourdomain.com` or `headway.yourdomain.com`) in 60 seconds:

#### Deploy to Vercel / Cloudflare Pages / Netlify / GitHub Pages
1. Push this repository to GitHub or upload the files (`anonyte-solver.js`, `index.html`, `vercel.json`, `_headers`).
2. Deploy to **Vercel** or **Cloudflare Pages**.
3. **CORS is Pre-Configured:** `vercel.json` and `_headers` already contain:
   ```http
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET, HEAD, OPTIONS
   ```
4. **Web Portal Included:** Visiting your subdomain in any browser displays `index.html` — a stylish dashboard where users can click 1-button to copy their console command or drag the bookmarklet!

---

### Method 3: Tampermonkey Userscript (Permanent Setup)

For users who want the solver to appear automatically every time an activity opens:

1. Install [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Brave, Edge, Firefox).
2. Create a **New Script** in the Tampermonkey dashboard.
3. Copy the contents of [`dist/headway-solver.user.js`](dist/headway-solver.user.js) and paste it into the editor.
4. Press <kbd>Ctrl + S</kbd> to save.
5. Whenever you navigate to Oxford Online Practice, the widget is mounted automatically.

---

### Method 4: Drag-and-Drop Bookmarklet

1. Show your Chrome Bookmarks Bar (<kbd>Ctrl + Shift + B</kbd>).
2. Create a new bookmark (Right click -> **Add page...**).
3. Name it: `⚡ Solve Headway`
4. In the **URL** field, paste:
   ```javascript
   javascript:(function(){var s=document.createElement('script');s.src='https://YOUR-SUBDOMAIN/anonyte-solver.min.js?t='+Date.now();document.head.appendChild(s);})();
   ```
   *(Or use the 100% offline standalone snippet in [`bookmarklet.js`](bookmarklet.js))*
5. On any Oxford activity page, click the bookmark!

---

## 🧠 Supported Exercise Engines

Anonyte Headway Solver includes dedicated solvers for all major Oxford activity engines:

| Category | Engines Supported | Mechanism |
| :--- | :--- | :--- |
| **Multiple Choice** | `mc_item_level_image_audio`, `mc_item_level_multiple_choice`, `mc_questions_single_image` | Backbone Marionette region unpacking + `blackButton` option resolution |
| **Speaking & Audio** | `text_prompt_record`, `dialogue_record_playback` | Virtual Microphone via Web Audio API (`getUserMedia` stream synthesis) + auto-save |
| **True / False** | Radio matrices, truth-check lists | Normalized answer mapping & state dispatch |
| **Dropdown Selects** | `sentence_dropdown_text_only`, `dialogue_dropdown` | Option key discovery (`id: 0`, `correct: true`) |
| **Category Sorting** | `sorting_text_only`, `sorting_images`, `sorting_audio` | Bin ID mapping with jQuery UI drop emulation |
| **Matching & Memory** | `pelmanism`, `match_items` | Card pair ID resolution & sequential click triggers |
| **Gap Fills** | `sentence_open_gap_text_only`, `dialogue_open_gap_text_only` | Input value dispatch with synthetic React/jQuery events |

---

## 🔬 How It Works (Client-Side Architecture)

Unlike generic browser extensions that screenshot your screen and spend expensive OpenAI/Gemini tokens guessing answers:

1. **Backbone & Marionette Inspection:** Oxford Online Practice stores the complete question state, answer options, and authoring keys directly in the client memory (`OUP.activity.currentView`).
2. **Deep Region Unpacking:** Item-level activities isolate models inside Marionette sub-regions (`view.questionRegion.currentView.collection`). Anonyte traverses all regions recursively to pull the exact authoring keys.
3. **Synthetic Event Dispatch:** Simulates genuine user interactions (`click`, `input`, `change`, `drop`) on both the DOM inputs and underlying Backbone listeners.
4. **Virtual Audio Synthesizer:** When a speaking task is encountered, Anonyte replaces the browser's microphone input with a Web Audio node (`AudioContext.createMediaStreamDestination()`), streams pristine synthetic audio, triggers the Oxford recorder, and clicks **Save** automatically.

---

## 📁 Repository Structure

```
├── dist/
│   ├── anonyte-solver.min.js   # Shielded production payload (stream-cipher encrypted)
│   └── headway-solver.user.js  # Shielded Tampermonkey userscript
├── anonyte-solver.min.js       # Root payload for direct subdomain / CDN access
├── index.html                  # Cyberpunk subdomain web dashboard & 1-click installer
├── loader.js                   # 1-liner DevTools console loader
├── bookmarklet.js              # 1-click bookmarklet installer
├── vercel.json                 # Pre-configured CORS headers for Vercel
├── _headers                    # Pre-configured CORS headers for Cloudflare / Netlify
└── README.md                   # Documentation & quick start guide
```

---

## ⚖️ Disclaimer & License

This project is licensed under the **MIT License**. It is intended strictly for educational research, automated testing, and accessibility benchmarking.
