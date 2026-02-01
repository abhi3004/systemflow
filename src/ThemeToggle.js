import { useState, useEffect, useRef } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const buttonRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    const toggleTheme = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        const ripple = document.createElement('div');
        const rect = buttonRef.current.getBoundingClientRect();
        const size = Math.max(window.innerWidth, window.innerHeight) * 2;

        ripple.style.cssText = `
            position: fixed;
            top: ${rect.top + rect.height / 2}px;
            left: ${rect.left + rect.width / 2}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            background-color: ${isDark ? '#ffffff' : '#1a1a2e'};
            z-index: 999;
            pointer-events: none;
            transition: transform 0.6s ease-out;
        `;

        document.body.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        setTimeout(() => {
            setIsDark(!isDark);
        }, 300);

        setTimeout(() => {
            ripple.remove();
            setIsAnimating(false);
        }, 600);
    };

    return (
        <button
            ref={buttonRef}
            onClick={toggleTheme}
            className={`fixed top-3 right-3 z-[1000] p-2 rounded-full border-none cursor-pointer shadow-lg transition-all duration-300 ease-in-out ${isDark ? 'bg-white' : 'bg-[#1a1a2e]'
                }`}
        >
            {isDark ? (
                <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
                <MoonIcon className="w-6 h-6 text-white" />
            )}
        </button>
    );
};
