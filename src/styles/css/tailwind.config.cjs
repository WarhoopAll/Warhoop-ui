import {nextui} from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        21: '21px',
      },
      colors: {
        customBrown: 'rgb(62, 47, 35)',
        customBg: '#16120f',
        customTXT: 'rgb(235, 222,194)',
        inputCol: '#1c1612',
      },
      screens: {
        xs: '480px',
        '2xl': '1300px',
        '3xl': '1300px',
      },
    },
  },
  plugins: [
    nextui(),
    ],
};
