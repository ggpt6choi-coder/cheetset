import React from 'react';

export default function CompoundInterestGuide({ lang }: { lang: string }) {
    return (
        <article className="prose dark:prose-invert max-w-none">
            <p className="lead">
                아인슈타인은 복리를 "세계 8대 불가사의"라고 불렀습니다. 복리를 이해하는 자는 돈을 벌고, 이해하지 못하는 자는 돈을 낸다는 말처럼, 복리는 자산 증식의 핵심 원리입니다.
            </p>

            <h2>1. 복리란 무엇인가?</h2>
            <p>
                복리(Compound Interest)는 원금에 이자가 붙고, 그 이자에 다시 이자가 붙는 방식을 말합니다.
                단리(Simple Interest)가 원금에 대해서만 이자를 계산하는 것과 달리, 복리는 시간이 지날수록 자산이 기하급수적으로 늘어나는 효과가 있습니다.
            </p>

            <h2>2. 72의 법칙 (Rule of 72)</h2>
            <p>
                복리로 자산이 2배가 되는 데 걸리는 시간을 간단히 계산하는 공식입니다.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center font-mono my-4">
                72 ÷ 연 수익률(%) = 자산이 2배가 되는 기간(년)
            </div>
            <p>
                예를 들어, 연 수익률이 6%라면 72 ÷ 6 = 12년이 걸리고,
                연 수익률이 12%라면 72 ÷ 12 = 6년이 걸립니다.
            </p>

            <h2>3. 복리 효과를 극대화하는 3가지 방법</h2>
            <ul>
                <li><strong>일찍 시작하세요:</strong> 시간은 복리의 가장 큰 친구입니다. 하루라도 빨리 시작할수록 스노우볼 효과는 커집니다.</li>
                <li><strong>수익률을 높이세요:</strong> 1%의 수익률 차이가 10년, 20년 뒤에는 엄청난 차이를 만듭니다.</li>
                <li><strong>꾸준히 투자하세요:</strong> 중간에 멈추지 않고 이자를 재투자하는 것이 중요합니다.</li>
            </ul>

            <h2>4. 복리 계산기 활용하기</h2>
            <p>
                치트셋의 <a href="/ko/tools/compound-interest">복리 계산기</a>를 사용하여 직접 시뮬레이션 해보세요.
                매월 얼마를 적립하고, 몇 퍼센트의 수익을 냈을 때 10년 뒤, 20년 뒤 내 자산이 얼마가 될지 눈으로 확인하는 것은 강력한 동기부여가 됩니다.
            </p>
        </article>
    );
}
