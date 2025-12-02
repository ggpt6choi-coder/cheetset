import React from 'react';

type Props = {
    lang: string;
};

export default function SalaryCalculatorGuide2025({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>2025년 연봉 실수령액 계산기: 내 월급은 얼마일까?</h1>
                        <p className="lead">연봉 3천, 5천, 1억... 계약서에 적힌 금액과 실제 통장에 들어오는 돈은 왜 다를까요? 2025년 최신 세율이 적용된 4대보험과 소득세를 완벽하게 분석해 드립니다.</p>

                        <p>안녕하세요! 직장인의 필수 친구 <strong>치트셋(Cheetset)</strong>입니다.</p>
                        <p>취업에 성공하거나 이직을 준비할 때 가장 중요한 조건 중 하나는 바로 <strong>연봉</strong>입니다. 하지만 "연봉 5,000만 원"이라고 해서 매달 5,000 ÷ 12 = 416만 원을 받는 것은 아닙니다.</p>
                        <p>바로 <strong>4대보험</strong>과 <strong>세금</strong> 때문이죠. 오늘은 내 월급을 '로그아웃' 시키는 주범인 공제 항목들을 낱낱이 파헤치고, 2025년 기준으로 내 진짜 월급(실수령액)을 1초 만에 계산하는 방법을 알려드리겠습니다.</p>

                        <h2>1. 내 월급에서 빠져나가는 것들 (공제 항목)</h2>
                        <p>월급 명세서를 보면 "지급 내역"보다 "공제 내역"이 더 눈에 띌 때가 있습니다. 도대체 무엇이 얼마나 빠져나가는 걸까요?</p>

                        <h3>1-1. 국민연금 (4.5%)</h3>
                        <p>노후를 대비하기 위한 연금입니다. 회사와 근로자가 각각 4.5%씩 부담하여 총 9%를 납부합니다. 월 소득 상한액(약 617만 원)이 있어, 그 이상 벌어도 국민연금은 더 오르지 않습니다.</p>

                        <h3>1-2. 건강보험 (3.545%)</h3>
                        <p>병원비 부담을 줄여주는 보험입니다. 2024년 기준 3.545%이며, 매년 조금씩 인상되는 추세입니다. 역시 회사와 반반 부담합니다.</p>

                        <h3>1-3. 장기요양보험 (건강보험료의 12.95%)</h3>
                        <p>노인성 질환 등으로 요양이 필요할 때를 대비한 보험입니다. 건강보험료의 약 12.95%가 추가로 부과됩니다.</p>

                        <h3>1-4. 고용보험 (0.9%)</h3>
                        <p>실직 시 실업급여를 받기 위한 보험입니다. 근로자는 0.9%를 부담합니다.</p>

                        <h3>1-5. 소득세 & 지방소득세</h3>
                        <p>국가에 내는 세금입니다. 연봉 수준과 부양가족 수에 따라 '근로소득 간이세액표'를 기준으로 떼어갑니다. 지방소득세는 소득세의 10%입니다.</p>

                        <h2>2. 연봉별 예상 실수령액 (2025년 기준)</h2>
                        <p>부양가족 1인(본인) 기준으로 대략적인 실수령액을 계산해 보았습니다.</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-700">
                                        <th className="py-2 px-4 border-b">연봉</th>
                                        <th className="py-2 px-4 border-b">월 실수령액 (예상)</th>
                                        <th className="py-2 px-4 border-b">공제액 합계</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">3,000만 원</td>
                                        <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 223만 원</td>
                                        <td className="py-2 px-4 border-b text-center">약 27만 원</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">4,000만 원</td>
                                        <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 290만 원</td>
                                        <td className="py-2 px-4 border-b text-center">약 43만 원</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">5,000만 원</td>
                                        <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 355만 원</td>
                                        <td className="py-2 px-4 border-b text-center">약 61만 원</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 border-b text-center">1억 원</td>
                                        <td className="py-2 px-4 border-b text-center font-bold text-blue-600">약 650만 원</td>
                                        <td className="py-2 px-4 border-b text-center">약 183만 원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">* 위 표는 대략적인 추정치이며, 비과세 식대 등 조건에 따라 달라질 수 있습니다.</p>

                        <h2>3. 1초 만에 정확하게 계산하는 방법</h2>
                        <p>복잡한 표를 찾아볼 필요 없이, <strong>치트셋 연봉 계산기</strong>를 사용하면 1초 만에 정확한 금액을 알 수 있습니다.</p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 내 연봉 실수령액 확인하기</p>
                            <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">연봉만 입력하면 세금, 4대보험, 월 수령액이 자동으로 계산됩니다.</p>
                            <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">계산기 바로가기 →</a>
                        </div>

                        <h2>4. 자주 묻는 질문 (FAQ)</h2>
                        <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <summary className="font-bold cursor-pointer">Q. 퇴직금은 연봉에 포함되나요?</summary>
                            <p className="mt-2 text-sm">A. 보통 '연봉'이라고 하면 퇴직금 별도인 경우가 많습니다. 하지만 일부 계약(연봉제)에서는 퇴직금을 포함하여 1/13로 나누어 지급하기도 하므로 계약서를 꼼꼼히 확인해야 합니다.</p>
                        </details>
                        <details className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <summary className="font-bold cursor-pointer">Q. 비과세 식대란 무엇인가요?</summary>
                            <p className="mt-2 text-sm">A. 월 20만 원까지의 식대는 세금을 떼지 않습니다. 비과세 항목이 많을수록 실수령액은 늘어납니다.</p>
                        </details>

                        <h2>마치며</h2>
                        <p>연봉 협상이나 이직을 할 때, 단순히 총액만 보지 말고 <strong>실수령액</strong>을 꼭 계산해보세요. 치트셋 계산기가 여러분의 현명한 연봉 설계를 도와드리겠습니다!</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>2025 Salary Calculator: How Much is My Take-Home Pay?</h1>
                        <p className="lead">Gross Salary vs. Net Salary. Why is the money in my bank account different from my contract? We explain taxes and deductions for 2025.</p>

                        <p>Hello! This is <strong>Cheetset</strong>.</p>
                        <p>When you get a job offer, the most important number is your <strong>Annual Salary</strong>. But if your offer is $50,000, you don't get $4,166 every month.</p>
                        <p>Taxes and insurance premiums are deducted first. Today, let's find out how to calculate your <strong>Real Take-Home Pay</strong>.</p>

                        <h2>1. Where Does My Money Go? (Deductions)</h2>
                        <p>Here are the common deductions in many countries (rates vary by location, this guide focuses on general principles and South Korean specifics as an example):</p>

                        <h3>1-1. National Pension</h3>
                        <p>Saving for retirement. Usually, the employer and employee split the cost.</p>

                        <h3>1-2. Health Insurance</h3>
                        <p>Medical insurance coverage. Essential for healthcare access.</p>

                        <h3>1-3. Income Tax</h3>
                        <p>The tax you pay to the government based on your income bracket. The more you earn, the higher the percentage.</p>

                        <h2>2. Calculate Instantly with Cheetset</h2>
                        <p>Don't struggle with complex tax tables. Use the <strong>Cheetset Salary Calculator</strong>.</p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 Check My Take-Home Pay</p>
                            <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">Enter your salary and get instant results for taxes and net pay.</p>
                            <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">Go to Calculator →</a>
                        </div>

                        <h2>3. Why Net Salary Matters</h2>
                        <p>When negotiating a salary, always look at the <strong>Net Salary</strong> (after tax). This is the actual money you can spend or save.</p>
                        <p>Use our tool to plan your finances smartly!</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>2025年給与手取り計算機：私の手取りはいくら？</h1>
                        <p className="lead">年収300万、500万... 契約書の金額と実際に振り込まれる金額はなぜ違うのでしょうか？2025年の最新税率を適用した社会保険と税金を完全に分析します。</p>

                        <p>こんにちは！<strong>Cheetset</strong>です。</p>
                        <p>就職や転職で最も重要な条件の一つが<strong>年収</strong>です。しかし、「年収500万円」だからといって、毎月 500 ÷ 12 = 41.6万円 もらえるわけではありません。</p>
                        <p><strong>社会保険料</strong>と<strong>税金</strong>が引かれるからです。今日は、給料から引かれる項目を詳しく解説し、あなたの本当の手取り額を1秒で計算する方法をお教えします。</p>

                        <h2>1. 給料から引かれるもの（控除項目）</h2>

                        <h3>1-1. 厚生年金</h3>
                        <p>老後のための年金です。会社と従業員が折半して負担します。</p>

                        <h3>1-2. 健康保険</h3>
                        <p>医療費の負担を減らす保険です。これも会社と折半します。</p>

                        <h3>1-3. 雇用保険</h3>
                        <p>失業した際に手当を受け取るための保険です。</p>

                        <h3>1-4. 所得税・住民税</h3>
                        <p>国と地方自治体に納める税金です。年収や扶養家族の数によって決まります。</p>

                        <h2>2. 1秒で正確に計算する方法</h2>
                        <p>複雑な計算は不要です。<strong>Cheetset給与計算機</strong>を使えば、1秒で正確な金額がわかります。</p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-blue-800 dark:text-blue-200">💰 私の手取りを確認する</p>
                            <p className="mb-4 text-sm text-blue-600 dark:text-blue-300">年収を入力するだけで、税金、社会保険、手取り額が自動計算されます。</p>
                            <a href={`/${lang}/tools/salary-calculator`} className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-bold text-lg shadow-lg">計算機へ →</a>
                        </div>

                        <h2>まとめ</h2>
                        <p>給与交渉や転職の際は、額面だけでなく<strong>手取り額</strong>を必ず計算してみてください。Cheetset計算機があなたの賢い資金計画をお手伝いします！</p>
                    </>
                )}
            </article>
        </div>
    );
}
