const API_URL = "http://127.0.0.1:8000/";

//Función para agregar favoritos sgún id de usuario y id de equipo o liga
export async function addFav(id_user, id, tipo) {
    try {
        const response = await fetch(`${API_URL}favorito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: id_user,
                favorito_id: id,
                tipo: tipo
            })
        });
        if (!response.ok) {
            throw new Error('Error al agregar el favorito');
        }
        console.log('Favorito agregado exitosamente');
        return response;
    } catch (error) {
        console.error('Error en addFav:', error);
    }
}