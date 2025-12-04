export interface Tool {
    slug: string;
    category: 'developer' | 'finance' | 'daily';
    icon?: string;
}

export const tools: Tool[] = [
    // Developer Tools
    {
        slug: 'word-counter',
        category: 'developer',
    },
    {
        slug: 'json-formatter',
        category: 'developer',
    },
    {
        slug: 'uuid-generator',
        category: 'developer',
    },
    // Finance Tools
    {
        slug: 'stock-average-calculator',
        icon: '📉',
        category: 'finance'
    },
    {
        slug: 'image-to-base64',
        icon: '🖼️',
        category: 'developer'
    },
    {
        slug: 'base64-to-image',
        icon: '🔄',
        category: 'developer'
    },
    {
        slug: 'salary-calculator',
        category: 'finance',
    },
    {
        slug: 'compound-interest',
        icon: '📈',
        category: 'finance',
    },
    // Daily Utilities
    {
        slug: 'lotto-generator',
        category: 'daily',
    },
    {
        slug: 'server-time',
        category: 'daily',
    },
    {
        slug: 'ticketing-practice',
        category: 'daily',
    },
    {
        slug: 'unit-converter',
        category: 'daily',
    },
];
