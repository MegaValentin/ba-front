import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import HouseIcon from "../assets/icons/HouseIcon";

const apiUrl = import.meta.env.VITE_API_URL;

export default function NewProperty() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    direccion: "",
    coordenada: "",
    descripcion_lugar: "",
    estado: true,
    propietario_id: "",
    habitaciones: 1,
    tipo: "casa",
  });
  const [ imagenes, setImagenes ] = useState([])
  const [ preview, setPreview ] = useState([])
  const [error, setError] = useState("");
  const [ success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImagenes(files)
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const requiredFields = ["direccion", "coordenada", "descripcion_lugar", "propietario_id"];
    if(requiredFields.some((field) => !formData[field])){
      setError("Por favor, completá todos los obligatorios")
      return
    }

    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, value]) =>{
        data.append(key, value)
      })

      imagenes.forEach((img) => {
        data.append("imagenes", img)
      })

      await axios.post(`${apiUrl}/addprop`, data, {
        withCredentials: true,
        headers:{"Content-Type": "multipart/form-data"}
      })

      setSuccess("Propiedad agregada correctamente")
      setError("")
      setTimeout(() => navigate("/propiedades"), 1500)

    } catch (error) {
      console.error(error)
      setError("Hubo un error al agregar la propiedad")
    } finally {
      setLoading(false)
    }

  }
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <HouseIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Agregar Propiedad</h2>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dirección */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Ej: Ameghino 123"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Coordenadas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coordenadas *</label>
          <input
            type="text"     
            name="coordenada"
            value={formData.coordenada}
            onChange={handleChange}
            placeholder="-36.25, -60.10"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imágenes</label>
          <input
            type="file"
            multiplec
            name="imagenes" 
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {preview.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {preview.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
          <textarea
            name="descripcion_lugar"
            value={formData.descripcion_lugar}
            onChange={handleChange}
            rows="3"
            placeholder="Descripción detallada del lugar..."
            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
        </div>

        {/* Estado */}
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
  <select
    name="estado"
    value={formData.estado}
    onChange={(e) =>
      setFormData((data) => ({
        ...data,
        estado: e.target.value === "true", // convertir string a boolean
      }))
    }
    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="true">Disponible</option>
    <option value="false">Ocupada</option>
  </select>
</div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="casa">Casa</option>
            <option value="departamento">Departamento</option>
            <option value="local">Local</option>
            <option value="monoambiente">Monoambiente</option>
          </select>
        </div>

        {/* Propietario ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Propietario ID *</label>
          <input
            type="number"
            name="propietario_id"
            value={formData.propietario_id}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            min={1}
          />
        </div>

        {/* Habitaciones */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
          <input
            type="number"
            name="habitaciones"
            value={formData.habitaciones}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            min={1}
          />
        </div>

        {/* Botón */}
        <div className="col-span-1 md:col-span-2 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 w-full text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
          >
            {loading ? "Guardando..." : "Guardar Propiedad"}
          </button>
        </div>
      </form>
    </div>
  );
}
