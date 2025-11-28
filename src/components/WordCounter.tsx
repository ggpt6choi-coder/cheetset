'use client'

import { useState } from 'react'

interface WordCounterProps {
    labels: {
        placeholder: string
        result: string
    }
}

export default function WordCounter({ labels }: WordCounterProps) {
    const [text, setText] = useState('')

    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length

    const resultText = labels.result
        .replace('{words}', words.toString())
        .replace('{chars}', chars.toString())

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <textarea
                    className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                    placeholder={labels.placeholder}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-lg font-medium text-gray-700 dark:text-gray-300 gap-4 sm:gap-0">
                    <p className="text-center sm:text-left">{resultText} (No Space: {charsNoSpace})</p>
                    <button
                        onClick={() => setText('')}
                        className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    )
}
