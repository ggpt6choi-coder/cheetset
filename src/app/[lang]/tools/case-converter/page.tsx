import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CaseConverterClient from './CaseConverterClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RelatedTools from '@/components/tools/RelatedTools';

type Locale = 'en' | 'ko' | 'ja';

interface Props {
    params: Promise<{
        lang: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.case_converter.title} - ${dict.common.title}`,
        description: dict.tools.case_converter.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/case-converter`,
        },
    };
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
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.case_converter.seo_content}
                    </p>
                </div>
            </div>

            <RelatedTools lang={lang} currentSlug="case-converter" category="text" />

            <ToolJsonLd
                name={dict.tools.case_converter.title}
                description={dict.tools.case_converter.description}
                url={`https://cheetset.com/${lang}/tools/case-converter`}
            />
        </div>
    );
}
