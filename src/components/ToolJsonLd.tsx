
import JsonLd from './JsonLd';

interface ToolJsonLdProps {
    name: string;
    description: string;
    url: string;
    author?: string;
    applicationCategory?: string;
    operatingSystem?: string;
    price?: string;
    currency?: string;
}

export default function ToolJsonLd({
    name,
    description,
    url,
    author = 'CheetSet',
    applicationCategory = 'UtilityApplication',
    operatingSystem = 'Any',
    price = '0',
    currency = 'USD'
}: ToolJsonLdProps) {
    const data = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: name,
        description: description,
        url: url,
        applicationCategory: applicationCategory,
        operatingSystem: operatingSystem,
        author: {
            '@type': 'Organization',
            name: author,
            url: 'https://cheetset.com'
        },
        offers: {
            '@type': 'Offer',
            price: price,
            priceCurrency: currency
        }
    };

    return <JsonLd data={data} />;
}
