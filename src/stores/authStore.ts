import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (correo: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (correo: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar lógica de autenticación con el backend
      // Por ahora simulamos un login exitoso
      const mockUser: User = {
        id: '1',
        nombre: 'Usuario Demo',
        correo,
        universidad: 'Universidad Demo',
        carrera: 'Ingeniería',
        tipoBusqueda: 'ambos',
        intereses: [],
        habilidades: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({ user: mockUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: Partial<User>) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar lógica de registro con el backend
      const newUser: User = {
        id: Date.now().toString(),
        nombre: userData.nombre || '',
        correo: userData.correo || '',
        universidad: userData.universidad || '',
        carrera: userData.carrera || '',
        tipoBusqueda: userData.tipoBusqueda || 'ambos',
        intereses: userData.intereses || [],
        habilidades: userData.habilidades || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  updateProfile: async (userData: Partial<User>) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar actualización de perfil con el backend
      set((state) => ({
        user: state.user ? { ...state.user, ...userData, updatedAt: new Date() } : null,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
