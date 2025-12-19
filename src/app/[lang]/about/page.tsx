import type { Metadata } from "next";
import { getDictionary, Locale } from "@/dictionaries/get-dictionary";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.nav.about} - ${dict.common.title}`,
        description: 'CheatKey provides free online utility tools including Word Counter, JSON Formatter, Lotto Number Generator, and Server Time Checker.',
    };
}

export default async function AboutPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                    {lang === 'ko' && (
                        <>
                            <h1>CheatSet 소개</h1>
                            <p className="lead">일상에서 자주 필요한 유틸리티 도구를 무료로 제공하는 웹 서비스입니다.</p>

                            <h2>우리의 미션</h2>
                            <p>CheatKey는 <strong>단순하지만 유용한 도구</strong>를 누구나 쉽게 사용할 수 있도록 만듭니다. 복잡한 가입 절차 없이, 브라우저만 있으면 바로 사용할 수 있습니다.</p>

                            <h2>제공하는 도구</h2>
                            <ul>
                                <li><strong>글자 수 세기:</strong> 자기소개서, 블로그 글 작성 시 실시간 글자 수 확인</li>
                                <li><strong>JSON 포맷터:</strong> 개발자를 위한 JSON 데이터 정리 및 검증</li>
                                <li><strong>JWT 디코더:</strong> 보안 토큰(JWT) 구조 분석 및 디버깅</li>
                                <li><strong>Base64 변환기:</strong> 이미지와 Base64 문자열 간의 상호 변환</li>
                                <li><strong>Unix 타임스탬프:</strong> 개발자를 위한 시간 변환 도구</li>
                                <li><strong>Cron 생성기:</strong> 복잡한 스케줄링 표현식 생성</li>
                                <li><strong>주식 물타기 계산기:</strong> 성공적인 투자를 위한 평단가 계산</li>
                                <li><strong>연봉 실수령액 계산기:</strong> 2025년 최신 세율이 적용된 실수령액 확인</li>
                                <li><strong>복리 계산기:</strong> 자산 증식을 위한 적립식 복리 계산</li>
                                <li><strong>ROI 계산기:</strong> 투자 수익률 및 연평균 성장률 분석</li>
                                <li><strong>유튜브 수익 계산기:</strong> 채널 조회수 기반 예상 수익 확인</li>
                                <li><strong>포모도로 타이머:</strong> 25분 집중/5분 휴식으로 생산성 향상</li>
                                <li><strong>비밀번호 생성기:</strong> 해킹 불가능한 강력한 비밀번호 생성</li>
                                <li><strong>로또 번호 생성기:</strong> 랜덤 로또 번호 추천</li>
                                <li><strong>단위 변환기:</strong> 길이, 무게, 부피 등 필수 단위 변환</li>
                                <li><strong>서버 시간 확인:</strong> 티켓팅, 수강신청을 위한 정확한 서버 시간 체크</li>
                                <li><strong>QR 코드 생성기:</strong> URL, 텍스트를 QR 코드로 변환 및 커스터마이징</li>
                                <li><strong>SQL 포매터:</strong> 복잡한 SQL 쿼리 정렬 및 구문 강조</li>
                                <li><strong>퍼센트 계산기:</strong> 비율, 증감률 등 다양한 퍼센트 계산</li>
                                <li><strong>텍스트 비교 (Diff):</strong> 두 텍스트의 차이점 비교 및 시각화</li>
                                <li><strong>D-Day 계산기:</strong> 기념일, 시험 등 중요한 날짜 계산</li>
                                <li><strong>BMI 계산기:</strong> 키와 몸무게로 비만도 측정</li>
                                <li><strong>랜덤 추첨기:</strong> 돌림판으로 공정하고 재미있는 랜덤 선택</li>
                                <li><strong>이미지 변환/리사이저:</strong> 이미지 크기 조절 및 포맷 변환 (JPG, PNG, WebP)</li>
                                <li><strong>로렘 입숨 생성기:</strong> 디자인/개발용 더미 텍스트 생성</li>
                                <li><strong>이미지 자르기:</strong> 이미지를 원하는 비율로 자르기</li>
                                <li><strong>이미지 필터:</strong> 이미지에 다양한 필터 적용</li>
                                <li><strong>대소문자 변환기:</strong> 텍스트 대소문자 변환</li>
                                <li><strong>HTML 엔코더/디코더:</strong> HTML 엔티티 변환</li>
                                <li><strong>이미지 PDF 변환:</strong> 이미지를 PDF로 변환</li>
                                <li><strong>이미지 모자이크/블러:</strong> 이미지의 특정 부분을 선택하여 모자이크 또는 블러 처리하세요.</li>
                                <li><strong>PDF 합치기:</strong> 여러 PDF 파일을 하나의 파일로 병합하세요.</li>
                                <li><strong>PDF 나누기:</strong> PDF 파일에서 원하는 페이지만 추출하여 저장하세요.</li>
                                <li><strong>반응속도 테스트:</strong> 당신의 반응속도를 측정해보세요. 화면이 초록색으로 변하면 클릭하세요!</li>
                                <li><strong>이미지 변환기:</strong> 이미지를 JPG, PNG, WEBP, HEIC 등 다양한 포맷으로 변환하세요.</li>
                                <li><strong>부가세 계산기:</strong> 공급가액과 합계금액을 기준으로 부가세를 계산하세요.</li>
                                <li><strong>화면 비율 계산기:</strong> 16:9, 4:3 등 화면 비율에 따른 해상도를 계산하세요.</li>
                                <li><strong>수도 퀴즈 & 탐험기:</strong> 전 세계 국가의 수도를 검색하고 퀴즈로 맞춰보세요.</li>
                                <li><strong>URL 인코더/디코더:</strong> URL을 안전하게 인코딩하거나 원래대로 복원하세요.</li>
                            </ul>

                            <h2>왜 CheatSet인가?</h2>
                            <h3>✅ 완전 무료</h3>
                            <p>모든 도구는 영구 무료입니다. 숨겨진 비용이 없습니다.</p>

                            <h3>✅ 개인정보 보호</h3>
                            <p>입력한 데이터는 서버에 저장되지 않습니다. 모든 처리는 여러분의 브라우저에서 이루어집니다.</p>

                            <h3>✅ 다국어 지원</h3>
                            <p>한국어, 영어, 일본어를 지원하여 전 세계 누구나 사용할 수 있습니다.</p>

                            <h3>✅ 지속적인 업데이트</h3>
                            <p>사용자 피드백을 반영하여 새로운 도구를 계속 추가합니다.</p>

                            <h2>개발자</h2>
                            <p>CheatSet는 개발자와 일반 사용자 모두를 위한 유틸리티를 만드는 것을 목표로 합니다. 더 나은 도구를 위한 제안이 있다면 언제든 연락주세요!</p>

                            <h2>연락처</h2>
                            <p>문의사항이 있으신가요? <a href={`/${lang}/contact`}>Contact 페이지</a>를 통해 연락주세요.</p>
                        </>
                    )}
                    {lang === 'en' && (
                        <>
                            <h1>About CheatSet</h1>
                            <p className="lead">Free online utility tools for everyday tasks, designed to make your life easier.</p>

                            <h2>Our Mission</h2>
                            <p>CheatKey provides <strong>simple yet powerful tools</strong> that anyone can use instantly. No complex sign-up process—just open your browser and start using.</p>

                            <h2>Available Tools</h2>
                            <ul>
                                <li><strong>Word Counter:</strong> Real-time character counting for resumes and blog posts</li>
                                <li><strong>JSON Formatter:</strong> Format and validate JSON data for developers</li>
                                <li><strong>JWT Decoder:</strong> Analyze and debug secure tokens (JWT)</li>
                                <li><strong>Base64 Converter:</strong> Convert between images and Base64 strings</li>
                                <li><strong>Unix Timestamp:</strong> Time conversion tool for developers</li>
                                <li><strong>Cron Generator:</strong> Create complex scheduling expressions easily</li>
                                <li><strong>Stock Average Calculator:</strong> Calculate average cost for smart investing</li>
                                <li><strong>Salary Calculator:</strong> Estimate monthly take-home pay with 2025 tax rates</li>
                                <li><strong>Compound Interest:</strong> Calculate asset growth with compound interest</li>
                                <li><strong>ROI Calculator:</strong> Analyze investment return and CAGR</li>
                                <li><strong>YouTube Calculator:</strong> Estimate channel revenue based on views</li>
                                <li><strong>Pomodoro Timer:</strong> Boost productivity with 25/5 focus cycles</li>
                                <li><strong>Password Generator:</strong> Create strong, unhackable passwords</li>
                                <li><strong>Lotto Generator:</strong> Random lottery number recommendations</li>
                                <li><strong>Unit Converter:</strong> Essential unit conversions for length, weight, etc.</li>
                                <li><strong>Server Time Checker:</strong> Accurate server time for ticket purchases</li>
                                <li><strong>QR Code Generator:</strong> Create and customize QR codes for URLs and text</li>
                                <li><strong>SQL Formatter:</strong> Format and beautify complex SQL queries</li>
                                <li><strong>Percentage Calculator:</strong> Calculate percentages, increases, and decreases easily</li>
                                <li><strong>Diff Checker:</strong> Compare two texts and visualize differences</li>
                                <li><strong>D-Day Counter:</strong> Calculate days remaining for anniversaries and events</li>
                                <li><strong>BMI Calculator:</strong> Check your Body Mass Index and weight status</li>
                                <li><strong>Random Wheel:</strong> Fair and fun random selection with a spinning wheel</li>
                                <li><strong>Image Resizer:</strong> Resize images and convert formats (JPG, PNG, WebP)</li>
                                <li><strong>Lorem Ipsum Generator:</strong> Generate dummy text for designs and development</li>
                                <li><strong>Image Cropper:</strong> Crop images to desired aspect ratios</li>
                                <li><strong>Image Filters:</strong> Apply filters to images</li>
                                <li><strong>Case Converter:</strong> Convert text case</li>
                                <li><strong>HTML Encoder/Decoder:</strong> Convert HTML entities</li>
                                <li><strong>Image to PDF:</strong> Convert images to PDF</li>
                                <li><strong>Image Blur/Mosaic:</strong> Blur or mosaic specific areas of images</li>
                                <li><strong>PDF Merger:</strong> Combine multiple PDF files into one.</li>
                                <li><strong>Split PDF:</strong> Extract specific pages from a PDF file.</li>
                                <li><strong>Reaction Time Test:</strong> Measure your reaction time. Click when the screen turns green!</li>
                                <li><strong>Image Converter:</strong> Convert images to JPG, PNG, WEBP, HEIC, and more.</li>
                                <li><strong>VAT Calculator:</strong> Calculate VAT and total amount from net or gross price.</li>
                                <li><strong>Aspect Ratio Calculator:</strong> Calculate dimensions based on screen aspect ratios.</li>
                                <li><strong>Country Capital Quiz:</strong> Search for capitals and test your knowledge with a quiz.</li>
                                <li><strong>URL Encoder/Decoder:</strong> Encode URLs securely or decode them back to original text.</li>
                            </ul>

                            <h2>Why CheatKey?</h2>
                            <h3>✅ Completely Free</h3>
                            <p>All tools are free forever. No hidden costs.</p>

                            <h3>✅ Privacy Protected</h3>
                            <p>Your data never leaves your browser. Everything is processed locally.</p>

                            <h3>✅ Multilingual Support</h3>
                            <p>Available in Korean, English, and Japanese for global accessibility.</p>

                            <h3>✅ Continuous Updates</h3>
                            <p>We regularly add new tools based on user feedback.</p>

                            <h2>Developer</h2>
                            <p>CheatKey aims to create utilities for both developers and general users. Have suggestions for new tools? Feel free to reach out!</p>

                            <h2>Contact</h2>
                            <p>Have questions? Visit our <a href={`/${lang}/contact`}>Contact page</a> to get in touch.</p>
                        </>
                    )}
                    {lang === 'ja' && (
                        <>
                            <h1>CheatSetについて</h1>
                            <p className="lead">日常で頻繁に必要なユーティリティツールを無料で提供するWebサービスです。</p>

                            <h2>私たちのミッション</h2>
                            <p>CheatKeyは<strong>シンプルで便利なツール</strong>を誰でも簡単に使えるようにします。複雑な登録手続きなしで、ブラウザさえあればすぐに使えます。</p>

                            <h2>提供するツール</h2>
                            <ul>
                                <li><strong>文字数カウンター:</strong> テキストの文字数、単語数、行数、バイト数をリアルタイムで計算します。</li>
                                <li><strong>JSONフォーマッター:</strong> 複雑なJSONデータを読みやすく整形し、検証します。</li>
                                <li><strong>ロト番号生成器:</strong> 韓国のロト6/45方式でランダムな番号を生成します。</li>
                                <li><strong>サーバー時間確認:</strong> チケット予約や受講申請のための正確なサーバー時間を確認できます。</li>
                                <li><strong>画像Base64変換:</strong> 画像をBase64文字列に変換、またはその逆に変換します。</li>
                                <li><strong>株式平均単価計算機:</strong> 追加購入時の株式平均単価（「ムルタギ」）を計算します。</li>
                                <li><strong>UUID生成器:</strong> バージョン4のUUIDを生成します。</li>
                                <li><strong>JWTデコーダー:</strong> JWTトークンをデコードしてヘッダーとペイロードを確認します。</li>
                                <li><strong>Unixタイムスタンプ変換:</strong> Unixタイムスタンプを人間が読める日時に変換します。</li>
                                <li><strong>Cron式生成器:</strong> スケジュール設定のためのCron式を簡単に作成できます。</li>
                                <li><strong>パスワード生成器:</strong> 安全で強力なパスワードを生成します。</li>
                                <li><strong>SQLフォーマッター:</strong> 複雑なSQLクエリを整形して可読性を高めます。</li>
                                <li><strong>テキスト比較 (Diff):</strong> 2つのテキストの違いを比較してハイライト表示します。</li>
                                <li><strong>画像リサイズ:</strong> 画像のサイズを変更し、フォーマット（PNG, JPG, WebP）を変換します。</li>
                                <li><strong>Lorem Ipsum生成器:</strong> デザイン用のダミーテキストを生成します。</li>
                                <li><strong>画像トリミング:</strong> 画像を希望の比率で切り抜き</li>
                                <li><strong>画像フィルター:</strong> 画像にフィルターを適用</li>
                                <li><strong>大文字・小文字変換:</strong> テキストの大文字・小文字変換</li>
                                <li><strong>HTMLエンコーダー/デコーダー:</strong> HTMLエンティティ変換</li>
                                <li><strong>画像PDF変換:</strong> 画像をPDFに変換</li>
                                <li><strong>画像モザイク・ぼかし:</strong> 画像の特定の部分を選択して、モザイクまたはぼかし効果を適用します。</li>
                                <li><strong>PDF結合:</strong> 複数のPDFファイルを1つのファイルに結合します。</li>
                                <li><strong>PDF分割:</strong> PDFファイルから特定のページを抽出して保存します。</li>
                                <li><strong>反応速度テスト:</strong> あなたの反応速度を測定します。画面が緑色になったらクリックしてください！</li>
                                <li><strong>画像変換機:</strong> 画像をJPG、PNG、WEBP、HEICなどの形式に変換します。</li>
                                <li><strong>消費税計算機:</strong> 税抜・税込金額から消費税を計算します。</li>
                                <li><strong>アスペクト比計算機:</strong> 画面比率に基づいて解像度を計算します。</li>
                                <li><strong>首都クイズ＆検索:</strong> 世界の首都を検索し、クイズで知識をテストします。</li>
                                <li><strong>URLエンコーダー/デコーダー:</strong> URLを安全にエンコードまたは元のテキストに復元します。</li>
                            </ul>

                            <h2>なぜCheatKey？</h2>
                            <h3>✅ 完全無料</h3>
                            <p>すべてのツールは永久無料です。隠れたコストはありません。</p>

                            <h3>✅ プライバシー保護</h3>
                            <p>入力したデータはサーバーに保存されません。すべての処理はブラウザで行われます。</p>

                            <h3>✅ 多言語対応</h3>
                            <p>韓国語、英語、日本語をサポートし、世界中の誰でも使えます。</p>

                            <h3>✅ 継続的なアップデート</h3>
                            <p>ユーザーフィードバックを反映して新しいツールを追加し続けます。</p>

                            <h2>開発者</h2>
                            <p>CheatKeyは開発者と一般ユーザーの両方のためのユーティリティを作ることを目指しています。より良いツールのための提案があればいつでも連絡してください！</p>

                            <h2>お問い合わせ</h2>
                            <p>ご質問がありますか？<a href={`/${lang}/contact`}>Contactページ</a>からお問い合わせください。</p>
                        </>
                    )}
                </article>
            </div>
        </div >
    );
}
