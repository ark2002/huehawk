import React, { useState, useEffect } from 'react';
import type { ColorDetailsModalProps, CopyFormat, ColorAnalysis } from '../types/Color';
import { analyzeColor, generateCopyFormats, hexToRgb, calculateBrightness } from '../utils/colorUtils';

function getContrastTextColor(hex: string): string {
    const rgb = hexToRgb(hex);
    if (!rgb) return 'black';
    const brightness = calculateBrightness(rgb[0], rgb[1], rgb[2]);
    return brightness > 160 ? 'black' : 'white';
}

const ColorDetailsModal: React.FC<ColorDetailsModalProps> = ({
    color,
    isOpen,
    onClose,
    isDarkMode
}) => {
    const [analysis, setAnalysis] = useState<ColorAnalysis | null>(null);
    const [copyFormats, setCopyFormats] = useState<CopyFormat[]>([]);
    const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
    const [copiedVariation, setCopiedVariation] = useState<string | null>(null);

    useEffect(() => {
        if (color && isOpen) {
            setAnalysis(analyzeColor(color));
            setCopyFormats(generateCopyFormats(color));
        }
    }, [color, isOpen]);

    const copyToClipboard = async (text: string, format: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedFormat(format);
            setTimeout(() => setCopiedFormat(null), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const copyVariation = async (hex: string) => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopiedVariation(hex);
            setTimeout(() => setCopiedVariation(null), 2000);
        } catch (error) {
            console.error('Failed to copy variation:', error);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen || !color || !analysis) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                className={`w-96 max-h-[90vh] flex flex-col rounded-xl border shadow-2xl transition-colors duration-200 ${isDarkMode
                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 border-gray-700/50'
                    : 'bg-gradient-to-br from-white to-gray-50 text-gray-900 border-gray-200/50'
                    }`}
            >
                {/* Sticky Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200/20 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-8 h-8 rounded-lg border-2 border-gray-300/30"
                            style={{ backgroundColor: color.hex }}
                        />
                        <div>
                            <h3 className="font-semibold text-lg">{analysis.colorName}</h3>
                            <p className="text-sm opacity-70">{color.hex.toUpperCase()}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                            ? 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    <div className="p-4 space-y-6">
                        {/* Color Analysis */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm uppercase tracking-wide opacity-70">Color Analysis</h4>

                            <div className="grid grid-cols-2 gap-3">
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                                    }`}>
                                    <div className="text-xs opacity-70">Brightness</div>
                                    <div className="font-semibold">{analysis.brightness}</div>
                                </div>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                                    }`}>
                                    <div className="text-xs opacity-70">Saturation</div>
                                    <div className="font-semibold">{analysis.saturation}%</div>
                                </div>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                                    }`}>
                                    <div className="text-xs opacity-70">Hue</div>
                                    <div className="font-semibold">{analysis.hue}°</div>
                                </div>
                                <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                                    }`}>
                                    <div className="text-xs opacity-70">Contrast</div>
                                    <div className="font-semibold">{analysis.contrastRatio}:1</div>
                                </div>
                            </div>

                            {/* Accessibility */}
                            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                                }`}>
                                <div className="text-xs opacity-70 mb-2">Accessibility</div>
                                <div className="flex items-center space-x-3">
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${analysis.wcagAA
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        WCAG AA {analysis.wcagAA ? '✓' : '✗'}
                                    </div>
                                    <div className={`px-2 py-1 rounded text-xs font-medium ${analysis.wcagAAA
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        WCAG AAA {analysis.wcagAAA ? '✓' : '✗'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Copy Formats */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm uppercase tracking-wide opacity-70">Copy Formats</h4>
                            <div className="space-y-2">
                                {copyFormats.map((format) => (
                                    <div
                                        key={format.format}
                                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isDarkMode
                                            ? 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50'
                                            : 'bg-gray-50 border-gray-200/50 hover:bg-gray-100/50'
                                            }`}
                                    >
                                        <div className="flex-1">
                                            <div className="text-xs opacity-70">{format.label}</div>
                                            <div className="font-mono text-sm">{format.value}</div>
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(format.value, format.format)}
                                            className={`ml-3 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${copiedFormat === format.format
                                                ? 'bg-green-500 text-white'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {copiedFormat === format.format ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Color Variations */}
                        <div className="space-y-4">
                            <h4 className="font-medium text-sm uppercase tracking-wide opacity-70">Color Variations</h4>

                            {/* Lighter variations */}
                            <div>
                                <div className="text-xs opacity-70 mb-2">Lighter</div>
                                <div className="grid grid-cols-5 gap-1">
                                    {analysis.variations.lighter.map((variation: string, index: number) => {
                                        const textColor = getContrastTextColor(variation);
                                        return (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <div
                                                    className="h-12 rounded border border-gray-300/30 cursor-pointer hover:scale-105 transition-transform"
                                                    style={{ backgroundColor: variation }}
                                                    onClick={() => copyVariation(variation)}
                                                    title={`Click to copy ${variation}`}
                                                />
                                                <div className={`absolute inset-0 flex items-center justify-center text-xs font-mono font-bold transition-opacity ${copiedVariation === variation
                                                    ? 'opacity-100'
                                                    : 'opacity-0 group-hover:opacity-100'
                                                    }`}
                                                    style={{ color: textColor }}
                                                >
                                                    {copiedVariation === variation ? '✓' : `#${variation.slice(1)}`}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Darker variations */}
                            <div>
                                <div className="text-xs opacity-70 mb-2">Darker</div>
                                <div className="grid grid-cols-5 gap-1">
                                    {analysis.variations.darker.map((variation: string, index: number) => {
                                        const textColor = getContrastTextColor(variation);
                                        return (
                                            <div
                                                key={index}
                                                className="relative group"
                                            >
                                                <div
                                                    className="h-12 rounded border border-gray-300/30 cursor-pointer hover:scale-105 transition-transform"
                                                    style={{ backgroundColor: variation }}
                                                    onClick={() => copyVariation(variation)}
                                                    title={`Click to copy ${variation}`}
                                                />
                                                <div className={`absolute inset-0 flex items-center justify-center text-xs font-mono font-bold transition-opacity ${copiedVariation === variation
                                                    ? 'opacity-100'
                                                    : 'opacity-0 group-hover:opacity-100'
                                                    }`}
                                                    style={{ color: textColor }}
                                                >
                                                    {copiedVariation === variation ? '✓' : `#${variation.slice(1)}`}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorDetailsModal; 