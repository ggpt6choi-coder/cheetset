import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Utensils, TrendingUp } from 'lucide-react';

type Props = {
    lang: string;
};

export default function BmrCalculatorGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>다이어트 필수! 내 기초대사량(BMR) 계산하고 식단 짜는 법</h1>
                        <p className="lead">
                            "물만 먹어도 살이 쪄요"라는 말, 사실일까요? 다이어트의 핵심은 '기초대사량'에 있습니다. 내 몸이 숨만 쉬어도 소비하는 칼로리를 알아야 요요 없는 다이어트가 가능합니다.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Activity className="w-6 h-6" />
                                기초대사량(BMR) 계산기
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                키, 몸무게, 나이만 입력하면 1초 만에 내 기초대사량과 활동 대사량을 알려드립니다.
                            </p>
                            <Link
                                href="/ko/tools/bmr-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Activity className="w-5 h-5" />
                                내 BMR 확인하기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>기초대사량(BMR)이란?</h2>
                        <p>
                            BMR(Basal Metabolic Rate)은 우리가 아무것도 하지 않고 가만히 누워만 있어도 생명 유지를 위해 소비되는 최소한의 에너지입니다. 심장 박동, 호흡, 체온 유지 등에 쓰이죠.
                        </p>
                        <ul>
                            <li><strong>일반 성인 남성 평균:</strong> 약 1600 ~ 1800 kcal</li>
                            <li><strong>일반 성인 여성 평균:</strong> 약 1200 ~ 1400 kcal</li>
                        </ul>

                        <h2>활동 대사량(TDEE)은 무엇인가요?</h2>
                        <p>
                            BMR에 '활동량'을 더한 것이 바로 TDEE(Total Daily Energy Expenditure)입니다. 출퇴근, 운동, 집안일 등 하루 동안 움직이면서 쓰는 모든 에너지를 포함합니다.
                        </p>
                        <blockquote>
                            <p>다이어트 식단을 짤 때는 BMR이 아니라 <strong>TDEE</strong>를 기준으로 해야 합니다!</p>
                        </blockquote>

                        <h2>다이어트 칼로리 설정 공식</h2>
                        <ol>
                            <li>
                                <strong>체중 감량 (다이어트):</strong> TDEE - 500 kcal
                                <br />
                                <span className="text-sm text-gray-500">일주일에 약 0.5kg 감량 가능</span>
                            </li>
                            <li>
                                <strong>체중 유지:</strong> TDEE와 동일하게 섭취
                            </li>
                            <li>
                                <strong>체중 증량 (벌크업):</strong> TDEE + 300~500 kcal
                            </li>
                        </ol>

                        <p className="mt-8">
                            무작정 굶는 다이어트는 기초대사량을 떨어뜨려 살이 더 잘 찌는 체질로 만듭니다. <Link href="/ko/tools/bmr-calculator">BMR 계산기</Link>로 내 몸을 정확히 파악하고 건강하게 다이어트하세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Diet Essentials: How to Calculate BMR & Plan Your Meals</h1>
                        <p className="lead">
                            Why do some people eat a lot but stay thin? The secret lies in 'Basal Metabolic Rate (BMR)'. Knowing how many calories your body burns at rest is key to successful weight loss without the yo-yo effect.
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Activity className="w-6 h-6" />
                                Free BMR Calculator
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                Get your BMR and TDEE instantly by entering your height, weight, and age.
                            </p>
                            <Link
                                href="/en/tools/bmr-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Activity className="w-5 h-5" />
                                Calculate My BMR
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>What is BMR?</h2>
                        <p>
                            Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions, like breathing and circulation.
                        </p>

                        <h2>What is TDEE?</h2>
                        <p>
                            Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day when exercise is taken into account. It is calculated by multiplying your BMR by your activity level.
                        </p>

                        <h2>How to Set Your Calorie Goal</h2>
                        <ol>
                            <li>
                                <strong>Weight Loss:</strong> TDEE - 500 kcal
                                <br />
                                <span className="text-sm text-gray-500">Lose about 1lb (0.5kg) per week</span>
                            </li>
                            <li>
                                <strong>Maintenance:</strong> Eat same as TDEE
                            </li>
                            <li>
                                <strong>Weight Gain (Bulk):</strong> TDEE + 300~500 kcal
                            </li>
                        </ol>

                        <p className="mt-8">
                            Starving yourself lowers your BMR, making it harder to lose weight in the long run. Use our <Link href="/en/tools/bmr-calculator">BMR Calculator</Link> to find your numbers and diet smarter.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>ダイエットの基本！基礎代謝(BMR)を計算して食事管理しよう</h1>
                        <p className="lead">
                            「水を飲んでも太る」というのは本当でしょうか？ダイエットの核心は「基礎代謝」にあります。息をしているだけで消費されるカロリーを知ることが、リバウンドしないダイエットへの近道です。
                        </p>

                        <div className="my-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                            <h3 className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 mt-0">
                                <Activity className="w-6 h-6" />
                                基礎代謝(BMR)計算機
                            </h3>
                            <p className="mb-4 text-indigo-900 dark:text-indigo-100">
                                身長、体重、年齢を入力するだけで、あなたの基礎代謝と活動代謝量を1秒で計算します。
                            </p>
                            <Link
                                href="/ja/tools/bmr-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <Activity className="w-5 h-5" />
                                BMRをチェックする
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>基礎代謝(BMR)とは？</h2>
                        <p>
                            BMR(Basal Metabolic Rate)は、私たちが何もせずにじっとしていても、生命維持のために消費される最小限のエネルギーです。心臓の鼓動、呼吸、体温維持などに使われます。
                        </p>

                        <h2>活動代謝量(TDEE)とは？</h2>
                        <p>
                            BMRに「活動レベル」を掛け合わせたものがTDEE(Total Daily Energy Expenditure)です。通勤、運動、家事など、1日の活動で消費するすべてのエネルギーを含みます。
                        </p>

                        <h2>カロリー目標の設定方法</h2>
                        <ol>
                            <li>
                                <strong>減量（ダイエット）:</strong> TDEE - 500 kcal
                                <br />
                                <span className="text-sm text-gray-500">週に約0.5kgの減量が可能</span>
                            </li>
                            <li>
                                <strong>現状維持:</strong> TDEEと同じ量を摂取
                            </li>
                            <li>
                                <strong>増量（バルクアップ）:</strong> TDEE + 300~500 kcal
                            </li>
                        </ol>

                        <p className="mt-8">
                            無理な食事制限は基礎代謝を下げ、逆に太りやすい体質を作ってしまいます。<Link href="/ja/tools/bmr-calculator">BMR計算機</Link>を使って自分の体を正確に把握し、健康的にダイエットしましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
