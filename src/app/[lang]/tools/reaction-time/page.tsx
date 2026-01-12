import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import ReactionTimeClient from './ReactionTimeClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.reaction_time.title,
        description: dict.tools.reaction_time.description,
        path: '/tools/reaction-time',
        lang,
        keywords: dict.tools.reaction_time.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function ReactionTimePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="pt-12 pb-12">
                <ReactionTimeClient
                    labels={{
                        title: dict.tools.reaction_time.title,
                        description: dict.tools.reaction_time.description,
                        wait: dict.tools.reaction_time.wait,
                        click: dict.tools.reaction_time.click,
                        too_soon: dict.tools.reaction_time.too_soon,
                        start: dict.tools.reaction_time.start,
                        play_again: dict.tools.reaction_time.play_again,
                        average: dict.tools.reaction_time.average,
                        best: dict.tools.reaction_time.best,
                        tries: dict.tools.reaction_time.tries,
                        ms: dict.tools.reaction_time.ms,
                    }}
                />
            </div>

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <RichContentSection content={dict.tools.reaction_time as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="reaction-time" category="daily" />

            <ToolJsonLd
                name={dict.tools.reaction_time.title}
                description={dict.tools.reaction_time.description}
                url={`https://www.cheetset.com/${lang}/tools/reaction-time`}
            />
        </div>
    );
}
