'use client'

import { useState } from 'react'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { tools } from '@/config/tools'

interface HeaderProps {
    lang: string
    dict: {
        common: {
            title: string
        }
        nav: {
            home: string
            tools: string
            blog: string
            [key: string]: string
        }
    }
}

export default function Header({ lang, dict }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isToolsOpen, setIsToolsOpen] = useState(false)

    return (
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href={`/${lang}`} className="text-xl font-bold text-gray-900 dark:text-white">
                        {dict.common.title}
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:ml-10 md:flex md:space-x-8">
                        <Link href={`/${lang}`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            {dict.nav.home}
                        </Link>

                        {/* Tools Dropdown */}
                        <div className="relative group">
                            <button
                                className="text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white px-3 py-2 text-sm font-medium transition-colors inline-flex items-center"
                                onMouseEnter={() => setIsToolsOpen(true)}
                                onClick={() => setIsToolsOpen(!isToolsOpen)}
                            >
                                {dict.nav.tools}
                                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className="absolute left-0 mt-0 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50"
                                onMouseLeave={() => setIsToolsOpen(false)}
                            >
                                <div className="py-1" role="menu" aria-orientation="vertical">
                                    {tools.map((tool) => (
                                        <Link
                                            key={tool.slug}
                                            href={`/${lang}/tools/${tool.slug}`}
                                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            role="menuitem"
                                        >
                                            {dict.nav[tool.slug.replace(/-/g, '_')] || tool.slug}
                                        </Link>
                                    ))}
                                    <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                    <Link href={`/${lang}/tools`} className="block px-4 py-2 text-sm text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium" role="menuitem">
                                        View All Tools &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Link href={`/${lang}/blog`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            {dict.nav.blog}
                        </Link>

                        <Link href={`/${lang}/about`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            {dict.nav.about}
                        </Link>

                        <Link href={`/${lang}/contact`} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                            {dict.nav.contact}
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center space-x-4">
                    <LanguageSwitcher />

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    >
                        <span className="sr-only">Open menu</span>
                        {isMenuOpen ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div >

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href={`/${lang}`}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {dict.nav.home}
                        </Link>

                        <div className="space-y-1 pl-3 border-l-2 border-gray-100 dark:border-gray-700 ml-3 my-2">
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                {dict.nav.tools}
                            </div>
                            {tools.map((tool) => (
                                <Link
                                    key={tool.slug}
                                    href={`/${lang}/tools/${tool.slug}`}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {dict.nav[tool.slug.replace(/-/g, '_')] || tool.slug}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={`/${lang}/blog`}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {dict.nav.blog}
                        </Link>

                        <Link
                            href={`/${lang}/about`}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {dict.nav.about}
                        </Link>

                        <Link
                            href={`/${lang}/contact`}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {dict.nav.contact}
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}
