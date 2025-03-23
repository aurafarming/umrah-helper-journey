
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
archive.file('extension/manifest.json', { name: 'manifest.json' });

// Add icons
fs.mkdirSync('dist/icons', { recursive: true });
archive.directory('extension/icons/', 'icons');

// Add popup files
fs.mkdirSync('dist/popup', { recursive: true });
archive.directory('extension/popup/', 'popup');

// Add scripts
fs.mkdirSync('dist/scripts', { recursive: true });
archive.directory('extension/scripts/', 'scripts');

// Add pages
fs.mkdirSync('dist/pages', { recursive: true });
archive.directory('extension/pages/', 'pages');

// Also copy relevant dist files from Vite build
archive.directory('dist/', 'pages');

// Finalize the archive
archive.finalize();
