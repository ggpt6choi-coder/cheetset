import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    let title = `${dict.nav.blog}`;
    let description = dict.common.description;

    if (slug === 'resume-word-count') {
        if (lang === 'ko') {
            title = "자기소개서 글자 수 세기: 공백 포함 vs 미포함 차이점 완벽 정리";
            description = "자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.";
        } else if (lang === 'en') {
            title = "Resume Word Count: With Spaces vs Without Spaces";
            description = "Confused about word counts in resumes? Learn the difference between \"with spaces\" and \"without spaces\" and get tips for optimizing your resume length.";
        } else if (lang === 'ja') {
            title = "履歴書の文字数カウント：空白あり vs 空白なし 完全ガイド";
            description = "履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。";
        }
    }

    return {
        title: `${title} - ${dict.common.title}`,
        description: description,
        openGraph: {
            title: `${title} - ${dict.common.title}`,
            description: description,
            type: 'article',
            url: `https://cheetset.com/${lang}/blog/${slug}`,
            images: [
                {
                    url: '/og-image.png',
                    width: 1200,
                    height: 630,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} - ${dict.common.title}`,
            description: description,
            images: ['/og-image.png'],
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang as Locale);

    if (slug !== 'resume-word-count') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>자기소개서 글자 수 세기: 공백 포함 vs 미포함 차이점 완벽 정리</h1>
                        <p className="lead">자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.</p>
                        <p>안녕하세요! 업무 효율을 높여주는 <strong>치트셋(Cheatset)</strong>입니다.</p>
                        <p>취업 준비의 첫 관문, 바로 <strong>자기소개서(자소서)</strong> 작성입니다. 밤새워 쓴 자소서를 제출하려는 순간, 마주하게 되는 난관이 하나 있죠. 바로 <strong>"글자 수 제한"</strong>입니다.</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                            "공백 포함 1,000자 이내로 작성하시오."<br />
                            "공백 제외 2,000바이트(Byte) 내외."
                        </blockquote>
                        <p>기업마다, 채용 사이트마다 요구하는 기준이 제각각이라 당황스러우셨던 적, 한 번쯤 있으실 겁니다. 도대체 &apos;공백 포함&apos;은 뭐고, &apos;공백 미포함&apos;은 무엇일까요? 그리고 이 작은 차이가 합격과 불합격을 가르는 중요한 열쇠가 될 수 있다는 사실, 알고 계셨나요?</p>
                        <p>오늘은 자소서 작성의 필수 상식인 <strong>글자 수 계산의 모든 것</strong>을 완벽하게 정리해 드리겠습니다.</p>
                        <h2 className="text-2xl font-bold mt-8 mb-4">1. 공백 포함 vs 공백 미포함, 도대체 뭐가 다를까?</h2>
                        <p>가장 먼저 용어부터 확실히 짚고 넘어가겠습니다.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">공백 포함 (With Spaces)</h3>
                        <p>말 그대로 <strong>띄어쓰기(스페이스바), 줄바꿈(엔터) 등 눈에 보이지 않는 공백까지 모두 글자 수로 치는 방식</strong>입니다.<br />예를 들어, "나는 합격한다"라는 문장을 볼까요?</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>&apos;나&apos;, &apos;는&apos;, &apos;합&apos;, &apos;격&apos;, &apos;한&apos;, &apos;다&apos; (6글자)</li>
                            <li>띄어쓰기 1회</li>
                            <li><strong>총 7글자</strong>로 계산됩니다.</li>
                        </ul>
                        <p>대부분의 기업 채용 홈페이지나 &apos;사람인&apos;, &apos;잡코리아&apos; 같은 대형 채용 플랫폼의 표준 이력서 양식은 보통 <strong>공백 포함</strong>을 기준으로 합니다.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">공백 미포함 (Without Spaces)</h3>
                        <p>띄어쓰기와 줄바꿈을 제외하고, <strong>오로지 순수한 문자의 개수만 세는 방식</strong>입니다.<br />앞선 예시 "나는 합격한다"의 경우,</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>띄어쓰기를 뺀 &apos;나는합격한다&apos;로 간주하여 <strong>총 6글자</strong>가 됩니다.</li>
                        </ul>
                        <p>일부 보수적인 공공기관이나 특정 논술 시험, 또는 순수하게 텍스트의 밀도를 보고자 할 때 이 기준을 사용하곤 합니다.</p>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
                            <p className="font-semibold">💡 핵심 포인트</p>
                            <p className="mt-2">같은 분량의 글이라도 &apos;공백 미포함&apos;으로 계산하면 글자 수가 확 줄어듭니다. 따라서 기업이 요구하는 기준을 잘못 알면, 열심히 쓴 자소서가 분량 미달로 광탈할 수도 있습니다!</p>
                        </div>
                        <h2 className="text-2xl font-bold mt-8 mb-4">2. 글자 수(Character) vs 바이트(Byte), 또 다른 함정</h2>
                        <p>글자 수만 맞추면 끝일까요? 아닙니다. <strong>바이트(Byte)</strong> 기준을 제시하는 곳도 있습니다.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>영문/숫자/공백:</strong> 1글자 = 1 Byte</li>
                            <li><strong>한글:</strong> 1글자 = 2 Byte (또는 3 Byte, 인코딩 방식에 따라 다름)</li>
                        </ul>
                        <p>보통 한글 1,000자라고 하면 약 2,000바이트 정도가 됩니다. 하지만 시스템에 따라 한글을 3바이트로 계산하는 경우도 있으니, 단순히 글자 수만 세지 말고 바이트 용량도 함께 체크해야 안전합니다.</p>
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
                            <a href={`/${lang}/tools/word-counter`} className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium">글자 수 세기 도구 바로가기</a>
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
                            <li><strong>부사 제거:</strong> &apos;매우&apos;, &apos;정말&apos;, &apos;진짜&apos; 같은 수식어만 빼도 글이 훨씬 담백해집니다.</li>
                            <li><strong>문장 쪼개기:</strong> 만연체는 가독성의 적입니다. 긴 문장을 두 개로 나누고 불필요한 조사를 생략하세요.</li>
                        </ul>
                        <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                        <p>완벽한 자소서는 내용도 중요하지만, <strong>기본적인 형식을 지키는 것</strong>에서 시작합니다. 오늘 알려드린 공백 포함/미포함의 차이를 잘 기억하셔서, 인사담당자의 눈에 쏙 드는 깔끔한 자소서를 완성하시길 바랍니다.</p>
                        <p>여러분의 합격을 <strong>치트셋(Cheatset)</strong>이 진심으로 응원합니다!</p>
                        <hr className="my-8 border-gray-200 dark:border-gray-700" />
                        <p className="text-sm text-gray-500 italic text-center">이 글이 도움이 되셨다면, 주변 취준생 친구들에게 <strong>Cheatset</strong>을 공유해 주세요!</p>
                    </>
                )}

                {lang === 'en' && (
                    <>
                        <h1>Resume Word Count: With Spaces vs Without Spaces</h1>
                        <p className="lead">Confused about word counts in resumes? Learn the difference between "with spaces" and "without spaces" and get tips for optimizing your resume length.</p>
                        <p>Hello! This is <strong>Cheetset</strong>, your productivity partner.</p>
                        <p>When writing a resume or cover letter, one of the first hurdles you face is the <strong>"Word Count Limit"</strong>. You might have seen instructions like:</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                            "Maximum 1,000 characters (including spaces)."<br />
                            "Around 2,000 bytes (excluding spaces)."
                        </blockquote>
                        <p>Different companies and platforms have different standards, which can be confusing. What exactly does "with spaces" mean? And why does this small difference matter for your application?</p>
                        <p>Today, we will clarify everything about <strong>Word and Character Counting</strong>.</p>
                        <h2 className="text-2xl font-bold mt-8 mb-4">1. With Spaces vs Without Spaces</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">With Spaces</h3>
                        <p>This counts every character, including <strong>spaces and line breaks</strong>.<br />For example, in the sentence "I am hired":</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>'I', 'a', 'm', 'h', 'i', 'r', 'e', 'd' (8 letters)</li>
                            <li>2 spaces</li>
                            <li><strong>Total 10 characters</strong>.</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-6 mb-2">Without Spaces</h3>
                        <p>This counts only the visible characters, excluding spaces and line breaks.<br />For "I am hired":</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>Only the letters are counted, so <strong>Total 8 characters</strong>.</li>
                        </ul>
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg my-6">
                            <p className="font-semibold">💡 Key Point</p>
                            <p className="mt-2">The character count drops significantly when spaces are excluded. Make sure you check the requirements carefully!</p>
                        </div>
                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Characters vs Bytes</h2>
                        <p>Some systems use <strong>Bytes</strong> instead of character counts.</p>
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
                            <a href={`/${lang}/tools/word-counter`} className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium">Go to Word Counter</a>
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
                        <hr className="my-8 border-gray-200 dark:border-gray-700" />
                        <p className="text-sm text-gray-500 italic text-center">If this helped, please share <strong>Cheetset</strong> with your friends!</p>
                    </>
                )}

                {lang === 'ja' && (
                    <>
                        <h1>履歴書の文字数カウント：空白あり vs 空白なし 完全ガイド</h1>
                        <p className="lead">履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。</p>
                        <p>こんにちは！業務効率化をサポートする<strong>Cheetset（チートセット）</strong>です。</p>
                        <p>就職活動の最初の関門、<strong>履歴書・エントリーシート（ES）</strong>の作成。徹夜で書いた文章を提出しようとした瞬間、直面するのが<strong>「文字数制限」</strong>です。</p>
                        <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
                            「空白込みで1,000文字以内で作成してください。」<br />
                            「空白を除いて2,000バイト以内。」
                        </blockquote>
                        <p>企業や採用サイトによって基準が異なり、戸惑ったことはありませんか？「空白あり」と「空白なし」の違いは何でしょうか？この小さな違いが合否を分ける重要な鍵になることもあります。</p>
                        <p>今日は、履歴書作成の必須知識である<strong>文字数カウントのすべて</strong>を完全に整理します。</p>
                        <h2 className="text-2xl font-bold mt-8 mb-4">1. 空白あり vs 空白なし、何が違う？</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">空白あり (With Spaces)</h3>
                        <p>文字通り、<strong>スペースや改行など、目に見えない空白も含めて文字数として数える方式</strong>です。<br />例えば、「私は合格する」という文章を見てみましょう。</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li>「私」「は」「合」「格」「す」「る」（6文字）</li>
                            <li>もしスペースがあればそれもカウント</li>
                            <li><strong>合計文字数</strong>として計算されます。</li>
                        </ul>
                        <h3 className="text-xl font-semibold mt-6 mb-2">空白なし (Without Spaces)</h3>
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
                            <a href={`/${lang}/tools/word-counter`} className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-medium">文字数カウントツールへ</a>
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
                        <hr className="my-8 border-gray-200 dark:border-gray-700" />
                        <p className="text-sm text-gray-500 italic text-center">この記事が役に立ったら、周りの就活生の友達に<strong>Cheetset</strong>をシェアしてください！</p>
                    </>
                )}
            </article>
        </div>
    );
}
