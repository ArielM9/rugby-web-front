import { useEffect, useState } from "react";
import NavSemanas from "../components/NavSemanas/NavSemanas";
import { fetchEquipos, fetchLigas } from "../services/api";
import { fetchPartidos } from "../services/partidos";
import Carrusel from "../components/Carrusel/Carrusel";
import './Home.css';

const Home = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [ligas, setLigas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partidosFiltrados, setPartidosFiltrados] = useState([]);
  const [verMas, setVerMas] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cargar favoritos y estado de sesión al inicio
  useEffect(() => {
    const storedFavoritos = localStorage.getItem('favoritos');
    const storedUsuario = localStorage.getItem('usuario');
    
    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos));
    }
    
    if (storedUsuario) {
      setIsLoggedIn(true); // El usuario está logueado
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const storedEquipos = localStorage.getItem("equipos");
        const storedLigas = localStorage.getItem("ligas");

        if (storedEquipos && storedLigas) {
          setEquipos(JSON.parse(storedEquipos));
          setLigas(JSON.parse(storedLigas));
        } else {
          const equiposData = await fetchEquipos();
          const ligasData = await fetchLigas();
          localStorage.setItem("equipos", JSON.stringify(equiposData));
          localStorage.setItem("ligas", JSON.stringify(ligasData));
          setEquipos(equiposData);
          setLigas(ligasData);
        }

        const storedPartidos = sessionStorage.getItem("partidos");
        if (storedPartidos) {
          setPartidos(JSON.parse(storedPartidos));
        } else {
          const partidosData = await fetchPartidos();
          sessionStorage.setItem("partidos", JSON.stringify(partidosData));
          setPartidos(partidosData);
        }
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar partidos si hay favoritos
  const filtrarPartidosPorFavoritos = (partidos) => {
    console.log("Favoritos:", favoritos);  

    if (!isLoggedIn || !favoritos || favoritos.length === 0) {
      console.log("Sin favoritos o no logueado, mostrando todos los partidos");
      return partidos;
    }

    return partidos.filter(partido => {
      const esEquipoFavorito = favoritos.some(favorito => 
        favorito.id_equipo && 
        (partido.id_local === favorito.id_equipo || partido.id_visitante === favorito.id_equipo)
      );

      const esLigaFavorita = favoritos.some(favorito => 
        favorito.id_liga && 
        partido.liga_id === favorito.id_liga
      );

      const partidoFavorito = esEquipoFavorito || esLigaFavorita;
      console.log(`Partido ${partido.id_local} vs ${partido.id_visitante}: ${partidoFavorito ? "Favorito" : "No favorito"}`);
      return partidoFavorito;
    });
  };

  const handleVerMas = () => {
    setVerMas(!verMas);
  };

  useEffect(() => {
    const partidosFiltrados = filtrarPartidosPorFavoritos(partidos);
    if (verMas) {
      console.log("Mostrando todos los partidos");
      setPartidosFiltrados(partidos);
    } else {
      console.log("Mostrando partidos filtrados");
      setPartidosFiltrados(partidosFiltrados);
    }
  }, [partidos, favoritos, isLoggedIn, verMas]);

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="carrusel-container">
        <Carrusel />
      </div>
      <NavSemanas partidos={partidosFiltrados} />
      <button className="ver-mas-button" onClick={handleVerMas}>
        {verMas ? "Ver menos partidos" : "Ver más partidos"}
      </button>
    </div>
  );
};

export default Home;
