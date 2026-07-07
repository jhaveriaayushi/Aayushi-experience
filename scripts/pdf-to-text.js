/*const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

if (process.argv.length < 3) {
  console.error('Usage: node pdf-to-text.js <pdf-file> [output.txt]');
  process.exit(1);
}

const pdfPath = process.argv[2];
const outPath = process.argv[3] || (path.basename(pdfPath, path.extname(pdfPath)) + '.txt');

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(ßdata) {
  fs.writeFileSync(outPath, data.text, 'utf8');
  console.log('Wrote text to', outPath);
}).catch(err => {
  console.error('PDF parse error:', err);
  process.exit(1);
});
*/

const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");

async function pdfToText(pdfPath, outPath) {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);

  fs.writeFileSync(outPath, data.text, "utf8");

  return data.text;
}

module.exports = { pdfToText };
