import React from 'react';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon, Zap, Monitor } from 'lucide-react';

type Props = {
    lang: string;
};

export default function ImageResizerGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>이미지 크기 조절: 웹사이트 속도 높이는 리사이징 꿀팁</h1>
                        <p className="lead">
                            이미지 크기(해상도)가 너무 크면 웹사이트 로딩이 느려집니다. 픽셀(px) 단위로 정확하게 크기를 조절하고, 포맷을 변환하여 최적화하는 방법을 알아봅니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <ImageIcon className="w-6 h-6" />
                                무료 이미지 리사이저
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                원하는 픽셀 크기로 이미지를 조절하고, JPG/PNG/WebP로 변환하세요.
                            </p>
                            <Link
                                href="/ko/tools/image-resizer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Zap className="w-5 h-5" />
                                이미지 크기 조절하기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>이미지 크기(Resolution) vs 용량(File Size)</h2>
                        <p>
                            많은 분들이 헷갈려 하시지만, 이 둘은 다릅니다.
                        </p>
                        <ul>
                            <li><strong>크기 (Resolution):</strong> 가로 x 세로 픽셀 수 (예: 1920x1080). 화면에 얼마나 크게 보일지를 결정합니다.</li>
                            <li><strong>용량 (File Size):</strong> 파일이 차지하는 저장 공간 (예: 2MB). 로딩 속도에 직접적인 영향을 줍니다.</li>
                        </ul>
                        <p>
                            보통 크기를 줄이면 용량도 같이 줄어듭니다. 웹사이트에 올릴 때는 <strong>필요한 크기만큼만</strong> 리사이징하는 것이 핵심입니다.
                        </p>

                        <h2>웹 최적화 추천 사이즈</h2>
                        <p>
                            용도에 따라 적절한 최대 너비(Max Width)가 있습니다.
                        </p>
                        <ul>
                            <li><strong>풀스크린 배경:</strong> 1920px</li>
                            <li><strong>블로그 본문 이미지:</strong> 800px ~ 1200px</li>
                            <li><strong>썸네일/카드 이미지:</strong> 400px ~ 600px</li>
                            <li><strong>모바일 전용:</strong> 640px ~ 750px</li>
                        </ul>

                        <h2>치트셋 리사이저의 장점</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Monitor className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">비율 유지 (Aspect Ratio)</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    가로 길이만 입력하면 세로 길이는 비율에 맞춰 자동으로 계산됩니다. 이미지가 찌그러질 걱정이 없습니다.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Zap className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">포맷 변환 동시 지원</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    크기를 줄이면서 동시에 JPG, PNG, WebP로 포맷을 변경할 수 있습니다. 특히 WebP로 변환하면 용량을 더 줄일 수 있습니다.
                                </p>
                            </div>
                        </div>

                        <p>
                            지금 바로 <Link href="/ko/tools/image-resizer">이미지 리사이저</Link>로 웹사이트 속도를 최적화해보세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Resize Images Online: Optimize for Web Speed</h1>
                        <p className="lead">
                            Large image dimensions slow down website loading. Learn how to resize images to exact pixels and convert formats for optimization.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <ImageIcon className="w-6 h-6" />
                                Free Image Resizer
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                Resize images to any pixel dimension and convert to JPG/PNG/WebP.
                            </p>
                            <Link
                                href="/en/tools/image-resizer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Zap className="w-5 h-5" />
                                Resize Image Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>Resolution vs. File Size</h2>
                        <p>
                            These two are often confused, but they are different.
                        </p>
                        <ul>
                            <li><strong>Resolution:</strong> The number of pixels (e.g., 1920x1080). Determines how large the image appears on screen.</li>
                            <li><strong>File Size:</strong> The storage space occupied (e.g., 2MB). Directly affects loading speed.</li>
                        </ul>
                        <p>
                            Reducing resolution usually reduces file size. The key is to resize <strong>only to the dimensions you need</strong>.
                        </p>

                        <h2>Recommended Web Sizes</h2>
                        <p>
                            Here are standard max-widths based on usage:
                        </p>
                        <ul>
                            <li><strong>Fullscreen Background:</strong> 1920px</li>
                            <li><strong>Blog Post Content:</strong> 800px ~ 1200px</li>
                            <li><strong>Thumbnails/Cards:</strong> 400px ~ 600px</li>
                            <li><strong>Mobile Only:</strong> 640px ~ 750px</li>
                        </ul>

                        <h2>Why Use Cheetset Resizer?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Monitor className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Maintain Aspect Ratio</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Enter just the width, and the height is calculated automatically to match the ratio. No more stretched images.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Zap className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Convert Formats</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Resize and convert to JPG, PNG, or WebP simultaneously. Converting to WebP can further reduce file size.
                                </p>
                            </div>
                        </div>

                        <p>
                            Optimize your website speed now with the <Link href="/en/tools/image-resizer">Image Resizer</Link>.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>画像サイズ変更：Webサイト高速化のためのリサイズ術</h1>
                        <p className="lead">
                            画像の解像度が大きすぎると、Webサイトの読み込みが遅くなります。ピクセル単位で正確にサイズを調整し、フォーマットを変換して最適化する方法を学びます。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <ImageIcon className="w-6 h-6" />
                                無料画像リサイザー
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                好きなピクセルサイズに画像を調整し、JPG/PNG/WebPに変換します。
                            </p>
                            <Link
                                href="/ja/tools/image-resizer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Zap className="w-5 h-5" />
                                画像サイズを変更する
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>解像度(Resolution) vs 容量(File Size)</h2>
                        <p>
                            よく混同されますが、この2つは異なります。
                        </p>
                        <ul>
                            <li><strong>解像度:</strong> 縦横のピクセル数（例：1920x1080）。画面上でどれだけ大きく表示されるかを決定します。</li>
                            <li><strong>容量:</strong> ファイルが占める保存容量（例：2MB）。読み込み速度に直接影響します。</li>
                        </ul>
                        <p>
                            通常、解像度を下げれば容量も減ります。Webサイトにアップロードする際は、<strong>必要なサイズだけ</strong>にリサイズすることが重要です。
                        </p>

                        <h2>Web最適化の推奨サイズ</h2>
                        <p>
                            用途に応じた適切な最大幅（Max Width）があります。
                        </p>
                        <ul>
                            <li><strong>フルスクリーン背景:</strong> 1920px</li>
                            <li><strong>ブログ本文画像:</strong> 800px ~ 1200px</li>
                            <li><strong>サムネイル/カード画像:</strong> 400px ~ 600px</li>
                            <li><strong>モバイル専用:</strong> 640px ~ 750px</li>
                        </ul>

                        <h2>Cheetsetリサイザーのメリット</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Monitor className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">縦横比を維持 (Aspect Ratio)</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    横幅を入力するだけで、縦幅は比率に合わせて自動計算されます。画像が歪む心配はありません。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Zap className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">フォーマット変換も同時対応</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    サイズを縮小しながら、同時にJPG、PNG、WebPにフォーマットを変更できます。特にWebPに変換すれば、容量をさらに削減できます。
                                </p>
                            </div>
                        </div>

                        <p>
                            今すぐ<Link href="/ja/tools/image-resizer">画像リサイザー</Link>でWebサイトの速度を最適化しましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
