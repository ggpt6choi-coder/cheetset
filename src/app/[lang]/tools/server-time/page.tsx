import React from 'react';
import { Metadata } from 'next';
import ServerTimeClient from './ServerTimeClient';
import { getDictionary } from '@/dictionaries/get-dictionary';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
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
        title: dict.tools.server_time.title,
        description: dict.tools.server_time.description,
        path: '/tools/server-time',
        lang,
        keywords: dict.tools.server_time.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function ServerTimePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ServerTimeClient
                labels={{
                    title: dict.tools.server_time.title,
                    subtitle: dict.tools.server_time.subtitle,
                    placeholder: dict.tools.server_time.placeholder,
                    button_check: dict.tools.server_time.button_check,
                    button_checking: dict.tools.server_time.button_checking,
                    tips_title: dict.tools.server_time.tips_title,
                    tip1: dict.tools.server_time.tip1,
                    tip2: dict.tools.server_time.tip2,
                    tip3: dict.tools.server_time.tip3,
                    tip4: dict.tools.server_time.tip4,
                    time_diff_faster: dict.tools.server_time.time_diff_faster,
                    time_diff_slower: dict.tools.server_time.time_diff_slower,
                    time_diff_slower_text: dict.tools.server_time.time_diff_slower_text,
                    seconds: dict.tools.server_time.seconds,
                }}
            />

            <div className="max-w-3xl mx-auto px-6 pb-20">
                <RichContentSection content={dict.tools.server_time as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="server-time"
                category="daily"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.server_time.title}
                description={dict.tools.server_time.description}
                url={`https://cheetset.com/${lang}/tools/server-time`}
            />
        </div>
    );
}
