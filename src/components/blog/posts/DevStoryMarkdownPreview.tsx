'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Shield, Layout } from 'lucide-react';

type Props = {
    lang: string;
};

export default function DevStoryMarkdownPreview({ lang }: Props) {
    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
            {lang === 'en' && (
                <>
                    <h1>Building a Real-time Markdown Previewer with Next.js</h1>
                    <p className="lead">
                        How we built a fast, client-side Markdown editor using Next.js and Tailwind CSS. A look behind the scenes at CheetSet's development.
                    </p>

                    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 not-prose">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                                <Code size={24} />
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">The Goal</h3>
                                <p className="text-gray-600 dark:text-gray-400 m-0">Create a privacy-first, zero-lag markdown editor.</p>
                            </div>
                        </div>
                    </div>

                    <h2>Why We Built It</h2>
                    <p>
                        While writing content for this blog, we constantly needed a quick way to check our Markdown syntax. Existing tools were either too complex, required login, or sent data to a server. We wanted something simple, fast, and entirely client-side.
                    </p>

                    <h2>The Tech Stack</h2>
                    <p>
                        To achieve our performance goals, we chose a lightweight modern stack:
                    </p>
                    <ul>
                        <li><strong>Next.js 14:</strong> For the framework and routing.</li>
                        <li><strong>React Markdown:</strong> For safe and fast parsing.</li>
                        <li><strong>Tailwind Typography:</strong> For beautiful, automatic styling.</li>
                        <li><strong>Lucide React:</strong> For crisp, consistent icons.</li>
                    </ul>

                    <h2>Key Challenges & Solutions</h2>

                    <h3>1. Real-time Performance</h3>
                    <p>
                        The biggest challenge was rendering large markdown files without blocking the main thread. We utilized React's <code>memo</code> and optimized the re-rendering process to ensure typing always feels instantaneous, even with complex documents.
                    </p>

                    <h3>2. Security (XSS Prevention)</h3>
                    <p>
                        Allowing users to render arbitrary HTML is risky. We implemented strict sanitization to prevent Cross-Site Scripting (XSS) attacks while still allowing safe HTML tags often used in documentation.
                    </p>

                    <h3>3. Dual-Pane Layout</h3>
                    <p>
                        We designed a responsive split-view that works perfectly on desktop but collapses largely on mobile, giving priority to the preview content while keeping the editor accessible.
                    </p>

                    <h2>The Result</h2>
                    <p>
                        The final tool is less than 50KB gzipped and loads instantly. It supports GitHub Flavored Markdown (tables, strikeouts) and syntax highlighting for code blocks.
                    </p>

                    <div className="my-10 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white not-prose text-center shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-white">Try it out!</h3>
                        <p className="mb-6 opacity-90">Experience the speed and simplicity yourself.</p>
                        <Link
                            href={`/${lang}/tools/markdown-preview`}
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
                        >
                            Open Markdown Previewer <ArrowRight size={18} />
                        </Link>
                    </div>

                    <h2>What's Next?</h2>
                    <p>
                        We're planning to add features like PDF export and direct GitHub Gist publishing. Stay tuned!
                    </p>
                </>
            )}

            {lang === 'ko' && (
                <>
                    <h1>Next.js로 실시간 마크다운 미리보기 기능 만들기 (개발기)</h1>
                    <p className="lead">
                        Next.js와 Tailwind CSS를 사용하여 빠르고 안전한 클라이언트 사이드 마크다운 에디터를 만든 과정을 공유합니다. CheetSet 개발 비하인드 스토리입니다.
                    </p>

                    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 not-prose">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                                <Code size={24} />
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">목표 (The Goal)</h3>
                                <p className="text-gray-600 dark:text-gray-400 m-0">개인정보 보호를 최우선으로 하는, 랙 없는 에디터 만들기.</p>
                            </div>
                        </div>
                    </div>

                    <h2>왜 만들었나요?</h2>
                    <p>
                        블로그 글을 쓰면서 마크다운 문법을 빠르게 확인해야 할 일이 많았습니다. 하지만 기존 도구들은 너무 무겁거나, 로그인이 필요하거나, 데이터를 서버로 전송하는 등 불편함이 있었습니다. 우리는 더 단순하고, 빠르며, 100% 브라우저에서만 작동하는 도구가 필요했습니다.
                    </p>

                    <h2>기술 스택</h2>
                    <p>
                        성능 목표를 달성하기 위해 다음과 같은 경량화된 최신 스택을 선택했습니다:
                    </p>
                    <ul>
                        <li><strong>Next.js 14:</strong> 프레임워크 및 라우팅</li>
                        <li><strong>React Markdown:</strong> 안전하고 빠른 파싱</li>
                        <li><strong>Tailwind Typography:</strong> 아름다운 자동 스타일링</li>
                        <li><strong>Lucide React:</strong> 깔끔한 아이콘</li>
                    </ul>

                    <h2>주요 도전 과제와 해결책</h2>

                    <h3>1. 실시간 렌더링 성능</h3>
                    <p>
                        긴 문서를 입력할 때 메인 스레드가 멈추지 않도록 하는 것이 가장 큰 과제였습니다. React의 <code>memo</code>를 활용하고 렌더링 프로세스를 최적화하여, 복잡한 문서에서도 타자 입력이 항상 즉각적으로 반응하도록 만들었습니다.
                    </p>

                    <h3>2. 보안 (XSS 방지)</h3>
                    <p>
                        사용자가 임의의 HTML을 렌더링하게 하는 것은 위험합니다. 우리는 강력한 살균(Sanitization) 과정을 거쳐 XSS(교차 사이트 스크립팅) 공격을 방지하면서도, 문서 작성에 필요한 안전한 HTML 태그는 허용하도록 구현했습니다.
                    </p>

                    <h3>3. 반응형 듀얼 레이아웃</h3>
                    <p>
                        데스크탑에서는 쾌적한 분할 화면(Split View)을 제공하고, 모바일에서는 미리보기 화면을 우선시하는 유연한 레이아웃을 설계하여 어떤 기기에서도 편안하게 글을 쓸 수 있게 했습니다.
                    </p>

                    <h2>결과물</h2>
                    <p>
                        완성된 도구는 압축 시 50KB 미만으로 매우 가볍고 즉시 로드됩니다. GitHub Flavored Markdown(표, 취소선 등)을 완벽하게 지원하며 코드 블록 하이라이팅도 제공합니다.
                    </p>

                    <div className="my-10 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white not-prose text-center shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-white">직접 써보세요!</h3>
                        <p className="mb-6 opacity-90">설치 없이 브라우저에서 바로 그 속도를 경험해보세요.</p>
                        <Link
                            href={`/${lang}/tools/markdown-preview`}
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
                        >
                            마크다운 미리보기 열기 <ArrowRight size={18} />
                        </Link>
                    </div>

                    <h2>다음 계획은?</h2>
                    <p>
                        앞으로 PDF 내보내기 기능과 작성한 글을 바로 GitHub Gist로 공유하는 기능을 추가할 예정입니다. 많은 기대 부탁드립니다!
                    </p>
                </>
            )}

            {lang === 'ja' && (
                <>
                    <h1>Next.jsでリアルタイムMarkdownプレビュー機能を作る（開発記）</h1>
                    <p className="lead">
                        Next.jsとTailwind CSSを使用して、高速で安全なクライアントサイドMarkdownエディタを作成した過程を共有します。CheetSet開発の舞台裏です。
                    </p>

                    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 not-prose">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-300">
                                <Code size={24} />
                            </span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">目標 (The Goal)</h3>
                                <p className="text-gray-600 dark:text-gray-400 m-0">プライバシーを最優先にした、遅延のないエディタを作ること。</p>
                            </div>
                        </div>
                    </div>

                    <h2>なぜ作ったのか？</h2>
                    <p>
                        ブログ記事を書く際、Markdown構文を素早く確認したいことがよくありました。しかし、既存のツールは重かったり、ログインが必要だったり、データをサーバーに送信したりと不便でした。私たちは、よりシンプルで高速、そして100%ブラウザ内でのみ動作するツールを求めていました。
                    </p>

                    <h2>技術スタック</h2>
                    <p>
                        パフォーマンス目標を達成するために、以下のような軽量な最新スタックを選択しました：
                    </p>
                    <ul>
                        <li><strong>Next.js 14:</strong> フレームワークおよびルーティング</li>
                        <li><strong>React Markdown:</strong> 安全で高速なパース</li>
                        <li><strong>Tailwind Typography:</strong> 美しい自動スタイリング</li>
                        <li><strong>Lucide React:</strong> 鮮明なアイコン</li>
                    </ul>

                    <h2>主な課題と解決策</h2>

                    <h3>1. リアルタイムレンダリング性能</h3>
                    <p>
                        長いドキュメントを入力する際、メインスレッドが停止しないようにすることが最大の課題でした。Reactの<code>memo</code>を活用しレンダリングプロセスを最適化することで、複雑なドキュメントでもタイピングが常に即座に反応するようにしました。
                    </p>

                    <h3>2. セキュリティ（XSS防止）</h3>
                    <p>
                        ユーザーに任意のHTMLをレンダリングさせることは危険です。私たちは強力なサニタイズ（消毒）プロセスを経て、XSS（クロスサイトスクリプティング）攻撃を防ぎつつ、文書作成に必要な安全なHTMLタグは許可するように実装しました。
                    </p>

                    <h3>3. レスポンシブ・デュアルレイアウト</h3>
                    <p>
                        デスクトップでは快適な分割画面（Split View）を提供し、モバイルではプレビュー画面を優先する柔軟なレイアウトを設計し、どのデバイスでも快適に文章を書けるようにしました。
                    </p>

                    <h2>成果物</h2>
                    <p>
                        完成したツールは圧縮時50KB未満と非常に軽量で、瞬時に読み込まれます。GitHub Flavored Markdown（表、取り消し線など）を完全にサポートし、コードブロックのハイライトも提供します。
                    </p>

                    <div className="my-10 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white not-prose text-center shadow-lg">
                        <h3 className="text-2xl font-bold mb-4 text-white">実際に使ってみてください！</h3>
                        <p className="mb-6 opacity-90">インストール不要、ブラウザですぐにその速さを体験してください。</p>
                        <Link
                            href={`/${lang}/tools/markdown-preview`}
                            className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors"
                        >
                            Markdownプレビューを開く <ArrowRight size={18} />
                        </Link>
                    </div>

                    <h2>次の計画は？</h2>
                    <p>
                        今後、PDFエクスポート機能や、作成した記事を直接GitHub Gistで共有する機能を追加する予定です。ご期待ください！
                    </p>
                </>
            )}
        </article>
    );
}
