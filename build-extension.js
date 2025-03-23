
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create build-extension.js script to package the extension
console.log('Building Firefox extension...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join('dist', 'umrah-companion.xpi'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`Extension built successfully: ${archive.pointer()} total bytes`);
});

// Handle archive warnings
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning during archiving:', err);
  } else {
    throw err;
  }
});

// Handle archive errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add manifest.json
archive.file('manifest.json', { name: 'manifest.json' });

// Add extension files
archive.directory('extension/', 'extension');

// Add public directory (for icons)
archive.directory('public/', 'public');

// Add dist files (built Vite app)
archive.directory('dist/', '');

// Finalize the archive
archive.finalize();
