export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string;
    lang: 'en' | 'ko' | 'ja';
};

export const posts: Post[] = [
    {
        slug: 'resume-word-count',
        title: 'Resume Word Count: With Spaces vs Without Spaces',
        description: 'Confused about word counts in resumes? Learn the difference between "with spaces" and "without spaces" and get tips for optimizing your resume length.',
        date: '2025-11-28',
        lang: 'en'
    },
    {
        slug: 'resume-word-count',
        title: '자기소개서 글자 수 세기: 공백 포함 vs 미포함 차이점 완벽 정리',
        description: '자기소개서 작성 시 가장 헷갈리는 글자 수 계산! 공백 포함과 미포함의 차이를 알아보고, 합격을 부르는 자소서 분량 조절 팁을 공개합니다.',
        date: '2025-11-28',
        lang: 'ko'
    },
    {
        slug: 'resume-word-count',
        title: '履歴書の文字数カウント：空白あり vs 空白なし 完全ガイド',
        description: '履歴書やES作成時に迷う文字数カウント。「空白あり」と「空白なし」の違いを解説し、適切な文章量に調整するためのヒントを公開します。',
        date: '2025-11-28',
        lang: 'ja'
    },
    {
        slug: 'json-formatting-guide',
        title: 'Why JSON Formatting is Essential for Developers',
        description: 'Learn why proper JSON formatting is crucial for debugging, readability, and collaboration. We explain minification, pretty-printing, and how to use our JSON Formatter.',
        date: '2025-11-29',
        lang: 'en'
    },
    {
        slug: 'json-formatting-guide',
        title: '개발자에게 JSON 포맷팅이 필수적인 이유',
        description: 'JSON 데이터가 왜 엉망으로 보일까요? 디버깅과 협업을 위해 필수적인 JSON 포맷팅(Pretty Print)의 중요성과 압축(Minify)의 개념을 완벽하게 정리해 드립니다.',
        date: '2025-11-29',
        lang: 'ko'
    },
    {
        slug: 'json-formatting-guide',
        title: '開発者にとってJSONフォーマットが不可欠な理由',
        description: 'なぜJSONデータは読みづらいのでしょうか？デバッグや共同作業に不可欠なJSON整形（Pretty Print）の重要性と、圧縮（Minify）の概念を完全に解説します。',
        date: '2025-11-29',
        lang: 'ja'
    },
    {
        slug: 'character-encoding-guide',
        title: 'Understanding Character Encodings: UTF-8 vs ASCII',
        description: 'Why do broken characters (Mojibake) appear? We explain the fundamental differences between ASCII, UTF-8, and Unicode for developers.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'character-encoding-guide',
        title: '문자 인코딩의 이해: UTF-8 vs ASCII 완벽 정리',
        description: '왜 한글이 깨져서 나올까요? 개발자가 반드시 알아야 할 아스키(ASCII) 코드와 유니코드(UTF-8)의 차이점, 그리고 뷇뛟 같은 글자가 생기는 이유를 설명합니다.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'character-encoding-guide',
        title: '文字コードの理解：UTF-8 vs ASCII 完全ガイド',
        description: 'なぜ文字化けが発生するのでしょうか？開発者が知っておくべきASCIIコードとUnicode（UTF-8）の違い、そして文字化けの原因を解説します。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'server-time-ticketing-guide',
        title: 'How to Check Server Time for Successful Ticket Purchases',
        description: 'Missing out on concert tickets? Learn how to check server time accurately and increase your success rate for ticketing on Ticketmaster, StubHub, and more.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'server-time-ticketing-guide',
        title: '티켓팅 성공률을 높이는 서버 시간 확인 완벽 가이드',
        description: '콘서트 티켓팅에 번번이 실패하시나요? 인터파크, 멜론티켓, 예스24에서 성공하는 서버 시간 확인 방법과 티켓팅 꿀팁을 공개합니다.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'server-time-ticketing-guide',
        title: 'チケット予約成功率を高めるサーバー時間確認完全ガイド',
        description: 'コンサートチケットの予約に失敗していませんか？チケットぴあ、イープラスで成功するサーバー時間確認方法とチケット予約のコツを公開します。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'productivity-tools-guide',
        title: 'Top 5 Online Tools to Double Your Productivity in 2025',
        description: 'Discover free online tools that will transform your workflow. From word counting to JSON formatting, learn how to work smarter, not harder.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'productivity-tools-guide',
        title: '생산성을 2배로 높이는 온라인 도구 활용법 TOP 5',
        description: '하루 업무 시간을 2시간 단축시키는 무료 온라인 도구들! 글자 수 세기부터 JSON 포맷팅까지, 스마트하게 일하는 방법을 알려드립니다.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'productivity-tools-guide',
        title: '生産性を2倍にするオンラインツール活用法 TOP 5',
        description: '1日の作業時間を2時間短縮する無料オンラインツール！文字数カウントからJSON整形まで、スマートに働く方法をお教えします。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'base64-encoding-guide',
        title: 'Base64 Encoding Explained: A Complete Guide for Developers',
        description: 'What is Base64 encoding and why do we need it? Learn how Base64 works, when to use it, and common use cases in web development.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'base64-encoding-guide',
        title: 'Base64 인코딩 완전 정복: 개발자를 위한 사용 가이드',
        description: 'Base64 인코딩이 뭔가요? 왜 사용할까요? 이미지 데이터 전송부터 API 인증까지, Base64의 모든 것을 쉽게 설명합니다.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'base64-encoding-guide',
        title: 'Base64エンコーディング完全攻略：開発者のための使用ガイド',
        description: 'Base64エンコーディングとは何ですか？なぜ使うのですか？画像データ転送からAPI認証まで、Base64のすべてを分かりやすく説明します。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'lottery-winning-strategy',
        title: 'How to Increase Your Chances of Winning the Lottery: Number Selection Strategies',
        description: 'Can you really increase lottery odds? Learn data-driven strategies for selecting winning numbers and common mistakes to avoid.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'lottery-winning-strategy',
        title: '로또 1등 당첨 확률 높이는 번호 선택 전략 완벽 가이드',
        description: '로또 당첨 확률을 높일 수 있을까요? 통계 데이터로 검증된 번호 선택 전략과 피해야 할 실수를 공개합니다.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'lottery-winning-strategy',
        title: '宝くじ1等当選確率を高める番号選択戦略完全ガイド',
        description: '宝くじの当選確率を上げることはできるのでしょうか？統計データで検証された番号選択戦略と避けるべきミスを公開します。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'resume-writing-guide',
        title: 'How to Write a Winning Resume That Gets You Hired at Top Companies',
        description: 'Land your dream job with a perfect resume. Learn word count optimization, formatting tips, and what recruiters actually look for.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'resume-writing-guide',
        title: '대기업 합격하는 자기소개서 작성법과 글자 수 최적화 전략',
        description: '대기업 인사담당자가 직접 알려주는 합격 자소서 비법! 글자 수 최적화부터 내용 구성까지 완벽 가이드.',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'resume-writing-guide',
        title: '大手企業に合格する履歴書・ES作成法と文字数最適化戦略',
        description: '大手企業の人事担当者が教える合格ES秘訣！文字数最適化から内容構成まで完全ガイド。',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'online-shopping-tips',
        title: 'Best Online Shopping Tips 2025: How to Find Lowest Prices',
        description: 'Save money on every purchase! Master price comparison strategies for Amazon, eBay, and other major shopping sites.',
        date: '2025-11-30',
        lang: 'en'
    },
    {
        slug: 'online-shopping-tips',
        title: '2025년 온라인 쇼핑 최저가 찾는 법: 쿠팡, 네이버 가격 비교 꿀팁',
        description: '매번 바가지 쓰시나요? 쿠팡, 네이버쇼핑, SSG에서 최저가를 찾는 검증된 방법과 숨겨진 할인 혜택 공개!',
        date: '2025-11-30',
        lang: 'ko'
    },
    {
        slug: 'online-shopping-tips',
        title: '2025年オンラインショッピング最安値の探し方：楽天、Amazon価格比較テクニック',
        description: '毎回損していませんか？楽天、Amazon、Yahoo!ショッピングで最安値を見つける検証済み方法と隠れた割引特典公開！',
        date: '2025-11-30',
        lang: 'ja'
    },
    {
        slug: 'salary-calculator-guide-2025',
        title: '2025 Salary Calculator: How Much is My Take-Home Pay? (Tax & Deductions Guide)',
        description: 'Calculate your real take-home pay with our 2025 Salary Calculator. Learn about income tax, national pension, and health insurance deductions.',
        date: '2025-12-01',
        lang: 'en'
    },
    {
        slug: 'salary-calculator-guide-2025',
        title: '2025년 연봉 실수령액 계산기: 내 월급은 얼마일까? (4대보험, 소득세 완벽 분석)',
        description: '2025년 최신 세율 적용! 연봉 3천, 5천, 1억일 때 실제 통장에 찍히는 금액은? 국민연금, 건강보험, 소득세 공제 항목을 완벽하게 분석해 드립니다.',
        date: '2025-12-01',
        lang: 'ko'
    },
    {
        slug: 'salary-calculator-guide-2025',
        title: '2025年給与手取り計算機：私の手取りはいくら？（税金・社会保険完全ガイド）',
        description: '2025年最新税率適用！年収300万、500万、1000万の時の実際の手取り額は？所得税、住民税、社会保険料の控除項目を完全に分析します。',
        date: '2025-12-01',
        lang: 'ja'
    },
    {
        slug: 'stock-average-down-strategy',
        title: 'Stock Average Down Strategy: How to Turn Losses into Profits',
        description: 'What is "Averaging Down"? Learn how to lower your break-even price and recover from stock market dips using our calculator.',
        date: '2025-12-01',
        lang: 'en'
    },
    {
        slug: 'stock-average-down-strategy',
        title: '주식 물타기 계산기 활용법: 손실을 수익으로 바꾸는 매수 전략',
        description: '물타기(평단가 낮추기)도 전략입니다. 무턱대고 사지 말고, 계산기로 정확한 평단가를 예측하고 탈출 계획을 세우세요. 성공적인 물타기 3원칙을 공개합니다.',
        date: '2025-12-01',
        lang: 'ko'
    },
    {
        slug: 'stock-average-down-strategy',
        title: '株式ナンピン計算機活用法：損失を利益に変える買い増し戦略',
        description: 'ナンピン買い（平均取得単価を下げる）も戦略です。無計画に買うのではなく、計算機で正確な平均単価を予測し、脱出計画を立てましょう。成功するナンピンの3原則を公開します。',
        date: '2025-12-01',
        lang: 'ja'
    },
    {
        slug: 'base64-image-guide',
        title: 'What is Base64 Image Encoding? Complete Guide & Converter Tool',
        description: 'Why use Base64 for images? Learn the pros and cons of embedding images as Base64 strings and how to use our free converter tool.',
        date: '2025-12-02',
        lang: 'en'
    },
    {
        slug: 'base64-image-guide',
        title: '이미지 Base64 변환 완벽 가이드: 장단점과 사용법',
        description: '이미지를 Base64로 변환하면 무엇이 좋을까요? 웹 성능에 미치는 영향과 언제 사용해야 하는지, 그리고 무료 변환 도구 사용법까지 알려드립니다.',
        date: '2025-12-02',
        lang: 'ko'
    },
    {
        slug: 'base64-image-guide',
        title: '画像Base64変換完全ガイド：メリット・デメリットと使い方',
        description: '画像をBase64に変換する理由とは？Webパフォーマンスへの影響や使いどころ、そして無料変換ツールの使い方まで解説します。',
        date: '2025-12-02',
        lang: 'ja'
    }
];
