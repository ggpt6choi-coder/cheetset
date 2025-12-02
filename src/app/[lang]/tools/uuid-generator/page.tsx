import { getDictionary } from '@/dictionaries/get-dictionary';
import { Metadata } from 'next';
import UUIDGeneratorClient from './UUIDGeneratorClient';

type Locale = 'en' | 'ko' | 'ja';

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return {
        title: `${dict.tools.uuid_generator.title} - ${dict.common.title}`,
        description: dict.tools.uuid_generator.description,
        openGraph: {
            title: `${dict.tools.uuid_generator.title} - ${dict.common.title}`,
            description: dict.tools.uuid_generator.description,
        },
    };
}

export default async function UUIDGeneratorPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <UUIDGeneratorClient
                labels={{
                    title: dict.tools.uuid_generator.title,
                    description: dict.tools.uuid_generator.description,
                    subtitle: dict.tools.uuid_generator.subtitle,
                    generate: dict.tools.uuid_generator.generate,
                    copy: dict.tools.uuid_generator.copy,
                    copy_all: dict.tools.uuid_generator.copy_all,
                    quantity: dict.tools.uuid_generator.quantity,
                    copied: dict.tools.uuid_generator.copied,
                    all_copied: dict.tools.uuid_generator.all_copied,
                    clear: dict.tools.uuid_generator.clear,
                }}
            />

            {/* SEO Content */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <article className="prose prose-indigo dark:prose-invert mx-auto">
                    <h2>{dict.tools.uuid_generator.title}</h2>
                    <p>{dict.tools.uuid_generator.seo_content}</p>
                </article>
            </div>
        </div>
    );
}
