
// URL de la API de partidos
const API_URL = "http://127.0.0.1:8000/"; // Reemplaza con la URL de tu API real

export async function fetchPartidos() {
  try {
      const response = await fetch(API_URL + 'partidos/');
      if (!response.ok) {
          throw new Error('Error al obtener los partidos');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error en fetchPartidos:', error);
      throw error; // Permite manejar el error en el lugar donde se llama a la función
  }
}