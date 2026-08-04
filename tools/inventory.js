'use strict';
const fs = require('fs'), path = require('path');
const TARGET = path.join(__dirname, '..', 'dct-ios.html');

function loadTarget() {
  let src;
  try { src = fs.readFileSync(TARGET, 'utf8'); }
  catch (e) { console.error('inventory: cannot read ' + TARGET + ': ' + e.message); process.exit(1); }
  const lines = src.split(/\r?\n/);
  return { src: src, lines: lines, tokens: buildClassTokens(src) };
}

function rootHas(src, name) {
  const blocks = src.match(/:root\s*\{([\s\S]*?)\}/g);
  if (!blocks) return false;
  const content = blocks.map(function (b) { return b.match(/:root\s*\{([\s\S]*?)\}/)[1]; }).join(' ');
  return new RegExp('(^|[;\\s])' + name + '\\s*:').test(content);
}

// Tokenise EVERY class attribute once. Never a regex per class - that is
// what produced two false inventories (rd- matches inside card-/board-).
function buildClassTokens(src) {
  const tok = {};
  const re = /class\s*=\s*("([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const v = m[2] !== undefined ? m[2] : m[3];
    v.split(/[\s+'"]+/).forEach(function (t) { if (t) tok[t] = (tok[t] || 0) + 1; });
  }
  return tok;
}

function emitters(tokens, cls) { return tokens[cls] || 0; }

const FIXTURES = [
  { name: 'root-defines-teal', run: function (ctx) {
      const a = rootHas(ctx.src, '--teal');
      return { ok: a === true, expected: 'true', actual: String(a) }; } },
  { name: 'root-omits-mag', run: function (ctx) {
      const a = rootHas(ctx.src, '--mag');
      return { ok: a === false, expected: 'false', actual: String(a) }; } },
  { name: 'rd-row-has-no-emitters', run: function (ctx) {
      const a = emitters(ctx.tokens, 'rd-row');
      return { ok: a === 0, expected: '0', actual: String(a) }; } },
  { name: 'dl-chip-is-live', run: function (ctx) {
      const a = emitters(ctx.tokens, 'dl-chip');
      return { ok: a > 0, expected: '> 0', actual: String(a) }; } },
  { name: 'tile-is-live', run: function (ctx) {
      const a = emitters(ctx.tokens, 'tile');
      return { ok: a > 0, expected: '> 0', actual: String(a) }; } }
];

function runFixtures(ctx) {
  const failures = [];
  FIXTURES.forEach(function (f) {
    let r;
    try { r = f.run(ctx); }
    catch (e) { r = { ok: false, expected: '(no throw)', actual: 'threw: ' + e.message }; }
    if (!r.ok) failures.push({ name: f.name, expected: r.expected, actual: r.actual });
  });
  return failures;
}

function main() {
  const ctx = loadTarget();
  const failures = runFixtures(ctx);
  if (failures.length) {
    console.error('inventory: FIXTURE FAILURE - refusing to emit results.');
    failures.forEach(function (f) {
      console.error('  ' + f.name + ': expected ' + f.expected + ', got ' + f.actual);
    });
    process.exit(1);
  }
  const cmd = process.argv[2];
  if (!cmd) { console.error('usage: inventory <emitters|colors|scope|sanctioned> [args]'); process.exit(2); }
  if (cmd === 'emitters') {
    const cls = process.argv[3];
    if (!cls) { console.error('usage: inventory emitters <class>'); process.exit(2); }
    const n = emitters(ctx.tokens, cls);
    console.log((n > 0 ? 'LIVE' : 'UNPROVEN') + '  ' + cls + '  class-attr occurrences: ' + n);
    if (n === 0) {
      console.log('  NOTE: UNPROVEN is not a claim of unused. Classes toggled at');
      console.log('  runtime via classList.add never appear in a class="..." attribute.');
    }
    process.exit(0);
  }
  console.error('inventory: unknown subcommand "' + cmd + '"'); process.exit(2);
}

main();
