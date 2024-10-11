import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookmarkletPath = path.resolve(__dirname, '../dist/bookmarklet.js');
let code = fs.readFileSync(bookmarkletPath, 'utf-8');

// Remove IIFE wrapper
code = code.replace(/^\(function\(\)\{/, '').replace(/\}\)\.call\(this\);$/, '');

// Create bookmarklet
const bookmarklet = `javascript:(function(){${encodeURIComponent(code)}})();`;

fs.writeFileSync(path.resolve(__dirname, '../dist/bookmarklet.txt'), bookmarklet);
console.log('Bookmarklet created successfully!');