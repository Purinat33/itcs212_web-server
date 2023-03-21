const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'public', 'upload');

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Check if the file doesn't have an extension or doesn't start with "digits_"
    if (
      file !== 'placeholder.jpg' &&
      (!path.extname(file) || !file.match(/^\d+_.*$/))
    ) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;

        console.log(`Deleted file: ${filePath}`);
      });
    }
  });
});
