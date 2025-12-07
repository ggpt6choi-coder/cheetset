import React from 'react';
import Link from 'next/link';

type Props = {
    lang: string;
};

export default function PdfMergeGuide({ lang }: Props) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <article className="prose dark:prose-invert lg:prose-xl mx-auto">
                {lang === 'ko' && (
                    <>
                        <h1>무료로 PDF 합치기: 프로그램 설치 없이 3초 만에 끝내는 법</h1>
                        <p className="lead">여러 개의 PDF 파일을 하나로 합쳐야 하는데, 유료 프로그램을 설치하기는 싫으신가요? 브라우저에서 바로 실행되는 무료 PDF 병합 도구로 3초 만에 해결하는 방법을 알려드립니다.</p>

                        <h2>PDF 합치기가 필요한 순간</h2>
                        <p>직장인이나 학생이라면 이런 상황을 자주 겪습니다.</p>
                        <ul>
                            <li>여러 개의 보고서 파일을 하나로 제출해야 할 때</li>
                            <li>스캔한 문서들이 낱장으로 흩어져 있을 때</li>
                            <li>포트폴리오를 하나의 파일로 정리하고 싶을 때</li>
                        </ul>
                        <p>하지만 Adobe Acrobat 같은 유료 프로그램을 구독하기엔 부담스럽고, 알 수 없는 프로그램을 설치하자니 바이러스가 걱정됩니다. 이럴 때 가장 좋은 방법은 <strong>설치 없이 브라우저에서 바로 작동하는 웹 도구</strong>를 사용하는 것입니다.</p>

                        <h2>Cheetset PDF 병합 도구의 장점</h2>
                        <p>저희가 제공하는 <Link href="/ko/tools/merge-pdf">PDF 합치기 도구</Link>는 다음과 같은 강력한 장점이 있습니다.</p>
                        <ol>
                            <li><strong>100% 무료</strong>: 회원가입이나 결제가 전혀 필요 없습니다.</li>
                            <li><strong>설치 불필요</strong>: 크롬, 사파리 등 브라우저만 있으면 어디서든 사용 가능합니다.</li>
                            <li><strong>강력한 보안</strong>: 파일이 서버로 전송되지 않고, <strong>사용자의 브라우저 내부(Client-side)에서만 처리</strong>됩니다. 즉, 중요한 문서가 유출될 걱정이 전혀 없습니다.</li>
                            <li><strong>무제한 사용</strong>: 파일 개수나 용량 제한 없이 자유롭게 합칠 수 있습니다.</li>
                        </ol>

                        <h2>사용 방법 (3단계)</h2>
                        <p>아주 간단합니다. 따라해 보세요!</p>
                        <h3>1. 도구 접속하기</h3>
                        <p><Link href="/ko/tools/merge-pdf">PDF 합치기 도구 페이지</Link>로 이동합니다.</p>

                        <h3>2. 파일 업로드</h3>
                        <p>'파일 선택' 버튼을 누르거나, 합치고 싶은 PDF 파일들을 드래그 앤 드롭으로 끌어다 놓습니다. 한 번에 여러 개를 선택할 수 있습니다.</p>

                        <h3>3. 순서 변경 및 합치기</h3>
                        <p>업로드된 파일 목록이 보이면, 마우스로 드래그하여 순서를 원하는 대로 바꿀 수 있습니다. 순서가 정해졌다면 <strong>'PDF 합치기'</strong> 버튼을 누르세요. 1초 만에 병합된 파일이 다운로드됩니다.</p>

                        <h2>마치며</h2>
                        <p>이제 복잡한 프로그램 설치 때문에 스트레스 받지 마세요. Cheetset의 무료 도구로 언제 어디서나 간편하게 PDF를 관리하세요. 도움이 되셨다면 주변 동료들에게도 공유해 주세요!</p>

                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <p className="font-bold mb-2">💡 꿀팁</p>
                            <p>PDF를 합친 후 특정 페이지만 다시 나누고 싶다면? <Link href="/ko/tools/split-pdf">PDF 나누기 도구</Link>를 사용해 보세요!</p>
                        </div>
                    </>
                )}
                {lang === 'en' && (
                    <>
                        <h1>How to Merge PDF Files for Free: No Installation Required</h1>
                        <p className="lead">Need to combine multiple PDF files into one but don't want to install expensive software? Learn how to merge PDFs in 3 seconds using our free, browser-based tool.</p>

                        <h2>When You Need to Merge PDFs</h2>
                        <p>Whether you are a student or a professional, you often face these situations:</p>
                        <ul>
                            <li>Submitting multiple report files as a single document</li>
                            <li>Organizing scattered scanned pages</li>
                            <li>Combining portfolio pieces into one file</li>
                        </ul>
                        <p>Subscriptions to software like Adobe Acrobat can be expensive, and installing unknown software poses security risks. The best solution is to use a <strong>web tool that works directly in your browser without installation</strong>.</p>

                        <h2>Why Use Cheetset PDF Merger?</h2>
                        <p>Our <Link href="/en/tools/merge-pdf">Merge PDF Tool</Link> offers these powerful benefits:</p>
                        <ol>
                            <li><strong>100% Free</strong>: No sign-up or payment required.</li>
                            <li><strong>No Installation</strong>: Works on Chrome, Safari, or any modern browser.</li>
                            <li><strong>Secure & Private</strong>: Files are processed <strong>locally in your browser (Client-side)</strong> and are never uploaded to our servers. Your documents remain private.</li>
                            <li><strong>Unlimited Use</strong>: No limits on the number of files or size.</li>
                        </ol>

                        <h2>How to Use (3 Steps)</h2>
                        <p>It's incredibly simple. Follow these steps!</p>
                        <h3>1. Go to the Tool</h3>
                        <p>Visit the <Link href="/en/tools/merge-pdf">Merge PDF Tool page</Link>.</p>

                        <h3>2. Upload Files</h3>
                        <p>Click 'Select Files' or drag and drop the PDF files you want to merge. You can select multiple files at once.</p>

                        <h3>3. Reorder and Merge</h3>
                        <p>Once uploaded, you can drag and drop the files to reorder them. When you're ready, click the <strong>'Merge PDF'</strong> button. Your merged file will be ready to download instantly.</p>

                        <h2>Conclusion</h2>
                        <p>Stop stressing over complex software installations. Manage your PDFs easily anytime, anywhere with Cheetset's free tools. If you found this helpful, please share it with your colleagues!</p>

                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <p className="font-bold mb-2">💡 Pro Tip</p>
                            <p>Need to extract specific pages after merging? Try our <Link href="/en/tools/split-pdf">Split PDF Tool</Link>!</p>
                        </div>
                    </>
                )}
                {lang === 'ja' && (
                    <>
                        <h1>無料でPDFを結合する方法：インストール不要で3秒で完了</h1>
                        <p className="lead">複数のPDFファイルを1つにまとめたいけれど、有料ソフトは使いたくないですか？ブラウザ上で動作する無料のPDF結合ツールを使って、3秒で解決する方法を紹介します。</p>

                        <h2>PDF結合が必要な場面</h2>
                        <p>学生や社会人なら、こんな場面によく遭遇します。</p>
                        <ul>
                            <li>複数のレポートファイルを1つにまとめて提出するとき</li>
                            <li>バラバラにスキャンされた文書を整理したいとき</li>
                            <li>ポートフォリオを1つのファイルにまとめたいとき</li>
                        </ul>
                        <p>Adobe Acrobatのような有料ソフトは高価ですし、知らないソフトをインストールするのはウイルスが心配です。そんな時に最適なのが、<strong>インストール不要でブラウザ上で直接動作するWebツール</strong>です。</p>

                        <h2>Cheetset PDF結合ツールのメリット</h2>
                        <p>当サイトの<Link href="/ja/tools/merge-pdf">PDF結合ツール</Link>には、次のような強力なメリットがあります。</p>
                        <ol>
                            <li><strong>完全無料</strong>：会員登録や支払いは一切不要です。</li>
                            <li><strong>インストール不要</strong>：ChromeやSafariなど、ブラウザがあればどこでも使えます。</li>
                            <li><strong>強力なセキュリティ</strong>：ファイルはサーバーに送信されず、<strong>ユーザーのブラウザ内（クライアントサイド）でのみ処理</strong>されます。つまり、重要書類が流出する心配がありません。</li>
                            <li><strong>無制限</strong>：ファイル数や容量の制限なく自由に結合できます。</li>
                        </ol>

                        <h2>使い方（3ステップ）</h2>
                        <p>とても簡単です。試してみてください！</p>
                        <h3>1. ツールにアクセス</h3>
                        <p><Link href="/ja/tools/merge-pdf">PDF結合ツールのページ</Link>に移動します。</p>

                        <h3>2. ファイルをアップロード</h3>
                        <p>「ファイル選択」ボタンを押すか、結合したいPDFファイルをドラッグ＆ドロップします。一度に複数のファイルを選択できます。</p>

                        <h3>3. 順番変更と結合</h3>
                        <p>アップロードされたファイル一覧が表示されたら、マウスでドラッグして好きな順番に入れ替えることができます。準備ができたら<strong>「PDF結合」</strong>ボタンを押してください。一瞬で結合されたファイルがダウンロードされます。</p>

                        <h2>まとめ</h2>
                        <p>もう複雑なソフトのインストールで悩む必要はありません。Cheetsetの無料ツールで、いつでもどこでも手軽にPDFを管理しましょう。役に立ったら、ぜひ同僚にもシェアしてください！</p>

                        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <p className="font-bold mb-2">💡 ヒント</p>
                            <p>結合した後に特定のページだけ分割したいですか？<Link href="/ja/tools/split-pdf">PDF分割ツール</Link>を使ってみてください！</p>
                        </div>
                    </>
                )}
            </article>
        </div>
    );
}
