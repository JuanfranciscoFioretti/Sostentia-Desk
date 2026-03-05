export function getBaseUrl() {
  // For server-side rendering, use the host header if available
  // This is safe because it doesn't access process.env at module level
  if (typeof window !== 'undefined') {
    // Client-side, return empty to use relative URLs
    return '';
  }
  
  // Default to localhost for development
  return 'http://localhost:3000';
}
