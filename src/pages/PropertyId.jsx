import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyMap from "../components/PropertyMap";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export default function PropertyId() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${apiUrl}/prop/${id}`, {
          withCredentials: true,
        });
        setProperty(res.data);
      } catch (err) {
        console.error("Error al obtener la propiedad: ", err);
        setError("No se pudo cargar la propiedad.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, apiUrl]);


  if (loading) return <SkeletonProperty />;

  if (error)
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );

  if (!property)
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-700">
          Propiedad no encontrada.
        </div>
      </div>
    );

  const hasCoords =
    typeof property.lat === "number" &&
    !Number.isNaN(property.lat) &&
    typeof property.lng === "number" &&
    !Number.isNaN(property.lng);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Imagen */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
          {property.imagen_lugar ? (
            <img
              src={property.imagen_lugar}
              alt={property.direccion}
              className="w-full aspect-[16/9] object-cover"
            />
          ) : (
            <div className="w-full aspect-[16/9] bg-gray-100 flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
          </div>

          {/* Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {property.direccion}
              </h1>
              <span
                className={`text-xs uppercase tracking-wide px-2 py-1 rounded-full ${
                  property.estado
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {property.estado ? "Disponible" : "No disponible"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge>{property.tipo}</Badge>
              {property.habitaciones ? (
                <Badge>{property.habitaciones} hab.</Badge>
              ) : null}
              <span className="text-sm text-gray-500">
                Propietario ID: {property.propietario_id}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {property.descripcion_lugar}
            </p>
          </div>
        </div>

        {/* Columna lateral (mapa) */}
        <aside className="lg:sticky lg:top-8 h-fit space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            
            {hasCoords ? (
              <div className="h-[420px] rounded-xl overflow-hidden">
                <PropertyMap
                  lat={Number(property.lat)}
                  lng={Number(property.lng)}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Coordenadas no disponibles.
              </p>
            )}

            
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ----------------- UI helpers ----------------- */

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
      {children}
    </span>
  );
}

function SkeletonProperty() {
  return (
  

    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border">
            <div className="w-full aspect-[16/9] bg-gray-200" />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6 border space-y-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-20 w-full bg-gray-200 rounded" />
        </div>
        </div>
        <aside className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 border">
            <div className="h-5 w-28 bg-gray-200 rounded mb-4" />
            <div className="h-[420px] bg-gray-200 rounded-xl" />
          </div>
        </aside>
      </div>
    </div>
   
  );
}
