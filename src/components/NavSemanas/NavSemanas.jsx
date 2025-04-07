import React, { useState } from 'react';
import Jornada from '../Jornada/Jornada';

const NavSemanas = ({ partidos }) => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekDates(0));
  const [weekLabel, setWeekLabel] = useState("Semana actual");

  // Función para obtener las fechas de la semana (lunes a domingo)
  function getCurrentWeekDates(offset = 0) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const dayOffset = currentDay === 0 ? -6 : 1 - currentDay;
    const startOfWeek = new Date(
      currentDate.setDate(currentDate.getDate() + dayOffset + offset)
    );

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return { startDate: startOfWeek, endDate: endOfWeek };
  }

  // Cambiar la semana actual
  const changeWeek = (direction) => {
    const newOffset = direction === "next" ? weekOffset + 7 : weekOffset - 7;
    setWeekOffset(newOffset);

    const newWeek = getCurrentWeekDates(newOffset);
    setCurrentWeek(newWeek);
    setWeekLabel(
      direction === "next" ? "Semana siguiente" : "Semana anterior"
    );
  };

  return (
    <div className="nav-semanas">
      <div className="nav-semanas__header">
        <button onClick={() => changeWeek("prev")}>Semana anterior</button>
        <h2>
          <div className='nav-semanas__semana'>{weekLabel}</div> 
          <div className='nav-semanas__fechas'>{currentWeek.startDate.toLocaleDateString()} -{" "}
          {currentWeek.endDate.toLocaleDateString()}</div>
        </h2>
        <button onClick={() => changeWeek("next")}>Semana siguiente</button>
      </div>

      {/* Pasamos los partidos filtrados a Jornada */}
      <Jornada weekDates={[currentWeek.startDate, currentWeek.endDate]} partidos={partidos} />
    </div>
  );
};

export default NavSemanas;
