import React, { useEffect, useState } from 'react';
import './EquiposYLigas.css';
import { addFav } from '../services/add-fav';
import { eliminarFav } from '../services/eliminar-fav';

const ListaEquiposYLigas = () => {
    const [equipos, setEquipos] = useState([]);
    const [ligas, setLigas] = useState([]);
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                const equiposData = JSON.parse(localStorage.getItem('equipos')) || [];
                const ligasData = JSON.parse(localStorage.getItem('ligas')) || [];
                const favoritosData = JSON.parse(localStorage.getItem('favoritos')) || [];

                setEquipos(equiposData);
                setLigas(ligasData);
                setFavoritos(favoritosData);
            } catch (error) {
                console.error('Error fetching data from localStorage:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const storedFavoritos = localStorage.getItem('favoritos');
        if (storedFavoritos) {
            const favoritosParsed = JSON.parse(storedFavoritos);
            setFavoritos(favoritosParsed);
        }
    }, [localStorage.getItem('favoritos')]);

    const toggleFavorito = async (tipo, id) => {
        try {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const esFavorito = favoritos.some((fav) => (tipo === 'equipos' ? fav.id_equipo === id : fav.id_liga === id));
    
            if (esFavorito) {
                await eliminarFav(usuario.id, id, tipo === 'equipos' ? 'equipo' : 'liga');
            } else {
                await addFav(usuario.id, id, tipo === 'equipos' ? 'equipo' : 'liga');
            }
    
            const updatedFavoritos = esFavorito
                ? favoritos.filter((fav) => !(tipo === 'equipos' ? fav.id_equipo === id : fav.id_liga === id))
                : [...favoritos, tipo === 'equipos' ? { id_equipo: id } : { id_liga: id }];
    
            setFavoritos(updatedFavoritos);
            localStorage.setItem('favoritos', JSON.stringify(updatedFavoritos));
        } catch (error) {
            console.error('Error updating favoritos:', error);
        }
    };

    const renderList = (items, tipo) => {
        const grouped = items.reduce((acc, item) => {
            const { pais } = item;
            if (!acc[pais]) acc[pais] = [];
            acc[pais].push(item);
            return acc;
        }, {});

        return Object.keys(grouped).map((pais) => (
            <div key={pais} className="grupo-pais">
                <h3 className='pais'>{pais}</h3>
                <ul>
                    {grouped[pais].map((item) => {
                        const esFavorito = favoritos.some((fav) => (tipo === 'equipos' ? fav.id_equipo === item.id : fav.id_liga === item.id));

                        return (
                            <li key={item.id} className="item-lista">
                                <div className='item-logo'>
                                    <img src={item.logo} alt={`${item.nombre} logo`} className="logo" />
                                </div>
                                <div className='item-nombre'>{item.nombre}</div>
                                <button
                                    className={`boton-favorito ${esFavorito ? 'activo' : ''}`}
                                    onClick={() => toggleFavorito(tipo, item.id)}
                                >
                                    {esFavorito ? 'Eliminar favorito' : 'Añadir favorito'}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ));
    };

    return (
        <div className="contenedor-lista">
            <div className="columna">
                <h2>Equipos</h2>
                {renderList(equipos, 'equipos')}
            </div>
            <div className="columna">
                <h2>Ligas</h2>
                {renderList(ligas, 'ligas')}
            </div>
        </div>
    );
};

export default ListaEquiposYLigas;