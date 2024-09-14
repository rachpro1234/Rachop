import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector", // add this line
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      container: {
        center: true,
        // padding: "16px", 
      },
      colors: {
        fb: "#3b5998", // facebook icon color
        inst: " #c32aa3", // instagram icon color
        twi: "#000000", // twitter icon color
        lin: "#0a66c2", // linkedin icon color
        cyan: "#26C6DA", // main website color
        blakish: "#1b1b1b",
        accent: "rgb(151, 79, 218)"
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};
export default config;
