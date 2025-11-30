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

### 3. 슬러그 등록 (`src/app/[lang]/blog/[slug]/page.tsx`)
`BlogPostPage` 컴포넌트 내의 `validSlugs` 배열에 새로운 슬러그를 추가해야 합니다. **이 단계를 건너뛰면 404 페이지가 뜹니다.**

```typescript
const validSlugs = [
    'resume-word-count',
    'json-formatting-guide',
    // ... 기존 슬러그들
    'new-post-slug' // 여기에 추가
];
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
`src/config/tools.ts` 파일에 한 줄만 추가하면 **메뉴, 사이트맵, 그리고 홈 화면의 카테고리별 카드 그리드에 자동으로 반영**됩니다.

```typescript
// src/config/tools.ts
export const tools: Tool[] = [
    // ...
    {
        slug: 'base64-encoder',
        category: 'developer', // 'developer' | 'finance' | 'daily'
    },
];
```

### 4. 다국어 지원 (Multilingual Support) ⭐ 필수

**목표:** 한국, 미국, 일본 유저 유입을 통한 애드센스 수익 극대화

#### 4-1. Dictionary 파일에 모든 텍스트 추가

`ko.json`, `en.json`, `ja.json` 세 파일 모두에 **도구에서 사용되는 모든 텍스트**를 추가합니다.

```json
// src/dictionaries/ko.json
"tools": {
    "base64_encoder": {
        "title": "Base64 인코더",
        "description": "텍스트를 Base64로 변환합니다.",
        "placeholder": "텍스트를 입력하세요",
        "button_encode": "인코딩",
        "button_decode": "디코딩",
        "result_label": "결과",
        "seo_content": "무료 온라인 Base64 인코더입니다..."
    }
}
```

**주의:** UI에 표시되는 모든 텍스트(버튼, placeholder, 안내문 등)를 빠짐없이 추가하세요.

#### 4-2. 클라이언트 컴포넌트 작성 (`Client Component`)

도구가 인터랙티브한 경우, **Client Component**를 별도로 분리하고 `labels` prop으로 번역을 받습니다.

```tsx
// src/app/[lang]/tools/base64-encoder/Base64EncoderClient.tsx
'use client';

interface Base64EncoderClientProps {
    labels: {
        title: string;
        placeholder: string;
        button_encode: string;
        button_decode: string;
        result_label: string;
    };
}

export default function Base64EncoderClient({ labels }: Base64EncoderClientProps) {
    return (
        <div>
            <h1>{labels.title}</h1>
            <input placeholder={labels.placeholder} />
            <button>{labels.button_encode}</button>
            {/* ... */}
        </div>
    );
}
```

#### 4-3. Page Component에서 Dictionary 전달

Server Component인 `page.tsx`에서 dictionary를 불러와 Client Component에 전달합니다.

```tsx
// src/app/[lang]/tools/base64-encoder/page.tsx
import { getDictionary } from '@/dictionaries/get-dictionary';
import Base64EncoderClient from './Base64EncoderClient';

type Locale = 'en' | 'ko' | 'ja';
type Props = { params: Promise<{ lang: string }>; };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    
    return {
        title: `${dict.tools.base64_encoder.title} - ${dict.common.title}`,
        description: dict.tools.base64_encoder.description,
    };
}

export default async function Base64EncoderPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Base64EncoderClient
                labels={{
                    title: dict.tools.base64_encoder.title,
                    placeholder: dict.tools.base64_encoder.placeholder,
                    button_encode: dict.tools.base64_encoder.button_encode,
                    button_decode: dict.tools.base64_encoder.button_decode,
                    result_label: dict.tools.base64_encoder.result_label,
                }}
            />
            
            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert ...">
                    <p>{dict.tools.base64_encoder.seo_content}</p>
                </div>
            </div>
        </div>
    );
}
```

---

## 💰 수익형 도구 개발 가이드 (Profit-Oriented Development)

구글 애드센스 승인과 트래픽 수익을 목표로 하는 도구를 개발할 때는 **3가지 SEO 핵심 요소**를 반드시 준수해야 합니다.

### 1. 기술적 SEO (Technical SEO) - 로봇을 위한 명찰 달기
구글 로봇이 페이지를 잘 이해할 수 있도록 명확한 정보를 제공합니다.
- **Title (제목)**: 검색 결과에 노출되는 파란색 글씨. 클릭을 유도하는 매력적인 문구여야 합니다.
    - *예시:* `서버 시간 확인 - 네이비즘, 인터파크 티켓팅 필수 시계`
- **Description (설명)**: 제목 아래의 두 줄 요약문. 핵심 키워드를 포함해야 합니다.
    - *예시:* `서버 시간을 밀리초 단위로 확인하세요. 수강신청, 티켓팅 성공을 위한 가장 정확한 서버 시계입니다.`
- **Open Graph (SNS)**: 카카오톡 공유 시 보여질 이미지와 설명입니다. 클릭률(CTR)을 높여줍니다.

### 2. 콘텐츠 SEO (Content SEO) - 알맹이 채우기
**가장 중요합니다.** 도구만 있는 페이지는 '콘텐츠 부족'으로 애드센스 승인이 거절됩니다.
- **풍부한 텍스트**: 도구 하단에 최소 **500자 이상**의 설명글을 작성하세요.
- **구조화된 태그**: `<h1>`, `<h2>` 태그를 사용하여 글의 뼈대를 잡아주세요.
- **작성 내용**:
    - 이 도구는 무엇인가요?
    - 어떻게 사용하나요? (단계별 가이드)
    - 왜 필요한가요? (활용 꿀팁)

### 3. 구조적 SEO (Structural SEO) - 길 닦아주기
로봇과 사용자가 사이트 내에서 잘 이동할 수 있도록 합니다.
- **Sitemap 등록**: `src/config/tools.ts`에 추가하면 자동으로 처리됩니다.
- **내부 링크 (Internal Link)**: 블로그 글에서 도구로, 도구에서 다른 도구로 연결되는 링크를 적극적으로 활용하세요.
- **체류 시간 증대**: 복사 버튼, 공유하기 기능 등을 넣어 사용자가 페이지에 오래 머물도록 유도하세요.

---

## ✅ 배포하기 (Deploy)

작업이 끝나면 다음 명령어로 배포합니다.

```bash
git add .
git commit -m "Add new blog post: [Title]"
git push
```
Vercel이 자동으로 변경 사항을 감지하고 배포를 시작합니다.
