export interface Tool {
    slug: string;
    category: 'developer' | 'finance' | 'daily' | 'image' | 'text' | 'health';
    icon?: string;
}

export const tools: Tool[] = [
    // Text Tools
    {
        slug: 'word-counter',
        category: 'text',
    },
    {
        slug: 'case-converter',
        icon: 'Type',
        category: 'text',
    },
    {
        slug: 'lorem-ipsum',
        icon: 'Type',
        category: 'text'
    },
    {
        slug: 'diff-checker',
        icon: 'GitCompare',
        category: 'text'
    },
    {
        slug: 'html-encoder',
        icon: 'Code',
        category: 'text'
    },
    // Image Tools
    {
        slug: 'image-to-base64',
        icon: '🖼️',
        category: 'image'
    },
    {
        slug: 'base64-to-image',
        icon: '🔄',
        category: 'image'
    },
    {
        slug: 'image-resizer',
        icon: 'Image',
        category: 'image'
    },
    {
        slug: 'exif-viewer',
        category: 'image',
        icon: 'Camera'
    },
    {
        slug: 'image-cropper',
        icon: 'Crop',
        category: 'image'
    },
    {
        slug: 'image-filters',
        icon: 'Palette',
        category: 'image'
    },
    {
        slug: 'image-to-pdf',
        icon: 'FileText',
        category: 'image'
    },
    {
        slug: 'image-blur',
        icon: 'EyeOff',
        category: 'image'
    },
    {
        slug: 'merge-pdf',
        icon: 'Files',
        category: 'image'
    },
    {
        slug: 'split-pdf',
        icon: 'Scissors',
        category: 'image'
    },
    {
        slug: 'image-converter',
        icon: 'RefreshCw',
        category: 'image'
    },
    // Developer Tools
    {
        slug: 'json-formatter',
        category: 'developer',
    },
    {
        slug: 'uuid-generator',
        category: 'developer',
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
        slug: 'password-generator',
        icon: 'Key',
        category: 'developer'
    },
    {
        slug: 'sql-formatter',
        icon: 'Database',
        category: 'developer'
    },
    // Finance Tools
    {
        slug: 'stock-average-calculator',
        icon: '📉',
        category: 'finance'
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
    {
        slug: 'roi-calculator',
        icon: '📊',
        category: 'finance',
    },
    {
        slug: 'csv-json-converter',
        icon: 'FileJson',
        category: 'developer',
    },
    {
        slug: 'css-generators',
        icon: 'Palette',
        category: 'image',
    },
    {
        slug: 'youtube-thumbnail',
        icon: 'Youtube',
        category: 'image',
    },
    {
        slug: 'my-ip-address',
        icon: 'Globe',
        category: 'daily',
    },
    {
        slug: 'wifi-qr-code',
        icon: 'Wifi',
        category: 'daily',
    },
    {
        slug: 'youtube-calculator',
        icon: '🎥',
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
        slug: 'pomodoro-timer',
        icon: '⏱️',
        category: 'daily',
    },
    {
        slug: 'qr-code',
        icon: 'QrCode',
        category: 'daily'
    },
    {
        slug: 'percentage-calculator',
        icon: 'Percent',
        category: 'daily'
    },
    {
        slug: 'd-day-counter',
        icon: 'Calendar',
        category: 'daily'
    },
    {
        slug: 'bmi-calculator',
        icon: 'Activity',
        category: 'daily'
    },
    {
        slug: 'random-wheel',
        icon: 'Dices',
        category: 'daily'
    },
    {
        slug: 'reaction-time',
        icon: 'Zap',
        category: 'daily'
    },
    {
        slug: 'vat-calculator',
        category: 'finance',
    },
    {
        slug: 'aspect-ratio-calculator',
        category: 'developer',
    },
    {
        slug: 'image-compressor',
        category: 'developer',
    },
    {
        slug: 'country-capital-quiz',
        category: 'daily',
    },
    {
        slug: 'loan-calculator',
        icon: 'DollarSign',
        category: 'finance'
    },
    {
        slug: 'bmr-calculator',
        icon: 'Activity',
        category: 'health'
    },
    {
        slug: 'tdee-calculator',
        icon: 'Activity',
        category: 'health'
    },
    {
        slug: 'subnet-calculator',
        icon: 'Network',
        category: 'developer'
    },
    {
        slug: 'curl-converter',
        icon: 'Terminal',
        category: 'developer'
    },
    {
        slug: 'regex-tester',
        icon: 'Code2',
        category: 'developer'
    },
    {
        slug: 'json-diff',
        icon: 'FileDiff',
        category: 'developer'
    },
    {
        slug: 'color-palette',
        icon: 'Palette',
        category: 'image'
    },
    {
        slug: 'url-encoder',
        icon: 'Link',
        category: 'developer'
    },
    {
        slug: 'meta-tag-generator',
        icon: 'Share2',
        category: 'developer'
    },
    {
        slug: 'photo-calendar-2025',
        icon: 'Image',
        category: 'image'
    },
    {
        slug: 'markdown-preview',
        icon: 'FileText',
        category: 'developer'
    },
    {
        slug: 'user-agent-parser',
        icon: 'Monitor',
        category: 'developer'
    }
];
