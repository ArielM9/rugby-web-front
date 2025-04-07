import React from "react";
import "../Styles/carrousel.css";
import Carousel from "react-grid-carousel";
import Card from "./Card";


const Carrousel = () => {
    return (
        

        <div className="carrusel">
            <Card />
            <Card />        
            <Card />
        </div>
      );
};

export default Carrousel;