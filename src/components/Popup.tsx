import React, { useState, useEffect } from 'react';
import Header from './Header';
import ExtractButton from './ExtractButton';
import StatusMessage from './StatusMessage';
import ColorGroup from './ColorGroup';
import type { Color, ColorGroup as ColorGroupType, Status } from '../types/Color';

interface PopupProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean | ((prev: boolean) => boolean)) => void;
}

const Popup: React.FC<PopupProps> = ({ isDarkMode, setIsDarkMode }) => {
    const [colors, setColors] = useState<Color[]>([]);
    const [isExtracting, setIsExtracting] = useState(false);
    const [status, setStatus] = useState<Status | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    // Group colors by usage context
    const colorGroups: ColorGroupType[] = [
        {
            name: 'Backgrounds',
            colors: colors.filter(color => color.usage.background > 0),
            icon: '🎨'
        },
        {
            name: 'Text & Headings',
            colors: colors.filter(color => color.usage.text > 0 || color.usage.heading > 0),
            icon: '📝'
        },
        {
            name: 'Buttons & Links',
            colors: colors.filter(color => color.usage.button > 0 || color.usage.link > 0),
            icon: '🔘'
        },
        {
            name: 'Borders & Inputs',
            colors: colors.filter(color => color.usage.border > 0 || color.usage.input > 0),
            icon: '🔲'
        }
    ].filter(group => group.colors.length > 0);

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev => {
            const newSet = new Set(prev);
            if (newSet.has(groupName)) {
                newSet.delete(groupName);
            } else {
                newSet.add(groupName);
            }
            return newSet;
        });
    };

    const extractColors = async () => {
        try {
            setIsExtracting(true);
            setStatus({ message: 'Extracting colors from current page...', type: 'loading' });

            // Get the active tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Send message to content script
            const response = await chrome.tabs.sendMessage(tab.id!, { action: 'extractColors' });

            if (response && response.colors && response.colors.length > 0) {
                setColors(response.colors);
                setStatus({ message: `Found ${response.colors.length} colors!`, type: 'success' });
            } else {
                setStatus({ message: 'No colors found on this page.', type: 'error' });
            }
        } catch (error) {
            console.error('Error extracting colors:', error);
            setStatus({ message: 'Error extracting colors. Please try again.', type: 'error' });
        } finally {
            setIsExtracting(false);
        }
    };

    const copyToClipboard = async (text: string, index: number) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedIndex(index);

            // Reset the button text after 2 seconds
            setTimeout(() => {
                setCopiedIndex(null);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            setStatus({ message: 'Failed to copy color.', type: 'error' });
        }
    };

    // Clear status after 3 seconds
    useEffect(() => {
        if (status && status.type !== 'loading') {
            const timer = setTimeout(() => setStatus(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const getUsageText = (color: Color) => {
        const contexts = [];
        if (color.usage.text > 0) contexts.push(`Text: ${color.usage.text}`);
        if (color.usage.background > 0) contexts.push(`BG: ${color.usage.background}`);
        if (color.usage.button > 0) contexts.push(`Btn: ${color.usage.button}`);
        if (color.usage.link > 0) contexts.push(`Link: ${color.usage.link}`);
        if (color.usage.heading > 0) contexts.push(`H: ${color.usage.heading}`);
        if (color.usage.border > 0) contexts.push(`Border: ${color.usage.border}`);
        if (color.usage.input > 0) contexts.push(`Input: ${color.usage.input}`);
        return contexts.join(', ');
    };

    const getGlobalIndex = (color: Color) => {
        return colors.findIndex(c => c.hex === color.hex);
    };

    return (
        <div className={`w-96 h-[400px] font-sans flex flex-col shadow-xl rounded-xl border transition-colors duration-200 ${isDarkMode
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 border-gray-700/50'
            : 'bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900 border-gray-200/50'
            }`}>
            <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

            {/* Content */}
            <div className="px-1 py-1 flex-1 flex flex-col min-h-0">
                <ExtractButton
                    isExtracting={isExtracting}
                    isDarkMode={isDarkMode}
                    onExtract={extractColors}
                />

                <StatusMessage status={status} isDarkMode={isDarkMode} />

                {/* Colors Container */}
                <div className={`mt-1 flex-1 overflow-y-auto ${isDarkMode
                    ? 'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'
                    : 'scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
                    }`}>
                    <div className="space-y-1.5">
                        {colorGroups.map((group, groupIndex) => (
                            <ColorGroup
                                key={groupIndex}
                                name={group.name}
                                colors={group.colors}
                                icon={group.icon}
                                isExpanded={expandedGroups.has(group.name)}
                                isDarkMode={isDarkMode}
                                copiedIndex={copiedIndex}
                                onToggle={() => toggleGroup(group.name)}
                                onCopy={copyToClipboard}
                                getUsageText={getUsageText}
                                getGlobalIndex={getGlobalIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup; 