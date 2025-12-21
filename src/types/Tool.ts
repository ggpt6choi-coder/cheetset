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
    [key: string]: any;
}
