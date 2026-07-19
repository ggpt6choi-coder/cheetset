import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import KoreanKeyboardClient from './KoreanKeyboardClient';
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
        title: dict.tools.korean_keyboard_practice.title,
        description: dict.tools.korean_keyboard_practice.description,
        path: '/tools/korean-keyboard-practice',
        lang,
        keywords: dict.tools.korean_keyboard_practice.keywords || [],
    });
}

export default async function KoreanKeyboardPracticePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <KoreanKeyboardClient
                lang={lang}
                labels={{
                    title: dict.tools.korean_keyboard_practice.title,
                    description: dict.tools.korean_keyboard_practice.description,
                    start_game: dict.tools.korean_keyboard_practice.start_game,
                    cpm: dict.tools.korean_keyboard_practice.cpm,
                    accuracy: dict.tools.korean_keyboard_practice.accuracy,
                    time_left: dict.tools.korean_keyboard_practice.time_left,
                    current_word: dict.tools.korean_keyboard_practice.current_word,
                    next_word: dict.tools.korean_keyboard_practice.next_word,
                    type_here: dict.tools.korean_keyboard_practice.type_here,
                    game_over: dict.tools.korean_keyboard_practice.game_over,
                    final_cpm: dict.tools.korean_keyboard_practice.final_cpm,
                    final_accuracy: dict.tools.korean_keyboard_practice.final_accuracy,
                    total_time: dict.tools.korean_keyboard_practice.total_time,
                    retry: dict.tools.korean_keyboard_practice.retry,
                    share_result: dict.tools.korean_keyboard_practice.share_result,
                    share_message: dict.tools.korean_keyboard_practice.share_message,
                    copied: dict.tools.korean_keyboard_practice.copied,
                }}
            />

            <div className="max-w-3xl mx-auto mt-16 px-6">
                <RichContentSection content={dict.tools.korean_keyboard_practice as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="korean-keyboard-practice"
                category="daily"
                lang={lang}
            />
            
            <ToolJsonLd
                name={dict.tools.korean_keyboard_practice.title}
                description={dict.tools.korean_keyboard_practice.description}
                url={`https://www.cheetset.com/${lang}/tools/korean-keyboard-practice`}
            />
        </div>
    );
}
