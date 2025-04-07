const API_URL = "http://127.0.0.1:8000/";

//Función para eliminar un favorito
export async function eliminarFav(usuarioId,id, tipo) {
  try {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario);
    const response = await fetch(`${API_URL}favorito`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_id: usuarioId, 
        favorito_id: id,
        tipo: tipo
      })
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el favorito');
    }
    console.log('Favorito eliminado exitosamente');
    return response;
    
  } catch (error) {
    console.error('Error en eliminarFav:', error);
  }
}