
'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent({
    message,
    buttonText
}: {
    message: string;
    buttonText: string;
}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookie = () => {
        localStorage.setItem('cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-700">
            <p className="text-sm text-center sm:text-left">
                {message}
            </p>
            <button
                onClick={acceptCookie}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap"
            >
                {buttonText}
            </button>
        </div>
    );
}
