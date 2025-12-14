import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import JsonDiffClient from './JsonDiffClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.json_diff.title} - ${dict.common.title}`,
        description: dict.tools.json_diff.description,
    };
}

export default async function JsonDiffPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <JsonDiffClient
                labels={{
                    title: dict.tools.json_diff.title,
                    description: dict.tools.json_diff.description,
                    original_label: dict.tools.json_diff.original_label,
                    modified_label: dict.tools.json_diff.modified_label,
                    compare_button: dict.tools.json_diff.compare_button,
                    result_label: dict.tools.json_diff.result_label,
                    error_invalid_json: dict.tools.json_diff.error_invalid_json,
                    no_diff: dict.tools.json_diff.no_diff,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2>{dict.tools.json_diff.title}</h2>
                    <p>{dict.tools.json_diff.seo_content}</p>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? 'JSON Diff 도구란?' :
                                    lang === 'ja' ? 'JSON Diffツールとは？' :
                                        'What is JSON Diff Tool?'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {lang === 'ko' ?
                                    'JSON Diff 도구는 두 개의 JSON 객체를 비교하여 차이점을 찾아내는 개발자용 유틸리티입니다. API 응답이 예상과 다를 때, 설정 파일이 변경되었을 때, 또는 두 데이터 세트를 비교해야 할 때 유용하게 사용할 수 있습니다. 추가된 부분은 초록색으로, 삭제된 부분은 빨간색으로 표시되어 한눈에 파악할 수 있습니다.' :
                                    lang === 'ja' ?
                                        'JSON Diffツールは、2つのJSONオブジェクトを比較して違いを見つける開発者用ユーティリティです。APIレスポンスが予想と異なる場合、設定ファイルが変更された場合、または2つのデータセットを比較する必要がある場合に役立ちます。追加された部分は緑色で、削除された部分は赤色で表示され、一目で把握できます。' :
                                        'The JSON Diff tool is a developer utility that compares two JSON objects to find differences. It is useful when API responses differ from expectations, configuration files change, or when you need to compare two datasets. Additions are highlighted in green, and deletions in red, making it easy to spot changes at a glance.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.json_diff.title}
                description={dict.tools.json_diff.description}
                url={`https://cheetset.com/${lang}/tools/json-diff`}
            />
        </div>
    );
}
