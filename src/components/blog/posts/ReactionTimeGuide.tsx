import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function ReactionTimeGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>내 반응속도는 상위 몇 %일까? 프로게이머급 피지컬 테스트</h1>
                        <p className="lead">리그 오브 레전드(LoL)나 발로란트 같은 게임을 즐기시나요? 그렇다면 반응속도가 얼마나 중요한지 아실 겁니다. 지금 바로 당신의 피지컬을 측정해 보세요!</p>

                        <h2>반응속도란?</h2>
                        <p>반응속도는 시각적 자극(화면 색상 변경 등)을 인지하고 근육(손가락 클릭)이 움직이는 데 걸리는 시간을 말합니다. 보통 밀리초(ms, 1000분의 1초) 단위로 측정합니다.</p>

                        <h2>평균 반응속도는 얼마일까?</h2>
                        <p>일반적인 사람들의 평균 반응속도는 다음과 같습니다.</p>
                        <ul>
                            <li><strong>일반인 평균</strong>: 250ms ~ 300ms</li>
                            <li><strong>게이머 평균</strong>: 200ms ~ 250ms</li>
                            <li><strong>프로게이머 (Faker급)</strong>: 150ms ~ 200ms</li>
                        </ul>
                        <p>만약 당신의 기록이 200ms 이하라면, 프로게이머에 도전해 볼 만한 엄청난 재능을 가진 것입니다!</p>

                        <h2>Cheetset 반응속도 테스트 하는 법</h2>
                        <p>저희가 준비한 <Link href="/ko/tools/reaction-time">반응속도 테스트 게임</Link>은 아주 간단합니다.</p>
                        <ol>
                            <li><strong>준비</strong>: 빨간색 화면이 나오면 클릭할 준비를 하세요.</li>
                            <li><strong>클릭</strong>: 화면이 초록색으로 바뀌는 순간! 최대한 빨리 클릭하세요.</li>
                            <li><strong>결과</strong>: 5번 반복 후 평균 기록을 알려줍니다.</li>
                        </ol>

                        <h2>반응속도를 빠르게 하는 팁</h2>
                        <p>기록이 잘 안 나왔다고 실망하지 마세요. 다음과 같은 방법으로 단축할 수 있습니다.</p>
                        <ul>
                            <li><strong>모니터 주사율</strong>: 144Hz 이상의 고주사율 모니터를 사용하면 화면 갱신이 빨라져 유리합니다.</li>
                            <li><strong>장비 빨</strong>: 반응속도가 빠른 게이밍 마우스를 사용하세요.</li>
                            <li><strong>컨디션</strong>: 피곤하거나 술을 마시면 반응속도가 느려집니다. 충분한 수면 후 도전하세요!</li>
                        </ul>

                        <h2>지금 바로 도전하세요!</h2>
                        <p>친구들과 내기하기 딱 좋은 게임입니다. 과연 누가 가장 빠를까요? 지금 바로 <Link href="/ko/tools/reaction-time">테스트 페이지</Link>로 이동해서 확인해 보세요!</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Test Your Reaction Time: Are You Faster Than a Pro Gamer?</h1>
                        <p className="lead">Do you enjoy games like League of Legends or Valorant? Then you know how crucial reaction time is. Measure your reflexes right now!</p>

                        <h2>What is Reaction Time?</h2>
                        <p>Reaction time is the interval between the presentation of a stimulus (like a screen changing color) and the initiation of a muscular response (clicking a mouse). It is usually measured in milliseconds (ms).</p>

                        <h2>What is the Average Reaction Time?</h2>
                        <p>Here are the benchmarks for human reaction speed:</p>
                        <ul>
                            <li><strong>Average Human</strong>: 250ms ~ 300ms</li>
                            <li><strong>Gamer Average</strong>: 200ms ~ 250ms</li>
                            <li><strong>Pro Gamer</strong>: 150ms ~ 200ms</li>
                        </ul>
                        <p>If your score is under 200ms, you have exceptional reflexes comparable to professional esports athletes!</p>

                        <h2>How to Use Cheetset Reaction Test</h2>
                        <p>Our <Link href="/en/tools/reaction-time">Reaction Time Test</Link> is simple and fun.</p>
                        <ol>
                            <li><strong>Wait</strong>: When the screen is red, wait for the signal.</li>
                            <li><strong>Click</strong>: As soon as it turns green, click as fast as you can!</li>
                            <li><strong>Result</strong>: After 5 tries, we'll calculate your average score.</li>
                        </ol>

                        <h2>Tips to Improve Your Speed</h2>
                        <p>Disappointed with your score? Try these tips:</p>
                        <ul>
                            <li><strong>Monitor Refresh Rate</strong>: Using a 144Hz+ monitor gives you a slight edge.</li>
                            <li><strong>Gear</strong>: Use a low-latency gaming mouse.</li>
                            <li><strong>Condition</strong>: Fatigue and alcohol slow you down. Try again after a good night's sleep!</li>
                        </ul>

                        <h2>Challenge Yourself Now!</h2>
                        <p>It's a great game to play with friends. Who is the fastest among you? Go to the <Link href="/en/tools/reaction-time">Test Page</Link> and find out!</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>あなたの反応速度は上位何％？プロゲーマー級フィジカルテスト</h1>
                        <p className="lead">LoLやVALORANTのようなゲームはお好きですか？なら、反応速度がいかに重要かご存知でしょう。今すぐあなたのフィジカルを測定してみましょう！</p>

                        <h2>反応速度とは？</h2>
                        <p>反応速度とは、視覚的刺激（画面の色が変わるなど）を認識してから筋肉（指のクリック）が動くまでの時間を指します。通常、ミリ秒（ms、1000分の1秒）単位で測定します。</p>

                        <h2>平均反応速度はどれくらい？</h2>
                        <p>一般的な人の平均反応速度は以下の通りです。</p>
                        <ul>
                            <li><strong>一般人の平均</strong>：250ms 〜 300ms</li>
                            <li><strong>ゲーマーの平均</strong>：200ms 〜 250ms</li>
                            <li><strong>プロゲーマー</strong>：150ms 〜 200ms</li>
                        </ul>
                        <p>もしあなたの記録が200ms以下なら、プロゲーマーに挑戦できるほどの素晴らしい才能を持っています！</p>

                        <h2>Cheetset反応速度テストのやり方</h2>
                        <p>私たちが用意した<Link href="/ja/tools/reaction-time">反応速度テストゲーム</Link>はとても簡単です。</p>
                        <ol>
                            <li><strong>待機</strong>：画面が赤色のときは、クリックの準備をして待ちます。</li>
                            <li><strong>クリック</strong>：画面が緑色に変わった瞬間！できるだけ早くクリックしてください。</li>
                            <li><strong>結果</strong>：5回繰り返した後、平均記録を表示します。</li>
                        </ol>

                        <h2>反応速度を速くするコツ</h2>
                        <p>記録が悪くてもがっかりしないでください。次のような方法で短縮できます。</p>
                        <ul>
                            <li><strong>モニターのリフレッシュレート</strong>：144Hz以上の高リフレッシュレートモニターを使うと有利です。</li>
                            <li><strong>デバイス</strong>：遅延の少ないゲーミングマウスを使いましょう。</li>
                            <li><strong>コンディション</strong>：疲れやアルコールは反応速度を遅くします。十分な睡眠をとってから挑戦してください！</li>
                        </ul>

                        <h2>今すぐ挑戦！</h2>
                        <p>友達と競争するのに最適なゲームです。果たして誰が一番速いでしょうか？今すぐ<Link href="/ja/tools/reaction-time">テストページ</Link>に移動して確認してみてください！</p>
                    </>
                )}
            </article>
        </div>
    );
}
