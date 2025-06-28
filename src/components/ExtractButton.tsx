import React from 'react';

interface ExtractButtonProps {
    isExtracting: boolean;
    isDarkMode: boolean;
    onExtract: () => void;
    hasColors: boolean;
    onCopyPalette: () => void;
}

const ExtractButton: React.FC<ExtractButtonProps> = ({
    isExtracting,
    isDarkMode,
    onExtract,
    hasColors,
    onCopyPalette
}) => {
    if (hasColors) {
        return (
            <button
                onClick={onCopyPalette}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isDarkMode
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 active:from-emerald-700 active:to-emerald-600 shadow-lg hover:shadow-emerald-500/25'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:from-emerald-400 hover:to-emerald-300 active:from-emerald-600 active:to-emerald-500 shadow-lg hover:shadow-emerald-400/25'
                    }`}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Entire Palette
            </button>
        );
    }

    return (
        <button
            onClick={onExtract}
            disabled={isExtracting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${isExtracting
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : isDarkMode
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 active:from-blue-700 active:to-blue-600 shadow-lg hover:shadow-blue-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-400 hover:to-blue-300 active:from-blue-600 active:to-blue-500 shadow-lg hover:shadow-blue-400/25'
                }`}
        >
            {isExtracting ? (
                <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Extracting...
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M15 7l3 3m0 0l-3 3m3-3H9" />
                    </svg>
                    Extract Colors
                </>
            )}
        </button>
    );
};

export default ExtractButton; 