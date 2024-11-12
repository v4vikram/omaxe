/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}", // Keeps scanning files inside the src folder
    "./public/**/*.{html,js}", // Add this if you have a public folder
    "./*.{html,js}", // This will scan files in the root directory
    "./other-folder/**/*.{html,js}", // Scan files in another folder outside src
  ],
  theme: {
    extend: {
      colors: {
        green: "#00a052",
        tomato:"#e51c24",
        orange:"#ef8121",
        blue:"#2e9add",
        lightBlue:"#e0f3fe",
        pink: "#e30479",
        lightPink:"#fde8e8",
        darkGray:"#0d0e12",
      },
      screens: {
        '3xl': '1920px',
      },
      fontSize: {
        p: "18px",
        h2: "50px",
        h3: "35px",
        "20px": "20px",
        "75px": "75px",
        "50px": "50px",
      },
      lineHeight: {
        "39px": "39px",
        "75px": "75px",
      },
      fontFamily: {
        avianoSans: ["aviano-sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],

      },
      display: {
        // unset: "unset",
        // initial: "initial",
      },
    },
  },
  plugins: [],
};
