// ============================================================
//  Arrays & Loops Practical  –  JavaScript
//  Pranav Lakhe | PRN: 24070521248
// ============================================================

// ── Source array for Section A ──────────────────────────────
const INITIAL_ARRAY = [25, 10, 45, 5, 30, 15];
let arr = [...INITIAL_ARRAY];

// ── Source array for Case Study ─────────────────────────────
const CS_ARRAY = [25, 10, 45, 5, 30, 15];

// ── DOM references ──────────────────────────────────────────
const arrayVisual = document.getElementById('array-visual');
const consoleA    = document.getElementById('console-a');

const csArrayVisual = document.getElementById('cs-array-visual');
const consoleCS     = document.getElementById('console-cs');
const csResults     = document.getElementById('cs-results');
const csMaxEl       = document.getElementById('cs-max');
const csMinEl       = document.getElementById('cs-min');

// ── Render helpers ──────────────────────────────────────────

function renderArray(container, data, highlightIndices = [], highlightClass = '') {
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = '<span style="color:var(--text-dim);font-size:0.85rem;">[ empty ]</span>';
        return;
    }
    data.forEach((val, i) => {
        const el = document.createElement('span');
        el.className = 'arr-item';
        if (highlightIndices.includes(i) && highlightClass) {
            el.classList.add(highlightClass);
        }
        el.textContent = val;
        container.appendChild(el);
    });
}

function logToConsole(target, message, type = '') {
    const p = document.createElement('p');
    p.className = `console-line ${type}`;
    p.textContent = message;
    target.appendChild(p);
    target.scrollTop = target.scrollHeight;
}

function clearConsole(target) {
    target.innerHTML = '';
}

// ── Initial renders ─────────────────────────────────────────
renderArray(arrayVisual, arr);
renderArray(csArrayVisual, CS_ARRAY);

// ════════════════════════════════════════════════════════════
//  SECTION A  –  Array Manipulation
// ════════════════════════════════════════════════════════════

// push()
document.getElementById('btn-push').addEventListener('click', () => {
    const val = Math.floor(Math.random() * 50) + 1;
    clearConsole(consoleA);
    logToConsole(consoleA, `// push(${val})`, 'dim');
    logToConsole(consoleA, `Before: [${arr.join(', ')}]`);
    arr.push(val);
    logToConsole(consoleA, `After:  [${arr.join(', ')}]`);
    logToConsole(consoleA, `→ Added ${val} to the end. Length is now ${arr.length}.`, 'info');
    renderArray(arrayVisual, arr, [arr.length - 1], 'highlight-new');
});

// pop()
document.getElementById('btn-pop').addEventListener('click', () => {
    clearConsole(consoleA);
    if (arr.length === 0) {
        logToConsole(consoleA, '⚠ Array is empty, nothing to pop.', 'warn');
        return;
    }
    logToConsole(consoleA, '// pop()', 'dim');
    logToConsole(consoleA, `Before: [${arr.join(', ')}]`);
    const removed = arr.pop();
    logToConsole(consoleA, `After:  [${arr.join(', ')}]`);
    logToConsole(consoleA, `→ Removed ${removed} from the end.`, 'error');
    renderArray(arrayVisual, arr);
});

// unshift()
document.getElementById('btn-unshift').addEventListener('click', () => {
    const val = Math.floor(Math.random() * 50) + 1;
    clearConsole(consoleA);
    logToConsole(consoleA, `// unshift(${val})`, 'dim');
    logToConsole(consoleA, `Before: [${arr.join(', ')}]`);
    arr.unshift(val);
    logToConsole(consoleA, `After:  [${arr.join(', ')}]`);
    logToConsole(consoleA, `→ Added ${val} to the beginning. Length is now ${arr.length}.`, 'info');
    renderArray(arrayVisual, arr, [0], 'highlight-new');
});

// shift()
document.getElementById('btn-shift').addEventListener('click', () => {
    clearConsole(consoleA);
    if (arr.length === 0) {
        logToConsole(consoleA, '⚠ Array is empty, nothing to shift.', 'warn');
        return;
    }
    logToConsole(consoleA, '// shift()', 'dim');
    logToConsole(consoleA, `Before: [${arr.join(', ')}]`);
    const removed = arr.shift();
    logToConsole(consoleA, `After:  [${arr.join(', ')}]`);
    logToConsole(consoleA, `→ Removed ${removed} from the beginning.`, 'error');
    renderArray(arrayVisual, arr);
});

// splice()
document.getElementById('btn-splice').addEventListener('click', () => {
    clearConsole(consoleA);
    if (arr.length < 2) {
        logToConsole(consoleA, '⚠ Array too short for splice demo (need >= 2 items).', 'warn');
        return;
    }
    const startIdx = 1;
    const deleteCount = 1;
    const insertVal = Math.floor(Math.random() * 50) + 1;
    logToConsole(consoleA, `// splice(${startIdx}, ${deleteCount}, ${insertVal})`, 'dim');
    logToConsole(consoleA, `Before: [${arr.join(', ')}]`);
    const spliced = arr.splice(startIdx, deleteCount, insertVal);
    logToConsole(consoleA, `After:  [${arr.join(', ')}]`);
    logToConsole(consoleA, `→ Removed [${spliced.join(', ')}] at index ${startIdx}, inserted ${insertVal}.`, 'info');
    renderArray(arrayVisual, arr, [startIdx], 'highlight-new');
});

