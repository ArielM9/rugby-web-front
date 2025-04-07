import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../../modals/Login"; // Modal de Login
import "./Header.css";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false); // Estado del menú hamburguesa
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal de login
  const [usuario, setUsuario] = useState(null); // Estado del usuario logueado
  const [searchTerm, setSearchTerm] = useState(""); // Estado del término de búsqueda

  // Efecto para verificar el estado del usuario desde LocalStorage
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado)); // Recuperar los datos del usuario
    }
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLoginClick = () => {
    setModalOpen(true); // Abrir el modal de login
  };

  const handleModalClose = () => {
    setModalOpen(false); // Cerrar el modal de login
    // Verificar si hay usuario después de cerrar el modal (por si se logueó)
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado)); // Actualizar estado del usuario
    }
  };

  return (
    <header className="header">
      {/* Sección del logo */}
      <Link to="/" className="header__logo">
        <img src="/logo4.png" alt="Logo"></img>
      </Link>

      {/* Menú hamburguesa para pantallas pequeñas */}
      <div className="header__hamburger" onClick={toggleMenu}>
        <span className="hamburger-icon">☰</span>
      </div>

      {/* Enlaces del menú */}
      <div className={`header__links ${menuVisible ? "visible" : ""}`}>
        <Link to="/datos">Equipos y Ligas</Link>
        <Link to="/noticias">Noticias</Link>
        {/* <IconoFav /> */}

        {/* Botón de Login o enlace al perfil del usuario */}
        <div className="header__login">
          {usuario ? (
            <Link to="/perfil" className="header__perfil-boton">
              {usuario.nombre}
            </Link>
          ) : (
            <Link to="#" className="header__links" onClick={handleLoginClick}>
              Login
            </Link>
          )}
          {modalOpen && <Modal isOpen={modalOpen} onClose={handleModalClose} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
