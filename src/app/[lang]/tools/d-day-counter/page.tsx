import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import DDayCounterClient from './DDayCounterClient';
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
        title: dict.tools.d_day_counter.title,
        description: dict.tools.d_day_counter.description,
        path: '/tools/d-day-counter',
        lang,
        keywords: dict.tools.d_day_counter.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function DDayCounterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <DDayCounterClient
                labels={{
                    title: dict.tools.d_day_counter.title,
                    description: dict.tools.d_day_counter.description,
                    target_date: dict.tools.d_day_counter.target_date,
                    title_label: dict.tools.d_day_counter.title_label,
                    calc_type: dict.tools.d_day_counter.calc_type,
                    type_d_day: dict.tools.d_day_counter.type_d_day,
                    type_date_count: dict.tools.d_day_counter.type_date_count,
                    include_today: dict.tools.d_day_counter.include_today,
                    calculate: dict.tools.d_day_counter.calculate,
                    result: dict.tools.d_day_counter.result,
                    days_left: dict.tools.d_day_counter.days_left,
                    days_passed: dict.tools.d_day_counter.days_passed,
                    today: dict.tools.d_day_counter.today,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-12">
                <RichContentSection content={dict.tools.d_day_counter as ToolContent} />
            </div>

            <RelatedTools lang={lang} currentSlug="d-day-counter" category="daily" />

            <ToolJsonLd
                name={dict.tools.d_day_counter.title}
                description={dict.tools.d_day_counter.description}
                url={`https://cheetset.com/${lang}/tools/d-day-counter`}
            />
        </div>
    );
}
