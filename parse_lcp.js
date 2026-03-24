const fs = require('fs');
const path = 'd:/migo/lcp.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const lcpAudit = Object.values(data.audits).find(a => a.id === 'largest-contentful-paint-element' || a.id.includes('lcp'));
console.log(JSON.stringify(lcpAudit, null, 2));

const lcpImage = Object.values(data.audits).find(a => a.id === 'largest-contentful-paint-element');
if (lcpImage) {
    console.log("----");
    console.log(JSON.stringify(lcpImage.details, null, 2));
}

const allLcp = Object.keys(data.audits).filter(k => k.includes('lcp') || k.includes('largest'));
console.log("All LCP related audits: ", allLcp);
