// tailwind.config.js
module.exports = {
  important: true,
  corePlugins: {
    preflight: true, // Ensure CSS reset is enabled
  },
    theme: {
      extend: {
        animation: {
          'spin-slow': 'spin 3s linear infinite',
        },
      },
    },
  };
  