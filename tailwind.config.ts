import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#007956",       // Oficial dot.Sales
          primaryHover: "#005f46",  // Oficial dot.Sales
          light: "#a4f4cf",         // Oficial dot.Sales
          mint: "#d0fae5",          // Oficial dot.Sales
          pale: "#ecfdf5",          // Oficial dot.Sales
          dark: "#0C0C09",
          muted: "#68736F",
          border: "#E7EAE7",
          offwhite: "#F9F9F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        'tighter-hero': '-0.035em',
        'tighter-title': '-0.03em',
        'tight-card': '-0.02em',
      },
      lineHeight: {
        'title-hero': '1.08',
        'title-section': '1.15',
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(12, 12, 9, 0.05), 0 2px 6px -1px rgba(12, 12, 9, 0.03)",
        cardHover: "0 12px 32px -4px rgba(0, 121, 86, 0.09), 0 4px 12px -2px rgba(12, 12, 9, 0.04)",
        glow: "0 0 30px rgba(0, 121, 86, 0.15)",
        form: "0 12px 40px -8px rgba(12, 12, 9, 0.08), 0 4px 16px -2px rgba(12, 12, 9, 0.04)",
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
        'input': '12px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wl-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 121, 86, 0.25)' },
          '50%': { boxShadow: '0 0 0 6px rgba(0, 0, 0, 0)' },
        },
        'wl-rise': {
          '0%': { transform: 'translateY(10px)', opacity: '0.9' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'wl-pulse': 'wl-pulse 2s infinite',
        'wl-rise': 'wl-rise 0.4s ease-out',
        'marquee': 'marquee 38s linear infinite',
      },
      backgroundImage: {
        'mint-gradient': 'linear-gradient(110deg, #d0fae5 0%, #F0F7F5 45%, #FFFFFF 85%)',
        'subtle-radial': 'radial-gradient(circle at 50% 0%, #d0fae5 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
};
export default config;
