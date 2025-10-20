import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import type { PersonalityType } from '../../types';

export const ProfileSetup = () => {
  const { user, updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    intereses: [] as string[],
    habilidades: [] as string[],
    personalidad: '' as PersonalityType | '',
    descripcion: '',
    ubicacion: {
      ciudad: '',
      zona: '',
    },
    preferenciasRoomie: user?.tipoBusqueda !== 'trabajo' ? {
      presupuesto: 0,
      habitosLimpieza: 'normal' as const,
      habitosRuido: 'normal' as const,
      fumador: false,
      mascotas: false,
    } : undefined,
  });

  const [currentInput, setCurrentInput] = useState('');

  const handleAddTag = (field: 'intereses' | 'habilidades') => {
    if (currentInput.trim() && !formData[field].includes(currentInput.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], currentInput.trim()],
      });
      setCurrentInput('');
    }
  };

  const handleRemoveTag = (field: 'intereses' | 'habilidades', tag: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Completa tu perfil</h2>
            <p className="text-gray-600">Paso {step} de 3</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intereses
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag('intereses');
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Ej: programación, música, deportes..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('intereses')}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.intereses.map((interes) => (
                      <span
                        key={interes}
                        className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {interes}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('intereses', interes)}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Habilidades
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag('habilidades');
                        }
                      }}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Ej: React, Photoshop, inglés..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTag('habilidades')}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Agregar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.habilidades.map((habilidad) => (
                      <span
                        key={habilidad}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {habilidad}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag('habilidades', habilidad)}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción personal
                  </label>
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="Cuéntanos un poco sobre ti..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personalidad
                  </label>
                  <select
                    value={formData.personalidad}
                    onChange={(e) =>
                      setFormData({ ...formData, personalidad: e.target.value as PersonalityType })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Selecciona...</option>
                    <option value="introvertido">Introvertido</option>
                    <option value="extrovertido">Extrovertido</option>
                    <option value="ambos">Un poco de ambos</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ciudad</label>
                    <input
                      type="text"
                      value={formData.ubicacion.ciudad}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ubicacion: { ...formData.ubicacion, ciudad: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Bogotá"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona (opcional)
                    </label>
                    <input
                      type="text"
                      value={formData.ubicacion.zona}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ubicacion: { ...formData.ubicacion, zona: e.target.value },
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      placeholder="Chapinero"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && user?.tipoBusqueda !== 'trabajo' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Preferencias de Roommate</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Presupuesto mensual (COP)
                  </label>
                  <input
                    type="number"
                    value={formData.preferenciasRoomie?.presupuesto || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferenciasRoomie: {
                          ...formData.preferenciasRoomie!,
                          presupuesto: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    placeholder="800000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hábitos de limpieza
                  </label>
                  <select
                    value={formData.preferenciasRoomie?.habitosLimpieza}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferenciasRoomie: {
                          ...formData.preferenciasRoomie!,
                          habitosLimpieza: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="ordenado">Muy ordenado</option>
                    <option value="normal">Normal</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nivel de ruido
                  </label>
                  <select
                    value={formData.preferenciasRoomie?.habitosRuido}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferenciasRoomie: {
                          ...formData.preferenciasRoomie!,
                          habitosRuido: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="silencioso">Silencioso</option>
                    <option value="normal">Normal</option>
                    <option value="ruidoso">Ruidoso/Fiestas</option>
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.preferenciasRoomie?.fumador}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferenciasRoomie: {
                            ...formData.preferenciasRoomie!,
                            fumador: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Fumador</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.preferenciasRoomie?.mascotas}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferenciasRoomie: {
                            ...formData.preferenciasRoomie!,
                            mascotas: e.target.checked,
                          },
                        })
                      }
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Mascotas</span>
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Anterior
                </button>
              )}
              {step < (user?.tipoBusqueda !== 'trabajo' ? 3 : 2) ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Siguiente
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Completar perfil
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
