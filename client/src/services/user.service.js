const API = "http://localhost:3000";

// Obtiene todos los usuarios (solo para admin)
export async function obtenerTodosLosUsuarios() {
  const response = await fetch(`${API}/users`);
  if (!response.ok) throw new Error("Error al obtener los usuarios");
  return await response.json();
}

// Actualiza los datos de un usuario
export async function actualizarUsuario(id, datos) {
  const response = await fetch(`${API}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (!response.ok) throw new Error("Error al actualizar el usuario");
  return await response.json();
}

// Elimina un usuario
export async function eliminarUsuario(id) {
  const response = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el usuario");
}
