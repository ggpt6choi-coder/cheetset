import { ToolContent } from '@/types/Tool';

interface Props {
    content: ToolContent;
}

export default function RichContentSection({ content }: Props) {
    if (!content.guide && !content.faq) return null;

    const faqSchema = content.faq
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: content.faq.map((item: { question: string; answer: string }) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer,
                },
            })),
        }
        : null;

    return (
        <section className="mt-12 space-y-12 max-w-4xl mx-auto">
            {/* Schema.org JSON-LD */}
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            {/* How to Use Section */}
            {content.guide && content.guide.length > 0 && (
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-primary text-3xl">📖</span>
                        {content.guide_title || 'How to Use'}
                    </h2>
                    <div className="space-y-6">
                        {content.guide.map((step: { title: string; description: string }, index: number) => (
                            <div key={index} className="bg-card rounded-lg p-6 border shadow-sm">
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                        {index + 1}
                                    </span>
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground ml-10">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </article>
            )}

            {/* Use Cases Section */}
            {/* Use Cases Section */}
            {(content.use_cases_title || (content.use_cases && content.use_cases.length > 0) || content['use_case_1']) && (
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-primary text-3xl">💡</span>
                        {content.use_cases_title || 'Use Cases'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {content.use_cases?.map((useCase: string, index: number) => (
                            <div key={index} className="bg-card rounded-xl p-4 border shadow-sm text-sm text-muted-foreground">
                                {useCase}
                            </div>
                        ))}
                        {!content.use_cases && [1, 2, 3].map((num) => {
                            const useCase = content[`use_case_${num}`];
                            if (!useCase) return null;
                            return (
                                <div key={num} className="bg-card rounded-xl p-4 border shadow-sm text-sm text-muted-foreground">
                                    {useCase}
                                </div>
                            );
                        })}
                    </div>
                </article>
            )}

            {/* FAQ Section */}
            {content.faq && content.faq.length > 0 && (
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="text-primary text-3xl">❓</span>
                        {content.faq_title || 'Frequently Asked Questions'}
                    </h2>
                    <div className="grid gap-4">
                        {content.faq.map((item: { question: string; answer: string }, index: number) => (
                            <div key={index} className="bg-card rounded-lg p-6 border shadow-sm transition-all hover:shadow-md">
                                <h3 className="text-lg font-semibold mb-3 text-foreground">{item.question}</h3>
                                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </article>
            )}
        </section>
    );
}
