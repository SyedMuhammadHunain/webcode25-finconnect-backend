const fs = require('fs');
const files = require('child_process').execSync('find app/pages/auth -name "*.html"').toString().trim().split('\n');
files.forEach(file => {
  if(!file) return;
  let text = fs.readFileSync(file, 'utf8');
  
  // input
  text = text.replace(/<p-floatlabel>([\s\S]*?)<input([^>]*?)pInputText([^>]*?)\/>([\s\S]*?)<label[^>]*>([^<]+)<\/label>([\s\S]*?)<\/p-floatlabel>/gi, (m, before1, attr1, attr2, before2, lbl, after) => {
     let attrs = attr1 + attr2;
     return `<div class="input-wrapper">\n    <input pInputText ${attrs.trim()} placeholder="${lbl.trim()}" class="w-full" />\n</div>`;
  });

  // p-password
  text = text.replace(/<p-floatlabel>([\s\S]*?)<p-password([^>]*?)><\/p-password>([\s\S]*?)<label[^>]*>([^<]+)<\/label>([\s\S]*?)<\/p-floatlabel>/gi, (m, before1, attrs, before2, lbl, after) => {
     return `<div class="input-wrapper">\n    <p-password ${attrs.trim()} placeholder="${lbl.trim()}" styleClass="w-full"></p-password>\n</div>`;
  });

  fs.writeFileSync(file, text);
});
console.log("Done fixing wrappers!");
