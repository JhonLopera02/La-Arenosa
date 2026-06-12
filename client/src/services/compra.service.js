const API = "http://localhost:3000";

// Obtener todas las compras registradas
export async function obtenerTodasLasCompras() {
  const response = await fetch(`${API}/compras`);
  if (!response.ok) throw new Error("Error al obtener las compras");
  return await response.json();
}

// Obtener las compras de un usuario específico
export async function obtenerComprasPorUsuario(userId) {
  const response = await fetch(`${API}/compras?userId=${userId}`);
  if (!response.ok) throw new Error("Error al obtener el historial de compras");
  return await response.json();
}

// Procesar una nueva compra y descontar stock
export async function procesarCompra(usuarioId, items) {
  const total = items.reduce((sum, i) => {
    const precioUnitario = i.esOferta ? i.precio - (i.precio * (i.descuento/100)) : i.precio;
    return sum + (precioUnitario * i.cantidad);
  }, 0);
  const totalFinal = total > 50000 ? total - (total * 0.1) : total;

  const compra = {
    usuarioId,
    items,
    total: totalFinal,
    fecha: new Date().toLocaleDateString(),
    estado: "Pendiente"
  };

  const response = await fetch(`${API}/compras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(compra),
  });
  if (!response.ok) throw new Error("Error al registrar la compra");

  // Reducir stock
  for (const item of items) {
    const resp = await fetch(`${API}/productos/${item.id}`);
    if(resp.ok) {
       const prod = await resp.json();
       await fetch(`${API}/productos/${item.id}`, {
         method: "PATCH",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ stock: prod.stock - item.cantidad })
       });
    }
  }

  return await response.json();
}

export async function actualizarEstadoCompra(id, estado) {
  const response = await fetch(`${API}/compras/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado }),
  });
  if (!response.ok) throw new Error("Error al actualizar la compra");
  return await response.json();
}

export async function cancelarCompra(id) {
  return actualizarEstadoCompra(id, "Cancelado");
}
