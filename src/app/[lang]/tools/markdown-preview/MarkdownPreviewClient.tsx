'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    labels: {
        placeholder: string;
        heading: string;
        preview: string;
    };
}

export default function MarkdownPreviewClient({ labels }: Props) {
    const [markdown, setMarkdown] = useState<string>('# Hello, Markdown!\n\nWrite your markdown here.\n\n- List item 1\n- List item 2\n\n| Column 1 | Column 2 |\n|Data 1|Data 2|');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
            <div className="flex flex-col h-full">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{labels.heading}</h2>
                <textarea
                    className="flex-1 w-full p-4 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder={labels.placeholder}
                />
            </div>
            <div className="flex flex-col h-full">
                <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{labels.preview}</h2>
                <div className="flex-1 w-full p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 overflow-y-auto prose dark:prose-invert max-w-none prose-sm md:prose-base">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
