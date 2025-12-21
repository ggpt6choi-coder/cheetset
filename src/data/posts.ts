export type Post = {
    slug: string;
    title: string;
    description: string;
    date: string;
    lang: 'en' | 'ko' | 'ja';
    category?: string;
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
    },
    {
        slug: 'compound-interest-guide',
        title: 'Compound Interest Calculator Guide: How to Become a Millionaire',
        description: 'Einstein called compound interest the 8th wonder of the world. Learn the Rule of 72 and how to use our calculator to plan your financial freedom.',
        date: '2025-12-04',
        lang: 'en'
    },
    {
        slug: 'compound-interest-guide',
        title: '복리 계산기 활용 가이드: 복리의 마법으로 1억 모으기',
        description: '아인슈타인이 극찬한 복리의 마법! 72의 법칙을 이해하고, 복리 계산기를 활용하여 자산 증식 계획을 세우는 방법을 알려드립니다.',
        date: '2025-12-04',
        lang: 'ko'
    },
    {
        slug: 'compound-interest-guide',
        title: '複利計算機活用ガイド：複利の魔法で資産を増やす方法',
        description: 'アインシュタインが絶賛した複利の魔法！72の法則を理解し、複利計算機を活用して資産形成計画を立てる方法を解説します。',
        date: '2025-12-04',
        lang: 'ja'
    },
    {
        slug: 'uuid-guide',
        title: 'What is UUID v4? A Developer\'s Guide to Unique Identifiers',
        description: 'Why use UUIDs instead of Auto Increment IDs? We explain the structure of UUID v4, collision probabilities, and when to use them in your projects.',
        date: '2025-12-04',
        lang: 'en'
    },
    {
        slug: 'uuid-guide',
        title: 'UUID v4란 무엇인가? 개발자를 위한 고유 식별자 가이드',
        description: 'Auto Increment 대신 왜 UUID를 쓸까요? UUID v4의 구조와 충돌 확률, 그리고 언제 사용해야 하는지 명확하게 정리해 드립니다.',
        date: '2025-12-04',
        lang: 'ko'
    },
    {
        slug: 'uuid-guide',
        title: 'UUID v4とは？開発者のための固有識別子ガイド',
        description: 'Auto Incrementの代わりになぜUUIDを使うのですか？UUID v4の構造と衝突確率、そしていつ使用すべきかを明確に整理します。',
        date: '2025-12-04',
        lang: 'ja'
    },
    {
        slug: 'jwt-guide',
        title: 'JWT (JSON Web Token) Complete Guide: Structure, Security, and Use Cases',
        description: 'What is JWT and how does it work? We explain the Header, Payload, and Signature structure, and why it is the standard for stateless authentication.',
        date: '2025-12-04',
        lang: 'en'
    },
    {
        slug: 'jwt-guide',
        title: 'JWT(JSON Web Token) 완벽 가이드: 구조, 보안, 그리고 사용 사례',
        description: 'JWT는 무엇이고 어떻게 작동할까요? 헤더, 페이로드, 서명 구조를 분석하고, 왜 무상태(Stateless) 인증의 표준이 되었는지 설명합니다.',
        date: '2025-12-04',
        lang: 'ko'
    },
    {
        slug: 'jwt-guide',
        title: 'JWT（JSON Web Token）完全ガイド：構造、セキュリティ、使用事例',
        description: 'JWTとは何か、どのように機能するのか？ヘッダー、ペイロード、署名の構造を分析し、なぜステートレス認証の標準となったのかを解説します。',
        date: '2025-12-04',
        lang: 'ja'
    },
    {
        slug: 'pomodoro-technique',
        title: 'The Pomodoro Technique: How to Skyrocket Your Productivity in 25 Minutes',
        description: 'Struggling with focus? The Pomodoro Technique is a proven time management method. Learn how to use the 25/5 rule to beat procrastination.',
        date: '2025-12-04',
        lang: 'en',
        category: 'productivity'
    },
    {
        slug: 'pomodoro-technique',
        title: '포모도로 테크닉: 25분 집중으로 생산성을 극대화하는 방법',
        description: '집중하기 힘드신가요? 포모도로 기법은 검증된 시간 관리 방법입니다. 25분 집중, 5분 휴식 규칙으로 미루는 습관을 이겨내는 법을 알아보세요.',
        date: '2025-12-04',
        lang: 'ko',
        category: 'productivity'
    },
    {
        slug: 'pomodoro-technique',
        title: 'ポモドーロ・テクニック：25分の集中で生産性を最大化する方法',
        description: '集中力が続きませんか？ポモドーロ・テクニックは実証済みの時間管理法です。25分の集中と5分の休憩ルールで、先延ばし癖を克服する方法を学びましょう。',
        date: '2025-12-04',
        lang: 'ja',
        category: 'productivity'
    },
    {
        slug: 'qr-code-guide',
        title: 'How QR Codes Work & Marketing Tips: Create Your Own for Free',
        description: 'How do QR codes store data? We explain the working principle, business use cases, and how to use our free QR code generator.',
        date: '2025-12-05',
        lang: 'en',
        category: 'tech'
    },
    {
        slug: 'qr-code-guide',
        title: 'QR 코드의 원리와 마케팅 활용법: 무료 생성기로 나만의 QR 만들기',
        description: 'QR 코드는 어떻게 데이터를 저장할까요? 작동 원리부터 비즈니스 활용 사례, 그리고 무료 QR 코드 생성기 사용법까지 완벽하게 정리해 드립니다.',
        date: '2025-12-05',
        lang: 'ko',
        category: 'tech'
    },
    {
        slug: 'qr-code-guide',
        title: 'QRコードの仕組みとマーケティング活用法：無料生成器で自分だけのQRを作ろう',
        description: 'QRコードはどのようにデータを保存するのでしょうか？動作原理からビジネス活用事例、そして無料QRコード生成器の使い方まで完全に整理します。',
        date: '2025-12-05',
        lang: 'ja',
        category: 'tech'
    },
    {
        slug: 'mdx-test',
        title: 'MDX Test Post',
        description: 'This is a test post written in MDX to verify the new blog system.',
        date: '2025-12-06',
        lang: 'en',
        category: 'tech'
    },
    {
        slug: 'password-security-guide',
        title: 'How to Create Uncrackable Passwords (and Why It Matters)',
        description: 'Learn how hackers crack passwords and how to create strong, memorable passwords using our Password Generator.',
        date: '2025-12-06',
        lang: 'en',
        category: 'security'
    },
    {
        slug: 'password-security-guide',
        title: '해커가 뚫지 못하는 비밀번호 만드는 법 (강력한 암호 생성 가이드)',
        description: '해커들은 어떻게 비밀번호를 해킹할까요? 무차별 대입 공격부터 사전 공격까지 알아보고, 안전한 비밀번호를 만드는 방법을 소개합니다.',
        date: '2025-12-06',
        lang: 'ko',
        category: 'security'
    },
    {
        slug: 'password-security-guide',
        title: 'ハッカーに破られないパスワードの作り方（強力なパスワード生成ガイド）',
        description: 'ハッカーはどのようにパスワードを解読するのでしょうか？ブルートフォース攻撃から辞書攻撃までを学び、安全なパスワードを作成する方法を紹介します。',
        date: '2025-12-06',
        lang: 'ja',
        category: 'security'
    },
    {
        slug: 'cron-job-guide',
        title: 'Master Cron Expressions: A Developer\'s Guide',
        description: 'Confused by * * * * *? Learn how to schedule tasks using Cron expressions and use our Cron Generator to create them instantly.',
        date: '2025-12-06',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'cron-job-guide',
        title: '개발자를 위한 Cron 표현식 완벽 가이드 (크론잡 설정법)',
        description: '* * * * * 이게 무슨 뜻일까요? 리눅스 스케줄링의 핵심인 Cron 표현식을 완벽하게 이해하고, Cron 생성기로 쉽게 만드는 법을 알려드립니다.',
        date: '2025-12-06',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'cron-job-guide',
        title: '開発者のためのCron式完全ガイド（クーロンジョブ設定法）',
        description: '* * * * * これは何の意味でしょうか？Linuxスケジューリングの核心であるCron式を完全に理解し、Cronジェネレーターで簡単に作成する方法を紹介します。',
        date: '2025-12-06',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'unix-timestamp-guide',
        title: 'What is Unix Time? The Year 2038 Problem Explained',
        description: 'Why do computers count seconds from 1970? Learn about Unix Time, the Epoch, and the upcoming Year 2038 problem.',
        date: '2025-12-06',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'unix-timestamp-guide',
        title: '유닉스 시간(Unix Time)이란? 2038년 문제 완벽 정리',
        description: '컴퓨터는 왜 1970년부터 시간을 셀까요? 유닉스 타임스탬프의 정의와 다가오는 2038년 문제(Y2K38)에 대해 알아봅니다.',
        date: '2025-12-06',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'unix-timestamp-guide',
        title: 'Unix時間（ユニックスタイム）とは？2038年問題の完全解説',
        description: 'コンピュータはなぜ1970年から時間を数えるのでしょうか？Unixタイムスタンプの定義と、迫り来る2038年問題（Y2K38）について解説します。',
        date: '2025-12-06',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'unit-conversion-guide',
        title: 'The Chaos of Measurement: Imperial vs Metric System',
        description: 'Why does the US use miles while the rest of the world uses kilometers? Explore the history of measurement systems and how to convert between them.',
        date: '2025-12-06',
        lang: 'en',
        category: 'life'
    },
    {
        slug: 'unit-conversion-guide',
        title: '단위의 혼란: 미터법 vs 야드파운드법, 왜 다를까?',
        description: '미국은 왜 마일을 쓰고 한국은 킬로미터를 쓸까요? 복잡한 단위 체계의 역사와 정확한 변환 방법을 알아봅니다.',
        date: '2025-12-06',
        lang: 'ko',
        category: 'life'
    },
    {
        slug: 'unit-conversion-guide',
        title: '単位の混乱：メートル法 vs ヤード・ポンド法、なぜ違う？',
        description: 'なぜアメリカはマイルを使い、日本はキロメートルを使うのでしょうか？複雑な単位体系の歴史と正確な変換方法を学びます。',
        date: '2025-12-06',
        lang: 'ja',
        category: 'life'
    },
    {
        slug: 'image-formats-guide',
        title: 'WebP vs PNG vs JPEG: Which Image Format Should You Use?',
        description: 'Confused by image formats? We compare WebP, PNG, and JPEG to help you choose the best format for your website\'s performance.',
        date: '2025-12-06',
        lang: 'en',
        category: 'tech'
    },
    {
        slug: 'image-formats-guide',
        title: 'WebP vs PNG vs JPEG: 어떤 이미지 포맷을 써야 할까?',
        description: '이미지 포맷 때문에 고민이신가요? WebP, PNG, JPEG의 장단점을 비교하고 웹사이트 성능을 위해 최적의 포맷을 선택하는 법을 알려드립니다.',
        date: '2025-12-06',
        lang: 'ko',
        category: 'tech'
    },
    {
        slug: 'image-formats-guide',
        title: 'WebP vs PNG vs JPEG：どの画像形式を使うべき？',
        description: '画像形式で迷っていませんか？WebP、PNG、JPEGの長所と短所を比較し、Webサイトのパフォーマンスのために最適な形式を選択する方法を紹介します。',
        date: '2025-12-06',
        lang: 'ja',
        category: 'tech'
    },
    {
        slug: 'pdf-merge-guide',
        title: 'How to Merge PDF Files for Free: No Installation Required',
        description: 'Need to combine multiple PDFs into one? Learn how to use our free online Merge PDF tool. It\'s fast, secure, and runs entirely in your browser.',
        date: '2025-12-07',
        lang: 'en',
        category: 'productivity'
    },
    {
        slug: 'pdf-merge-guide',
        title: '무료로 PDF 합치기: 프로그램 설치 없이 3초 만에 끝내는 법',
        description: '여러 개의 PDF 파일을 하나로 합쳐야 하나요? 프로그램 설치 없이 브라우저에서 바로 실행되는 무료 PDF 병합 도구 사용법을 알려드립니다.',
        date: '2025-12-07',
        lang: 'ko',
        category: 'productivity'
    },
    {
        slug: 'pdf-merge-guide',
        title: '無料でPDFを結合する方法：インストール不要で3秒で完了',
        description: '複数のPDFファイルを1つにまとめる必要がありますか？インストール不要でブラウザ上で動作する無料のPDF結合ツールの使い方を紹介します。',
        date: '2025-12-07',
        lang: 'ja',
        category: 'productivity'
    },
    {
        slug: 'reaction-time-guide',
        title: 'Test Your Reaction Time: Are You Faster Than a Pro Gamer?',
        description: 'How fast is your brain? Measure your reaction speed in milliseconds with our Reaction Time Test and see how you compare to the average.',
        date: '2025-12-07',
        lang: 'en',
        category: 'game'
    },
    {
        slug: 'reaction-time-guide',
        title: '내 반응속도는 상위 몇 %일까? 프로게이머급 피지컬 테스트',
        description: '당신의 뇌는 얼마나 빠를까요? 반응속도 테스트로 밀리초(ms) 단위의 반응 속도를 측정하고 평균과 비교해보세요. 친구들과 내기하기 딱 좋습니다!',
        date: '2025-12-07',
        lang: 'ko',
        category: 'game'
    },
    {
        slug: 'reaction-time-guide',
        title: 'あなたの反応速度は上位何％？プロゲーマー級フィジカルテスト',
        description: 'あなたの脳はどれくらい速いですか？反応速度テストでミリ秒（ms）単位の反応速度を測定し、平均と比較してみましょう。友達と競争するのに最適です！',
        date: '2025-12-07',
        lang: 'ja',
        category: 'game'
    },
    {
        slug: 'heic-to-jpg-guide',
        title: 'How to Convert HEIC to JPG for Free (iPhone Photos to Windows)',
        description: 'Cannot open iPhone photos on Windows? Learn what HEIC format is and how to convert HEIC to JPG/PNG for free using our online converter.',
        date: '2025-12-08',
        lang: 'en',
        category: 'tech'
    },
    {
        slug: 'heic-to-jpg-guide',
        title: 'HEIC JPG 변환 방법: 아이폰 사진 윈도우에서 안 열릴 때 해결법',
        description: '아이폰으로 찍은 사진이 윈도우에서 안 열리나요? HEIC 파일의 장단점과 무료로 JPG, PNG로 변환하여 호환성 문제를 해결하는 방법을 알려드립니다.',
        date: '2025-12-08',
        lang: 'ko',
        category: 'tech'
    },
    {
        slug: 'heic-to-jpg-guide',
        title: 'HEIC JPG 変換方法：iPhoneの写真がWindowsで開かない時の解決策',
        description: 'iPhoneで撮った写真がWindowsで開きませんか？HEICファイルのメリット・デメリットと、無料でJPG、PNGに変換して互換性問題を解決する方法を紹介します。',
        date: '2025-12-08',
        lang: 'ja',
        category: 'tech'
    },
    {
        slug: 'youtube-revenue-calculator-guide',
        title: 'YouTube Revenue Calculator: How Much Money Can You Make?',
        description: 'Curious about YouTuber earnings? Learn how YouTube RPM works and estimate your potential income based on views using our calculator.',
        date: '2025-12-09',
        lang: 'en',
        category: 'finance'
    },
    {
        slug: 'image-compression-guide',
        title: '이미지 용량 줄이기: 화질 저하 없이 압축하는 방법',
        description: '웹사이트 속도 향상을 위한 필수 팁! JPG, PNG, WEBP 이미지 용량을 화질 저하 없이 줄이는 방법과 무료 도구를 소개합니다.',
        date: '2025-12-11',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'image-compression-guide',
        title: 'How to Compress Images Without Losing Quality',
        description: 'Essential tips for faster websites! Learn how to reduce JPG, PNG, WEBP file sizes without losing quality using free tools.',
        date: '2025-12-11',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'image-compression-guide',
        title: '画質を落とさずに画像の容量を減らす方法',
        description: 'ウェブサイト高速化の必須テクニック！JPG、PNG、WEBP画像の容量を画質劣化なしで削減する方法と無料ツールを紹介します。',
        date: '2025-12-11',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'youtube-revenue-calculator-guide',
        title: '유튜브 수익 계산기 활용법: 내 조회수로 얼마를 벌 수 있을까?',
        description: '유튜버들은 조회수 1회당 얼마를 벌까요? RPM과 CPM의 개념을 이해하고, 내 조회수로 예상 수익을 계산하는 방법을 알려드립니다.',
        date: '2025-12-09',
        lang: 'ko',
        category: 'finance'
    },
    {
        slug: 'youtube-revenue-calculator-guide',
        title: 'YouTube収益計算機活用法：私の再生回数でいくら稼げる？',
        description: 'YouTuberは再生回数1回あたりいくら稼ぐのでしょうか？RPMとCPMの概念を理解し、自分の再生回数で予想収益を計算する方法を紹介します。',
        date: '2025-12-09',
        lang: 'ja',
        category: 'finance'
    },
    {
        slug: 'image-cropper-guide',
        title: '이미지 자르기: SNS 프로필, 썸네일용 사진 3초 만에 편집하기',
        description: '인스타그램, 유튜브 썸네일 비율 때문에 고민이신가요? 1:1, 16:9 등 원하는 비율로 이미지를 쉽고 빠르게 자르는 방법을 소개합니다.',
        date: '2025-12-11',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'image-cropper-guide',
        title: 'Crop Images Online: Perfect Aspect Ratios for Social Media',
        description: 'Need the perfect ratio for Instagram or YouTube? Learn how to crop images to 1:1, 16:9, or any custom size instantly in your browser.',
        date: '2025-12-11',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'image-cropper-guide',
        title: '画像切り抜き：SNSプロフィール、サムネイル用写真を3秒で編集',
        description: 'InstagramやYouTubeのサムネイル比率で悩んでいませんか？1:1、16:9など、希望の比率で画像を簡単かつ迅速に切り抜く方法を紹介します。',
        date: '2025-12-11',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'image-resizer-guide',
        title: '이미지 크기 조절: 웹사이트 속도 높이는 리사이징 꿀팁',
        description: '이미지 해상도가 너무 크면 로딩이 느려집니다. 픽셀 단위로 정확하게 크기를 조절하고, 포맷을 변환하여 웹사이트 속도를 최적화하세요.',
        date: '2025-12-11',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'loan-calculator-guide',
        title: '대출 이자 줄이는 상환 방식 비교: 원리금균등 vs 원금균등',
        description: '대출 상환 방식에 따라 총 이자가 수백만 원 차이납니다. 원리금균등, 원금균등, 만기일시 상환 방식을 비교하고 나에게 맞는 대출 전략을 세워보세요.',
        date: '2025-12-12',
        lang: 'ko',
        category: 'finance'
    },
    {
        slug: 'bmr-calculator-guide',
        title: '다이어트 필수! 내 기초대사량(BMR) 계산하고 식단 짜는 법',
        description: '무작정 굶는 다이어트는 그만! 기초대사량(BMR)과 활동 대사량(TDEE)을 알면 먹으면서 살을 뺄 수 있습니다. 다이어트 성공 공식을 공개합니다.',
        date: '2025-12-12',
        lang: 'ko',
        category: 'daily'
    },
    {
        slug: 'image-resizer-guide',
        title: 'Resize Images Online: Optimize for Web Speed',
        description: 'Large images slow down websites. Learn how to resize images to exact pixel dimensions and convert formats for maximum performance.',
        date: '2025-12-11',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'image-resizer-guide',
        title: '画像サイズ変更：Webサイト高速化のためのリサイズ術',
        description: '画像の解像度が大きすぎると読み込みが遅くなります。ピクセル単位で正確にサイズを調整し、フォーマットを変換してWebサイトの速度を最適化しましょう。',
        date: '2025-12-11',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'exif-viewer-guide',
        title: '사진 속 숨겨진 정보(EXIF) 확인하는 방법: 촬영 날짜, 위치, 카메라 설정까지',
        description: '스마트폰 사진에 숨겨진 EXIF 데이터가 무엇인지 알아보고, 무료로 카메라 설정과 GPS 위치 정보를 확인하는 방법을 소개합니다.',
        date: '2025-12-12',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'exif-viewer-guide',
        title: 'How to View Hidden Photo Data (EXIF): Date, Location, and Camera Settings',
        description: 'Learn what EXIF data is and how to view hidden metadata in your photos, including camera settings and GPS location, for free.',
        date: '2025-12-12',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'exif-viewer-guide',
        title: '写真の隠された情報（EXIF）を確認する方法：撮影日時、場所、カメラ設定まで',
        description: 'スマホの写真に隠されたEXIFデータとは何か、そしてカメラ設定やGPS位置情報を無料で確認する方法を紹介します。',
        date: '2025-12-12',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'image-filters-guide',
        title: '사진 분위기를 바꾸는 가장 쉬운 방법: 무료 온라인 이미지 필터',
        description: '복잡한 프로그램 없이 브라우저에서 바로 사진의 밝기, 대비를 조절하고 다양한 필터를 적용하는 방법을 소개합니다.',
        date: '2025-12-12',
        lang: 'ko',
        category: 'image'
    },
    {
        slug: 'image-filters-guide',
        title: 'The Easiest Way to Change Photo Mood: Free Online Image Filters',
        description: 'Learn how to adjust brightness, contrast, and apply various filters to your photos directly in your browser without complex software.',
        date: '2025-12-12',
        lang: 'en',
        category: 'image'
    },
    {
        slug: 'image-filters-guide',
        title: '写真の雰囲気を変える一番簡単な方法：無料オンライン画像フィルター',
        description: '複雑なソフトなしで、ブラウザ上で写真の明るさやコントラストを調整し、様々なフィルターを適用する方法を紹介します。',
        date: '2025-12-12',
        lang: 'ja',
        category: 'image'
    },
    {
        slug: 'new-tools-release-json-diff-color-palette',
        title: 'New Tools Released: JSON Diff & Color Palette Generator',
        description: 'We have added two powerful tools for developers and designers: JSON Diff for debugging APIs and Color Palette Generator for design inspiration.',
        date: '2025-12-14',
        lang: 'en',
        category: 'news'
    },
    {
        slug: 'new-tools-release-json-diff-color-palette',
        title: '신규 도구 출시: JSON 비교 & 컬러 팔레트 추출기',
        description: '개발자와 디자이너를 위한 강력한 도구 2종이 추가되었습니다. API 디버깅을 위한 JSON 비교 도구와 디자인 영감을 주는 컬러 팔레트 추출기를 만나보세요.',
        date: '2025-12-14',
        lang: 'ko',
        category: 'news'
    },
    {
        slug: 'new-tools-release-json-diff-color-palette',
        title: '新ツール公開：JSON比較 & カラーパレット抽出機',
        description: '開発者とデザイナーのための強力なツール2種が追加されました。APIデバッグのためのJSON比較ツールと、デザインのインスピレーションを与えるカラーパレット抽出機をご覧ください。',
        date: '2025-12-14',
        lang: 'ja',
        category: 'news'
    },
    {
        slug: 'developer-productivity-guide-2025',
        title: 'The Ultimate Developer Productivity Setup for 2025',
        description: 'Essential free online tools for developers and designers in 2025. JSON Diff, Color Palette, Salary Calculator, and more.',
        date: '2025-12-15',
        lang: 'en',
        category: 'developer'
    },
    {
        slug: 'developer-productivity-guide-2025',
        title: '개발 생산성을 200% 높이는 필수 온라인 도구 모음 2025',
        description: '2025년 개발자와 디자이너가 반드시 즐겨찾기 해야 할 무료 온라인 도구들을 엄선했습니다. JSON Diff, 컬러 팔레트, 연봉 계산기 등.',
        date: '2025-12-15',
        lang: 'ko',
        category: 'developer'
    },
    {
        slug: 'developer-productivity-guide-2025',
        title: '開発生産性を200%向上させる必須オンラインツール集 2025',
        description: '2025年に開発者とデザイナーが必ずブックマークすべき無料オンラインツールを厳選しました。JSON Diff、カラーパレット、給与計算機など。',
        date: '2025-12-15',
        lang: 'ja',
        category: 'developer'
    },
    {
        slug: 'magic-of-compound-interest',
        title: '복리의 마법: 적은 돈으로 자산을 불리는 가장 확실한 방법',
        description: '아인슈타인이 극찬한 복리의 마법! 단리와의 차이점을 표로 비교하고, 월 50만원으로 7억을 만드는 실제 시뮬레이션 결과를 공개합니다.',
        date: '2025-12-21',
        lang: 'ko',
        category: 'finance'
    }
];
