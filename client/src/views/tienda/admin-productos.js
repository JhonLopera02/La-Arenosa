import { obtenerProductos, eliminarProducto } from "../../services/producto.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER } from "../../utils/icons.js";

export function renderAdminProductos() {
  const usuario = obtenerSesion();
  if (!usuario?.role.includes("ADMIN")) {
    navigate("/");
    return "";
  }

  return COMMON_HEADER + `
      <!-- Acciones Derecha -->
      <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
        <div style="position:relative; cursor:pointer;" id="account-dropdown-trigger">
          <div style="text-align:center; font-size:12px; color:#555;">
            <div style="display:flex; justify-content:center; color:#e62e04;">${svgs.admin}</div>
            <div style="font-weight:600; white-space:nowrap; margin-top:2px; color:#e62e04;">Admin</div>
          </div>
          <div id="account-menu" style="display:none; position:absolute; right:0; top:110%; background:#fff; border:1px solid #e8e8e8; min-width:180px; box-shadow:0 4px 16px rgba(0,0,0,0.12); z-index:200; border-radius:4px; overflow:hidden;">
            <a href="/admin" data-link style="display:block; padding:10px 14px; font-size:13px; font-weight:700; color:#e62e04; text-decoration:none; border-bottom:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Panel Principal</a>
            <button id="logout-btn" style="width:100%; text-align:left; padding:10px 14px; font-size:13px; color:#e62e04; border:none; background:none; cursor:pointer;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:32px 0;">
  <div class="ali-container">
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
      <div>
        <h1 class="ali-section-title" style="font-size:24px; color:#e62e04;">Inventario de Productos</h1>
        <p style="font-size:14px; color:#777; margin:8px 0 0;">Gestión del catálogo de La Arenosa.</p>
      </div>
      <div>
        <a href="/producto-form" data-link class="ali-btn" style="display:flex; align-items:center; gap:6px;">${svgs.plus} Nuevo Producto</a>
      </div>
    </div>

    <!-- Lista de Productos -->
    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px;">
      <div style="padding:16px 20px; border-bottom:1px solid #f0f0f0; display:flex; gap:16px;">
        <input type="text" id="search-inventory" placeholder="Buscar por nombre o categoría..." class="ali-search" style="max-width:300px; border-radius:2px; border-right:2px solid var(--ali-red);" />
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="background:#f9f9f9; font-size:11px; color:#777; text-transform:uppercase;">
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8; width:50px;">Img</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Detalles</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Precio & Stock</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8; text-align:right;">Acciones</th>
            </tr>
          </thead>
          <tbody id="inventory-tbody">
            <tr><td colspan="4" style="padding:20px; text-align:center; color:#aaa; font-size:13px;">Cargando inventario...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export async function setupAdminProductos() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  const tbody = document.getElementById("inventory-tbody");
  const searchInput = document.getElementById("search-inventory");
  let todosProductos = [];

  async function cargarLista() {
    try {
      todosProductos = await obtenerProductos();
      todosProductos.sort((a,b) => b.id - a.id);
      renderTabla(todosProductos);
    } catch {
      tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; text-align:center; color:#e62e04;">Error cargando inventario.</td></tr>`;
    }
  }

  function renderTabla(productos) {
    if(productos.length === 0){
      tbody.innerHTML = `<tr><td colspan="4" style="padding:20px; text-align:center; color:#aaa; font-size:13px;">No hay productos.</td></tr>`;
      return;
    }
    tbody.innerHTML = productos.map(p => {
      const stockColor = p.stock <= 10 ? (p.stock === 0 ? "#f5222d" : "#e62e04") : "#52c41a";
      const stockBg = p.stock <= 10 ? (p.stock === 0 ? "#fff1f0" : "#fff1ee") : "#f6ffed";
      const stockBorder = p.stock <= 10 ? (p.stock === 0 ? "#ffa39e" : "#ffd6cc") : "#b7eb8f";

      return `
      <tr style="border-bottom:1px solid #f0f0f0; transition:background .15s;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='transparent'">
        <td style="padding:12px 20px;">
          <img src="${p.imagen}" alt="${p.nombre}" style="width:40px; height:40px; object-fit:cover; border-radius:2px; border:1px solid #e8e8e8;" />
        </td>
        <td style="padding:12px 20px;">
          <p style="font-size:13px; font-weight:700; color:#222; margin:0 0 2px;">${p.nombre}</p>
          <div style="display:flex; gap:6px; align-items:center;">
            <span style="font-size:10px; font-weight:700; background:#f0f0f0; color:#555; padding:2px 6px; border-radius:2px;">${p.categoria}</span>
            ${p.esOferta ? `<span style="font-size:10px; font-weight:800; background:#fff1ee; color:#e62e04; padding:2px 6px; border-radius:2px;">🔥 -${p.descuento}%</span>` : ""}
          </div>
        </td>
        <td style="padding:12px 20px;">
          <p style="font-size:14px; font-weight:800; color:#e62e04; margin:0 0 4px;">$${p.precio.toLocaleString()}</p>
          <span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:2px; background:${stockBg}; color:${stockColor}; border:1px solid ${stockBorder};">
            Stock: ${p.stock}
          </span>
        </td>
        <td style="padding:12px 20px; text-align:right;">
          <a href="/producto-form?id=${p.id}" data-link style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:2px; background:#fff; border:1px solid #ddd; color:#555; text-decoration:none; margin-right:4px;" onmouseover="this.style.borderColor='#e62e04';this.style.color='#e62e04'" onmouseout="this.style.borderColor='#ddd';this.style.color='#555'" title="Editar">
            ${svgs.edit}
          </a>
          <button class="btn-eliminar" data-id="${p.id}" style="display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:2px; background:#fff; border:1px solid #ddd; color:#f5222d; cursor:pointer;" onmouseover="this.style.borderColor='#f5222d';this.style.background='#fff1f0'" onmouseout="this.style.borderColor='#ddd';this.style.background='#fff'" title="Eliminar">
            ${svgs.trash}
          </button>
        </td>
      </tr>
      `;
    }).join("");

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        if (confirm(`¿Estás seguro de eliminar el producto #${id}?`)) {
          try {
            await eliminarProducto(id);
            cargarLista();
          } catch { alert("Error al eliminar."); }
        }
      });
    });
  }

  searchInput?.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtrados = todosProductos.filter(p => 
      p.nombre.toLowerCase().includes(term) || p.categoria.toLowerCase().includes(term)
    );
    renderTabla(filtrados);
  });

  cargarLista();
}
