import { getDictionary } from "@/dictionaries/get-dictionary";
import CronGeneratorClient from "@/components/tools/CronGeneratorClient";
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
        title: `${dict.tools.cron_generator.title} - ${dict.common.title}`,
        description: dict.tools.cron_generator.description,
        keywords: ['cron generator', 'cron expression', 'crontab', 'cron schedule', 'cron 생성기', 'cron 표현식', 'cron式'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/cron-generator`,
        },
        openGraph: {
            title: `${dict.tools.cron_generator.title} - ${dict.common.title}`,
            description: dict.tools.cron_generator.description,
            url: `https://cheetset.com/${lang}/tools/cron-generator`,
            type: 'website',
        },
    };
}

export default async function CronGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.cron_generator.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.cron_generator.description}
                    </p>
                </div>

                <CronGeneratorClient
                    labels={{
                        title: dict.tools.cron_generator.title,
                        description: dict.tools.cron_generator.description,
                        output_label: dict.tools.cron_generator.output_label,
                        human_readable: dict.tools.cron_generator.human_readable,
                        copy: dict.tools.cron_generator.copy,
                        copied: dict.tools.cron_generator.copied,
                        tabs: dict.tools.cron_generator.tabs,
                        labels: dict.tools.cron_generator.labels,
                    }}
                    lang={lang}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.cron_generator.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="cron-generator"
                    category="developer"
                    lang={lang}
                />
                <ToolJsonLd
                    name={dict.tools.cron_generator.title}
                    description={dict.tools.cron_generator.description}
                    url={`https://cheetset.com/${lang}/tools/cron-generator`}
                />
            </div>
        </div>
    );
}
