import { getDictionary } from "@/dictionaries/get-dictionary";
import type { Metadata } from "next";

type Locale = "en" | "ko" | "ja";

type Props = {
    params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.terms.title} - ${dict.common.title}`,
    };
}

export default async function TermsPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {dict.terms.title}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
                <p>{dict.terms.last_updated}</p>

                <h2>{dict.terms.intro_title}</h2>
                <p>{dict.terms.intro_content}</p>

                <h2>{dict.terms.usage_title}</h2>
                <p>{dict.terms.usage_content}</p>

                <h2>{dict.terms.disclaimer_title}</h2>
                <p>{dict.terms.disclaimer_content}</p>

                <h2>{dict.terms.contact_title}</h2>
                <p>{dict.terms.contact_content}</p>
            </div>
        </div>
    );
}
