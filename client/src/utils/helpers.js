// Helper functions// This file is for general helper functions.
// For example, a function to format dates or truncate text.
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};