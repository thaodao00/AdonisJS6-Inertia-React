/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./inertia/**/*.{js,ts,jsx,tsx}", "./resources/**/*.{edge,js,ts,jsx,tsx}", flowbite.content(),],
  theme: {
    extend: {
      colors: {
        modal: {
          "bg": "#c7d1d99c",
          "content": "#fff",
          "header": "#f3f4f6",
          "close": "#f3f4f6",
          "closeHover": "#f3f4f6",
        },
      },
    },

  },
  plugins: [flowbite.plugin()],
}

