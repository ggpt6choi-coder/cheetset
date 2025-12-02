import React from 'react';

type Props = {
    lang: string;
};

export default function OnlineShoppingTips({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>2025년 온라인 쇼핑 최저가 찾는 법: 쿠팡, 네이버 가격 비교 꿀팁</h1>
                        <p className="lead">매번 비싸게 사셨나요? 쿠팡, 네이버쇼핑, SSG에서 최저가를 찾는 검증된 방법과 숨겨진 할인 혜택을 모두 공개합니다!</p>

                        <h2>1. 가격 비교의 중요성</h2>
                        <p>같은 제품도 쇼핑몰마다 가격 차이가 최대 <strong>30-50%</strong>까지 납니다. 5분만 투자하면 수만 원을 절약할 수 있습니다.</p>

                        <h2>2. 주요 쇼핑몰 특징 비교</h2>
                        <h3>쿠팡 (Coupang)</h3>
                        <p>✅ <strong>로켓배송:</strong> 당일/새벽 배송 최강<br />✅ <strong>로켓와우:</strong> 무료배송 (월 4,990원)<br />⚠️ 정가가 다른 곳보다 비쌀 수 있음</p>

                        <h3>네이버쇼핑</h3>
                        <p>✅ <strong>가격 비교 편리:</strong> 여러 판매처 한눈에 확인<br />✅ <strong>네이버페이 포인트:</strong> 적립 후 할인<br />⚠️ 업체별 배송비 별도 확인 필요</p>

                        <h3>SSG닷컴</h3>
                        <p>✅ <strong>신세계 포인트:</strong> 백화점과 연계<br />✅ <strong>신선식품 강점:</strong> 이마트 상품<br />⚠️ 일부 제품은 가격이 높은 편</p>

                        <h3>G마켓/옥션</h3>
                        <p>✅ <strong>스마일클럽:</strong> 무료배송 (월 2,990원)<br />✅ <strong>경매/중고:</strong> 저렴한 가격<br />⚠️ 판매자 신뢰도 체크 필수</p>

                        <h2>3. 최저가 찾는 5단계 전략</h2>
                        <h3>STEP 1: 검색 키워드 최적화</h3>
                        <p>브랜드명 + 모델명을 정확히 입력하세요.<strong>"삼성 갤럭시 S24 Ultra 자급제"</strong> 처럼 구체적으로.</p>

                        <h3>STEP 2: 여러 쇼핑몰 동시 비교</h3>
                        <p>최소 3곳 이상 확인하세요:</p>
                        <ul>
                            <li>네이버쇼핑 (가격 비교용)</li>
                            <li>쿠팡 (로켓배송 확인)</li>
                            <li>G마켓/옥션 (최저가 확인)</li>
                        </ul>

                        <h3>STEP 3: 숨은 할인 찾기</h3>
                        <ul>
                            <li>💳 <strong>카드 할인:</strong> 특정 카드 10-20% 추가 할인</li>
                            <li>📱 <strong>앱 전용 할인:</strong> 모바일 앱에서만 제공</li>
                            <li>⏰ <strong>타임세일:</strong> 매일 특정 시간대 할인</li>
                            <li>🎁 <strong>쿠폰 중복:</strong> 장바구니 쿠폰 + 상품 쿠폰</li>
                        </ul>

                        <h3>STEP 4: 포인트와 적립 계산</h3>
                        <p>할인가 + 포인트 적립 + 카드 할인을 <strong>모두 합산</strong>해서 비교하세요.</p>

                        <h3>STEP 5: 배송비 확인</h3>
                        <p>가격이 저렴해도 배송비가 비싸면 소용없습니다. <strong>무료배송 기준</strong>을 꼭 확인하세요.</p>

                        <h2>4. 월별 최고 할인 시기</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>시기</th>
                                    <th>행사</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1월</td>
                                    <td>설 명절 특가</td>
                                </tr>
                                <tr>
                                    <td>3월</td>
                                    <td>봄맞이 리빙 세일</td>
                                </tr>
                                <tr>
                                    <td>6월</td>
                                    <td>중간 결산 세일</td>
                                </tr>
                                <tr>
                                    <td>9월</td>
                                    <td>추석 명절 특가</td>
                                </tr>
                                <tr>
                                    <td>11월</td>
                                    <td><strong>블랙프라이데이</strong> (최대 할인)</td>
                                </tr>
                                <tr>
                                    <td>12월</td>
                                    <td>연말 정산 세일</td>
                                </tr>
                            </tbody>
                        </table>

                        <h2>5. 피해야 할 구매 실수 TOP 3</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg">
                            <h3 className="mt-0">1위: 급하게 구매</h3>
                            <p>"지금 안 사면 품절!" 같은 문구에 속지 마세요. 대부분 마케팅입니다.</p>

                            <h3>2위: 리뷰 안 읽기</h3>
                            <p>별점만 보지 말고 <strong>텍스트 리뷰</strong>를 꼼꼼히 읽어보세요. 특히 낮은 평점의 이유를 확인하세요.</p>

                            <h3>3위: 배송비 미확인</h3>
                            <p>2,500원 저렴한데 배송비가 5,000원이면 오히려 손해입니다.</p>
                        </div>

                        <h2>6. 현명한 쇼핑 체크리스트</h2>
                        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                            <h3 className="mt-0">구매 전 필수 체크:</h3>
                            <ul className="list-none pl-0">
                                <li>☑️ 최소 3곳 가격 비교했는지</li>
                                <li>☑️ 리뷰 10개 이상 읽었는지</li>
                                <li>☑️ 배송비 포함 최종 가격 확인</li>
                                <li>☑️ 카드 할인/쿠폰 적용 가능 여부</li>
                                <li>☑️ 교환/환불 정책 확인</li>
                            </ul>
                        </div>

                        <h2>7. 프로 쇼퍼들의 비밀 팁</h2>
                        <h3>팁 #1: 새벽 시간대 체크</h3>
                        <p>새벽 12시~1시에 타임딜이나 쿠폰이 새로 나옵니다.</p>

                        <h3>팁 #2: 네이버페이 적립금 활용</h3>
                        <p>네이버페이로 결제하면 1-5% 적립. 쌓인 포인트로 다음 구매 시 할인.</p>

                        <h3>팁 #3: 구독 서비스 무료체험</h3>
                        <p>쿠팡 로켓와우, 네이버플러스 등은 첫 달 무료. 큰 쇼핑 전 가입 후 해지.</p>

                        <h3>팁 #4: 가격 알림 설정</h3>
                        <p>일부 쇼핑몰은 원하는 가격에 맞춰 알림을 줍니다. 급하지 않으면 설정해두세요.</p>

                        <h2>마무리: 작은 노력이 큰 절약</h2>
                        <p>5분만 투자하면 <strong>평균 1만 원 이상</strong> 절약할 수 있습니다. 위에서 소개한 방법들을 실천하면 1년에 수십만 원을 아낄 수 있습니다.</p>
                        <p>현명한 쇼핑을 <strong>Cheetset</strong>이 응원합니다! 💰</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Best Online Shopping Tips 2025: How to Find Lowest Prices</h1>
                        <p className="lead">Stop overpaying! Master price comparison strategies for Amazon, eBay, Walmart, and save money on every purchase.</p>

                        <h2>1. Why Price Comparison Matters</h2>
                        <p>Same product can have <strong>30-50% price difference</strong> across sites. 5 minutes of research saves hundreds.</p>

                        <h2>2. Major Shopping Sites Compared</h2>
                        <h3>Amazon</h3>
                        <p>✅ Prime shipping<br />✅ Easy returns<br />⚠️ Prices can be higher</p>

                        <h3>eBay</h3>
                        <p>✅ Auctions for deals<br />✅ Used items<br />⚠️ Check seller ratings</p>

                        <h3>Walmart</h3>
                        <p>✅ Price match guarantee<br />✅ In-store pickup<br />⚠️ Limited selection online</p>

                        <h2>3. 5-Step Strategy</h2>
                        <h3>STEP 1: Compare 3+ Sites</h3>
                        <p>Always check Amazon, eBay, and Walmart minimum.</p>

                        <h3>STEP 2: Find Hidden Discounts</h3>
                        <ul>
                            <li>💳 Credit card cashback (1-5%)</li>
                            <li>📱 App-only deals</li>
                            <li>⏰ Lightning deals</li>
                            <li>🎁 Coupon stacking</li>
                        </ul>

                        <h3>STEP 3: Calculate Total Cost</h3>
                        <p>Price + shipping + tax - cashback = true cost</p>

                        <h3>STEP 4: Check Reviews</h3>
                        <p>Read text reviews, not just star ratings.</p>

                        <h3>STEP 5: Wait for Sales</h3>
                        <p><strong>Black Friday (November)</strong> has biggest discounts of the year.</p>

                        <h2>4. Best Sale Periods</h2>
                        <ul>
                            <li>January: New Year clearance</li>
                            <li>April: Spring sales</li>
                            <li>July: Amazon Prime Day</li>
                            <li><strong>November: Black Friday/Cyber Monday</strong></li>
                        </ul>

                        <h2>Conclusion</h2>
                        <p>5 minutes of comparison saves <strong>$50+ average</strong>. Follow these tips to save hundreds annually! 💰</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>2025年オンラインショッピング最安値の探し方</h1>
                        <p className="lead">毎回損していませんか？楽天、Amazon、Yahoo!ショッピングで最安値を見つける検証済み方法を公開します！</p>

                        <h2>1. 価格比較の重要性</h2>
                        <p>同じ商品でもサイトによって<strong>30-50%の価格差</strong>があります。5分の調査で数千円節約できます。</p>

                        <h2>2. 主要ショッピングサイト比較</h2>
                        <h3>楽天市場</h3>
                        <p>✅ ポイント還元率最高<br />✅ 楽天カード連携<br />⚠️ 送料別確認必要</p>

                        <h3>Amazon</h3>
                        <p>✅ プライム配送<br />✅ 返品簡単<br />⚠️ 価格が高め</p>

                        <h3>Yahoo!ショッピング</h3>
                        <p>✅ PayPay還元<br />✅ ソフトバンク連携<br />⚠️ ショップ信頼度確認</p>

                        <h2>3. 最安値を見つける5ステップ</h2>
                        <h3>STEP 1: 3サイト以上比較</h3>
                        <p>楽天、Amazon、Yahoo!を必ずチェックしてください。</p>

                        <h3>STEP 2: 隠れた割引を探す</h3>
                        <ul>
                            <li>💳 カード還元 (1-5%)</li>
                            <li>📱 アプリ限定</li>
                            <li>⏰ タイムセール</li>
                            <li>🎁 クーポン併用</li>
                        </ul>

                        <h3>STEP 3: 総コスト計算</h3>
                        <p>価格 + 送料 - ポイント還元 = 実質価格</p>

                        <h3>STEP 4: レビュー確認</h3>
                        <p>星評価だけでなく、テキストレビューを読んでください。</p>

                        <h3>STEP 5: セール時期待つ</h3>
                        <p><strong>楽天スーパーセール（年4回）</strong>が最大割引です。</p>

                        <h2>4. 最適購入時期</h2>
                        <ul>
                            <li>1月: 新春初売り</li>
                            <li>3月: 楽天スーパーセール</li>
                            <li>7月: Amazonプライムデー</li>
                            <li><strong>11月: ブラックフライデー</strong></li>
                        </ul>

                        <h2>まとめ</h2>
                        <p>5分の比較で<strong>平均1,000円以上</strong>節約できます。これらの方法を実践すれば年間数万円削減可能です！💰</p>
                    </>
                )}
            </article>
        </div>
    );
}
