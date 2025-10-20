import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import type { SearchType } from '../../types';

export const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    password: '',
    universidad: '',
    carrera: '',
    tipoBusqueda: 'ambos' as SearchType,
  });
  const [error, setError] = useState('');
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
      navigate('/profile/setup');
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 py-12 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Únete a TuPar</h1>
          <p className="text-gray-600">Crea tu cuenta y encuentra tu match perfecto</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                id="correo"
                name="correo"
                type="email"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="universidad" className="block text-sm font-medium text-gray-700 mb-2">
                Universidad
              </label>
              <input
                id="universidad"
                name="universidad"
                type="text"
                value={formData.universidad}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Universidad Nacional"
                required
              />
            </div>

            <div>
              <label htmlFor="carrera" className="block text-sm font-medium text-gray-700 mb-2">
                Carrera
              </label>
              <input
                id="carrera"
                name="carrera"
                type="text"
                value={formData.carrera}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="Ingeniería de Sistemas"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="tipoBusqueda" className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué estás buscando?
            </label>
            <select
              id="tipoBusqueda"
              name="tipoBusqueda"
              value={formData.tipoBusqueda}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              required
            >
              <option value="trabajo">Compañero de trabajo/proyectos</option>
              <option value="roomie">Roommate</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <a href="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Inicia sesión
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
