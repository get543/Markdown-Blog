/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "20px",
      },
      borderRadius: ["responsive", "hover"],
      colors: {
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
        graydark: "#273444",
        gray: "#8492a6",
        graylight: "#d3dce6",

        primary: "#06B6D4",
        secondary: "#64748B",
        light: "#c8d3f5",
        dark: "#222436",
        darkish: "rgb(18, 28, 53)",
      },
    },
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
