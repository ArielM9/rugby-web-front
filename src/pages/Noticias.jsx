// /src/pages/Noticias.jsx
import React, { useEffect, useState } from 'react';
import NewsCard2 from '../components/Card/NewsCard2';
import './Noticias.css';
import { fetchNoticias } from '../services/api-noticias'; // Importamos la función de la API

function Noticias() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const obtenerNoticias = async () => {
      // Verificamos si hay noticias en sessionStorage
      const noticiasCache = sessionStorage.getItem('noticias');
      if (noticiasCache) {
        setNews(JSON.parse(noticiasCache)); // Si hay, las cargamos del cache
      } else {
        const noticiasData = await fetchNoticias(); // Si no, llamamos a la API
        setNews(noticiasData); // Guardamos las noticias en el estado
      }
    };

    obtenerNoticias(); // Ejecutamos la función
  }, []); // Solo al montar el componente

  return (
    <div className="noticias-container">
      <h1>Noticias</h1>
      <div className="noticias-grid">
        {news && news.length > 0 ? (
          news.map((noticia, index) => (
            <NewsCard2 key={index} noticia={noticia} />
          ))
        ) : (
          <p>No hay noticias disponibles.</p> // Mensaje si no hay noticias
        )}
      </div>
    </div>
  );
}

export default Noticias;
