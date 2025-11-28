'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    // Extract current language from pathname
    const currentLang = pathname.split('/')[1] || 'en'

    const languages = [
        { code: 'en', label: 'English', flag: '🇺🇸' },
        { code: 'ko', label: '한국어', flag: '🇰🇷' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
    ]

    const handleLanguageChange = (langCode: string) => {
        if (!pathname) return
        const segments = pathname.split('/')
        segments[1] = langCode
        const newPath = segments.join('/')
        router.push(newPath)
        setIsOpen(false)
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <span>{languages.find(l => l.code === currentLang)?.flag}</span>
                <span className="hidden sm:inline">{languages.find(l => l.code === currentLang)?.label}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className={`block w-full text-left px-4 py-2 text-sm ${currentLang === lang.code
                                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <span className="mr-2">{lang.flag}</span>
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
