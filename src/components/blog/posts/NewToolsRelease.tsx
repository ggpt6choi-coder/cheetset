import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function NewToolsRelease({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>신규 도구 출시: JSON 비교 & 컬러 팔레트 추출기</h1>
                        <p className="lead">개발자와 디자이너를 위한 강력한 도구 2종이 추가되었습니다. API 디버깅을 위한 JSON 비교 도구와 디자인 영감을 주는 컬러 팔레트 추출기를 만나보세요.</p>

                        <p>안녕하세요! <strong>치트셋(Cheatset)</strong>입니다.</p>
                        <p>여러분의 생산성을 높이기 위해 오늘 두 가지 새로운 도구를 출시했습니다. 개발자를 위한 <strong>JSON Diff</strong>와 디자이너를 위한 <strong>컬러 팔레트 추출기</strong>입니다.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. JSON Diff (JSON 비교 도구)</h2>
                        <p>API 응답이 예상과 다르거나, 설정 파일이 변경되었을 때 두 JSON 데이터를 비교하는 것은 매우 번거로운 일입니다. 이제 <strong>JSON Diff</strong>로 한눈에 차이점을 확인하세요.</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">주요 기능:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>시각적 비교:</strong> 추가된 부분은 <span className="text-green-600 font-bold">초록색</span>, 삭제된 부분은 <span className="text-red-600 font-bold">빨간색</span>으로 표시됩니다.</li>
                                <li><strong>Relaxed JSON 지원:</strong> 따옴표가 없는 키(<code>&#123; key: value &#125;</code>)나 마지막 콤마(Trailing Comma)가 있어도 문제없이 인식합니다.</li>
                                <li><strong>자동 포맷팅:</strong> 입력창에서 포커스를 잃으면 자동으로 JSON을 예쁘게 정렬해줍니다.</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/json-diff`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">
                                    JSON 비교 도구 바로가기
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Color Palette Generator (컬러 팔레트 추출기)</h2>
                        <p>마음에 드는 이미지의 색상 조합을 알고 싶으신가요? <strong>컬러 팔레트 추출기</strong>를 사용하면 이미지에서 가장 지배적인 색상들을 추출하여 나만의 팔레트를 만들 수 있습니다.</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">주요 기능:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>간편한 업로드:</strong> 이미지를 드래그 앤 드롭하거나 클릭하여 업로드하세요.</li>
                                <li><strong>주요 색상 추출:</strong> 이미지의 분위기를 결정하는 6가지 핵심 색상을 분석합니다.</li>
                                <li><strong>원클릭 복사:</strong> 색상 코드를 클릭하면 HEX 코드(<code>#FFFFFF</code>)가 즉시 복사됩니다. RGB 값도 함께 제공됩니다.</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/color-palette`} className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors font-bold text-lg shadow-lg">
                                    컬러 팔레트 추출기 바로가기
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">마치며</h2>
                        <p>치트셋은 앞으로도 여러분의 업무 효율을 높여줄 다양한 도구를 계속해서 추가할 예정입니다. 필요한 도구가 있다면 언제든 제안해주세요!</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>New Tools Released: JSON Diff & Color Palette Generator</h1>
                        <p className="lead">We've added two powerful tools for developers and designers. Check out the new JSON Diff tool for debugging and the Color Palette Generator for design inspiration.</p>

                        <p>Hello! This is <strong>Cheetset</strong>.</p>
                        <p>To boost your productivity, we are excited to announce the release of two new tools today: <strong>JSON Diff</strong> for developers and <strong>Color Palette Generator</strong> for designers.</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. JSON Diff</h2>
                        <p>Comparing two JSON objects to find differences in API responses or configuration files can be a headache. With <strong>JSON Diff</strong>, you can spot changes instantly.</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">Key Features:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Visual Comparison:</strong> Additions are highlighted in <span className="text-green-600 font-bold">Green</span>, and deletions in <span className="text-red-600 font-bold">Red</span>.</li>
                                <li><strong>Relaxed JSON Support:</strong> Works perfectly even with unquoted keys (<code>&#123; key: value &#125;</code>) or trailing commas.</li>
                                <li><strong>Auto-Formatting:</strong> Automatically prettifies your JSON input when you click away.</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/json-diff`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">
                                    Try JSON Diff
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Color Palette Generator</h2>
                        <p>Want to know the color scheme of an image you love? The <strong>Color Palette Generator</strong> extracts dominant colors from any image to help you create beautiful palettes.</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">Key Features:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>Easy Upload:</strong> Drag & drop or click to upload your image.</li>
                                <li><strong>Dominant Colors:</strong> Extracts the 6 key colors that define the image's mood.</li>
                                <li><strong>One-Click Copy:</strong> Click any color swatch to copy the HEX code (<code>#FFFFFF</code>). RGB values are also provided.</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/color-palette`} className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors font-bold text-lg shadow-lg">
                                    Try Color Palette Generator
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">Conclusion</h2>
                        <p>Cheetset will continue to add more tools to improve your workflow. If you have any tool requests, feel free to let us know!</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>新ツール公開：JSON比較 & カラーパレット抽出機</h1>
                        <p className="lead">開発者とデザイナーのための強力なツール2種が追加されました。APIデバッグのためのJSON比較ツールと、デザインのインスピレーションを与えるカラーパレット抽出機をご覧ください。</p>

                        <p>こんにちは！<strong>Cheetset</strong>です。</p>
                        <p>皆様の生産性を向上させるため、本日2つの新しいツールを公開しました。開発者向けの<strong>JSON Diff</strong>と、デザイナー向けの<strong>カラーパレット抽出機</strong>です。</p>

                        <h2 className="text-2xl font-bold mt-8 mb-4">1. JSON Diff (JSON比較ツール)</h2>
                        <p>APIレスポンスが予想と異なったり、設定ファイルが変更されたりした際に、2つのJSONデータを比較するのは非常に面倒です。これからは<strong>JSON Diff</strong>で一目で違いを確認しましょう。</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">主な機能:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>視覚的な比較:</strong> 追加された部分は<span className="text-green-600 font-bold">緑色</span>、削除された部分は<span className="text-red-600 font-bold">赤色</span>で表示されます。</li>
                                <li><strong>Relaxed JSON対応:</strong> クォートのないキー(<code>&#123; key: value &#125;</code>)や末尾のカンマ(Trailing Comma)があっても問題なく認識します。</li>
                                <li><strong>自動整形:</strong> 入力欄からフォーカスが外れると、自動的にJSONをきれいに整形します。</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/json-diff`} className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors font-bold text-lg shadow-lg">
                                    JSON比較ツールを試す
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">2. Color Palette Generator (カラーパレット抽出機)</h2>
                        <p>気に入った画像の配色を知りたいですか？<strong>カラーパレット抽出機</strong>を使えば、画像から最も支配的な色を抽出して、あなただけのパレットを作成できます。</p>

                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg my-6">
                            <h3 className="text-lg font-bold mb-2">主な機能:</h3>
                            <ul className="list-disc pl-6 mb-4">
                                <li><strong>簡単なアップロード:</strong> 画像をドラッグ＆ドロップするか、クリックしてアップロードしてください。</li>
                                <li><strong>主要色の抽出:</strong> 画像の雰囲気を決定する6つの主要な色を分析します。</li>
                                <li><strong>ワンクリックコピー:</strong> 色のコードをクリックすると、HEXコード(<code>#FFFFFF</code>)が即座にコピーされます。RGB値も提供されます。</li>
                            </ul>
                            <div className="text-center mt-6">
                                <Link href={`/${lang}/tools/color-palette`} className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors font-bold text-lg shadow-lg">
                                    カラーパレット抽出機を試す
                                </Link>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mt-8 mb-4">まとめ</h2>
                        <p>Cheetsetは今後も皆様の業務効率を高める様々なツールを追加していく予定です。必要なツールがあれば、いつでもご提案ください！</p>
                    </>
                )}
            </article>
        </div>
    );
}
