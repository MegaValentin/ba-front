import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutIcon from "../assets/icons/LogoutIcon";
import { Menu, X } from "lucide-react";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(window.scrollY);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Detecta scroll hacia arriba/abajo
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false); // scroll hacia abajo
      } else {
        setShowNavbar(true); // scroll hacia arriba
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar con animación */}
      <nav
        className={`bg-gray-800 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full shadow z-50 transition-transform duration-300 ease-in-out will-change-transform ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h2 className="text-xl font-bold">Bolivar alquileres</h2>

        {/* Botón menú móvil */}
        <button
          className="md:hidden block"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú escritorio */}
        <div className="hidden md:flex gap-6 items-center ml-8">
          <div className="relative">
            <button
              onClick={() => toggleDropdown("propietarios")}
              className="hover:underline"
            >
              Propietarios
            </button>
            {openDropdown === "propietarios" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-black shadow rounded w-48 z-50">
                <Link
                  to="/propietarios"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Ver Propietarios
                </Link>
                <Link
                  to="/propietarios/nuevo"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Agregar Propietario
                </Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown("propiedades")}
              className="hover:underline"
            >
              Propiedades
            </button>
            {openDropdown === "propiedades" && (
              <div className="absolute top-full mt-2 left-0 bg-white text-black shadow rounded w-48 z-50">
                <Link
                  to="/propiedades"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Ver Propiedades
                </Link>
                <Link
                  to="/propiedades/nueva"
                  onClick={() => setOpenDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Agregar Propiedad
                </Link>
              </div>
            )}
          </div>

          <Link to="/usuarios" className="hover:underline">
            Gestión de usuarios
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <LogoutIcon />
          </button>
        </div>
      </nav>

      {/* Espaciador para que el contenido no quede tapado */}
      <div className="h-20 md:h-[64px]"></div>

      {/* Menú móvil */}
      {mobileMenuOpen && (
        <div className="bg-gray-800 text-white px-6 py-4 md:hidden flex flex-col gap-4 fixed top-16 w-full z-40">
          <Link to="/propietarios" onClick={() => setMobileMenuOpen(false)}>
            Ver Propietarios
          </Link>
          <Link
            to="/propietarios/nuevo"
            onClick={() => setMobileMenuOpen(false)}
          >
            Agregar Propietario
          </Link>
          <Link to="/propiedades" onClick={() => setMobileMenuOpen(false)}>
            Ver Propiedades
          </Link>
          <Link
            to="/propiedades/nueva"
            onClick={() => setMobileMenuOpen(false)}
          >
            Agregar Propiedad
          </Link>
          <Link to="/usuarios" onClick={() => setMobileMenuOpen(false)}>
            Gestión de usuarios
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <LogoutIcon />
          </button>
        </div>
      )}

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
