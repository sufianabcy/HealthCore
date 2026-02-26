const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            // Replace all blue, green, purple, yellow color classes with red
            content = content.replace(/\b(blue|green|purple|yellow)(-([0-9]{2,3}))/g, 'red$2');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated theme in: ${fullPath}`);
            }
        }
    }
}

// Ensure the path is correct
const srcDir = path.resolve(__dirname, '..', 'src');
console.log(`Processing directory: ${srcDir}`);
processDirectory(srcDir);
