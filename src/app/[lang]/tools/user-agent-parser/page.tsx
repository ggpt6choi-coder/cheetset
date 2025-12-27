import { getDictionary } from "@/dictionaries/get-dictionary";
import UserAgentParserClient from "./UserAgentParserClient";
import type { Metadata } from "next";
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { ToolContent } from '@/types/Tool';

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.user_agent_parser.title} - ${dict.common.title}`,
        description: dict.tools.user_agent_parser.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/user-agent-parser`,
        },
        openGraph: {
            title: `${dict.tools.user_agent_parser.title} - ${dict.common.title}`,
            description: dict.tools.user_agent_parser.description,
            url: `https://cheetset.com/${lang}/tools/user-agent-parser`,
            type: 'website',
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                    alt: dict.tools.user_agent_parser.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${dict.tools.user_agent_parser.title} - ${dict.common.title}`,
            description: dict.tools.user_agent_parser.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function UserAgentParserPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {dict.tools.user_agent_parser.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {dict.tools.user_agent_parser.description}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                    <UserAgentParserClient
                        labels={{
                            placeholder: dict.tools.user_agent_parser.placeholder,
                            analyze: dict.tools.user_agent_parser.analyze,
                            browser: dict.tools.user_agent_parser.browser,
                            os: dict.tools.user_agent_parser.os,
                            device: dict.tools.user_agent_parser.device,
                            cpu: dict.tools.user_agent_parser.cpu,
                            engine: dict.tools.user_agent_parser.engine,
                            my_ua: dict.tools.user_agent_parser.my_ua
                        }}
                    />
                </div>

                <RichContentSection content={dict.tools.user_agent_parser as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="user-agent-parser"
                category="developer"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.user_agent_parser.title}
                description={dict.tools.user_agent_parser.description}
                url={`https://cheetset.com/${lang}/tools/user-agent-parser`}
            />
        </div>
    );
}
