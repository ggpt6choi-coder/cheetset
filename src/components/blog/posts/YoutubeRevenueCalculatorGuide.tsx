import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function YoutubeRevenueCalculatorGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>유튜브 수익 계산기 활용법: 내 조회수로 얼마를 벌 수 있을까?</h1>
                        <p className="lead">유튜버들은 조회수 1회당 얼마를 벌까요? RPM과 CPM의 개념을 이해하고, 내 조회수로 예상 수익을 계산하는 방법을 알려드립니다.</p>

                        <h2>유튜브 수익의 핵심, RPM이란?</h2>
                        <p>
                            유튜브 수익을 이해하려면 먼저 **RPM (Revenue Per Mille)**이라는 개념을 알아야 합니다.
                            RPM은 '조회수 1,000회당 예상 수익'을 의미합니다.
                            예를 들어, RPM이 $2.00라면 조회수 1,000회당 2달러(약 2,600원)를 번다는 뜻입니다.
                        </p>
                        <p>
                            RPM은 채널의 주제, 시청자의 국가, 연령대 등에 따라 천차만별입니다.
                            일반적으로 금융, 비즈니스, 기술 관련 채널의 RPM이 높고, 유머나 엔터테인먼트 채널은 상대적으로 낮습니다.
                        </p>

                        <h2>내 예상 수익 계산하기</h2>
                        <p>
                            복잡한 계산 없이 CheetSet의 **유튜브 수익 계산기**를 사용하면 간편하게 예상 수익을 확인할 수 있습니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">💰 3초 만에 수익 계산하기</h3>
                            <ol className="mb-0">
                                <li><Link href="/ko/tools/youtube-calculator">유튜브 수익 계산기</Link>로 이동합니다.</li>
                                <li>'일일 조회수' 슬라이더를 움직여 내 채널의 조회수를 설정합니다.</li>
                                <li>'예상 RPM'을 설정합니다. (한국 평균 약 $1.5 ~ $3.0)</li>
                                <li>일일, 월간, 연간 예상 수익을 확인합니다.</li>
                            </ol>
                        </div>

                        <h2>수익을 높이는 3가지 팁</h2>
                        <ul>
                            <li><strong>고단가 키워드 공략</strong>: 금융, 주식, 보험, IT 리뷰 등 광고 단가가 높은 주제를 다루세요.</li>
                            <li><strong>영상 길이 8분 이상</strong>: 8분이 넘는 영상에는 중간 광고(Mid-roll ads)를 넣을 수 있어 수익이 배로 늘어납니다.</li>
                            <li><strong>시청 지속 시간 늘리기</strong>: 시청자가 영상을 오래 볼수록 광고 노출 기회가 많아지고, 유튜브 알고리즘의 선택을 받을 확률이 높아집니다.</li>
                        </ul>

                        <p>
                            유튜브 수익 창출의 꿈, 막연하게 생각하지 말고 구체적인 숫자로 계획해보세요.
                            <Link href="/ko/tools/youtube-calculator">무료 유튜브 수익 계산기</Link>가 여러분의 성장을 도와드립니다.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>YouTube Revenue Calculator: How Much Money Can You Make?</h1>
                        <p className="lead">Curious about YouTuber earnings? Learn how YouTube RPM works and estimate your potential income based on views using our calculator.</p>

                        <h2>What is RPM? The Key to YouTube Income</h2>
                        <p>
                            To understand YouTube revenue, you first need to know about **RPM (Revenue Per Mille)**.
                            RPM stands for "Revenue per 1,000 views".
                            For example, if your RPM is $2.00, you earn $2 for every 1,000 views.
                        </p>
                        <p>
                            RPM varies greatly depending on your channel's niche, viewer location, and demographics.
                            Generally, Finance, Business, and Tech channels have higher RPMs, while Entertainment and Humor channels have lower ones.
                        </p>

                        <h2>Calculate Your Estimated Earnings</h2>
                        <p>
                            No need for complex math. Use CheetSet's **YouTube Revenue Calculator** to easily check your potential income.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">💰 Calculate in 3 Seconds</h3>
                            <ol className="mb-0">
                                <li>Go to the <Link href="/en/tools/youtube-calculator">YouTube Revenue Calculator</Link>.</li>
                                <li>Adjust the 'Daily Views' slider to match your channel's traffic.</li>
                                <li>Set the 'Estimated RPM'. (Average is around $2.00 - $5.00)</li>
                                <li>Check your Daily, Monthly, and Yearly estimated earnings.</li>
                            </ol>
                        </div>

                        <h2>3 Tips to Increase Revenue</h2>
                        <ul>
                            <li><strong>Target High CPM Keywords</strong>: Topics like Finance, Investing, Insurance, and Tech Reviews attract higher-paying ads.</li>
                            <li><strong>Videos Over 8 Minutes</strong>: You can place Mid-roll ads in videos longer than 8 minutes, potentially doubling your revenue.</li>
                            <li><strong>Increase Watch Time</strong>: The longer viewers watch, the more ads they see, and the more likely YouTube is to recommend your video.</li>
                        </ul>

                        <p>
                            Don't just dream about YouTube income; plan it with concrete numbers.
                            Our <Link href="/en/tools/youtube-calculator">Free YouTube Revenue Calculator</Link> is here to help you grow.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>YouTube収益計算機活用法：私の再生回数でいくら稼げる？</h1>
                        <p className="lead">YouTuberは再生回数1回あたりいくら稼ぐのでしょうか？RPMとCPMの概念を理解し、自分の再生回数で予想収益を計算する方法を紹介します。</p>

                        <h2>YouTube収益の核心、RPMとは？</h2>
                        <p>
                            YouTubeの収益を理解するには、まず**RPM（Revenue Per Mille）**という概念を知る必要があります。
                            RPMは「再生回数1,000回あたりの予想収益」を意味します。
                            例えば、RPMが$2.00の場合、再生回数1,000回あたり2ドル（約300円）を稼ぐことになります。
                        </p>
                        <p>
                            RPMはチャンネルのテーマ、視聴者の国、年齢層などによって大きく異なります。
                            一般的に、金融、ビジネス、技術関連のチャンネルはRPMが高く、ユーモアやエンターテイメントチャンネルは比較的低いです。
                        </p>

                        <h2>予想収益を計算する</h2>
                        <p>
                            複雑な計算は不要です。CheetSetの**YouTube収益計算機**を使えば、簡単に予想収益を確認できます。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800">
                            <h3 className="mt-0 text-indigo-800 dark:text-indigo-200">💰 3秒で収益計算</h3>
                            <ol className="mb-0">
                                <li><Link href="/ja/tools/youtube-calculator">YouTube収益計算機</Link>に移動します。</li>
                                <li>「1日の再生回数」スライダーを動かして、チャンネルの再生回数を設定します。</li>
                                <li>「予想RPM」を設定します。（平均は約$1.5〜$3.0）</li>
                                <li>日次、月次、年次の予想収益を確認します。</li>
                            </ol>
                        </div>

                        <h2>収益を上げる3つのヒント</h2>
                        <ul>
                            <li><strong>高単価キーワードを狙う</strong>：金融、株式、保険、ITレビューなど、広告単価の高いテーマを扱いましょう。</li>
                            <li><strong>動画の長さは8分以上</strong>：8分を超える動画にはミッドロール広告（途中広告）を入れることができ、収益が倍増する可能性があります。</li>
                            <li><strong>視聴維持率を上げる</strong>：視聴者が動画を長く見るほど、広告が表示される機会が増え、YouTubeアルゴリズムに選ばれる確率が高まります。</li>
                        </ul>

                        <p>
                            YouTube収益化の夢、漠然と考えるのではなく、具体的な数字で計画してみましょう。
                            <Link href="/ja/tools/youtube-calculator">無料YouTube収益計算機</Link>があなたの成長をサポートします。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
