import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import CompoundInterestClient from './CompoundInterestClient';
import RelatedTools from '@/components/tools/RelatedTools';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.compound_interest.title} - ${dict.common.title}`,
        description: dict.tools.compound_interest.description,
        openGraph: {
            title: `${dict.tools.compound_interest.title} - ${dict.common.title}`,
            description: dict.tools.compound_interest.description,
        },
    };
}

export default async function CompoundInterestPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <CompoundInterestClient
                lang={lang}
                labels={{
                    title: dict.tools.compound_interest.title,
                    description: dict.tools.compound_interest.description,
                    subtitle: dict.tools.compound_interest.subtitle,
                    input_principal: dict.tools.compound_interest.input_principal,
                    input_monthly: dict.tools.compound_interest.input_monthly,
                    input_rate: dict.tools.compound_interest.input_rate,
                    input_years: dict.tools.compound_interest.input_years,
                    result_final: dict.tools.compound_interest.result_final,
                    result_principal: dict.tools.compound_interest.result_principal,
                    result_interest: dict.tools.compound_interest.result_interest,
                    chart_principal: dict.tools.compound_interest.chart_principal,
                    chart_interest: dict.tools.compound_interest.chart_interest,
                    table_year: dict.tools.compound_interest.table_year,
                    table_total: dict.tools.compound_interest.table_total,
                    table_interest: dict.tools.compound_interest.table_interest,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12 mt-16">
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.compound_interest.title}</h2>
                    <p>{dict.tools.compound_interest.seo_content}</p>
                </section>

                {/* How-to Guide */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.compound_interest.how_to_title}</h3>
                    <ol>
                        <li>{dict.tools.compound_interest.how_to_step1}</li>
                        <li>{dict.tools.compound_interest.how_to_step2}</li>
                        <li>{dict.tools.compound_interest.how_to_step3}</li>
                        <li>{dict.tools.compound_interest.how_to_step4}</li>
                    </ol>
                </section>

                {/* FAQ Section */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.compound_interest.faq_title}</h3>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{dict.tools.compound_interest.faq_1_q}</h4>
                            <p>{dict.tools.compound_interest.faq_1_a}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">{dict.tools.compound_interest.faq_2_q}</h4>
                            <p>{dict.tools.compound_interest.faq_2_a}</p>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="prose prose-indigo dark:prose-invert mx-auto">
                    <h3>{dict.tools.compound_interest.use_cases_title}</h3>
                    <ul>
                        <li>{dict.tools.compound_interest.use_case_1}</li>
                        <li>{dict.tools.compound_interest.use_case_2}</li>
                        <li>{dict.tools.compound_interest.use_case_3}</li>
                    </ul>
                </section>
            </div>

            <RelatedTools
                currentSlug="compound-interest"
                category="finance"
                lang={lang}
            />
            <ToolJsonLd
                name={dict.tools.compound_interest.title}
                description={dict.tools.compound_interest.description}
                url={`https://cheetset.com/${lang}/tools/compound-interest`}
            />
        </div>
    );
}
