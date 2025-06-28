import type { ColorAnalysis, CopyFormat } from '../types/Color';

// Comprehensive color name database with more specific names
const colorNames: { [key: string]: string } = {
    // Reds
    '#ff0000': 'Pure Red',
    '#dc143c': 'Crimson',
    '#b22222': 'Fire Brick',
    '#8b0000': 'Dark Red',
    '#ff4500': 'Orange Red',
    '#ff6347': 'Tomato',
    '#ff7f50': 'Coral',
    '#fa8072': 'Salmon',
    '#e9967a': 'Dark Salmon',
    '#f08080': 'Light Coral',
    '#cd5c5c': 'Indian Red',
    '#bc8f8f': 'Rosy Brown',

    // Oranges
    '#ffa500': 'Orange',
    '#ff8c00': 'Dark Orange',
    '#ff7f00': 'Dark Orange',
    '#ff6b35': 'Burnt Orange',
    '#ff8c42': 'Sandy Orange',
    '#ffa726': 'Light Orange',

    // Yellows
    '#ffff00': 'Yellow',
    '#ffd700': 'Gold',
    '#ffeb3b': 'Bright Yellow',
    '#f4d03f': 'Golden Yellow',
    '#f39c12': 'Orange Yellow',
    '#f1c40f': 'Sun Yellow',
    '#f7dc6f': 'Light Yellow',
    '#f9e79f': 'Pale Yellow',

    // Greens
    '#00ff00': 'Lime',
    '#008000': 'Green',
    '#228b22': 'Forest Green',
    '#32cd32': 'Lime Green',
    '#90ee90': 'Light Green',
    '#98fb98': 'Pale Green',
    '#00fa9a': 'Medium Spring Green',
    '#00ff7f': 'Spring Green',
    '#3cb371': 'Medium Sea Green',
    '#2e8b57': 'Sea Green',
    '#20b2aa': 'Light Sea Green',
    '#5f9ea0': 'Cadet Blue',
    '#008b8b': 'Dark Cyan',
    '#008080': 'Teal',
    '#40e0d0': 'Turquoise',
    '#48d1cc': 'Medium Turquoise',
    '#00ced1': 'Dark Turquoise',

    // Blues
    '#0000ff': 'Blue',
    '#000080': 'Navy',
    '#00008b': 'Dark Blue',
    '#0000cd': 'Medium Blue',
    '#4169e1': 'Royal Blue',
    '#1e90ff': 'Dodger Blue',
    '#00bfff': 'Deep Sky Blue',
    '#87ceeb': 'Sky Blue',
    '#87cefa': 'Light Sky Blue',
    '#4682b4': 'Steel Blue',
    '#b0c4de': 'Light Steel Blue',
    '#add8e6': 'Light Blue',
    '#b0e0e6': 'Powder Blue',
    '#afeeee': 'Pale Turquoise',
    '#00ffff': 'Cyan',
    '#e0ffff': 'Light Cyan',
    '#f0f8ff': 'Alice Blue',
    '#f0ffff': 'Azure',
    '#f5f5dc': 'Beige',

    // Purples
    '#800080': 'Purple',
    '#8b008b': 'Dark Magenta',
    '#9932cc': 'Dark Orchid',
    '#9400d3': 'Dark Violet',
    '#8a2be2': 'Blue Violet',
    '#9370db': 'Medium Purple',
    '#ba55d3': 'Medium Orchid',
    '#da70d6': 'Orchid',
    '#ee82ee': 'Violet',
    '#dda0dd': 'Plum',
    '#d8bfd8': 'Thistle',
    '#e6e6fa': 'Lavender',
    '#f8f8ff': 'Ghost White',
    '#fff0f5': 'Lavender Blush',
    '#ffe4e1': 'Misty Rose',
    '#ff00ff': 'Magenta',
    '#ff69b4': 'Hot Pink',
    '#ff1493': 'Deep Pink',
    '#ffc0cb': 'Pink',
    '#ffb6c1': 'Light Pink',
    '#db7093': 'Pale Violet Red',
    '#c71585': 'Medium Violet Red',

    // Browns
    '#a52a2a': 'Brown',
    '#8b4513': 'Saddle Brown',
    '#a0522d': 'Sienna',
    '#cd853f': 'Peru',
    '#deb887': 'Burly Wood',
    '#f5deb3': 'Wheat',
    '#f4a460': 'Sandy Brown',
    '#daa520': 'Golden Rod',
    '#b8860b': 'Dark Golden Rod',
    '#ffdab9': 'Peach Puff',
    '#ffdead': 'Navajo White',
    '#faf0e6': 'Linen',
    '#fdf5e6': 'Old Lace',
    '#fff8dc': 'Cornsilk',
    '#fffacd': 'Lemon Chiffon',
    '#fafad2': 'Light Golden Rod Yellow',
    '#ffffe0': 'Light Yellow',
    '#fffff0': 'Ivory',
    '#f5f5f5': 'White Smoke',
    '#fafafa': 'White',
    '#ffffff': 'White',

    // Grays
    '#808080': 'Gray',
    '#696969': 'Dim Gray',
    '#778899': 'Light Slate Gray',
    '#708090': 'Slate Gray',
    '#2f4f4f': 'Dark Slate Gray',
    '#191970': 'Midnight Blue',
    '#483d8b': 'Dark Slate Blue',
    '#6a5acd': 'Slate Blue',
    '#7b68ee': 'Medium Slate Blue',

    // Blacks
    '#000000': 'Black',
    '#2f2f2f': 'Dark Gray',
    '#404040': 'Charcoal'
};

