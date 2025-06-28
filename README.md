# HueHawk

A Chrome extension built with React and TypeScript that extracts and copies color palettes from any website.

## Features

- 🎨 Extract colors from any webpage
- 📋 Copy hex codes to clipboard
- 🎯 Clean, modern React interface
- ⚡ Built with Vite for fast development
- 🔧 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- Yarn or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

### Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`

### Building the Extension

Build the Chrome extension:
```bash
yarn build:extension
```

This will create a `dist` folder with all the extension files.

### Loading the Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `dist` folder from your project
5. The HueHawk extension should now appear in your extensions list

### Using the Extension

1. Click the HueHawk icon in your Chrome toolbar
2. Click "Extract Colors" to analyze the current page
3. View the extracted colors with their hex codes
4. Click "Copy" next to any color to copy it to your clipboard

### Building for Production

Build the project:
```bash
yarn build
```

Preview the production build:
```bash
yarn preview
```

### Linting

Run the linter:
```bash
yarn lint
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Chrome Extension APIs** - Browser integration
- **ESLint** - Code linting

## Project Structure

```
src/
├── components/
│   ├── Popup.tsx      # Main extension popup component
│   └── Popup.css      # Popup styles
├── App.tsx            # Main application component
├── App.css            # Application styles
├── main.tsx           # Application entry point
└── index.css          # Global styles (Tailwind CSS)

Extension Files:
├── manifest.json      # Chrome extension manifest
├── content.js         # Content script for color extraction
└── icons/             # Extension icons
```

## How It Works

1. **Content Script** (`content.js`) - Injected into web pages to extract colors from DOM elements
2. **Popup Component** (`Popup.tsx`) - React component that provides the user interface
3. **Chrome APIs** - Used to communicate between the popup and content script
4. **Color Extraction** - Scans all elements for color, background-color, and border-color properties

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the extension
5. Submit a pull request
