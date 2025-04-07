export async function loginUsuario(email, password) {
    const url = "http://127.0.0.1:8000/login"; // Cambia por la URL real de tu API.

    const data = {
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
            throw new Error(errorData.detail || "Error al iniciar sesión");
        }

        const result = await response.json();
        return result; // Contiene id, email y nombre del usuario
        console.log(result);
    } catch (error) {
        console.error("Error en loginUsuario:", error.message);
        throw error;
    }
}
