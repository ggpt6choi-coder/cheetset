import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import SubnetCalculatorClient from './SubnetCalculatorClient';
import ToolJsonLd from '@/components/ToolJsonLd';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.subnet_calculator.title} - ${dict.common.title}`,
        description: dict.tools.subnet_calculator.description,
    };
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
                    <h2>{dict.tools.subnet_calculator.title}</h2>
                    <p>{dict.tools.subnet_calculator.seo_content}</p>

                    <div className="mt-8 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? 'CIDR 표기법이란?' :
                                    lang === 'ja' ? 'CIDR表記とは？' :
                                        'What is CIDR Notation?'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {lang === 'ko' ?
                                    'CIDR(Classless Inter-Domain Routing)은 IP 주소 할당 및 라우팅을 위한 방법입니다. 기존의 클래스 기반 주소 지정 방식(Class A, B, C)보다 유연하게 IP 주소를 관리할 수 있습니다. 예를 들어, /24는 256개의 IP 주소(254개의 가용 호스트)를 의미합니다.' :
                                    lang === 'ja' ?
                                        'CIDR（Classless Inter-Domain Routing）は、IPアドレスの割り当てとルーティングのための方法です。従来のクラスベースのアドレス指定方式（クラスA、B、C）よりも柔軟にIPアドレスを管理できます。例えば、/24は256個のIPアドレス（254個の使用可能なホスト）を意味します。' :
                                        'CIDR (Classless Inter-Domain Routing) is a method for allocating IP addresses and IP routing. It allows for more flexible management of IP addresses compared to the traditional class-based addressing (Class A, B, C). For example, /24 means 256 IP addresses (254 usable hosts).'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                {lang === 'ko' ? '서브넷 마스크 계산법' :
                                    lang === 'ja' ? 'サブネットマスクの計算方法' :
                                        'How to Calculate Subnet Mask'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {lang === 'ko' ?
                                    '서브넷 마스크는 IP 주소의 어느 부분이 네트워크 주소이고 어느 부분이 호스트 주소인지를 구분하는 데 사용됩니다. 32비트 숫자로, 네트워크 부분은 1로, 호스트 부분은 0으로 표시됩니다.' :
                                    lang === 'ja' ?
                                        'サブネットマスクは、IPアドレスのどの部分がネットワークアドレスで、どの部分がホストアドレスであるかを区別するために使用されます。32ビットの数値で、ネットワーク部分は1、ホスト部分は0で表されます。' :
                                        'A subnet mask is used to distinguish which part of an IP address is the network address and which part is the host address. It is a 32-bit number where the network part is represented by 1s and the host part by 0s.'}
                            </p>
                        </div>
                    </div>
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
