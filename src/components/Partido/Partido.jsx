import React, { useEffect, useState } from 'react';
import DetallesPartido from '../../modals/DetallesPartido'; // Usamos el nombre correcto del modal

const Partido = ({ partido }) => {
  const [datos, setDatos] = useState({
    equipoLocal: null,
    equipoVisitante: null,
    liga: null
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const { fecha, hora, id_local, id_visitante, liga_id } = partido;

  useEffect(() => {
    // Cargar los equipos y liga desde el localStorage
    const cargarDatos = () => {
      const storedEquipos = localStorage.getItem("equipos");
      const storedLigas = localStorage.getItem("ligas");

      if (storedEquipos && storedLigas) {
        const equipos = JSON.parse(storedEquipos);
        const ligas = JSON.parse(storedLigas);

        // Buscar los datos del equipo local, visitante y liga por ID
        const equipoLocalData = equipos.find(equipo => equipo.id === id_local);
        const equipoVisitanteData = equipos.find(equipo => equipo.id === id_visitante);
        const ligaData = ligas.find(liga => liga.id === liga_id);

        setDatos({
          equipoLocal: equipoLocalData,
          equipoVisitante: equipoVisitanteData,
          liga: ligaData
        });
      }
    };

    cargarDatos(); // Llamada a la función que carga los datos desde localStorage
  }, [id_local, id_visitante, liga_id]); // Dependencias para recargar los datos cuando los IDs cambian

  const horaFormato = new Date(hora * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Función para abrir el modal
  const handleOpenModal = () => {
    const usuarioLogueado = localStorage.getItem("usuario");
    if (usuarioLogueado) {
      setIsModalOpen(true);
    } else {
      console.log("Debes estar logueado para abrir el modal");
    }
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función para añadir a favoritos
  const handleAddToFavorites = (id, tipo) => {
    console.log(`Añadiendo a favoritos: ${tipo} con ID ${id}`);
    // Aquí puedes implementar la lógica para añadir a favoritos (integración con la API)
  };

  const usuarioLogueado = localStorage.getItem("usuario");

  return (
    <div className="partido" className={`partido ${usuarioLogueado ? 'clickeable' : 'no-clickeable'}`} onClick={usuarioLogueado ? handleOpenModal : null}>
      <div className="partido__info">
        <p className="partido__fecha">{new Date(fecha).toLocaleDateString()} </p>
        <div className=" partido__hora ">{horaFormato}</div> 
        <div className='partido__equipos'>
          {datos.equipoLocal ? (
            
              <div className='partido__local'>
              <div class="imagen-contenedor">
                <img src={datos.equipoLocal.logo} alt={datos.equipoLocal.nombre} width="30" height="30" />
              </div>
                {datos.equipoLocal.nombre}
              </div>
            
          ) : 'Equipo local'}
           
           

          {datos.equipoVisitante ? (
            
              <div className='partido__visitante'>
                {datos.equipoVisitante.nombre}
                <div class="imagen-contenedor">
                  <img src={datos.equipoVisitante.logo} alt={datos.equipoVisitante.nombre} width="30" height="30" />
                </div>
              </div>
            
          ) : 'Equipo visitante'}
        </div>
        
        <p cassName="partido__liga"><strong>Liga:</strong> {datos.liga ? datos.liga.nombre : 'Liga desconocida'}</p>
      </div>

      {/* Modal */}
      <DetallesPartido
        partido={{ ...datos, fecha, hora }} // Pasamos todos los datos del partido al modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToFavorites={handleAddToFavorites}
      />
    </div>
  );
};

export default Partido;