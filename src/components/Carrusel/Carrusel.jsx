import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchNoticias } from '../../services/api-noticias';

function Carrusel() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Verificamos si ya hay noticias en sessionStorage
    const noticiasCache = sessionStorage.getItem('noticias');

    if (noticiasCache) {
      // Si hay noticias en sessionStorage, las cargamos
      setNews(JSON.parse(noticiasCache).slice(0, 6)); // Tomamos solo las primeras 6 noticias
      
    } else {
      // Si no hay noticias en sessionStorage, las obtenemos de la API
      const obtenerNoticias = async () => {
        const noticiasData = await fetchNoticias(); // Obtenemos noticias de la API
        setNews(noticiasData.slice(0, 6)); // Tomamos solo las primeras 6 noticias
      };

      obtenerNoticias(); // Llamamos a la función cuando se monta el componente
    }
  }, []);

  // console.log(news);


  if (!news.length) {
    return <div>Cargando noticias...</div>;
  }

  return (
    <>
    <h1 className='carrusel-titulo'>Noticias</h1>
    <Swiper
      slidesPerView={2.5}
      spaceBetween={-85}
      
      navigation={true}
      className="mySwiper"
    >
      {news.map((noticia, index) => (
        <SwiperSlide key={index}>
          <NewsCard noticia={noticia} />
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
}

export default Carrusel;