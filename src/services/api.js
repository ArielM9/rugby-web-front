const API_URL = "http://127.0.0.1:8000/";

export const fetchEquipos = async () => {
  try {
    const response = await fetch(API_URL + "equipos");  // Cambia esto por la URL correcta de tu API
    if (!response.ok) {
      throw new Error("Error al obtener equipos");
    }
    const data = await response.json();
    return data;  // Devuelve los equipos
  } catch (err) {
    throw new Error("Error al obtener los equipos de la API");
  }
};

export const fetchLigas = async () => {
  try {
    const response = await fetch(API_URL + "ligas");  // Cambia esto por la URL correcta de tu API
    if (!response.ok) {
      throw new Error("Error al obtener ligas");
    }
    const data = await response.json();
    return data;  // Devuelve las ligas
  } catch (err) {
    throw new Error("Error al obtener las ligas de la API");
  }
};
