/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Hoặc 'media', tùy theo cách bạn muốn kích hoạt Dark Mode
  theme: {
    extend: {
      maxWidth: {
        'custom-xl': '1200px' // Thêm giá trị tùy chỉnh
      },
      fontFamily: {
        handwriting: ["Dancing Script", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        pacifico: ["Pacifico", "cursive"],
        greatvibes: ["Great Vibes", "cursive"],
        satisfy: ["Satisfy", "cursive"],
        alexbrush: ["Alex Brush", "cursive"]
      }
    }
  },
  plugins: []
}
