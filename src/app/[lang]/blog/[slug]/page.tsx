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
    } else if (slug === 'json-formatting-guide') {
        if (lang === 'ko') {
            title = "개발자에게 JSON 포맷팅이 필수적인 이유";
            description = "JSON 데이터가 왜 엉망으로 보일까요? 디버깅과 협업을 위해 필수적인 JSON 포맷팅(Pretty Print)의 중요성과 압축(Minify)의 개념을 완벽하게 정리해 드립니다.";
        } else if (lang === 'en') {
            title = "Why JSON Formatting is Essential for Developers";
            description = "Learn why proper JSON formatting is crucial for debugging, readability, and collaboration. We explain minification, pretty-printing, and how to use our JSON Formatter.";
        } else if (lang === 'ja') {
            title = "開発者にとってJSONフォーマットが不可欠な理由";
            description = "なぜJSONデータは読みづらいのでしょうか？デバッグや共同作業に不可欠なJSON整形（Pretty Print）の重要性と、圧縮（Minify）の概念を完全に解説します。";
        }
    } else if (slug === 'character-encoding-guide') {
        if (lang === 'ko') {
            title = "문자 인코딩의 이해: UTF-8 vs ASCII 완벽 정리";
            description = "왜 한글이 깨져서 나올까요? 개발자가 반드시 알아야 할 아스키(ASCII) 코드와 유니코드(UTF-8)의 차이점, 그리고 뷇뛟 같은 글자가 생기는 이유를 설명합니다.";
        } else if (lang === 'en') {
            title = "Understanding Character Encodings: UTF-8 vs ASCII";
            description = "Why do broken characters (Mojibake) appear? We explain the fundamental differences between ASCII, UTF-8, and Unicode for developers.";
        } else if (lang === 'ja') {
            title = "文字コードの理解：UTF-8 vs ASCII 完全ガイド";
            description = "なぜ文字化けが発生するのでしょうか？開発者が知っておくべきASCIIコードとUnicode（UTF-8）の違い、そして文字化けの原因を解説します。";
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

    if (slug !== 'resume-word-count' && slug !== 'json-formatting-guide' && slug !== 'character-encoding-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center">
                <h1 className="text-2xl font-bold">Post not found</h1>
            </div>
        );
    }

    if (slug === 'json-formatting-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>개발자 필독! JSON 포맷팅이 필요한 이유와 완벽 가이드</h1>
                            <p className="lead">JSON 데이터가 왜 엉망으로 보일까요? 디버깅과 협업을 위해 필수적인 JSON 포맷팅(Pretty Print)의 중요성과 압축(Minify)의 개념, 그리고 자주 발생하는 문법 오류까지 완벽하게 정리해 드립니다.</p>

                            <p>안녕하세요! 개발자의 생산성을 책임지는 <strong>치트셋(Cheatset)</strong>입니다.</p>
                            <p>웹 개발을 하거나 API를 연동하다 보면 하루에도 수십 번씩 마주치는 것이 있습니다. 바로 <strong>JSON(JavaScript Object Notation)</strong>입니다.</p>
                            <p>하지만 서버에서 받은 로그를 열어보면, 수많은 중괄호 <code>&#123; &#125;</code>와 대괄호 <code>[ ]</code>가 뒤섞인 채 한 줄로 쭉 이어져 있어 도저히 읽을 수가 없는 경우가 많습니다. 오늘은 이 골치 아픈 JSON을 왜 포맷팅해야 하는지, 그리고 어떻게 하면 효율적으로 다룰 수 있는지 깊이 있게 알아보겠습니다.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. JSON이란 무엇인가?</h2>
                            <p><strong>JSON</strong>은 "JavaScript Object Notation"의 약자로, 데이터를 저장하거나 전송할 때 사용하는 <strong>경량의 데이터 교환 형식</strong>입니다.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>사람이 읽기 쉽고(Human-readable):</strong> 텍스트 기반이라 눈으로 보고 이해할 수 있습니다.</li>
                                <li><strong>기계가 분석하기 쉽고(Machine-readable):</strong> 파싱(Parsing)이 빠르고 간편합니다.</li>
                                <li><strong>언어 독립적:</strong> 자바스크립트에서 파생되었지만, Python, Java, C# 등 거의 모든 프로그래밍 언어에서 지원합니다.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. 왜 JSON은 한 줄로 나올까? (Minify의 비밀)</h2>
                            <p>여러분이 API 응답으로 받는 '못생긴' JSON은 사실 의도된 것입니다. 이를 <strong>Minify(압축)</strong>라고 합니다.</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm break-all">
                                    &#123;"name":"Cheetset","type":"Tool","features":["Formatter","Counter"]&#125;
                                </p>
                            </div>
                            <p>이렇게 공백과 줄바꿈을 모두 제거하는 이유는 다음과 같습니다:</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>전송 속도 향상:</strong> 불필요한 공백을 없애 파일 크기를 줄이면 네트워크 전송 속도가 빨라집니다.</li>
                                <li><strong>비용 절감:</strong> 클라우드 서버의 트래픽 비용(Data Transfer Cost)을 아낄 수 있습니다.</li>
                            </ul>
                            <p>컴퓨터에게는 이 방식이 효율적이지만, 사람에게는 가독성이 '제로'에 가깝다는 치명적인 단점이 있죠.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. Pretty Print(포맷팅)가 필요한 순간</h2>
                            <p>개발 과정에서는 데이터를 눈으로 확인해야 할 일이 많습니다. 이때 필요한 것이 바로 <strong>Pretty Print(예쁘게 출력하기)</strong>, 즉 포맷팅입니다.</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-1. 디버깅 효율 극대화</h3>
                            <p>복잡한 중첩 객체(Nested Object) 구조를 파악하려면 들여쓰기(Indentation)가 필수입니다. 포맷팅이 안 된 JSON은 어디가 배열의 시작이고 어디가 끝인지 알기 어렵습니다.</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-2. 문법 오류 발견</h3>
                            <p>JSON은 문법이 매우 엄격합니다. 쉼표(,) 하나만 빠져도 전체가 깨집니다.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Trailing Comma 불가:</strong> 배열이나 객체의 마지막 요소 뒤에 쉼표가 있으면 안 됩니다.</li>
                                <li><strong>Key는 반드시 큰따옴표:</strong> <code>&#123; name: "value" &#125;</code>는 틀린 문법입니다. <code>&#123; "name": "value" &#125;</code>여야 합니다.</li>
                            </ul>
                            <p>포맷팅 도구를 사용하면 이런 오류를 즉시 시각적으로 확인할 수 있습니다.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. 1초 만에 JSON 정리하는 법</h2>
                            <p>매번 텍스트 에디터에서 수동으로 줄바꿈을 할 수는 없습니다. <strong>치트셋 JSON 포맷터</strong>를 사용하세요.</p>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🚀 복잡한 JSON도 클릭 한 번으로 깔끔하게!</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">검증(Validation)부터 정렬(Formatting)까지 한 번에 해결하세요.</p>
                                <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">JSON 포맷터 바로가기</a>
                            </div>
                            <p>저희 도구는 다음과 같은 강력한 기능을 제공합니다:</p>
                            <ol className="list-decimal pl-6 mb-4">
                                <li><strong>자동 정렬:</strong> 2칸 또는 4칸 들여쓰기를 적용해 가독성을 높여줍니다.</li>
                                <li><strong>실시간 오류 검사:</strong> 유효하지 않은 JSON이라면 몇 번째 줄에서 오류가 났는지 알려줍니다.</li>
                                <li><strong>Minify 기능:</strong> 반대로 공백을 제거하여 배포용 데이터로 만들 수도 있습니다.</li>
                                <li><strong>보안:</strong> 서버로 데이터를 전송하지 않고 브라우저에서만 처리하므로 민감한 정보도 안심하고 사용할 수 있습니다.</li>
                            </ol>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. 자주 묻는 질문 (FAQ)</h2>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. JSON과 XML의 차이점은 무엇인가요?</summary>
                                <p className="mt-2 text-sm">A. XML은 태그 기반이라 무겁고 복잡한 반면, JSON은 훨씬 간결하고 가볍습니다. 최근 웹 API는 대부분 JSON을 선호합니다.</p>
                            </details>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. 주석(Comment)을 넣을 수 있나요?</summary>
                                <p className="mt-2 text-sm">A. 아니요, 표준 JSON은 주석을 지원하지 않습니다. 주석이 필요하다면 JSON5 같은 확장을 사용해야 합니다.</p>
                            </details>

                            <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                            <p>잘 정리된 코드가 버그를 줄이듯, 잘 정리된 데이터는 개발 시간을 획기적으로 단축시켜 줍니다. 이제 <strong>치트셋</strong>과 함께 쾌적한 개발 환경을 만들어보세요!</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>The Ultimate Guide to JSON Formatting for Developers</h1>
                            <p className="lead">Why does JSON look so messy? Learn why proper JSON formatting (Pretty Print) is crucial for debugging, readability, and collaboration. We explain minification, syntax errors, and how to use our tool.</p>

                            <p>Hello! This is <strong>Cheetset</strong>.</p>
                            <p>If you are a web developer, you probably deal with <strong>JSON (JavaScript Object Notation)</strong> every single day. It is the universal language of the web.</p>
                            <p>However, raw JSON data from APIs often looks like a chaotic wall of text. It's full of curly braces <code>&#123; &#125;</code> and brackets <code>[ ]</code>, making it impossible to read. Today, we will explore why formatting is essential and how to master it.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. What is JSON?</h2>
                            <p><strong>JSON</strong> stands for "JavaScript Object Notation". It is a lightweight format for storing and transporting data.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Human-readable:</strong> It uses text, so we can read it.</li>
                                <li><strong>Machine-readable:</strong> Computers can parse it instantly.</li>
                                <li><strong>Language Independent:</strong> Supported by Python, Java, C#, PHP, and more.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. Why is JSON Minified?</h2>
                            <p>The messy JSON you see is often <strong>Minified</strong> on purpose.</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm break-all">
                                    &#123;"name":"Cheetset","type":"Tool","features":["Formatter","Counter"]&#125;
                                </p>
                            </div>
                            <p>Why remove all spaces and newlines?</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Performance:</strong> Smaller file size means faster download speeds.</li>
                                <li><strong>Cost:</strong> Reduces bandwidth usage and server costs.</li>
                            </ul>
                            <p>It is great for machines, but terrible for human eyes.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. The Power of Pretty Print</h2>
                            <p><strong>Pretty Printing</strong> is the process of adding indentation and newlines to make JSON readable.</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-1. Debugging Made Easy</h3>
                            <p>When you have a nested object 5 levels deep, you need indentation to understand the structure. Formatting helps you visualize the data hierarchy instantly.</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-2. Catching Syntax Errors</h3>
                            <p>JSON is very strict. A single missing comma can break your app.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>No Trailing Commas:</strong> <code>[1, 2, 3,]</code> is invalid.</li>
                                <li><strong>Quotes are Mandatory:</strong> Keys must be wrapped in double quotes <code>""</code>.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. Format JSON Instantly with Cheetset</h2>
                            <p>Don&apos;t waste time formatting manually. Use the <strong>Cheetset JSON Formatter</strong>.</p>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🚀 Clean up your JSON in one click!</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">Validate, Format, and Minify instantly.</p>
                                <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">Go to JSON Formatter</a>
                            </div>
                            <p>Our tool offers:</p>
                            <ol className="list-decimal pl-6 mb-4">
                                <li><strong>Auto-Indentation:</strong> Makes your data look clean and structured.</li>
                                <li><strong>Error Detection:</strong> Highlights exactly where your syntax error is.</li>
                                <li><strong>Secure:</strong> All processing happens in your browser. No data is sent to our servers.</li>
                            </ol>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. FAQ</h2>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. JSON vs XML?</summary>
                                <p className="mt-2 text-sm">A. JSON is lighter, faster, and easier to parse than XML. That's why modern APIs prefer JSON.</p>
                            </details>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. Can I use comments in JSON?</summary>
                                <p className="mt-2 text-sm">A. No, standard JSON does not support comments. You need to use JSON5 for that.</p>
                            </details>

                            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                            <p>Clean data saves time. Boost your productivity with <strong>Cheetset</strong>!</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>開発者必見！JSONフォーマットの重要性と完全ガイド</h1>
                            <p className="lead">なぜJSONデータは読みづらいのでしょうか？デバッグや共同作業に不可欠なJSON整形（Pretty Print）の重要性と、圧縮（Minify）の概念、そしてよくある構文エラーまで完全に解説します。</p>

                            <p>こんにちは！<strong>Cheetset</strong>です。</p>
                            <p>Web開発やAPI連携を行っていると、毎日必ず目にするものがあります。それが<strong>JSON (JavaScript Object Notation)</strong>です。</p>
                            <p>しかし、サーバーから返ってきたログを見ると、中括弧 <code>&#123; &#125;</code> や大括弧 <code>[ ]</code> が入り混じった長い文字列になっていて、解読不能なことがよくあります。今日は、なぜJSONをフォーマットする必要があるのか、そしてどうすれば効率的に扱えるのかを詳しく解説します。</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. JSONとは何か？</h2>
                            <p><strong>JSON</strong>は、データを保存したり転送したりするための<strong>軽量なデータ交換フォーマット</strong>です。</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>人間が読みやすい:</strong> テキストベースなので、目で見て理解できます。</li>
                                <li><strong>機械が解析しやすい:</strong> パース（解析）が高速で簡単です。</li>
                                <li><strong>言語に依存しない:</strong> JavaScriptから派生しましたが、Python、Java、C#など、ほぼすべての言語でサポートされています。</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. なぜJSONは圧縮（Minify）されるのか？</h2>
                            <p>皆さんが見る「汚い」JSONは、実は意図的に<strong>Minify（圧縮）</strong>されています。</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm break-all">
                                    &#123;"name":"Cheetset","type":"Tool","features":["Formatter","Counter"]&#125;
                                </p>
                            </div>
                            <p>空白や改行を削除する理由は以下の通りです：</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>速度向上:</strong> ファイルサイズを小さくして、転送速度を上げます。</li>
                                <li><strong>コスト削減:</strong> サーバーのデータ転送量を減らし、コストを節約します。</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. 整形（Pretty Print）が必要な瞬間</h2>
                            <p>開発中はデータを目視で確認する必要があります。そこで必要なのが<strong>Pretty Print（きれいに表示）</strong>、つまりフォーマットです。</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-1. デバッグ効率の最大化</h3>
                            <p>複雑な入れ子構造（Nested Object）を理解するには、インデントが必須です。</p>
                            <h3 className="text-xl font-semibold mt-6 mb-2">3-2. 構文エラーの発見</h3>
                            <p>JSONの文法は非常に厳格です。</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>末尾のカンマ禁止:</strong> 配列やオブジェクトの最後の要素の後ろにカンマをつけてはいけません。</li>
                                <li><strong>キーはダブルクォート必須:</strong> <code>&#123; name: "value" &#125;</code> はエラーです。 <code>&#123; "name": "value" &#125;</code> が正解です。</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. 1秒でJSONを整理する方法</h2>
                            <p>手動で整形するのは時間の無駄です。<strong>Cheetset JSONフォーマットツール</strong>を使ってください。</p>
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">🚀 ワンクリックでJSONをきれいに！</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">検証から整形まで一発で解決。</p>
                                <a href={`/${lang}/tools/json-formatter`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">JSONフォーマッターへ</a>
                            </div>
                            <p>当サイトのツールの特徴：</p>
                            <ol className="list-decimal pl-6 mb-4">
                                <li><strong>自動整列:</strong> インデントを揃えて可読性を高めます。</li>
                                <li><strong>エラー検出:</strong> 構文エラーがあれば、その場所を正確に教えます。</li>
                                <li><strong>セキュリティ:</strong> データはブラウザ内でのみ処理され、サーバーには送信されません。</li>
                            </ol>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. よくある質問 (FAQ)</h2>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. JSONとXMLの違いは？</summary>
                                <p className="mt-2 text-sm">A. JSONはXMLより軽量でパースが簡単です。現代のWeb APIのほとんどがJSONを採用しています。</p>
                            </details>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. コメントは書けますか？</summary>
                                <p className="mt-2 text-sm">A. いいえ、標準のJSONはコメントをサポートしていません。必要な場合はJSON5などを使用してください。</p>
                            </details>

                            <h2 className="text-2xl font-bold mt-8 mb-4">まとめ</h2>
                            <p>きれいなデータは開発時間を短縮します。<strong>Cheetset</strong>で生産性を上げましょう！</p>
                        </>
                    )}
                </article>
            </div>
        );
    }

    if (slug === 'character-encoding-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>문자 인코딩의 이해: UTF-8 vs ASCII 완벽 정리</h1>
                            <p className="lead">왜 한글이 깨져서 나올까요? 개발자가 반드시 알아야 할 아스키(ASCII) 코드와 유니코드(UTF-8)의 차이점, 그리고 뷇뛟 같은 글자가 생기는 이유를 설명합니다.</p>
                            <p>안녕하세요! <strong>치트셋(Cheetset)</strong>입니다.</p>
                            <p>개발을 하다 보면 종종 <code></code> 같은 알 수 없는 문자가 나오거나, 한글이 <code>뷇뛟</code>처럼 깨져서 나오는 현상을 겪게 됩니다. 이를 <strong>모지바케(Mojibake)</strong>라고 부르는데요.</p>
                            <p>이 모든 문제는 컴퓨터가 문자를 숫자로 저장하는 방식, 즉 <strong>인코딩(Encoding)</strong>이 서로 다르기 때문에 발생합니다. 오늘은 개발자라면 반드시 알아야 할 문자 인코딩의 세계를 깊이 파헤쳐 보겠습니다.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. ASCII: 컴퓨터 언어의 시초</h2>
                            <p>컴퓨터 초창기에는 영미권에서만 컴퓨터를 썼기 때문에, 알파벳 대소문자, 숫자, 특수문자 등 총 128개의 문자만 있으면 충분했습니다. 이것이 바로 <strong>ASCII(아스키) 코드</strong>입니다.</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    'A' = 65 (0x41)<br />
                                    'a' = 97 (0x61)<br />
                                    '0' = 48 (0x30)
                                </p>
                            </div>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>특징:</strong> 7비트(bit)만 사용합니다. (1바이트가 채 안 됨)</li>
                                <li><strong>한계:</strong> 한글, 일본어, 한자 등은 표현할 수 없습니다.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. Unicode: 전 세계 모든 문자를 하나로</h2>
                            <p>인터넷이 전 세계로 퍼지면서, 각 나라마다 독자적인 인코딩 방식(한국의 EUC-KR, 일본의 Shift_JIS 등)을 쓰다 보니 호환성 문제가 심각했습니다. 그래서 나온 것이 <strong>유니코드(Unicode)</strong>입니다.</p>
                            <p>유니코드는 "전 세계 모든 문자에 고유한 번호를 부여하자"는 약속입니다. '가'는 U+AC00, 'A'는 U+0041 이런 식이죠. 하지만 유니코드는 '약속'일 뿐, 실제로 저장하는 방식은 여러 가지가 있습니다.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. UTF-8: 유니코드를 저장하는 가장 똑똑한 방법</h2>
                            <p>유니코드 번호를 컴퓨터 파일로 저장하는 방식 중 가장 널리 쓰이는 것이 <strong>UTF-8</strong>입니다.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>가변 길이:</strong> 영어는 1바이트(ASCII와 동일), 한글은 3바이트로 저장합니다. 용량을 효율적으로 아낄 수 있죠.</li>
                                <li><strong>호환성:</strong> ASCII 코드로 작성된 문서는 UTF-8로 읽어도 완벽하게 호환됩니다.</li>
                                <li><strong>표준:</strong> 현재 웹(Web) 세상의 98% 이상이 UTF-8을 사용합니다.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. 한글이 깨지는 이유 (EUC-KR vs UTF-8)</h2>
                            <p>오래된 한국 웹사이트는 <strong>EUC-KR</strong>(또는 CP949) 방식을 씁니다. 하지만 최신 웹 표준은 <strong>UTF-8</strong>입니다.</p>
                            <p>브라우저는 UTF-8로 해석하려고 하는데, 서버가 EUC-KR로 보내면 한글이 깨지게 됩니다. 반대로 EUC-KR로 저장된 파일을 UTF-8 편집기에서 열어도 깨집니다.</p>

                            <h3 className="text-xl font-semibold mt-6 mb-2">대표적인 깨짐 현상</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>뷇뛟...:</strong> UTF-8 문서를 EUC-KR로 읽었을 때</li>
                                <li><strong>...:</strong> EUC-KR 문서를 UTF-8로 읽었을 때</li>
                            </ul>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 해결 방법</p>
                                <p className="mt-2">1. HTML 파일의 <code>&lt;head&gt;</code> 태그 안에 아래 코드를 꼭 넣어주세요.</p>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded">&lt;meta charset="UTF-8"&gt;</code>
                                <p className="mt-4">2. VS Code 같은 에디터에서 파일을 저장할 때, 인코딩 형식이 'UTF-8'인지 확인하세요. (우측 하단 상태 표시줄에서 확인 가능)</p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. BOM(Byte Order Mark)이란?</h2>
                            <p>가끔 "UTF-8 with BOM"이라는 옵션을 볼 수 있습니다. BOM은 파일의 맨 앞에 "이 파일은 유니코드입니다"라고 알려주는 보이지 않는 표식(EF BB BF)을 넣는 것입니다.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Windows:</strong> 메모장 등에서는 BOM이 있어야 UTF-8임을 잘 인식합니다.</li>
                                <li><strong>Web/Linux:</strong> BOM이 있으면 PHP나 일부 스크립트에서 오류가 날 수 있습니다.</li>
                                <li><strong>결론:</strong> 웹 개발 시에는 <strong>"UTF-8 without BOM"</strong>을 사용하는 것이 국룰입니다.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                            <p>이제 인코딩 때문에 당황하지 마세요! 전 세계 표준인 <strong>UTF-8</strong>만 기억하면 대부분의 문제는 해결됩니다. 데이터베이스, HTML, 소스 코드 파일 모두 UTF-8로 통일하는 것이 정신 건강에 좋습니다.</p>
                            <p>더 궁금한 점이 있다면 언제든 <strong>치트셋</strong> 블로그를 찾아주세요!</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>Understanding Character Encodings: UTF-8 vs ASCII</h1>
                            <p className="lead">Why do broken characters (Mojibake) appear? We explain the fundamental differences between ASCII, UTF-8, and Unicode for developers.</p>
                            <p>Hello! This is <strong>Cheetset</strong>.</p>
                            <p>Have you ever seen weird characters like <code></code> or garbled text? This is called <strong>Mojibake</strong>.</p>
                            <p>This happens when the computer tries to read text using the wrong <strong>Encoding</strong>. Today, we'll dive deep into the world of character encodings.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. ASCII: The Beginning</h2>
                            <p>In the early days, computers only needed to support English. <strong>ASCII</strong> uses 7 bits to represent 128 characters (A-Z, 0-9, etc.).</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    'A' = 65 (0x41)<br />
                                    'a' = 97 (0x61)<br />
                                    '0' = 48 (0x30)
                                </p>
                            </div>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Pros:</strong> Very simple and small.</li>
                                <li><strong>Cons:</strong> Cannot represent non-English characters like Korean or Emoji.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. Unicode: One Standard for All</h2>
                            <p>To support all languages, <strong>Unicode</strong> was created. It assigns a unique number to every character in the world. For example, 'A' is U+0041.</p>
                            <p>However, Unicode is just a standard map, not the way it's stored on disk.</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. UTF-8: The King of Encodings</h2>
                            <p><strong>UTF-8</strong> is the most popular way to store Unicode text.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Variable Length:</strong> Uses 1 byte for English (same as ASCII) and 3-4 bytes for other languages.</li>
                                <li><strong>Efficiency:</strong> It saves space while supporting every language.</li>
                                <li><strong>Compatibility:</strong> It is backward compatible with ASCII.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. Why Mojibake Happens</h2>
                            <p>If you save a file as <strong>Windows-1252</strong> (or EUC-KR) and open it as <strong>UTF-8</strong>, the characters will not map correctly.</p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 How to Fix</p>
                                <p className="mt-2">1. Always include this in your HTML head:</p>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded">&lt;meta charset="UTF-8"&gt;</code>
                                <p className="mt-4">2. Ensure your text editor saves files in UTF-8 format.</p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. What is BOM?</h2>
                            <p><strong>BOM (Byte Order Mark)</strong> is a hidden character at the start of a file to indicate encoding.</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Recommendation:</strong> Use <strong>UTF-8 without BOM</strong> for web development to avoid unexpected errors in scripts.</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                            <p>Always use <strong>UTF-8</strong> for your web projects to ensure your text looks correct on every device! It's the global standard for a reason.</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>文字コードの理解：UTF-8 vs ASCII 完全ガイド</h1>
                            <p className="lead">なぜ文字化けが発生するのでしょうか？開発者が知っておくべきASCIIコードとUnicode（UTF-8）の違い、そして文字化けの原因を解説します。</p>
                            <p>こんにちは！<strong>Cheetset</strong>です。</p>
                            <p><code></code> のような謎の記号や、文字化け（Mojibake）に遭遇したことはありませんか？</p>
                            <p>これは、コンピュータが文字を読み取る際の<strong>エンコーディング（Encoding）</strong>が間違っているために発生します。今日は文字コードの世界を深く掘り下げてみましょう。</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">1. ASCII: コンピュータ言語の始まり</h2>
                            <p>初期のコンピュータは英語しか扱えませんでした。<strong>ASCII</strong>は7ビットを使用して128文字（A-Z、0-9など）を表現します。</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    'A' = 65 (0x41)<br />
                                    'a' = 97 (0x61)<br />
                                    '0' = 48 (0x30)
                                </p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4">2. Unicode: 世界中の文字を一つに</h2>
                            <p>すべての言語をサポートするために<strong>Unicode</strong>が作られました。世界中のすべての文字に固有の番号を割り当てます。例えば「あ」は U+3042 です。</p>

                            <h2 className="text-2xl font-bold mt-8 mb-4">3. UTF-8: エンコーディングの王様</h2>
                            <p><strong>UTF-8</strong>は、Unicodeを保存するための最も一般的な方法です。</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>可変長:</strong> 英語には1バイト（ASCIIと同じ）、日本語には3バイトを使用します。</li>
                                <li><strong>効率性:</strong> 容量を節約しながら、すべての言語をサポートします。</li>
                                <li><strong>互換性:</strong> ASCIIと完全な互換性があります。</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">4. 文字化けの原因（Shift_JIS vs UTF-8）</h2>
                            <p>日本の古いサイトでは<strong>Shift_JIS</strong>が使われていましたが、現代の標準は<strong>UTF-8</strong>です。これらが混在すると文字化けが発生します。</p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 解決策</p>
                                <p className="mt-2">1. HTMLのheadタグに以下を追加してください：</p>
                                <code className="block bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded">&lt;meta charset="UTF-8"&gt;</code>
                                <p className="mt-4">2. エディタでファイルを保存する際、エンコーディングがUTF-8であることを確認してください。</p>
                            </div>

                            <h2 className="text-2xl font-bold mt-8 mb-4">5. BOMとは？</h2>
                            <p><strong>BOM (Byte Order Mark)</strong>は、ファイルの先頭にある見えないマーカーです。</p>
                            <ul className="list-disc pl-6 mb-4">
                                <li>Web開発では、トラブルを避けるために<strong>「UTF-8 (BOMなし)」</strong>を使用するのが一般的です。</li>
                            </ul>

                            <h2 className="text-2xl font-bold mt-8 mb-4">まとめ</h2>
                            <p>Web開発では常に<strong>UTF-8</strong>を使用するようにしましょう！これが世界標準です。</p>
                        </>
                    )}
                </article>
            </div>
        );
    }

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
                            <p className="mt-2">단순히 글자 수만 세지 말고, 지원하는 사이트가 어떤 인코딩 방식을 쓰는지 확인하거나 넉넉하게 작성하는 것이 안전합니다.</p>
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
