export const localVoiceParse = (stepId: string, text: string, context?: any): any => {
  const clean = text.toLowerCase().trim();
  
  if (clean.includes('skip') || clean.includes('pass') || clean.includes('next')) {
    return 'SKIP';
  }

  switch (stepId) {
    case 'height':
      const hMatch = clean.match(/(\d+)\s*(?:foot|feet|ft|'|\.)\s*(\d+)?/);
      if (hMatch) return `${hMatch[1]}'${hMatch[2] || '0'}"`;
      
      const decimalMatch = clean.match(/(\d+)\.(\d+)/);
      if (decimalMatch) return `${decimalMatch[1]}'${decimalMatch[2]}"`;

      const rawNumbers = clean.match(/\d+/g);
      if (rawNumbers && rawNumbers.length >= 1) {
        return `${rawNumbers[0]}'${rawNumbers[1] || '0'}"`;
      }
      break;

    case 'weight':
    case 'waist':
    case 'hip':
    case 'brandSizes': // Added guard fallback target path for dynamic sizing entries
      const mMatch = clean.match(/\d+/);
      return mMatch ? mMatch[0] : null;

    case 'waistFit':
      if (clean.includes('snug') || clean.includes('tight') || clean.includes('fit') || clean.includes('perfect')) return 'Snug';
      if (clean.includes('slightly') || clean.includes('somewhat') || clean.includes('medium')) return 'Slightly relaxed';
      if (clean.includes('relaxed') || clean.includes('loose') || clean.includes('comfortable') || clean.includes('baggy')) return 'Relaxed';
      if (clean.length > 0) return 'Slightly relaxed';
      break;

    case 'rise':
      if (clean.includes('high')) return 'High rise';
      if (clean.includes('mid') || clean.includes('medium') || clean.includes('middle')) return 'Mid rise';
      if (clean.includes('low')) return 'Low rise';
      if (clean.length > 0) return 'Mid rise';
      break;

    case 'thighFit':
      if (clean.includes('fitted') || clean.includes('tight')) return 'Fitted';
      if (clean.includes('relaxed') || clean.includes('normal') || clean.includes('regular')) return 'Relaxed';
      if (clean.includes('loose') || clean.includes('baggy')) return 'Loose';
      if (clean.length > 0) return 'Relaxed';
      break;

    case 'brands':
      return clean;

    case 'frustration':
      if (clean.includes('gap')) return 'Waist gap';
      if (clean.includes('tight')) return 'Hip tightness';
      if (clean.includes('length') || clean.includes('long') || clean.includes('short')) return 'Wrong length';
      if (clean.includes('thigh')) return 'Thigh fit';
      if (clean.includes('rise')) return 'Rise';
      return 'Other';
  }
  return null;
};