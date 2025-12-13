import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CurlConverterClient from './CurlConverterClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.curl_converter.title} - ${dict.common.title}`,
        description: dict.tools.curl_converter.description,
    };
}

export default async function CurlConverterPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CurlConverterClient
                labels={{
                    title: dict.tools.curl_converter.title,
                    description: dict.tools.curl_converter.description,
                    input_label: dict.tools.curl_converter.input_label,
                    input_placeholder: dict.tools.curl_converter.input_placeholder,
                    output_label: dict.tools.curl_converter.output_label,
                    copy_button: dict.tools.curl_converter.copy_button,
                    copied: dict.tools.curl_converter.copied,
                    error_invalid_curl: dict.tools.curl_converter.error_invalid_curl,
                    lang_python: dict.tools.curl_converter.lang_python,
                    lang_javascript: dict.tools.curl_converter.lang_javascript,
                    lang_node: dict.tools.curl_converter.lang_node,
                    lang_go: dict.tools.curl_converter.lang_go,
                    lang_php: dict.tools.curl_converter.lang_php,
                    examples_label: dict.tools.curl_converter.examples_label,
                    example_get: dict.tools.curl_converter.example_get,
                    example_post: dict.tools.curl_converter.example_post,
                    example_auth: dict.tools.curl_converter.example_auth,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2>{dict.tools.curl_converter.title}</h2>
                    <p>{dict.tools.curl_converter.seo_content}</p>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? 'cURL이란 무엇인가요?' :
                                    lang === 'ja' ? 'cURLとは何ですか？' :
                                        'What is cURL?'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {lang === 'ko' ?
                                    'cURL(Client URL)은 다양한 프로토콜을 사용하여 데이터를 전송하기 위한 명령줄 도구 및 라이브러리입니다. 개발자들은 주로 API를 테스트하거나 서버와 통신할 때 cURL을 사용합니다. 이 도구를 사용하면 복잡한 cURL 명령어를 Python, JavaScript 등 실제 프로젝트에서 사용할 수 있는 코드로 쉽게 변환할 수 있습니다.' :
                                    lang === 'ja' ?
                                        'cURL（Client URL）は、さまざまなプロトコルを使用してデータを転送するためのコマンドラインツールおよびライブラリです。開発者は主にAPIをテストしたり、サーバーと通信したりするときにcURLを使用します。このツールを使用すると、複雑なcURLコマンドをPython、JavaScriptなど、実際のプロジェクトで使用できるコードに簡単に変換できます。' :
                                        'cURL (Client URL) is a command-line tool and library for transferring data with URLs. Developers often use cURL to test APIs or communicate with servers. This tool allows you to easily convert complex cURL commands into code that can be used in real projects, such as Python or JavaScript.'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? 'API 테스팅 팁' :
                                    lang === 'ja' ? 'APIテストのヒント' :
                                        'API Testing Tips'}
                            </h3>
                            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
                                {lang === 'ko' ? (
                                    <>
                                        <li><strong>헤더 확인:</strong> Content-Type, Authorization 등 필수 헤더가 포함되었는지 확인하세요.</li>
                                        <li><strong>메서드 확인:</strong> GET, POST, PUT, DELETE 등 올바른 HTTP 메서드를 사용하고 있는지 확인하세요.</li>
                                        <li><strong>보안:</strong> API 키나 비밀번호가 포함된 코드를 공유할 때는 주의하세요.</li>
                                    </>
                                ) : lang === 'ja' ? (
                                    <>
                                        <li><strong>ヘッダーの確認:</strong> Content-Type、Authorizationなどの必須ヘッダーが含まれているか確認してください。</li>
                                        <li><strong>メソッドの確認:</strong> GET、POST、PUT、DELETEなど、正しいHTTPメソッドを使用しているか確認してください。</li>
                                        <li><strong>セキュリティ:</strong> APIキーやパスワードが含まれるコードを共有する際は注意してください。</li>
                                    </>
                                ) : (
                                    <>
                                        <li><strong>Check Headers:</strong> Ensure required headers like Content-Type and Authorization are included.</li>
                                        <li><strong>Check Methods:</strong> Verify you are using the correct HTTP method (GET, POST, PUT, DELETE).</li>
                                        <li><strong>Security:</strong> Be careful when sharing code that contains API keys or passwords.</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.curl_converter.title}
                description={dict.tools.curl_converter.description}
                url={`https://cheetset.com/${lang}/tools/curl-converter`}
            />
        </div>
    );
}
