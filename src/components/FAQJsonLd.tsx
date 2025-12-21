
import JsonLd from './JsonLd';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQJsonLdProps {
    faqs: FAQItem[];
}

export default function FAQJsonLd({ faqs }: FAQJsonLdProps) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };

    return <JsonLd data={data} />;
}
