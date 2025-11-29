# Cheetset Developer Guide (HOWTODEV)

이 문서는 Cheetset 프로젝트에 새로운 **블로그 글**이나 **유틸리티 도구**를 추가하는 방법을 설명합니다.

---

## 📝 블로그 글 추가하기 (Add Blog Post)

블로그 글은 **2단계**로 추가됩니다.

### 1. 메타데이터 추가 (`src/data/posts.ts`)
블로그 목록 페이지와 사이트맵(SEO)에 자동으로 반영되도록 글 정보를 추가합니다.

```typescript
// src/data/posts.ts
export const posts: Post[] = [
    // ... 기존 글들
    {
        slug: 'new-post-slug', // URL에 들어갈 슬러그 (영어, 하이픈 권장)
        title: '새로운 글 제목',
        description: '글에 대한 짧은 요약 (SEO 메타 설명으로 사용됨)',
        date: '2025-12-01',
        lang: 'ko' // 'en' | 'ko' | 'ja'
    },
    // 영어, 일본어 버전도 각각 추가해야 함
];
```

### 2. 콘텐츠 작성 (`src/app/[lang]/blog/[slug]/page.tsx`)
실제 글 내용을 렌더링하는 로직을 추가합니다. 현재는 MDX가 아닌 하드코딩 방식으로 되어 있습니다.

1.  `generateMetadata` 함수 내의 `if (slug === '...')` 블록에 메타데이터(Title, Description)를 추가합니다.
2.  `BlogPostPage` 컴포넌트 내의 `if (slug === '...')` 블록에 실제 글 내용(JSX)을 작성합니다.

```tsx
// src/app/[lang]/blog/[slug]/page.tsx

// 1. 메타데이터 설정
if (slug === 'new-post-slug') {
    if (lang === 'ko') {
        title = "새로운 글 제목";
        description = "설명...";
    }
    // ...
}

// 2. 본문 내용 작성
if (slug === 'new-post-slug') {
    return (
        <article>
            <h1>새로운 글 제목</h1>
            <p>여기에 내용을 작성하세요...</p>
        </article>
    );
}
```

---

## 🛠 유틸리티 도구 추가하기 (Add Utility Tool)

도구 추가는 **3단계**로 간소화되었습니다.

### 1. 페이지 생성 (`src/app/[lang]/tools/[slug]/page.tsx`)
새로운 도구 폴더를 만들고 `page.tsx`를 생성합니다.
*   경로 예시: `src/app/[lang]/tools/base64-encoder/page.tsx`

### 2. 다국어 텍스트 추가 (`src/dictionaries/*.json`)
`ko.json`, `en.json`, `ja.json` 파일에 도구 관련 텍스트를 추가합니다.

```json
// src/dictionaries/ko.json
"tools": {
    "base64_encoder": {
        "title": "Base64 인코더",
        "description": "텍스트를 Base64로 변환합니다."
    }
},
"nav": {
    "base64_encoder": "Base64 인코더"
}
```

### 3. 설정 파일 등록 (`src/config/tools.ts`)
`src/config/tools.ts` 파일에 한 줄만 추가하면 **메뉴, 도구 목록, 사이트맵에 자동으로 반영**됩니다.

```typescript
// src/config/tools.ts
export const tools: Tool[] = [
    // ...
    {
        slug: 'base64-encoder',
        category: 'developer', // 'developer' | 'daily'
    },
];
```

---

## 💰 수익형 도구 개발 가이드 (Profit-Oriented Development)

구글 애드센스 승인과 트래픽 수익을 목표로 하는 도구를 개발할 때는 다음 4가지 원칙을 반드시 준수해야 합니다.

### 1. SEO 메타데이터 필수 적용 (SEO Metadata)
검색 엔진이 페이지를 이해할 수 있도록 메타데이터를 완벽하게 제공해야 합니다.
- **Title**: 키워드가 포함된 매력적인 제목
- **Description**: 클릭을 유도하는 요약문
- **Keywords**: 타겟 키워드 및 연관 검색어
- **OpenGraph**: SNS 공유 시 보여질 제목과 설명

### 2. 텍스트 콘텐츠 보강 (Rich Content)
기능만 있는 페이지는 '콘텐츠 부족'으로 애드센스 승인이 거절될 수 있습니다. 하단에 최소 500자 이상의 텍스트를 추가하세요.
- **사용법 가이드**: 도구를 어떻게 사용하는지 단계별 설명
- **원리 및 설명**: 이 도구가 어떤 원리로 작동하는지
- **활용 꿀팁**: 실생활에서 어떻게 활용할 수 있는지

### 3. 사이트맵 자동 등록 (Sitemap)
작업 후 반드시 `src/app/sitemap.ts`에 경로를 추가하여 검색 엔진 봇을 초대해야 합니다.

### 4. 체류 시간 증대 장치 (Retention)
사용자가 페이지에 오래 머물도록 유도하는 장치를 마련하세요.
- **복사/공유 버튼**: 결과를 쉽게 공유할 수 있도록
- **관련 도구 추천**: 다른 도구로의 이동 유도
- **인터랙티브 요소**: 실시간 반응형 UI 등

---

## ✅ 배포하기 (Deploy)

작업이 끝나면 다음 명령어로 배포합니다.

```bash
git add .
git commit -m "Add new blog post: [Title]"
git push
```
Vercel이 자동으로 변경 사항을 감지하고 배포를 시작합니다.
