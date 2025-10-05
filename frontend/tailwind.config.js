/**@type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  "#f1efff",
          100: "#e6e3ff",
          200: "#cfc8ff",
          300: "#b1a7ff",
          400: "#8a7cff",
          500: "#6f61f5",   
          600: "#5b4fe0",
          700: "#4c41c4",
          800: "#3c35a1",
          900: "#2f2a83",
        },
        night: {
          700: "#2f2e6a",
          600: "#38407e",
          500: "#4b5aa0",
        },
      },
      boxShadow: {
        glass: "0 10px 30px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}
