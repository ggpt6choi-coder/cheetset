import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function PomodoroTechnique({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>포모도로 테크닉: 25분 집중으로 생산성을 극대화하는 방법</h1>
                        <p className="lead">
                            할 일은 산더미인데 자꾸만 딴짓을 하게 되나요?
                            1980년대 후반 프란체스코 시릴로가 개발한 '포모도로 기법'이 여러분의 집중력을 구원해줄 수 있습니다.
                        </p>

                        <h2>포모도로 테크닉이란?</h2>
                        <p>
                            포모도로(Pomodoro)는 이탈리아어로 '토마토'를 뜻합니다.
                            창시자가 대학생 시절 토마토 모양의 주방 타이머를 사용한 데서 유래했습니다.
                            핵심은 아주 간단합니다. <strong>"짧게 집중하고, 짧게 쉰다."</strong>
                        </p>

                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl my-8 not-prose border border-red-100 dark:border-red-800">
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">⏱️ 지금 바로 시작해보세요!</h3>
                            <p className="text-red-800 dark:text-red-200 mb-4">
                                별도의 타이머를 살 필요 없습니다. 치트셋의 <strong>무료 포모도로 타이머</strong>로 즉시 실천할 수 있습니다.
                            </p>
                            <Link
                                href="/ko/tools/pomodoro-timer"
                                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                포모도로 타이머 실행하기 →
                            </Link>
                        </div>

                        <h2>실천 방법 (5단계)</h2>
                        <ol>
                            <li><strong>할 일 선택</strong>: 오늘 처리해야 할 가장 중요한 작업을 하나 고릅니다.</li>
                            <li><strong>타이머 설정 (25분)</strong>: 25분 동안은 오직 그 일에만 집중하겠다고 다짐합니다. 스마트폰 알림은 꺼두세요.</li>
                            <li><strong>집중</strong>: 타이머가 울릴 때까지 작업에 몰입합니다. 딴생각이 나면 종이에 적어두고 바로 작업으로 돌아옵니다.</li>
                            <li><strong>짧은 휴식 (5분)</strong>: 타이머가 울리면 즉시 작업을 멈추고 5분간 쉽니다. 스트레칭을 하거나 물을 마시세요. (SNS 금지!)</li>
                            <li><strong>반복</strong>: 이 과정을 4번 반복(약 2시간)한 후에는 15~30분의 <strong>긴 휴식</strong>을 취합니다.</li>
                        </ol>

                        <h2>왜 효과적일까요?</h2>
                        <ul>
                            <li><strong>시작의 두려움 제거</strong>: "딱 25분만 하자"는 생각은 거대한 프로젝트에 착수할 때의 심리적 부담감을 줄여줍니다.</li>
                            <li><strong>번아웃 방지</strong>: 규칙적인 휴식은 뇌의 피로를 풀어주어 오랫동안 높은 집중력을 유지하게 해줍니다.</li>
                            <li><strong>시간 관리 능력 향상</strong>: 자신이 25분 동안 얼마나 많은 일을 할 수 있는지 파악하게 되어, 계획 수립 능력이 좋아집니다.</li>
                        </ul>

                        <h2>나에게 맞게 커스터마이징하기</h2>
                        <p>
                            25분이 너무 짧거나 길게 느껴진다면 시간을 조절해보세요.
                            코딩이나 글쓰기처럼 몰입이 필요한 작업은 50분 집중 / 10분 휴식 패턴이 더 좋을 수도 있습니다.
                            치트셋 타이머의 <strong>설정</strong> 메뉴에서 자유롭게 시간을 변경할 수 있습니다.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>The Pomodoro Technique: How to Skyrocket Your Productivity in 25 Minutes</h1>
                        <p className="lead">
                            Overwhelmed by tasks and constantly procrastinating?
                            The 'Pomodoro Technique', developed by Francesco Cirillo in the late 1980s, might be the savior for your focus.
                        </p>

                        <h2>What is the Pomodoro Technique?</h2>
                        <p>
                            Pomodoro means 'tomato' in Italian.
                            It originated from the tomato-shaped kitchen timer the creator used as a university student.
                            The core concept is simple: <strong>"Focus briefly, rest briefly."</strong>
                        </p>

                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl my-8 not-prose border border-red-100 dark:border-red-800">
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">⏱️ Start Right Now!</h3>
                            <p className="text-red-800 dark:text-red-200 mb-4">
                                No need to buy a timer. Use Cheetset's <strong>Free Pomodoro Timer</strong> to start immediately.
                            </p>
                            <Link
                                href="/en/tools/pomodoro-timer"
                                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                Launch Pomodoro Timer →
                            </Link>
                        </div>

                        <h2>How to Do It (5 Steps)</h2>
                        <ol>
                            <li><strong>Pick a Task</strong>: Choose the most important task to tackle today.</li>
                            <li><strong>Set Timer (25 min)</strong>: Commit to focusing only on that task for 25 minutes. Turn off phone notifications.</li>
                            <li><strong>Work</strong>: Immerse yourself until the timer rings. If distracted, write it down and get back to work.</li>
                            <li><strong>Short Break (5 min)</strong>: Stop immediately when the timer rings and rest for 5 minutes. Stretch or drink water. (No social media!)</li>
                            <li><strong>Repeat</strong>: After 4 cycles (about 2 hours), take a <strong>Long Break</strong> of 15-30 minutes.</li>
                        </ol>

                        <h2>Why is it Effective?</h2>
                        <ul>
                            <li><strong>Reduces Resistance</strong>: Thinking "I'll just do 25 minutes" lowers the psychological barrier to starting huge projects.</li>
                            <li><strong>Prevents Burnout</strong>: Regular breaks refresh your brain, allowing you to maintain high focus for longer periods.</li>
                            <li><strong>Improves Time Management</strong>: You learn how much you can achieve in 25 minutes, improving your planning skills.</li>
                        </ul>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>ポモドーロ・テクニック：25分の集中で生産性を最大化する方法</h1>
                        <p className="lead">
                            やるべきことは山積みですが、ついつい他のことをしてしまいますか？
                            1980年代後半にフランチェスコ・シリロによって開発された「ポモドーロ・テクニック」が、あなたの集中力を救うかもしれません。
                        </p>

                        <h2>ポモドーロ・テクニックとは？</h2>
                        <p>
                            ポモドーロ（Pomodoro）はイタリア語で「トマト」を意味します。
                            創始者が大学生時代にトマト型のキッチンタイマーを使用していたことに由来します。
                            核心は非常にシンプルです。<strong>「短く集中し、短く休む。」</strong>
                        </p>

                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-xl my-8 not-prose border border-red-100 dark:border-red-800">
                            <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">⏱️ 今すぐ始めましょう！</h3>
                            <p className="text-red-800 dark:text-red-200 mb-4">
                                タイマーを買う必要はありません。Cheetsetの<strong>無料ポモドーロタイマー</strong>で即座に実践できます。
                            </p>
                            <Link
                                href="/ja/tools/pomodoro-timer"
                                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
                            >
                                ポモドーロタイマーを起動 →
                            </Link>
                        </div>

                        <h2>実践方法（5ステップ）</h2>
                        <ol>
                            <li><strong>タスクを選ぶ</strong>：今日処理すべき最も重要なタスクを1つ選びます。</li>
                            <li><strong>タイマー設定（25分）</strong>：25分間はその仕事だけに集中すると誓います。スマホの通知はオフにしてください。</li>
                            <li><strong>集中</strong>：タイマーが鳴るまで作業に没頭します。他の考えが浮かんだら紙に書き留めて、すぐに作業に戻ります。</li>
                            <li><strong>短い休憩（5分）</strong>：タイマーが鳴ったらすぐに作業を止めて5分間休みます。ストレッチをしたり水を飲んだりしてください。（SNS禁止！）</li>
                            <li><strong>繰り返し</strong>：この過程を4回繰り返した後（約2時間）、15〜30分の<strong>長い休憩</strong>を取ります。</li>
                        </ol>

                        <h2>なぜ効果的なのか？</h2>
                        <ul>
                            <li><strong>着手の恐怖を取り除く</strong>：「たった25分だけやろう」という考えは、巨大なプロジェクトに着手する際の心理的負担を軽減します。</li>
                            <li><strong>燃え尽き症候群の防止</strong>：定期的な休憩は脳の疲労を和らげ、長時間高い集中力を維持させてくれます。</li>
                            <li><strong>時間管理能力の向上</strong>：自分が25分間にどれだけのことができるかを把握できるようになり、計画立案能力が向上します。</li>
                        </ul>
                    </>
                )}
            </article>
        </div>
    );
}
