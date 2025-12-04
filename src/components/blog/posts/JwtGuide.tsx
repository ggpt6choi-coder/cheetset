import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function JwtGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>JWT(JSON Web Token) 완벽 가이드: 구조, 보안, 그리고 사용 사례</h1>
                        <p className="lead">
                            현대 웹 애플리케이션에서 가장 널리 사용되는 인증 방식인 JWT. 도대체 왜 쓰는 걸까요?
                            이 글에서는 JWT의 구조부터 보안 모범 사례까지 개발자가 알아야 할 모든 것을 다룹니다.
                        </p>

                        <h2>JWT란 무엇인가요?</h2>
                        <p>
                            JWT(JSON Web Token)는 당사자 간에 정보를 JSON 개체로 안전하게 전송하기 위한 컴팩트하고 독립적인 방식을 정의하는 개방형 표준(RFC 7519)입니다.
                            이 정보는 디지털 서명되어 있으므로 확인하고 신뢰할 수 있습니다.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8 not-prose border border-blue-100 dark:border-blue-800">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">💡 직접 확인해보세요!</h3>
                            <p className="text-blue-800 dark:text-blue-200 mb-4">
                                이론만으로는 이해하기 어렵습니다. 치트셋의 <strong>JWT 디코더</strong>를 사용하여 실제 토큰을 분석해보세요.
                            </p>
                            <Link
                                href="/ko/tools/jwt-decoder"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                            >
                                JWT 디코더 바로가기 →
                            </Link>
                        </div>

                        <h2>JWT의 구조</h2>
                        <p>JWT는 점(.)으로 구분된 세 부분으로 구성됩니다.</p>
                        <ul>
                            <li><strong>Header (헤더)</strong>: 토큰 유형(JWT)과 해싱 알고리즘(예: HMAC SHA256) 정보</li>
                            <li><strong>Payload (페이로드)</strong>: 클레임(Claims)이라고 불리는 실제 데이터 (사용자 ID, 만료 시간 등)</li>
                            <li><strong>Signature (서명)</strong>: 토큰이 변조되지 않았음을 증명하는 암호화된 문자열</li>
                        </ul>

                        <h3>1. Header</h3>
                        <pre><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>

                        <h3>2. Payload</h3>
                        <p>페이로드에는 <strong>Registered claims</strong>(표준), <strong>Public claims</strong>, <strong>Private claims</strong>가 포함될 수 있습니다.</p>
                        <pre><code>{`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}</code></pre>

                        <h3>3. Signature</h3>
                        <p>서명은 헤더의 인코딩 값, 페이로드의 인코딩 값, 그리고 <strong>비밀 키(Secret Key)</strong>를 조합하여 생성됩니다.</p>

                        <h2>언제 JWT를 사용해야 할까요?</h2>
                        <ul>
                            <li><strong>인증 (Authentication)</strong>: 사용자가 로그인하면 이후의 모든 요청에 JWT가 포함됩니다. 서버는 세션을 유지할 필요 없이 토큰만 검증하면 되므로 확장성(Scalability)이 뛰어납니다.</li>
                            <li><strong>정보 교환 (Information Exchange)</strong>: 공개/개인 키 쌍을 사용하여 서명할 수 있으므로 보낸 사람을 확인할 수 있습니다.</li>
                        </ul>

                        <h2>보안 주의사항</h2>
                        <ol>
                            <li><strong>민감한 정보 제외</strong>: 페이로드는 누구나 디코딩하여 볼 수 있습니다. 비밀번호나 주민등록번호 같은 민감한 정보는 절대 넣지 마세요.</li>
                            <li><strong>HTTPS 사용</strong>: 토큰 탈취를 방지하기 위해 반드시 SSL/TLS 암호화 통신을 사용해야 합니다.</li>
                            <li><strong>짧은 만료 시간</strong>: 토큰이 탈취되더라도 피해를 최소화하기 위해 만료 시간(exp)을 짧게 설정하고, Refresh Token 전략을 사용하세요.</li>
                        </ol>

                        <h2>결론</h2>
                        <p>
                            JWT는 현대 웹 개발, 특히 마이크로서비스 아키텍처와 SPA(Single Page Application)에서 필수적인 기술입니다.
                            구조를 정확히 이해하고 보안 수칙을 준수한다면 안전하고 효율적인 인증 시스템을 구축할 수 있습니다.
                        </p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>JWT (JSON Web Token) Complete Guide: Structure, Security, and Use Cases</h1>
                        <p className="lead">
                            JWT is the most widely used authentication method in modern web applications. But why do we use it?
                            This article covers everything developers need to know, from JWT structure to security best practices.
                        </p>

                        <h2>What is JWT?</h2>
                        <p>
                            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
                            This information can be verified and trusted because it is digitally signed.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8 not-prose border border-blue-100 dark:border-blue-800">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">💡 Try it yourself!</h3>
                            <p className="text-blue-800 dark:text-blue-200 mb-4">
                                Theory is not enough. Analyze real tokens using Cheetset's <strong>JWT Decoder</strong>.
                            </p>
                            <Link
                                href="/en/tools/jwt-decoder"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                            >
                                Go to JWT Decoder →
                            </Link>
                        </div>

                        <h2>Structure of JWT</h2>
                        <p>JWT consists of three parts separated by dots (.):</p>
                        <ul>
                            <li><strong>Header</strong>: Token type (JWT) and hashing algorithm (e.g., HMAC SHA256)</li>
                            <li><strong>Payload</strong>: Actual data called Claims (User ID, Expiration time, etc.)</li>
                            <li><strong>Signature</strong>: Encrypted string proving the token hasn't been tampered with</li>
                        </ul>

                        {/* ... (Code blocks similar to KO version) ... */}
                        <h3>1. Header</h3>
                        <pre><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>

                        <h3>2. Payload</h3>
                        <pre><code>{`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}</code></pre>

                        <h2>When should you use JWT?</h2>
                        <ul>
                            <li><strong>Authentication</strong>: Once the user is logged in, each subsequent request will include the JWT. The server doesn't need to maintain sessions, offering great scalability.</li>
                            <li><strong>Information Exchange</strong>: Since they can be signed using public/private key pairs, you can be sure the senders are who they say they are.</li>
                        </ul>

                        <h2>Security Best Practices</h2>
                        <ol>
                            <li><strong>No Sensitive Data</strong>: The payload can be decoded by anyone. Never put passwords or social security numbers in it.</li>
                            <li><strong>Use HTTPS</strong>: Always use SSL/TLS to prevent token interception.</li>
                            <li><strong>Short Expiration</strong>: Set a short expiration time (exp) and use a Refresh Token strategy to minimize damage if a token is stolen.</li>
                        </ol>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>JWT（JSON Web Token）完全ガイド：構造、セキュリティ、使用事例</h1>
                        <p className="lead">
                            現代のWebアプリケーションで最も広く使用されている認証方式であるJWT。一体なぜ使われるのでしょうか？
                            この記事では、JWTの構造からセキュリティのベストプラクティスまで、開発者が知っておくべきすべてを扱います。
                        </p>

                        <h2>JWTとは何ですか？</h2>
                        <p>
                            JSON Web Token（JWT）は、当事者間で情報をJSONオブジェクトとして安全に送信するためのコンパクトで自己完結型の方法を定義するオープン標準（RFC 7519）です。
                            この情報はデジタル署名されているため、検証して信頼することができます。
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl my-8 not-prose border border-blue-100 dark:border-blue-800">
                            <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">💡 自分で確認してみてください！</h3>
                            <p className="text-blue-800 dark:text-blue-200 mb-4">
                                理論だけでは理解しにくいです。Cheetsetの<strong>JWTデコーダー</strong>を使用して、実際のトークンを分析してみてください。
                            </p>
                            <Link
                                href="/ja/tools/jwt-decoder"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                            >
                                JWTデコーダーへ移動 →
                            </Link>
                        </div>

                        <h2>JWTの構造</h2>
                        <p>JWTはドット（.）で区切られた3つの部分で構成されます。</p>
                        <ul>
                            <li><strong>Header（ヘッダー）</strong>：トークンタイプ（JWT）とハッシュアルゴリズム（例：HMAC SHA256）情報</li>
                            <li><strong>Payload（ペイロード）</strong>：クレーム（Claims）と呼ばれる実際のデータ（ユーザーID、有効期限など）</li>
                            <li><strong>Signature（署名）</strong>：トークンが改ざんされていないことを証明する暗号化された文字列</li>
                        </ul>

                        {/* ... (Code blocks) ... */}
                        <h3>1. Header</h3>
                        <pre><code>{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code></pre>

                        <h3>2. Payload</h3>
                        <pre><code>{`{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}`}</code></pre>

                        <h2>いつJWTを使用すべきですか？</h2>
                        <ul>
                            <li><strong>認証（Authentication）</strong>：ユーザーがログインすると、以降のすべてのリクエストにJWTが含まれます。サーバーはセッションを維持する必要がなく、トークンを検証するだけなので、スケーラビリティ（拡張性）に優れています。</li>
                            <li><strong>情報交換（Information Exchange）</strong>：公開鍵/秘密鍵のペアを使用して署名できるため、送信者を確認できます。</li>
                        </ul>

                        <h2>セキュリティ上の注意点</h2>
                        <ol>
                            <li><strong>機密情報を除外する</strong>：ペイロードは誰でもデコードして見ることができます。パスワードや個人識別番号などの機密情報は絶対に入れないでください。</li>
                            <li><strong>HTTPSを使用する</strong>：トークンの盗聴を防ぐために、必ずSSL/TLS暗号化通信を使用してください。</li>
                            <li><strong>短い有効期限</strong>：トークンが盗まれた場合の被害を最小限に抑えるために、有効期限（exp）を短く設定し、リフレッシュトークン戦略を使用してください。</li>
                        </ol>
                    </>
                )}
            </article>
        </div>
    );
}
