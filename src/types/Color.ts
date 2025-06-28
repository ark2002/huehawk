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