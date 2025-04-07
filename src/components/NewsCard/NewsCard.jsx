import React from 'react';
import './NewsCard.css';
import { Link } from 'react-router-dom';

const NewsCard = ({ noticia }) => {
  const { title, description, image, date, link, source } = noticia;

  return (
    
    // <div className="news-card news-card-background" style={{ backgroundImage: `url(${image})` }}>
     <Link target='_blank' to={link}>
     <div className="news-card news-card-background" style={{ backgroundImage: `url(${image})` }}>
      {/* <img className="news-card-image" src={image} alt={title} />  */}

      <div className="news-card-content">
        <h2 className="news-card-title">{title}</h2>
        <p className="news-card-description">{description}</p>
        <p className="news-card-date">Fecha: {date}</p>
        <p className="news-card-source">Fuente: {source}</p>
      </div>
    </div>
    </Link>
  );
};

export default NewsCard;
