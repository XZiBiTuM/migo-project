import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;

      // regex to match <Link ... and <button ...
      // We look for className="..." or className={`...`} and insert cursor-pointer
      // This is a simple regex that covers 95% of standard JSX usage
      
      const tagRegex = /<(Link|button)\b([^>]*?)>/g;
      
      content = content.replace(tagRegex, (match, tag, attrs) => {
        // Skip if already has cursor-pointer
        if (attrs.includes('cursor-pointer')) return match;

        const classNameDoubleQuotes = /className="([^"]+)"/;
        const classNameSingleQuotes = /className='([^']+)'/;
        const classNameBraces = /className=\{`([^`]+)`\}/;

        if (classNameDoubleQuotes.test(attrs)) {
          return match.replace(classNameDoubleQuotes, (m, classes) => `className="${classes} cursor-pointer"`);
        } else if (classNameSingleQuotes.test(attrs)) {
          return match.replace(classNameSingleQuotes, (m, classes) => `className='${classes} cursor-pointer'`);
        } else if (classNameBraces.test(attrs)) {
          return match.replace(classNameBraces, (m, classes) => `className={\`${classes} cursor-pointer\`}`);
        } else if (attrs.includes('className={')) {
          // Complex expressions, ignore to avoid syntax errors
          return match;
        } else {
          // No className attr
          return `<${tag}${attrs} className="cursor-pointer">`;
        }
      });

      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
console.log('Done mapping cursor-pointer');
