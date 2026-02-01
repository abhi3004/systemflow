/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a1a2e',
                    light: '#3a3a5e',
                },
                surface: {
                    light: '#ffffff',
                    dark: '#1a1a2e',
                    card: {
                        light: '#f5f5f5',
                        dark: '#2a2a4e',
                    }
                }
            }
        },
    },
    plugins: [],
}
