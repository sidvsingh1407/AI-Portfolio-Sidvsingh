/**
 * Central Theme Configuration
 * Stable references to prevent unnecessary re-renders
 */

export const THEME = {
  colors: {
    bg: '#0a0a0a',
    surface: '#141414',
    border: 'rgba(255, 255, 255, 0.1)',
    accent: '#10b981', // Emerald 500
    accentMuted: 'rgba(16, 185, 129, 0.2)',
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa', // Zinc 400
      muted: '#71717a', // Zinc 500
    }
  },
  spacing: {
    container: 'max-w-7xl mx-auto px-6 md:px-12',
    section: 'py-24 md:py-32',
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  transitions: {
    default: 'transition-all duration-300 ease-out',
    slow: 'transition-all duration-700 ease-in-out',
  }
} as const;
