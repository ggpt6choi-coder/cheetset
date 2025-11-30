import type { Metadata } from "next";
import { getDictionary, Locale } from "@/dictionaries/get-dictionary";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.nav.about} - ${dict.common.title}`,
        description: 'CheatKey provides free online utility tools including Word Counter, JSON Formatter, Lotto Number Generator, and Server Time Checker.',
    };
}

export default async function AboutPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>CheatSet 소개</h1>
                            <p className="lead">일상에서 자주 필요한 유틸리티 도구를 무료로 제공하는 웹 서비스입니다.</p>

                            <h2>우리의 미션</h2>
                            <p>CheatKey는 <strong>단순하지만 유용한 도구</strong>를 누구나 쉽게 사용할 수 있도록 만듭니다. 복잡한 가입 절차 없이, 브라우저만 있으면 바로 사용할 수 있습니다.</p>

                            <h2>제공하는 도구</h2>
                            <ul>
                                <li><strong>글자 수 세기:</strong> 자기소개서, 블로그 글 작성 시 실시간 글자 수 확인</li>
                                <li><strong>JSON 포맷터:</strong> 개발자를 위한 JSON 데이터 정리 도구</li>
                                <li><strong>로또 번호 생성기:</strong> 랜덤 로또 번호 추천</li>
                                <li><strong>서버 시간 확인:</strong> 티켓팅, 수강신청을 위한 정확한 서버 시간 체크</li>
                            </ul>

                            <h2>왜 CheatSet인가?</h2>
                            <h3>✅ 완전 무료</h3>
                            <p>모든 도구는 영구 무료입니다. 숨겨진 비용이 없습니다.</p>

                            <h3>✅ 개인정보 보호</h3>
                            <p>입력한 데이터는 서버에 저장되지 않습니다. 모든 처리는 여러분의 브라우저에서 이루어집니다.</p>

                            <h3>✅ 다국어 지원</h3>
                            <p>한국어, 영어, 일본어를 지원하여 전 세계 누구나 사용할 수 있습니다.</p>

                            <h3>✅ 지속적인 업데이트</h3>
                            <p>사용자 피드백을 반영하여 새로운 도구를 계속 추가합니다.</p>

                            <h2>개발자</h2>
                            <p>CheatSet는 개발자와 일반 사용자 모두를 위한 유틸리티를 만드는 것을 목표로 합니다. 더 나은 도구를 위한 제안이 있다면 언제든 연락주세요!</p>

                            <h2>연락처</h2>
                            <p>문의사항이 있으신가요? <a href={`/${lang}/contact`}>Contact 페이지</a>를 통해 연락주세요.</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>About CheatSet</h1>
                            <p className="lead">Free online utility tools for everyday tasks, designed to make your life easier.</p>

                            <h2>Our Mission</h2>
                            <p>CheatKey provides <strong>simple yet powerful tools</strong> that anyone can use instantly. No complex sign-up process—just open your browser and start using.</p>

                            <h2>Available Tools</h2>
                            <ul>
                                <li><strong>Word Counter:</strong> Real-time character counting for resumes and blog posts</li>
                                <li><strong>JSON Formatter:</strong> Format and validate JSON data for developers</li>
                                <li><strong>Lotto Number Generator:</strong> Random lottery number recommendations</li>
                                <li><strong>Server Time Checker:</strong> Accurate server time for ticket purchases and course registration</li>
                            </ul>

                            <h2>Why CheatKey?</h2>
                            <h3>✅ Completely Free</h3>
                            <p>All tools are free forever. No hidden costs.</p>

                            <h3>✅ Privacy Protected</h3>
                            <p>Your data never leaves your browser. Everything is processed locally.</p>

                            <h3>✅ Multilingual Support</h3>
                            <p>Available in Korean, English, and Japanese for global accessibility.</p>

                            <h3>✅ Continuous Updates</h3>
                            <p>We regularly add new tools based on user feedback.</p>

                            <h2>Developer</h2>
                            <p>CheatKey aims to create utilities for both developers and general users. Have suggestions for new tools? Feel free to reach out!</p>

                            <h2>Contact</h2>
                            <p>Have questions? Visit our <a href={`/${lang}/contact`}>Contact page</a> to get in touch.</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>CheatKeyについて</h1>
                            <p className="lead">日常で頻繁に必要なユーティリティツールを無料で提供するWebサービスです。</p>

                            <h2>私たちのミッション</h2>
                            <p>CheatKeyは<strong>シンプルで便利なツール</strong>を誰でも簡単に使えるようにします。複雑な登録手続きなしで、ブラウザさえあればすぐに使えます。</p>

                            <h2>提供するツール</h2>
                            <ul>
                                <li><strong>文字数カウント:</strong> 履歴書、ブログ作成時のリアルタイム文字数確認</li>
                                <li><strong>JSONフォーマッター:</strong> 開発者向けJSONデータ整形ツール</li>
                                <li><strong>宝くじ番号生成:</strong> ランダム宝くじ番号推薦</li>
                                <li><strong>サーバー時間確認:</strong> チケット予約、履修登録のための正確なサーバー時間チェック</li>
                            </ul>

                            <h2>なぜCheatKey？</h2>
                            <h3>✅ 完全無料</h3>
                            <p>すべてのツールは永久無料です。隠れたコストはありません。</p>

                            <h3>✅ プライバシー保護</h3>
                            <p>入力したデータはサーバーに保存されません。すべての処理はブラウザで行われます。</p>

                            <h3>✅ 多言語対応</h3>
                            <p>韓国語、英語、日本語をサポートし、世界中の誰でも使えます。</p>

                            <h3>✅ 継続的なアップデート</h3>
                            <p>ユーザーフィードバックを反映して新しいツールを追加し続けます。</p>

                            <h2>開発者</h2>
                            <p>CheatKeyは開発者と一般ユーザーの両方のためのユーティリティを作ることを目指しています。より良いツールのための提案があればいつでも連絡してください！</p>

                            <h2>お問い合わせ</h2>
                            <p>ご質問がありますか？<a href={`/${lang}/contact`}>Contactページ</a>からお問い合わせください。</p>
                        </>
                    )}
                </article>
            </div>
        </div>
    );
}
