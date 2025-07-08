// import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './vendor/laravel/jetstream/**/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/**/*.vue',
        './resources/**/*.js',
        './resources/shared/**/*.js',
        './resources/assets/**/*.svg',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                pdf: ['Helvetica', 'Arial', 'sans-serif'],
                outfit: ['sans-serif'],
            },
            maxWidth: {
                'screen-xl': '1224px',
                '7xs': '8rem',
                '6xs': '10rem',
                '5xs': '12rem',
                '4xs': '14rem',
                '3xs': '16rem',
                '2xs': '18rem',
            },
            maxHeight: {
                '7xs': '8rem',
                '6xs': '10rem',
                '5xs': '12rem',
                '4xs': '14rem',
                '3xs': '16rem',
                '2xs': '18rem',
            },
            fontSize: {
                '4xs': '10px',
                '3xs': '11px',
                xxs: '12px',
                xs: '13px',
                sm: '14px',
                base: '15px',
                md: '15px',
                lg: '16px',
                custom: 'var(--gsize,13px)',
            },
            zIndex: {
                1: '1',
                900: '900',
            },
            animation: {
                none: 'none',
                spin: 'spin 1s linear infinite',
                // ping: "ping 1s cubic-bezier(0, 0, 0.1, 1) infinite",
                pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                bounce: 'bounce 1s infinite',
                'fade-up': 'fade-up 1.5s both',
                'fade-in-up': 'fadeInUp 0.8s ease-out',

            },

            colors: {
                black: '#231C2C',
                custom: 'var(--customcolor,#231C2C)',
                orange: {
                    50: '#FFF9F2',
                    100: '#FFB500',
                },
                red: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                },
                bleu: {
                    100: '#1B1A32',
                    200: '#EEF8FD',
                    300: '#93C5FD',
                    900: '#003C95', 
                },
                yellow: {
                    100: '#FCE300',
                },
                gray: {
                    70: '#F8F8F8',
                    80: '#FAFAFA',
                    444: '#444',
                },
                primary: '#F51D65',
                'primary-hover': '#d31355', 

            },

            boxShadow: {
                'inner-cover': '0px 4px 40px 0px rgba(226, 86, 38, 0.12);',
                'inner-md': 'inset 0 4px 4px 0 rgba(0, 0, 0, 0.25)',
                inner: 'inset 0 4px 10px 0px rgba(0, 0, 0, 0.25)',
                down: '0px 3px 5px -2px rgb(0 0 0 / 10%)',
                up: '0 -2px 7px 0px rgb(47 50 53 / 10%)',
                box: '2px 6px 24px 0px rgba(226, 86, 38, 0.42)',
                'box-2': '0px 4px 50px 0px rgba(0,0,0,0.09)',
                'box-3': '2px 6px 24px 0px rgba(255, 255, 255, 0.50)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-lines':
                    'repeating-linear-gradient(45deg,  transparent, transparent 5px, #8686861a 5px, #8686861a 6px)',
            },
        },
    },
    safelist: [
        {
            pattern: /order-(1|2|3)/,
            variants: ['md'],
        },
        {
            pattern: /col-start-(1|2|3)/,
            variants: ['md'],
        },
    ],
    plugins: [forms, typography],
};
