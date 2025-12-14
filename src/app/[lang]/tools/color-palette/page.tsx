import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import ColorPaletteClient from './ColorPaletteClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.color_palette.title} - ${dict.common.title}`,
        description: dict.tools.color_palette.description,
    };
}

export default async function ColorPalettePage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ColorPaletteClient
                labels={{
                    title: dict.tools.color_palette.title,
                    description: dict.tools.color_palette.description,
                    upload_label: dict.tools.color_palette.upload_label,
                    palette_label: dict.tools.color_palette.palette_label,
                    copy_hex: dict.tools.color_palette.copy_hex,
                    copy_rgb: dict.tools.color_palette.copy_rgb,
                    copied: dict.tools.color_palette.copied,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2>{dict.tools.color_palette.title}</h2>
                    <p>{dict.tools.color_palette.seo_content}</p>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? '이미지에서 색상 추출하기' :
                                    lang === 'ja' ? '画像から色を抽出する' :
                                        'Extracting Colors from Images'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {lang === 'ko' ?
                                    '디자인 작업을 할 때, 마음에 드는 이미지의 색상 조합(Color Scheme)을 참고하고 싶을 때가 있습니다. 이 도구는 이미지에서 가장 지배적인 색상(Dominant Colors)을 자동으로 분석하여 16진수(HEX) 코드와 RGB 값으로 제공합니다. 추출된 팔레트를 사용하여 웹사이트, 앱, 또는 그래픽 디자인에 조화로운 색상을 적용해보세요.' :
                                    lang === 'ja' ?
                                        'デザイン作業を行う際、気に入った画像の配色（カラースキーム）を参考にしたい場合があります。このツールは、画像から最も支配的な色（ドミナントカラー）を自動的に分析し、16進数（HEX）コードとRGB値として提供します。抽出されたパレットを使用して、Webサイト、アプリ、またはグラフィックデザインに調和のとれた色を適用してください。' :
                                        'When designing, you often want to reference the color scheme of an image you like. This tool automatically analyzes the dominant colors in an image and provides them as Hex codes and RGB values. Use the extracted palette to apply harmonious colors to your website, app, or graphic design.'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? '배색 가이드' :
                                    lang === 'ja' ? '配色ガイド' :
                                        'Color Theory Basics'}
                            </h3>
                            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                                <li>
                                    <strong>Dominant Color:</strong>
                                    {lang === 'ko' ? ' 이미지의 전체적인 분위기를 결정하는 주조색입니다.' :
                                        lang === 'ja' ? ' 画像の全体的な雰囲気を決定する主調色です。' :
                                            ' The main color that sets the overall tone of the image.'}
                                </li>
                                <li>
                                    <strong>Accent Color:</strong>
                                    {lang === 'ko' ? ' 강조하고 싶은 부분에 사용하는 포인트 색상입니다.' :
                                        lang === 'ja' ? ' 強調したい部分に使用するアクセントカラーです。' :
                                            ' A color used to highlight specific elements.'}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.color_palette.title}
                description={dict.tools.color_palette.description}
                url={`https://cheetset.com/${lang}/tools/color-palette`}
            />
        </div>
    );
}
