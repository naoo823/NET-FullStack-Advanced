import api from './api'; // Our main axios instance
import { User } from '../types'; // We'll create this type definition file

// Define the shape of the data for registration and login
export interface AuthCredentials {
  name?: string; // Optional for login
  email: string;
  password?: string;
}

// Define the shape of the successful auth response from our backend
export interface AuthResponse {
  success: boolean;
  token: string;
  data: User;
}

// Function to handle user registration
export const register = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data;
};

// Function to handle user login
export const login = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};