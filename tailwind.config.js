/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";
export default {
  content: ["./inertia/**/*.{js,ts,jsx,tsx}", "./resources/**/*.{edge,js,ts,jsx,tsx}", flowbite.content(),],
  theme: {
    extend: {},
  },
  plugins: [ flowbite.plugin()],
}

