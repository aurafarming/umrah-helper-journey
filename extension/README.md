
# Umrah Companion Firefox Extension

This Firefox extension helps Muslims plan and perform Umrah by providing helpful tools and information.

## Directory Structure

- `icons/` - Contains extension icons
- `popup/` - Contains popup UI files (HTML, CSS, JS)
- `scripts/` - Contains background scripts and utilities
- `pages/` - Contains full page views for the extension

## Building the Extension

1. Build the web application:
   ```
   npm run build
   ```

2. Package the extension:
   ```
   node build-extension.js
   ```

3. The extension package (umrah-companion.xpi) will be created in the `dist` folder.

## Installing the Extension

### Temporary Installation (For Development)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on..."
4. Select the `manifest.json` file from your project directory

### Permanent Installation

1. Go to `about:addons` in Firefox
2. Click the gear icon and select "Install Add-on From File..."
3. Select the `umrah-companion.xpi` file from the `dist` folder

## Features

- Prayer time calculator
- Arabic phrases and translation
- Weather information
- Umrah guides and checklists
- Bookmark system for saving accommodations
