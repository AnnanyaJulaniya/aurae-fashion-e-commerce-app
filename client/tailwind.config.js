/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          canvas: "#FAF8F5",
          surface: "#FFFFFF",
          sand: "#F4EFEB",
          taupe: "#8C827A",
          muted: "#716B64",
          border: "#E8E4DE",
          dark: "#141413",
          charcoal: "#262422",
          accent: "#9E7D63",
          accentDark: "#7E5F48",
          red: "#991B1B",
          green: "#166534",
          amber: "#92400E"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Cambria", "serif"],
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.2em",
        subtle: "0.08em",
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        dropdown: "0 10px 30px rgba(0, 0, 0, 0.08)",
      }
    },
  },
  plugins: [],
}
