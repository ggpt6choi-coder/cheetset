import React from 'react';
import Link from 'next/link';
import { ArrowRight, Crop, Layers, Smartphone } from 'lucide-react';

type Props = {
    lang: string;
};

export default function ImageCropperGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>이미지 자르기: SNS 프로필, 썸네일용 사진 3초 만에 편집하기</h1>
                        <p className="lead">
                            인스타그램, 유튜브, 블로그 등 플랫폼마다 요구하는 이미지 비율이 다릅니다. 복잡한 포토샵 없이 브라우저에서 바로 이미지를 원하는 비율로 자르는 방법을 소개합니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Crop className="w-6 h-6" />
                                무료 이미지 자르기 도구
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                1:1, 16:9, 4:3 등 다양한 비율로 이미지를 쉽고 빠르게 잘라보세요.
                            </p>
                            <Link
                                href="/ko/tools/image-cropper"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Crop className="w-5 h-5" />
                                이미지 자르기 바로가기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>왜 이미지 비율이 중요한가요?</h2>
                        <p>
                            잘못된 비율의 이미지를 업로드하면 중요한 부분이 잘리거나, 검은색 여백(레터박스)이 생겨 보기 싫어질 수 있습니다.
                            각 플랫폼에 딱 맞는 비율로 미리 잘라서 올리는 것이 프로페셔널해 보입니다.
                        </p>

                        <h3>주요 플랫폼별 추천 비율</h3>
                        <ul>
                            <li><strong>인스타그램 피드:</strong> 1:1 (정사각형) 또는 4:5 (세로형)</li>
                            <li><strong>유튜브 썸네일:</strong> 16:9 (1280x720px)</li>
                            <li><strong>블로그 대표 이미지:</strong> 16:9 또는 3:2</li>
                            <li><strong>프로필 사진:</strong> 1:1 (원형으로 잘릴 것을 고려하여 중앙 배치)</li>
                        </ul>

                        <h2>치트셋 이미지 자르기 도구 활용법</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Layers className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">다양한 비율 프리셋</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    1:1, 16:9, 4:3 등 자주 쓰는 비율을 클릭 한 번으로 적용할 수 있습니다. 물론 자유롭게(Free) 자를 수도 있습니다.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Smartphone className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">모바일 친화적</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    스마트폰에서도 터치로 간편하게 영역을 조절하고 자를 수 있습니다. 앱 설치 없이 바로 사용하세요.
                                </p>
                            </div>
                        </div>

                        <p>
                            지금 바로 <Link href="/ko/tools/image-cropper">이미지 자르기 도구</Link>를 사용하여 여러분의 사진을 완벽한 비율로 만들어보세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Crop Images Online: Perfect Aspect Ratios for Social Media</h1>
                        <p className="lead">
                            Every platform requires different image dimensions. Learn how to crop your images to the perfect ratio for Instagram, YouTube, and more without Photoshop.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Crop className="w-6 h-6" />
                                Free Online Image Cropper
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                Easily crop images to 1:1, 16:9, 4:3, or any custom ratio.
                            </p>
                            <Link
                                href="/en/tools/image-cropper"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Crop className="w-5 h-5" />
                                Go to Image Cropper
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>Why Aspect Ratio Matters</h2>
                        <p>
                            Uploading images with the wrong aspect ratio can result in awkward cropping or ugly black bars.
                            Pre-cropping your images ensures they look professional and display correctly on every device.
                        </p>

                        <h3>Recommended Ratios by Platform</h3>
                        <ul>
                            <li><strong>Instagram Feed:</strong> 1:1 (Square) or 4:5 (Portrait)</li>
                            <li><strong>YouTube Thumbnail:</strong> 16:9 (1280x720px)</li>
                            <li><strong>Blog Featured Image:</strong> 16:9 or 3:2</li>
                            <li><strong>Profile Picture:</strong> 1:1 (Center your subject)</li>
                        </ul>

                        <h2>Features of Cheetset Image Cropper</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Layers className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Preset Ratios</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Apply common ratios like 1:1, 16:9, and 4:3 with a single click, or crop freely.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Smartphone className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Mobile Friendly</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Works perfectly on mobile devices. Adjust the crop area with touch gestures—no app installation needed.
                                </p>
                            </div>
                        </div>

                        <p>
                            Try the <Link href="/en/tools/image-cropper">Image Cropper</Link> now and get your photos ready for the world.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>画像切り抜き：SNSプロフィール、サムネイル用写真を3秒で編集</h1>
                        <p className="lead">
                            Instagram、YouTube、ブログなど、プラットフォームごとに求められる画像比率は異なります。Photoshopなしで、ブラウザ上で簡単に画像を希望の比率に切り抜く方法を紹介します。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Crop className="w-6 h-6" />
                                無料画像切り抜きツール
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                1:1、16:9、4:3など、様々な比率で画像を素早く簡単に切り抜けます。
                            </p>
                            <Link
                                href="/ja/tools/image-cropper"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Crop className="w-5 h-5" />
                                画像切り抜きツールへ
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>なぜ画像比率が重要なのか？</h2>
                        <p>
                            間違った比率の画像をアップロードすると、重要な部分が切れたり、黒い余白（レターボックス）ができたりして見栄えが悪くなります。
                            各プラットフォームに最適な比率で事前に切り抜いておくことで、プロフェッショナルな印象を与えられます。
                        </p>

                        <h3>主要プラットフォーム別推奨比率</h3>
                        <ul>
                            <li><strong>Instagramフィード:</strong> 1:1 (正方形) または 4:5 (縦長)</li>
                            <li><strong>YouTubeサムネイル:</strong> 16:9 (1280x720px)</li>
                            <li><strong>ブログアイキャッチ:</strong> 16:9 または 3:2</li>
                            <li><strong>プロフィール写真:</strong> 1:1 (円形に切り抜かれることを考慮して中央配置)</li>
                        </ul>

                        <h2>Cheetset画像切り抜きツールの活用法</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Layers className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">多様な比率プリセット</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    1:1、16:9、4:3など、よく使う比率をワンクリックで適用できます。もちろん自由に(Free)切り抜くことも可能です。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Smartphone className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">モバイル対応</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    スマートフォンでもタッチ操作で簡単に領域を調整して切り抜けます。アプリのインストールなしですぐに使えます。
                                </p>
                            </div>
                        </div>

                        <p>
                            今すぐ<Link href="/ja/tools/image-cropper">画像切り抜きツール</Link>を使って、あなたの写真を完璧な比率に仕上げましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
