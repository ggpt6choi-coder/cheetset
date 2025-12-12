import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sliders, Image as ImageIcon, Zap } from 'lucide-react';

type Props = {
    lang: string;
};

export default function ImageFiltersGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>사진 분위기를 바꾸는 가장 쉬운 방법: 무료 온라인 이미지 필터</h1>
                        <p className="lead">
                            복잡한 포토샵 없이도 사진의 밝기, 대비를 조절하고 다양한 필터를 적용할 수 있습니다. 브라우저에서 바로 사용하는 무료 이미지 필터 도구를 소개합니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Sliders className="w-6 h-6" />
                                무료 이미지 필터 도구
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                설치 없이 클릭 몇 번으로 사진을 보정하세요.
                            </p>
                            <Link
                                href="/ko/tools/image-filters"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Sliders className="w-5 h-5" />
                                필터 적용하기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>어떤 기능이 있나요?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Zap className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">기본 보정</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    밝기, 대비, 채도를 조절하여 사진의 톤을 맞출 수 있습니다.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <ImageIcon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">다양한 필터</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    흑백(Grayscale), 세피아(Sepia), 블러(Blur) 등 다양한 효과를 제공합니다.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Sliders className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">실시간 미리보기</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    설정을 변경하는 즉시 결과물을 확인할 수 있어 편리합니다.
                                </p>
                            </div>
                        </div>

                        <h2>언제 사용하면 좋을까요?</h2>
                        <ul>
                            <li><strong>SNS 업로드 전:</strong> 인스타그램이나 블로그에 올리기 전에 사진을 더 돋보이게 만들고 싶을 때.</li>
                            <li><strong>옛날 느낌 연출:</strong> 세피아나 흑백 필터로 감성적인 분위기를 연출하고 싶을 때.</li>
                            <li><strong>프라이버시 보호:</strong> 배경을 흐리게(Blur) 처리하여 불필요한 정보를 가리고 싶을 때.</li>
                        </ul>

                        <p>
                            지금 바로 <Link href="/ko/tools/image-filters">이미지 필터 도구</Link>를 사용하여 나만의 멋진 사진을 만들어보세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>The Easiest Way to Change Photo Mood: Free Online Image Filters</h1>
                        <p className="lead">
                            Adjust brightness, contrast, and apply various filters without complex software like Photoshop. Introducing a free image filter tool that works directly in your browser.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Sliders className="w-6 h-6" />
                                Free Image Filter Tool
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                Edit photos with just a few clicks, no installation required.
                            </p>
                            <Link
                                href="/en/tools/image-filters"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Sliders className="w-5 h-5" />
                                Apply Filters
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>Key Features</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Zap className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Basic Adjustments</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Adjust brightness, contrast, and saturation to perfect your photo's tone.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <ImageIcon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Various Filters</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Apply effects like Grayscale, Sepia, Blur, and more instantly.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Sliders className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Real-time Preview</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    See changes immediately as you adjust settings.
                                </p>
                            </div>
                        </div>

                        <h2>When to Use It?</h2>
                        <ul>
                            <li><strong>Social Media:</strong> Make your photos pop before posting to Instagram or Facebook.</li>
                            <li><strong>Vintage Look:</strong> Create a nostalgic vibe with Sepia or Grayscale filters.</li>
                            <li><strong>Privacy:</strong> Use the Blur filter to obscure background details or sensitive information.</li>
                        </ul>

                        <p>
                            Try the <Link href="/en/tools/image-filters">Image Filter Tool</Link> now to create stunning photos.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>写真の雰囲気を変える一番簡単な方法：無料オンライン画像フィルター</h1>
                        <p className="lead">
                            Photoshopのような複雑なソフトなしで、写真の明るさやコントラストを調整し、様々なフィルターを適用できます。ブラウザですぐに使える無料の画像フィルターツールを紹介します。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Sliders className="w-6 h-6" />
                                無料画像フィルターツール
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                インストール不要、数クリックで写真を補正できます。
                            </p>
                            <Link
                                href="/ja/tools/image-filters"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Sliders className="w-5 h-5" />
                                フィルターを適用
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>主な機能</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Zap className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">基本補正</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    明るさ、コントラスト、彩度を調整して写真のトーンを整えます。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <ImageIcon className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">多彩なフィルター</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    モノクロ、セピア、ぼかしなど、様々な効果を瞬時に適用できます。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                                <Sliders className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">リアルタイムプレビュー</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    設定を変更するとすぐに結果を確認できて便利です。
                                </p>
                            </div>
                        </div>

                        <h2>こんな時におすすめ</h2>
                        <ul>
                            <li><strong>SNS投稿前:</strong> Instagramやブログにアップする前に、写真をより魅力的にしたい時。</li>
                            <li><strong>レトロな雰囲気:</strong> セピアやモノクロフィルターで感性的な雰囲気を演出したい時。</li>
                            <li><strong>プライバシー保護:</strong> 背景をぼかして（Blur）、不要な情報や個人情報を隠したい時。</li>
                        </ul>

                        <p>
                            今すぐ<Link href="/ja/tools/image-filters">画像フィルターツール</Link>を使って、素敵な写真を作ってみましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
