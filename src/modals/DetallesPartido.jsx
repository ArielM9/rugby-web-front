import React, { useState, useEffect } from 'react';
import './DetallesPartido.css'; // Si tienes un archivo CSS para estilos
import { eliminarFav } from '../services/eliminar-fav'; // Importamos el helper
import {addFav} from '../services/add-fav'; 
import { fetchFavoritos } from '../services/favoritos';

const DetallesPartido = ({ partido, isOpen, onClose, onAddToFavorites }) => {
  if (!isOpen) return null; // No renderiza nada si el modal no está abierto

  const { equipoLocal, equipoVisitante, liga, fecha, hora } = partido;

  const [favoritos, setFavoritos] = useState([]);
  const [esFavorito, setEsFavorito] = useState({
    equipoLocal: false,
    equipoVisitante: false,
    liga: false,
  }); 

  useEffect(() => {
    // Cargar favoritos desde localStorage al abrir el modal
    if (isOpen) {
      const storedFavoritos = localStorage.getItem('favoritos');
      if (storedFavoritos) {
        const favoritosParsed = JSON.parse(storedFavoritos);
        setFavoritos(favoritosParsed);

        // Verificar si cada elemento del partido es un favorito
        setEsFavorito({
          equipoLocal: favoritosParsed.some((fav) => fav.id_equipo === equipoLocal?.id),
          equipoVisitante: favoritosParsed.some((fav) => fav.id_equipo === equipoVisitante?.id),
          liga: favoritosParsed.some((fav) => fav.id_liga === liga?.id),
        });
      }
    }
  }, [isOpen, equipoLocal, equipoVisitante, liga]);

  const handleToggleFavorito = (id, tipo) => {
    if (esFavorito[tipo]) {
      eliminarFavorito(id, tipo);
    } else {
      agregarFavorito(id, tipo);
    }
    
  };


  const handleOverlayClick = (event) => {
    // Cierra el modal si el clic ocurre en el overlay
    if (event.target.classList.contains('modal-overlay')) {
      setIsOpen(false);
    }
  };


  const agregarFavorito = async (id, tipo) => {
    
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    await addFav(usuario.id, id, getTipoEquipo(tipo));

    localStorage.removeItem('favoritos');
    fetchFavoritos(JSON.parse(localStorage.getItem('usuario')).id);

    const favoritosParsed = await fetchFavoritos(JSON.parse(localStorage.getItem('usuario')).id);
  setFavoritos(favoritosParsed);
  setEsFavorito({
    equipoLocal: favoritosParsed.some((fav) => fav.id_equipo === equipoLocal?.id),
    equipoVisitante: favoritosParsed.some((fav) => fav.id_equipo === equipoVisitante?.id),
    liga: favoritosParsed.some((fav) => fav.id_liga === liga?.id),
  });
    console.log('agregando:', usuario.id, id, tipo);
    // window.location.reload();
    // setEsFavorito({ ...esFavorito, [tipo]: true });
  };
  
  const eliminarFavorito = async (id, tipo) => {
    
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const tipoNuevo = getTipoEquipo(tipo);
    await eliminarFav(usuario.id, id, tipoNuevo);

    localStorage.removeItem('favoritos');
    fetchFavoritos(JSON.parse(localStorage.getItem('usuario')).id);

    localStorage.removeItem('favoritos');
    const favoritosParsed = await fetchFavoritos(JSON.parse(localStorage.getItem('usuario')).id);
    setFavoritos(favoritosParsed);
    setEsFavorito({
      equipoLocal: favoritosParsed.some((fav) => fav.id_equipo === equipoLocal?.id),
      equipoVisitante: favoritosParsed.some((fav) => fav.id_equipo === equipoVisitante?.id),
      liga: favoritosParsed.some((fav) => fav.id_liga === liga?.id),
    });

    console.log('eliminando:',usuario.id, id, tipoNuevo);
    // setEsFavorito({ ...esFavorito, [tipo]: false });
  };

  const getTipoEquipo = (tipo) => {
    if (tipo === 'equipoLocal' || tipo === 'equipoVisitante') {
      return 'equipo';
    } else {
      return tipo;
    }
  };

  useEffect(() => {
    const storedFavoritos = localStorage.getItem('favoritos');
    if (storedFavoritos) {
      const favoritosParsed = JSON.parse(storedFavoritos);
      setFavoritos(favoritosParsed);
  
      setEsFavorito({
        equipoLocal: favoritosParsed.some((fav) => fav.id_equipo === equipoLocal?.id),
        equipoVisitante: favoritosParsed.some((fav) => fav.id_equipo === equipoVisitante?.id),
        liga: favoritosParsed.some((fav) => fav.id_liga === liga?.id),
      });
    }
  }, [localStorage.getItem('favoritos')]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <div className="modal-header">
          <h2>Detalles del Partido</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Contenido principal */}
        <div className="modal-body">
          <p>
            <strong>Fecha:</strong> {new Date(fecha).toLocaleDateString()} <br />
            <strong>Hora:</strong> {new Date(hora * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p>
          <strong>Equipo Local:</strong> {equipoLocal?.nombre || 'Desconocido'}
<button onClick={() => esFavorito.equipoLocal ? eliminarFavorito(equipoLocal.id, 'equipoLocal') : agregarFavorito(equipoLocal.id, 'equipoLocal')}>
  {esFavorito.equipoLocal ? 'Eliminar favorito' : 'Añadir a Favoritos'}
</button>
          </p>
          <p>
          <strong>Equipo Visitante:</strong> {equipoVisitante?.nombre || 'Desconocido'}
<button onClick={() => esFavorito.equipoVisitante ? eliminarFavorito(equipoVisitante.id, 'equipoVisitante') : agregarFavorito(equipoVisitante.id, 'equipoVisitante')}>
  {esFavorito.equipoVisitante ? 'Eliminar favorito' : 'Añadir a Favoritos'}
</button>
          </p>
          <p>
          <strong>Liga:</strong> {liga?.nombre || 'Desconocido'}
<button onClick={() => esFavorito.liga ? eliminarFavorito(liga.id, 'liga') : agregarFavorito(liga.id, 'liga')}>
  {esFavorito.liga ? 'Eliminar favorito' : 'Añadir a Favoritos'}
</button>
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default DetallesPartido;
