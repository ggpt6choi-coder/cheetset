import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries/get-dictionary';
import CountryCapitalQuizClient from './CountryCapitalQuizClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.country_capital_quiz.title} - ${dict.common.title}`,
        description: dict.tools.country_capital_quiz.description,
        alternates: {
            canonical: `https://cheetset.com/${lang}/tools/country-capital-quiz`,
        },
    };
}

export default async function CountryCapitalQuizPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CountryCapitalQuizClient
                labels={{
                    title: dict.tools.country_capital_quiz.title,
                    description: dict.tools.country_capital_quiz.description,
                    tab_finder: dict.tools.country_capital_quiz.tab_finder,
                    tab_quiz: dict.tools.country_capital_quiz.tab_quiz,
                    search_placeholder: dict.tools.country_capital_quiz.search_placeholder,
                    region_all: dict.tools.country_capital_quiz.region_all,
                    quiz_question: dict.tools.country_capital_quiz.quiz_question,
                    quiz_score: dict.tools.country_capital_quiz.quiz_score,
                    quiz_next: dict.tools.country_capital_quiz.quiz_next,
                    quiz_correct: dict.tools.country_capital_quiz.quiz_correct,
                    quiz_wrong: dict.tools.country_capital_quiz.quiz_wrong,
                }}
                lang={lang as Locale}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                        {dict.tools.country_capital_quiz.seo_content}
                    </p>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.country_capital_quiz.title}
                description={dict.tools.country_capital_quiz.description}
                url={`https://cheetset.com/${lang}/tools/country-capital-quiz`}
            />
        </div>
    );
}
