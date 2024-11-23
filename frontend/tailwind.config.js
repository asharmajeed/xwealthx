/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pastelGreen: "#9dcd5a",
        // pink: '#e61f93',
        pastelPink: "#ffacec",
        grey: "#7d7d7d",
        teal: {
          DEFAULT: "#1b7895",
          dark: "#0a3c4b", // Dark teal
          light: "#4ab5c7", // Light teal, optional if needed
        },
        // darkTeal: '#0a3c4b',
        // blue: '#005b99',
        backgroundBlue: "#a2c8e1",
      },
    },
  },
  plugins: [],
};
