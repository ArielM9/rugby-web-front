import React, { useEffect, useState } from "react";
import "./Perfil.css";
import { eliminarFav } from "../services/eliminar-fav";
import { eliminarUsuario } from "../services/eliminar-usuario";

const Perfil = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const equipos = JSON.parse(localStorage.getItem("equipos")) || []; // Datos completos de equipos
  const ligas = JSON.parse(localStorage.getItem("ligas")) || []; // Datos completos de ligas

  const [favoritos, setFavoritos] = useState(JSON.parse(localStorage.getItem("favoritos")) || []);

  useEffect(() => {
    const handleStorageChange = () => {
      const nuevosFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
      setFavoritos(nuevosFavoritos);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("favoritos");
    window.location.href = "/";
  };

 const handleDeleteAccount = () => {
   if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
     const usuarioId = JSON.parse(localStorage.getItem('usuario')).id;
     eliminarUsuario(usuarioId)
       .then((response) => {
         console.log('Respuesta de la API:', response);
         if (response.ok) {
           console.log('Eliminando usuario y favoritos del localStorage...');
           localStorage.removeItem("usuario");
           localStorage.removeItem("favoritos");
           console.log('Redirigiendo a la página principal...');
           window.location.href = "/";
         } else {
           console.error('Error al eliminar el usuario:', response);
         }
       })
       .catch((error) => {
         console.error('Error al eliminar el usuario:', error);
       });
   }
 };

  const handleDeleteFavorite = async (id, tipo) => {
    try {
      // Intentar eliminar en la base de datos
      const usuarioId = JSON.parse(localStorage.getItem('usuario')).id;
      console.log('usuarioId:' + usuarioId);
      const response = await eliminarFav(usuarioId, id, tipo);

      if (response.ok) {
        // Eliminar del estado y localStorage solo si la API lo confirma
        const nuevosFavoritos = favoritos.filter((fav) => {
          return tipo === "equipo" ? fav.id_equipo !== id : fav.id_liga !== id;
        });
        
        setFavoritos(nuevosFavoritos); // Actualizar el estado
        localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos)); // Actualizar localStorage
      } else {
        console.error("Error al eliminar el favorito en la base de datos.");
      }
    } catch (error) {
      console.error("Hubo un error al conectar con la API:", error);
    }
  };

  const favoritosEquipos = favoritos
    .filter((fav) => fav.id_equipo !== null)
    .map((fav) => {
      const equipo = equipos.find((equipo) => equipo.id === fav.id_equipo);
      return { ...fav, nombre: equipo?.nombre, logo: equipo?.logo };
    });

  const favoritosLigas = favoritos
    .filter((fav) => fav.id_liga !== null)
    .map((fav) => {
      const liga = ligas.find((liga) => liga.id === fav.id_liga);
      return { ...fav, nombre: liga?.nombre, logo: liga?.logo };
    });

  return (
    <div className="perfil-container">
      {/* Información del usuario y botones */}
      <div className="perfil-header">
        <div>
          <h1>Perfil de Usuario</h1>
          {usuario && (
            <div>
              <p><strong>Nombre:</strong> {usuario.nombre}</p>
              <p><strong>Email:</strong> {usuario.email}</p>
            </div>
          )}
        </div>
        <div className="perfil-actions">
          <button className="btn btn-delete" onClick={handleDeleteAccount}>
            Eliminar Cuenta
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Tabla de favoritos */}
      <div className="favoritos-section">
        <h1>Favoritos</h1>
        <table className="favoritos-table">
          <thead>
            <tr>
              <th>Equipos</th>
              <th>Ligas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Equipos */}
              <td>
                {favoritosEquipos.length > 0 ? (
                  <ul>
                    {favoritosEquipos.map((fav) => (
                      <li key={fav.id_equipo} className="favorito-item">
                        <img src={fav.logo} alt={fav.nombre} className="favorito-logo" />
                        <span>{fav.nombre}</span>
                        <button onClick={() => handleDeleteFavorite(fav.id_equipo, "equipo")}>
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tienes equipos en favoritos.</p>
                )}
              </td>

              {/* Ligas */}
              <td>
                {favoritosLigas.length > 0 ? (
                  <ul>
                    {favoritosLigas.map((fav) => (
                      <li key={fav.id_liga} className="favorito-item">
                        <img src={fav.logo} alt={fav.nombre} className="favorito-logo" />
                        <span>{fav.nombre}</span>
                        <button onClick={() => handleDeleteFavorite(fav.id_liga, "liga")}>
                          Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No tienes ligas en favoritos.</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Perfil;