// Calculate brightness using relative luminance formula
export function calculateBrightness(r: number, g: number, b: number): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

// Calculate saturation (0-100)
export function calculateSaturation(r: number, g: number, b: number): number {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (max === 0) return 0;
    return Math.round((delta / max) * 100);
}

// Calculate hue (0-360)
export function calculateHue(r: number, g: number, b: number): number {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    if (delta === 0) return 0;

    let hue = 0;
    if (max === r) {
        hue = ((g - b) / delta) % 6;
    } else if (max === g) {
        hue = (b - r) / delta + 2;
    } else {
        hue = (r - g) / delta + 4;
    }

    hue = Math.round(hue * 60);
    return hue < 0 ? hue + 360 : hue;
}

// Calculate contrast ratio between two colors
export function calculateContrastRatio(color1: number[], color2: number[]): number {
    const luminance1 = calculateRelativeLuminance(color1[0], color1[1], color1[2]);
    const luminance2 = calculateRelativeLuminance(color2[0], color2[1], color2[2]);

    const lighter = Math.max(luminance1, luminance2);
    const darker = Math.min(luminance1, luminance2);

    return (lighter + 0.05) / (darker + 0.05);
}

// Calculate relative luminance (WCAG formula)
function calculateRelativeLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Generate color variations
export function generateColorVariations(hex: string): { lighter: string[], darker: string[] } {
    const rgb = hexToRgb(hex);
    if (!rgb) return { lighter: [], darker: [] };

    const lighter: string[] = [];
    const darker: string[] = [];

    // Generate lighter variations (10%, 20%, 30%, 40%, 50%)
    for (let i = 1; i <= 5; i++) {
        const factor = 1 + (i * 0.1);
        const newRgb = rgb.map(c => Math.min(255, Math.round(c * factor)));
        lighter.push(rgbToHex(newRgb[0], newRgb[1], newRgb[2]));
    }

    // Generate darker variations (10%, 20%, 30%, 40%, 50%)
    for (let i = 1; i <= 5; i++) {
        const factor = 1 - (i * 0.1);
        const newRgb = rgb.map(c => Math.max(0, Math.round(c * factor)));
        darker.push(rgbToHex(newRgb[0], newRgb[1], newRgb[2]));
    }

    return { lighter, darker };
}

