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
    estado: "disponible",
    propietario_id: "",
    habitaciones: 1,
    tipo: "casa",
    imagen_lugar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["direccion", "coordenada", "descripcion_lugar", "propietario_id"];
    const hasEmpty = requiredFields.some((field) => !formData[field]);

    if (hasEmpty) {
      setError("Por favor, completá todos los campos obligatorios.");
      return;
    }

    try {
      await axios.post(`${apiUrl}/addprop`, formData, {
        withCredentials: true,
      });
      setSuccess("Propiedad agregada correctamente");
      setError("");
      setTimeout(() => {
        navigate("/propiedades");
      }, 1500);
    } catch (error) {
      setError("Hubo un error al agregar la propiedad.", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <HouseIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Agregar Propiedad</h2>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (URL)</label>
          <input
            type="text"
            name="imagen_lugar"
            value={formData.imagen_lugar}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="disponible">Disponible</option>
            <option value="vendido">Vendido</option>
            <option value="alquilado">Alquilado</option>
          </select>
        </div>

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

        <div className="col-span-1 md:col-span-2 pt-4">
          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Guardar Propiedad
          </button>
        </div>
      </form>
    </div>
  );
}
