// Tipos de búsqueda
export type SearchType = 'trabajo' | 'roomie' | 'ambos';

// Tipo de personalidad
export type PersonalityType = 'introvertido' | 'extrovertido' | 'ambos';

// Usuario
export interface User {
  id: string;
  nombre: string;
  correo: string;
  universidad: string;
  carrera: string;
  semestre?: number;
  fotoPerfil?: string;
  descripcion?: string;
  tipoBusqueda: SearchType;
  intereses: string[];
  habilidades: string[];
  horarios?: {
    preferencia: 'mañana' | 'tarde' | 'noche' | 'flexible';
    disponibilidad: string[];
  };
  personalidad?: PersonalityType;
  ubicacion?: {
    ciudad: string;
    zona?: string;
  };
  preferenciasRoomie?: {
    presupuesto?: number;
    habitosLimpieza: 'ordenado' | 'normal' | 'flexible';
    habitosRuido: 'silencioso' | 'normal' | 'ruidoso';
    fumador: boolean;
    mascotas: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Match/Conexión
export interface Match {
  id: string;
  usuarios: [string, string]; // IDs de los dos usuarios
  porcentajeCompatibilidad: number;
  interesesComunes: string[];
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  createdAt: Date;
}

// Solicitud de conexión
export interface ConnectionRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  mensaje?: string;
  estado: 'pendiente' | 'aceptado' | 'rechazado';
  createdAt: Date;
}

// Filtros de búsqueda
export interface SearchFilters {
  universidad?: string;
  carrera?: string;
  tipoBusqueda?: SearchType;
  intereses?: string[];
  ubicacion?: string;
  presupuestoMin?: number;
  presupuestoMax?: number;
}
