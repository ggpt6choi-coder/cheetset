import React from 'react';

type Props = {
    lang: string;
};

export default function ProductivityToolsGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>생산성을 2배로 높이는 온라인 도구 활용법 TOP 5</h1>
                        <p className="lead">매일 반복되는 단순 작업 때문에 시간을 낭비하고 계신가요? 무료 온라인 도구만 잘 활용해도 하루 2시간을 절약할 수 있습니다. 지금 바로 시작하세요!</p>

                        <h2>1. 글자 수 세기 도구 - 자소서, 블로그 필수템</h2>
                        <p>자기소개서 작성, 블로그 글쓰기, SNS 콘텐츠 제작... 글자 수 제한은 어디에나 있습니다. 일일이 손으로 세는 건 비효율의 극치죠.</p>

                        <h3>이런 분들께 추천:</h3>
                        <ul>
                            <li>취업 준비생 (자소서 글자 수 맞추기)</li>
                            <li>블로거 (SEO 최적 글자 수 1,500~2,000자)</li>
                            <li>마케터 (광고 문구 글자 수 제한)</li>
                        </ul>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ 실시간 글자 수 세기</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">공백 포함/미포함, 바이트까지 한눈에!</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">글자 수 세기 →</a>
                        </div>

                        <h2>2. JSON 포맷터 - 개발자의 필수 도구</h2>
                        <p>API 응답 데이터가 한 줄로 쭉~ 붙어서 읽을 수가 없나요? JSON 포맷터로 1초 만에 깔끔하게 정리하세요.</p>

                        <h3>주요 기능:</h3>
                        <ul>
                            <li><strong>Pretty Print:</strong> 보기 좋게 정렬</li>
                            <li><strong>Minify:</strong> 용량 최소화 (배포용)</li>
                            <li><strong>Validation:</strong> 문법 오류 자동 감지</li>
                        </ul>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🔧 JSON 포맷터</p>
                            <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg mt-4">JSON 정리하기 →</a>
                        </div>

                        <h2>3. 서버 시간 확인 - 티켓팅 성공률 UP</h2>
                        <p>콘서트 티켓팅, 수강신청에서 0.1초 차이로 실패하셨나요? 서버 시간을 미리 확인하면 성공 확률이 크게 높아집니다.</p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ 서버 시간 체크</p>
                            <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg mt-4">시간 확인하기 →</a>
                        </div>

                        <h2>4. 로또 번호 생성기 - 행운을 찾아서</h2>
                        <p>매주 로또 번호 고르는데 시간 쓰지 마세요. 랜덤 생성으로 1초 만에 끝!</p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 로또 번호 생성</p>
                            <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg mt-4">번호 뽑기 →</a>
                        </div>

                        <h2>5. Base64 인코더/디코더 - 데이터 변환 1초 완성</h2>
                        <p>이미지를 텍스트로 변환하거나, API 인증 키를 인코딩할 때 필수입니다.</p>

                        <h2>생산성 도구 활용 체크리스트</h2>
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="mt-0">매일 체크:</h3>
                            <ul className="list-none pl-0">
                                <li>☑️ 글 쓸 때는 글자 수 세기 도구 켜두기</li>
                                <li>☑️ API 응답은 JSON 포맷터로 확인</li>
                                <li>☑️ 티켓팅 전 서버 시간 미리 체크</li>
                            </ul>
                        </div>

                        <h2>마무리: 도구는 도구일 뿐</h2>
                        <p>아무리 좋은 도구가 있어도 <strong>사용하지 않으면 소용없습니다</strong>. 오늘 소개한 도구 중 딱 하나만이라도 북마크해두고 실제로 써보세요. 한 달 후, 여러분의 생산성이 눈에 띄게 달라져 있을 것입니다.</p>
                        <p><strong>Cheetset</strong>이 여러분의 똑똑한 업무를 응원합니다! 💪</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Top 5 Online Tools to Double Your Productivity in 2025</h1>
                        <p className="lead">Wasting time on repetitive tasks? These free online tools can save you 2+ hours daily. Work smarter, not harder.</p>

                        <h2>1. Word Counter - Essential for Writers</h2>
                        <p>Writing resumes, blog posts, or social media content? Stop counting manually. Use a real-time word counter instead.</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ Word Counter Tool</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">Count Words →</a>
                        </div>

                        <h2>2. JSON Formatter - Developer's Best Friend</h2>
                        <p>Can't read that messy API response? Format JSON in 1 click. Validate, prettify, or minify for production.</p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🔧 JSON Formatter</p>
                            <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg mt-4">Format JSON →</a>
                        </div>

                        <h2>3. Server Time Checker - Win at Ticketing</h2>
                        <p>Missing concert tickets by milliseconds? Check server time before the sale starts. Timing is everything.</p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ Server Time Tool</p>
                            <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg mt-4">Check Time →</a>
                        </div>

                        <h2>Conclusion</h2>
                        <p>The best tools are useless if you don't use them. Bookmark at least one tool today and actually try it. Your future self will thank you. 💪</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>生産性を2倍にするオンラインツール活用法 TOP 5</h1>
                        <p className="lead">毎日繰り返される単純作業で時間を無駄にしていませんか？無料オンラインツールを活用するだけで1日2時間節約できます。今すぐ始めましょう！</p>

                        <h2>1. 文字数カウント - ES、ブログ必須</h2>
                        <p>ES作成、ブログ執筆、SNSコンテンツ制作...文字数制限はどこにでもあります。手で数えるのは非効率の極みです。</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ 文字数カウントツール</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">文字数を数える →</a>
                        </div>

                        <h2>2. JSONフォーマッター - 開発者必須ツール</h2>
                        <p>API応答データが一行にずらっと並んで読めませんか？JSONフォーマッターで1秒できれいに整理しましょう。</p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🔧 JSONフォーマッター</p>
                            <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg mt-4">JSON整形 →</a>
                        </div>

                        <h2>3. サーバー時間確認 - チケット予約成功率UP</h2>
                        <p>コンサートチケット、履修登録で0.1秒差で失敗しましたか？サーバー時間を事前に確認すれば成功確率が大きく上がります。</p>

                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ サーバー時間チェック</p>
                            <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg mt-4">時間確認 →</a>
                        </div>

                        <h2>まとめ</h2>
                        <p>どんなに良いツールでも<strong>使わなければ意味がありません</strong>。今日紹介したツールの中から一つだけでもブックマークして実際に使ってみてください。1ヶ月後、あなたの生産性が目に見えて変わっているはずです。</p>
                        <p><strong>Cheetset</strong>があなたのスマートな業務を応援します！💪</p>
                    </>
                )}
            </article>
        </div>
    );
}
