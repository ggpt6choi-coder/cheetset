import Link from 'next/link';
import { tools } from '@/config/tools';
import { getDictionary } from '@/dictionaries/get-dictionary';
import {
    Calculator,
    Type,
    FileJson,
    Dna,
    Clock,
    TrendingUp,
    Image as ImageIcon,
    Ticket,
    DollarSign,
    Fingerprint,
    LucideIcon
} from 'lucide-react';

type Locale = 'en' | 'ko' | 'ja';

interface RelatedToolsProps {
    currentSlug: string;
    category: string;
    lang: string;
}

// Icon Mapping (Should match config/tools.ts icons if they were strings, but here we map manually for safety)
// In a real scenario, we might want to store Lucide icon names in config and dynamic import, 
// but a map is safer for RSC.
const iconMap: Record<string, LucideIcon> = {
    'word-counter': Type,
    'json-formatter': FileJson,
    'lotto-generator': Dna,
    'server-time': Clock,
    'stock-average-calculator': TrendingUp,
    'image-to-base64': ImageIcon,
    'base64-to-image': ImageIcon,
    'ticketing-practice': Ticket,
    'salary-calculator': DollarSign,
    'compound-interest': TrendingUp,
    'uuid-generator': Fingerprint,
};

export default async function RelatedTools({ currentSlug, category, lang }: RelatedToolsProps) {
    const dict = await getDictionary(lang as Locale);

    // 1. Filter by category, exclude current
    let related = tools.filter(t => t.category === category && t.slug !== currentSlug);

    // 2. If less than 4, fill with others
    if (related.length < 4) {
        const others = tools.filter(t => t.category !== category && t.slug !== currentSlug);
        // Shuffle others slightly or just take first few? Let's just take first few for stability.
        related = [...related, ...others];
    }

    // 3. Slice to max 4
    const displayTools = related.slice(0, 4);

    // Section Title Mapping
    const sectionTitle = {
        ko: '함께 많이 사용하는 도구',
        en: 'Frequently Used Together',
        ja: 'よく一緒に使われるツール',
    };

    return (
        <section className="py-12 border-t border-gray-100 dark:border-gray-800 mt-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    {sectionTitle[lang as Locale] || sectionTitle.en}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayTools.map((tool) => {
                        const Icon = iconMap[tool.slug] || Calculator;
                        // @ts-ignore - Dynamic dictionary access
                        const toolData = dict.tools[tool.slug.replace(/-/g, '_')];

                        if (!toolData) return null;

                        return (
                            <Link
                                key={tool.slug}
                                href={`/${lang}/tools/${tool.slug}`}
                                className="group block h-full"
                            >
                                <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-800">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {toolData.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                        {toolData.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
