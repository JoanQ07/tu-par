import type { User } from '../../types';
import { useMatchStore } from '../../stores/matchStore';

interface MatchCardProps {
  user: User;
}

export const MatchCard = ({ user }: MatchCardProps) => {
  const { sendConnectionRequest, addToFavorites, favorites } = useMatchStore();
  const isFavorite = favorites.some((fav) => fav.id === user.id);

  const handleConnect = () => {
    sendConnectionRequest(user.id);
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      addToFavorites(user);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
        {user.fotoPerfil ? (
          <img src={user.fotoPerfil} alt={user.nombre} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
            {user.nombre.charAt(0)}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full ${
              isFavorite ? 'bg-red-500' : 'bg-white/80'
            } hover:scale-110 transition-transform`}
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'text-white' : 'text-gray-600'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{user.nombre}</h3>
          <p className="text-sm text-gray-600">{user.carrera}</p>
          <p className="text-xs text-gray-500">{user.universidad}</p>
        </div>

        {user.descripcion && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{user.descripcion}</p>
        )}

        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Intereses</p>
          <div className="flex flex-wrap gap-2">
            {user.intereses.slice(0, 4).map((interes) => (
              <span
                key={interes}
                className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full"
              >
                {interes}
              </span>
            ))}
            {user.intereses.length > 4 && (
              <span className="text-xs text-gray-500">+{user.intereses.length - 4} más</span>
            )}
          </div>
        </div>

        {user.habilidades.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Habilidades</p>
            <div className="flex flex-wrap gap-2">
              {user.habilidades.slice(0, 3).map((habilidad) => (
                <span
                  key={habilidad}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                >
                  {habilidad}
                </span>
              ))}
              {user.habilidades.length > 3 && (
                <span className="text-xs text-gray-500">+{user.habilidades.length - 3} más</span>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 items-center text-xs text-gray-600 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {user.ubicacion?.ciudad && (
            <span>
              {user.ubicacion.ciudad}
              {user.ubicacion.zona && `, ${user.ubicacion.zona}`}
            </span>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleConnect}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Conectar
          </button>
          <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Ver perfil
          </button>
        </div>
      </div>
    </div>
  );
};
