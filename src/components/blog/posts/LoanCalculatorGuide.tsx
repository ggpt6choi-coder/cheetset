import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, DollarSign, TrendingDown } from 'lucide-react';

type Props = {
    lang: string;
};

export default function LoanCalculatorGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>대출 이자 줄이는 상환 방식 비교: 원리금균등 vs 원금균등</h1>
                        <p className="lead">
                            대출을 받을 때 가장 고민되는 것이 바로 '상환 방식'입니다. 어떤 방식을 선택하느냐에 따라 총 이자가 수백만 원까지 차이날 수 있습니다. 나에게 딱 맞는 상환 방식은 무엇일까요?
                        </p>

                        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mt-0">
                                <Calculator className="w-6 h-6" />
                                대출 이자 계산기
                            </h3>
                            <p className="mb-4 text-blue-900 dark:text-blue-100">
                                원리금균등, 원금균등, 만기일시 상환 방식별 월 납입금과 총 이자를 비교해보세요.
                            </p>
                            <Link
                                href="/ko/tools/loan-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <DollarSign className="w-5 h-5" />
                                이자 계산하러 가기
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>1. 원리금균등분할상환 (Equal Principal & Interest)</h2>
                        <p>
                            가장 대중적인 방식입니다. 대출 기간 동안 매월 납부하는 금액(원금+이자)이 일정합니다.
                        </p>
                        <ul>
                            <li><strong>장점:</strong> 매월 나가는 돈이 똑같아서 자금 계획을 세우기 좋습니다.</li>
                            <li><strong>단점:</strong> 초기에는 이자 비중이 높고 원금이 천천히 줄어듭니다. 원금균등 방식보다 총 이자가 조금 더 많습니다.</li>
                            <li><strong>추천:</strong> 고정적인 월급을 받는 직장인.</li>
                        </ul>

                        <h2>2. 원금균등분할상환 (Equal Principal)</h2>
                        <p>
                            매월 갚는 '원금'이 일정하고, 이자는 남은 잔액에 대해서만 계산하는 방식입니다.
                        </p>
                        <ul>
                            <li><strong>장점:</strong> <strong>총 이자가 가장 적습니다.</strong> 시간이 지날수록 월 납입금이 줄어듭니다.</li>
                            <li><strong>단점:</strong> 초기에 납부해야 할 금액이 가장 커서 부담이 될 수 있습니다.</li>
                            <li><strong>추천:</strong> 초기 자금 여력이 있고, 이자를 최대한 아끼고 싶은 분.</li>
                        </ul>

                        <h2>3. 만기일시상환 (Maturity)</h2>
                        <p>
                            대출 기간 동안은 이자만 내다가, 만기에 원금을 한꺼번에 갚는 방식입니다.
                        </p>
                        <ul>
                            <li><strong>장점:</strong> 대출 기간 동안 매월 내는 돈이 가장 적습니다.</li>
                            <li><strong>단점:</strong> <strong>총 이자가 가장 많습니다.</strong> 만기에 목돈을 갚아야 하는 부담이 큽니다.</li>
                            <li><strong>추천:</strong> 전세자금대출이나 단기 자금 융통이 필요한 경우.</li>
                        </ul>

                        <h2>실전 비교: 1억 원을 5% 금리로 10년 빌린다면?</h2>
                        <div className="not-prose overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">상환 방식</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">총 이자</th>
                                        <th className="px-6 py-3 text-left font-medium text-gray-500 dark:text-gray-300">특징</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 font-medium">원금균등</td>
                                        <td className="px-6 py-4 text-blue-600 font-bold">약 2,520만 원</td>
                                        <td className="px-6 py-4">이자가 제일 적음 👍</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">원리금균등</td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">약 2,728만 원</td>
                                        <td className="px-6 py-4">관리하기 편함</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-medium">만기일시</td>
                                        <td className="px-6 py-4 text-red-500 font-bold">5,000만 원</td>
                                        <td className="px-6 py-4">이자가 제일 많음 👎</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className="mt-8">
                            지금 바로 <Link href="/ko/tools/loan-calculator">대출 이자 계산기</Link>를 사용하여 내 상황에 맞는 최적의 상환 방식을 찾아보세요.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Loan Repayment Methods Compared: Which Saves You More?</h1>
                        <p className="lead">
                            Choosing the right repayment method can save you thousands in interest. Let's compare Equal Principal & Interest, Equal Principal, and Maturity repayment.
                        </p>

                        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mt-0">
                                <Calculator className="w-6 h-6" />
                                Free Loan Calculator
                            </h3>
                            <p className="mb-4 text-blue-900 dark:text-blue-100">
                                Compare monthly payments and total interest for different loan types.
                            </p>
                            <Link
                                href="/en/tools/loan-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <DollarSign className="w-5 h-5" />
                                Calculate Interest Now
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>1. Equal Principal & Interest</h2>
                        <p>
                            The most common method. Your monthly payment (principal + interest) remains the same throughout the loan term.
                        </p>
                        <ul>
                            <li><strong>Pros:</strong> Predictable monthly expenses. Easier to budget.</li>
                            <li><strong>Cons:</strong> Total interest is slightly higher than the Equal Principal method.</li>
                            <li><strong>Best for:</strong> Salaried employees with fixed income.</li>
                        </ul>

                        <h2>2. Equal Principal</h2>
                        <p>
                            You pay a fixed amount of principal each month, plus interest on the remaining balance.
                        </p>
                        <ul>
                            <li><strong>Pros:</strong> <strong>Lowest total interest.</strong> Monthly payments decrease over time.</li>
                            <li><strong>Cons:</strong> Initial monthly payments are the highest.</li>
                            <li><strong>Best for:</strong> Those who want to minimize interest costs and can afford higher initial payments.</li>
                        </ul>

                        <h2>3. Maturity (Bullet Repayment)</h2>
                        <p>
                            You only pay interest during the loan term and repay the entire principal at the end.
                        </p>
                        <ul>
                            <li><strong>Pros:</strong> Lowest monthly payments during the term.</li>
                            <li><strong>Cons:</strong> <strong>Highest total interest.</strong> Huge burden to repay principal at the end.</li>
                            <li><strong>Best for:</strong> Short-term financing or when expecting a large lump sum later.</li>
                        </ul>

                        <p className="mt-8">
                            Use our <Link href="/en/tools/loan-calculator">Loan Calculator</Link> to simulate your loan and find the best repayment strategy.
                        </p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>ローン返済方式の比較：利息を一番節約できるのは？</h1>
                        <p className="lead">
                            ローンの返済方式によって、支払う総利息に大きな差が出ます。元利均等、元金均等、満期一括返済の違いを理解し、自分に合った方式を選びましょう。
                        </p>

                        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800">
                            <h3 className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mt-0">
                                <Calculator className="w-6 h-6" />
                                ローン計算機
                            </h3>
                            <p className="mb-4 text-blue-900 dark:text-blue-100">
                                返済方式ごとの月々の支払額と総利息をシミュレーションできます。
                            </p>
                            <Link
                                href="/ja/tools/loan-calculator"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors no-underline"
                            >
                                <DollarSign className="w-5 h-5" />
                                利息を計算する
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <h2>1. 元利均等返済 (Equal Principal & Interest)</h2>
                        <p>
                            最も一般的な方式です。毎月の返済額（元金＋利息）が一定です。
                        </p>
                        <ul>
                            <li><strong>メリット:</strong> 毎月の支出が一定なので、家計管理がしやすいです。</li>
                            <li><strong>デメリット:</strong> 元金均等返済に比べて総利息が少し多くなります。</li>
                            <li><strong>おすすめ:</strong> 毎月決まった給料をもらう会社員の方。</li>
                        </ul>

                        <h2>2. 元金均等返済 (Equal Principal)</h2>
                        <p>
                            毎月一定額の「元金」を返し、利息は残高に応じて計算する方式です。
                        </p>
                        <ul>
                            <li><strong>メリット:</strong> <strong>総利息が最も少ないです。</strong> 時間が経つにつれて毎月の支払額が減っていきます。</li>
                            <li><strong>デメリット:</strong> 初回の支払額が最も高く、初期の負担が大きいです。</li>
                            <li><strong>おすすめ:</strong> 利息をできるだけ節約したい方、初期の資金に余裕がある方。</li>
                        </ul>

                        <h2>3. 満期一括返済 (Maturity)</h2>
                        <p>
                            期間中は利息だけを払い、満期時に元金をまとめて返す方式です。
                        </p>
                        <ul>
                            <li><strong>メリット:</strong> 期間中の毎月の支払額が最も少ないです。</li>
                            <li><strong>デメリット:</strong> <strong>総利息が最も多いです。</strong> 最後に大きな金額を返す負担があります。</li>
                            <li><strong>おすすめ:</strong> 短期間の資金繰りや、将来まとまったお金が入る予定がある場合。</li>
                        </ul>

                        <p className="mt-8">
                            今すぐ<Link href="/ja/tools/loan-calculator">ローン計算機</Link>を使って、最適な返済プランを見つけましょう。
                        </p>
                    </>
                )}
            </article>
        </div>
    );
}
