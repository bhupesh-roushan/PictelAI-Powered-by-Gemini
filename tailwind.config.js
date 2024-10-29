// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         loader: {
//           '0%': { backgroundPosition: '-800px 0px' },
//           '100%': { backgroundPosition: '800px 0px' },
//         },
//       },
//       animation: {
//         loader: 'loader 2s linear infinite',
//       },
//     },

//   },
//   plugins: [],
// }



/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loader: {
          '0%': { backgroundPosition: '-800px 0px' },
          '100%': { backgroundPosition: '800px 0px' },
        },
        wave: {  // Adding the wave keyframes
          '0%': { backgroundPosition: '0%' },
          '100%': { backgroundPosition: '100%' },
        },
      },
      animation: {
        loader: 'loader 2s linear infinite',
        wave: 'wave 2s linear infinite',  // Adding the wave animation
      },
      backgroundSize: {
        '200': '200%',  // Custom background size for wave gradient
      },
    },
  },
  plugins: [],
}
