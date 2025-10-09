// Utility functions for authentication - Updated to use API

import { registerUser, loginUser, type User } from '../api/authApi';

// Legacy interface for backward compatibility
export interface LegacyUser {
  fullName: string;
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = 'registered_users';
const CURRENT_USER_KEY = 'currentUser';

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error reading current user from localStorage:', error);
    return null;
  }
};

// Set current user in localStorage
export const setCurrentUser = (user: User): void => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving current user to localStorage:', error);
  }
};

// Remove current user from localStorage (logout)
export const removeCurrentUser = (): void => {
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error removing current user from localStorage:', error);
  }
};

// Register new user using API
export const saveUser = async (userData: LegacyUser): Promise<boolean> => {
  try {
    await registerUser({
      username: userData.fullName,
      email: userData.email,
      password: userData.password
    });
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    return false;
  }
};

// Authenticate user using API
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const user = await loginUser({ email, password });
    return user;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Check if user exists by email using API
export const userExists = async (email: string): Promise<boolean> => {
  try {
    // Try to find user by email
    const response = await fetch('http://localhost:3001/users');
    const users: User[] = await response.json();
    return users.some(u => u.email === email);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};

// Legacy functions for backward compatibility (now use localStorage as fallback)
export const getRegisteredUsers = (): LegacyUser[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
};
