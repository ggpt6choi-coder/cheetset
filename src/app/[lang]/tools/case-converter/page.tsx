import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';
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
        title: dict.tools.case_converter.title,
        description: dict.tools.case_converter.description,
        path: '/tools/case-converter',
        lang,
        keywords: dict.tools.case_converter.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function CaseConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CaseConverterClient
                labels={{
                    title: dict.tools.case_converter.title,
                    description: dict.tools.case_converter.description,
                    input_placeholder: dict.tools.case_converter.input_placeholder,
                    uppercase: dict.tools.case_converter.uppercase,
                    lowercase: dict.tools.case_converter.lowercase,
                    titlecase: dict.tools.case_converter.titlecase,
                    sentencecase: dict.tools.case_converter.sentencecase,
                    camelcase: dict.tools.case_converter.camelcase,
                    snakecase: dict.tools.case_converter.snakecase,
                    kebabcase: dict.tools.case_converter.kebabcase,
                    pascalcase: dict.tools.case_converter.pascalcase,
                    copy: dict.tools.case_converter.copy,
                    copied: dict.tools.case_converter.copied,
                    clear: dict.tools.case_converter.clear,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <RichContentSection content={dict.tools.case_converter as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="case-converter" category="text" />

            <ToolJsonLd
                name={dict.tools.case_converter.title}
                description={dict.tools.case_converter.description}
                url={`https://www.cheetset.com/${lang}/tools/case-converter`}
            />
        </div>
    );
}
