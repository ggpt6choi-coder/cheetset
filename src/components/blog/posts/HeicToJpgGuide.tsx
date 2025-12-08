import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function HeicToJpgGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>HEIC JPG 변환 방법: 아이폰 사진 윈도우에서 안 열릴 때 해결법</h1>
                        <p className="lead">아이폰으로 찍은 사진이 윈도우 PC에서 열리지 않아 당황하셨나요? HEIC 파일의 정체와 이를 가장 쉽고 빠르게 JPG로 변환하는 방법을 알려드립니다.</p>

                        <h2>HEIC 파일이란 무엇인가요?</h2>
                        <p>
                            HEIC(High Efficiency Image Container)는 Apple이 iOS 11부터 도입한 이미지 포맷입니다.
                            이름에서 알 수 있듯이 <strong>고효율</strong>이 특징입니다.
                            동일한 화질의 JPG 파일보다 용량이 약 50% 정도 작아서, 아이폰의 저장 공간을 절약하는 데 큰 도움을 줍니다.
                        </p>
                        <p>
                            하지만 치명적인 단점이 있습니다. 바로 <strong>호환성</strong>입니다.
                            Windows 기본 뷰어나 구형 안드로이드 폰, 그리고 일부 웹사이트에서는 HEIC 파일을 지원하지 않습니다.
                            그래서 관공서나 회사에 사진을 제출할 때 "JPG로 다시 보내주세요"라는 요청을 받곤 하죠.
                        </p>

                        <h2>HEIC를 JPG로 변환하는 3가지 방법</h2>

                        <h3>1. 카카오톡으로 나에게 보내기 (비추천)</h3>
                        <p>
                            가장 흔하게 쓰는 방법입니다. 카카오톡 설정에서 '사진 화질'을 '원본'이 아닌 '일반 화질'로 설정하고 나에게 보내면 JPG로 변환됩니다.
                            하지만 이 방법은 <strong>화질 저하</strong>가 발생하고, 사진이 많을 경우 매우 번거롭습니다.
                        </p>

                        <h3>2. 윈도우 확장 프로그램 설치 (유료 가능성)</h3>
                        <p>
                            Microsoft Store에서 HEIF Image Extensions를 설치할 수 있습니다.
                            하지만 코덱 문제로 인해 유료($0.99) 결제를 유도하는 경우가 많아 짜증을 유발하기도 합니다.
                        </p>

                        <h3>3. 무료 온라인 변환기 사용 (추천)</h3>
                        <p>
                            프로그램 설치 없이, 화질 저하 없이, 가장 빠르게 변환하는 방법은 온라인 변환 도구를 사용하는 것입니다.
                            CheetSet의 <strong>이미지 변환기</strong>를 사용해보세요.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">🚀 3초 만에 변환하기</h3>
                            <ol className="mb-0">
                                <li><Link href="/ko/tools/image-converter">이미지 변환기 도구</Link>로 이동합니다.</li>
                                <li>HEIC 사진을 드래그하여 업로드합니다. (여러 장 동시 가능)</li>
                                <li>'JPG' 포맷을 선택하고 <strong>변환하기</strong>를 누릅니다.</li>
                                <li>변환된 이미지를 다운로드합니다. 끝!</li>
                            </ol>
                        </div>

                        <h2>CheetSet 이미지 변환기의 장점</h2>
                        <ul>
                            <li><strong>개인정보 보호</strong>: 서버에 이미지를 저장하지 않고 즉시 처리하거나, 안전하게 변환 후 자동 삭제됩니다.</li>
                            <li><strong>대용량 지원</strong>: 여러 장의 사진을 한 번에 변환하고 ZIP 파일로 묶어서 다운로드할 수 있습니다.</li>
                            <li><strong>다양한 포맷</strong>: JPG뿐만 아니라 PNG, WEBP로도 변환이 가능합니다.</li>
                        </ul>

                        <p>
                            이제 아이폰 사진 호환성 문제로 스트레스 받지 마세요.
                            <Link href="/ko/tools/image-converter">무료 이미지 변환기</Link>를 즐겨찾기 해두시면 언제든 편리하게 사용할 수 있습니다.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to Convert HEIC to JPG for Free (iPhone Photos to Windows)</h1>
                        <p className="lead">Frustrated because your iPhone photos won't open on Windows? Learn what HEIC is and the easiest way to convert it to JPG.</p>

                        <h2>What is an HEIC file?</h2>
                        <p>
                            HEIC (High Efficiency Image Container) is an image format adopted by Apple since iOS 11.
                            As the name suggests, it is highly <strong>efficient</strong>.
                            It takes up about 50% less space than a JPG file of the same quality, helping to save storage space on your iPhone.
                        </p>
                        <p>
                            However, it has a fatal flaw: <strong>Compatibility</strong>.
                            Windows default viewers, older Android phones, and some websites do not support HEIC files.
                            That's why you often get asked to "please resend as JPG" when submitting photos.
                        </p>

                        <h2>3 Ways to Convert HEIC to JPG</h2>

                        <h3>1. Emailing to Yourself (Not Recommended)</h3>
                        <p>
                            You can email the photos to yourself. Most mail apps will convert them to JPG automatically.
                            However, this is <strong>slow</strong> and inconvenient if you have many photos.
                        </p>

                        <h3>2. Installing Windows Extensions (Potentially Paid)</h3>
                        <p>
                            You can install HEIF Image Extensions from the Microsoft Store.
                            However, it often requires a paid codec ($0.99), which can be annoying.
                        </p>

                        <h3>3. Using a Free Online Converter (Recommended)</h3>
                        <p>
                            The fastest way to convert without installing software is to use an online tool.
                            Try CheetSet's <strong>Image Converter</strong>.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">🚀 Convert in 3 Seconds</h3>
                            <ol className="mb-0">
                                <li>Go to the <Link href="/en/tools/image-converter">Image Converter Tool</Link>.</li>
                                <li>Drag and drop your HEIC photos. (Multiple files supported)</li>
                                <li>Select 'JPG' format and click <strong>Convert</strong>.</li>
                                <li>Download your images. Done!</li>
                            </ol>
                        </div>

                        <h2>Why Use CheetSet Image Converter?</h2>
                        <ul>
                            <li><strong>Privacy</strong>: We process images securely and do not store them permanently.</li>
                            <li><strong>Bulk Conversion</strong>: Convert multiple photos at once and download them as a ZIP file.</li>
                            <li><strong>Various Formats</strong>: Convert to PNG and WEBP as well as JPG.</li>
                        </ul>

                        <p>
                            Don't stress about iPhone photo compatibility anymore.
                            Bookmark our <Link href="/en/tools/image-converter">Free Image Converter</Link> and use it whenever you need it.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>HEIC JPG 変換方法：iPhoneの写真がWindowsで開かない時の解決策</h1>
                        <p className="lead">iPhoneで撮った写真がWindowsで開かなくて困っていませんか？HEICファイルの正体と、それを最も簡単かつ迅速にJPGに変換する方法を紹介します。</p>

                        <h2>HEICファイルとは？</h2>
                        <p>
                            HEIC（High Efficiency Image Container）は、AppleがiOS 11から導入した画像フォーマットです。
                            その名の通り、<strong>高効率</strong>が特徴です。
                            同じ画質のJPGファイルよりも容量が約50％小さく、iPhoneの保存容量を節約するのに大いに役立ちます。
                        </p>
                        <p>
                            しかし、致命的な欠点があります。それは<strong>互換性</strong>です。
                            Windowsの標準ビューアーや古いAndroidスマホ、そして一部のWebサイトではHEICファイルをサポートしていません。
                            そのため、写真を提出する際に「JPGで再送してください」と言われることがよくあります。
                        </p>

                        <h2>HEICをJPGに変換する3つの方法</h2>

                        <h3>1. メールで自分に送る（非推奨）</h3>
                        <p>
                            写真を自分宛てにメールで送ると、多くの場合自動的にJPGに変換されます。
                            しかし、この方法は<strong>画質が低下</strong>する可能性があり、写真が多い場合は非常に面倒です。
                        </p>

                        <h3>2. Windows拡張機能のインストール（有料の可能性）</h3>
                        <p>
                            Microsoft StoreからHEIF Image Extensionsをインストールできます。
                            しかし、コーデックの問題で有料（$0.99）の支払いを求められることがあり、イライラすることがあります。
                        </p>

                        <h3>3. 無料オンライン変換機の使用（推奨）</h3>
                        <p>
                            ソフトをインストールせず、画質を落とさずに最速で変換する方法は、オンラインツールを使用することです。
                            CheetSetの<strong>画像変換機</strong>を試してみてください。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">🚀 3秒で変換</h3>
                            <ol className="mb-0">
                                <li><Link href="/ja/tools/image-converter">画像変換機ツール</Link>に移動します。</li>
                                <li>HEIC写真をドラッグしてアップロードします。（複数枚同時可能）</li>
                                <li>「JPG」形式を選択し、<strong>変換</strong>をクリックします。</li>
                                <li>変換された画像をダウンロードします。完了！</li>
                            </ol>
                        </div>

                        <h2>CheetSet画像変換機のメリット</h2>
                        <ul>
                            <li><strong>プライバシー保護</strong>：画像をサーバーに永続的に保存することなく、安全に処理します。</li>
                            <li><strong>一括変換</strong>：複数の写真を一度に変換し、ZIPファイルとしてまとめてダウンロードできます。</li>
                            <li><strong>多様なフォーマット</strong>：JPGだけでなく、PNG、WEBPへの変換も可能です。</li>
                        </ul>

                        <p>
                            もうiPhoneの写真の互換性問題でストレスを感じる必要はありません。
                            <Link href="/ja/tools/image-converter">無料画像変換機</Link>をブックマークしておけば、いつでも便利に使えます。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
