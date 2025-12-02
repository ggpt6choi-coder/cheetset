import React from 'react';

type Props = {
    lang: string;
};

export default function ResumeWordCount({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>자기소개서 글자 수 세기: 공백 포함 vs 미포함 완벽 가이드</h1>
                        <p className="lead">자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.</p>

                        <p>안녕하세요! 취업 준비생의 든든한 파트너 <strong>치트셋(Cheatset)</strong>입니다.</p>
                        <p>취업 준비의 첫 관문, 바로 <strong>자기소개서(자소서)</strong> 작성입니다. 밤새워 쓴 자소서를 제출하려는 순간, 마주하게 되는 난관이 하나 있죠. 바로 <strong>"글자 수 제한"</strong>입니다.</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r">
                            "공백 포함 1,000자 이내로 작성하시오."<br />
                            "공백 제외 2,000바이트(Byte) 내외."
                        </blockquote>
                        <p>기업마다, 채용 사이트(사람인, 잡코리아, 자소설닷컴 등)마다 요구하는 기준이 제각각이라 당황스러우셨던 적, 한 번쯤 있으실 겁니다. 도대체 '공백 포함'은 뭐고, '공백 미포함'은 무엇일까요? 그리고 이 작은 차이가 합격과 불합격을 가르는 중요한 열쇠가 될 수 있다는 사실, 알고 계셨나요?</p>
                        <p>오늘은 자소서 작성의 필수 상식인 <strong>글자 수 계산의 모든 것</strong>을 완벽하게 정리해 드리겠습니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. 공백 포함 vs 공백 미포함, 도대체 뭐가 다를까?</h2>
                        <p>가장 먼저 용어부터 확실히 짚고 넘어가겠습니다.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">1-1. 공백 포함 (With Spaces)</h3>
                        <p>말 그대로 <strong>띄어쓰기(스페이스바), 줄바꿈(엔터), 탭(Tab) 등 눈에 보이지 않는 공백까지 모두 글자 수로 치는 방식</strong>입니다.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">예시: "나는 합격한다"</p>
                            <ul className="list-disc pl-6 mt-2 text-sm">
                                <li>문자: '나', '는', '합', '격', '한', '다' (6자)</li>
                                <li>공백: 띄어쓰기 1회</li>
                                <li><strong>총 7자</strong></li>
                            </ul>
                        </div>
                        <p>대부분의 기업 채용 홈페이지나 '사람인', '잡코리아' 같은 대형 채용 플랫폼의 표준 이력서 양식은 보통 <strong>공백 포함</strong>을 기준으로 합니다.</p>

                        <h3 className="text-xl font-semibold mt-6 mb-2">1-2. 공백 미포함 (Without Spaces)</h3>
                        <p>띄어쓰기와 줄바꿈을 제외하고, <strong>오로지 순수한 문자의 개수만 세는 방식</strong>입니다.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">예시: "나는 합격한다"</p>
                            <ul className="list-disc pl-6 mt-2 text-sm">
                                <li>공백을 제외한 '나는합격한다'로 계산</li>
                                <li><strong>총 6자</strong></li>
                            </ul>
                        </div>
                        <p>일부 보수적인 공공기관이나 특정 논술 시험, 또는 순수하게 텍스트의 밀도를 보고자 할 때 이 기준을 사용하곤 합니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. 글자 수(Character) vs 바이트(Byte), 또 다른 함정</h2>
                        <p>글자 수만 맞추면 끝일까요? 아닙니다. <strong>바이트(Byte)</strong> 기준을 제시하는 곳도 있습니다. 여기서 많은 분들이 실수합니다.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>영문/숫자/공백:</strong> 1글자 = 1 Byte</li>
                            <li><strong>한글:</strong> 1글자 = 2 Byte (EUC-KR) 또는 3 Byte (UTF-8)</li>
                        </ul>
                        <p>최근 웹 환경은 대부분 UTF-8을 사용하므로 한글 한 글자가 3바이트를 차지하는 경우가 많습니다. 따라서 "2,000바이트 제한"이라면 한글로는 약 660자~1,000자 사이가 됩니다.</p>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
                            <p className="font-bold text-yellow-800 dark:text-yellow-200">⚠️ 주의사항</p>
                            <p>단순히 글자 수만 세지 말고, 지원하는 사이트가 어떤 인코딩 방식을 쓰는지 확인하거나 넉넉하게 작성하는 것이 안전합니다.</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. 자소서 분량, 왜 중요할까? (성실함의 척도)</h2>
                        <p>인사담당자는 수천 장의 자소서를 읽습니다. 그들에게 글자 수 제한은 <strong>"지원자가 얼마나 성실하게 가이드라인을 준수하는가"</strong>를 판단하는 첫 번째 기준입니다.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>너무 짧으면:</strong> 성의가 없어 보입니다. (최소 80% 이상 채우는 것을 권장)</li>
                            <li><strong>너무 길면:</strong> 요약 능력이 부족해 보입니다. (제한 글자 수를 절대 넘기지 마세요)</li>
                        </ul>
                        <p>가장 이상적인 분량은 제한 글자 수의 <strong>90% ~ 99%</strong> 사이입니다. 1,000자 제한이라면 900자에서 990자 사이로 맞추는 것이 '국룰'이죠.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. 복잡한 계산, 1초 만에 해결하는 방법</h2>
                        <p>자, 이제 이론은 알겠는데... 일일이 글자 수를 세고 있을 수는 없겠죠? 워드 프로세서나 한글 파일에서 작성하다 보면 프로그램마다 계산 방식이 조금씩 달라 혼란스러울 때가 많습니다.</p>
                        <p>이럴 때 필요한 것이 바로 정확한 <strong>글자 수 세기 도구</strong>입니다.</p>
                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">🚀 복잡한 계산은 치트셋(Cheatset)의 도구를 이용하면 1초 만에 해결됩니다.</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">공백 포함/미포함, 바이트 수까지 한눈에 확인하세요.</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">글자 수 세기 도구 바로가기</a>
                        </div>
                        <p>저희 <strong>Cheatset 글자 수 계산기</strong>는 다음과 같은 기능을 제공합니다:</p>
                        <ol className="list-decimal pl-6 mb-4">
                            <li><strong>실시간 계산:</strong> 타이핑하는 즉시 공백 포함/미포함 글자 수를 보여줍니다.</li>
                            <li><strong>다국어 지원:</strong> 한글뿐만 아니라 영어(단어 수), 일본어 글자 수까지 완벽하게 지원합니다.</li>
                            <li><strong>안전한 보안:</strong> 입력한 텍스트는 서버에 저장되지 않고 브라우저에서만 처리되므로, 소중한 자소서가 유출될 걱정이 없습니다.</li>
                        </ol>

                        <h2 className="text-2xl font-bold mt-8 mb-4">5. 자소서 분량 조절 꿀팁 (늘리기 vs 줄이기)</h2>
                        <p>마지막으로, 글자 수가 애매하게 모자라거나 넘칠 때 사용할 수 있는 실전 팁을 드립니다.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">글자 수가 모자랄 때 (늘리기)</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>구체적인 예시 추가:</strong> "열심히 했습니다" 대신 "매주 2회 스터디를 주도하며..." 처럼 구체적인 수치와 행동을 넣으세요.</li>
                            <li><strong>접속사 활용:</strong> 문장 간의 연결을 매끄럽게 해주는 접속사를 적절히 사용하면 가독성도 좋아지고 분량도 늘어납니다.</li>
                            <li><strong>감정과 깨달음:</strong> 경험 단순 나열이 아니라, 그 과정에서 느낀 점과 배운 점을 한 문장씩 더해보세요.</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-6 mb-2">글자 수가 넘칠 때 (줄이기)</h3>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>중복 표현 삭제:</strong> "역전앞"처럼 의미가 중복되는 단어를 찾으세요. (예: "생각되어집니다" &rarr; "생각합니다")</li>
                            <li><strong>부사 제거:</strong> '매우', '정말', '진짜' 같은 수식어만 빼도 글이 훨씬 담백해집니다.</li>
                            <li><strong>문장 쪼개기:</strong> 만연체는 가독성의 적입니다. 긴 문장을 두 개로 나누고 불필요한 조사를 생략하세요.</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                        <p>완벽한 자소서는 내용도 중요하지만, <strong>기본적인 형식을 지키는 것</strong>에서 시작합니다. 오늘 알려드린 공백 포함/미포함의 차이를 잘 기억하셔서, 인사담당자의 눈에 쏙 드는 깔끔한 자소서를 완성하시길 바랍니다.</p>
                        <p>여러분의 합격을 <strong>치트셋(Cheatset)</strong>이 진심으로 응원합니다!</p>
                    </>
                )}

                {lang === 'en' && (
                    <>
                        <h1>Resume Word Count: With Spaces vs Without Spaces Guide</h1>
                        <p className="lead">Confused about word counts in resumes? Learn the difference between "with spaces" and "without spaces" and get tips for optimizing your resume length.</p>

                        <p>Hello! This is <strong>Cheetset</strong>, your productivity partner.</p>
                        <p>When writing a resume or cover letter, one of the first hurdles you face is the <strong>"Word Count Limit"</strong>. You might have seen instructions like:</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r">
                            "Maximum 1,000 characters (including spaces)."<br />
                            "Around 2,000 bytes (excluding spaces)."
                        </blockquote>
                        <p>Different companies and platforms have different standards, which can be confusing. What exactly does "with spaces" mean? And why does this small difference matter for your application?</p>
                        <p>Today, we will clarify everything about <strong>Word and Character Counting</strong>.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. With Spaces vs Without Spaces</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">1-1. With Spaces</h3>
                        <p>This counts every character, including <strong>spaces, line breaks, and tabs</strong>.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">Example: "I am hired"</p>
                            <ul className="list-disc pl-6 mt-2 text-sm">
                                <li>Letters: 'I', 'a', 'm', 'h', 'i', 'r', 'e', 'd' (8 chars)</li>
                                <li>Spaces: 2</li>
                                <li><strong>Total 10 characters</strong></li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-2">1-2. Without Spaces</h3>
                        <p>This counts only the visible characters, excluding spaces and line breaks.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">Example: "I am hired"</p>
                            <ul className="list-disc pl-6 mt-2 text-sm">
                                <li>Only letters are counted</li>
                                <li><strong>Total 8 characters</strong></li>
                            </ul>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
                            <p className="font-semibold">💡 Key Point</p>
                            <p className="mt-2">The character count drops significantly when spaces are excluded. Make sure you check the requirements carefully!</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Characters vs Bytes</h2>
                        <p>Some systems use <strong>Bytes</strong> instead of character counts. This is common in legacy systems.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>English/Numbers/Spaces:</strong> 1 character = 1 Byte</li>
                            <li><strong>Korean/Chinese/Japanese:</strong> 1 character = 2 or 3 Bytes (depending on encoding)</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Why Length Matters</h2>
                        <p>Recruiters read thousands of resumes. Adhering to the length limit shows your <strong>attention to detail and sincerity</strong>.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Too short:</strong> Lacks effort. (Aim for at least 80%)</li>
                            <li><strong>Too long:</strong> Lacks summary skills. (Never exceed the limit)</li>
                        </ul>
                        <p>The ideal length is <strong>90% ~ 99%</strong> of the limit.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Solve it in 1 Second</h2>
                        <p>Counting manually is impossible. Different software calculates differently. You need an accurate <strong>Word Counter Tool</strong>.</p>
                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">🚀 Solve complex calculations instantly with Cheetset.</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">Check characters, words, and bytes instantly.</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">Go to Word Counter</a>
                        </div>
                        <p><strong>Cheetset Word Counter</strong> offers:</p>
                        <ol className="list-decimal pl-6 mb-4">
                            <li><strong>Real-time calculation:</strong> Counts as you type.</li>
                            <li><strong>Multilingual support:</strong> Supports English, Korean, and Japanese.</li>
                            <li><strong>Secure:</strong> Text is processed in your browser, never sent to a server.</li>
                        </ol>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                        <p>A perfect resume starts with following the basic format. We hope this guide helps you craft a clean, professional resume.</p>
                        <p><strong>Cheetset</strong> cheers for your success!</p>
                    </>
                )}

                {lang === 'ja' && (
                    <>
                        <h1>履歴書の文字数カウント完全ガイド：空白あり・なしの違い</h1>
                        <p className="lead">履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。</p>

                        <p>こんにちは！業務効率化をサポートする<strong>Cheetset（チートセット）</strong>です。</p>
                        <p>就職活動の最初の関門、<strong>履歴書・エントリーシート（ES）</strong>の作成。徹夜で書いた文章を提出しようとした瞬間、直面するのが<strong>「文字数制限」</strong>です。</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r">
                            「空白込みで1,000文字以内で作成してください。」<br />
                            「空白を除いて2,000バイト以内。」
                        </blockquote>
                        <p>企業や採用サイトによって基準が異なり、戸惑ったことはありませんか？「空白あり」と「空白なし」の違いは何でしょうか？この小さな違いが合否を分ける重要な鍵になることもあります。</p>
                        <p>今日は、履歴書作成の必須知識である<strong>文字数カウントのすべて</strong>を完全に整理します。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. 空白あり vs 空白なし、何が違う？</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">1-1. 空白あり (With Spaces)</h3>
                        <p>文字通り、<strong>スペースや改行など、目に見えない空白も含めて文字数として数える方式</strong>です。</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">例: "私は合格する"</p>
                            <ul className="list-disc pl-6 mt-2 text-sm">
                                <li>文字: 「私」「は」「合」「格」「す」「る」（6文字）</li>
                                <li>空白: スペースがあればカウント</li>
                                <li><strong>合計文字数</strong>として計算</li>
                            </ul>
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-2">1-2. 空白なし (Without Spaces)</h3>
                        <p>スペースや改行を除き、<strong>純粋な文字の数だけを数える方式</strong>です。</p>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
                            <p className="font-semibold">💡 ポイント</p>
                            <p className="mt-2">同じ文章量でも「空白なし」で計算すると文字数は減ります。企業の基準を間違えると、せっかく書いたESが分量不足になる可能性があります！</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. 文字数 vs バイト数</h2>
                        <p>文字数だけでなく、<strong>バイト(Byte)</strong>基準の場合もあります。</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>英数字/空白:</strong> 1文字 = 1 Byte</li>
                            <li><strong>日本語（全角）:</strong> 1文字 = 2 Byte（または3 Byte、エンコーディングによる）</li>
                        </ul>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. なぜ分量が重要なのか？</h2>
                        <p>採用担当者は何千枚ものESを読みます。文字数制限を守ることは、<strong>「応募者がどれだけ誠実にガイドラインを守っているか」</strong>を判断する最初の基準です。</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>短すぎる:</strong> 誠意がないと見なされます。（最低80%以上推奨）</li>
                            <li><strong>長すぎる:</strong> 要約能力が不足していると見なされます。（制限を超えないこと）</li>
                        </ul>
                        <p>理想的な分量は、制限文字数の<strong>90% ~ 99%</strong>です。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. 複雑な計算を1秒で解決する方法</h2>
                        <p>いちいち文字数を数えるのは不可能です。そこで必要なのが、正確な<strong>文字数カウントツール</strong>です。</p>
                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">🚀 複雑な計算はCheetsetのツールで1秒で解決。</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">空白あり・なし、バイト数まで一目で確認。</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">文字数カウントツールへ</a>
                        </div>
                        <p><strong>Cheetset文字数カウンター</strong>は以下の機能を提供します：</p>
                        <ol className="list-decimal pl-6 mb-4">
                            <li><strong>リアルタイム計算:</strong> 入力と同時に計算します。</li>
                            <li><strong>多言語対応:</strong> 日本語、英語、韓国語に対応。</li>
                            <li><strong>安全なセキュリティ:</strong> テキストはブラウザ内でのみ処理され、サーバーには送信されません。</li>
                        </ol>

                        <h2 className="text-2xl font-bold mt-8 mb-4">まとめ</h2>
                        <p>完璧な履歴書は、基本的な形式を守ることから始まります。今日お伝えした違いを覚えて、採用担当者の目に留まるきれいな履歴書を完成させてください。</p>
                        <p>皆さんの合格を<strong>Cheetset</strong>が心から応援します！</p>
                    </>
                )}
            </article>
        </div>
    );
}
