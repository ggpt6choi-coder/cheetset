import React from 'react';

type Props = {
    lang: string;
};

export default function ResumeWritingGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>대기업 합격하는 자기소개서 작성법과 글자 수 최적화 전략</h1>
                        <p className="lead">매번 자소서에서 탈락하시나요? 대기업 인사담당자가 직접 알려주는 합격 자소서의 비밀을 공개합니다.</p>

                        <h2>1. 자소서에서 가장 중요한 것</h2>
                        <p>인사담당자들이 가장 먼저 체크하는 것은 <strong>3가지</strong>입니다:</p>
                        <ol>
                            <li><strong>글자 수 준수:</strong> 제한의 90-99% 채우기</li>
                            <li><strong>맞춤법과 띄어쓰기:</strong> 오타 하나가 탈락 원인</li>
                            <li><strong>질문에 대한 정확한 답변:</strong> 엉뚱한 내용 쓰지 않기</li>
                        </ol>

                        <h2>2. 글자 수 최적화가 중요한 이유</h2>
                        <h3>너무 적으면 (80% 미만)</h3>
                        <p>❌ 성의 없어 보임<br />❌ 할 말이 없는 사람으로 보임</p>

                        <h3>너무 많으면 (100% 초과)</h3>
                        <p>❌ 요약 능력 부족<br />❌ 규칙을 안 지키는 사람</p>

                        <h3>최적 범위: 90-99%</h3>
                        <p>✅ 성실함을 보여줌<br />✅ 글을 잘 다듬었다는 인상</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ 실시간 글자 수 체크</p>
                            <p className="mb-4 text-sm text-green-600 dark:text-green-300">입력과 동시에 공백 포함/미포함, 바이트까지 확인!</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg">글자 수 세기 →</a>
                        </div>

                        <h2>3. 자소서 작성 5단계 프로세스</h2>
                        <h3>STEP 1: 질문 분석 (10분)</h3>
                        <p>질문이 진짜 원하는 답이 뭔지 정확히 파악하세요. "지원 동기"와 "입사 후 포부"는 완전히 다른 질문입니다.</p>

                        <h3>STEP 2: 경험 리스트업 (20분)</h3>
                        <p>관련된 경험을 모두 적어보세요. 작은 경험도 포장하면 훌륭한 소재가 됩니다.</p>

                        <h3>STEP 3: 초안 작성 (30분)</h3>
                        <p>일단 글자 수 신경 안 쓰고 하고 싶은 말 다 쓰세요. 이후 다듬을 거니까요.</p>

                        <h3>STEP 4: 글자 수 맞추기 (20분)</h3>
                        <p>Word Counter 도구로 실시간 체크하면서 90-99% 범위에 맞추세요.</p>

                        <h3>STEP 5: 최종 검토 (10분)</h3>
                        <ul>
                            <li>맞춤법 검사</li>
                            <li>불필요한 중복 표현 삭제</li>
                            <li>문장 호흡 조절</li>
                        </ul>

                        <h2>4. 합격자들의 자소서 공통점</h2>
                        <h3>✅ STAR 기법 사용</h3>
                        <ul>
                            <li><strong>S</strong>ituation: 상황 설명</li>
                            <li><strong>T</strong>ask: 내가 맡은 역할</li>
                            <li><strong>A</strong>ction: 내가 한 행동</li>
                            <li><strong>R</strong>esult: 그 결과</li>
                        </ul>

                        <h3>✅ 구체적인 숫자 사용</h3>
                        <p>"매출을 크게 올렸다" (X)<br />"매출을 전년 대비 30% 향상시켰다" (O)</p>

                        <h3>✅ 회사가 원하는 인재상 반영</h3>
                        <p>회사 홈페이지에서 인재상을 확인하고, 그에 맞춰 자신의 경험을 재구성하세요.</p>

                        <h2>5. 절대 하지 말아야 할 실수 TOP 3</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                            <h3 className="mt-0">1위: 복사-붙여넣기</h3>
                            <p>다른 회사 자소서를 복붙하면 100% 티가 납니다. 회사명이라도 틀리면 끝.</p>

                            <h3>2위: 너무 거창한 포부</h3>
                            <p>"10년 내 CEO가 되겠다" 같은 말은 신입에게 기대하는 게 아닙니다.</p>

                            <h3>3위: 맞춤법 오류</h3>
                            <p>간단한 맞춤법 실수 하나로 수백 시간 노력이 물거품 될 수 있습니다.</p>
                        </div>

                        <h2>6. 글자 수별 작성 팁</h2>
                        <h3>500자 이하: 핵심만 간결하게</h3>
                        <p>서론-본론-결론 3문단 구성. 군더더기 없이 핵심만.</p>

                        <h3>1,000자: 경험 하나를 깊이 있게</h3>
                        <p>STAR 기법으로 하나의 경험을 자세히 풀어쓰세요.</p>

                        <h3>1,500자 이상: 여러 경험 연결</h3>
                        <p>2-3개의 경험을 하나의 주제로 엮어서 스토리텔링.</p>

                        <h2>마무리: 합격 자소서는 만들어진다</h2>
                        <p>좋은 자소서는 한 번에 나오지 않습니다. <strong>쓰고, 고치고, 다듬는 과정</strong>을 최소 5번 이상 반복하세요. 글자 수는 실시간 체크하면서 최적 범위를 유지하고, 맞춤법은 꼼꼼히 검토하세요.</p>
                        <p>여러분의 합격을 <strong>Cheetset</strong>이 응원합니다! 💼</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to Write a Winning Resume for Top Companies</h1>
                        <p className="lead">Keep getting rejected? Learn what recruiters actually look for in resumes and cover letters.</p>

                        <h2>1. The 3 Things Recruiters Check First</h2>
                        <ol>
                            <li><strong>Word Count:</strong> Fill 90-99% of the limit</li>
                            <li><strong>Spelling/Grammar:</strong> One typo can disqualify you</li>
                            <li><strong>Relevance:</strong> Answer the actual question asked</li>
                        </ol>

                        <h2>2. Why Word Count Matters</h2>
                        <h3>Too Short (Under 80%)</h3>
                        <p>❌ Looks lazy<br />❌ Seems inexperienced</p>

                        <h3>Too Long (Over 100%)</h3>
                        <p>❌ Can't follow instructions<br />❌ Poor editing skills</p>

                        <h3>Sweet Spot: 90-99%</h3>
                        <p>✅ Shows effort<br />✅ Professional polish</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ Real-Time Word Counter</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg mt-4">Count Words →</a>
                        </div>

                        <h2>3. The STAR Method</h2>
                        <ul>
                            <li><strong>S</strong>ituation: Set the scene</li>
                            <li><strong>T</strong>ask: Your role</li>
                            <li><strong>A</strong>ction: What you did</li>
                            <li><strong>R</strong>esult: The outcome</li>
                        </ul>

                        <h2>Conclusion</h2>
                        <p>Great resumes are crafted, not written. Revise at least 5 times. Check word count in real-time. Good luck! 💼</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>大手企業に合格する履歴書・ES作成法</h1>
                        <p className="lead">毎回ESで落ちていませんか？大手企業の人事担当者が教える合格ESの秘訣を公開します。</p>

                        <h2>1. ESで最も重要なこと</h2>
                        <p>人事担当者が最初にチェックする<strong>3つ</strong>:</p>
                        <ol>
                            <li><strong>文字数遵守:</strong> 制限の90-99%を埋める</li>
                            <li><strong>誤字脱字:</strong> たった一つのミスで不合格</li>
                            <li><strong>質問への的確な回答:</strong> 的外れな内容を書かない</li>
                        </ol>

                        <h2>2. 文字数最適化が重要な理由</h2>
                        <h3>少なすぎると (80%未満)</h3>
                        <p>❌ 誠意がないように見える</p>

                        <h3>多すぎると (100%超)</h3>
                        <p>❌ 要約能力不足<br />❌ ルールを守れない人</p>

                        <h3>最適範囲: 90-99%</h3>
                        <p>✅ 誠実さを示す<br />✅ よく推敲した印象</p>

                        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg my-6 text-center">
                            <p className="text-lg font-bold text-green-800 dark:text-green-200">✍️ リアルタイム文字数チェック</p>
                            <a href={`/${lang}/tools/word-counter`} className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold text-lg shadow-lg mt-4">文字数カウント →</a>
                        </div>

                        <h2>3. STARメソッド使用</h2>
                        <ul>
                            <li><strong>S</strong>ituation: 状況説明</li>
                            <li><strong>T</strong>ask: 自分の役割</li>
                            <li><strong>A</strong>ction: 取った行動</li>
                            <li><strong>R</strong>esult: その結果</li>
                        </ul>

                        <h2>まとめ</h2>
                        <p>良いESは一度では完成しません。<strong>書いて、直して、磨く</strong>プロセスを最低5回以上繰り返してください。文字数はリアルタイムでチェックしながら最適範囲を維持し、誤字脱字は入念に確認してください。💼</p>
                    </>
                )}
            </article>
        </div>
    );
}
