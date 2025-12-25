export interface ToolContent {
    title: string;
    description: string;
    guide_title?: string;
    faq_title?: string;
    guide?: {
        title: string;
        description: string;
    }[];
    faq?: {
        question: string;
        answer: string;
    }[];
    use_cases_title?: string;
    use_cases?: string[];
    [key: string]: any;
}
