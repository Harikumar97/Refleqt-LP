/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Refleqt custom colors
        cream: "#F5F3EF",
        "refleqt-orange": "#D4652A",
        "refleqt-gold": "#C9A227",
        "refleqt-green": "#2D5A4A",
        "refleqt-blue": "#3A5A7C",
        "refleqt-dark": "#0D0D0D",
        "refleqt-gray": "#6B6B6B",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', fontWeight: '300' }],
        'display-sm': ['3rem', { lineHeight: '1.2', fontWeight: '300' }],
        'headline': ['2.5rem', { lineHeight: '1.2', fontWeight: '300' }],
        'subhead': ['1.5rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        'card': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'glow-orange': '0 0 30px rgba(212, 101, 42, 0.4)',
        'glow-gold': '0 0 30px rgba(201, 162, 39, 0.4)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-8px) rotate(1deg)" },
          "75%": { transform: "translateY(8px) rotate(-1deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 101, 42, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 101, 42, 0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'emerge': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'settle': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'dramatic': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
