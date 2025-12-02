import React from 'react';

type Props = {
    lang: string;
};

export default function Base64EncodingGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>Base64 인코딩 완전 정복: 개발자를 위한 사용 가이드</h1>
                        <p className="lead">Base64가 뭔가요? 왜 이미지를 텍스트로 바꾸나요? 개발하다 보면 자주 마주치는 Base64 인코딩의 모든 것을 쉽게 설명합니다.</p>

                        <h2>1. Base64란 무엇인가?</h2>
                        <p><strong>Base64</strong>는 바이너리 데이터(이미지, 파일 등)를 <strong>텍스트 형태</strong>로 변환하는 인코딩 방식입니다. 64개의 안전한 문자(A-Z, a-z, 0-9, +, /)만 사용하여 데이터를 표현합니다.</p>

                        <h3>예시:</h3>
                        <p>원본 텍스트: <code>Hello</code></p>
                        <p>Base64 인코딩: <code>SGVsbG8=</code></p>

                        <h2>2. 왜 Base64를 사용할까?</h2>
                        <h3>이유 #1: 이메일 전송</h3>
                        <p>이메일은 텍스트만 전송할 수 있습니다. 이미지 첨부 파일은 Base64로 변환되어 전송됩니다.</p>

                        <h3>이유 #2: Data URI</h3>
                        <p>HTML/CSS에서 이미지를 직접 삽입할 때 Base64를 사용합니다.</p>
                        <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                        <h3>이유 #3: API 인증</h3>
                        <p>Basic Authentication에서 <code>username:password</code>를 Base64로 인코딩하여 전송합니다.</p>

                        <h2>3. Base64의 장단점</h2>
                        <h3>장점:</h3>
                        <ul>
                            <li>✅ 바이너리 데이터를 텍스트로 안전하게 전송</li>
                            <li>✅ 별도 파일 업로드 없이 HTML/CSS에 이미지 삽입 가능</li>
                            <li>✅ HTTP 요청 수 감소 (작은 아이콘들)</li>
                        </ul>

                        <h3>단점:</h3>
                        <ul>
                            <li>❌ 용량이 약 33% 증가합니다</li>
                            <li>❌ 큰 이미지는 적합하지 않음</li>
                            <li>❌ 브라우저 캐싱 불가</li>
                        </ul>

                        <h2>4. Base64 사용 사례</h2>
                        <h3>사례 1: 작은 아이콘 삽입</h3>
                        <p>웹사이트 로딩 속도를 높이기 위해 작은 아이콘(10KB 이하)을 Base64로 인코딩하여 CSS에 직접 삽입합니다.</p>

                        <h3>사례 2: JWT 토큰</h3>
                        <p>JSON Web Token은 Header와 Payload를 Base64로 인코딩합니다.</p>

                        <h3>사례 3: 이미지 미리보기</h3>
                        <p>파일 업로드 미리보기 기능에서 이미지를 Base64로 변환하여 즉시 보여줍니다.</p>

                        <h2>5. Base64 인코딩/디코딩 하는 방법</h2>
                        <h3>방법 1: JavaScript</h3>
                        <pre><code>// 인코딩
                            const encoded = btoa("Hello");  // "SGVsbG8="

                            // 디코딩  
                            const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                        <h3>방법 2: Python</h3>
                        <pre><code>import base64

                            # 인코딩
                            encoded = base64.b64encode(b"Hello")

                            # 디코딩
                            decoded = base64.b64decode(encoded)</code></pre>

                        <h3>방법 3: 온라인 도구 사용 (가장 간편!)</h3>
                        <p>코드 없이 클릭 한 번으로 변환하세요.</p>

                        <h2>6. Base64는 암호화가 아닙니다!</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                            <p className="font-bold text-red-800 dark:text-red-200">⚠️ 중요한 주의사항</p>
                            <p>Base64는 <strong>인코딩</strong>이지 <strong>암호화</strong>가 아닙니다. 누구나 쉽게 디코딩할 수 있으므로 비밀번호나 개인정보를 Base64로만 보호하면 안 됩니다!</p>
                        </div>

                        <h2>7. 언제 Base64를 사용하면 좋을까?</h2>
                        <ul>
                            <li>✅ 작은 이미지 (10KB 이하)</li>
                            <li>✅ 아이콘, 로고</li>
                            <li>✅ Data URI가 필요한 경우</li>
                            <li>✅ 이메일 첨부 파일</li>
                        </ul>

                        <h3>사용하지 말아야 할 경우:</h3>
                        <ul>
                            <li>❌ 큰 이미지 (100KB 이상)</li>
                            <li>❌ 보안이 필요한 데이터</li>
                            <li>❌ 자주 변경되는 이미지</li>
                        </ul>

                        <h2>마무리</h2>
                        <p>Base64는 개발자라면 반드시 알아야 할 기본 개념입니다. 언제 사용하고, 언제 사용하지 말아야 하는지만 제대로 알아도 웹 성능 최적화에 큰 도움이 됩니다.</p>
                        <p><strong>Cheetset</strong>이 여러분의 개발 여정을 응원합니다! 🚀</p>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>Base64 Encoding Explained: A Complete Guide for Developers</h1>
                        <p className="lead">What is Base64? Why convert images to text? Learn everything about this common encoding method used in web development.</p>

                        <h2>1. What is Base64?</h2>
                        <p><strong>Base64</strong> converts binary data (images, files) into <strong>text format</strong> using only 64 safe characters (A-Z, a-z, 0-9, +, /).</p>

                        <h3>Example:</h3>
                        <p>Original: <code>Hello</code></p>
                        <p>Base64: <code>SGVsbG8=</code></p>

                        <h2>2. Why Use Base64?</h2>
                        <h3>Reason #1: Email Attachments</h3>
                        <p>Emails only support text. Image attachments are Base64 encoded.</p>

                        <h3>Reason #2: Data URIs</h3>
                        <p>Embed images directly in HTML/CSS without separate files.</p>
                        <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                        <h3>Reason #3: API Authentication</h3>
                        <p>Basic Auth encodes <code>username:password</code> in Base64.</p>

                        <h2>3. Pros and Cons</h2>
                        <h3>Pros:</h3>
                        <ul>
                            <li>✅ Safely transmit binary as text</li>
                            <li>✅ Reduce HTTP requests (small icons)</li>
                            <li>✅ No file upload needed</li>
                        </ul>

                        <h3>Cons:</h3>
                        <ul>
                            <li>❌ ~33% size increase</li>
                            <li>❌ Not suitable for large images</li>
                            <li>❌ No browser caching</li>
                        </ul>

                        <h2>4. Common Use Cases</h2>
                        <h3>Case 1: Small Icons</h3>
                        <p>Embed tiny icons (&lt;10KB) in CSS to improve load speed.</p>

                        <h3>Case 2: JWT Tokens</h3>
                        <p>JSON Web Tokens encode Header and Payload in Base64.</p>

                        <h3>Case 3: Image Previews</h3>
                        <p>Show uploaded images instantly by converting to Base64.</p>

                        <h2>5. How to Encode/Decode</h2>
                        <h3>JavaScript:</h3>
                        <pre><code>// Encode
                            const encoded = btoa("Hello");  // "SGVsbG8="

                            // Decode  
                            const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                        <h3>Python:</h3>
                        <pre><code>import base64

                            # Encode
                            encoded = base64.b64encode(b"Hello")

                            # Decode
                            decoded = base64.b64decode(encoded)</code></pre>

                        <h2>6. Base64 is NOT Encryption!</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                            <p className="font-bold text-red-800 dark:text-red-200">⚠️ Important</p>
                            <p>Base64 is <strong>encoding</strong>, not <strong>encryption</strong>. Anyone can decode it. Never use Base64 alone to protect passwords or sensitive data!</p>
                        </div>

                        <h2>Conclusion</h2>
                        <p>Base64 is a fundamental concept every developer should know. Understanding when to use it (and when not to) will help you optimize web performance.</p>
                        <p><strong>Cheetset</strong> supports your coding journey! 🚀</p>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>Base64エンコーディング完全攻略：開発者のための使用ガイド</h1>
                        <p className="lead">Base64とは何ですか？なぜ画像をテキストに変換するのですか？開発中によく出会うBase64エンコーディングのすべてを分かりやすく説明します。</p>

                        <h2>1. Base64とは？</h2>
                        <p><strong>Base64</strong>はバイナリデータ（画像、ファイルなど）を<strong>テキスト形式</strong>に変換するエンコーディング方式です。64個の安全な文字（A-Z、a-z、0-9、+、/）だけを使用してデータを表現します。</p>

                        <h3>例：</h3>
                        <p>元のテキスト: <code>Hello</code></p>
                        <p>Base64エンコード: <code>SGVsbG8=</code></p>

                        <h2>2. なぜBase64を使うのか？</h2>
                        <h3>理由 #1: メール送信</h3>
                        <p>メールはテキストのみ送信できます。画像添付ファイルはBase64に変換されて送信されます。</p>

                        <h3>理由 #2: Data URI</h3>
                        <p>HTML/CSSで画像を直接挿入する際にBase64を使用します。</p>
                        <pre><code>&lt;img src="data:image/png;base64,iVBORw0KG..." /&gt;</code></pre>

                        <h3>理由 #3: API認証</h3>
                        <p>Basic Authenticationで<code>username:password</code>をBase64でエンコードして送信します。</p>

                        <h2>3. Base64の長所と短所</h2>
                        <h3>長所：</h3>
                        <ul>
                            <li>✅ バイナリデータをテキストとして安全に送信</li>
                            <li>✅ 別途ファイルアップロード不要でHTML/CSSに画像挿入可能</li>
                            <li>✅ HTTPリクエスト数削減（小さいアイコン）</li>
                        </ul>

                        <h3>短所：</h3>
                        <ul>
                            <li>❌ 容量が約33%増加</li>
                            <li>❌ 大きな画像には不向き</li>
                            <li>❌ ブラウザキャッシング不可</li>
                        </ul>

                        <h2>4. Base64使用例</h2>
                        <h3>例 1: 小さいアイコン挿入</h3>
                        <p>ウェブサイトの読み込み速度を上げるため、小さいアイコン（10KB以下）をBase64でエンコードしてCSSに直接挿入します。</p>

                        <h3>例 2: JWTトークン</h3>
                        <p>JSON Web TokenはHeaderとPayloadをBase64でエンコードします。</p>

                        <h3>例 3: 画像プレビュー</h3>
                        <p>ファイルアップロードプレビュー機能で画像をBase64に変換して即座に表示します。</p>

                        <h2>5. Base64エンコード/デコード方法</h2>
                        <h3>JavaScript:</h3>
                        <pre><code>// エンコード
                            const encoded = btoa("Hello");  // "SGVsbG8="

                            // デコード  
                            const decoded = atob("SGVsbG8=");  // "Hello"</code></pre>

                        <h3>Python:</h3>
                        <pre><code>import base64

                            # エンコード
                            encoded = base64.b64encode(b"Hello")

                            # デコード
                            decoded = base64.b64decode(encoded)</code></pre>

                        <h2>6. Base64は暗号化ではありません！</h2>
                        <div className="bg-red-50 dark:bg-red-900/30 p-6 rounded-lg my-6">
                            <p className="font-bold text-red-800 dark:text-red-200">⚠️ 重要な注意事項</p>
                            <p>Base64は<strong>エンコーディング</strong>であり、<strong>暗号化</strong>ではありません。誰でも簡単にデコードできるため、パスワードや個人情報をBase64だけで保護してはいけません！</p>
                        </div>

                        <h2>まとめ</h2>
                        <p>Base64は開発者なら必ず知っておくべき基本概念です。いつ使用し、いつ使用しないべきかを正しく理解するだけでも、Web性能最適化に大きく役立ちます。</p>
                        <p><strong>Cheetset</strong>があなたの開発の旅を応援します！🚀</p>
                    </>
                )}
            </article>
        </div>
    );
}
