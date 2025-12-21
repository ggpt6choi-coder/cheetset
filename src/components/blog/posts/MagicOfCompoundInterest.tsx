import Link from "next/link";

const MagicOfCompoundInterest = ({ lang }: { lang: string }) => {
    return (
        <article className="prose prose-lg dark:prose-invert max-w-none">
            <h1 className="text-3xl font-bold mb-6">
                복리의 마법: 적은 돈으로 자산을 불리는 가장 확실한 방법
            </h1>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
                <p className="text-xl italic font-serif text-gray-700 dark:text-gray-300">
                    "복리는 세계 8대 불가사의다. 이를 이해하는 자는 돈을 벌고, 이해하지 못하는 자는 돈을 낸다."
                    <br />
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block text-right">- 알베르트 아인슈타인</span>
                </p>
            </div>

            <p className="mb-6">
                안녕하세요! 재테크에 관심 있는 분들이라면 '복리'라는 단어를 수없이 들어보셨을 겁니다.
                하지만 막상 복리가 내 자산에 구체적으로 어떤 영향을 미치는지, 단리와는 얼마나 큰 차이가 있는지
                정확하게 계산해 본 경험은 드물 것입니다.
            </p>

            <p className="mb-6">
                오늘은 왜 부자들이 그토록 복리를 강조하는지, 그리고 우리가 적은 돈으로 시작해도
                시간이 지나면 어떻게 막대한 자산을 만들 수 있는지 그 비밀을 파헤쳐 보려 합니다.
                단순한 이론뿐만 아니라, 실제 숫자로 증명되는 '복리의 마법'을 직접 확인해 보세요.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">1. 단리(Simple Interest) vs 복리(Compound Interest)</h2>
            <p className="mb-6">
                가장 먼저 이해해야 할 것은 단리와 복리의 근본적인 차이입니다.
                단리는 <b>'원금'에 대해서만 이자가 붙는 방식</b>이고,
                복리는 <b>'원금 + 이자'에 다시 이자가 붙는 방식</b>입니다.
            </p>
            <p className="mb-6">
                처음에는 이 차이가 미미해 보일 수 있습니다. 하지만 시간이 지날수록, 이자에 이자가 붙는
                스노우볼 효과(Snowball Effect)로 인해 격차는 기하급수적으로 벌어지게 됩니다.
            </p>

            <div className="overflow-x-auto mb-8">
                <table className="min-w-full text-left text-sm whitespace-nowrap">
                    <thead className="uppercase tracking-wider border-b-2 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-4">구분</th>
                            <th scope="col" className="px-6 py-4">단리 (Simple Interest)</th>
                            <th scope="col" className="px-6 py-4">복리 (Compound Interest)</th>
                        </tr>
                    </thead>
                    <tbody className="border-b dark:border-gray-700">
                        <tr className="border-b dark:border-gray-800">
                            <td className="px-6 py-4 font-bold">계산 방식</td>
                            <td className="px-6 py-4">원금 × 이자율 × 기간</td>
                            <td className="px-6 py-4">원금 × (1 + 이자율)^기간</td>
                        </tr>
                        <tr className="border-b dark:border-gray-800">
                            <td className="px-6 py-4 font-bold">이자의 대상</td>
                            <td className="px-6 py-4">오직 '원금'에만 부과</td>
                            <td className="px-6 py-4">'원금' + '쌓인 이자' 모두에 부과</td>
                        </tr>
                        <tr className="border-b dark:border-gray-800">
                            <td className="px-6 py-4 font-bold">자산 증가 속도</td>
                            <td className="px-6 py-4">직선적으로 증가 (Linear)</td>
                            <td className="px-6 py-4">기하급수적으로 증가 (Exponential)</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold">장기 투자 효과</td>
                            <td className="px-6 py-4">기간이 길어도 효과가 일정함</td>
                            <td className="px-6 py-4">기간이 길어질수록 폭발적으로 증가</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">2. 실제 시뮬레이션: 월 50만 원의 기적</h2>
            <p className="mb-6">
                많은 분들이 "나는 투자할 돈이 없어서 복리 효과를 못 누려"라고 생각하십니다.
                하지만 복리의 핵심은 '큰 돈'이 아니라 '오랜 시간'입니다.
            </p>
            <p className="mb-6">
                사회초년생이 <b>월 50만 원씩</b>, 연이율 <b>8%</b>(S&P 500 평균 수익률 가정)로
                <b>10년</b>, <b>20년</b>, <b>30년</b> 동안 투자했을 때 자산이 어떻게 변하는지 시뮬레이션 해보겠습니다.
                (저희 사이트의 <Link href={`/${lang}/tools/compound-interest`} className="text-blue-600 hover:text-blue-800 font-bold underline">복리 계산기</Link>를 활용한 결과입니다.)
            </p>

            <div className="my-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-center">📈 월 50만원 적립식 투자 (연 8% 복리 가정)</h3>
                <ul className="space-y-4">
                    <li className="flex justify-between border-b pb-2 dark:border-gray-700">
                        <span>10년 후</span>
                        <span className="font-bold text-green-600 dark:text-green-400">약 9,200만 원 (원금 6,000만 원)</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 dark:border-gray-700">
                        <span>20년 후</span>
                        <span className="font-bold text-green-600 dark:text-green-400">약 2억 9,600만 원 (원금 1억 2,000만 원)</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 dark:border-gray-700">
                        <span>30년 후</span>
                        <span className="font-bold text-green-600 dark:text-green-400">약 7억 5,000만 원 (원금 1억 8,000만 원)</span>
                    </li>
                </ul>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    * 원금은 3배 차이지만, 30년 후의 최종 자산은 10년 후보다 <b>8배 이상</b> 증가했습니다.
                </p>
            </div>

            <p className="mb-6">
                놀랍지 않으신가요? 30년 동안 원금은 고작 1억 8천만 원을 넣었을 뿐인데,
                복리의 마법 덕분에 자산은 <b>7억 5천만 원</b>으로 불어났습니다.
                이것이 바로 시간이 돈을 벌어준다는 말의 진짜 의미입니다.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">3. 지금 당장 계산해봐야 하는 이유</h2>
            <p className="mb-6">
                복리 효과를 극대화하기 위한 가장 중요한 변수는 '수익률'도 '투자 금액'도 아닌, 바로 <b>'시간'</b>입니다.
                하루라도 일찍 시작하는 것이 나중의 10년보다 더 큰 가치를 가집니다.
            </p>

            <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-8 border border-yellow-200 dark:border-yellow-700">
                <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-200 mb-2">💡 여러분의 미래 자산을 확인해보세요</h3>
                <p className="mb-4 text-yellow-900 dark:text-yellow-100">
                    지금 가진 돈이나 매달 저축할 수 있는 금액으로 10년 뒤, 20년 뒤에 얼마를 모을 수 있을까요?
                    단리와 복리의 차이를 직접 눈으로 확인하면 재테크에 대한 동기부여가 확실해집니다.
                </p>
                <div className="text-center mt-6">
                    <Link
                        href={`/${lang}/tools/compound-interest`}
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-transform hover:scale-105"
                    >
                        👉 복리 계산기로 내 자산 예측하기
                    </Link>
                </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">결론: 시간은 누구에게나 공평하다</h2>
            <p className="mb-6">
                부자가 되는 길은 멀고 험해 보이지만, 복리라는 도구를 이용하면 그 길은 훨씬 수월해집니다.
                워렌 버핏 자산의 99%가 50세 이후에 형성되었다는 사실을 기억하세요.
                그는 단지 아주 오랫동안 투자를 멈추지 않았을 뿐입니다.
            </p>
            <p className="mb-6">
                지금 당장 여러분의 재무 목표를 세우고, 복리 계산기를 두드려보세요.
                그리고 오늘부터 작게라도 시작하세요. 10년 뒤의 여러분은 오늘 시작한 자신에게 깊이 감사하게 될 것입니다.
            </p>
        </article>
    );
};

export default MagicOfCompoundInterest;
