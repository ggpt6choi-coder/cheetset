import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import LoremIpsumClient from './LoremIpsumClient';
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
        title: dict.tools.lorem_ipsum.title,
        description: dict.tools.lorem_ipsum.description,
        path: '/tools/lorem-ipsum',
        lang,
        keywords: dict.tools.lorem_ipsum.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function LoremIpsumPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <LoremIpsumClient
                labels={{
                    title: dict.tools.lorem_ipsum.title,
                    description: dict.tools.lorem_ipsum.description,
                    count: dict.tools.lorem_ipsum.count,
                    type: dict.tools.lorem_ipsum.type,
                    type_paragraphs: dict.tools.lorem_ipsum.type_paragraphs,
                    type_sentences: dict.tools.lorem_ipsum.type_sentences,
                    type_words: dict.tools.lorem_ipsum.type_words,
                    generate: dict.tools.lorem_ipsum.generate,
                    copy: dict.tools.lorem_ipsum.copy,
                    copied: dict.tools.lorem_ipsum.copied,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <RichContentSection content={dict.tools.lorem_ipsum as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="lorem-ipsum" category="developer" />

            <ToolJsonLd
                name={dict.tools.lorem_ipsum.title}
                description={dict.tools.lorem_ipsum.description}
                url={`https://www.cheetset.com/${lang}/tools/lorem-ipsum`}
            />
        </div>
    );
}
