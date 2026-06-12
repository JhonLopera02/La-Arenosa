export const BASE_URL = "http://localhost:3000";

export async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error al conectar con la API");
  }
  return response.json();
}

// Registra un nuevo usuario en la base de datos
export async function registrarUsuario(usuario) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  return handleResponse(response);
}

// Busca un usuario por email y contraseña para iniciar sesión
export async function loginUsuario(email, password) {
  const response = await fetch(`${BASE_URL}/users?email=${email}&password=${password}`);
  if (!response.ok) throw new Error("Error al conectar con la API");
  const usuarios = await response.json();
  return usuarios.length > 0 ? usuarios[0] : null;
}

// Guarda el usuario en localStorage (sesión activa)
export function guardarSesion(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Devuelve el usuario guardado en localStorage
export function obtenerSesion() {
  return JSON.parse(localStorage.getItem("usuario"));
}

// Elimina la sesión (logout)
export function cerrarSesion() {
  localStorage.removeItem("usuario");
}
