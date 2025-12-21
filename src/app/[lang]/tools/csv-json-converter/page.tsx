import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CsvJsonConverterClient from './CsvJsonConverterClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import FAQJsonLd from '@/components/FAQJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.csv_json_converter.title} - ${dict.common.title}`,
        description: dict.tools.csv_json_converter.description,
        openGraph: {
            title: `${dict.tools.csv_json_converter.title} - ${dict.common.title}`,
            description: dict.tools.csv_json_converter.description,
        },
    };
}

export default async function CsvJsonConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CsvJsonConverterClient
                labels={{
                    title: dict.tools.csv_json_converter.title,
                    description: dict.tools.csv_json_converter.description,
                    mode_csv_to_json: dict.tools.csv_json_converter.mode_csv_to_json,
                    mode_json_to_csv: dict.tools.csv_json_converter.mode_json_to_csv,
                    input_csv_placeholder: dict.tools.csv_json_converter.input_csv_placeholder,
                    input_json_placeholder: dict.tools.csv_json_converter.input_json_placeholder,
                    option_header: dict.tools.csv_json_converter.option_header,
                    option_header_desc: dict.tools.csv_json_converter.option_header_desc,
                    convert: dict.tools.csv_json_converter.convert,
                    copy: dict.tools.csv_json_converter.copy,
                    download: dict.tools.csv_json_converter.download,
                    clear: dict.tools.csv_json_converter.clear,
                    load_example: dict.tools.csv_json_converter.load_example,
                    error_invalid_csv: dict.tools.csv_json_converter.error_invalid_csv,
                    error_invalid_json: dict.tools.csv_json_converter.error_invalid_json,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-12">
                <article className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.csv_json_converter.title}</h2>
                    <p>{dict.tools.csv_json_converter.seo_content}</p>
                </article>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.csv_json_converter.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.csv_json_converter.how_to_step1}</li>
                        <li>{dict.tools.csv_json_converter.how_to_step2}</li>
                        <li>{dict.tools.csv_json_converter.how_to_step3}</li>
                        <li>{dict.tools.csv_json_converter.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.csv_json_converter.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.csv_json_converter.faq_1_q}</h4>
                            <p>{dict.tools.csv_json_converter.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.csv_json_converter.faq_2_q}</h4>
                            <p>{dict.tools.csv_json_converter.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.csv_json_converter.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.csv_json_converter.use_case_1}</li>
                        <li>{dict.tools.csv_json_converter.use_case_2}</li>
                        <li>{dict.tools.csv_json_converter.use_case_3}</li>
                    </ul>
                </section>
            </div>

            <RelatedTools
                currentSlug="csv-json-converter"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.csv_json_converter.title}
                description={dict.tools.csv_json_converter.description}
                url={`https://cheetset.com/${lang}/tools/csv-json-converter`}
            />
            <FAQJsonLd
                faqs={[
                    { question: dict.tools.csv_json_converter.faq_1_q, answer: dict.tools.csv_json_converter.faq_1_a },
                    { question: dict.tools.csv_json_converter.faq_2_q, answer: dict.tools.csv_json_converter.faq_2_a }
                ]}
            />
        </div>
    );
}
