export const colors = {
  // Background colors - Updated to be more white-based with subtle pink tints
  background: {
    primary: '#FFF5F7', // Very light pink tint, almost white
    secondary: '#FFF0F3', // Slightly more pink than primary
    tertiary: '#FFE5EA', // Light pink for depth
  },
  
  // Text colors
  text: {
    primary: '#1A202C', // Keeping dark text for readability
    secondary: '#4A5568',
    tertiary: '#718096',
    inverse: '#FFFFFF',
  },
  
  // Brand colors - Using Chentil palette
  brand: {
    primary: '#DF5188', // Fandango - Primary brand color
    secondary: '#F19CBB', // Amaranth - Secondary brand color
    accent: '#F6ACEC', // Lavender - Accent color
  },
  
  // Status colors - Using Chentil palette
  status: {
    success: '#F5A4C8', // Carnation
    error: '#F05F80', // Brick
    warning: '#F18988', // Taffy
    info: '#F6A1B6', // Flamingo
  },
  
  // Border colors - Using Chentil palette
  border: {
    light: '#F4C2C1', // Baby Pink
    medium: '#F8ABA0', // Pink Salmon
    dark: '#F7B8C6', // Lemonade
  },
  
  // Overlay colors
  overlay: {
    light: 'rgba(223, 81, 136, 0.1)', // Fandango with opacity
    medium: 'rgba(223, 81, 136, 0.5)', // Fandango with opacity
    dark: 'rgba(223, 81, 136, 0.8)', // Fandango with opacity
  },

  // Additional Chentil palette colors for specific use cases
  chentil: {
    rosePink: '#E16FAB',
    creamy: '#F06AA8',
    bubbleGum: '#EF5EA2',
    thulian: '#E070A2',
    watermelon: '#F3809D',
    punch: '#EB5679',
    frenchRose: '#EF4B8A',
    cerise: '#DE3064',
    hotPink: '#ED2690',
    ruby: '#E01861',
  },
} as const; 