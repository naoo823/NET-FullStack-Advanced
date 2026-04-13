// This file contains shared TypeScript interfaces used across the application.

/**
 * Defines the shape of the User object we get from the backend
 * and store in our Redux state.
 */
export interface User {
  _id: string;
  name: string;
  email: string;
  // You can add other fields here later, such as 'role',
  // if you expand your backend User model.
}

/**
 * Example of another shared type you might use for your portfolio.
 */
export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}