// Find closest color name by calculating color distance
function findClosestColorName(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return 'Unknown';

    let closestName = 'Unknown';
    let minDistance = Infinity;

    // Check against known color names
    Object.entries(colorNames).forEach(([colorHex, name]) => {
        const colorRgb = hexToRgb(colorHex);
        if (colorRgb) {
            const distance = calculateColorDistance(rgb, colorRgb);
            if (distance < minDistance) {
                minDistance = distance;
                closestName = name;
            }
        }
    });

    // If the closest match is too far, generate a descriptive name
    if (minDistance > 100) {
        return generateDescriptiveName(rgb);
    }

    return closestName;
}

// Calculate color distance using Euclidean distance in RGB space
function calculateColorDistance(rgb1: number[], rgb2: number[]): number {
    return Math.sqrt(
        Math.pow(rgb1[0] - rgb2[0], 2) +
        Math.pow(rgb1[1] - rgb2[1], 2) +
        Math.pow(rgb1[2] - rgb2[2], 2)
    );
}

// Generate descriptive color name based on RGB values
function generateDescriptiveName(rgb: number[]): string {
    const [r, g, b] = rgb;
    const hue = calculateHue(r, g, b);
    const saturation = calculateSaturation(r, g, b);
    const brightness = calculateBrightness(r, g, b);

    // Handle extreme cases first
    if (brightness < 20) return 'Near Black';
    if (brightness > 240) return 'Near White';
    if (saturation < 15) {
        if (brightness < 100) return 'Dark Gray';
        if (brightness < 180) return 'Gray';
        return 'Light Gray';
    }

    // Generate descriptive names based on hue and saturation
    let baseColor = '';
    let modifier = '';

    // Determine base color from hue
    if (hue < 15 || hue > 345) baseColor = 'Red';
    else if (hue >= 15 && hue < 45) baseColor = 'Orange';
    else if (hue >= 45 && hue < 75) baseColor = 'Yellow';
    else if (hue >= 75 && hue < 165) baseColor = 'Green';
    else if (hue >= 165 && hue < 195) baseColor = 'Cyan';
    else if (hue >= 195 && hue < 255) baseColor = 'Blue';
    else if (hue >= 255 && hue < 285) baseColor = 'Purple';
    else if (hue >= 285 && hue < 315) baseColor = 'Magenta';
    else if (hue >= 315 && hue < 345) baseColor = 'Pink';

    // Add brightness modifier
    if (brightness < 80) modifier = 'Dark ';
    else if (brightness > 180) modifier = 'Light ';
    else if (saturation < 50) modifier = 'Muted ';
    else if (saturation > 80) modifier = 'Vibrant ';

    return modifier + baseColor;
}

// Get color name (improved with better matching)
export function getColorName(hex: string): string {
    // Check exact match first
    if (colorNames[hex.toLowerCase()]) {
        return colorNames[hex.toLowerCase()];
    }

    // Find closest match
    return findClosestColorName(hex);
}

// Convert hex to RGB
export function hexToRgb(hex: string): number[] | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}

// Convert RGB to hex
export function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Generate copy formats for a color
export function generateCopyFormats(color: { hex: string; rgb: number[] }): CopyFormat[] {
    const hsl = rgbToHsl(color.rgb[0], color.rgb[1], color.rgb[2]);

    return [
        {
            label: 'HEX',
            value: color.hex.toUpperCase(),
            format: 'hex'
        },
        {
            label: 'RGB',
            value: `rgb(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]})`,
            format: 'rgb'
        },
        {
            label: 'HSL',
            value: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
            format: 'hsl'
        },
        {
            label: 'CSS Variable',
            value: `var(--color-${color.hex.slice(1)})`,
            format: 'css'
        },
        {
            label: 'Tailwind',
            value: `[#${color.hex.slice(1)}]`,
            format: 'tailwind'
        }
    ];
}

