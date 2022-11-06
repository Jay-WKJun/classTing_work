// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, addUtilities }) => {
      addVariant('child/Wo.last', '& > :not(:last-child)');
      addVariant('child/Wo.first', '& > :not(:first-child)');
      addVariant('child', '& > *');
    }),
  ],
};
