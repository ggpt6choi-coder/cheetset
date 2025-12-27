'use client';

import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function UserAgentGuide({ lang }: Props) {
    return (
        <article className="prose dark:prose-invert lg:prose-xl mx-auto">
            {lang === 'en' && (
                <>
                    <h1>What is a User Agent? Examples and Parsing Guide</h1>
                    <p className="lead">
                        Every time you visit a website, your browser sends a "greeting card" to the server. This greeting card is called the User Agent (UA) string. But what exactly is it, and why does it look so complicated?
                    </p>

                    <h2>Understanding the User Agent String</h2>
                    <p>
                        A User Agent is a line of text that identifies the software (browser), operating system, and device you are using.
                    </p>
                    <p>
                        <strong>Example:</strong><br />
                        <code>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36</code>
                    </p>

                    <h2>Why Do We Need It?</h2>
                    <ul>
                        <li><strong>Content Adaptation:</strong> Servers can serve different versions of a site (e.g., mobile vs. desktop) based on the UA.</li>
                        <li><strong>Analytics:</strong> Website owners use UA data to understand what devices their visitors are using.</li>
                        <li><strong>Debugging:</strong> Developers use it to troubleshoot browser-specific bugs.</li>
                    </ul>

                    <h2>How to Parse a User Agent</h2>
                    <p>
                        Reading a raw UA string is difficult because of its chaotic history and format. That's why we use parsers.
                    </p>

                    <h3>Check Your Own User Agent</h3>
                    <p>
                        Do you want to know what your browser is telling websites about you? Use our free tool to instantly decode your User Agent string.
                    </p>
                    <div className="my-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-100 dark:border-green-800">
                        <Link href={`/${lang}/tools/user-agent-parser`} className="text-xl font-bold text-green-600 dark:text-green-400 hover:underline">
                            👉 Check My User Agent
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            See your Browser name, Version, OS, CPU architecture, and Device type instantly.
                        </p>
                    </div>

                    <h2>Common User Agent Component</h2>
                    <ul>
                        <li><strong>Mozilla/5.0:</strong> A standard prefix for modern browsers (used for compatibility).</li>
                        <li><strong>Platform:</strong> Describes the OS (e.g., Windows NT 10.0, Macintosh, Linux).</li>
                        <li><strong>Engine:</strong> Returns the rendering engine (e.g., Gecko, AppleWebKit).</li>
                        <li><strong>Browser:</strong> The actual browser name and version (e.g., Chrome/90.0, Firefox/88.0).</li>
                    </ul>
                </>
            )}

            {lang === 'ko' && (
                <>
                    <h1>User Agent 완벽 정리: 브라우저와 기기 식별의 모든 것</h1>
                    <p className="lead">
                        웹사이트에 접속할 때마다 여러분의 브라우저는 서버에 일종의 "명함"을 건넵니다. 이 명함을 'User Agent(유저 에이전트)'라고 부릅니다. 도대체 이것이 무엇이고 왜 이렇게 복잡하게 생겼을까요?
                    </p>

                    <h2>User Agent 문자열의 이해</h2>
                    <p>
                        User Agent는 여러분이 사용 중인 소프트웨어(브라우저), 운영체제, 그리고 기기 정보를 식별하는 텍스트 한 줄입니다.
                    </p>
                    <p>
                        <strong>예시:</strong><br />
                        <code>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36</code>
                    </p>

                    <h2>왜 필요할까요?</h2>
                    <ul>
                        <li><strong>콘텐츠 최적화:</strong> 서버는 UA를 보고 모바일용 페이지를 보여줄지, PC용 페이지를 보여줄지 결정합니다.</li>
                        <li><strong>통계 분석:</strong> 웹사이트 운영자는 방문자들이 아이폰을 쓰는지, 윈도우를 쓰는지 파악할 수 있습니다.</li>
                        <li><strong>디버깅:</strong> 개발자들은 특정 브라우저에서만 발생하는 버그를 잡을 때 이 정보를 사용합니다.</li>
                    </ul>

                    <h2>User Agent 해석하기</h2>
                    <p>
                        날것 그대로의 UA 문자열은 역사적인 이유로 매우 복잡합니다. 그래서 보통은 '파서(Parser)'라는 도구를 사용해서 해석합니다.
                    </p>

                    <h3>내 브라우저 정보 확인하기</h3>
                    <p>
                        내 브라우저가 웹사이트에 어떤 정보를 보내고 있는지 궁금하신가요? 무료 도구를 사용하여 바로 확인해보세요.
                    </p>
                    <div className="my-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-100 dark:border-green-800">
                        <Link href={`/${lang}/tools/user-agent-parser`} className="text-xl font-bold text-green-600 dark:text-green-400 hover:underline">
                            👉 내 User Agent 분석하기
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            브라우저 이름, 버전, 운영체제, CPU, 기기 종류를 한눈에 확인하세요.
                        </p>
                    </div>

                    <h2>주요 구성 요소</h2>
                    <ul>
                        <li><strong>Mozilla/5.0:</strong> 현대 브라우저들이 호환성을 위해 관습적으로 붙이는 접두사입니다.</li>
                        <li><strong>Platform:</strong> 운영체제 정보입니다 (예: Windows NT 10.0, Macintosh 등).</li>
                        <li><strong>Engine:</strong> 렌더링 엔진 정보입니다 (예: AppleWebKit, Gecko).</li>
                        <li><strong>Browser:</strong> 실제 브라우저 이름과 버전입니다 (예: Chrome/90.0).</li>
                    </ul>
                </>
            )}

            {lang === 'ja' && (
                <>
                    <h1>ユーザーエージェントとは？仕組みと活用法を完全解説</h1>
                    <p className="lead">
                        ウェブサイトにアクセスするたびに、ブラウザはサーバーに「名刺」のようなものを渡しています。この名刺を「User Agent（ユーザーエージェント）」と呼びます。一体これは何で、なぜこんなに複雑なのでしょうか？
                    </p>

                    <h2>ユーザーエージェント文字列の理解</h2>
                    <p>
                        User Agentは、使用しているソフトウェア（ブラウザ）、オペレーティングシステム、およびデバイス情報を識別するテキスト一行です。
                    </p>
                    <p>
                        <strong>例:</strong><br />
                        <code>Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36</code>
                    </p>

                    <h2>なぜ必要なのか？</h2>
                    <ul>
                        <li><strong>コンテンツの最適化：</strong> サーバーはUAを見て、モバイル用ページを表示するかPC用ページを表示するかを決定します。</li>
                        <li><strong>アクセス解析：</strong> ウェブサイト運営者は、訪問者がどのデバイスを使用しているかを把握するためにUAデータを使用します。</li>
                        <li><strong>デバッグ：</strong> 開発者は、特定のブラウザでのみ発生するバグを特定するためにこの情報を使用します。</li>
                    </ul>

                    <h2>ユーザーエージェントを解析する方法</h2>
                    <p>
                        生のUA文字列は、歴史的な理由から非常に複雑で読みづらいです。そのため、通常は「パーサー（Parser）」と呼ばれるツールを使用して解析します。
                    </p>

                    <h3>自分のブラウザ情報を確認する</h3>
                    <p>
                        あなたのブラウザがウェブサイトにどのような情報を送信しているか気になりませんか？無料ツールを使ってすぐに確認してみましょう。
                    </p>
                    <div className="my-8 p-6 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-100 dark:border-green-800">
                        <Link href={`/${lang}/tools/user-agent-parser`} className="text-xl font-bold text-green-600 dark:text-green-400 hover:underline">
                            👉 自分のユーザーエージェントを解析する
                        </Link>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            ブラウザ名、バージョン、OS、CPU、デバイスの種類を一目で確認できます。
                        </p>
                    </div>

                    <h2>主な構成要素</h2>
                    <ul>
                        <li><strong>Mozilla/5.0:</strong> 現代のブラウザが互換性のために慣習的に付ける接頭辞です。</li>
                        <li><strong>Platform:</strong> OS情報です（例：Windows NT 10.0、Macintoshなど）。</li>
                        <li><strong>Engine:</strong> レンダリングエンジン情報です（例：AppleWebKit、Gecko）。</li>
                        <li><strong>Browser:</strong> 実際のブラウザ名とバージョンです（例：Chrome/90.0）。</li>
                    </ul>
                </>
            )}
        </article>
    );
}
