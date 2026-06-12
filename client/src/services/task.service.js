const API = "http://localhost:3000";

// Trae todas las tareas de un usuario por su ID
export async function obtenerTareas(userId) {
  const response = await fetch(`${API}/task?userId=${userId}`);
  if (!response.ok) throw new Error("Error al obtener las tareas");
  return await response.json();
}

// Trae una sola tarea por su ID
export async function obtenerTareaPorId(id) {
  const response = await fetch(`${API}/task/${id}`);
  if (!response.ok) throw new Error("Error al obtener la tarea");
  return await response.json();
}

// Crea una tarea nueva
export async function crearTarea(tarea) {
  const response = await fetch(`${API}/task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!response.ok) throw new Error("Error al crear la tarea");
  return await response.json();
}

// Actualiza una tarea existente
export async function actualizarTarea(id, tarea) {
  const response = await fetch(`${API}/task/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tarea),
  });
  if (!response.ok) throw new Error("Error al actualizar la tarea");
  return await response.json();
}

// Elimina una tarea
export async function eliminarTarea(id) {
  const response = await fetch(`${API}/task/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la tarea");
}
