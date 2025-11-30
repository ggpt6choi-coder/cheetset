import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import TicketingClient from './TicketingClient';

type Locale = 'en' | 'ko' | 'ja';
type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.ticketing_practice.title} - ${dict.common.title}`,
        description: dict.tools.ticketing_practice.description,
    };
}

export default async function TicketingPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <TicketingClient
                labels={{
                    title: dict.tools.ticketing_practice.title,
                    description: dict.tools.ticketing_practice.description,
                    start_game: dict.tools.ticketing_practice.start_game,
                    score: dict.tools.ticketing_practice.score,
                    time_left: dict.tools.ticketing_practice.time_left,
                    click_target: dict.tools.ticketing_practice.click_target,
                    game_over: dict.tools.ticketing_practice.game_over,
                    final_score: dict.tools.ticketing_practice.final_score,
                    retry: dict.tools.ticketing_practice.retry,
                    share_result: dict.tools.ticketing_practice.share_result,
                    share_message: dict.tools.ticketing_practice.share_message,
                    copied: dict.tools.ticketing_practice.copied,
                }}
            />

            <div className="max-w-3xl mx-auto mt-16 px-6">
                <div className="prose prose-indigo dark:prose-invert mx-auto">
                    <p>{dict.tools.ticketing_practice.seo_content}</p>
                </div>
            </div>
        </div>
    );
}
