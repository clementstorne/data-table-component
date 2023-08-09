/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    colors: {
      primary: "#687f11",
      secondary: "#94ac1b",
      tertiary: "#446404",
      black: "#000000",
      white: "#ffffff",
      dark: "#415704",
      light: "#eef1e6",
      red: "#b91c1c",
    },
    fontFamily: {
      sans: ["Avenir", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {
      boxShadow: {
        DEFAULT: "5px 5px 5px 0px rgba(0, 0, 0, 0.2)",
        md: "5px 5px 5px 0px rgba(0, 0, 0, 0.8)",
      },
      dropShadow: {
        DEFAULT: "5px 5px 5px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: ["@tailwindcss/forms"],
};
