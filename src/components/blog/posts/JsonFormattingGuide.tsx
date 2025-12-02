import React from 'react';

type Props = {
    lang: string;
};

export default function JsonFormattingGuide({ lang }: Props) {
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
