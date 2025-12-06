import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 mt-10 leading-tight">
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8 flex items-center">
                <span className="w-2 h-8 bg-indigo-600 rounded-r-md mr-3 inline-block"></span>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-6">
                {children}
            </h3>
        ),
        p: ({ children }) => (
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {children}
            </p>
        ),
        ul: ({ children }) => (
            <ul className="space-y-3 mb-6 ml-4 list-disc list-outside text-gray-700 dark:text-gray-300">
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol className="space-y-3 mb-6 ml-4 list-decimal list-outside text-gray-700 dark:text-gray-300">
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li className="pl-2">
                {children}
            </li>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-6 bg-gray-50 dark:bg-gray-800/50 italic text-gray-700 dark:text-gray-300 rounded-r-lg">
                {children}
            </blockquote>
        ),
        a: ({ href, children }) => (
            <a
                href={href}
                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors"
            >
                {children}
            </a>
        ),
        code: ({ children }) => (
            <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto mb-6 text-sm font-mono shadow-lg">
                {children}
            </pre>
        ),
        hr: () => (
            <hr className="my-10 border-gray-200 dark:border-gray-800" />
        ),
        ...components,
    };
}
