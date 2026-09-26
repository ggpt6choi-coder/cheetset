import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import MathPracticeClient from './MathPracticeClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import RelatedTools from '@/components/tools/RelatedTools';
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
        title: dict.tools.math_practice.title,
        description: dict.tools.math_practice.description,
        path: '/tools/math-practice',
        lang,
        keywords: dict.tools.math_practice.keywords || [],
    });
}

export default async function MathPracticePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-3 sm:py-6 px-3 sm:px-6 lg:px-8">
            <MathPracticeClient
                lang={lang}
                labels={{
                    title: dict.tools.math_practice.title,
                    description: dict.tools.math_practice.description,
                    mode_challenge: dict.tools.math_practice.mode_challenge,
                    mode_infinite: dict.tools.math_practice.mode_infinite,
                    digits_label: dict.tools.math_practice.digits_label,
                    digits_all: dict.tools.math_practice.digits_all,
                    digits_1: dict.tools.math_practice.digits_1,
                    digits_2: dict.tools.math_practice.digits_2,
                    digits_3: dict.tools.math_practice.digits_3,
                    op_label: dict.tools.math_practice.op_label,
                    op_all: dict.tools.math_practice.op_all,
                    op_add: dict.tools.math_practice.op_add,
                    op_sub: dict.tools.math_practice.op_sub,
                    input_placeholder: dict.tools.math_practice.input_placeholder,
                    submit_btn: dict.tools.math_practice.submit_btn,
                    next_btn: dict.tools.math_practice.next_btn,
                    correct_msg: dict.tools.math_practice.correct_msg,
                    wrong_msg: dict.tools.math_practice.wrong_msg,
                    streak: dict.tools.math_practice.streak,
                    best_streak: dict.tools.math_practice.best_streak,
                    score: dict.tools.math_practice.score,
                    accuracy: dict.tools.math_practice.accuracy,
                    sound_on: dict.tools.math_practice.sound_on,
                    sound_off: dict.tools.math_practice.sound_off,
                    keypad_toggle: dict.tools.math_practice.keypad_toggle,
                    challenge_complete: dict.tools.math_practice.challenge_complete,
                    restart_challenge: dict.tools.math_practice.restart_challenge,
                    reset: dict.tools.math_practice.reset,
                    time_taken: dict.tools.math_practice.time_taken,
                    question_num: dict.tools.math_practice.question_num,
                    combo_cheer: dict.tools.math_practice.combo_cheer,
                    clear: dict.tools.math_practice.clear,
                    perfect: dict.tools.math_practice.perfect,
                    good_job: dict.tools.math_practice.good_job,
                }}
            />

            {/* Rich Content & SEO Section */}
            <div className="max-w-3xl mx-auto mt-16 px-6">
                <RichContentSection content={dict.tools.math_practice as ToolContent} />
            </div>

            <RelatedTools
                currentSlug="math-practice"
                category="daily"
                lang={lang}
            />

            <ToolJsonLd
                name={dict.tools.math_practice.title}
                description={dict.tools.math_practice.description}
                url={`https://www.cheetset.com/${lang}/tools/math-practice`}
            />
        </div>
    );
}
