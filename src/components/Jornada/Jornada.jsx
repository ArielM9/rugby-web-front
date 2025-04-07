import React, { useEffect, useState } from 'react';
import Partido from '../Partido/Partido';

const Jornada = ({ weekDates, partidos }) => {
  const [partidosFiltrados, setPartidosFiltrados] = useState([]);

  useEffect(() => {
    // Filtrar los partidos según las fechas de la semana (weekDates)
    const filteredPartidos = partidos.filter(
      (partido) =>
        new Date(partido.fecha) >= weekDates[0] && new Date(partido.fecha) <= weekDates[1]
    );
    setPartidosFiltrados(filteredPartidos);
  }, [weekDates, partidos]); // Re-ejecutar cuando las fechas de la semana o los partidos cambian

  // console.log(partidosFiltrados);
  return (
    <div className="jornada">
      {partidosFiltrados.length > 0 ? (
        partidosFiltrados.map((partido, index) => (
          <Partido key={index} partido={partido} />
        ))
      ) : (
        <p>No hay partidos para esta semana.</p>
      )}
    </div>
  );
};

export default Jornada;
