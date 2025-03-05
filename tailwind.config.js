// tailwind.config.js
// Bu dosyayı projenizin kök dizinine ekleyin ve tailwind.config.js olarak kaydedin
// Ardından bu dosyayı import edin: import './tailwind.config.js'

module.exports = {
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#8A2BE2',
            dark: '#5D1E9E',
            light: '#9F6EF6'
          },
          secondary: {
            DEFAULT: '#B026FF',
            dark: '#7A1BB2',
          },
          dark: {
            DEFAULT: '#0F0921',
            light: '#1B1139',
            medium: '#140C2E',
          },
          light: {
            DEFAULT: '#F8F9FE',
            purple: '#EADCFE',
          }
        },
        fontFamily: {
          orbitron: ['Orbitron', 'sans-serif'],
          rajdhani: ['Rajdhani', 'sans-serif']
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate'
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' }
          },
          glow: {
            '0%': { 
              boxShadow: '0 0 5px rgba(138, 43, 226, 0.5), 0 0 10px rgba(138, 43, 226, 0.3)', 
              borderColor: 'rgba(138, 43, 226, 0.5)'
            },
            '100%': { 
              boxShadow: '0 0 15px rgba(138, 43, 226, 0.7), 0 0 30px rgba(138, 43, 226, 0.5)', 
              borderColor: 'rgba(138, 43, 226, 0.8)'
            }
          }
        }
      }
    }
  }