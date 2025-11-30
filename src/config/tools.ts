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
    // Finance Tools
    {
        slug: 'stock-average-calculator',
        category: 'finance',
    },
    {
        slug: 'salary-calculator',
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
];
