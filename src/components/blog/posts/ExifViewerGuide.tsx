import React from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, MapPin, Shield } from 'lucide-react';

type Props = {
    lang: string;
};

export default function ExifViewerGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>사진 속 숨겨진 정보(EXIF) 확인하는 방법: 촬영 날짜, 위치, 카메라 설정까지</h1>
                        <p className="lead">
                            스마트폰이나 디지털 카메라로 찍은 사진에는 눈에 보이지 않는 정보가 숨어 있습니다. EXIF 데이터가 무엇인지 알아보고, 무료로 확인하는 방법을 소개합니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Camera className="w-6 h-6" />
                                무료 EXIF 데이터 뷰어
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                별도의 프로그램 설치 없이 브라우저에서 바로 사진 정보를 확인하세요.
                            </p>
                            <Link
                                href="/ko/tools/exif-viewer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Camera className="w-5 h-5" />
                                EXIF 데이터 확인하기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>EXIF 데이터란 무엇인가요?</h2>
                        <p>
                            EXIF(Exchangeable Image File Format)는 디지털 카메라나 스마트폰으로 사진을 찍을 때 이미지 파일 안에 함께 저장되는 메타데이터입니다.
                            여기에는 다음과 같은 정보가 포함될 수 있습니다.
                        </p>
                        <ul>
                            <li><strong>촬영 정보:</strong> 날짜, 시간</li>
                            <li><strong>카메라 설정:</strong> 제조사, 모델명, 조리개(F값), 셔터 속도, ISO 감도, 초점 거리</li>
                            <li><strong>위치 정보(GPS):</strong> 사진을 찍은 장소의 위도, 경도</li>
                        </ul>

                        <h2>왜 EXIF 정보를 확인해야 할까요?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Camera className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">사진 공부 및 분석</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    잘 찍은 사진의 카메라 설정을 분석하여 사진 실력을 키울 수 있습니다. 어떤 렌즈와 조리개 값을 썼는지 확인해보세요.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Shield className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">개인정보 보호</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    SNS에 사진을 올리기 전에 위치 정보(GPS)가 포함되어 있는지 확인해야 합니다. 집 주소나 사생활이 노출될 수 있기 때문입니다.
                                </p>
                            </div>
                        </div>

                        <h2>Cheetset EXIF 뷰어의 특징</h2>
                        <ul>
                            <li><strong>강력한 보안:</strong> 이미지를 서버로 전송하지 않고, 사용자의 브라우저에서만 처리합니다. 개인정보 유출 걱정이 없습니다.</li>
                            <li><strong>다양한 포맷 지원:</strong> JPG, PNG 뿐만 아니라 아이폰의 HEIC, 전문가용 TIFF 포맷도 지원합니다.</li>
                            <li><strong>지도 연동:</strong> GPS 정보가 있다면 구글 지도에서 바로 촬영 위치를 확인할 수 있습니다.</li>
                        </ul>

                        <p>
                            지금 바로 <Link href="/ko/tools/exif-viewer">EXIF 뷰어</Link>를 통해 사진 속에 숨겨진 이야기를 확인해보세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to View Hidden Photo Data (EXIF): Date, Location, and Camera Settings</h1>
                        <p className="lead">
                            Photos taken with smartphones or digital cameras contain hidden information invisible to the naked eye. Learn what EXIF data is and how to view it for free.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Camera className="w-6 h-6" />
                                Free Online EXIF Viewer
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                View photo metadata instantly in your browser without installing any software.
                            </p>
                            <Link
                                href="/en/tools/exif-viewer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Camera className="w-5 h-5" />
                                View EXIF Data
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>What is EXIF Data?</h2>
                        <p>
                            EXIF (Exchangeable Image File Format) is metadata stored within image files when you take a photo with a digital camera or smartphone.
                            It can include information such as:
                        </p>
                        <ul>
                            <li><strong>Date & Time:</strong> When the photo was taken.</li>
                            <li><strong>Camera Settings:</strong> Manufacturer, Model, Aperture (F-stop), Shutter Speed, ISO, Focal Length.</li>
                            <li><strong>Location (GPS):</strong> Latitude and longitude coordinates of where the photo was taken.</li>
                        </ul>

                        <h2>Why Check EXIF Data?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Camera className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Photography Learning</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Analyze the settings of great photos to improve your skills. See what lens and aperture were used.
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Shield className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Privacy Protection</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Check if your photos contain GPS location data before posting them on social media to protect your privacy.
                                </p>
                            </div>
                        </div>

                        <h2>Features of Cheetset EXIF Viewer</h2>
                        <ul>
                            <li><strong>Secure & Private:</strong> Images are processed entirely in your browser and never uploaded to a server.</li>
                            <li><strong>Format Support:</strong> Supports JPG, PNG, as well as iPhone's HEIC and professional TIFF formats.</li>
                            <li><strong>Map Integration:</strong> If GPS data is present, view the exact location on Google Maps.</li>
                        </ul>

                        <p>
                            Try the <Link href="/en/tools/exif-viewer">EXIF Viewer</Link> now to uncover the hidden details in your photos.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>写真の隠された情報（EXIF）を確認する方法：撮影日時、場所、カメラ設定まで</h1>
                        <p className="lead">
                            スマートフォンやデジタルカメラで撮った写真には、目に見えない情報が隠されています。EXIFデータとは何か、そしてそれを無料で確認する方法を紹介します。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Camera className="w-6 h-6" />
                                無料EXIFデータビューアー
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                ソフトのインストール不要で、ブラウザ上で写真の情報をすぐに確認できます。
                            </p>
                            <Link
                                href="/ja/tools/exif-viewer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Camera className="w-5 h-5" />
                                EXIFデータを確認する
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>EXIFデータとは？</h2>
                        <p>
                            EXIF（Exchangeable Image File Format）は、デジタルカメラやスマートフォンで写真を撮った際に画像ファイル内に保存されるメタデータです。
                            これには以下のような情報が含まれます。
                        </p>
                        <ul>
                            <li><strong>撮影情報:</strong> 日付、時間</li>
                            <li><strong>カメラ設定:</strong> メーカー、モデル名、絞り値（F値）、シャッタースピード、ISO感度、焦点距離</li>
                            <li><strong>位置情報（GPS）:</strong> 写真を撮った場所の緯度、経度</li>
                        </ul>

                        <h2>なぜEXIF情報を確認すべきなのか？</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Camera className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">写真の勉強・分析</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    上手な写真のカメラ設定を分析して、写真のスキルを向上させましょう。どんなレンズや設定が使われたか確認できます。
                                </p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <Shield className="w-8 h-8 text-indigo-500 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">プライバシー保護</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    SNSに写真を投稿する前に、位置情報（GPS）が含まれているか確認しましょう。自宅の場所などのプライバシー流出を防げます。
                                </p>
                            </div>
                        </div>

                        <h2>Cheetset EXIFビューアーの特徴</h2>
                        <ul>
                            <li><strong>強力なセキュリティ:</strong> 画像をサーバーに送信せず、すべてお使いのブラウザで処理します。プライバシー流出の心配がありません。</li>
                            <li><strong>多様なフォーマット対応:</strong> JPG、PNGだけでなく、iPhoneのHEIC、プロ用のTIFFフォーマットもサポートしています。</li>
                            <li><strong>地図連携:</strong> GPS情報があれば、Googleマップで撮影場所をすぐに確認できます。</li>
                        </ul>

                        <p>
                            今すぐ<Link href="/ja/tools/exif-viewer">EXIFビューアー</Link>を使って、写真に隠された情報を確認してみましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
