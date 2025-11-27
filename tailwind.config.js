/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#b497f7',        // lavender
        accentLight: '#d9caff',   // lighter lavender
        forest: '#2e4a2e',        // deep forest green
        forestLight: '#3e6b3e',   // lighter green
        surface: '#242424',        // dark card background
        background: '#1a1a1a',     // dark page background
        textPrimary: '#e5e5e5',    // main text
        textMuted: '#9ca3af',      // secondary text
      },
    },
  },
  plugins: [],
};
