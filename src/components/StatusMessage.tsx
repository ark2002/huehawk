import React from 'react';
import type { Status } from '../types/Color';

interface StatusMessageProps {
    status: Status | null;
    isDarkMode: boolean;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ status, isDarkMode }) => {
    if (!status) return null;

    return (
        <div className={`mt-1 px-1 py-1 rounded-lg text-sm font-medium flex-shrink-0 border ${status.type === 'success'
            ? isDarkMode
                ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : status.type === 'error'
                ? isDarkMode
                    ? 'bg-red-900/50 text-red-300 border-red-700'
                    : 'bg-red-50 text-red-800 border-red-200'
                : isDarkMode
                    ? 'bg-blue-900/50 text-blue-300 border-blue-700'
                    : 'bg-blue-50 text-blue-800 border-blue-200'
            }`}>
            {status.message}
        </div>
    );
};

export default StatusMessage; 