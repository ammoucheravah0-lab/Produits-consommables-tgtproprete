/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.js", "./data/**/*.js"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0F1F3D", 900: "#0A1630", 800: "#12264A", 700: "#1B3563" },
        ink: "#1A1A2E",
        gold: { DEFAULT: "#C9A84C", deep: "#9E802D", soft: "rgba(201,168,76,.14)", pale: "#F4EBCB" },
        paper: "#FBFAF7",
        mist: "#F3F0E7",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Jost", "system-ui", "sans-serif"],
      },
      boxShadow: {
        lift: "0 28px 50px -22px rgba(15,31,61,.35)",
        card: "0 1px 2px rgba(15,31,61,.06), 0 10px 30px -18px rgba(15,31,61,.28)",
      },
    },
  },
  plugins: [],
};
