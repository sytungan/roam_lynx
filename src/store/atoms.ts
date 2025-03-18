import { atom } from 'jotai';
import { DEFAULT_LANGUAGE } from '../constants/defaults.js';

// User related atoms
export const userAtom = atom({
  id: '',
  username: '',
  email: '',
  isAuthenticated: false,
});

// Theme related atoms
export const themeAtom = atom('light');

// Application state atoms
export const isLoadingAtom = atom(false);
export const errorAtom = atom<string | null>(null);
export const languageAtom = atom(DEFAULT_LANGUAGE);

// Derived atoms example
export const isAuthenticatedAtom = atom(
  (get) => get(userAtom).isAuthenticated
); 