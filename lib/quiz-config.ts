export const BRANDS = [
  'Levi\'s', 'Madewell', 'Everlane', 'AGOLDE', 'Abercrombie & Fitch',
  'Zara', 'H&M', 'Good American', 'Nudie Jeans', 'Diesel',
  'G-Star RAW', 'Frame', 'Mother', 'J.Crew', 'Gap', '7 For All Mankind'
];

export const SIZES = ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '36', '38', '40', '42'];

export const QUIZ_STEPS = [
  { id: 'height', label: 'Height', title: 'What is your height?', description: 'Helps us guide your ideal inseam length.' },
  { id: 'weight', label: 'Weight', title: 'What is your weight?', description: 'Completely optional—helps calibrate proportional fit.', optional: true },
  { id: 'waist', label: 'Waist', title: 'Your waist measurement', description: 'Measure around your narrowest point in inches.' },
  { id: 'hip', label: 'Hips', title: 'Your hip measurement', description: 'Measure around your fullest point.' },
  { id: 'waistFit', label: 'Waist Fit', title: 'How do you prefer your waist to feel?', description: 'Same measurements, entirely different styling priorities.' },
  { id: 'rise', label: 'Rise', title: 'Where should your waistband sit?', description: 'Select your preferred aesthetic elevation.' },
  { id: 'thighFit', label: 'Thigh Fit', title: 'How should they fit your thighs?', description: 'The second most common fit friction point.' },
  { id: 'brands', label: 'Brands', title: 'Which denim brands do you currently wear?', description: 'Select all that apply to normalize sizing.' },
  { id: 'brandSizes', label: 'Brand Sizing', title: 'What sizes do you wear in those brands?', description: 'This acts as our algorithmic ground truth.' },
  { id: 'frustration', label: 'Frustrations', title: 'Your biggest denim fit frustration?', description: 'We use this to customize your recommendation logic.' }
];