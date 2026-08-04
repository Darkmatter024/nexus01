'use strict';
const fs = require('fs'), path = require('path');
const TARGET = path.join(__dirname, '..', 'dct-ios.html');

function loadTarget() {
  let src;
  try { src = fs.readFileSync(TARGET, 'utf8'); }
  catch (e) { console.error('inventory: cannot read ' + TARGET + ': ' + e.message); process.exit(1); }
  return { src: src, lines: src.split(/\r?\n/) };
}

function rootHas(src, name) {
  const blocks = src.match(/:root\s*\{([\s\S]*?)\}/g);
  if (!blocks) return false;
  const content = blocks.map(function (b) { return b.match(/:root\s*\{([\s\S]*?)\}/)[1]; }).join(' ');
  return new RegExp('(^|[;\\s])' + name + '\\s*:').test(content);
}

const FIXTURES = [
  { name: 'root-defines-teal', run: function (ctx) {
      const a = rootHas(ctx.src, '--teal');
      return { ok: a === true, expected: 'true', actual: String(a) }; } },
  { name: 'root-omits-mag', run: function (ctx) {
      const a = rootHas(ctx.src, '--mag');
      return { ok: a === false, expected: 'false', actual: String(a) }; } }
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
  console.error('inventory: unknown subcommand "' + cmd + '"'); process.exit(2);
}

main();
