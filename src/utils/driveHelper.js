/**
 * Helper to robustly extract a Google Drive Image ID from any URL format
 * and return a direct image link suitable for <img> tags.
 */
export const getDriveImageUrl = (input) => {
  if (!input) return '';
  
  // If it's already a direct Unsplash, Google content, or local path, just return it
  if (
    input.includes('images.unsplash.com') || 
    input.startsWith('/') || 
    input.includes('lh3.googleusercontent') ||
    input.endsWith('.jpg') || 
    input.endsWith('.png') || 
    input.endsWith('.webp')
  ) {
    return input;
  }
  
  // Regex to extract the ID from various Drive URL permutations
  const regex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|id=)([a-zA-Z0-9_-]+)/;
  const match = input.match(regex);
  const id = match ? match[1] : input.trim();
  
  // If we ended up with what looks like an ID string, formulate the direct link
  if (id.length > 15 && !id.includes('http')) {
    return `https://lh3.googleusercontent.com/d/${id}`;
  }
  
  // Fallback to original
  return input;
};
