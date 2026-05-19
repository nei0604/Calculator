// ── State ──
let cur = '0';       // current number being entered
let prev = '';       // previous operand (before an operator was pressed)
let op = '';         // pending operator: +, −, ×, ÷
let justEvaled = false; // true right after = is pressed

// ── DOM helpers ──
const exprEl   = document.getElementById('expr');
const resultEl = document.getElementById('result');

function updateDisplay() {
  resultEl.textContent = cur;
}

// ── Main dispatcher ──
function calc(key) {

  // Clear all
  if (key === 'AC') {
    cur = '0';
    prev = '';
    op = '';
    justEvaled = false;
    exprEl.textContent = '';
    updateDisplay();
    return;
  }

  // Toggle sign
  if (key === '±') {
    cur = String(parseFloat(cur) * -1);
    updateDisplay();
    return;
  }

  // Percentage
  if (key === '%') {
    cur = String(parseFloat(cur) / 100);
    updateDisplay();
    return;
  }

  // Operator pressed: ÷ × − +
  if (['÷', '×', '−', '+'].includes(key)) {
    // If there's already a pending operation, evaluate it first (chaining)
    if (prev && op && !justEvaled) {
      evaluate(false);
    }
    prev = cur;
    op = key;
    justEvaled = false;
    exprEl.textContent = cur + ' ' + key;
    cur = '0';
    return;
  }

  // Equals
  if (key === '=') {
    if (!op || !prev) return;
    exprEl.textContent = prev + ' ' + op + ' ' + cur + ' =';
    evaluate(true);
    op = '';
    justEvaled = true;
    return;
  }

  // Decimal point
  if (key === '.') {
    if (cur.includes('.')) return; // only one decimal allowed
    cur = (justEvaled ? '0' : cur) + '.';
    justEvaled = false;
    updateDisplay();
    return;
  }

  // Digit (0-9)
  if (justEvaled) {
    cur = key;
    justEvaled = false;
  } else {
    cur = cur === '0' ? key : cur + key;
  }
  updateDisplay();
}

// ── Arithmetic ──
function evaluate(isFinal) {
  const a = parseFloat(prev);
  const b = parseFloat(cur);
  let result;

  if (op === '+')      result = a + b;
  else if (op === '−') result = a - b;
  else if (op === '×') result = a * b;
  else if (op === '÷') result = b === 0 ? 'Error' : a / b;

  if (result === 'Error') {
    cur = 'Error';
    updateDisplay();
    return;
  }

  // Trim floating point artifacts (e.g. 0.1 + 0.2 = 0.30000000000000004)
  cur = String(parseFloat(result.toFixed(10)));

  if (isFinal) prev = '';
  updateDisplay();
}

// ── Keyboard support ──
const KEY_MAP = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '.': '.',
  '+': '+',
  '-': '−',
  '*': '×',
  '/': '÷',
  'Enter': '=',
  'Backspace': 'AC',
  'Escape': 'AC',
  '%': '%'
};

document.addEventListener('keydown', (e) => {
  const mapped = KEY_MAP[e.key];
  if (mapped) {
    e.preventDefault();
    calc(mapped);
  }
});
