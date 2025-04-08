import type { Config } from 'tailwindcss'
import twAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-kanit)'],
      },
      colors: {
        background: 'var(--color-background)',
        's-foreground': '#f9fafb',
        's-primary': 'var(--color-surface-primary)',
        's-primary-accent': 'var(--color-surface-primary-accent)',
        accent: 'var(--color-surface-primary-accent)',
        'accent-foreground': 'var(--color-surface-foreground)',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'auth-bg': 'var(--color-auth-bg)',
        't-primary': 'var(--color-text-primary)',
        't-secondary': 'var(--color-text-secondary)',
        't-brand': 'var(--color-text-brand)',
        't-invert': 'var(--color-text-invert)',
        't-alert': 'var(--color-text-alert)',
        't-placeholder': 'var(--color-text-placeholder)',
        't-warning': 'var(--color-text-warning)',
        's-secondary': 'var(--color-surface-secondary)',
        's-invert': 'var(--color-surface-invert)',
        's-brand-primary': 'var(--color-surface-brand-primary)',
        's-brand-primary-hover': 'var(--color-surface-brand-primary-hover)',
        's-brand-secondary': 'var(--color-surface-brand-secondary)',
        's-brand-secondary-hover': 'var(--color-surface-brand-secondary-hover)',
        's-input': 'var(--color-surface-input)',
        's-container': 'var(--color-surface-container)',
        's-backdrop': 'var(--color-surface-backdrop)',
        's-warning': 'var(--color-surface-warning)',
        's-analytics-light': 'var(--color-surface-analytics-light)',
        's-analytics-normal': 'var(--color-surface-analytics-normal)',
        's-analytics-dark': 'var(--color-surface-analytics-dark)',
        'b-primary': 'var(--color-border-primary)',
        'b-secondary': 'var(--color-border-secondary)',
        'b-brand': 'var(--color-border-brand)',
        'b-ring': 'var(--color-border-secondary)',
        't-b-primary-ring': 'var(--color-text-brand)',
        'b-alert': 'var(--color-text-alert)',
        'b-disabled': 'var(--color-border-disabled)',
        'muti-progress-used': 'var(--color-multi-progress-used-color)',
        'muti-progress-remaining': 'var(--color-multi-progress-remaining-color)',
        'b-s-scrollbar': 'var(--color-surface-scrollbar)',
        's-message-container': 'var(--color-surface-message-container)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        xs: [
          '12px',
          {
            lineHeight: '16px',
          },
        ],
        sm: [
          '14px',
          {
            lineHeight: '20px',
          },
        ],
        md: [
          '16px',
          {
            lineHeight: '24px',
          },
        ],
        lg: [
          '18px',
          {
            lineHeight: '28px',
          },
        ],
        xl: [
          '20px',
          {
            lineHeight: '28px',
          },
        ],
        'h1-bold': [
          '42px',
          {
            lineHeight: '50px',
            fontWeight: 700,
          },
        ],
        'h1-medium': [
          '42px',
          {
            lineHeight: '50px',
            fontWeight: 500,
          },
        ],
        'h2-bold': [
          '36px',
          {
            lineHeight: '50px',
            fontWeight: 700,
          },
        ],
        'h2-medium': [
          '36px',
          {
            lineHeight: '50px',
            fontWeight: 500,
          },
        ],
        'h3-bold': [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: 700,
          },
        ],
        'h3-medium': [
          '32px',
          {
            lineHeight: '40px',
            fontWeight: 500,
          },
        ],
        'h4-bold': [
          '28px',
          {
            lineHeight: '36px',
            fontWeight: 700,
          },
        ],
        'h4-medium': [
          '28px',
          {
            lineHeight: '36px',
            fontWeight: 500,
          },
        ],
        'h5-bold': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: 700,
          },
        ],
        'h5-medium': [
          '20px',
          {
            lineHeight: '28px',
            fontWeight: 500,
          },
        ],
        'h6-bold': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: 700,
          },
        ],
        'h6-medium': [
          '16px',
          {
            lineHeight: '22px',
            fontWeight: 500,
          },
        ],
        label: [
          '12px',
          {
            lineHeight: '16px',
          },
        ],
        helper: [
          '12px',
          {
            lineHeight: '16px',
          },
        ],
        subtitle: [
          '14px',
          {
            lineHeight: '18px',
          },
        ],
      },
      screens: {
        mobile: {
          max: '719px',
        },
        'mobile-tablet': {
          max: '1279px',
        },
        tablet: {
          min: '720px',
          max: '1279px',
        },
        'tablet-desktop': {
          min: '720px',
        },
        desktop: {
          min: '1280px',
        },
      },
    },
  },
  plugins: [twAnimate],
}
export default config
