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
          primary: "#007A55",
          primaryHover: "#006344",
          light: "#C1F4C7",
          mint: "#DCEDE8",
          pale: "#E7F4EE",
          dark: "#0C0C09",
          muted: "#68736F",
          border: "#E7EAE7",
          offwhite: "#F9F9F7",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "Geist", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(12, 12, 9, 0.05), 0 2px 6px -1px rgba(12, 12, 9, 0.03)",
        cardHover: "0 10px 30px -4px rgba(0, 122, 85, 0.08), 0 4px 12px -2px rgba(12, 12, 9, 0.04)",
        glow: "0 0 30px rgba(0, 122, 85, 0.15)",
        form: "0 12px 40px -8px rgba(12, 12, 9, 0.08), 0 4px 16px -2px rgba(12, 12, 9, 0.04)",
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
        'input': '12px',
      },
      backgroundImage: {
        'mint-gradient': 'linear-gradient(110deg, #DCEDE8 0%, #F0F7F5 45%, #FFFFFF 85%)',
        'subtle-radial': 'radial-gradient(circle at 50% 0%, #DCEDE8 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
};
export default config;
