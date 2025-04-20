// login.js
import { usuarios } from '../app/usuarios.js';

const mensaje = document.getElementById("mensaje");
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("loginCorreo").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;

    // Buscar usuario con correo y contraseña coincidentes
    const usuario = usuarios.find(u =>
        (u.correo === correo || u.correo === correo) &&
        (u.contraseña === password || u.contraseña === password)
    );

    if (!usuario) {
        mensaje.style.display = "block";
        mensaje.style.color = "red";
        mensaje.textContent = "Correo o contraseña incorrectos.";
        return;
    }

    // Si el usuario existe pero no tiene rol definido
    if (!usuario.rol) {
        mensaje.style.display = "block";
        mensaje.style.color = "orange";
        mensaje.textContent = "Tu cuenta no tiene un rol asignado.";
        return;
    }

    // Redirección según rol
    mensaje.style.display = "none";
    switch (usuario.rol.toLowerCase()) { // Convertir a minúsculas por si acaso
        case "alumno":
            window.location.href = "../modulo_landing_usuario.html";
            break;
        case "profesor":
            window.location.href = "../modulo_landing_profesor.html";
            break;
        case "pas":
            window.location.href = "../modulo_landing_pas.html";
            break;
        default:
            mensaje.style.display = "block";
            mensaje.style.color = "orange";
            mensaje.textContent = "Rol no reconocido.";
            break;
    }
});