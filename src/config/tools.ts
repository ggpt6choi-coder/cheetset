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
    {
        slug: 'jwt-decoder',
        icon: '🛡️',
        category: 'developer',
    },
    {
        slug: 'unix-timestamp',
        icon: '⏰',
        category: 'developer',
    },
    {
        slug: 'cron-generator',
        icon: '⚙️',
        category: 'developer',
    },
    {
        slug: 'roi-calculator',
        icon: '📊',
        category: 'finance',
    },
    {
        slug: 'youtube-calculator',
        icon: '🎥',
        category: 'finance',
    },
    {
        slug: 'pomodoro-timer',
        icon: '⏱️',
        category: 'daily',
    },
    {
        slug: 'password-generator',
        icon: 'Key',
        category: 'developer'
    },
    {
        slug: 'qr-code',
        icon: 'QrCode',
        category: 'daily'
    },
    {
        slug: 'sql-formatter',
        icon: 'Database',
        category: 'developer'
    },
    {
        slug: 'percentage-calculator',
        icon: 'Percent',
        category: 'daily'
    },
    {
        slug: 'diff-checker',
        icon: 'GitCompare',
        category: 'developer'
    }
];
// Force update
