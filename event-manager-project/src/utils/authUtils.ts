// Utility functions for authentication

export interface User {
  fullName: string;
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = 'registered_users';

// Get all registered users from localStorage
export const getRegisteredUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
};

// Save a new user to localStorage
export const saveUser = (user: User): boolean => {
  try {
    const users = getRegisteredUsers();
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === user.email);
    if (existingUser) {
      return false; // User already exists
    }
    
    users.push(user);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return true; // User saved successfully
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
    return false;
  }
};

// Authenticate user login
export const authenticateUser = (email: string, password: string): User | null => {
  try {
    const users = getRegisteredUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};

// Check if user exists by email
export const userExists = (email: string): boolean => {
  try {
    const users = getRegisteredUsers();
    return users.some(u => u.email === email);
  } catch (error) {
    console.error('Error checking if user exists:', error);
    return false;
  }
};
