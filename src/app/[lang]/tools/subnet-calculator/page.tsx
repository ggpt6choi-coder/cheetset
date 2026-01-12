import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SubnetCalculatorClient from './SubnetCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';
import RichContentSection from '@/components/tools/RichContentSection';
import { constructMetadata } from "@/utils/seo";

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return constructMetadata({
        title: dict.tools.subnet_calculator.title,
        description: dict.tools.subnet_calculator.description,
        path: '/tools/subnet-calculator',
        lang,
        keywords: dict.tools.subnet_calculator.keywords || [], // Fallback if keywords property is not guaranteed
    });
}

export default async function SubnetCalculatorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SubnetCalculatorClient
                labels={{
                    title: dict.tools.subnet_calculator.title,
                    description: dict.tools.subnet_calculator.description,
                    ip_label: dict.tools.subnet_calculator.ip_label,
                    cidr_label: dict.tools.subnet_calculator.cidr_label,
                    calculate_button: dict.tools.subnet_calculator.calculate_button,
                    result_network: dict.tools.subnet_calculator.result_network,
                    result_broadcast: dict.tools.subnet_calculator.result_broadcast,
                    result_netmask: dict.tools.subnet_calculator.result_netmask,
                    result_first_ip: dict.tools.subnet_calculator.result_first_ip,
                    result_last_ip: dict.tools.subnet_calculator.result_last_ip,
                    result_hosts: dict.tools.subnet_calculator.result_hosts,
                    result_binary_ip: dict.tools.subnet_calculator.result_binary_ip,
                    result_binary_mask: dict.tools.subnet_calculator.result_binary_mask,
                    error_invalid_ip: dict.tools.subnet_calculator.error_invalid_ip,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <div className="prose prose-indigo dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold mb-4">
                        {dict.tools.subnet_calculator.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                        {dict.tools.subnet_calculator.seo_content}
                    </p>

                    <RichContentSection content={dict.tools.subnet_calculator} />
                </div>
            </div>

            <ToolJsonLd
                name={dict.tools.subnet_calculator.title}
                description={dict.tools.subnet_calculator.description}
                url={`https://cheetset.com/${lang}/tools/subnet-calculator`}
            />
        </div>
    );
}
