const API = "http://localhost:3000";

// Obtener todos los productos
export async function obtenerProductos() {
  const response = await fetch(`${API}/productos`);
  if (!response.ok) throw new Error("Error al obtener los productos");
  return await response.json();
}

// Obtener un producto por ID
export async function obtenerProductoPorId(id) {
  const response = await fetch(`${API}/productos/${id}`);
  if (!response.ok) throw new Error("Error al obtener el producto");
  return await response.json();
}

// Crear un nuevo producto
export async function crearProducto(producto) {
  const response = await fetch(`${API}/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error("Error al crear el producto");
  return await response.json();
}

// Actualizar un producto existente (PUT o PATCH)
export async function actualizarProducto(id, producto) {
  const response = await fetch(`${API}/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  });
  if (!response.ok) throw new Error("Error al actualizar el producto");
  return await response.json();
}

// Eliminar un producto
export async function eliminarProducto(id) {
  const response = await fetch(`${API}/productos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el producto");
}

// Reponer stock
export async function reponerStock(id, cantidad) {
  const resp = await fetch(`${API}/productos/${id}`);
  if (resp.ok) {
    const prod = await resp.json();
    await fetch(`${API}/productos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: prod.stock + cantidad })
    });
  }
}
