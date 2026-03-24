const fs = require('fs');
const path = 'd:/migo/lcp_after.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let out = "";
const allLcp = Object.keys(data.audits).filter(k => k.includes('lcp') || k.includes('largest'));

for (const key of allLcp) {
    if(key === 'largest-contentful-paint-element' || key === 'largest-contentful-paint' || key === 'lcp-breakdown-insight') {
        out += `\n\n--- ${key} ---\n`;
        out += JSON.stringify(data.audits[key], null, 2);
    }
}

fs.writeFileSync('d:/migo/lcp_after_summary.txt', out);
console.log('done');
