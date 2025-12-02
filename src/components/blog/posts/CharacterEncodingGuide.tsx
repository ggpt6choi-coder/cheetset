import React from 'react';

type Props = {
    lang: string;
};

export default function CharacterEncodingGuide({ lang }: Props) {
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
