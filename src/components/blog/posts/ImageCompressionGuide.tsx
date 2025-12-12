import React from 'react';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Zap, Shield } from 'lucide-react';

type Props = {
    lang: string;
};

export default function ImageCompressionGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>이미지 용량 줄이기: 화질 저하 없이 압축하는 방법</h1>
                        <p className="lead">
                            웹사이트 속도 향상과 저장 공간 절약을 위해 이미지 압축은 필수입니다. 화질을 유지하면서 파일 크기를 획기적으로 줄이는 방법을 알아보세요.
                        </p>

                        <div className="my-8 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <h3 className="flex items-center gap-2 text-sky-800 dark:text-sky-200 mt-0">
                                <Zap className="w-6 h-6" />
                                지금 바로 압축해보세요
                            </h3>
                            <p className="mb-4 text-sky-900 dark:text-sky-100">
                                별도의 프로그램 설치 없이 브라우저에서 바로 이미지를 압축할 수 있습니다.
                            </p>
                            <Link
                                href="/ko/tools/image-compressor"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <ImageIcon className="w-5 h-5" />
                                이미지 압축기 바로가기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>왜 이미지 압축이 필요한가요?</h2>
                        <p>
                            고화질 이미지는 시각적으로 보기 좋지만, 파일 크기가 커서 웹사이트 로딩 속도를 느리게 만드는 주범이 됩니다.
                            로딩 속도가 느려지면 사용자 경험(UX)이 나빠지고, 검색 엔진 최적화(SEO)에도 악영향을 미칩니다.
                        </p>
                        <ul>
                            <li><strong>웹사이트 속도 향상:</strong> 가벼운 이미지는 더 빨리 로드됩니다.</li>
                            <li><strong>데이터 절약:</strong> 모바일 사용자의 데이터 소모를 줄여줍니다.</li>
                            <li><strong>SEO 개선:</strong> 구글은 빠른 사이트를 선호합니다.</li>
                        </ul>

                        <h2>손실 압축 vs 무손실 압축</h2>
                        <p>
                            이미지 압축에는 크게 두 가지 방식이 있습니다.
                        </p>
                        <ul>
                            <li>
                                <strong>무손실 압축 (Lossless):</strong> 화질을 전혀 손상시키지 않고 불필요한 메타데이터만 제거합니다. 용량 감소폭이 작습니다.
                            </li>
                            <li>
                                <strong>손실 압축 (Lossy):</strong> 사람이 인지하기 어려운 수준에서 화질을 약간 낮추어 용량을 대폭 줄입니다. 웹용 이미지에 적합합니다.
                            </li>
                        </ul>
                        <p>
                            치트셋의 <Link href="/ko/tools/image-compressor">이미지 압축기</Link>는 효율적인 손실 압축 방식을 사용하여, 눈으로 보기엔 차이가 없으면서도 용량을 최대 80-90%까지 줄여줍니다.
                        </p>

                        <h2>안전한 클라이언트 사이드 변환</h2>
                        <div className="flex items-start gap-4 not-prose p-6 bg-gray-50 dark:bg-gray-800 rounded-xl my-8">
                            <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">서버로 전송되지 않습니다</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    많은 온라인 도구들이 이미지를 서버로 업로드하여 처리하지만, 치트셋의 도구는 여러분의 브라우저(Client-side)에서 직접 작동합니다.
                                    따라서 개인적인 사진이나 중요한 문서도 안심하고 압축할 수 있습니다.
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to Compress Images Without Losing Quality</h1>
                        <p className="lead">
                            Image compression is essential for faster websites and saving storage. Learn how to drastically reduce file size while maintaining quality.
                        </p>

                        <div className="my-8 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <h3 className="flex items-center gap-2 text-sky-800 dark:text-sky-200 mt-0">
                                <Zap className="w-6 h-6" />
                                Try It Now
                            </h3>
                            <p className="mb-4 text-sky-900 dark:text-sky-100">
                                Compress images directly in your browser without installing any software.
                            </p>
                            <Link
                                href="/en/tools/image-compressor"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <ImageIcon className="w-5 h-5" />
                                Go to Image Compressor
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>Why Compress Images?</h2>
                        <p>
                            High-quality images look great but can slow down your website significantly due to large file sizes.
                            Slow loading speeds degrade User Experience (UX) and negatively impact Search Engine Optimization (SEO).
                        </p>
                        <ul>
                            <li><strong>Faster Loading:</strong> Lighter images load instantly.</li>
                            <li><strong>Save Data:</strong> Reduces data usage for mobile users.</li>
                            <li><strong>Better SEO:</strong> Google prefers faster websites.</li>
                        </ul>

                        <h2>Lossy vs. Lossless Compression</h2>
                        <p>
                            There are two main types of image compression:
                        </p>
                        <ul>
                            <li>
                                <strong>Lossless:</strong> Reduces file size by removing metadata without affecting image quality. The reduction is minimal.
                            </li>
                            <li>
                                <strong>Lossy:</strong> Significantly reduces file size by slightly lowering quality in ways invisible to the human eye. Ideal for web use.
                            </li>
                        </ul>
                        <p>
                            Cheetset's <Link href="/en/tools/image-compressor">Image Compressor</Link> uses efficient lossy compression to reduce file size by up to 80-90% with no visible difference.
                        </p>

                        <h2>Secure Client-Side Processing</h2>
                        <div className="flex items-start gap-4 not-prose p-6 bg-gray-50 dark:bg-gray-800 rounded-xl my-8">
                            <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Server Uploads</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Unlike many online tools that upload your images to a server, Cheetset's tool works directly in your browser (Client-side).
                                    This means you can safely compress personal photos or sensitive documents.
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>画質を落とさずに画像の容量を減らす方法</h1>
                        <p className="lead">
                            ウェブサイトの高速化とストレージ節約のために画像圧縮は必須です。画質を維持しながらファイルサイズを劇的に減らす方法を学びましょう。
                        </p>

                        <div className="my-8 p-6 bg-sky-50 dark:bg-sky-900/20 rounded-2xl border border-sky-100 dark:border-sky-800">
                            <h3 className="flex items-center gap-2 text-sky-800 dark:text-sky-200 mt-0">
                                <Zap className="w-6 h-6" />
                                今すぐ試す
                            </h3>
                            <p className="mb-4 text-sky-900 dark:text-sky-100">
                                ソフトのインストールなしで、ブラウザ上で直接画像を圧縮できます。
                            </p>
                            <Link
                                href="/ja/tools/image-compressor"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <ImageIcon className="w-5 h-5" />
                                画像圧縮ツールへ
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>なぜ画像圧縮が必要なのか？</h2>
                        <p>
                            高画質な画像は見栄えが良いですが、ファイルサイズが大きく、ウェブサイトの読み込み速度を遅くする主な原因となります。
                            読み込みが遅いとユーザー体験（UX）が悪化し、検索エンジン最適化（SEO）にも悪影響を及ぼします。
                        </p>
                        <ul>
                            <li><strong>サイト高速化:</strong> 軽い画像は瞬時に読み込まれます。</li>
                            <li><strong>データ節約:</strong> モバイルユーザーのデータ通信量を削減します。</li>
                            <li><strong>SEO改善:</strong> Googleは高速なサイトを評価します。</li>
                        </ul>

                        <h2>非可逆圧縮 vs 可逆圧縮</h2>
                        <p>
                            画像圧縮には大きく分けて2つの方式があります。
                        </p>
                        <ul>
                            <li>
                                <strong>可逆圧縮 (Lossless):</strong> 画質を全く損なわずに不要なメタデータのみを削除します。容量の削減幅は小さいです。
                            </li>
                            <li>
                                <strong>非可逆圧縮 (Lossy):</strong> 人間の目には分からないレベルで画質をわずかに下げて、容量を大幅に減らします。ウェブ用に最適です。
                            </li>
                        </ul>
                        <p>
                            Cheetsetの<Link href="/ja/tools/image-compressor">画像圧縮ツール</Link>は、効率的な非可逆圧縮を使用しており、見た目の違いなしに容量を最大80-90%削減します。
                        </p>

                        <h2>安全なクライアントサイド処理</h2>
                        <div className="flex items-start gap-4 not-prose p-6 bg-gray-50 dark:bg-gray-800 rounded-xl my-8">
                            <Shield className="w-8 h-8 text-green-500 flex-shrink-0" />
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">サーバーに送信されません</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    多くのオンラインツールは画像をサーバーにアップロードして処理しますが、Cheetsetのツールはブラウザ（クライアントサイド）で直接動作します。
                                    そのため、個人的な写真や重要な文書も安心して圧縮できます。
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </article>
        </div>
    );
}
