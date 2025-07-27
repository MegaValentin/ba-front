import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddusersIcon from "../assets/icons/AddUsersIcon";
import UserIcon from "../assets/icons/UsersIcon";
import EmailIcon from "../assets/icons/EmailIcon";
import PhoneIcon from "../assets/icons/PhoneIcon";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Owners() {
  const [owners, setOwners] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const res = await axios.get(`${apiUrl}/owners`, {
          withCredentials: true,
        });
        setOwners(res.data);
      } catch (error) {
        console.error("Error al obtener los propietarios: ", error);
      }
    };

    fetchOwners();
  }, []);

  const handleSeeOwners = (id) => {
    navigate(`/propietarios/${id}`);
  };

  const handleAddOwner = () => {
    navigate("/propietarios/nuevo");
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">PROPIETARIOS</h1>
        <button
          onClick={handleAddOwner}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 transition duration-200"
        >
          <AddusersIcon />
          <span>Agregar Propietario</span>
        </button>
      </div>

      {/* Vista de tabla para pantallas grandes */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3 border-b">
                <div className="flex items-center gap-2">
                  <UserIcon />
                  <span>Nombre</span>
                </div>
              </th>
              <th className="px-6 py-3 border-b">
                <div className="flex items-center gap-2">
                  <EmailIcon />
                  <span>Email</span>
                </div>
              </th>
              <th className="px-6 py-3 border-b">
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <span>Teléfono</span>
                </div>
              </th>
              <th className="px-6 py-3 border-b text-center"></th>
            </tr>
          </thead>
          <tbody>
            {owners.length > 0 ? (
              owners.map((owner) => (
                <tr
                  key={owner.id}
                  className="even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4 border-b">{owner.name}</td>
                  <td className="px-6 py-4 border-b">{owner.email}</td>
                  <td className="px-6 py-4 border-b">{owner.phone}</td>
                  <td className="px-6 py-4 border-b text-center">
                    <button
                      onClick={() => handleSeeOwners(owner.id)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium transition"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No hay propietarios cargados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Vista tipo card para pantallas chicas */}
      <div className="md:hidden flex flex-col gap-4">
        {owners.length > 0 ? (
          owners.map((owner) => (
            <div
              key={owner.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <UserIcon className="w-5 h-5 text-blue-500" />
                {owner.name}
              </h2>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <EmailIcon className="w-4 h-4" />
                {owner.email}
              </p>
              <p className="text-gray-600 mt-1 flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                {owner.phone}
              </p>
              <button
                onClick={() => handleSeeOwners(owner.id)}
                className="mt-3 text-blue-600 hover:underline text-sm font-medium"
              >
                Ver detalles
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay propietarios cargados</p>
        )}
      </div>
    </div>
  );
}
