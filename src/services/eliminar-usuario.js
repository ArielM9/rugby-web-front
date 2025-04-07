const API_URL = "http://127.0.0.1:8000/";

//Eliminar usuario por id
export async function eliminarUsuario(id) {
    try {
        const response = await fetch(`${API_URL}usuario/${id}`, {
            method: "DELETE",    
        });

        console.log(`${API_URL}usuario/${id}`);
        
        if (!response.ok) {
            throw new Error("Error al eliminar el usuario");
        }
    
        console.log(response)  
        return response;
        
    } catch (error) {
        console.error("Error en eliminarUsuario:", error);
        throw error; // Permite manejar el error en el lugar donde se llama a la función
    }
}