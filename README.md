# Calculator

A clean, responsive calculator built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## 📁 Project Structure

```
calculator/
├── index.html   → Page structure & button layout
├── style.css    → All visual styling & dark mode
├── script.js    → Calculator logic & keyboard support
└── README.md    → You are here 
```

---

## 🚀 Getting Started

No setup or installation needed.

1. Download all 4 files into the same folder
2. Open `index.html` in any modern browser
3. Start calculating

---

## ✨ Features

- Basic operations — Addition, Subtraction, Multiplication, Division
- Percentage ( % ) and sign toggle ( ± )
- Decimal point input
- Chained operations — e.g. `5 + 3 × 2` evaluates step by step
- Division by zero protection — shows `Error` instead of `Infinity`
- Floating point fix — `0.1 + 0.2` correctly shows `0.3`, not `0.30000000000000004`
- Keyboard support — type numbers and operators directly
- Dark mode — automatically follows your OS/browser preference
- Fully responsive — works on mobile and desktop

---

## ⌨️ Keyboard Shortcuts

| Key              | Action         |
|------------------|----------------|
| `0` – `9`        | Enter digits   |
| `.`              | Decimal point  |
| `+`              | Addition       |
| `-`              | Subtraction    |
| `*`              | Multiplication |
| `/`              | Division       |
| `Enter`          | Equals ( = )   |
| `Backspace`      | Clear ( AC )   |
| `Escape`         | Clear ( AC )   |
| `%`              | Percentage     |

---

## 📄 File Reference

### `index.html`
Defines the skeleton of the calculator.

| Element | Role |
|---|---|
| `<div class="calc-wrap">` | Full-page centering wrapper |
| `<div class="calc">` | The calculator card |
| `<div class="display">` | Screen area (expression + result) |
| `<div id="expr">` | Shows ongoing expression e.g. `5 + 3 =` |
| `<div id="result">` | Shows the current number |
| `<div class="grid">` | 4-column button grid |
| `<button onclick="calc(...)">` | Each button calls `calc()` in script.js |

**Key decisions:**
- `<script src="script.js">` is placed at the bottom of `<body>` so all HTML elements exist in the DOM before the script runs
- `aria-live="polite"` on display elements makes screen readers announce number changes for accessibility

---

### `style.css`
Controls all visual appearance. No JavaScript is involved in styling.

| Section | What it does |
|---|---|
| Reset block `*, *::before, *::after` | Removes browser default margins/padding; sets `box-sizing: border-box` |
| `body` | Centers the calculator using Flexbox on a full-height screen |
| `.calc` | The white card — fixed 300px wide, rounded corners |
| `.display` | Column flexbox, bottom/right aligned to mimic a real calculator screen |
| `.grid` | CSS Grid with 4 equal columns and 8px gaps |
| `.btn` | Base button styles with press animation via `transform: scale(0.94)` on `:active` |
| `.btn-num` | Light background — digit buttons |
| `.btn-op` | Green tint — operator buttons ( ÷ × − + ) |
| `.btn-eq` | Dark green — equals button |
| `.btn-clear` | Red tint — AC, ±, % buttons |
| `.btn-zero` | `grid-column: span 2` makes the 0 button double-wide |
| `@media (prefers-color-scheme: dark)` | Full dark mode — activates automatically based on OS setting |

**Fonts used (Google Fonts):**
- `Space Mono` — monospace font for the result display so digits don't shift width
- `DM Sans` — clean sans-serif for expression line and button labels

---

### `script.js`
Contains all calculator logic. Structured into 3 parts.

#### State Variables

| Variable | Type | Purpose |
|---|---|---|
| `cur` | `string` | The number currently shown on the display |
| `prev` | `string` | The saved operand before an operator was pressed |
| `op` | `string` | The pending operator: `+`, `−`, `×`, or `÷` |
| `justEvaled` | `boolean` | `true` immediately after `=` is pressed |

#### Functions

**`updateDisplay()`**
Writes `cur` to the result element on screen. Uses `textContent` (not `innerHTML`) to safely handle any string.

**`calc(key)`**
The main dispatcher. Called by every button click and keyboard event. Handles each key type:

| Key type | Behaviour |
|---|---|
| `AC` | Resets all 4 state variables to defaults |
| `±` | Multiplies `cur` by `-1` to flip sign |
| `%` | Divides `cur` by `100` |
| Operator | Chains if needed, saves `cur` → `prev`, saves operator, resets `cur` to `'0'` |
| `=` | Builds expression label, calls `evaluate(true)`, sets `justEvaled = true` |
| `.` | Guards against double decimals; starts `'0.'` if pressed after `=` |
| Digit | Replaces result if `justEvaled`; prevents leading zeros otherwise |

**`evaluate(isFinal)`**
Performs the actual arithmetic.

| Step | Detail |
|---|---|
| Parse | `parseFloat(prev)` and `parseFloat(cur)` convert strings to numbers |
| Operate | Standard JS operators applied based on `op` |
| Divide-by-zero | Returns `'Error'` if `b === 0` instead of `Infinity` |
| Float fix | `parseFloat(result.toFixed(10))` trims floating point artifacts |
| `isFinal` | If `true` (called from `=`), clears `prev`; if `false` (chaining), keeps it |

**Keyboard Listener**
A `keydown` event on `document` maps physical keys to calculator keys via `KEY_MAP` and calls `calc()` — the exact same function buttons use, so there is zero duplicate logic.

---

## 🎨 Customisation Tips

**Change the accent color**
Find `.btn-op`, `.btn-eq` in `style.css` and replace the green hex values with your preferred color.

**Adjust calculator width**
Change `width: 300px` on `.calc` — the grid and buttons scale automatically.

**Add more operations**
In `script.js`, add a new operator to the `includes()` check in `calc()` and a new condition in `evaluate()`.

---

## 🌐 Browser Support

Works in all modern browsers — Chrome, Firefox, Safari, Edge. No polyfills needed.

---

## 📝 License

Free to use for personal and educational projects.
