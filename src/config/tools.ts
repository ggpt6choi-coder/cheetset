export interface Tool {
    slug: string;
    category: 'developer' | 'daily';
    icon?: string; // Icon name from lucide-react or similar if needed later
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
    // Daily Utilities
    {
        slug: 'lotto-generator',
        category: 'daily',
    },
    {
        slug: 'server-time',
        category: 'daily',
    },
];
