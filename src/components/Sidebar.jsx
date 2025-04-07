import React from "react";
import "../Styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
          <li className="sidebar-item"><a href="#">Login</a></li>
          <li className="sidebar-item"><a href="#">Equipos</a></li>
          <li className="sidebar-item"><a href="#">Ligas</a></li>
          <li className="sidebar-item"><a href="#">Mas partidos</a></li>
          <li className="sidebar-item"><a href="#">Noticias</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;