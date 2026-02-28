const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-lab-function": {
      preserve: false,
      subFeatures: { displayP3: false },
    },
    "@csstools/postcss-oklab-function": {
      preserve: false,
      subFeatures: { displayP3: false },
    },
  },
};

export default config;
