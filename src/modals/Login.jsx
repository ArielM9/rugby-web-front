import React, { useState } from "react";
import "./Login.css"; // Asumiendo que tendrás un archivo CSS para estilizar el modal
import { loginUsuario } from "../services/login"; // Importa el helper de login
import { registrarUsuario } from "../services/registro"; // Importa el helper de registro
import { fetchFavoritos } from "../services/favoritos"; // Importa el helper de favoritos

const Modal = ({ isOpen, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsRegister((prev) => !prev);
    setFormData({ email: "", password: "", name: "" });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError("Por favor, introduce un email válido.");
      return;
    }

    try {
      if (isRegister) {
        await registrarUsuario(formData.name, formData.email, formData.password);
        console.log("Usuario registrado con éxito");
      } else {
        const userData = await loginUsuario(formData.email, formData.password);
        console.log("Usuario logueado:", userData);

        // Guardar datos del usuario en LocalStorage
        const { id, email, nombre } = userData;
        localStorage.setItem(
          "usuario",
          JSON.stringify({ id, email, nombre }) // Almacenar datos relevantes
        );

        // Obtener favoritos del usuario
        const favoritos = await fetchFavoritos(id);

        window.location.href = "/";
      }

      onClose(); // Cerrar el modal al completar la operación
    } catch (err) {
      setError(err.message); // Mostrar mensaje de error
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{isRegister ? "Regístrate" : "Inicia sesión"}</h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn-primary">
            {isRegister ? "Registrarse" : "Iniciar sesión"}
          </button>
        </form>
        <p>
          {isRegister ? "¿Ya tienes una cuenta?" : "¿No tienes cuenta aún?"} 
          <button className="toggle-btn" onClick={toggleMode}>
            {isRegister ? "Inicia sesión" : "Regístrate"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Modal;