// slice()
document.getElementById('btn-slice').addEventListener('click', () => {
    clearConsole(consoleA);
    if (arr.length < 3) {
        logToConsole(consoleA, '⚠ Array too short for slice demo (need >= 3 items).', 'warn');
        return;
    }
    const start = 1;
    const end = 4;
    logToConsole(consoleA, `// slice(${start}, ${end})`, 'dim');
    logToConsole(consoleA, `Original: [${arr.join(', ')}]`);
    const sliced = arr.slice(start, Math.min(end, arr.length));
    logToConsole(consoleA, `Sliced:   [${sliced.join(', ')}]`);
    logToConsole(consoleA, `→ Extracted elements from index ${start} to ${Math.min(end, arr.length) - 1} (original unchanged).`, 'info');
    // highlight the sliced range
    const indices = [];
    for (let i = start; i < Math.min(end, arr.length); i++) indices.push(i);
    renderArray(arrayVisual, arr, indices, 'highlight-slice');
});

// Reset
document.getElementById('btn-reset').addEventListener('click', () => {
    arr = [...INITIAL_ARRAY];
    clearConsole(consoleA);
    logToConsole(consoleA, '↺ Array reset to initial values.', 'dim');
    renderArray(arrayVisual, arr);
});


// ════════════════════════════════════════════════════════════
//  SECTION B  –  Higher-Order Methods
// ════════════════════════════════════════════════════════════

const methodArr = [25, 10, 45, 5, 30, 15];

// forEach()
document.getElementById('btn-foreach').addEventListener('click', () => {
    const out = document.getElementById('out-foreach');
    let lines = [];
    lines.push(`Array: [${methodArr.join(', ')}]\n`);
    methodArr.forEach((val, idx) => {
        lines.push(`Index ${idx} → ${val}`);
    });
    out.textContent = lines.join('\n');
});

// map()
document.getElementById('btn-map').addEventListener('click', () => {
    const out = document.getElementById('out-map');
    const doubled = methodArr.map(val => val * 2);
    let lines = [];
    lines.push(`Original: [${methodArr.join(', ')}]`);
    lines.push(`Doubled:  [${doubled.join(', ')}]`);
    out.textContent = lines.join('\n');
});

// filter()
document.getElementById('btn-filter').addEventListener('click', () => {
    const out = document.getElementById('out-filter');
    const filtered = methodArr.filter(val => val > 15);
    let lines = [];
    lines.push(`Original: [${methodArr.join(', ')}]`);
    lines.push(`filter(x => x > 15)`);
    lines.push(`Result:   [${filtered.join(', ')}]`);
    out.textContent = lines.join('\n');
});

// reduce()
document.getElementById('btn-reduce').addEventListener('click', () => {
    const out = document.getElementById('out-reduce');
    const sum = methodArr.reduce((acc, val) => acc + val, 0);
    let lines = [];
    lines.push(`Array: [${methodArr.join(', ')}]`);
    lines.push(`reduce((acc, val) => acc + val, 0)`);
    lines.push(`Sum = ${sum}`);
    out.textContent = lines.join('\n');
});


// ════════════════════════════════════════════════════════════
//  CASE STUDY  –  Max & Min Finder
// ════════════════════════════════════════════════════════════

document.getElementById('btn-run-case').addEventListener('click', () => {
    const numbers = CS_ARRAY;

    // Find max and min using reduce
    const maxVal = numbers.reduce((max, val) => val > max ? val : max, numbers[0]);
    const minVal = numbers.reduce((min, val) => val < min ? val : min, numbers[0]);

    // Show result cards
    csResults.style.display = 'grid';
    csMaxEl.textContent = maxVal;
    csMinEl.textContent = minVal;

    // Highlight max and min in the array visual
    const maxIdx = numbers.indexOf(maxVal);
    const minIdx = numbers.indexOf(minVal);
    csArrayVisual.innerHTML = '';
    numbers.forEach((val, i) => {
        const el = document.createElement('span');
        el.className = 'arr-item';
        if (i === maxIdx) {
            el.style.borderColor = 'var(--green)';
            el.style.background = 'rgba(34,197,94,0.18)';
            el.style.color = '#86efac';
            el.style.boxShadow = '0 0 14px var(--green-glow)';
        } else if (i === minIdx) {
            el.style.borderColor = 'var(--red)';
            el.style.background = 'rgba(239,68,68,0.18)';
            el.style.color = '#fca5a5';
            el.style.boxShadow = '0 0 14px var(--red-glow)';
        }
        el.textContent = val;
        csArrayVisual.appendChild(el);
    });

    // Console output – matching the expected output from the slide
    clearConsole(consoleCS);
    logToConsole(consoleCS, `Array: [${numbers.join(', ')}]`);
    logToConsole(consoleCS, `Maximum Value: ${maxVal}  Minimum Value: ${minVal}`);
});
