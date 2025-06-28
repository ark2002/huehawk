# 🎨 HueHawk - Color Palette Extractor

A powerful Chrome extension that extracts and analyzes color palettes from any webpage. Built with React, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core Functionality
- **Smart Color Extraction**: Automatically detects colors used on any webpage
- **Context-Aware Categorization**: Groups colors by usage context (backgrounds, text, buttons, etc.)
- **Usage Analytics**: Shows color frequency and usage patterns with detailed breakdowns
- **One-Click Copy**: Copy color values in HEX format with visual feedback
- **Accordion Interface**: Expandable color groups for better organization

### 🔍 **Color Details Modal** (NEW!)
- **Click to Explore**: Click any color to open a detailed analysis modal
- **Multiple Copy Formats**: Copy colors in HEX, RGB, HSL, CSS variables, and Tailwind formats
- **Color Analysis**: View brightness, saturation, hue, and contrast ratios
- **Accessibility Checking**: WCAG AA/AAA compliance indicators
- **Color Variations**: Generate lighter and darker shades automatically
- **Color Names**: Human-readable color names and descriptions
- **Interactive Variations**: Click color variations to copy them instantly

### 🌙 Dark Mode
- **Seamless Theme Switching**: Toggle between light and dark modes with a single click
- **Custom Scrollbars**: Beautiful scrollbars that adapt to the theme
- **Smooth Transitions**: Elegant animations between theme changes
- **Global Theme Support**: Consistent dark mode across the entire extension

### 🏗️ Modern Architecture
- **Modular Components**: Clean, reusable component structure with single responsibilities
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Modern, utility-first styling with custom scrollbar support
- **Chrome Extension API**: Native browser integration with Manifest V3
- **State Management**: Efficient React state management with proper prop drilling

## 🚀 Installation

### For Development
1. Clone the repository:
   ```bash
   git clone https://github.com/ark2002/huehawk.git
   cd huehawk
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Build the extension:
   ```bash
   yarn build:extension
   ```

4. Load in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

### For Users
1. Download the extension from the Chrome Web Store (coming soon)
2. Or load the built extension from the `dist` folder

## 🛠️ Development

### Project Structure
```
huehawk/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # App header with dark mode toggle
│   │   ├── ExtractButton.tsx # Color extraction button
│   │   ├── StatusMessage.tsx # Status notifications
│   │   ├── ColorItem.tsx    # Individual color display
│   │   ├── ColorGroup.tsx   # Accordion color groups
│   │   ├── ColorDetailsModal.tsx # Color analysis modal (NEW!)
│   │   └── Popup.tsx        # Main popup component
│   ├── types/               # TypeScript type definitions
│   │   └── Color.ts         # Shared interfaces
│   ├── utils/               # Utility functions (NEW!)
│   │   └── colorUtils.ts    # Color analysis and conversion utilities
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── index.css            # Tailwind and custom styles
├── content.js               # Content script for color extraction
├── manifest.json            # Chrome extension manifest
├── icons/                   # Extension icons
└── dist/                    # Built extension files
```

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn build:extension` - Build Chrome extension
- `yarn lint` - Run ESLint

### Technology Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom scrollbar utilities
- **Build Tool**: Vite
- **Extension**: Chrome Extension Manifest V3
- **Package Manager**: Yarn
- **Linting**: ESLint with TypeScript support

## 🎨 How It Works

### Color Extraction Process
1. **Content Script Injection**: The extension injects a content script into the active tab
2. **DOM Analysis**: Scans all elements for color properties (background, text, borders, etc.)
3. **Context Detection**: Analyzes element types to categorize color usage
4. **Data Processing**: Groups colors by context and calculates usage statistics
5. **UI Display**: Presents results in an organized, interactive interface

### Color Details Modal
When you click on any color, a comprehensive modal opens with:

1. **Color Analysis**:
   - Brightness, saturation, and hue values
   - Contrast ratio calculations
   - WCAG accessibility compliance (AA/AAA)

2. **Copy Formats**:
   - HEX: `#FF6B35`
   - RGB: `rgb(255, 107, 53)`
   - HSL: `hsl(15, 100%, 60%)`
   - CSS Variable: `var(--color-ff6b35)`
   - Tailwind: `[#FF6B35]`

3. **Color Variations**:
   - 5 lighter shades (10%, 20%, 30%, 40%, 50% lighter)
   - 5 darker shades (10%, 20%, 30%, 40%, 50% darker)
   - Click any variation to copy it instantly

### Color Categorization
- **Backgrounds**: Colors used for backgrounds and containers
- **Text & Headings**: Colors used for text content and headings
- **Buttons & Links**: Colors used for interactive elements
- **Borders & Inputs**: Colors used for borders and form inputs

### Component Architecture
The extension uses a modular component architecture:
- **Header**: Manages the app header and dark mode toggle
- **ExtractButton**: Handles color extraction functionality
- **StatusMessage**: Displays success, error, and loading states
- **ColorItem**: Renders individual color swatches with copy functionality and modal trigger
- **ColorGroup**: Manages accordion-style color groups
- **ColorDetailsModal**: Comprehensive color analysis and multiple copy formats
- **Popup**: Orchestrates all components and manages state

## 🔧 Configuration

### Dark Mode
The extension supports both automatic and manual dark mode:
- Toggle via the header button (sun/moon icon)
- Smooth transitions between themes
- Custom scrollbars that adapt to the theme
- Global styling that affects the entire popup and modal

### Customization
You can customize the extension by modifying:
- Color grouping logic in `src/components/Popup.tsx`
- Color analysis algorithms in `src/utils/colorUtils.ts`
- Modal styling in `src/components/ColorDetailsModal.tsx`
- Styling in `src/index.css` and component files
- Content script behavior in `content.js`
- Type definitions in `src/types/Color.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices with strict type checking
- Use conventional commit messages (feat:, fix:, docs:, etc.)
- Maintain component modularity and single responsibility principle
- Add proper type definitions for all interfaces
- Test thoroughly before submitting
- Follow the existing code style and architecture patterns

### Code Quality
- All components use TypeScript with proper type imports
- Consistent naming conventions and file structure
- Modular architecture with clear separation of concerns
- Responsive design with Tailwind CSS utilities
- Accessibility considerations in component design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies and best practices
- Inspired by the need for better color palette extraction tools
- Thanks to the React and Chrome Extension communities
- Special thanks to Tailwind CSS for the amazing styling framework

## 🔮 Roadmap

### Planned Features
- [x] **Color Details Modal** - Comprehensive color analysis and multiple copy formats
- [ ] Export to various formats (CSS, SCSS, Tailwind config)
- [ ] Color accessibility checking (WCAG compliance) - Enhanced
- [ ] Color harmony analysis
- [ ] Save and share palettes
- [ ] Integration with design tools (Figma, Sketch)
- [ ] Advanced filtering and sorting options
- [ ] Color name suggestions - Enhanced
- [ ] Bulk copy functionality

### Technical Improvements
- [ ] Add unit tests for components
- [ ] Implement error boundaries
- [ ] Add performance optimizations
- [ ] Improve accessibility features
- [ ] Add keyboard shortcuts
- [ ] Implement color history

---

**Made with ❤️ for designers and developers**

*HueHawk - Extract colors with precision and style*
