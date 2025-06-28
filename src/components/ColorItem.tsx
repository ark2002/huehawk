import React from 'react';
import type { Color } from '../types/Color';

interface ColorItemProps {
    color: Color;
    globalIndex: number;
    copiedIndex: number | null;
    isDarkMode: boolean;
    onCopy: (text: string, index: number) => void;
    getUsageText: (color: Color) => string;
}

const ColorItem: React.FC<ColorItemProps> = ({
    color,
    globalIndex,
    copiedIndex,
    isDarkMode,
    onCopy,
    getUsageText
}) => {
    return (
        <div
            className={`group rounded-lg border transition-all duration-300 hover:shadow-md hover:scale-[1.02] flex items-center gap-2.5 p-2.5 ${isDarkMode
                ? 'bg-gray-800 border-gray-600/60 hover:border-gray-500/80'
                : 'bg-white border-gray-200/60 hover:border-gray-300/80'
                }`}
        >
            {/* Color Swatch */}
            <div
                className={`w-10 h-10 rounded-lg border-2 shadow-sm transition-all duration-300 group-hover:shadow-md flex-shrink-0 ${isDarkMode
                    ? 'border-gray-600/80 group-hover:border-gray-500/90'
                    : 'border-gray-200/80 group-hover:border-gray-300/90'
                    }`}
                style={{ backgroundColor: color.hex }}
            />

            {/* Color Info */}
            <div className="flex-1 min-w-0">
                <div className={`font-mono text-sm font-semibold transition-colors ${isDarkMode
                    ? 'text-gray-100 group-hover:text-gray-200'
                    : 'text-gray-900 group-hover:text-gray-800'
                    }`}>
                    {color.hex.toUpperCase()}
                </div>
                <div className={`flex items-center gap-2 text-xs transition-colors ${isDarkMode
                    ? 'text-gray-400 group-hover:text-gray-300'
                    : 'text-gray-500 group-hover:text-gray-600'
                    }`}>
                    <span>RGB({color.rgb.join(', ')})</span>
                    <span className="text-emerald-400 font-medium">
                        {color.totalUses} uses
                    </span>
                </div>
                <div className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                    {getUsageText(color)}
                </div>
            </div>

            {/* Copy Button */}
            <button
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 flex-shrink-0 ${copiedIndex === globalIndex
                    ? 'bg-emerald-600 text-white scale-95 shadow-md'
                    : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-500 border border-gray-600/60 group-hover:border-gray-500/80 group-hover:shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 border border-gray-200/60 group-hover:border-gray-300/80 group-hover:shadow-sm'
                    }`}
                onClick={() => onCopy(color.hex, globalIndex)}
            >
                {copiedIndex === globalIndex ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default ColorItem; 