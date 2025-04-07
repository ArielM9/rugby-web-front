import React from 'react';
import './NewsCard2.css';
import { Link } from 'react-router-dom';

const NewsCard2 = ({ noticia }) => {
  const { title, description, image, date, link, source } = noticia;

  return (
    
    // <div className="news-card news-card-background" style={{ backgroundImage: `url(${image})` }}>
     <Link target='_blank' to={link}>
     <div className="news-card2 news-card-background2" style={{ backgroundImage: `url(${image})` }}>
      {/* <img className="news-card-image" src={image} alt={title} />  */}

      <div className="news-card-content2">
        <h2 className="news-card-title2">{title}</h2>
        <p className="news-card-description2">{description}</p>
        <p className="news-card-date2">Fecha: {date}</p>
        <p className="news-card-source2">Fuente: {source}</p>
      </div>
    </div>
    </Link>
  );
};

export default NewsCard2;
