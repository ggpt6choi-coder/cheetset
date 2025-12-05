'use client';

import React from 'react';
import Link from 'next/link';
import { QrCode, Smartphone, Zap, Shield, Share2 } from 'lucide-react';

type Props = {
    lang: string;
};

export default function QrCodeGuide({ lang }: Props) {
    const content = {
        ko: {
            title: "QR 코드의 원리와 마케팅 활용법: 무료 생성기로 나만의 QR 만들기",
            subtitle: "QR 코드는 어떻게 데이터를 저장할까요? 작동 원리부터 비즈니스 활용 사례, 그리고 무료 QR 코드 생성기 사용법까지 완벽하게 정리해 드립니다.",
            intro: "스마트폰 카메라만 갖다 대면 웹사이트로 연결되고, 결제가 이루어지는 QR 코드. 이제는 우리 일상 깊숙이 들어와 있습니다. 하지만 이 흑백의 격자 무늬 속에 어떻게 데이터가 저장되는지, 그리고 비즈니스에 어떻게 활용할 수 있는지 궁금하지 않으신가요? 오늘은 QR 코드의 모든 것을 파헤쳐 보겠습니다.",
            sections: [
                {
                    title: "QR 코드란 무엇인가요?",
                    content: "QR 코드는 'Quick Response Code'의 약자로, 1994년 일본의 덴소 웨이브(Denso Wave)사에서 개발한 2차원 바코드입니다. 기존의 1차원 바코드가 숫자만 저장할 수 있었던 것에 비해, QR 코드는 숫자, 영문, 한글, 한자 등 다양한 데이터를 훨씬 많이 저장할 수 있습니다. 또한, 어느 방향에서 스캔해도 인식 속도가 매우 빠르다는 장점이 있습니다."
                },
                {
                    title: "QR 코드의 작동 원리",
                    content: "QR 코드는 검은색과 흰색의 격자 패턴으로 정보를 표현합니다. 3개의 모서리에 있는 큰 사각형(위치 찾기 패턴)은 스캐너가 QR 코드의 위치와 방향을 파악하게 도와줍니다. 그 외의 영역에는 데이터와 오류 수정 코드가 포함되어 있어, 코드가 일부 훼손되거나 더러워져도 데이터를 복구하여 인식할 수 있습니다. 이를 '리드-솔로몬(Reed-Solomon) 오류 수정' 방식이라고 합니다."
                },
                {
                    title: "비즈니스와 마케팅 활용 사례",
                    items: [
                        "**웹사이트 연결**: 명함, 포스터, 전단지에 QR 코드를 넣어 홈페이지나 SNS로 유입을 유도합니다.",
                        "**디지털 메뉴판**: 식당 테이블에 QR 코드를 부착하여 고객이 스마트폰으로 메뉴를 확인하고 주문하게 합니다.",
                        "**Wi-Fi 연결**: 복잡한 비밀번호 입력 없이 QR 코드 스캔만으로 와이파이에 접속할 수 있습니다.",
                        "**결제 시스템**: 카카오페이, 네이버페이 등 간편 결제 수단으로 널리 사용됩니다."
                    ]
                },
                {
                    title: "무료 QR 코드 생성기 사용법",
                    content: "치트셋(CheetSet)에서는 누구나 무료로, 무제한으로 QR 코드를 생성할 수 있는 도구를 제공합니다. 회원가입도 필요 없고, 생성된 QR 코드는 영구적으로 사용할 수 있습니다.",
                    steps: [
                        "1. 치트셋 **QR 코드 생성기**에 접속합니다.",
                        "2. 변환하고 싶은 **URL이나 텍스트**를 입력합니다.",
                        "3. **크기**와 **색상**을 원하는 대로 조절합니다.",
                        "4. **PNG로 다운로드** 버튼을 눌러 이미지를 저장합니다."
                    ]
                }
            ],
            cta: {
                text: "지금 바로 나만의 QR 코드 만들기",
                button: "QR 코드 생성기 바로가기"
            }
        },
        en: {
            title: "How QR Codes Work & Marketing Tips: Create Your Own for Free",
            subtitle: "How do QR codes store data? We explain the working principle, business use cases, and how to use our free QR code generator.",
            intro: "Point your camera, and you're instantly connected to a website or making a payment. QR codes have become an integral part of our daily lives. But have you ever wondered how data is stored in these black and white grids? Today, we'll dive deep into everything about QR codes.",
            sections: [
                {
                    title: "What is a QR Code?",
                    content: "QR Code stands for 'Quick Response Code'. It is a two-dimensional barcode developed by Denso Wave in Japan in 1994. Unlike traditional 1D barcodes that store limited numbers, QR codes can store a significant amount of data, including numbers, letters, and binary data. They are also designed to be scanned quickly from any angle."
                },
                {
                    title: "How QR Codes Work",
                    content: "QR codes represent information using patterns of black and white squares. The three large squares in the corners (Position Detection Patterns) help scanners determine the code's location and orientation. The rest of the area contains data and error correction codes, allowing the code to be read even if it's partially damaged or dirty. This uses the Reed-Solomon error correction method."
                },
                {
                    title: "Business and Marketing Use Cases",
                    items: [
                        "**Website Links**: Add QR codes to business cards, posters, and flyers to drive traffic to your website or social media.",
                        "**Digital Menus**: Restaurants place QR codes on tables for customers to view menus and order via their smartphones.",
                        "**Wi-Fi Access**: Allow guests to connect to Wi-Fi instantly without typing complex passwords.",
                        "**Payments**: Widely used for mobile payment systems like PayPal, Venmo, and Alipay."
                    ]
                },
                {
                    title: "How to Use Our Free QR Code Generator",
                    content: "CheetSet provides a free, unlimited QR code generator tool. No sign-up required, and the generated codes are yours to keep forever.",
                    steps: [
                        "1. Go to the CheetSet **QR Code Generator**.",
                        "2. Enter the **URL or text** you want to convert.",
                        "3. Customize the **size** and **color**.",
                        "4. Click **Download PNG** to save your image."
                    ]
                }
            ],
            cta: {
                text: "Create Your Own QR Code Now",
                button: "Go to QR Code Generator"
            }
        },
        ja: {
            title: "QRコードの仕組みとマーケティング活用法：無料生成器で自分だけのQRを作ろう",
            subtitle: "QRコードはどのようにデータを保存するのでしょうか？動作原理からビジネス活用事例、そして無料QRコード生成器の使い方まで完全に整理します。",
            intro: "スマホのカメラを向けるだけでウェブサイトにつながり、決済ができるQRコード。今や私たちの日常に深く浸透しています。しかし、この白黒の格子のなかにどのようにデータが保存されているのか、そしてビジネスにどう活用できるのか気になりませんか？今日はQRコードのすべてを徹底解剖します。",
            sections: [
                {
                    title: "QRコードとは？",
                    content: "QRコードは「Quick Response Code」の略で、1994年に日本のデンソーウェーブ社が開発した2次元バーコードです。従来の1次元バーコードが数字しか保存できなかったのに対し、QRコードは数字、英字、漢字など多様なデータを大量に保存できます。また、どの方向からスキャンしても認識速度が非常に速いという長所があります。"
                },
                {
                    title: "QRコードの動作原理",
                    content: "QRコードは黒と白の格子パターンで情報を表現します。3つの角にある大きな四角形（切り出しシンボル）は、スキャナーがQRコードの位置と向きを把握するのを助けます。その他の領域にはデータと誤り訂正コードが含まれており、コードが一部破損したり汚れたりしてもデータを復元して認識できます。これを「リード・ソロモン符号」といいます。"
                },
                {
                    title: "ビジネスとマーケティング活用事例",
                    items: [
                        "**ウェブサイト誘導**: 名刺、ポスター、チラシにQRコードを入れて、ホームページやSNSへの流入を誘導します。",
                        "**デジタルメニュー**: レストランのテーブルにQRコードを貼り、顧客がスマホでメニューを確認して注文できるようにします。",
                        "**Wi-Fi接続**: 複雑なパスワード入力なしで、QRコードスキャンだけでWi-Fiに接続できます。",
                        "**決済システム**: PayPay、LINE Payなどのスマホ決済手段として広く使用されています。"
                    ]
                },
                {
                    title: "無料QRコード生成器の使い方",
                    content: "CheetSetでは、誰でも無料で無制限にQRコードを生成できるツールを提供しています。会員登録も不要で、生成されたQRコードは永久に使用できます。",
                    steps: [
                        "1. CheetSetの**QRコード生成器**にアクセスします。",
                        "2. 変換したい**URLまたはテキスト**を入力します。",
                        "3. **サイズ**と**色**を自由に調整します。",
                        "4. **PNGでダウンロード**ボタンを押して画像を保存します。"
                    ]
                }
            ],
            cta: {
                text: "今すぐ自分だけのQRコードを作る",
                button: "QRコード生成器へ移動"
            }
        }
    };

    const t = content[lang as keyof typeof content];

    return (
        <article className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                    {t.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    {t.subtitle}
                </p>
            </header>

            <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="lead text-xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
                    {t.intro}
                </p>

                <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg mr-3">
                                <QrCode className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Quick Response</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 m-0 text-sm">
                            {lang === 'ko' ? '빠른 인식 속도와 대용량 데이터 저장 능력' :
                                lang === 'en' ? 'Fast scanning speed and high data capacity' :
                                    '高速認識と大容量データ保存能力'}
                        </p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-xl border border-green-100 dark:border-green-800">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg mr-3">
                                <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">Error Correction</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 m-0 text-sm">
                            {lang === 'ko' ? '손상되어도 데이터 복구 가능 (리드-솔로몬)' :
                                lang === 'en' ? 'Data recovery even when damaged (Reed-Solomon)' :
                                    '損傷してもデータ復元可能（リード・ソロモン）'}
                        </p>
                    </div>
                </div>

                {t.sections.map((section, index) => (
                    <section key={index} className="mb-16">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                            <span className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 flex-shrink-0">
                                {index + 1}
                            </span>
                            {section.title}
                        </h2>
                        {section.content && (
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                {section.content}
                            </p>
                        )}
                        {section.items && (
                            <ul className="space-y-4">
                                {section.items.map((item, i) => {
                                    const [bold, normal] = item.split('**: ');
                                    return (
                                        <li key={i} className="flex items-start">
                                            <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></span>
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <strong className="text-gray-900 dark:text-white font-semibold">{bold.replace('**', '')}</strong>: {normal}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {section.steps && (
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <ul className="space-y-3 m-0">
                                    {section.steps.map((step, i) => (
                                        <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ))}

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl my-16">
                    <Smartphone className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
                    <h3 className="text-2xl font-bold mb-4">{t.cta.text}</h3>
                    <p className="mb-8 text-indigo-100 max-w-lg mx-auto">
                        {lang === 'ko' ? '복잡한 설치 없이 브라우저에서 바로 QR 코드를 생성하세요. 100% 무료입니다.' :
                            lang === 'en' ? 'Create QR codes instantly in your browser without installation. 100% Free.' :
                                '複雑なインストールなしで、ブラウザですぐにQRコードを生成しましょう。100%無料です。'}
                    </p>
                    <Link
                        href={`/${lang}/tools/qr-code`}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-indigo-600 bg-white hover:bg-gray-50 transition-colors shadow-lg"
                    >
                        <Zap className="w-5 h-5 mr-2" />
                        {t.cta.button}
                    </Link>
                </div>
            </div>
        </article>
    );
}
