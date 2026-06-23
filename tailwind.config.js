/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Warm paper, not cream; ink is warm near-black, not pure black.
        paper: '#FEFEFC',
        panel: '#F6F4EF',
        ink: '#22201C',
        muted: '#75716A',
        rule: '#E7E3DA',
        // The single accent, spent only on the "move to notice" study layer.
        move: {
          DEFAULT: '#4F46E5',
          ink: '#3730A3',
          bg: '#F1F1FC',
          border: '#D8D6F6',
        },
        // The interviewer's voice in a dialogue: a warmer, clearly-tinted block
        // so it reads as a different person from the candidate's prose.
        quote: {
          bg: '#F1E7D2',
          border: '#D6C195',
        },
      },
      maxWidth: {
        measure: '40rem',
      },
    },
  },
  plugins: [],
}
