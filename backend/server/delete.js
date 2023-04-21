//We actually don't use this. But just want to add it out anyway

// Require the 'fs' and 'path' modules
const fs = require('fs');
const path = require('path');

// Set the folder path to the 'public/upload' directory in the current directory
const folderPath = path.join(__dirname, 'public', 'upload');

// Read the contents of the directory specified by the 'folderPath' variable
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  // Iterate over each file in the 'files' array
  files.forEach((file) => {

    // Get the full file path of the current file
    const filePath = path.join(folderPath, file);

    // Check if the file should be deleted
    if (
      file !== 'placeholder.jpg' && // Ignore files named 'placeholder.jpg'
      (!path.extname(file) || !file.match(/^\d+_.*$/)) // Ignore files without an extension or that don't start with "digits_"
    ) {
      // Delete the file
      fs.unlink(filePath, (err) => {
        if (err) throw err;

        // Log a message indicating that the file was deleted
        console.log(`Deleted file: ${filePath}`);
      });
    }
  });
});
