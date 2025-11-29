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
    }
];
