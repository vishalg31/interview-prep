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
        // Blush / rose surface; indigo accent pops as a cool complement.
        // Warm alts: sand -> paper #FAF6EF, panel #F2ECDF, rule #E7DFCD;
        // peach -> paper #FCF4ED, panel #F7EADD, rule #EFDDCB;
        // greige -> paper #F8F6F1, panel #EEEAE1, rule #E4DFD4.
        // (warm palettes share move.bg #EEEDFB.)
        paper: '#FBF5F3',
        panel: '#F5EAE6',
        ink: '#22201C',
        muted: '#75716A',
        rule: '#ECDDD8',
        // The single accent, spent only on the "move to notice" study layer.
        move: {
          DEFAULT: '#4F46E5',
          ink: '#3730A3',
          bg: '#EEEDFB',
          border: '#D8D6F6',
        },
        // The interviewer's voice in a dialogue. A cool slate inset against the
        // warm (blush) paper, so it reads as a different speaker by temperature.
        // Kept distinct from the lighter move.bg accent layer. (Was warm tan
        // bg #F1E7D2 / border #D6C195 back when the paper was cream.)
        quote: {
          bg: '#E8EAF0',
          border: '#C6CBDA',
        },
      },
      maxWidth: {
        measure: '40rem',
      },
    },
  },
  plugins: [],
}
