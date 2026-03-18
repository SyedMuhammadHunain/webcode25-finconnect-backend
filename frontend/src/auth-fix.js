const fs = require('fs');
const files = require('child_process').execSync('find app/pages/auth -name "*.html"').toString().trim().split('\n');

files.forEach(file => {
  if (!file) return;
  let text = fs.readFileSync(file, 'utf8');

  text = text.replace(/<p-floatlabel>\s*<p-password([\s\S]*?)><\/p-password>\s*<label[^>]*>([^<]+)<\/label>\s*<\/p-floatlabel>/g, (m, attrs, lbl) => {
    return `<div class="input-wrapper">\n                <p-password${attrs} placeholder="${lbl}" styleClass="w-full"></p-password>\n            </div>`;
  });

  text = text.replace(/<p-floatlabel>\s*<input([^>]+)\/>\s*<label[^>]*>([^<]+)<\/label>\s*<\/p-floatlabel>/g, (m, attrs, lbl) => {
    return `<div class="input-wrapper">\n                <input${attrs} placeholder="${lbl}" class="w-full" />\n            </div>`;
  });

  fs.writeFileSync(file, text);
});
console.log("Done!");
