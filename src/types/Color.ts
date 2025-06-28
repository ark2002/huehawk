export interface Color {
    hex: string;
    rgb: number[];
    totalUses: number;
    primaryContext: string;
    usage: {
        text: number;
        background: number;
        border: number;
        button: number;
        link: number;
        heading: number;
        input: number;
    };
    usagePercentages: {
        text: number;
        background: number;
        border: number;
        button: number;
        link: number;
        heading: number;
        input: number;
    };
}

export interface ColorGroup {
    name: string;
    colors: Color[];
    icon: string;
}

export interface Status {
    message: string;
    type: 'success' | 'error' | 'loading';
}

// New types for color details modal
export interface ColorAnalysis {
    brightness: number;
    saturation: number;
    hue: number;
    isLight: boolean;
    isDark: boolean;
    contrastRatio: number;
    wcagAA: boolean;
    wcagAAA: boolean;
    colorName: string;
    variations: {
        lighter: string[];
        darker: string[];
    };
}

export interface CopyFormat {
    label: string;
    value: string;
    format: 'hex' | 'rgb' | 'hsl' | 'css' | 'tailwind';
}

export interface ColorDetailsModalProps {
    color: Color | null;
    isOpen: boolean;
    onClose: () => void;
    isDarkMode: boolean;
} 