import { useState } from 'react';
import type { SearchFilters as SearchFiltersType, SearchType } from '../../types';

interface SearchFiltersProps {
  onSearch: (filters: SearchFiltersType) => void;
}

export const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Filtros de búsqueda</h3>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary-600 text-sm font-medium hover:text-primary-700"
        >
          {isExpanded ? 'Ocultar' : 'Mostrar más'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Universidad</label>
            <input
              type="text"
              value={filters.universidad || ''}
              onChange={(e) => setFilters({ ...filters, universidad: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Cualquier universidad"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Carrera</label>
            <input
              type="text"
              value={filters.carrera || ''}
              onChange={(e) => setFilters({ ...filters, carrera: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholder="Cualquier carrera"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de búsqueda</label>
            <select
              value={filters.tipoBusqueda || ''}
              onChange={(e) =>
                setFilters({ ...filters, tipoBusqueda: e.target.value as SearchType })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            >
              <option value="">Todos</option>
              <option value="trabajo">Trabajo/Proyectos</option>
              <option value="roomie">Roommate</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>
        </div>

        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
              <input
                type="text"
                value={filters.ubicacion || ''}
                onChange={(e) => setFilters({ ...filters, ubicacion: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="Ciudad o zona"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto mín.
                </label>
                <input
                  type="number"
                  value={filters.presupuestoMin || ''}
                  onChange={(e) =>
                    setFilters({ ...filters, presupuestoMin: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presupuesto máx.
                </label>
                <input
                  type="number"
                  value={filters.presupuestoMax || ''}
                  onChange={(e) =>
                    setFilters({ ...filters, presupuestoMax: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  placeholder="∞"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={() => {
              setFilters({});
              onSearch({});
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};
