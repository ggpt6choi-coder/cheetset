import { getDictionary } from "@/dictionaries/get-dictionary";
import PomodoroTimerClient from "@/components/tools/PomodoroTimerClient";
import RelatedTools from "@/components/tools/RelatedTools";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.pomodoro_timer.title} - ${dict.common.title}`,
        description: dict.tools.pomodoro_timer.description,
        keywords: ['pomodoro timer', 'focus timer', 'productivity timer', 'tomato timer', '포모도로 타이머', '집중 타이머', 'ポモドーロタイマー'],
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/pomodoro-timer`,
        },
        openGraph: {
            title: `${dict.tools.pomodoro_timer.title} - ${dict.common.title}`,
            description: dict.tools.pomodoro_timer.description,
            url: `https://cheetset.com/${lang}/tools/pomodoro-timer`,
            type: 'website',
        },
    };
}

export default async function PomodoroTimerPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {dict.tools.pomodoro_timer.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {dict.tools.pomodoro_timer.description}
                    </p>
                </div>

                <PomodoroTimerClient
                    labels={{
                        title: dict.tools.pomodoro_timer.title,
                        description: dict.tools.pomodoro_timer.description,
                        start: dict.tools.pomodoro_timer.start,
                        pause: dict.tools.pomodoro_timer.pause,
                        reset: dict.tools.pomodoro_timer.reset,
                        focus_time: dict.tools.pomodoro_timer.focus_time,
                        short_break: dict.tools.pomodoro_timer.short_break,
                        long_break: dict.tools.pomodoro_timer.long_break,
                    }}
                    lang={lang}
                />

                <div className="max-w-3xl mx-auto mt-16">
                    <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {dict.tools.pomodoro_timer.seo_content}
                        </p>
                    </div>
                </div>

                <RelatedTools
                    currentSlug="pomodoro-timer"
                    category="daily"
                    lang={lang}
                />
            </div>
        </div>
    );
}
