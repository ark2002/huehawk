import React from 'react';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <div className={`px-3 py-2 border-b flex-shrink-0 backdrop-blur-sm rounded-t-xl flex items-center justify-between ${isDarkMode
                ? 'bg-gray-800/80 border-gray-700/60'
                : 'bg-white/80 border-gray-200/60'
            }`}>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">H</span>
                </div>
                <div className="flex items-center gap-2">
                    <h1 className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ marginBottom: '0px', color: isDarkMode ? 'white' : 'black' }}>HueHawk</h1>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Extract and analyze color palettes</p>
                </div>
            </div>
            <button
                onClick={() => setIsDarkMode(prev => !prev)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 flex-shrink-0 ${isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {isDarkMode ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Header; 