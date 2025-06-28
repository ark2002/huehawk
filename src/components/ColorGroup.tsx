import React from 'react';
import ColorItem from './ColorItem';
import type { Color } from '../types/Color';

interface ColorGroupProps {
    name: string;
    colors: Color[];
    icon: string;
    isExpanded: boolean;
    isDarkMode: boolean;
    copiedIndex: number | null;
    onToggle: () => void;
    onCopy: (text: string, index: number) => void;
    getUsageText: (color: Color) => string;
    getGlobalIndex: (color: Color) => number;
    onColorClick: (color: Color) => void;
}

const ColorGroup: React.FC<ColorGroupProps> = ({
    name,
    colors,
    icon,
    isExpanded,
    isDarkMode,
    copiedIndex,
    onToggle,
    onCopy,
    getUsageText,
    getGlobalIndex,
    onColorClick
}) => {
    return (
        <div className={`backdrop-blur-sm border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 ${isDarkMode
            ? 'bg-gray-800/80 border-gray-700/60'
            : 'bg-white/80 border-gray-200/60'
            }`}>
            {/* Accordion Header */}
            <button
                onClick={onToggle}
                className={`w-full px-1 py-1 transition-colors flex items-center justify-between text-left ${isDarkMode
                    ? 'hover:bg-gray-700/80'
                    : 'hover:bg-gray-50/80'
                    }`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        {name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${isDarkMode
                        ? 'text-gray-300 bg-gray-700'
                        : 'text-gray-500 bg-gray-100'
                        }`}>
                        {colors.length}
                    </span>
                </div>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''} ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Accordion Content - List Format */}
            {isExpanded && (
                <div className={`px-1 pb-1 ${isDarkMode ? 'bg-gray-700/60' : 'bg-white/60'
                    }`}>
                    <div className="space-y-1">
                        {colors.map((color, index) => (
                            <ColorItem
                                key={index}
                                color={color}
                                globalIndex={getGlobalIndex(color)}
                                copiedIndex={copiedIndex}
                                isDarkMode={isDarkMode}
                                onCopy={onCopy}
                                getUsageText={getUsageText}
                                onColorClick={onColorClick}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ColorGroup; 