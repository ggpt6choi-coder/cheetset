import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import FlagQuizClient from './FlagQuizClient';
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
        title: dict.tools.flag_quiz.title,
        description: dict.tools.flag_quiz.description,
        path: '/tools/flag-quiz',
        lang,
        keywords: dict.tools.flag_quiz.keywords || [],
    });
}

export default async function FlagQuizPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <FlagQuizClient
                labels={{
                    title: dict.tools.flag_quiz.title,
                    description: dict.tools.flag_quiz.description,
                    tab_finder: dict.tools.flag_quiz.tab_finder,
                    tab_quiz: dict.tools.flag_quiz.tab_quiz,
                    search_placeholder: dict.tools.flag_quiz.search_placeholder,
                    region_all: dict.tools.flag_quiz.region_all,
                    quiz_question: dict.tools.flag_quiz.quiz_question,
                    quiz_score: dict.tools.flag_quiz.quiz_score,
                    quiz_next: dict.tools.flag_quiz.quiz_next,
                    quiz_correct: dict.tools.flag_quiz.quiz_correct,
                    quiz_wrong: dict.tools.flag_quiz.quiz_wrong,
                }}
                lang={lang as Locale}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <RichContentSection content={dict.tools.flag_quiz as ToolContent} />
            </div>

            <ToolJsonLd
                name={dict.tools.flag_quiz.title}
                description={dict.tools.flag_quiz.description}
                url={`https://www.cheetset.com/${lang}/tools/flag-quiz`}
            />
        </div>
    );
}
