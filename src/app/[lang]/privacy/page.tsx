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
        title: `${dict.nav.privacy} - ${dict.common.title}`,
    };
}

export default async function PrivacyPage({ params }: Props) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {dict.nav.privacy}
            </h1>

            <div className="prose dark:prose-invert max-w-none">
                <p>{dict.privacy.last_updated}</p>

                <h2>{dict.privacy.intro_title}</h2>
                <p>{dict.privacy.intro_content}</p>

                <h2>{dict.privacy.data_collection_title}</h2>
                <p>{dict.privacy.data_collection_content}</p>

                <h3>{dict.privacy.cookies_title}</h3>
                <p>{dict.privacy.cookies_content}</p>

                <h2>{dict.privacy.adsense_title}</h2>
                <p>{dict.privacy.adsense_content_1}</p>
                <p>
                    {dict.privacy.adsense_content_2}
                </p>

                <h2>{dict.privacy.security_title}</h2>
                <p dangerouslySetInnerHTML={{ __html: dict.privacy.security_content }} />

                <h2>{dict.privacy.contact_title}</h2>
                <p>{dict.privacy.contact_content}</p>
            </div>
        </div>
    );
}
