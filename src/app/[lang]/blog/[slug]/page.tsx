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
    } else if (slug === 'server-time-ticketing-guide') {
        if (lang === 'ko') {
            title = "티켓팅 성공률을 높이는 서버 시간 확인 완벽 가이드";
            description = "콘서트 티켓팅에 번번이 실패하시나요? 인터파크, 멜론티켓, 예스24에서 성공하는 서버 시간 확인 방법과 티켓팅 꿀팁을 공개합니다.";
        } else if (lang === 'en') {
            title = "How to Check Server Time for Successful Ticket Purchases";
            description = "Missing out on concert tickets? Learn how to check server time accurately and increase your success rate for ticketing on Ticketmaster, StubHub, and more.";
        } else if (lang === 'ja') {
            title = "チケット予約成功率を高めるサーバー時間確認完全ガイド";
            description = "コンサートチケットの予約に失敗していませんか？チケットぴあ、イープラスで成功するサーバー時間確認方法とチケット予約のコツを公開します。";
        }
    } else if (slug === 'productivity-tools-guide') {
        if (lang === 'ko') {
            title = "생산성을 2배로 높이는 온라인 도구 활용법 TOP 5";
            description = "하루 업무 시간을 2시간 단축시키는 무료 온라인 도구들! 글자 수 세기부터 JSON 포맷팅까지, 스마트하게 일하는 방법을 알려드립니다.";
        } else if (lang === 'en') {
            title = "Top 5 Online Tools to Double Your Productivity in 2025";
            description = "Discover free online tools that will transform your workflow. From word counting to JSON formatting, learn how to work smarter, not harder.";
        } else if (lang === 'ja') {
            title = "生産性を2倍にするオンラインツール活用法 TOP 5";
            description = "1日の作業時間を2時間短縮する無料オンラインツール！文字数カウントからJSON整形まで、スマートに働く方法をお教えします。";
        }
    } else if (slug === 'base64-encoding-guide') {
        if (lang === 'ko') {
            title = "Base64 인코딩 완전 정복: 개발자를 위한 사용 가이드";
            description = "Base64 인코딩이 뭔가요? 왜 사용할까요? 이미지 데이터 전송부터 API 인증까지, Base64의 모든 것을 쉽게 설명합니다.";
        } else if (lang === 'en') {
            title = "Base64 Encoding Explained: A Complete Guide for Developers";
            description = "What is Base64 encoding and why do we need it? Learn how Base64 works, when to use it, and common use cases in web development.";
        } else if (lang === 'ja') {
            title = "Base64エンコーディング完全攻略：開発者のための使用ガイド";
            description = "Base64エンコーディングとは何ですか？なぜ使うのですか？画像データ転送からAPI認証まで、Base64のすべてを分かりやすく説明します。";
        }
    } else if (slug === 'lottery-winning-strategy') {
        if (lang === 'ko') {
            title = "로또 1등 당첨 확률 높이는 번호 선택 전략 완벽 가이드";
            description = "로또 당첨 확률을 높일 수 있을까요? 통계 데이터로 검증된 번호 선택 전략과 피해야 할 실수를 공개합니다.";
        } else if (lang === 'en') {
            title = "How to Increase Your Chances of Winning the Lottery: Number Selection Strategies";
            description = "Can you really increase lottery odds? Learn data-driven strategies for selecting winning numbers and common mistakes to avoid.";
        } else if (lang === 'ja') {
            title = "宝くじ1等当選確率を高める番号選択戦略完全ガイド";
            description = "宝くじの当選確率を上げることはできるのでしょうか？統計データで検証された番号選択戦略と避けるべきミスを公開します。";
        }
    } else if (slug === 'resume-writing-guide') {
        if (lang === 'ko') {
            title = "대기업 합격하는 자기소개서 작성법과 글자 수 최적화 전략";
            description = "대기업 인사담당자가 직접 알려주는 합격 자소서 비법! 글자 수 최적화부터 내용 구성까지 완벽 가이드.";
        } else if (lang === 'en') {
            title = "How to Write a Winning Resume That Gets You Hired at Top Companies";
            description = "Land your dream job with a perfect resume. Learn word count optimization, formatting tips, and what recruiters actually look for.";
        } else if (lang === 'ja') {
            title = "大手企業に合格する履歴書・ES作成法と文字数最適化戦略";
            description = "大手企業の人事担当者が教える合格ES秘訣！文字数最適化から内容構成まで完全ガイド。";
        }
    } else if (slug === 'online-shopping-tips') {
        if (lang === 'ko') {
            title = "2025년 온라인 쇼핑 최저가 찾는 법: 쿠팡, 네이버 가격 비교 꿀팁";
            description = "매번 바가지 쓰시나요? 쿠팡, 네이버쇼핑, SSG에서 최저가를 찾는 검증된 방법과 숨겨진 할인 혜택 공개!";
        } else if (lang === 'en') {
            title = "Best Online Shopping Tips 2025: How to Find Lowest Prices";
            description = "Save money on every purchase! Master price comparison strategies for Amazon, eBay, and other major shopping sites.";
        } else if (lang === 'ja') {
            title = "2025年オンラインショッピング最安値の探し方：楽天、Amazon価格比較テクニック";
            description = "毎回損していませんか？楽天、Amazon、Yahoo!ショッピングで最安値を見つける検証済み方法と隠れた割引特典公開！";
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

    const validSlugs = ['resume-word-count', 'json-formatting-guide', 'character-encoding-guide',
        'server-time-ticketing-guide', 'productivity-tools-guide', 'base64-encoding-guide',
        'lottery-winning-strategy', 'resume-writing-guide', 'online-shopping-tips', 'salary-calculator-guide-2025', 'stock-average-down-strategy'];

    if (!validSlugs.includes(slug)) {
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

    // Resume Word Count
    if (slug === 'resume-word-count') {
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

    // Server Time Ticketing Guide
    if (slug === 'server-time-ticketing-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>티켓팅 성공률을 높이는 서버 시간 확인 완벽 가이드</h1>
                            <p className="lead">콘서트 티켓팅, 수강신청, 한정판 구매... 0.1초 차이로 성공과 실패가 갈립니다. 서버 시간을 정확히 확인하는 방법과 티켓팅 성공 꿀팁을 지금 공개합니다.</p>

                            <h2>1. 왜 내 컴퓨터 시계로는 안 될까?</h2>
                            <p>티켓팅 사이트의 예매 시작 시간은 <strong>서버 기준</strong>으로 정해집니다. 그런데 우리가 보는 컴퓨터 시계, 핸드폰 시계는 서버 시계와 몇 초씩 차이가 날 수 있습니다.</p>
                            <p>예를 들어, 내 컴퓨터가 14시 00분 00초를 가리킬 때 서버는 이미 14시 00분 02초일 수 있습니다. 이 2초 동안 수천 명의 사람들이 이미 클릭을 완료했을 겁니다.</p>

                            <h2>2. 서버 시간 확인이 필수인 상황</h2>
                            <ul>
                                <li><strong>콘서트 티켓팅:</strong> 인터파크, 멜론티켓, 예스24 등</li>
                                <li><strong>수강신청:</strong> 대학교 수강신청 시스템</li>
                                <li><strong>한정판 제품:</strong> 나이키, 아디다스 스니커즈 발매</li>
                                <li><strong>선착순 이벤트:</strong> 쇼핑몰, 이벤트 응모</li>
                            </ul>

                            <h2>3. 서버 시간 확인하는 방법</h2>
                            <h3>3-1. 우리 도구 사용하기 (추천!)</h3>
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ CheatKey 서버 시간 확인 도구</p>
                                <p className="mb-4 text-sm text-indigo-600 dark:text-indigo-300">0.1초 단위로 정확한 서버 시간을 실시간으로 확인하세요!</p>
                                <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">서버 시간 확인하기 →</a>
                            </div>

                            <h3>3-2. 사용 방법</h3>
                            <ol>
                                <li>티켓팅 사이트 주소를 입력합니다 (예: www.interpark.com)</li>
                                <li>확인 버튼을 클릭하면 해당 사이트의 서버 시간이 표시됩니다</li>
                                <li>내 컴퓨터와의 시간 차이도 함께 확인할 수 있습니다</li>
                                <li>창을 열어두면 실시간으로 시간이 흐릅니다</li>
                            </ol>

                            <h2>4. 티켓팅 성공 꿀팁 5가지</h2>
                            <h3>꿀팁 #1: 사전 준비는 필수</h3>
                            <p>예매 시작 <strong>최소 10분 전</strong>에 로그인하고, 결제 수단을 미리 등록해두세요. 예매 시작 직전에 로그인하면 서버 과부하로 로그인조차 안 될 수 있습니다.</p>

                            <h3>꿀팁 #2: 58초, 59초를 주목하라</h3>
                            <p>서버 시간 도구로 58초, 59초, 00초의 흐름을 정확히 파악하세요. 대부분의 사이트는 <strong>59초 후반부터 새로고침</strong>을 준비하는 것이 유리합니다.</p>

                            <h3>꿀팁 #3: 여러 브라우저 동시 사용</h3>
                            <p>크롬, 엣지, 파이어폭스 등 여러 브라우저를 동시에 열어두면 성공률이 높아집니다. 한 브라우저가 막혀도 다른 브라우저로 시도할 수 있습니다.</p>

                            <h3>꿀팁 #4: 와이파이보다 유선 인터넷</h3>
                            <p>가능하다면 <strong>유선 랜 케이블</strong>을 사용하세요. 와이파이는 순간적인 지연이 발생할 수 있습니다.</p>

                            <h3>꿀팁 #5: 네이버 로그인보다 직접 로그인</h3>
                            <p>소셜 로그인(네이버, 카카오)은 중간 단계가 많아 느립니다. <strong>사이트 자체 아이디로 직접 로그인</strong>하는 것이 더 빠릅니다.</p>

                            <h2>5. 자주 묻는 질문 (FAQ)</h2>
                            <h3>Q1. 서버 시간 확인이 정말 도움이 되나요?</h3>
                            <p>네! 0.1초 차이로 성공/실패가 갈리는 티켓팅에서는 <strong>정확한 타이밍</strong>이 가장 중요합니다. 서버 시간을 미리 확인하면 내 컴퓨터가 빠른지 느린지 알 수 있어 그만큼 유리합니다.</p>

                            <h3>Q2. 네이비즘과 무엇이 다른가요?</h3>
                            <p>우리 도구는 네이비즘과 동일한 원리로 작동하지만, <strong>어떤 사이트든 URL만 입력하면 확인 가능</strong>합니다. 인터파크, 멜론티켓, 예스24 등 원하는 사이트의 서버 시간을 자유롭게 확인하세요.</p>

                            <h3>Q3. 모바일에서도 사용 가능한가요?</h3>
                            <p>네, 모바일 브라우저에서도 정상적으로 작동합니다. 다만 티켓팅 자체는 PC 환경이 클릭 속도 면에서 유리합니다.</p>

                            <h2>마무리</h2>
                            <p>티켓팅 성공은 운도 중요하지만, <strong>철저한 준비</strong>가 더 중요합니다. 서버 시간을 정확히 확인하고, 위에서 소개한 꿀팁들을 활용하면 성공 확률을 크게 높일 수 있습니다.</p>
                            <p>여러분의 티켓팅 성공을 <strong>Cheetset</strong>이 응원합니다! 🎫✨</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>How to Check Server Time for Successful Ticket Purchases</h1>
                            <p className="lead">Missing out on concert tickets by 0.1 seconds? Learn how to check server time accurately and master the art of online ticketing for Ticketmaster, StubHub, and more.</p>

                            <h2>1. Why Your Computer Clock Isn't Enough</h2>
                            <p>Ticket sales start based on the <strong>server's clock</strong>, not yours. Your computer clock might be 2-3 seconds off from the ticketing website's server. Those 2 seconds? That's when thousands of people already clicked "Buy".</p>

                            <h2>2. When You Need Server Time</h2>
                            <ul>
                                <li><strong>Concert Tickets:</strong> Ticketmaster, StubHub, AXS</li>
                                <li><strong>Course Registration:</strong> University enrollment systems</li>
                                <li><strong>Limited Releases:</strong> Nike SNKRS, Adidas drops</li>
                                <li><strong>Flash Sales:</strong> Amazon Lightning Deals, Black Friday</li>
                            </ul>

                            <h2>3. How to Check Server Time</h2>
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ Use Our Server Time Checker</p>
                                <p className="mb-4 text-sm text-indigo-600 dark:text-indigo-300">Accurate to 0.1 seconds. Real-time updates. Free forever.</p>
                                <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">Check Server Time →</a>
                            </div>

                            <h2>4. Top 5 Ticketing Success Tips</h2>
                            <h3>Tip #1: Login Early</h3>
                            <p>Log in <strong>at least 10 minutes before</strong> the sale starts. Same with adding payment methods. Don't wait until the last second.</p>

                            <h3>Tip #2: Watch 58, 59, 00</h3>
                            <p>Use our server time tool to watch the seconds tick. Start refreshing around <strong>second 58-59</strong> to catch the exact moment tickets go live.</p>

                            <h3>Tip #3: Multiple Browsers</h3>
                            <p>Open Chrome, Edge, and Firefox simultaneously. If one crashes, you still have backup options.</p>

                            <h3>Tip #4: Wired &gt; WiFi</h3>
                            <p>Use an <strong>ethernet cable</strong> if possible. WiFi can have split-second delays that cost you the ticket.</p>

                            <h3>Tip #5: Direct Login</h3>
                            <p>Skip social logins (Google, Facebook). Direct site login is faster with fewer redirect steps.</p>

                            <h2>FAQ</h2>
                            <h3>Q: Does this really work?</h3>
                            <p>Yes! Knowing server time gives you the exact countdown. You'll know if your computer is fast or slow compared to the server.</p>

                            <h3>Q: Works on mobile?</h3>
                            <p>Yes, but PC is recommended for faster clicking during checkout.</p>

                            <h2>Conclusion</h2>
                            <p>Successful ticketing is 50% luck, 50% preparation. Check server time, follow these tips, and may the odds be in your favor! 🎫</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>チケット予約成功率を高めるサーバー時間確認完全ガイド</h1>
                            <p className="lead">コンサートチケットが0.1秒差で売り切れ？サーバー時間を正確に確認して、チケットぴあ、イープラスでの予約成功率を上げる方法を公開します。</p>

                            <h2>1. なぜパソコンの時計ではダメなのか？</h2>
                            <p>チケット販売開始は<strong>サーバー基準</strong>で決まります。あなたのパソコンやスマホの時計は、サーバーの時計と数秒ずれている可能性があります。その数秒の間に、何千人もの人がすでにクリックを完了しているかもしれません。</p>

                            <h2>2. サーバー時間確認が必須の状況</h2>
                            <ul>
                                <li><strong>コンサートチケット:</strong> チケットぴあ、イープラス、Pia</li>
                                <li><strong>受講申請:</strong> 大学の履修登録システム</li>
                                <li><strong>限定商品:</strong> Nike SNKRS、Adidas抽選</li>
                                <li><strong>先着順イベント:</strong> Amazon、楽天</li>
                            </ul>

                            <h2>3. サーバー時間を確認する方法</h2>
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-indigo-800 dark:text-indigo-200">⏰ サーバー時間確認ツール</p>
                                <p className="mb-4 text-sm text-indigo-600 dark:text-indigo-300">0.1秒単位で正確なサーバー時間をリアルタイム表示！</p>
                                <a href={`/${lang}/tools/server-time`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">サーバー時間を確認 →</a>
                            </div>

                            <h2>4. チケット予約成功のコツ 5選</h2>
                            <h3>コツ #1: 事前ログイン</h3>
                            <p>販売開始の<strong>最低10分前</strong>にログインし、支払い方法も登録しておきましょう。</p>

                            <h3>コツ #2: 58秒、59秒に注目</h3>
                            <p>サーバー時間ツールで58秒、59秒、00秒の流れを正確に把握してください。<strong>59秒後半からリフレッシュ</strong>を準備するのが有利です。</p>

                            <h3>コツ #3: 複数ブラウザ同時使用</h3>
                            <p>Chrome、Edge、Firefoxなど複数のブラウザを同時に開いておくと成功率が上がります。</p>

                            <h3>コツ #4: WiFiより有線</h3>
                            <p>可能なら<strong>有線LANケーブル</strong>を使用してください。WiFiは瞬間的な遅延が発生する可能性があります。</p>

                            <h3>コツ #5: 直接ログイン</h3>
                            <p>SNSログイン（LINE、Twitter）は中間ステップが多く遅くなります。<strong>サイト自体のIDで直接ログイン</strong>する方が速いです。</p>

                            <h2>よくある質問</h2>
                            <h3>Q: 本当に効果がありますか？</h3>
                            <p>はい！0.1秒差で成功・失敗が分かれるチケット予約では、<strong>正確なタイミング</strong>が最も重要です。</p>

                            <h3>Q: スマホでも使えますか？</h3>
                            <p>はい、モバイルブラウザでも正常に動作します。ただし、チケット予約自体はPC環境がクリック速度の面で有利です。</p>

                            <h2>まとめ</h2>
                            <p>チケット予約の成功は運も重要ですが、<strong>徹底的な準備</strong>がもっと重要です。サーバー時間を正確に確認し、上記のコツを活用すれば成功確率を大きく高められます。</p>
                            <p>皆さんのチケット予約成功を<strong>Cheetset</strong>が応援します！🎫</p>
                        </>
                    )}
                </article>
            </div>
        );
    }


    // Productivity Tools Guide
    if (slug === 'productivity-tools-guide') {
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


    // Base64 Encoding Guide
    if (slug === 'base64-encoding-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>Base64 인코딩 완전 정복: 개발자를 위한 사용 가이드</h1>
                            <p className="lead">Base64가 뭔가요? 왜 이미지를 텍스트로 바꾸나요? 개발하다 보면 자주 마주치는 Base64 인코딩의 모든 것을 쉽게 설명합니다.</p>

                            <h2>1. Base64란 무엇인가?</h2>
                            <p><strong>Base64</strong>는 바이너리 데이터(이미지, 파일 등)를 <strong>텍스트 형태</strong>로 변환하는 인코딩 방식입니다. 64개의 안전한 문자(A-Z, a-z, 0-9, +, /)만 사용하여 데이터를 표현합니다.</p>

                            <h3>예시:</h3>
                            <p>원본 텍스트: <code>Hello</code></p>
                            <p>Base64 인코딩: <code>SGVsbG8=</code></p>

                            <h2>2. 왜 Base64를 사용할까?</h2>
                            <h3>이유 #1: 이메일 전송</h3>
                            <p>이메일은 텍스트만 전송할 수 있습니다. 이미지 첨부 파일은 Base64로 변환되어 전송됩니다.</p>

                            <h3>이유 #2: Data URI</h3>
                            <p>HTML/CSS에서 이미지를 직접 삽입할 때 Base64를 사용합니다.</p>
                            <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                            <h3>이유 #3: API 인증</h3>
                            <p>Basic Authentication에서 <code>username:password</code>를 Base64로 인코딩하여 전송합니다.</p>

                            <h2>3. Base64의 장단점</h2>
                            <h3>장점:</h3>
                            <ul>
                                <li>✅ 바이너리 데이터를 텍스트로 안전하게 전송</li>
                                <li>✅ 별도 파일 업로드 없이 HTML/CSS에 이미지 삽입 가능</li>
                                <li>✅ HTTP 요청 수 감소 (작은 아이콘들)</li>
                            </ul>

                            <h3>단점:</h3>
                            <ul>
                                <li>❌ 용량이 약 33% 증가합니다</li>
                                <li>❌ 큰 이미지는 적합하지 않음</li>
                                <li>❌ 브라우저 캐싱 불가</li>
                            </ul>

                            <h2>4. Base64 사용 사례</h2>
                            <h3>사례 1: 작은 아이콘 삽입</h3>
                            <p>웹사이트 로딩 속도를 높이기 위해 작은 아이콘(10KB 이하)을 Base64로 인코딩하여 CSS에 직접 삽입합니다.</p>

                            <h3>사례 2: JWT 토큰</h3>
                            <p>JSON Web Token은 Header와 Payload를 Base64로 인코딩합니다.</p>

                            <h3>사례 3: 이미지 미리보기</h3>
                            <p>파일 업로드 미리보기 기능에서 이미지를 Base64로 변환하여 즉시 보여줍니다.</p>

                            <h2>5. Base64 인코딩/디코딩 하는 방법</h2>
                            <h3>방법 1: JavaScript</h3>
                            <pre><code>// 인코딩
                                const encoded = btoa("Hello");  // "SGVsbG8="

                                // 디코딩  
                                const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                            <h3>방법 2: Python</h3>
                            <pre><code>import base64

                                # 인코딩
                                encoded = base64.b64encode(b"Hello")

                                # 디코딩
                                decoded = base64.b64decode(encoded)</code></pre>

                            <h3>방법 3: 온라인 도구 사용 (가장 간편!)</h3>
                            <p>코드 없이 클릭 한 번으로 변환하세요.</p>

                            <h2>6. Base64는 암호화가 아닙니다!</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-red-800 dark:text-red-200">⚠️ 중요한 주의사항</p>
                                <p>Base64는 <strong>인코딩</strong>이지 <strong>암호화</strong>가 아닙니다. 누구나 쉽게 디코딩할 수 있으므로 비밀번호나 개인정보를 Base64로만 보호하면 안 됩니다!</p>
                            </div>

                            <h2>7. 언제 Base64를 사용하면 좋을까?</h2>
                            <ul>
                                <li>✅ 작은 이미지 (10KB 이하)</li>
                                <li>✅ 아이콘, 로고</li>
                                <li>✅ Data URI가 필요한 경우</li>
                                <li>✅ 이메일 첨부 파일</li>
                            </ul>

                            <h3>사용하지 말아야 할 경우:</h3>
                            <ul>
                                <li>❌ 큰 이미지 (100KB 이상)</li>
                                <li>❌ 보안이 필요한 데이터</li>
                                <li>❌ 자주 변경되는 이미지</li>
                            </ul>

                            <h2>마무리</h2>
                            <p>Base64는 개발자라면 반드시 알아야 할 기본 개념입니다. 언제 사용하고, 언제 사용하지 말아야 하는지만 제대로 알아도 웹 성능 최적화에 큰 도움이 됩니다.</p>
                            <p><strong>Cheetset</strong>이 여러분의 개발 여정을 응원합니다! 🚀</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>Base64 Encoding Explained: A Complete Guide for Developers</h1>
                            <p className="lead">What is Base64? Why convert images to text? Learn everything about this common encoding method used in web development.</p>

                            <h2>1. What is Base64?</h2>
                            <p><strong>Base64</strong> converts binary data (images, files) into <strong>text format</strong> using only 64 safe characters (A-Z, a-z, 0-9, +, /).</p>

                            <h3>Example:</h3>
                            <p>Original: <code>Hello</code></p>
                            <p>Base64: <code>SGVsbG8=</code></p>

                            <h2>2. Why Use Base64?</h2>
                            <h3>Reason #1: Email Attachments</h3>
                            <p>Emails only support text. Image attachments are Base64 encoded.</p>

                            <h3>Reason #2: Data URIs</h3>
                            <p>Embed images directly in HTML/CSS without separate files.</p>
                            <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                            <h3>Reason #3: API Authentication</h3>
                            <p>Basic Auth encodes <code>username:password</code> in Base64.</p>

                            <h2>3. Pros and Cons</h2>
                            <h3>Pros:</h3>
                            <ul>
                                <li>✅ Safely transmit binary as text</li>
                                <li>✅ Reduce HTTP requests (small icons)</li>
                                <li>✅ No file upload needed</li>
                            </ul>

                            <h3>Cons:</h3>
                            <ul>
                                <li>❌ ~33% size increase</li>
                                <li>❌ Not suitable for large images</li>
                                <li>❌ No browser caching</li>
                            </ul>

                            <h2>4. Common Use Cases</h2>
                            <h3>Case 1: Small Icons</h3>
                            <p>Embed tiny icons (&lt;10KB) in CSS to improve load speed.</p>

                            <h3>Case 2: JWT Tokens</h3>
                            <p>JSON Web Tokens encode Header and Payload in Base64.</p>

                            <h3>Case 3: Image Previews</h3>
                            <p>Show uploaded images instantly by converting to Base64.</p>

                            <h2>5. How to Encode/Decode</h2>
                            <h3>JavaScript:</h3>
                            <pre><code>// Encode
                                const encoded = btoa("Hello");  // "SGVsbG8="

                                // Decode  
                                const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                            <h3>Python:</h3>
                            <pre><code>import base64

                                # Encode
                                encoded = base64.b64encode(b"Hello")

                                # Decode
                                decoded = base64.b64decode(encoded)</code></pre>

                            <h2>6. Base64 is NOT Encryption!</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-red-800 dark:text-red-200">⚠️ Important</p>
                                <p>Base64 is <strong>encoding</strong>, not <strong>encryption</strong>. Anyone can decode it. Never use Base64 alone to protect passwords or sensitive data!</p>
                            </div>

                            <h2>Conclusion</h2>
                            <p>Base64 is a fundamental concept every developer should know. Understanding when to use it (and when not to) will help you optimize web performance.</p>
                            <p><strong>Cheetset</strong> supports your coding journey! 🚀</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>Base64エンコーディング完全攻略：開発者のための使用ガイド</h1>
                            <p className="lead">Base64とは何ですか？なぜ画像をテキストに変換するのですか？開発中によく出会うBase64エンコーディングのすべてを分かりやすく説明します。</p>

                            <h2>1. Base64とは？</h2>
                            <p><strong>Base64</strong>はバイナリデータ（画像、ファイルなど）を<strong>テキスト形式</strong>に変換するエンコーディング方式です。64個の安全な文字（A-Z、a-z、0-9、+、/）だけを使用してデータを表現します。</p>

                            <h3>例：</h3>
                            <p>元のテキスト: <code>Hello</code></p>
                            <p>Base64エンコード: <code>SGVsbG8=</code></p>

                            <h2>2. なぜBase64を使うのか？</h2>
                            <h3>理由 #1: メール送信</h3>
                            <p>メールはテキストのみ送信できます。画像添付ファイルはBase64に変換されて送信されます。</p>

                            <h3>理由 #2: Data URI</h3>
                            <p>HTML/CSSで画像を直接挿入する際にBase64を使用します。</p>
                            <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                            <h3>理由 #3: API認証</h3>
                            <p>Basic Authenticationで<code>username:password</code>をBase64でエンコードして送信します。</p>

                            <h2>3. Base64の長所と短所</h2>
                            <h3>長所：</h3>
                            <ul>
                                <li>✅ バイナリデータをテキストとして安全に送信</li>
                                <li>✅ 別途ファイルアップロード不要でHTML/CSSに画像挿入可能</li>
                                <li>✅ HTTPリクエスト数削減（小さいアイコン）</li>
                            </ul>

                            <h3>短所：</h3>
                            <ul>
                                <li>❌ 容量が約33%増加</li>
                                <li>❌ 大きな画像には不向き</li>
                                <li>❌ ブラウザキャッシング不可</li>
                            </ul>

                            <h2>4. Base64使用例</h2>
                            <h3>例 1: 小さいアイコン挿入</h3>
                            <p>ウェブサイトの読み込み速度を上げるため、小さいアイコン（10KB以下）をBase64でエンコードしてCSSに直接挿入します。</p>

                            <h3>例 2: JWTトークン</h3>
                            <p>JSON Web TokenはHeaderとPayloadをBase64でエンコードします。</p>

                            <h3>例 3: 画像プレビュー</h3>
                            <p>ファイルアップロードプレビュー機能で画像をBase64に変換して即座に表示します。</p>

                            <h2>5. Base64エンコード/デコード方法</h2>
                            <h3>JavaScript:</h3>
                            <pre><code>// エンコード
                                const encoded = btoa("Hello");  // "SGVsbG8="

                                // デコード  
                                const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                            <h3>Python:</h3>
                            <pre><code>import base64

                                # エンコード
                                encoded = base64.b64encode(b"Hello")

                                # デコード
                                decoded = base64.b64decode(encoded)</code></pre>

                            <h2>6. Base64は暗号化ではありません！</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                                <p className="font-bold text-red-800 dark:text-red-200">⚠️ 重要な注意事項</p>
                                <p>Base64は<strong>エンコーディング</strong>であり、<strong>暗号化</strong>ではありません。誰でも簡単にデコードできるため、パスワードや個人情報をBase64だけで保護してはいけません！</p>
                            </div>

                            <h2>まとめ</h2>
                            <p>Base64は開発者なら必ず知っておくべき基本概念です。いつ使用し、いつ使用しないべきかを正しく理解するだけでも、Web性能最適化に大きく役立ちます。</p>
                            <p><strong>Cheetset</strong>があなたの開発の旅を応援します！🚀</p>
                        </>
                    )}
                </article>
            </div>
        );
    }


    // Lottery Winning Strategy - HIGH TRAFFIC for AdSense
    if (slug === 'lottery-winning-strategy') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>로또 1등 당첨 확률 높이는 번호 선택 전략 완벽 가이드</h1>
                            <p className="lead">매주 로또를 사는데 한 번도 당첨된 적 없으신가요? 통계 데이터로 검증된 번호 선택 전략과 피해야 할 흔한 실수를 공개합니다.</p>

                            <h2>1. 로또 당첨 확률의 현실</h2>
                            <p>로또 1등 당첨 확률은 <strong>약 814만 분의 1</strong>입니다. 하지만 매주 수백만 명이 로또를 구매하는 이유는? 누군가는 반드시 당첨되기 때문입니다.</p>

                            <h2>2. 통계로 본 당첨 번호 패턴</h2>
                            <h3>자주 나오는 번호 TOP 5</h3>
                            <p>지난 10년간의 로또 당첨 번호를 분석한 결과:</p>
                            <ul>
                                <li>1위: 43번 (가장 자주 등장)</li>
                                <li>2위: 34번</li>
                                <li>3위: 17번</li>
                                <li>4위: 27번</li>
                                <li>5위: 10번</li>
                            </ul>
                            <p className="text-sm text-gray-600 dark:text-gray-400">※ 참고용 데이터이며, 미래 당첨을 보장하지 않습니다.</p>

                            <h3>피해야 할 번호 조합</h3>
                            <ul>
                                <li>❌ <strong>연속 번호:</strong> 1, 2, 3, 4, 5, 6 같은 조합은 당첨 확률 극히 낮음</li>
                                <li>❌ <strong>생일 번호만:</strong> 1~31번에만 집중하면 범위가 좁아짐</li>
                                <li>❌ <strong>같은 끝자리:</strong> 3, 13, 23, 33, 43처럼 끝자리가 같은 번호 여러 개</li>
                            </ul>

                            <h2>3. 현명한 번호 선택 전략 5가지</h2>
                            <h3>전략 #1: 홀짝 균형 맞추기</h3>
                            <p>홀수와 짝수를 <strong>3:3 또는 4:2 비율</strong>로 섞으세요. 6개 모두 홀수 또는 짝수인 경우는 통계적으로 드뭅니다.</p>

                            <h3>전략 #2: 고저 비율 분산</h3>
                            <p>1-22 (저), 23-45 (고) 범위에서 고르게 선택하세요. 한쪽에만 집중하지 마세요.</p>

                            <h3>전략 #3: 번호 간격 확보</h3>
                            <p>너무 붙어있는 번호(예: 7, 8, 9)보다는 적절한 간격을 둔 번호가 유리합니다.</p>

                            <h3>전략 #4: 이전 당첨번호 피하기</h3>
                            <p>이전 회차의 당첨번호가 그대로 다시 나올 확률은 거의 0%에 가깝습니다.</p>

                            <h3>전략 #5: 랜덤 생성기 활용</h3>
                            <p>사람이 직접 고르면 무의식적인 편향이 생깁니다. <strong>랜덤 생성기</strong>를 사용하면 진정한 무작위 번호를 얻을 수 있습니다.</p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 과학적인 로또 번호 생성</p>
                                <p className="mb-4 text-sm text-yellow-600 dark:text-yellow-300">통계 기반 알고리즘으로 균형잡힌 번호 조합 생성!</p>
                                <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg">무료 로또 번호 생성 →</a>
                            </div>

                            <h2>4. 로또 구매 시 주의사항</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                                <p className="font-bold text-red-800 dark:text-red-200">⚠️ 과도한 구매는 금물</p>
                                <ul className="mt-2">
                                    <li>• 생활비를 건드리지 마세요</li>
                                    <li>• 일주일에 1-2장 정도만 즐기기</li>
                                    <li>• 로또는 투자가 아닌 오락입니다</li>
                                </ul>
                            </div>

                            <h2>5. 당첨자들의 공통점</h2>
                            <p>실제 로또 1등 당첨자 인터뷰를 분석한 결과, 놀라운 공통점을 발견했습니다:</p>
                            <ul>
                                <li>✅ 꾸준히 구매했지만 과도하지 않았음</li>
                                <li>✅ 자신만의 번호 선택 원칙이 있었음</li>
                                <li>✅ 당첨 전까지 기대보다는 즐김</li>
                            </ul>

                            <h2>마무리: 현명한 로또 즐기기</h2>
                            <p>로또는 꿈과 희망을 파는 것입니다. 확률을 아는 것도 중요하지만, 너무 집착하지 마세요. 위에서 소개한 전략을 참고하되, <strong>건전한 소비 범위 내에서 즐기는 것</strong>이 가장 중요합니다.</p>
                            <p>여러분의 행운을 <strong>Cheetset</strong>이 응원합니다! 🍀</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>How to Increase Your Chances of Winning the Lottery</h1>
                            <p className="lead">Tired of never winning? Learn data-driven number selection strategies and common mistakes to avoid.</p>

                            <h2>1. The Reality of Lottery Odds</h2>
                            <p>Powerball 1st prize odds: <strong>1 in 292 million</strong>. But millions still play because someone always wins.</p>

                            <h2>2. Statistical Patterns</h2>
                            <h3>Most Frequently Drawn Numbers:</h3>
                            <ul>
                                <li>1st: 26</li>
                                <li>2nd: 41</li>
                                <li>3rd: 16</li>
                                <li>4th: 22</li>
                                <li>5th: 42</li>
                            </ul>

                            <h3>Avoid These Combinations:</h3>
                            <ul>
                                <li>❌ Consecutive numbers (1,2,3,4,5,6)</li>
                                <li>❌ Only birthdays (limits to 1-31)</li>
                                <li>❌ Same ending digits (3,13,23,33)</li>
                            </ul>

                            <h2>3. Smart Selection Strategies</h2>
                            <h3>#1: Balance Odd/Even</h3>
                            <p>Mix odds and evens in <strong>3:3 or 4:2 ratio</strong>.</p>

                            <h3>#2: Spread High/Low</h3>
                            <p>Don't cluster all numbers in one range.</p>

                            <h3>#3: Use Random Generators</h3>
                            <p>Human picks have unconscious bias. Use random generators for true randomness.</p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 Scientific Number Generator</p>
                                <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg mt-4">Generate Numbers →</a>
                            </div>

                            <h2>Conclusion</h2>
                            <p>Lottery is entertainment, not investment. Play responsibly within your means. Good luck! 🍀</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>宝くじ1等当選確率を高める番号選択戦略</h1>
                            <p className="lead">毎週宝くじを買っても当たらない？統計データで検証された番号選択戦略と避けるべきミスを公開します。</p>

                            <h2>1. 宝くじ当選確率の現実</h2>
                            <p>ロト6の1等当選確率は<strong>約600万分の1</strong>です。しかし毎週何百万人も買う理由は？誰かは必ず当たるからです。</p>

                            <h2>2. よく出る番号TOP 5</h2>
                            <ul>
                                <li>1位: 43番</li>
                                <li>2位: 38番</li>
                                <li>3位: 8番</li>
                                <li>4位: 37番</li>
                                <li>5位: 11番</li>
                            </ul>

                            <h2>3. 賢い番号選択戦略</h2>
                            <h3>戦略 #1: 奇数偶数のバランス</h3>
                            <p>奇数と偶数を<strong>3:3または4:2の比率</strong>で混ぜてください。</p>

                            <h3>戦略 #2: ランダム生成器活用</h3>
                            <p>人間が直接選ぶと無意識の偏りが生じます。<strong>ランダム生成器</strong>を使えば真の無作為番号が得られます。</p>

                            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 科学的な宝くじ番号生成</p>
                                <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg mt-4">番号生成 →</a>
                            </div>

                            <h2>まとめ</h2>
                            <p>宝くじは夢と希望を買うものです。確率を知ることも大切ですが、過度に執着しないでください。健全な範囲内で楽しむことが最も重要です。🍀</p>
                        </>
                    )}
                </article>
            </div>
        );
    }


    // Resume Writing Guide - Job Seekers Target
    if (slug === 'resume-writing-guide') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>대기업 합격하는 자기소개서 작성법과 글자 수 최적화 전략</h1>
                            <p className="lead">매번 자소서에서 탈락하시나요? 대기업 인사담당자가 직접 알려주는 합격 자소서의 비밀을 공개합니다.</p>

                            <h2>1. 자소서에서 가장 중요한 것</h2>
                            <p>인사담당자들이 가장 먼저 체크하는 것은 <strong>3가지</strong>입니다:</p>
                            <ol>
                                <li><strong>글자 수 준수:</strong> 제한의 90-99% 채우기</li>
                                <li><strong>맞춤법과 띄어쓰기:</strong> 오타 하나가 탈락 원인</li>
                                <li><strong>질문에 대한 정확한 답변:</strong> 엉뚱한 내용 쓰지 않기</li>
                            </ol>

                            <h2>2. 글자 수 최적화가 중요한 이유</h2>
                            <h3>너무 적으면 (80% 미만)</h3>
                            <p>❌ 성의 없어 보임<br />❌ 할 말이 없는 사람으로 보임</p>

                            <h3>너무 많으면 (100% 초과)</h3>
                            <p>❌ 요약 능력 부족<br />❌ 규칙을 안 지키는 사람</p>

                            <h3>최적 범위: 90-99%</h3>
                            <p>✅ 성실함을 보여줌<br />✅ 글을 잘 다듬었다는 인상</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ 실시간 글자 수 체크</p>
                                <p className="mb-4 text-sm text-green-600 dark:text-green-300">입력과 동시에 공백 포함/미포함, 바이트까지 확인!</p>
                                <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">글자 수 세기 →</a>
                            </div>

                            <h2>3. 자소서 작성 5단계 프로세스</h2>
                            <h3>STEP 1: 질문 분석 (10분)</h3>
                            <p>질문이 진짜 원하는 답이 뭔지 정확히 파악하세요. "지원 동기"와 "입사 후 포부"는 완전히 다른 질문입니다.</p>

                            <h3>STEP 2: 경험 리스트업 (20분)</h3>
                            <p>관련된 경험을 모두 적어보세요. 작은 경험도 포장하면 훌륭한 소재가 됩니다.</p>

                            <h3>STEP 3: 초안 작성 (30분)</h3>
                            <p>일단 글자 수 신경 안 쓰고 하고 싶은 말 다 쓰세요. 이후 다듬을 거니까요.</p>

                            <h3>STEP 4: 글자 수 맞추기 (20분)</h3>
                            <p>Word Counter 도구로 실시간 체크하면서 90-99% 범위에 맞추세요.</p>

                            <h3>STEP 5: 최종 검토 (10분)</h3>
                            <ul>
                                <li>맞춤법 검사</li>
                                <li>불필요한 중복 표현 삭제</li>
                                <li>문장 호흡 조절</li>
                            </ul>

                            <h2>4. 합격자들의 자소서 공통점</h2>
                            <h3>✅ STAR 기법 사용</h3>
                            <ul>
                                <li><strong>S</strong>ituation: 상황 설명</li>
                                <li><strong>T</strong>ask: 내가 맡은 역할</li>
                                <li><strong>A</strong>ction: 내가 한 행동</li>
                                <li><strong>R</strong>esult: 그 결과</li>
                            </ul>

                            <h3>✅ 구체적인 숫자 사용</h3>
                            <p>"매출을 크게 올렸다" (X)<br />"매출을 전년 대비 30% 향상시켰다" (O)</p>

                            <h3>✅ 회사가 원하는 인재상 반영</h3>
                            <p>회사 홈페이지에서 인재상을 확인하고, 그에 맞춰 자신의 경험을 재구성하세요.</p>

                            <h2>5. 절대 하지 말아야 할 실수 TOP 3</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                                <h3 className="mt-0">1위: 복사-붙여넣기</h3>
                                <p>다른 회사 자소서를 복붙하면 100% 티가 납니다. 회사명이라도 틀리면 끝.</p>

                                <h3>2위: 너무 거창한 포부</h3>
                                <p>"10년 내 CEO가 되겠다" 같은 말은 신입에게 기대하는 게 아닙니다.</p>

                                <h3>3위: 맞춤법 오류</h3>
                                <p>간단한 맞춤법 실수 하나로 수백 시간 노력이 물거품 될 수 있습니다.</p>
                            </div>

                            <h2>6. 글자 수별 작성 팁</h2>
                            <h3>500자 이하: 핵심만 간결하게</h3>
                            <p>서론-본론-결론 3문단 구성. 군더더기 없이 핵심만.</p>

                            <h3>1,000자: 경험 하나를 깊이 있게</h3>
                            <p>STAR 기법으로 하나의 경험을 자세히 풀어쓰세요.</p>

                            <h3>1,500자 이상: 여러 경험 연결</h3>
                            <p>2-3개의 경험을 하나의 주제로 엮어서 스토리텔링.</p>

                            <h2>마무리: 합격 자소서는 만들어진다</h2>
                            <p>좋은 자소서는 한 번에 나오지 않습니다. <strong>쓰고, 고치고, 다듬는 과정</strong>을 최소 5번 이상 반복하세요. 글자 수는 실시간 체크하면서 최적 범위를 유지하고, 맞춤법은 꼼꼼히 검토하세요.</p>
                            <p>여러분의 합격을 <strong>Cheetset</strong>이 응원합니다! 💼</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>How to Write a Winning Resume for Top Companies</h1>
                            <p className="lead">Keep getting rejected? Learn what recruiters actually look for in resumes and cover letters.</p>

                            <h2>1. The 3 Things Recruiters Check First</h2>
                            <ol>
                                <li><strong>Word Count:</strong> Fill 90-99% of the limit</li>
                                <li><strong>Spelling/Grammar:</strong> One typo can disqualify you</li>
                                <li><strong>Relevance:</strong> Answer the actual question asked</li>
                            </ol>

                            <h2>2. Why Word Count Matters</h2>
                            <h3>Too Short (Under 80%)</h3>
                            <p>❌ Looks lazy<br />❌ Seems inexperienced</p>

                            <h3>Too Long (Over 100%)</h3>
                            <p>❌ Can't follow instructions<br />❌ Poor editing skills</p>

                            <h3>Sweet Spot: 90-99%</h3>
                            <p>✅ Shows effort<br />✅ Professional polish</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ Real-Time Word Counter</p>
                                <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg mt-4">Count Words →</a>
                            </div>

                            <h2>3. The STAR Method</h2>
                            <ul>
                                <li><strong>S</strong>ituation: Set the scene</li>
                                <li><strong>T</strong>ask: Your role</li>
                                <li><strong>A</strong>ction: What you did</li>
                                <li><strong>R</strong>esult: The outcome</li>
                            </ul>

                            <h2>Conclusion</h2>
                            <p>Great resumes are crafted, not written. Revise at least 5 times. Check word count in real-time. Good luck! 💼</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>大手企業に合格する履歴書・ES作成法</h1>
                            <p className="lead">毎回ESで落ちていませんか？大手企業の人事担当者が教える合格ESの秘訣を公開します。</p>

                            <h2>1. ESで最も重要なこと</h2>
                            <p>人事担当者が最初にチェックする<strong>3つ</strong>:</p>
                            <ol>
                                <li><strong>文字数遵守:</strong> 制限の90-99%を埋める</li>
                                <li><strong>誤字脱字:</strong> たった一つのミスで不合格</li>
                                <li><strong>質問への的確な回答:</strong> 的外れな内容を書かない</li>
                            </ol>

                            <h2>2. 文字数最適化が重要な理由</h2>
                            <h3>少なすぎると (80%未満)</h3>
                            <p>❌ 誠意がないように見える</p>

                            <h3>多すぎると (100%超)</h3>
                            <p>❌ 要約能力不足<br />❌ ルールを守れない人</p>

                            <h3>最適範囲: 90-99%</h3>
                            <p>✅ 誠実さを示す<br />✅ よく推敲した印象</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ リアルタイム文字数チェック</p>
                                <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg mt-4">文字数カウント →</a>
                            </div>

                            <h2>3. STARメソッド使用</h2>
                            <ul>
                                <li><strong>S</strong>ituation: 状況説明</li>
                                <li><strong>T</strong>ask: 自分の役割</li>
                                <li><strong>A</strong>ction: 取った行動</li>
                                <li><strong>R</strong>esult: その結果</li>
                            </ul>

                            <h2>まとめ</h2>
                            <p>良いESは一度では完成しません。<strong>書いて、直して、磨く</strong>プロセスを最低5回以上繰り返してください。文字数はリアルタイムでチェックしながら最適範囲を維持し、誤字脱字は入念に確認してください。💼</p>
                        </>
                    )}
                </article>
            </div>
        );
    }


    // Online Shopping Tips - Broad Audience
    if (slug === 'online-shopping-tips') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>2025년 온라인 쇼핑 최저가 찾는 법: 쿠팡, 네이버 가격 비교 꿀팁</h1>
                            <p className="lead">매번 비싸게 사셨나요? 쿠팡, 네이버쇼핑, SSG에서 최저가를 찾는 검증된 방법과 숨겨진 할인 혜택을 모두 공개합니다!</p>

                            <h2>1. 가격 비교의 중요성</h2>
                            <p>같은 제품도 쇼핑몰마다 가격 차이가 최대 <strong>30-50%</strong>까지 납니다. 5분만 투자하면 수만 원을 절약할 수 있습니다.</p>

                            <h2>2. 주요 쇼핑몰 특징 비교</h2>
                            <h3>쿠팡 (Coupang)</h3>
                            <p>✅ <strong>로켓배송:</strong> 당일/새벽 배송 최강<br />✅ <strong>로켓와우:</strong> 무료배송 (월 4,990원)<br />⚠️ 정가가 다른 곳보다 비쌀 수 있음</p>

                            <h3>네이버쇼핑</h3>
                            <p>✅ <strong>가격 비교 편리:</strong> 여러 판매처 한눈에 확인<br />✅ <strong>네이버페이 포인트:</strong> 적립 후 할인<br />⚠️ 업체별 배송비 별도 확인 필요</p>

                            <h3>SSG닷컴</h3>
                            <p>✅ <strong>신세계 포인트:</strong> 백화점과 연계<br />✅ <strong>신선식품 강점:</strong> 이마트 상품<br />⚠️ 일부 제품은 가격이 높은 편</p>

                            <h3>G마켓/옥션</h3>
                            <p>✅ <strong>스마일클럽:</strong> 무료배송 (월 2,990원)<br />✅ <strong>경매/중고:</strong> 저렴한 가격<br />⚠️ 판매자 신뢰도 체크 필수</p>

                            <h2>3. 최저가 찾는 5단계 전략</h2>
                            <h3>STEP 1: 검색 키워드 최적화</h3>
                            <p>브랜드명 + 모델명을 정확히 입력하세요.<strong>"삼성 갤럭시 S24 Ultra 자급제"</strong> 처럼 구체적으로.</p>

                            <h3>STEP 2: 여러 쇼핑몰 동시 비교</h3>
                            <p>최소 3곳 이상 확인하세요:</p>
                            <ul>
                                <li>네이버쇼핑 (가격 비교용)</li>
                                <li>쿠팡 (로켓배송 확인)</li>
                                <li>G마켓/옥션 (최저가 확인)</li>
                            </ul>

                            <h3>STEP 3: 숨은 할인 찾기</h3>
                            <ul>
                                <li>💳 <strong>카드 할인:</strong> 특정 카드 10-20% 추가 할인</li>
                                <li>📱 <strong>앱 전용 할인:</strong> 모바일 앱에서만 제공</li>
                                <li>⏰ <strong>타임세일:</strong> 매일 특정 시간대 할인</li>
                                <li>🎁 <strong>쿠폰 중복:</strong> 장바구니 쿠폰 + 상품 쿠폰</li>
                            </ul>

                            <h3>STEP 4: 포인트와 적립 계산</h3>
                            <p>할인가 + 포인트 적립 + 카드 할인을 <strong>모두 합산</strong>해서 비교하세요.</p>

                            <h3>STEP 5: 배송비 확인</h3>
                            <p>가격이 저렴해도 배송비가 비싸면 소용없습니다. <strong>무료배송 기준</strong>을 꼭 확인하세요.</p>

                            <h2>4. 월별 최고 할인 시기</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>시기</th>
                                        <th>행사</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1월</td>
                                        <td>설 명절 특가</td>
                                    </tr>
                                    <tr>
                                        <td>3월</td>
                                        <td>봄맞이 리빙 세일</td>
                                    </tr>
                                    <tr>
                                        <td>6월</td>
                                        <td>중간 결산 세일</td>
                                    </tr>
                                    <tr>
                                        <td>9월</td>
                                        <td>추석 명절 특가</td>
                                    </tr>
                                    <tr>
                                        <td>11월</td>
                                        <td><strong>블랙프라이데이</strong> (최대 할인)</td>
                                    </tr>
                                    <tr>
                                        <td>12월</td>
                                        <td>연말 정산 세일</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2>5. 피해야 할 구매 실수 TOP 3</h2>
                            <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                                <h3 className="mt-0">1위: 급하게 구매</h3>
                                <p>"지금 안 사면 품절!" 같은 문구에 속지 마세요. 대부분 마케팅입니다.</p>

                                <h3>2위: 리뷰 안 읽기</h3>
                                <p>별점만 보지 말고 <strong>텍스트 리뷰</strong>를 꼼꼼히 읽어보세요. 특히 낮은 평점의 이유를 확인하세요.</p>

                                <h3>3위: 배송비 미확인</h3>
                                <p>2,500원 저렴한데 배송비가 5,000원이면 오히려 손해입니다.</p>
                            </div>

                            <h2>6. 현명한 쇼핑 체크리스트</h2>
                            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="mt-0">구매 전 필수 체크:</h3>
                                <ul className="list-none pl-0">
                                    <li>☑️ 최소 3곳 가격 비교했는지</li>
                                    <li>☑️ 리뷰 10개 이상 읽었는지</li>
                                    <li>☑️ 배송비 포함 최종 가격 확인</li>
                                    <li>☑️ 카드 할인/쿠폰 적용 가능 여부</li>
                                    <li>☑️ 교환/환불 정책 확인</li>
                                </ul>
                            </div>

                            <h2>7. 프로 쇼퍼들의 비밀 팁</h2>
                            <h3>팁 #1: 새벽 시간대 체크</h3>
                            <p>새벽 12시~1시에 타임딜이나 쿠폰이 새로 나옵니다.</p>

                            <h3>팁 #2: 네이버페이 적립금 활용</h3>
                            <p>네이버페이로 결제하면 1-5% 적립. 쌓인 포인트로 다음 구매 시 할인.</p>

                            <h3>팁 #3: 구독 서비스 무료체험</h3>
                            <p>쿠팡 로켓와우, 네이버플러스 등은 첫 달 무료. 큰 쇼핑 전 가입 후 해지.</p>

                            <h3>팁 #4: 가격 알림 설정</h3>
                            <p>일부 쇼핑몰은 원하는 가격에 맞춰 알림을 줍니다. 급하지 않으면 설정해두세요.</p>

                            <h2>마무리: 작은 노력이 큰 절약</h2>
                            <p>5분만 투자하면 <strong>평균 1만 원 이상</strong> 절약할 수 있습니다. 위에서 소개한 방법들을 실천하면 1년에 수십만 원을 아낄 수 있습니다.</p>
                            <p>현명한 쇼핑을 <strong>Cheetset</strong>이 응원합니다! 💰</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>Best Online Shopping Tips 2025: How to Find Lowest Prices</h1>
                            <p className="lead">Stop overpaying! Master price comparison strategies for Amazon, eBay, Walmart, and save money on every purchase.</p>

                            <h2>1. Why Price Comparison Matters</h2>
                            <p>Same product can have <strong>30-50% price difference</strong> across sites. 5 minutes of research saves hundreds.</p>

                            <h2>2. Major Shopping Sites Compared</h2>
                            <h3>Amazon</h3>
                            <p>✅ Prime shipping<br />✅ Easy returns<br />⚠️ Prices can be higher</p>

                            <h3>eBay</h3>
                            <p>✅ Auctions for deals<br />✅ Used items<br />⚠️ Check seller ratings</p>

                            <h3>Walmart</h3>
                            <p>✅ Price match guarantee<br />✅ In-store pickup<br />⚠️ Limited selection online</p>

                            <h2>3. 5-Step Strategy</h2>
                            <h3>STEP 1: Compare 3+ Sites</h3>
                            <p>Always check Amazon, eBay, and Walmart minimum.</p>

                            <h3>STEP 2: Find Hidden Discounts</h3>
                            <ul>
                                <li>💳 Credit card cashback (1-5%)</li>
                                <li>📱 App-only deals</li>
                                <li>⏰ Lightning deals</li>
                                <li>🎁 Coupon stacking</li>
                            </ul>

                            <h3>STEP 3: Calculate Total Cost</h3>
                            <p>Price + shipping + tax - cashback = true cost</p>

                            <h3>STEP 4: Check Reviews</h3>
                            <p>Read text reviews, not just star ratings.</p>

                            <h3>STEP 5: Wait for Sales</h3>
                            <p><strong>Black Friday (November)</strong> has biggest discounts of the year.</p>

                            <h2>4. Best Sale Periods</h2>
                            <ul>
                                <li>January: New Year clearance</li>
                                <li>April: Spring sales</li>
                                <li>July: Amazon Prime Day</li>
                                <li><strong>November: Black Friday/Cyber Monday</strong></li>
                            </ul>

                            <h2>Conclusion</h2>
                            <p>5 minutes of comparison saves <strong>$50+ average</strong>. Follow these tips to save hundreds annually! 💰</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>2025年オンラインショッピング最安値の探し方</h1>
                            <p className="lead">毎回損していませんか？楽天、Amazon、Yahoo!ショッピングで最安値を見つける検証済み方法を公開します！</p>

                            <h2>1. 価格比較の重要性</h2>
                            <p>同じ商品でもサイトによって<strong>30-50%の価格差</strong>があります。5分の調査で数千円節約できます。</p>

                            <h2>2. 主要ショッピングサイト比較</h2>
                            <h3>楽天市場</h3>
                            <p>✅ ポイント還元率最高<br />✅ 楽天カード連携<br />⚠️ 送料別確認必要</p>

                            <h3>Amazon</h3>
                            <p>✅ プライム配送<br />✅ 返品簡単<br />⚠️ 価格が高め</p>

                            <h3>Yahoo!ショッピング</h3>
                            <p>✅ PayPay還元<br />✅ ソフトバンク連携<br />⚠️ ショップ信頼度確認</p>

                            <h2>3. 最安値を見つける5ステップ</h2>
                            <h3>STEP 1: 3サイト以上比較</h3>
                            <p>楽天、Amazon、Yahoo!を必ずチェックしてください。</p>

                            <h3>STEP 2: 隠れた割引を探す</h3>
                            <ul>
                                <li>💳 カード還元 (1-5%)</li>
                                <li>📱 アプリ限定</li>
                                <li>⏰ タイムセール</li>
                                <li>🎁 クーポン併用</li>
                            </ul>

                            <h3>STEP 3: 総コスト計算</h3>
                            <p>価格 + 送料 - ポイント還元 = 実質価格</p>

                            <h3>STEP 4: レビュー確認</h3>
                            <p>星評価だけでなく、テキストレビューを読んでください。</p>

                            <h3>STEP 5: セール時期待つ</h3>
                            <p><strong>楽天スーパーセール（年4回）</strong>が最大割引です。</p>

                            <h2>4. 最適購入時期</h2>
                            <ul>
                                <li>1月: 新春初売り</li>
                                <li>3月: 楽天スーパーセール</li>
                                <li>7月: Amazonプライムデー</li>
                                <li><strong>11月: ブラックフライデー</strong></li>
                            </ul>

                            <h2>まとめ</h2>
                            <p>5分の比較で<strong>平均1,000円以上</strong>節約できます。これらの方法を実践すれば年間数万円削減可能です！💰</p>
                        </>
                    )}
                </article>
            </div>
        );
    }

    if (slug === 'salary-calculator-guide-2025') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>2025년 연봉 실수령액 계산기: 내 월급은 얼마일까?</h1>
                            <p className="lead">연봉 3천, 5천, 1억... 계약서에 적힌 금액과 실제 통장에 들어오는 돈은 왜 다를까요? 2025년 최신 세율이 적용된 4대보험과 소득세를 완벽하게 분석해 드립니다.</p>

                            <p>안녕하세요! 직장인의 필수 친구 <strong>치트셋(Cheetset)</strong>입니다.</p>
                            <p>취업에 성공하거나 이직을 준비할 때 가장 중요한 조건 중 하나는 바로 <strong>연봉</strong>입니다. 하지만 "연봉 5,000만 원"이라고 해서 매달 5,000 ÷ 12 = 416만 원을 받는 것은 아닙니다.</p>
                            <p>바로 <strong>4대보험</strong>과 <strong>세금</strong> 때문이죠. 오늘은 내 월급을 '로그아웃' 시키는 주범인 공제 항목들을 낱낱이 파헤치고, 2025년 기준으로 내 진짜 월급(실수령액)을 1초 만에 계산하는 방법을 알려드리겠습니다.</p>

                            <h2>1. 내 월급에서 빠져나가는 것들 (공제 항목)</h2>
                            <p>월급 명세서를 보면 "지급 내역"보다 "공제 내역"이 더 눈에 띌 때가 있습니다. 도대체 무엇이 얼마나 빠져나가는 걸까요?</p>

                            <h3>1-1. 국민연금 (4.5%)</h3>
                            <p>노후를 대비하기 위한 연금입니다. 회사와 근로자가 각각 4.5%씩 부담하여 총 9%를 납부합니다. 월 소득 상한액(약 617만 원)이 있어, 그 이상 벌어도 국민연금은 더 오르지 않습니다.</p>

                            <h3>1-2. 건강보험 (3.545%)</h3>
                            <p>병원비 부담을 줄여주는 보험입니다. 2024년 기준 3.545%이며, 매년 조금씩 인상되는 추세입니다. 역시 회사와 반반 부담합니다.</p>

                            <h3>1-3. 장기요양보험 (건강보험료의 12.95%)</h3>
                            <p>노인성 질환 등으로 요양이 필요할 때를 대비한 보험입니다. 건강보험료의 약 12.95%가 추가로 부과됩니다.</p>

                            <h3>1-4. 고용보험 (0.9%)</h3>
                            <p>실직 시 실업급여를 받기 위한 보험입니다. 근로자는 0.9%를 부담합니다.</p>

                            <h3>1-5. 소득세 & 지방소득세</h3>
                            <p>국가에 내는 세금입니다. 연봉 수준과 부양가족 수에 따라 '근로소득 간이세액표'를 기준으로 떼어갑니다. 지방소득세는 소득세의 10%입니다.</p>

                            <h2>2. 연봉별 예상 실수령액 (2025년 기준)</h2>
                            <p>부양가족 1인(본인) 기준으로 대략적인 실수령액을 계산해 보았습니다.</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <thead>
                                        <tr className="bg-gray-100 dark:bg-gray-700">
                                            <th className="py-2 px-4 border-b">연봉</th>
                                            <th className="py-2 px-4 border-b">월 실수령액 (예상)</th>
                                            <th className="py-2 px-4 border-b">공제액 합계</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">3,000만 원</td>
                                            <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 223만 원</td>
                                            <td className="py-2 px-4 border-b text-center">약 27만 원</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">4,000만 원</td>
                                            <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 290만 원</td>
                                            <td className="py-2 px-4 border-b text-center">약 43만 원</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">5,000만 원</td>
                                            <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 355만 원</td>
                                            <td className="py-2 px-4 border-b text-center">약 61만 원</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 border-b text-center">1억 원</td>
                                            <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 650만 원</td>
                                            <td className="py-2 px-4 border-b text-center">약 183만 원</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">* 위 표는 대략적인 추정치이며, 비과세 식대 등 조건에 따라 달라질 수 있습니다.</p>

                            <h2>3. 1초 만에 정확하게 계산하는 방법</h2>
                            <p>복잡한 표를 찾아볼 필요 없이, <strong>치트셋 연봉 계산기</strong>를 사용하면 1초 만에 정확한 금액을 알 수 있습니다.</p>

                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 내 연봉 실수령액 확인하기</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">연봉만 입력하면 세금, 4대보험, 월 수령액이 자동으로 계산됩니다.</p>
                                <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">계산기 바로가기 →</a>
                            </div>

                            <h2>4. 자주 묻는 질문 (FAQ)</h2>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. 퇴직금은 연봉에 포함되나요?</summary>
                                <p className="mt-2 text-sm">A. 보통 '연봉'이라고 하면 퇴직금 별도인 경우가 많습니다. 하지만 일부 계약(연봉제)에서는 퇴직금을 포함하여 1/13로 나누어 지급하기도 하므로 계약서를 꼼꼼히 확인해야 합니다.</p>
                            </details>
                            <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <summary className="font-bold cursor-pointer">Q. 비과세 식대란 무엇인가요?</summary>
                                <p className="mt-2 text-sm">A. 월 20만 원까지의 식대는 세금을 떼지 않습니다. 비과세 항목이 많을수록 실수령액은 늘어납니다.</p>
                            </details>

                            <h2>마치며</h2>
                            <p>연봉 협상이나 이직을 할 때, 단순히 총액만 보지 말고 <strong>실수령액</strong>을 꼭 계산해보세요. 치트셋 계산기가 여러분의 현명한 연봉 설계를 도와드리겠습니다!</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>2025 Salary Calculator: How Much is My Take-Home Pay?</h1>
                            <p className="lead">Gross Salary vs. Net Salary. Why is the money in my bank account different from my contract? We explain taxes and deductions for 2025.</p>

                            <p>Hello! This is <strong>Cheetset</strong>.</p>
                            <p>When you get a job offer, the most important number is your <strong>Annual Salary</strong>. But if your offer is $50,000, you don't get $4,166 every month.</p>
                            <p>Taxes and insurance premiums are deducted first. Today, let's find out how to calculate your <strong>Real Take-Home Pay</strong>.</p>

                            <h2>1. Where Does My Money Go? (Deductions)</h2>
                            <p>Here are the common deductions in many countries (rates vary by location, this guide focuses on general principles and South Korean specifics as an example):</p>

                            <h3>1-1. National Pension</h3>
                            <p>Saving for retirement. Usually, the employer and employee split the cost.</p>

                            <h3>1-2. Health Insurance</h3>
                            <p>Medical insurance coverage. Essential for healthcare access.</p>

                            <h3>1-3. Income Tax</h3>
                            <p>The tax you pay to the government based on your income bracket. The more you earn, the higher the percentage.</p>

                            <h2>2. Calculate Instantly with Cheetset</h2>
                            <p>Don't struggle with complex tax tables. Use the <strong>Cheetset Salary Calculator</strong>.</p>

                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 Check My Take-Home Pay</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">Enter your salary and get instant results for taxes and net pay.</p>
                                <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">Go to Calculator →</a>
                            </div>

                            <h2>3. Why Net Salary Matters</h2>
                            <p>When negotiating a salary, always look at the <strong>Net Salary</strong> (after tax). This is the actual money you can spend or save.</p>
                            <p>Use our tool to plan your finances smartly!</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>2025年給与手取り計算機：私の手取りはいくら？</h1>
                            <p className="lead">年収300万、500万... 契約書の金額と実際に振り込まれる金額はなぜ違うのでしょうか？2025年の最新税率を適用した社会保険と税金を完全に分析します。</p>

                            <p>こんにちは！<strong>Cheetset</strong>です。</p>
                            <p>就職や転職で最も重要な条件の一つが<strong>年収</strong>です。しかし、「年収500万円」だからといって、毎月 500 ÷ 12 = 41.6万円 もらえるわけではありません。</p>
                            <p><strong>社会保険料</strong>と<strong>税金</strong>が引かれるからです。今日は、給料から引かれる項目を詳しく解説し、あなたの本当の手取り額を1秒で計算する方法をお教えします。</p>

                            <h2>1. 給料から引かれるもの（控除項目）</h2>

                            <h3>1-1. 厚生年金</h3>
                            <p>老後のための年金です。会社と従業員が折半して負担します。</p>

                            <h3>1-2. 健康保険</h3>
                            <p>医療費の負担を減らす保険です。これも会社と折半します。</p>

                            <h3>1-3. 雇用保険</h3>
                            <p>失業した際に手当を受け取るための保険です。</p>

                            <h3>1-4. 所得税・住民税</h3>
                            <p>国と地方自治体に納める税金です。年収や扶養家族の数によって決まります。</p>

                            <h2>2. 1秒で正確に計算する方法</h2>
                            <p>複雑な計算は不要です。<strong>Cheetset給与計算機</strong>を使えば、1秒で正確な金額がわかります。</p>

                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 私の手取りを確認する</p>
                                <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">年収を入力するだけで、税金、社会保険、手取り額が自動計算されます。</p>
                                <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">計算機へ →</a>
                            </div>

                            <h2>まとめ</h2>
                            <p>給与交渉や転職の際は、額面だけでなく<strong>手取り額</strong>を必ず計算してみてください。Cheetset計算機があなたの賢い資金計画をお手伝いします！</p>
                        </>
                    )}
                </article>
            </div>
        );
    }

    if (slug === 'stock-average-down-strategy') {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>주식 물타기 계산기 활용법: 손실을 수익으로 바꾸는 매수 전략</h1>
                            <p className="lead">"지금 사면 평단가 얼마나 낮아질까?" 감으로 물타기 하다가 비자발적 장기 투자자가 되셨나요? 정확한 계산과 전략만이 살길입니다.</p>

                            <p>안녕하세요! 스마트한 투자자의 친구 <strong>치트셋(Cheetset)</strong>입니다.</p>
                            <p>주식이나 코인 투자를 하다 보면 피할 수 없는 상황이 바로 <strong>'물림'</strong>입니다. 내가 사자마자 가격이 떨어지는 마법 같은 경험, 다들 있으시죠?</p>
                            <p>이때 많은 분들이 선택하는 전략이 바로 <strong>'물타기(Averaging Down)'</strong>입니다. 낮은 가격에 추가 매수하여 평균 단가를 낮추는 것이죠. 하지만 무턱대고 물을 타다가는 '한강 물'을 보게 될 수도 있습니다. 오늘은 성공적인 물타기를 위한 전략과 계산기 활용법을 알아보겠습니다.</p>

                            <h2>1. 물타기(Averaging Down)란?</h2>
                            <p>보유한 주식의 가격이 하락했을 때, 추가로 매수하여 평균 매입 단가를 낮추는 투자 기법입니다.</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    예시:<br />
                                    1. 10,000원에 1주 매수 (총 10,000원)<br />
                                    2. 5,000원으로 하락 시 1주 추가 매수 (총 15,000원 / 2주)<br />
                                    3. <strong>최종 평단가: 7,500원</strong>
                                </p>
                            </div>
                            <p>주가가 10,000원까지 회복하지 않아도, 7,500원만 넘으면 수익을 낼 수 있다는 것이 핵심입니다.</p>

                            <h2>2. 물타기의 3가지 원칙</h2>
                            <h3>원칙 #1: 분할 매수 (Split Buying)</h3>
                            <p>한 번에 모든 현금을 쏟아붓지 마세요. 바닥 밑에 지하실이 있을 수 있습니다. 자금을 3~4분할하여 계획적으로 접근해야 합니다.</p>

                            <h3>원칙 #2: 확실한 반등 신호</h3>
                            <p>떨어지는 칼날을 잡지 마세요. 하락세가 멈추고 지지선을 형성하거나 반등하는 기미가 보일 때 들어가는 것이 안전합니다.</p>

                            <h3>원칙 #3: 정확한 계산</h3>
                            <p>"이 정도 사면 꽤 낮아지겠지?"라는 감은 위험합니다. 정확히 몇 주를 사야 내 목표 평단가에 도달하는지 계산해야 합니다.</p>

                            <h2>3. 치트셋 물타기 계산기 활용법</h2>
                            <p>복잡한 수식 없이, 숫자만 입력하면 1초 만에 결과를 보여드립니다.</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 물타기 계산기 바로가기</p>
                                <p className="mb-4 text-sm text-green-600 dark:text-green-300">현재 보유량과 추가 매수량을 입력하여 최종 평단가를 확인하세요.</p>
                                <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">계산기 실행하기 →</a>
                            </div>

                            <h3>사용 시나리오</h3>
                            <ol>
                                <li><strong>현재 상태 입력:</strong> 보유 중인 주식의 평단가와 수량을 입력합니다.</li>
                                <li><strong>추가 매수 계획:</strong> 현재 시장 가격(또는 매수 희망가)과 가용 현금으로 살 수 있는 수량을 입력합니다.</li>
                                <li><strong>결과 확인:</strong> '계산하기'를 누르면 최종 평단가가 나옵니다.</li>
                                <li><strong>전략 수정:</strong> 목표 평단가가 너무 높다면, 추가 매수량을 늘리거나 더 낮은 가격을 기다려야 합니다.</li>
                            </ol>

                            <h2>4. 물타기 vs 불타기</h2>
                            <ul>
                                <li><strong>물타기 (Scale Trading):</strong> 손실 중일 때 평단가를 낮춤 (방어적)</li>
                                <li><strong>불타기 (Pyramiding):</strong> 수익 중일 때 추가 매수하여 수익금을 극대화 (공격적)</li>
                            </ul>
                            <p>우리 계산기는 두 가지 경우 모두 사용할 수 있습니다. 불타기 시에는 평단가가 높아지지만, 상승 추세가 확실하다면 수익금을 크게 늘릴 수 있습니다.</p>

                            <h2>마치며</h2>
                            <p>물타기는 '신의 한 수'가 될 수도, '악수'가 될 수도 있습니다. 중요한 것은 <strong>계획된 매매</strong>입니다. 치트셋 계산기와 함께 감정을 배제하고 숫자로 투자하세요. 여러분의 성투를 기원합니다! 📈</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>Stock Average Down Strategy: How to Turn Losses into Profits</h1>
                            <p className="lead">Bought high and the price dropped? Don't panic. Learn how to use the "Averaging Down" strategy to lower your break-even price and recover faster.</p>

                            <p>Hello! This is <strong>Cheetset</strong>.</p>
                            <p>Every investor faces a moment when their stock drops immediately after buying. It's painful, but it's part of the game.</p>
                            <p>A common strategy to handle this is <strong>Averaging Down</strong>. By buying more shares at a lower price, you lower your average cost per share. Today, let's master this strategy.</p>

                            <h2>1. What is Averaging Down?</h2>
                            <p>It involves purchasing additional shares of an asset you already own after its price has dropped.</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    Example:<br />
                                    1. Buy 1 share at $100 (Total $100)<br />
                                    2. Price drops to $50. Buy 1 more share. (Total $150 / 2 shares)<br />
                                    3. <strong>New Average Price: $75</strong>
                                </p>
                            </div>
                            <p>Now, the stock only needs to rise to $75 (not $100) for you to break even.</p>

                            <h2>2. The Golden Rules</h2>
                            <h3>Rule #1: Don't Catch a Falling Knife</h3>
                            <p>Wait for the price to stabilize. Buying while it's crashing is dangerous.</p>

                            <h3>Rule #2: Manage Your Cash</h3>
                            <p>Don't use all your cash at once. Split your budget into 3-4 parts for multiple buy-ins.</p>

                            <h3>Rule #3: Calculate First</h3>
                            <p>Don't guess. Use a calculator to see exactly how many shares you need to buy to reach your target average price.</p>

                            <h2>3. Use the Cheetset Calculator</h2>
                            <p>We built a simple tool to help you plan your trades.</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 Stock Average Calculator</p>
                                <p className="mb-4 text-sm text-green-600 dark:text-green-300">Instantly calculate your new average price.</p>
                                <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">Open Calculator →</a>
                            </div>

                            <h2>4. Conclusion</h2>
                            <p>Averaging down is a powerful tool if used correctly. Always plan your trade and trade your plan. Good luck! 🚀</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>株式ナンピン計算機活用法：損失を利益に変える買い増し戦略</h1>
                            <p className="lead">「今買えば平均単価はどれくらい下がる？」勘でナンピン買いをして塩漬け株を作っていませんか？正確な計算と戦略だけが生き残る道です。</p>

                            <p>こんにちは！賢い投資家の味方、<strong>Cheetset</strong>です。</p>
                            <p>株や仮想通貨への投資で避けられないのが<strong>「含み損」</strong>です。買った瞬間に下がる...よくある話ですよね。</p>
                            <p>この時、多くの人が選ぶ戦略が<strong>「ナンピン買い（難平買い）」</strong>です。安い価格で買い増しして、平均取得単価を下げる手法です。しかし、無計画なナンピンは損失を拡大させるだけです。今日は成功するナンピン戦略と計算機の使い方を解説します。</p>

                            <h2>1. ナンピン買いとは？</h2>
                            <p>保有している株価が下がった時に、追加で購入して平均単価を下げることです。</p>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                                <p className="font-mono text-sm">
                                    例:<br />
                                    1. 1,000円で1株購入（計1,000円）<br />
                                    2. 500円に下落。1株追加購入（計1,500円 / 2株）<br />
                                    3. <strong>新しい平均単価: 750円</strong>
                                </p>
                            </div>
                            <p>株価が1,000円まで戻らなくても、750円を超えれば利益が出ます。</p>

                            <h2>2. ナンピンの3原則</h2>
                            <h3>原則 #1: 分割売買</h3>
                            <p>資金を一気に投入しないでください。底だと思ってもさらに下がることがあります。資金を3〜4回に分けて投入しましょう。</p>

                            <h3>原則 #2: 落ちるナイフをつかむな</h3>
                            <p>下落中は買わないでください。下げ止まって反発の兆しが見えた時がチャンスです。</p>

                            <h3>原則 #3: 正確な計算</h3>
                            <p>「これくらい買えば下がるだろう」という勘は危険です。目標の単価にするために何株必要なのか、正確に計算しましょう。</p>

                            <h2>3. Cheetset計算機の使い方</h2>
                            <p>複雑な計算式は不要です。数字を入力するだけで1秒で結果が出ます。</p>

                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                                <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 ナンピン計算機へ</p>
                                <p className="mb-4 text-sm text-green-600 dark:text-green-300">現在の保有量と追加購入量を入力して、最終的な平均単価を確認してください。</p>
                                <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">計算機を起動 →</a>
                            </div>

                            <h2>まとめ</h2>
                            <p>ナンピンは諸刃の剣です。重要なのは<strong>計画的な売買</strong>です。Cheetset計算機を使って、感情を排して数字で投資しましょう。皆さんの成功を祈ります！📈</p>
                        </>
                    )}
                </article>
            </div>
        );
    }
}
