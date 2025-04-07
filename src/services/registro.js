export async function registrarUsuario(nombre, email, password) {
    const url = "http://127.0.0.1:8000/registro"; // Cambia por la URL real de tu API.

    const data = {
        nombre: nombre,
        email: email,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al registrar usuario");
        }

        const result = await response.json();
        return result; // Mensaje de éxito
    } catch (error) {
        console.error("Error en registrarUsuario:", error.message);
        throw error;
    }
}
