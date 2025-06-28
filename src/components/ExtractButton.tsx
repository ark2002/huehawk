import React from 'react';

interface ExtractButtonProps {
    isExtracting: boolean;
    isDarkMode: boolean;
    onExtract: () => void;
}

const ExtractButton: React.FC<ExtractButtonProps> = ({ isExtracting, isDarkMode, onExtract }) => {
    return (
        <button
            className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-200 flex-shrink-0 ${isExtracting
                    ? isDarkMode
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 active:scale-95 shadow-md hover:shadow-lg'
                }`}
            onClick={onExtract}
            disabled={isExtracting}
        >
            {isExtracting ? 'Extracting...' : 'Extract Colors'}
        </button>
    );
};

export default ExtractButton; 