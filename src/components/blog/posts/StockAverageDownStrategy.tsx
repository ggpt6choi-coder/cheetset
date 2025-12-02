import React from 'react';

type Props = {
    lang: string;
};

export default function StockAverageDownStrategy({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>주식 물타기 계산기 활용법: 손실을 수익으로 바꾸는 매수 전략</h1>
                        <p className="lead">"지금 사면 평단가 얼마나 낮아질까?" 감으로 물타기 하다가 비자발적 장기 투자자가 되셨나요? 정확한 계산과 전략만이 살길입니다.</p>

                        <p>안녕하세요! 스마트한 투자자의 친구 <strong>치트셋(Cheetset)</strong>입니다.</p>
                        <p>주식이나 코인 투자를 하다 보면 피할 수 없는 상황이 바로 <strong>'물림'</strong>입니다. 내가 사자마자 가격이 떨어지는 마법 같은 경험, 다들 있으시죠?</p>
                        <p>이때 많은 분들이 선택하는 전략이 바로 <strong>'물타기(Averaging Down)'</strong>입니다. 낮은 가격에 추가 매수하여 평균 단가를 낮추는 것이죠. 하지만 무턱대고 물을 타다가는 '한강 물'을 보게 될 수도 있습니다. 오늘은 성공적인 물타기를 위한 전략과 계산기 활용법을 알아보겠습니다.</p>

                        <h2>1. 물타기(Averaging Down)란?</h2>
                        <p>보유한 주식의 가격이 하락했을 때, 추가로 매수하여 평균 매입 단가를 낮추는 투자 기법입니다.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">
                                예시:<br />
                                1. 10,000원에 1주 매수 (총 10,000원)<br />
                                2. 5,000원으로 하락 시 1주 추가 매수 (총 15,000원 / 2주)<br />
                                3. <strong>최종 평단가: 7,500원</strong>
                            </p>
                        </div>
                        <p>주가가 10,000원까지 회복하지 않아도, 7,500원만 넘으면 수익을 낼 수 있다는 것이 핵심입니다.</p>

                        <h2>2. 물타기의 3가지 원칙</h2>
                        <h3>원칙 #1: 분할 매수 (Split Buying)</h3>
                        <p>한 번에 모든 현금을 쏟아붓지 마세요. 바닥 밑에 지하실이 있을 수 있습니다. 자금을 3~4분할하여 계획적으로 접근해야 합니다.</p>

                        <h3>원칙 #2: 확실한 반등 신호</h3>
                        <p>떨어지는 칼날을 잡지 마세요. 하락세가 멈추고 지지선을 형성하거나 반등하는 기미가 보일 때 들어가는 것이 안전합니다.</p>

                        <h3>원칙 #3: 정확한 계산</h3>
                        <p>"이 정도 사면 꽤 낮아지겠지?"라는 감은 위험합니다. 정확히 몇 주를 사야 내 목표 평단가에 도달하는지 계산해야 합니다.</p>

                        <h2>3. 치트셋 물타기 계산기 활용법</h2>
                        <p>복잡한 수식 없이, 숫자만 입력하면 1초 만에 결과를 보여드립니다.</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 물타기 계산기 바로가기</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">현재 보유량과 추가 매수량을 입력하여 최종 평단가를 확인하세요.</p>
                            <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">계산기 실행하기 →</a>
                        </div>

                        <h3>사용 시나리오</h3>
                        <ol>
                            <li><strong>현재 상태 입력:</strong> 보유 중인 주식의 평단가와 수량을 입력합니다.</li>
                            <li><strong>추가 매수 계획:</strong> 현재 시장 가격(또는 매수 희망가)과 가용 현금으로 살 수 있는 수량을 입력합니다.</li>
                            <li><strong>결과 확인:</strong> '계산하기'를 누르면 최종 평단가가 나옵니다.</li>
                            <li><strong>전략 수정:</strong> 목표 평단가가 너무 높다면, 추가 매수량을 늘리거나 더 낮은 가격을 기다려야 합니다.</li>
                        </ol>

                        <h2>4. 물타기 vs 불타기</h2>
                        <ul>
                            <li><strong>물타기 (Scale Trading):</strong> 손실 중일 때 평단가를 낮춤 (방어적)</li>
                            <li><strong>불타기 (Pyramiding):</strong> 수익 중일 때 추가 매수하여 수익금을 극대화 (공격적)</li>
                        </ul>
                        <p>우리 계산기는 두 가지 경우 모두 사용할 수 있습니다. 불타기 시에는 평단가가 높아지지만, 상승 추세가 확실하다면 수익금을 크게 늘릴 수 있습니다.</p>

                        <h2>마치며</h2>
                        <p>물타기는 '신의 한 수'가 될 수도, '악수'가 될 수도 있습니다. 중요한 것은 <strong>계획된 매매</strong>입니다. 치트셋 계산기와 함께 감정을 배제하고 숫자로 투자하세요. 여러분의 성투를 기원합니다! 📈</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Stock Average Down Strategy: How to Turn Losses into Profits</h1>
                        <p className="lead">Bought high and the price dropped? Don't panic. Learn how to use the "Averaging Down" strategy to lower your break-even price and recover faster.</p>

                        <p>Hello! This is <strong>Cheetset</strong>.</p>
                        <p>Every investor faces a moment when their stock drops immediately after buying. It's painful, but it's part of the game.</p>
                        <p>A common strategy to handle this is <strong>Averaging Down</strong>. By buying more shares at a lower price, you lower your average cost per share. Today, let's master this strategy.</p>

                        <h2>1. What is Averaging Down?</h2>
                        <p>It involves purchasing additional shares of an asset you already own after its price has dropped.</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">
                                Example:<br />
                                1. Buy 1 share at $100 (Total $100)<br />
                                2. Price drops to $50. Buy 1 more share. (Total $150 / 2 shares)<br />
                                3. <strong>New Average Price: $75</strong>
                            </p>
                        </div>
                        <p>Now, the stock only needs to rise to $75 (not $100) for you to break even.</p>

                        <h2>2. The Golden Rules</h2>
                        <h3>Rule #1: Don't Catch a Falling Knife</h3>
                        <p>Wait for the price to stabilize. Buying while it's crashing is dangerous.</p>

                        <h3>Rule #2: Manage Your Cash</h3>
                        <p>Don't use all your cash at once. Split your budget into 3-4 parts for multiple buy-ins.</p>

                        <h3>Rule #3: Calculate First</h3>
                        <p>Don't guess. Use a calculator to see exactly how many shares you need to buy to reach your target average price.</p>

                        <h2>3. Use the Cheetset Calculator</h2>
                        <p>We built a simple tool to help you plan your trades.</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 Stock Average Calculator</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">Instantly calculate your new average price.</p>
                            <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">Open Calculator →</a>
                        </div>

                        <h2>4. Conclusion</h2>
                        <p>Averaging down is a powerful tool if used correctly. Always plan your trade and trade your plan. Good luck! 🚀</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>株式ナンピン計算機活用法：損失を利益に変える買い増し戦略</h1>
                        <p className="lead">「今買えば平均単価はどれくらい下がる？」勘でナンピン買いをして塩漬け株を作っていませんか？正確な計算と戦略だけが生き残る道です。</p>

                        <p>こんにちは！賢い投資家の味方、<strong>Cheetset</strong>です。</p>
                        <p>株や仮想通貨への投資で避けられないのが<strong>「含み損」</strong>です。買った瞬間に下がる...よくある話ですよね。</p>
                        <p>この時、多くの人が選ぶ戦略が<strong>「ナンピン買い（難平買い）」</strong>です。安い価格で買い増しして、平均取得単価を下げる手法です。しかし、無計画なナンピンは損失を拡大させるだけです。今日は成功するナンピン戦略と計算機の使い方を解説します。</p>

                        <h2>1. ナンピン買いとは？</h2>
                        <p>保有している株価が下がった時に、追加で購入して平均単価を下げることです。</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4">
                            <p className="font-mono text-sm">
                                例:<br />
                                1. 1,000円で1株購入（計1,000円）<br />
                                2. 500円に下落。1株追加購入（計1,500円 / 2株）<br />
                                3. <strong>新しい平均単価: 750円</strong>
                            </p>
                        </div>
                        <p>株価が1,000円まで戻らなくても、750円を超えれば利益が出ます。</p>

                        <h2>2. ナンピンの3原則</h2>
                        <h3>原則 #1: 分割売買</h3>
                        <p>資金を一気に投入しないでください。底だと思ってもさらに下がることがあります。資金を3〜4回に分けて投入しましょう。</p>

                        <h3>原則 #2: 落ちるナイフをつかむな</h3>
                        <p>下落中は買わないでください。下げ止まって反発の兆しが見えた時がチャンスです。</p>

                        <h3>原則 #3: 正確な計算</h3>
                        <p>「これくらい買えば下がるだろう」という勘は危険です。目標の単価にするために何株必要なのか、正確に計算しましょう。</p>

                        <h2>3. Cheetset計算機の使い方</h2>
                        <p>複雑な計算式は不要です。数字を入力するだけで1秒で結果が出ます。</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">📉 ナンピン計算機へ</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">現在の保有量と追加購入量を入力して、最終的な平均単価を確認してください。</p>
                            <a href={`/${lang}/tools/stock-average-calculator`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">計算機を起動 →</a>
                        </div>

                        <h2>まとめ</h2>
                        <p>ナンピンは諸刃の剣です。重要なのは<strong>計画的な売買</strong>です。Cheetset計算機を使って、感情を排して数字で投資しましょう。皆さんの成功を祈ります！📈</p>
                    </>
                )}
            </article>
        </div>
    );
}
