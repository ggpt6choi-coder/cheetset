'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { Search, FileText, Wrench } from 'lucide-react';
import { tools } from '@/config/tools';
import { posts } from '@/data/posts';

interface SearchCommandProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    lang: string;
    toolsDict: {
        [key: string]: {
            title: string;
            description: string;
        }
    };
}

import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export default function SearchCommand({ open, setOpen, lang, toolsDict }: SearchCommandProps) {
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen(!open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [open, setOpen]);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, [setOpen]);

    // Filter posts by current language
    const currentLangPosts = posts.filter(post => post.lang === lang);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99]" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[640px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-[100] outline-none">
                    <VisuallyHidden.Root>
                        <Dialog.Title>Global Command Menu</Dialog.Title>
                        <Dialog.Description>Search for tools and blog posts</Dialog.Description>
                    </VisuallyHidden.Root>

                    <Command className="w-full">
                        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4">
                            <Search className="w-5 h-5 text-gray-500 mr-3" />
                            <Command.Input
                                placeholder="Type a command or search..."
                                className="w-full h-14 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder:text-gray-400"
                            />
                        </div>

                        <Command.List className="max-h-[300px] overflow-y-auto p-2 scroll-py-2">
                            <Command.Empty className="py-6 text-center text-sm text-gray-500">
                                No results found.
                            </Command.Empty>

                            <Command.Group heading="Tools" className="text-xs font-medium text-gray-500 px-2 py-1.5 mb-2">
                                {tools.map((tool) => {
                                    const toolInfo = toolsDict[tool.slug.replace(/-/g, '_')] || toolsDict[tool.slug];
                                    const title = toolInfo?.title || tool.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                                    return (
                                        <Command.Item
                                            key={tool.slug}
                                            value={`${title} ${tool.slug}`}
                                            onSelect={() => runCommand(() => router.push(`/${lang}/tools/${tool.slug}`))}
                                            className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer aria-selected:bg-indigo-50 dark:aria-selected:bg-indigo-900/30 aria-selected:text-indigo-600 dark:aria-selected:text-indigo-400 transition-colors"
                                        >
                                            <span className="mr-3 text-lg">{tool.icon || <Wrench className="w-4 h-4" />}</span>
                                            <span className="flex-1">{title}</span>
                                            <span className="text-xs text-gray-400 capitalize">{tool.category}</span>
                                        </Command.Item>
                                    );
                                })}
                            </Command.Group>

                            <Command.Group heading="Blog Posts" className="text-xs font-medium text-gray-500 px-2 py-1.5 mb-2">
                                {currentLangPosts.map((post) => (
                                    <Command.Item
                                        key={post.slug}
                                        value={post.title}
                                        onSelect={() => runCommand(() => router.push(`/${lang}/blog/${post.slug}`))}
                                        className="flex items-center px-3 py-2.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer aria-selected:bg-indigo-50 dark:aria-selected:bg-indigo-900/30 aria-selected:text-indigo-600 dark:aria-selected:text-indigo-400 transition-colors"
                                    >
                                        <FileText className="w-4 h-4 mr-3 text-gray-400" />
                                        <span className="flex-1 truncate">{post.title}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
