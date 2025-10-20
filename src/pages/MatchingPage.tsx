import { useEffect } from 'react';
import { useMatchStore } from '../stores/matchStore';
import { MatchCard } from '../components/matching/MatchCard';
import { SearchFilters } from '../components/matching/SearchFilters';
import type { SearchFilters as SearchFiltersType } from '../types';

export const MatchingPage = () => {
  const { potentialMatches, searchMatches, isLoading } = useMatchStore();

  useEffect(() => {
    // Cargar matches iniciales
    searchMatches({});
  }, [searchMatches]);

  const handleSearch = (filters: SearchFiltersType) => {
    searchMatches(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Encuentra tu match perfecto</h1>
          <p className="text-gray-600">
            Descubre personas con intereses similares y conecta con ellas
          </p>
        </div>

        <SearchFilters onSearch={handleSearch} />

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : potentialMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potentialMatches.map((user) => (
              <MatchCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron resultados</h3>
            <p className="mt-1 text-sm text-gray-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
