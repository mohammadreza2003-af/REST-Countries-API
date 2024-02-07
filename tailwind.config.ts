import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "hsl(209, 23%, 22%)",
        veryDarkBlueD: "hsl(207, 26%, 17%)",
        veryDarkBlueL: "hsl(200, 15%, 8%)",
        darkGray: "hsl(0, 0%, 52%)",
        veryLightGray: "hsl(0, 0%, 98%)",
      },
      fontFamily: {
        nunito: ["Nunito Sans"],
      },
    },
  },
  plugins: [],
};
export default config;
