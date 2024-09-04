/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        backdrop: "rgba(0, 0, 0, 0.20)",
        "backdrop-40": "rgba(0, 0, 0, 0.40)",
      },
      boxShadow: {
        card: "0px 4px 10px 0px rgba(0, 0, 0, 0.15)",
        "card-15": "0px 4px 4px 0 rgba(0, 0, 0, 0.15)",
        "card-25": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("daisyui")],
};

export default config;
