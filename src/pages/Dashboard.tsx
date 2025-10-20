import { useAuthStore } from '../stores/authStore';
import { useMatchStore } from '../stores/matchStore';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { matches, connectionRequests, favorites } = useMatchStore();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Conexiones activas',
      value: matches.filter((m) => m.estado === 'aceptado').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: 'bg-blue-500',
    },
    {
      title: 'Solicitudes pendientes',
      value: connectionRequests.received.filter((r) => r.estado === 'pendiente').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      color: 'bg-yellow-500',
    },
    {
      title: 'Favoritos',
      value: favorites.length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      color: 'bg-red-500',
    },
    {
      title: 'Solicitudes enviadas',
      value: connectionRequests.sent.filter((r) => r.estado === 'pendiente').length,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Bienvenido, {user?.nombre}
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.carrera} - {user?.universidad}
              </p>
            </div>
            <button
              onClick={() => navigate('/matching')}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              Buscar conexiones
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Connections */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Conexiones recientes</h2>
            {matches.filter((m) => m.estado === 'aceptado').length > 0 ? (
              <div className="space-y-4">
                {matches
                  .filter((m) => m.estado === 'aceptado')
                  .slice(0, 5)
                  .map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                          U
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Usuario conectado</p>
                          <p className="text-sm text-gray-600">
                            {match.porcentajeCompatibilidad}% de compatibilidad
                          </p>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        Ver chat
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Aún no tienes conexiones activas</p>
                <button
                  onClick={() => navigate('/matching')}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Comienza a buscar
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Requests */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Solicitudes pendientes</h3>
              {connectionRequests.received.filter((r) => r.estado === 'pendiente').length > 0 ? (
                <div className="space-y-3">
                  {connectionRequests.received
                    .filter((r) => r.estado === 'pendiente')
                    .slice(0, 3)
                    .map((request) => (
                      <div key={request.id} className="p-3 border border-gray-200 rounded-lg">
                        <p className="text-sm font-semibold text-gray-800 mb-2">Nueva solicitud</p>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-primary-600 text-white text-xs py-2 rounded hover:bg-primary-700">
                            Aceptar
                          </button>
                          <button className="flex-1 bg-gray-200 text-gray-700 text-xs py-2 rounded hover:bg-gray-300">
                            Rechazar
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No tienes solicitudes pendientes
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Acciones rápidas</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/profile/edit')}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Editar perfil
                </button>
                <button
                  onClick={() => navigate('/matching')}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Buscar nuevas conexiones
                </button>
                <button
                  onClick={() => navigate('/favorites')}
                  className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  Ver favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
