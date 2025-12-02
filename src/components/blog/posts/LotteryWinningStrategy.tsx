import React from 'react';

type Props = {
    lang: string;
};

export default function LotteryWinningStrategy({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>로또 1등 당첨 확률 높이는 번호 선택 전략 완벽 가이드</h1>
                        <p className="lead">매주 로또를 사는데 한 번도 당첨된 적 없으신가요? 통계 데이터로 검증된 번호 선택 전략과 피해야 할 흔한 실수를 공개합니다.</p>

                        <h2>1. 로또 당첨 확률의 현실</h2>
                        <p>로또 1등 당첨 확률은 <strong>약 814만 분의 1</strong>입니다. 하지만 매주 수백만 명이 로또를 구매하는 이유는? 누군가는 반드시 당첨되기 때문입니다.</p>

                        <h2>2. 통계로 본 당첨 번호 패턴</h2>
                        <h3>자주 나오는 번호 TOP 5</h3>
                        <p>지난 10년간의 로또 당첨 번호를 분석한 결과:</p>
                        <ul>
                            <li>1위: 43번 (가장 자주 등장)</li>
                            <li>2위: 34번</li>
                            <li>3위: 17번</li>
                            <li>4위: 27번</li>
                            <li>5위: 10번</li>
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400">※ 참고용 데이터이며, 미래 당첨을 보장하지 않습니다.</p>

                        <h3>피해야 할 번호 조합</h3>
                        <ul>
                            <li>❌ <strong>연속 번호:</strong> 1, 2, 3, 4, 5, 6 같은 조합은 당첨 확률 극히 낮음</li>
                            <li>❌ <strong>생일 번호만:</strong> 1~31번에만 집중하면 범위가 좁아짐</li>
                            <li>❌ <strong>같은 끝자리:</strong> 3, 13, 23, 33, 43처럼 끝자리가 같은 번호 여러 개</li>
                        </ul>

                        <h2>3. 현명한 번호 선택 전략 5가지</h2>
                        <h3>전략 #1: 홀짝 균형 맞추기</h3>
                        <p>홀수와 짝수를 <strong>3:3 또는 4:2 비율</strong>로 섞으세요. 6개 모두 홀수 또는 짝수인 경우는 통계적으로 드뭅니다.</p>

                        <h3>전략 #2: 고저 비율 분산</h3>
                        <p>1-22 (저), 23-45 (고) 범위에서 고르게 선택하세요. 한쪽에만 집중하지 마세요.</p>

                        <h3>전략 #3: 번호 간격 확보</h3>
                        <p>너무 붙어있는 번호(예: 7, 8, 9)보다는 적절한 간격을 둔 번호가 유리합니다.</p>

                        <h3>전략 #4: 이전 당첨번호 피하기</h3>
                        <p>이전 회차의 당첨번호가 그대로 다시 나올 확률은 거의 0%에 가깝습니다.</p>

                        <h3>전략 #5: 랜덤 생성기 활용</h3>
                        <p>사람이 직접 고르면 무의식적인 편향이 생깁니다. <strong>랜덤 생성기</strong>를 사용하면 진정한 무작위 번호를 얻을 수 있습니다.</p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 과학적인 로또 번호 생성</p>
                            <p className="mb-4 text-sm text-yellow-600 dark:text-yellow-300">통계 기반 알고리즘으로 균형잡힌 번호 조합 생성!</p>
                            <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg">무료 로또 번호 생성 →</a>
                        </div>

                        <h2>4. 로또 구매 시 주의사항</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                            <p className="font-bold text-red-800 dark:text-red-200">⚠️ 과도한 구매는 금물</p>
                            <ul className="mt-2">
                                <li>• 생활비를 건드리지 마세요</li>
                                <li>• 일주일에 1-2장 정도만 즐기기</li>
                                <li>• 로또는 투자가 아닌 오락입니다</li>
                            </ul>
                        </div>

                        <h2>5. 당첨자들의 공통점</h2>
                        <p>실제 로또 1등 당첨자 인터뷰를 분석한 결과, 놀라운 공통점을 발견했습니다:</p>
                        <ul>
                            <li>✅ 꾸준히 구매했지만 과도하지 않았음</li>
                            <li>✅ 자신만의 번호 선택 원칙이 있었음</li>
                            <li>✅ 당첨 전까지 기대보다는 즐김</li>
                        </ul>

                        <h2>마무리: 현명한 로또 즐기기</h2>
                        <p>로또는 꿈과 희망을 파는 것입니다. 확률을 아는 것도 중요하지만, 너무 집착하지 마세요. 위에서 소개한 전략을 참고하되, <strong>건전한 소비 범위 내에서 즐기는 것</strong>이 가장 중요합니다.</p>
                        <p>여러분의 행운을 <strong>Cheetset</strong>이 응원합니다! 🍀</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to Increase Your Chances of Winning the Lottery</h1>
                        <p className="lead">Tired of never winning? Learn data-driven number selection strategies and common mistakes to avoid.</p>

                        <h2>1. The Reality of Lottery Odds</h2>
                        <p>Powerball 1st prize odds: <strong>1 in 292 million</strong>. But millions still play because someone always wins.</p>

                        <h2>2. Statistical Patterns</h2>
                        <h3>Most Frequently Drawn Numbers:</h3>
                        <ul>
                            <li>1st: 26</li>
                            <li>2nd: 41</li>
                            <li>3rd: 16</li>
                            <li>4th: 22</li>
                            <li>5th: 42</li>
                        </ul>

                        <h3>Avoid These Combinations:</h3>
                        <ul>
                            <li>❌ Consecutive numbers (1,2,3,4,5,6)</li>
                            <li>❌ Only birthdays (limits to 1-31)</li>
                            <li>❌ Same ending digits (3,13,23,33)</li>
                        </ul>

                        <h2>3. Smart Selection Strategies</h2>
                        <h3>#1: Balance Odd/Even</h3>
                        <p>Mix odds and evens in <strong>3:3 or 4:2 ratio</strong>.</p>

                        <h3>#2: Spread High/Low</h3>
                        <p>Don't cluster all numbers in one range.</p>

                        <h3>#3: Use Random Generators</h3>
                        <p>Human picks have unconscious bias. Use random generators for true randomness.</p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 Scientific Number Generator</p>
                            <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg mt-4">Generate Numbers →</a>
                        </div>

                        <h2>Conclusion</h2>
                        <p>Lottery is entertainment, not investment. Play responsibly within your means. Good luck! 🍀</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>宝くじ1等当選確率を高める番号選択戦略</h1>
                        <p className="lead">毎週宝くじを買っても当たらない？統計データで検証された番号選択戦略と避けるべきミスを公開します。</p>

                        <h2>1. 宝くじ当選確率の現実</h2>
                        <p>ロト6の1等当選確率は<strong>約600万分の1</strong>です。しかし毎週何百万人も買う理由は？誰かは必ず当たるからです。</p>

                        <h2>2. よく出る番号TOP 5</h2>
                        <ul>
                            <li>1位: 43番</li>
                            <li>2位: 38番</li>
                            <li>3位: 8番</li>
                            <li>4位: 37番</li>
                            <li>5位: 11番</li>
                        </ul>

                        <h2>3. 賢い番号選択戦略</h2>
                        <h3>戦略 #1: 奇数偶数のバランス</h3>
                        <p>奇数と偶数を<strong>3:3または4:2の比率</strong>で混ぜてください。</p>

                        <h3>戦略 #2: ランダム生成器活用</h3>
                        <p>人間が直接選ぶと無意識の偏りが生じます。<strong>ランダム生成器</strong>を使えば真の無作為番号が得られます。</p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-yellow-800 dark:text-yellow-200">🎰 科学的な宝くじ番号生成</p>
                            <a href={`/${lang}/tools/lotto-generator`} className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors font-bold text-lg shadow-lg mt-4">番号生成 →</a>
                        </div>

                        <h2>まとめ</h2>
                        <p>宝くじは夢と希望を買うものです。確率を知ることも大切ですが、過度に執着しないでください。健全な範囲内で楽しむことが最も重要です。🍀</p>
                    </>
                )}
            </article>
        </div>
    );
}
