#!/usr/bin/env node
// Stamps APP_VERSION and APP_BUILD into app.js from package.json + git commit count.
// Run: node build.js  (or: npm run build)

const fs = require('fs');
const { execSync } = require('child_process');

const version = require('./package.json').version;
const buildNum = execSync('git rev-list --count HEAD').toString().trim();

let js = fs.readFileSync('app.js', 'utf8');
js = js
  .replace(/^const APP_VERSION = '[^']*';/m, `const APP_VERSION = '${version}';`)
  .replace(/^const APP_BUILD = \d+;/m,       `const APP_BUILD = ${buildNum};`);
fs.writeFileSync('app.js', js);

console.log(`Stamped v${version} build #${buildNum}`);