// Analyze color and return comprehensive data
export function analyzeColor(color: { hex: string; rgb: number[] }): ColorAnalysis {
    const brightness = calculateBrightness(color.rgb[0], color.rgb[1], color.rgb[2]);
    const saturation = calculateSaturation(color.rgb[0], color.rgb[1], color.rgb[2]);
    const hue = calculateHue(color.rgb[0], color.rgb[1], color.rgb[2]);

    // Calculate contrast with white and black
    const contrastWithWhite = calculateContrastRatio(color.rgb, [255, 255, 255]);
    const contrastWithBlack = calculateContrastRatio(color.rgb, [0, 0, 0]);
    const contrastRatio = Math.max(contrastWithWhite, contrastWithBlack);

    return {
        brightness: Math.round(brightness),
        saturation,
        hue,
        isLight: brightness > 128,
        isDark: brightness < 128,
        contrastRatio: Math.round(contrastRatio * 100) / 100,
        wcagAA: contrastRatio >= 4.5,
        wcagAAA: contrastRatio >= 7,
        colorName: getColorName(color.hex),
        variations: generateColorVariations(color.hex)
    };
}

// Generate smart CSS variable name based on color usage
function generateCSSVariableName(color: any, index: number): string {
    const { usage, hex } = color;

    // Determine primary usage context
    const contexts = Object.entries(usage).filter(([_, count]) => Number(count) > 0) as [string, number][];
    if (contexts.length === 0) {
        return `color-${index + 1}`;
    }

    // Sort by usage count
    contexts.sort((a, b) => Number(b[1]) - Number(a[1]));
    const primaryContext = contexts[0][0];

    // Get color characteristics
    const rgb = hexToRgb(hex);
    if (!rgb) return `color-${index + 1}`;

    const brightness = calculateBrightness(rgb[0], rgb[1], rgb[2]);
    const saturation = calculateSaturation(rgb[0], rgb[1], rgb[2]);

    // Generate context-based name
    let contextName = '';
    switch (primaryContext) {
        case 'background':
            if (brightness > 200) contextName = 'bg-light';
            else if (brightness < 80) contextName = 'bg-dark';
            else contextName = 'bg';
            break;
        case 'text':
            if (brightness > 200) contextName = 'text-light';
            else if (brightness < 80) contextName = 'text-dark';
            else contextName = 'text';
            break;
        case 'button':
            contextName = 'btn';
            break;
        case 'link':
            contextName = 'link';
            break;
        case 'heading':
            contextName = 'heading';
            break;
        case 'border':
            contextName = 'border';
            break;
        case 'input':
            contextName = 'input';
            break;
        default:
            contextName = 'color';
    }

    // Add color characteristic
    let characteristic = '';
    if (saturation < 20) {
        characteristic = brightness > 180 ? 'white' : brightness < 80 ? 'black' : 'gray';
    } else {
        const hue = calculateHue(rgb[0], rgb[1], rgb[2]);
        if (hue < 15 || hue > 345) characteristic = 'red';
        else if (hue >= 15 && hue < 45) characteristic = 'orange';
        else if (hue >= 45 && hue < 75) characteristic = 'yellow';
        else if (hue >= 75 && hue < 165) characteristic = 'green';
        else if (hue >= 165 && hue < 195) characteristic = 'cyan';
        else if (hue >= 195 && hue < 255) characteristic = 'blue';
        else if (hue >= 255 && hue < 285) characteristic = 'purple';
        else if (hue >= 285 && hue < 315) characteristic = 'magenta';
        else characteristic = 'pink';
    }

    // Add brightness modifier
    let modifier = '';
    if (brightness < 80) modifier = '-dark';
    else if (brightness > 180) modifier = '-light';
    else if (saturation < 50) modifier = '-muted';

    return `${contextName}-${characteristic}${modifier}`;
}

// Generate complete CSS palette with smart variable names
export function generateCSSPalette(colors: any[]): string {
    if (colors.length === 0) return '';

    let css = ':root {\n';

    // Generate CSS variables with smart naming
    colors.forEach((color, index) => {
        const variableName = generateCSSVariableName(color, index);
        css += `  --${variableName}: ${color.hex};\n`;
    });

    css += '}\n\n';

    // Add usage examples
    css += '/* Usage Examples */\n';
    css += '.example {\n';
    colors.forEach((color, index) => {
        const variableName = generateCSSVariableName(color, index);
        css += `  /* ${color.hex} - ${getColorName(color.hex)} */\n`;
        css += `  color: var(--${variableName});\n`;
    });
    css += '}\n';

    return css;
} 