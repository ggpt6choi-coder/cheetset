import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CurlConverterClient from './CurlConverterClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.curl_converter.title} - ${dict.common.title}`,
        description: dict.tools.curl_converter.description,
    };
}

export default async function CurlConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CurlConverterClient
                labels={{
                    title: dict.tools.curl_converter.title,
                    description: dict.tools.curl_converter.description,
                    input_label: dict.tools.curl_converter.input_label,
                    input_placeholder: dict.tools.curl_converter.input_placeholder,
                    output_label: dict.tools.curl_converter.output_label,
                    copy_button: dict.tools.curl_converter.copy_button,
                    copied: dict.tools.curl_converter.copied,
                    error_invalid_curl: dict.tools.curl_converter.error_invalid_curl,
                    lang_python: dict.tools.curl_converter.lang_python,
                    lang_javascript: dict.tools.curl_converter.lang_javascript,
                    lang_node: dict.tools.curl_converter.lang_node,
                    lang_go: dict.tools.curl_converter.lang_go,
                    lang_php: dict.tools.curl_converter.lang_php,
                    examples_label: dict.tools.curl_converter.examples_label,
                    example_get: dict.tools.curl_converter.example_get,
                    example_post: dict.tools.curl_converter.example_post,
                    example_auth: dict.tools.curl_converter.example_auth,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.curl_converter.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.curl_converter.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.curl_converter} />
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.curl_converter.title}
                description={dict.tools.curl_converter.description}
                url={`https://cheetset.com/${lang}/tools/curl-converter`}
            />
        </div>
    );
}
