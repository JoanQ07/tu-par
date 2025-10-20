import { create } from 'zustand';
import type { Match, ConnectionRequest, SearchFilters, User } from '../types';

interface MatchState {
  matches: Match[];
  potentialMatches: User[];
  connectionRequests: {
    sent: ConnectionRequest[];
    received: ConnectionRequest[];
  };
  favorites: User[];
  isLoading: boolean;
  searchFilters: SearchFilters;

  // Acciones
  searchMatches: (filters: SearchFilters) => Promise<void>;
  sendConnectionRequest: (toUserId: string, mensaje?: string) => Promise<void>;
  acceptConnectionRequest: (requestId: string) => Promise<void>;
  rejectConnectionRequest: (requestId: string) => Promise<void>;
  addToFavorites: (user: User) => void;
  removeFromFavorites: (userId: string) => void;
  setSearchFilters: (filters: SearchFilters) => void;
}

export const useMatchStore = create<MatchState>((set, get) => ({
  matches: [],
  potentialMatches: [],
  connectionRequests: {
    sent: [],
    received: [],
  },
  favorites: [],
  isLoading: false,
  searchFilters: {},

  searchMatches: async (filters: SearchFilters) => {
    set({ isLoading: true, searchFilters: filters });
    try {
      // TODO: Implementar búsqueda con el backend
      // Por ahora retornamos datos de ejemplo
      const mockMatches: User[] = [
        {
          id: '2',
          nombre: 'María García',
          correo: 'maria@example.com',
          universidad: 'Universidad Nacional',
          carrera: 'Ingeniería de Sistemas',
          semestre: 6,
          tipoBusqueda: 'roomie',
          intereses: ['programación', 'música', 'deportes'],
          habilidades: ['React', 'Node.js'],
          personalidad: 'extrovertido',
          ubicacion: {
            ciudad: 'Bogotá',
            zona: 'Chapinero',
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          nombre: 'Carlos Rodríguez',
          correo: 'carlos@example.com',
          universidad: 'Universidad Nacional',
          carrera: 'Diseño Gráfico',
          semestre: 4,
          tipoBusqueda: 'trabajo',
          intereses: ['diseño', 'arte', 'fotografía'],
          habilidades: ['Figma', 'Photoshop', 'Illustrator'],
          personalidad: 'introvertido',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      set({ potentialMatches: mockMatches, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  sendConnectionRequest: async (toUserId: string, mensaje?: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar envío de solicitud con el backend
      const newRequest: ConnectionRequest = {
        id: Date.now().toString(),
        fromUserId: 'current-user-id', // TODO: Obtener del authStore
        toUserId,
        mensaje,
        estado: 'pendiente',
        createdAt: new Date(),
      };

      set((state) => ({
        connectionRequests: {
          ...state.connectionRequests,
          sent: [...state.connectionRequests.sent, newRequest],
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  acceptConnectionRequest: async (requestId: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar aceptación con el backend
      set((state) => ({
        connectionRequests: {
          ...state.connectionRequests,
          received: state.connectionRequests.received.map((req) =>
            req.id === requestId ? { ...req, estado: 'aceptado' as const } : req
          ),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  rejectConnectionRequest: async (requestId: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implementar rechazo con el backend
      set((state) => ({
        connectionRequests: {
          ...state.connectionRequests,
          received: state.connectionRequests.received.filter((req) => req.id !== requestId),
        },
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addToFavorites: (user: User) => {
    set((state) => ({
      favorites: [...state.favorites, user],
    }));
  },

  removeFromFavorites: (userId: string) => {
    set((state) => ({
      favorites: state.favorites.filter((user) => user.id !== userId),
    }));
  },

  setSearchFilters: (filters: SearchFilters) => {
    set({ searchFilters: filters });
  },
}));
