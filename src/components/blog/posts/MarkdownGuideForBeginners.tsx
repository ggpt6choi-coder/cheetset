'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function MarkdownGuideForBeginners({ lang }: Props) {
    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
            {lang === 'en' && (
                <>
                    <h1>Markdown Guide for Beginners: How to Write Like a Pro</h1>
                    <p className="lead">
                        Markdown is a lightweight markup language that you can use to add formatting elements to plain text text documents. Created by John Gruber in 2004, Markdown is now one of the world's most popular markup languages.
                    </p>

                    <h2>What is Markdown?</h2>
                    <p>
                        Markdown helps you create formatted text using a plain-text editor. It is widely used for:
                    </p>
                    <ul>
                        <li>Writing technical documentation (like README files on GitHub)</li>
                        <li>Creating content for websites and blogs</li>
                        <li>Taking notes</li>
                    </ul>

                    <h2>Basic Syntax</h2>
                    <p>Here are the essentials you need to know:</p>

                    <h3>1. Headers</h3>
                    <pre><code>
                        # Header 1<br />
                        ## Header 2<br />
                        ### Header 3
                    </code></pre>

                    <h3>2. Emphasis</h3>
                    <p>
                        *Italic* or _Italic_<br />
                        **Bold** or __Bold__
                    </p>

                    <h3>3. Lists</h3>
                    <p>
                        - Item 1<br />
                        - Item 2<br />
                        1. First item<br />
                        2. Second item
                    </p>

                    <h3>4. Links & Images</h3>
                    <p>
                        [Link Text](https://example.com)<br />
                        ![Alt Text](image.jpg)
                    </p>

                    <h2>Try It Yourself</h2>
                    <p>
                        The best way to learn is by doing. We have created a free <strong>Markdown Previewer</strong> tool where you can practice writing Markdown and see the result in real-time.
                    </p>
                    <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                        <Link href={`/${lang}/tools/markdown-preview`} className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            👉 Try Markdown Previewer Now
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Write markdown on the left, see the result on the right instantly. No sign-up required.
                        </p>
                    </div>

                    <h2>Why Use Markdown?</h2>
                    <ul>
                        <li><strong>It's fast:</strong> You don't need to take your hands off the keyboard.</li>
                        <li><strong>It's portable:</strong> You can open it in any text editor.</li>
                        <li><strong>It's platform independent:</strong> You can create Markdown-formatted text on any device running any operating system.</li>
                    </ul>
                </>
            )}

            {lang === 'ko' && (
                <>
                    <h1>마크다운 마스터 가이드: 10분 만에 익히는 글쓰기 혁명</h1>
                    <p className="lead">
                        마크다운(Markdown)은 일반 텍스트 문서에 서식 요소를 추가할 수 있는 경량 마크업 언어입니다. 2004년 John Gruber가 만든 이래로 전 세계에서 가장 인기 있는 마크업 언어 중 하나가 되었습니다.
                    </p>

                    <h2>마크다운이란 무엇인가요?</h2>
                    <p>
                        마크다운을 사용하면 서식이 있는 문서를 일반 텍스트 편집기(메모장 등)에서도 쉽게 작성할 수 있습니다. 주로 다음과 같은 용도로 사용됩니다:
                    </p>
                    <ul>
                        <li>기술 문서 작성 (GitHub의 README 파일 등)</li>
                        <li>웹사이트 및 블로그 콘텐츠 제작</li>
                        <li>빠른 노트 필기</li>
                    </ul>

                    <h2>기본 문법 정리</h2>
                    <p>꼭 알아야 할 핵심 문법은 다음과 같습니다:</p>

                    <h3>1. 제목 (Headers)</h3>
                    <pre><code>
                        # 제목 1 (가장 큼)<br />
                        ## 제목 2<br />
                        ### 제목 3
                    </code></pre>

                    <h3>2. 강조 (Emphasis)</h3>
                    <p>
                        *기울임꼴* 또는 _기울임꼴_<br />
                        **굵게** 또는 __굵게__
                    </p>

                    <h3>3. 목록 (Lists)</h3>
                    <p>
                        - 항목 1<br />
                        - 항목 2<br />
                        1. 첫 번째 항목<br />
                        2. 두 번째 항목
                    </p>

                    <h3>4. 링크 및 이미지</h3>
                    <p>
                        [링크 텍스트](https://naver.com)<br />
                        ![이미지 설명](image.jpg)
                    </p>

                    <h2>직접 연습해보기</h2>
                    <p>
                        백문이 불여일견입니다. 저희가 제공하는 무료 <strong>마크다운 미리보기</strong> 도구에서 문법을 연습하고 결과를 실시간으로 확인해보세요.
                    </p>
                    <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                        <Link href={`/${lang}/tools/markdown-preview`} className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            👉 마크다운 미리보기 도구 바로가기
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            왼쪽에 입력하면 오른쪽에서 바로 변환됩니다. 설치나 가입 없이 바로 사용하세요.
                        </p>
                    </div>

                    <h2>왜 마크다운을 써야 할까요?</h2>
                    <ul>
                        <li><strong>빠릅니다:</strong> 마우스를 잡을 필요 없이 키보드만으로 서식을 입힐 수 있습니다.</li>
                        <li><strong>호환성이 좋습니다:</strong> 어떤 텍스트 에디터에서도 열 수 있습니다.</li>
                        <li><strong>변환이 쉽습니다:</strong> HTML, PDF 등 다양한 포맷으로 쉽게 변환됩니다.</li>
                    </ul>
                </>
            )}

            {lang === 'ja' && (
                <>
                    <h1>マークダウン入門ガイド：10分でマスターする効率的なライティング</h1>
                    <p className="lead">
                        マークダウン（Markdown）は、プレーンテキスト文書に書式設定要素を追加できる軽量マークアップ言語です。2004年にJohn Gruberによって作成されて以来、世界で最も人気のあるマークアップ言語の1つになりました。
                    </p>

                    <h2>マークダウンとは？</h2>
                    <p>
                        マークダウンを使用すると、通常のテキストエディタで書式付きテキストを簡単に作成できます。主に以下の用途で使用されます：
                    </p>
                    <ul>
                        <li>技術ドキュメントの作成（GitHubのREADMEファイルなど）</li>
                        <li>ウェブサイトやブログのコンテンツ作成</li>
                        <li>メモ取り</li>
                    </ul>

                    <h2>基本構文</h2>
                    <p>知っておくべき必須の構文は以下の通りです：</p>

                    <h3>1. 見出し (Headers)</h3>
                    <pre><code>
                        # 見出し 1<br />
                        ## 見出し 2<br />
                        ### 見出し 3
                    </code></pre>

                    <h3>2. 強調 (Emphasis)</h3>
                    <p>
                        *イタリック* または _イタリック_<br />
                        **太字** または __太字__
                    </p>

                    <h3>3. リスト (Lists)</h3>
                    <p>
                        - 項目 1<br />
                        - 項目 2<br />
                        1. 最初の項目<br />
                        2. 2番目の項目
                    </p>

                    <h3>4. リンクと画像</h3>
                    <p>
                        [リンクテキスト](https://google.co.jp)<br />
                        ![画像の説明](image.jpg)
                    </p>

                    <h2>実際に試してみよう</h2>
                    <p>
                        習うより慣れろです。私たちが提供する無料の<strong>マークダウンプレビュー</strong>ツールで、マークダウンを練習し、リアルタイムで結果を確認してみましょう。
                    </p>
                    <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                        <Link href={`/${lang}/tools/markdown-preview`} className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            👉 マークダウンプレビューツールを試す
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            左側に入力すると、右側で瞬時に変換されます。登録不要ですぐに使えます。
                        </p>
                    </div>

                    <h2>なぜマークダウンを使うのか？</h2>
                    <ul>
                        <li><strong>速い：</strong> キーボードから手を離さずに書式設定ができます。</li>
                        <li><strong>汎用性：</strong> どのテキストエディタでも開くことができます。</li>
                        <li><strong>プラットフォームに依存しない：</strong> あらゆるOSのあらゆるデバイスで作成・編集可能です。</li>
                    </ul>
                </>
            )}
        </article>
    );
}
