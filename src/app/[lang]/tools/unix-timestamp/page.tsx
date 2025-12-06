import { getDictionary } from "@/dictionaries/get-dictionary";
import UnixTimestampClient from "@/components/tools/UnixTimestampClient";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolJsonLd from '@/components/ToolJsonLd';
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.unix_timestamp.title} - ${dict.common.title}`,
        description: dict.tools.unix_timestamp.description,
        keywords: ['unix timestamp', 'epoch time', 'timestamp converter', 'unix time', '유닉스 타임스탬프', '유닉스 시간', 'unixタイムスタンプ'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/unix-timestamp`,
        },
        openGraph: {
            title: `${dict.tools.unix_timestamp.title} - ${dict.common.title}`,
            description: dict.tools.unix_timestamp.description,
            url: `https://cheetset.com/${lang}/tools/unix-timestamp`,
            type: 'website',
        },
    };
}

export default async function UnixTimestampPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.unix_timestamp.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.unix_timestamp.description}
                    </p>
                </div>

                <UnixTimestampClient
                    labels={{
                        title: dict.tools.unix_timestamp.title,
                        description: dict.tools.unix_timestamp.description,
                        current_time: dict.tools.unix_timestamp.current_time,
                        pause: dict.tools.unix_timestamp.pause,
                        resume: dict.tools.unix_timestamp.resume,
                        convert_to_date: dict.tools.unix_timestamp.convert_to_date,
                        convert_to_timestamp: dict.tools.unix_timestamp.convert_to_timestamp,
                        timestamp_input: dict.tools.unix_timestamp.timestamp_input,
                        date_input: dict.tools.unix_timestamp.date_input,
                        gmt: dict.tools.unix_timestamp.gmt,
                        local: dict.tools.unix_timestamp.local,
                        copy: dict.tools.unix_timestamp.copy,
                        copied: dict.tools.unix_timestamp.copied,
                    }}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.unix_timestamp.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="unix-timestamp"
                    category="developer"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.unix_timestamp.title}
                    description={dict.tools.unix_timestamp.description}
                    url={`https://cheetset.com/${lang}/tools/unix-timestamp`}
                />
            </div>
        </div>
    );
}
