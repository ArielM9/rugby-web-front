const API_URL = "http://127.0.0.1:8000/"	

// Función para obtener los favoritos por el id del usuario
export async function fetchFavoritos(id) {
    try {
            const response = await fetch(API_URL + 'favoritos/' + id);
            if (!response.ok) {
                    throw new Error('Error al obtener los favoritos');
            }
            const favoritos = await response.json();
            
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            return favoritos;
    } catch (error) {
            console.error('Error en fetchFavoritos:', error);
            throw error; // Permite manejar el error en el lugar donde se llama a la función
    }
}
