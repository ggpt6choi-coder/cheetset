import type { Metadata } from "next";
import { getDictionary, Locale } from "@/dictionaries/get-dictionary";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.nav.contact} - ${dict.common.title}`,
        description: 'Contact CheatKey for questions, feedback, or suggestions about our free utility tools.',
    };
}

export default async function ContactPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>문의하기</h1>
                            <p className="lead">CheatSet에 대한 질문, 피드백, 제안이 있으신가요? 언제든 연락 주세요!</p>

                            <h2>📧 이메일</h2>
                            <p>
                                <a href="mailto:cheet.sett@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                                    cheet.sett@gmail.com
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">보통 24-48시간 내에 답변드립니다.</p>

                            <h2>💬 문의 유형</h2>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="mt-0">기술 지원</h3>
                                <p>도구가 제대로 작동하지 않나요? 문제를 자세히 설명해주시면 빠르게 해결해드립니다.</p>

                                <h3>새로운 도구 제안</h3>
                                <p>필요한 유틸리티 도구가 있나요? 여러분의 아이디어를 듣고 싶습니다!</p>

                                <h3>협업 문의</h3>
                                <p>비즈니스 제휴나 협업에 관심이 있으신가요? 이메일로 연락주세요.</p>

                                <h3>버그 리포트</h3>
                                <p>버그를 발견하셨나요? 상세한 설명과 함께 알려주시면 감사하겠습니다.</p>
                            </div>

                            <h2>🌐 소셜 미디어</h2>
                            <p>준비 중 입니다</p>

                            <h2>⏰ 응답 시간</h2>
                            <p>평일: 24-48시간 이내<br />
                                주말/공휴일: 2-3일 이내</p>

                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg mt-8">
                                <p className="font-semibold text-indigo-800 dark:text-indigo-200">💡 빠른 팁</p>
                                <p className="text-sm mb-0">문의하시기 전에 <a href={`/${lang}/blog`}>블로그</a>에서 관련 가이드를 확인해보세요. 많은 질문에 대한 답변이 이미 있을 수 있습니다!</p>
                            </div>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>Contact Us</h1>
                            <p className="lead">Have questions, feedback, or suggestions about CheatKey? We'd love to hear from you!</p>

                            <h2>📧 Email</h2>
                            <p>
                                <a href="mailto:cheet.sett@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                                    cheet.sett@gmail.com
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">We typically respond within 24-48 hours.</p>

                            <h2>💬 Inquiry Types</h2>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="mt-0">Technical Support</h3>
                                <p>Tools not working properly? Describe the issue in detail and we'll resolve it quickly.</p>

                                <h3>Feature Requests</h3>
                                <p>Need a specific utility tool? We'd love to hear your ideas!</p>

                                <h3>Business Inquiries</h3>
                                <p>Interested in partnerships or collaborations? Reach out via email.</p>

                                <h3>Bug Reports</h3>
                                <p>Found a bug? Please provide detailed information so we can fix it.</p>
                            </div>

                            <h2>🌐 Social Media</h2>
                            <p>Follow CheatKey for the latest news and updates:</p>
                            <ul className="list-none pl-0">
                                <li>🐦 Twitter: <a href="https://twitter.com/cheetset" target="_blank" rel="noopener noreferrer">@cheetset</a></li>
                                <li>📘 GitHub: <a href="https://github.com/cheetset" target="_blank" rel="noopener noreferrer">github.com/cheetset</a></li>
                            </ul>

                            <h2>⏰ Response Time</h2>
                            <p>Weekdays: Within 24-48 hours<br />
                                Weekends/Holidays: Within 2-3 days</p>

                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg mt-8">
                                <p className="font-semibold text-indigo-800 dark:text-indigo-200">💡 Quick Tip</p>
                                <p className="text-sm mb-0">Before contacting us, check our <a href={`/${lang}/blog`}>blog</a> for guides. Many common questions are already answered there!</p>
                            </div>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>お問い合わせ</h1>
                            <p className="lead">CheatSetについてのご質問、フィードバック、ご提案はありますか？お気軽にご連絡ください！</p>

                            <h2>📧 メール</h2>
                            <p>
                                <a href="mailto:cheet.sett@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                                    cheet.sett@gmail.com
                                </a>
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">通常24-48時間以内に返信いたします。</p>

                            <h2>💬 お問い合わせ種類</h2>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                                <h3 className="mt-0">技術サポート</h3>
                                <p>ツールが正常に動作しませんか？問題を詳しく説明していただければ、迅速に解決いたします。</p>

                                <h3>新機能のご提案</h3>
                                <p>必要なユーティリティツールはありますか？皆様のアイデアをお聞かせください！</p>

                                <h3>ビジネスお問い合わせ</h3>
                                <p>提携や協業にご興味がありますか？メールでご連絡ください。</p>

                                <h3>バグ報告</h3>
                                <p>バグを発見されましたか？詳細な説明をお願いいたします。</p>
                            </div>

                            <h2>🌐 ソーシャルメディア</h2>
                            <p>CheatKeyの最新ニュースとアップデートをフォローしてください：</p>
                            <ul className="list-none pl-0">
                                <li>🐦 Twitter: <a href="https://twitter.com/cheetset" target="_blank" rel="noopener noreferrer">@cheetset</a></li>
                                <li>📘 GitHub: <a href="https://github.com/cheetset" target="_blank" rel="noopener noreferrer">github.com/cheetset</a></li>
                            </ul>

                            <h2>⏰ 返信時間</h2>
                            <p>平日: 24-48時間以内<br />
                                週末/祝日: 2-3日以内</p>

                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg mt-8">
                                <p className="font-semibold text-indigo-800 dark:text-indigo-200">💡 クイックヒント</p>
                                <p className="text-sm mb-0">お問い合わせの前に<a href={`/${lang}/blog`}>ブログ</a>で関連ガイドをご確認ください。多くの質問への回答がすでにあるかもしれません！</p>
                            </div>
                        </>
                    )}
                </article>
            </div>
        </div>
    );
}
