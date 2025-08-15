import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const apiImg = import.meta.env.VITE_API_IMG

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${apiUrl}/props`, {
          withCredentials: true,
        });
        setProperties(res.data);
      } catch (error) {
        console.error("Error al obtener las propiedades", error);
      }
    };
      
    fetchProperties();
  }, []);

  const handleSeeProperty = (id) => navigate(`/propiedades/${id}`);
  const handleAddProperty = () => navigate("/propiedades/nueva");
  const handleEditProperty = (id) => navigate(`/propiedades/editar/${id}`);

  const handleDeleteProperty = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta propiedad?");
    if (!confirm) return;

    try {
      await axios.delete(`${apiUrl}/prop/${id}`, {
        withCredentials: true,
      });

      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar la propiedad:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Propiedades</h1>
        <button
          onClick={handleAddProperty}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Agregar Propiedad
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition flex flex-col"
          >
            {/* Imagen */}
            <div className="h-44 md:h-40 w-full bg-gray-100">
              <img
                src={
                  property.imagen_lugar
                    ? `${apiImg}${
                        property.imagen_lugar.startsWith("/") ? "" : "/"
                      }${property.imagen_lugar}`
                    : "https://i.pinimg.com/736x/02/5a/68/025a68635acc04e38a3568406193297c.jpg"
                }
                alt="Imagen propiedad"
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>

            {/* Menú contextual */}
            <div className="absolute top-2 right-2 z-10">
              <button
                onClick={() =>
                  setOpenMenuId(openMenuId === property.id ? null : property.id)
                }
                className="bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full px-3 py-1 text-sm shadow"
              >
                ⋮
              </button>

              {openMenuId === property.id && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg text-sm z-50 overflow-hidden"
                >
                  <button
                    onClick={() => handleSeeProperty(property.id)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Ver propiedad
                  </button>
                  <button
                    onClick={() => handleEditProperty(property.id)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            {/* Info principal */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {property.direccion}
                </h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {property.descripcion_lugar}
                </p>

                <div className="flex flex-wrap gap-2 text-xs mt-2">
                  {property.tipo && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {property.tipo}
                    </span>
                  )}
                  {property.habitaciones !== undefined && (
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      {property.habitaciones} habitaciones
                    </span>
                  )}
                  <span
                    className={`${
                      property.estado
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    } px-2 py-0.5 rounded-full`}
                  >
                    {property.estado ? "Disponible" : "No disponible"}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleSeeProperty(property.id)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver Propiedad →
                </button>
              </div>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No hay propiedades cargadas.
          </div>
        )}
      </div>
    </div>
  );
}
