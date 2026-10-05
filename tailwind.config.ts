import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        "ink-secondary": "#2b2b2b",
        muted: "#666666",
        line: "#e5e5e5",
        "line-bright": "#cfcfcf",
        paper: "#ffffff",
        cream: "#f7f7f7",
        studio: "#efefef",
        brand: {
          50: "#fff9db",
          100: "#fff0a8",
          400: "#ffd633",
          500: "#f4c400",
          600: "#d9ad00",
          700: "#8a6700",
          900: "#2f2500"
        }
      },
      boxShadow: {
        soft: "0 10px 24px -18px rgba(17, 17, 17, 0.25)",
        premium: "0 18px 42px -28px rgba(17, 17, 17, 0.32)"
      },
      backgroundImage: {
        "hero-glow": "linear-gradient(90deg, rgba(255,253,248,0.94) 0%, rgba(255,253,248,0.74) 38%, rgba(255,253,248,0.12) 72%)"
      }
    },
  },
  plugins: [],
};

export default config;
