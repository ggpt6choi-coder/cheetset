import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import RandomWheelClient from './RandomWheelClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.random_wheel.title,
        description: dict.tools.random_wheel.description,
        path: '/tools/random-wheel',
        lang,
        keywords: dict.tools.random_wheel.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function RandomWheelPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <RandomWheelClient
                labels={{
                    title: dict.tools.random_wheel.title,
                    description: dict.tools.random_wheel.description,
                    items_label: dict.tools.random_wheel.items_label,
                    placeholder: dict.tools.random_wheel.placeholder,
                    spin: dict.tools.random_wheel.spin,
                    reset: dict.tools.random_wheel.reset,
                    winner: dict.tools.random_wheel.winner,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <RichContentSection content={dict.tools.random_wheel as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="random-wheel" category="daily" />

            <ToolJsonLd
                name={dict.tools.random_wheel.title}
                description={dict.tools.random_wheel.description}
                url={`https://www.cheetset.com/${lang}/tools/random-wheel`}
            />
        </div>
    );
}
