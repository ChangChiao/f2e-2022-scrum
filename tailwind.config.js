module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', "sans-serif"],
      },
      colors: {
        green: {
          light: "#ACD271",
          dark: "#6D952F",
        },
        blue: {
          light: "#527275",
          dark: "#2F454F",
        },
        orange: {
          light: "#FBE4CA",
          dark: "#FFB464",
        },
        gray: {
          light: "#BBB",
          dark: "#939CAC",
        },
      },
    },
  },
  plugins: [],
};
