    import { useState } from "react"
    import axios from "axios"
    import { useNavigate } from "react-router-dom"

    export default function NewOwners() {
      const [ formData, setFormData ] = useState({
        name: "",
        phone: "",
        red_social: "",
        email: "",
        imagen_propietario: ""
      })

      const [ error, setError] = useState("")
      const [ success, setSuccess ] = useState("")
      const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL;
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        setError("");
      };

      const handleSubmit = async (e) => {
        e.preventDefault()

        if(!formData.name || !formData.phone || !formData.email ){
          setError("Los campos nombre, telefono y email son obligatorios")
        }

        try {
          await axios.post(`${apiUrl}/add-owner`, formData, {
            withCredentials: true
          })

          setSuccess("Propietario agregado correctamente")
          setTimeout(() => {
            navigate("/propietarios")

          }, 1500)
        } catch (error) {
          setError("Error al agregar el propietario")
          console.error(error)
        }
      }
      return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Agregar Propietario</h2>

          {error && <p className="text-red-600 mb-2">{error}</p>}
          {success && <p className="text-green-600 mb-2">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="red_social"
              placeholder="Red social (opcional)"
              value={formData.red_social}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="imagen_propietario"
              placeholder="URL de imagen (opcional)"
              value={formData.imagen_propietario}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Agregar
            </button>
          </form>
        </div>
      )
    }