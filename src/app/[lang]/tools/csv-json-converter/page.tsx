import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CsvJsonConverterClient from './CsvJsonConverterClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';

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
            <div className="max-w-7xl mx-auto px-6 pb-20 mt-12">
                <RichContentSection content={dict.tools.csv_json_converter as ToolContent} />
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

        </div>
    );
}
