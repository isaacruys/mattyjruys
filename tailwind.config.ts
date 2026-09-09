import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#F5F5F0", // near-white text (was dark text)
        paper: "#0C0C0E", // near-black background, matches the cover's shadows
        accent: "#C4272B", // red matching "BEAUTIFUL MESS" text
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};
export default config;
