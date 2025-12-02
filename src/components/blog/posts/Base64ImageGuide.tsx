import React from 'react';

type Props = {
    lang: string;
};

export default function Base64ImageGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>이미지 Base64 변환 완벽 가이드: 장단점과 사용법</h1>
                        <p className="lead">이미지를 Base64로 변환하면 무엇이 좋을까요? 웹 성능에 미치는 영향과 언제 사용해야 하는지, 그리고 무료 변환 도구 사용법까지 알려드립니다.</p>

                        <p>안녕하세요! <strong>치트셋(Cheetset)</strong>입니다.</p>
                        <p>웹 개발을 하다 보면 이미지를 파일 경로(URL)가 아닌, 엄청나게 긴 문자열로 처리해야 할 때가 있습니다. 바로 <strong>Base64 인코딩</strong>입니다.</p>
                        <p><code>data:image/png;base64,iVBORw0KGgo...</code> 처럼 시작하는 이 이상한 문자열은 도대체 왜 쓰는 걸까요? 오늘은 Base64 이미지의 장단점과 올바른 사용 전략을 알아보겠습니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Base64 이미지란?</h2>
                        <p>Base64는 바이너리 데이터(이미지, 오디오 등)를 64개의 문자(A-Z, a-z, 0-9, +, /)로 이루어진 텍스트로 변환하는 방식입니다.</p>
                        <p>쉽게 말해, <strong>이미지 파일을 텍스트로 바꿔서 HTML이나 CSS 코드 안에 직접 넣어버리는 기술</strong>입니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. 왜 사용할까요? (장점)</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-1. HTTP 요청 감소</h3>
                        <p>웹 페이지가 로딩될 때, 이미지가 10개 있다면 브라우저는 서버에 10번의 요청을 보내야 합니다. 하지만 Base64로 이미지를 코드에 포함시키면, 별도의 요청 없이 HTML과 함께 한 번에 로딩됩니다.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-2. 깜빡임 없는 렌더링</h3>
                        <p>이미지가 로딩되기 전까지 빈 화면이 보이는 현상을 방지할 수 있습니다. 아주 작은 아이콘이나 로고, 배경 패턴 등에 유용합니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. 주의할 점 (단점)</h2>
                        <p>하지만 무조건 좋은 것은 아닙니다. 치명적인 단점도 있습니다.</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>용량 증가:</strong> Base64로 변환하면 원본 파일보다 용량이 약 <strong>33% 커집니다</strong>.</li>
                            <li><strong>캐싱 불가:</strong> 별도 파일이 아니기 때문에 브라우저 캐시를 활용하기 어렵습니다. HTML이 바뀔 때마다 이미지도 다시 다운로드해야 합니다.</li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
                            <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 결론</p>
                            <p className="mt-2">작은 아이콘(10KB 미만)에는 <strong>Base64</strong>를, 큰 사진에는 <strong>일반 이미지 파일</strong>을 사용하는 것이 좋습니다.</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. 1초 만에 변환하는 방법</h2>
                        <p>복잡한 코딩 없이, 치트셋의 무료 도구를 사용해 보세요.</p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">이미지 &rarr; Base64</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">이미지 파일을 드래그해서 Base64 코드를 얻으세요.</p>
                                <a href={`/${lang}/tools/image-to-base64`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-sm">변환하기</a>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">Base64 &rarr; 이미지</h3>
                                <p className="text-sm text-green-600 dark:text-green-300 mb-4">Base64 코드를 다시 이미지 파일로 저장하세요.</p>
                                <a href={`/${lang}/tools/base64-to-image`} className="inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-sm">디코딩하기</a>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                        <p>적재적소에 Base64를 활용하면 웹 성능을 최적화할 수 있습니다. <strong>치트셋</strong>과 함께 더 스마트한 개발자가 되어보세요!</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>What is Base64 Image Encoding? Complete Guide & Converter Tool</h1>
                        <p className="lead">Why use Base64 for images? Learn the pros and cons of embedding images as Base64 strings and how to use our free converter tool.</p>

                        <p>Hello! This is <strong>Cheetset</strong>.</p>
                        <p>In web development, you sometimes encounter images represented not as file URLs, but as incredibly long strings of text. This is <strong>Base64 Encoding</strong>.</p>
                        <p>Why do we use these strings starting with <code>data:image/png;base64,...</code>? Today, we'll explore the pros, cons, and best practices for Base64 images.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. What is Base64 Image?</h2>
                        <p>Base64 converts binary data (like images) into a text string using 64 characters (A-Z, a-z, 0-9, +, /).</p>
                        <p>Simply put, it turns an <strong>image file into text</strong> so you can embed it directly into HTML or CSS.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Why Use It? (Pros)</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-1. Fewer HTTP Requests</h3>
                        <p>Normally, browsers fetch each image from the server. By embedding Base64 images, you reduce the number of requests, speeding up the initial load.</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-2. No Flickering</h3>
                        <p>Images load instantly with the HTML, preventing the "flash of invisible content" or layout shifts.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. Watch Out (Cons)</h2>
                        <p>It's not a magic bullet. There are downsides:</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>Larger Size:</strong> Base64 strings are about <strong>33% larger</strong> than the original binary file.</li>
                            <li><strong>No Caching:</strong> Since it's part of the HTML, the browser can't cache the image separately.</li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
                            <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 Verdict</p>
                            <p className="mt-2">Use <strong>Base64</strong> for small icons (under 10KB). Use <strong>Standard Files</strong> for photos and large images.</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. Convert Instantly</h2>
                        <p>Try our free tools to convert between Images and Base64 strings.</p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">Image &rarr; Base64</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">Drag & drop to get your Base64 code.</p>
                                <a href={`/${lang}/tools/image-to-base64`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-sm">Convert Now</a>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">Base64 &rarr; Image</h3>
                                <p className="text-sm text-green-600 dark:text-green-300 mb-4">Decode Base64 strings back to image files.</p>
                                <a href={`/${lang}/tools/base64-to-image`} className="inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-sm">Decode Now</a>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                        <p>Using Base64 wisely can optimize your site's performance. Happy coding with <strong>Cheetset</strong>!</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>画像Base64変換完全ガイド：メリット・デメリットと使い方</h1>
                        <p className="lead">画像をBase64に変換する理由とは？Webパフォーマンスへの影響や使いどころ、そして無料変換ツールの使い方まで解説します。</p>

                        <p>こんにちは！<strong>Cheetset</strong>です。</p>
                        <p>Web開発をしていると、画像ファイルのURLではなく、非常に長い文字列を目にすることがあります。これが<strong>Base64エンコーディング</strong>です。</p>
                        <p><code>data:image/png;base64,...</code> で始まるこの文字列は一体何のためにあるのでしょうか？今日はBase64画像のメリット・デメリットと正しい使い方を解説します。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. Base64画像とは？</h2>
                        <p>Base64は、バイナリデータ（画像など）を64種類の文字（A-Z, a-z, 0-9, +, /）で構成されるテキストに変換する方式です。</p>
                        <p>簡単に言えば、<strong>画像ファイルをテキストに変えて、HTMLやCSSコードの中に直接埋め込む技術</strong>です。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. なぜ使うのか？（メリット）</h2>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-1. HTTPリクエストの削減</h3>
                        <p>通常、画像を表示するにはサーバーへのリクエストが必要です。Base64を使えば、HTMLと一緒に一度に読み込まれるため、リクエスト数を減らして表示速度を上げることができます。</p>
                        <h3 className="text-xl font-semibold mt-6 mb-2">2-2. チラつき防止</h3>
                        <p>画像が読み込まれるまでの一瞬の空白を防ぐことができます。小さなアイコンやロゴに最適です。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">3. 注意点（デメリット）</h2>
                        <p>良いことばかりではありません。</p>
                        <ul className="list-disc pl-6 mb-4">
                            <li><strong>容量増加:</strong> Base64に変換すると、元のファイルより容量が約<strong>33%増加</strong>します。</li>
                            <li><strong>キャッシュ不可:</strong> HTMLの一部となるため、ブラウザが画像を個別にキャッシュできません。</li>
                        </ul>
                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg my-6">
                            <p className="font-bold text-yellow-800 dark:text-yellow-200">💡 結論</p>
                            <p className="mt-2">小さなアイコン（10KB未満）には<strong>Base64</strong>を、大きな写真には<strong>通常の画像ファイル</strong>を使うのが賢明です。</p>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">4. 1秒で変換する方法</h2>
                        <p>Cheetsetの無料ツールを使って、簡単に変換してみましょう。</p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">画像 &rarr; Base64</h3>
                                <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">画像をドラッグしてBase64コードを取得。</p>
                                <a href={`/${lang}/tools/image-to-base64`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-sm">変換する</a>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg text-center">
                                <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">Base64 &rarr; 画像</h3>
                                <p className="text-sm text-green-600 dark:text-green-300 mb-4">Base64コードを画像ファイルに戻します。</p>
                                <a href={`/${lang}/tools/base64-to-image`} className="inline-block px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-sm">デコードする</a>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">まとめ</h2>
                        <p>Base64を適切に使えば、Webサイトのパフォーマンスを向上させることができます。<strong>Cheetset</strong>と一緒にスマートな開発を！</p>
                    </>
                )}
            </article>
        </div>
    );
}
