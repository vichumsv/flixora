/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      screens: {
        xs: "300px", // 👈 Custom breakpoint
      },
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
