// Content script for HueHawk extension
// This script runs in the context of web pages

console.log('HueHawk: Content script loaded');

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('HueHawk: Received message:', request);
    
    if (request.action === 'extractColors') {
        const colors = extractColorsFromPage();
        console.log('HueHawk: Extracted colors:', colors);
        sendResponse({ colors: colors });
    }
    
    // Return true to indicate we will send a response asynchronously
    return true;
});

function extractColorsFromPage() {
    const colorUsage = new Map();
    const elements = document.querySelectorAll('*');
    
    console.log('HueHawk: Found', elements.length, 'elements to scan');
    
    elements.forEach(element => {
        try {
            const styles = window.getComputedStyle(element);
            const tagName = element.tagName.toLowerCase();
            const className = element.className || '';
            const id = element.id || '';
            
            // Analyze different color properties
            const colorProps = [
                { prop: 'color', context: 'text' },
                { prop: 'background-color', context: 'background' },
                { prop: 'border-color', context: 'border' }
            ];
            
            colorProps.forEach(({ prop, context }) => {
                const value = styles.getPropertyValue(prop);
                
                // Skip transparent and invalid values
                if (!value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)' || value === 'initial' || value === 'inherit') {
                    return;
                }
                
                // Handle different color formats
                let rgb = null;
                
                if (value.startsWith('rgb')) {
                    // Extract RGB values from rgb() or rgba()
                    const match = value.match(/\d+/g);
                    if (match && match.length >= 3) {
                        rgb = [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
                    }
                } else if (value.startsWith('#')) {
                    // Convert hex to RGB
                    const hex = value.replace('#', '');
                    const r = parseInt(hex.substr(0, 2), 16);
                    const g = parseInt(hex.substr(2, 2), 16);
                    const b = parseInt(hex.substr(4, 2), 16);
                    rgb = [r, g, b];
                } else if (value.startsWith('hsl')) {
                    // Skip HSL for now (can be added later)
                    return;
                }
                
                if (rgb && rgb.every(val => !isNaN(val) && val >= 0 && val <= 255)) {
                    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                    
                    // Skip very light or very dark colors (likely whites/blacks)
                    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
                    if (brightness > 240 || brightness < 15) {
                        return;
                    }
                    
                    // Determine specific usage context
                    let specificContext = context;
                    
                    // Detect button colors
                    if (context === 'background' && (
                        tagName === 'button' || 
                        className.includes('btn') || 
                        className.includes('button') ||
                        id.includes('btn') ||
                        id.includes('button')
                    )) {
                        specificContext = 'button';
                    }
                    
                    // Detect link colors
                    if (context === 'text' && tagName === 'a') {
                        specificContext = 'link';
                    }
                    
                    // Detect heading colors
                    if (context === 'text' && /^h[1-6]$/.test(tagName)) {
                        specificContext = 'heading';
                    }
                    
                    // Detect input/textarea colors
                    if (context === 'background' && (tagName === 'input' || tagName === 'textarea')) {
                        specificContext = 'input';
                    }
                    
                    // Create color key
                    const colorKey = JSON.stringify({ hex, rgb });
                    
                    if (!colorUsage.has(colorKey)) {
                        colorUsage.set(colorKey, {
                            hex,
                            rgb,
                            usage: {
                                text: 0,
                                background: 0,
                                border: 0,
                                button: 0,
                                link: 0,
                                heading: 0,
                                input: 0
                            },
                            totalUses: 0
                        });
                    }
                    
                    const colorData = colorUsage.get(colorKey);
                    colorData.usage[specificContext]++;
                    colorData.totalUses++;
                }
            });
        } catch (error) {
            console.error('HueHawk: Error processing element:', error);
        }
    });
    
    // Convert to array and process usage data
    const colorArray = Array.from(colorUsage.values())
        .map(colorData => {
            // Calculate percentages for each usage type
            const usagePercentages = {};
            Object.keys(colorData.usage).forEach(context => {
                usagePercentages[context] = Math.round((colorData.usage[context] / colorData.totalUses) * 100);
            });
            
            // Determine primary usage context
            let primaryContext = 'background';
            let maxUsage = 0;
            Object.entries(colorData.usage).forEach(([context, count]) => {
                if (count > maxUsage) {
                    maxUsage = count;
                    primaryContext = context;
                }
            });
            
            return {
                hex: colorData.hex,
                rgb: colorData.rgb,
                totalUses: colorData.totalUses,
                primaryContext: primaryContext,
                usage: colorData.usage,
                usagePercentages: usagePercentages
            };
        })
        .sort((a, b) => b.totalUses - a.totalUses); // Sort by total usage
    
    console.log('HueHawk: Final color count:', colorArray.length);
    
    // Return top 30 most used colors
    return colorArray.slice(0, 30);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
} 