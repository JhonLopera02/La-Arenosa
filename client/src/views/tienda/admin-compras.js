import { obtenerTodasLasCompras, actualizarEstadoCompra } from "../../services/compra.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { reponerStock } from "../../services/producto.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER } from "../../utils/icons.js";

export function renderAdminCompras() {
  const usuario = obtenerSesion();
  if (!usuario?.role.includes("ADMIN")) {
    navigate("/");
    return "";
  }

  return COMMON_HEADER + `
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
        <h1 class="ali-section-title" style="font-size:24px; color:#e62e04;">Gestión de Pedidos</h1>
        <p style="font-size:14px; color:#777; margin:8px 0 0;">Despacho y estado de las órdenes.</p>
      </div>
      <div style="display:flex; gap:12px;">
        <select id="filter-estado" style="padding:8px 14px; border:1px solid #ddd; border-radius:2px; font-size:13px; outline:none;">
          <option value="Todos">Todos los pedidos</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Entregado">Entregados</option>
          <option value="Cancelado">Cancelados</option>
        </select>
      </div>
    </div>

    <!-- Lista de Pedidos -->
    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px;">
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="background:#f9f9f9; font-size:11px; color:#777; text-transform:uppercase;">
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">ID / Fecha</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Cliente</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Resumen (Total)</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Estado</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8; text-align:right;">Acción</th>
            </tr>
          </thead>
          <tbody id="pedidos-tbody">
            <tr><td colspan="5" style="padding:20px; text-align:center; color:#aaa; font-size:13px;">Cargando pedidos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export async function setupAdminCompras() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  const tbody = document.getElementById("pedidos-tbody");
  const selectFilter = document.getElementById("filter-estado");
  let todasCompras = [];

  async function cargarLista() {
    try {
      todasCompras = await obtenerTodasLasCompras();
      todasCompras.sort((a,b) => b.id - a.id);
      renderTabla(todasCompras);
    } catch {
      tbody.innerHTML = `<tr><td colspan="5" style="padding:20px; text-align:center; color:#e62e04;">Error cargando pedidos.</td></tr>`;
    }
  }

  function renderTabla(compras) {
    if(compras.length === 0){
      tbody.innerHTML = `<tr><td colspan="5" style="padding:20px; text-align:center; color:#aaa; font-size:13px;">No hay pedidos.</td></tr>`;
      return;
    }

    tbody.innerHTML = compras.map(c => {
      let estadoStyles = "background:#f5f5f5; color:#777; border:1px solid #ddd;";
      if (c.estado === "Pendiente") estadoStyles = "background:#fff1ee; color:#e62e04; border:1px solid #ffd6cc;";
      if (c.estado === "Entregado") estadoStyles = "background:#f6ffed; color:#52c41a; border:1px solid #b7eb8f;";
      if (c.estado === "Cancelado") estadoStyles = "background:#fff1f0; color:#f5222d; border:1px solid #ffa39e;";

      let actions = "";
      if(c.estado === "Pendiente") {
        actions = `
          <div style="display:flex; justify-content:flex-end; gap:6px;">
            <button class="btn-entregar" data-id="${c.id}" style="background:#52c41a; color:#fff; border:none; padding:6px 12px; font-size:11px; font-weight:700; border-radius:2px; cursor:pointer;" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">Marcar Entregado</button>
            <button class="btn-cancelar" data-id="${c.id}" style="background:#fff; color:#f5222d; border:1px solid #f5222d; padding:5px 11px; font-size:11px; font-weight:700; border-radius:2px; cursor:pointer;" onmouseover="this.style.background='#fff1f0'" onmouseout="this.style.background='#fff'">Cancelar</button>
          </div>
        `;
      }

      return `
      <tr style="border-bottom:1px solid #f0f0f0; transition:background .15s;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='transparent'">
        <td style="padding:12px 20px;">
          <p style="font-size:13px; font-weight:700; color:#222; margin:0 0 2px;">#${c.id}</p>
          <p style="font-size:11px; color:#777; margin:0;">${c.fecha}</p>
        </td>
        <td style="padding:12px 20px;">
          <p style="font-size:13px; font-weight:600; color:#222; margin:0;">Usuario ID: ${c.usuarioId}</p>
        </td>
        <td style="padding:12px 20px;">
          <p style="font-size:14px; font-weight:900; color:#e62e04; margin:0 0 2px;">$${c.total.toLocaleString()}</p>
          <p style="font-size:11px; color:#777; margin:0;">${c.items.length} artículos</p>
        </td>
        <td style="padding:12px 20px;">
          <span style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:2px; text-transform:uppercase; letter-spacing:0.5px; ${estadoStyles}">${c.estado}</span>
        </td>
        <td style="padding:12px 20px; text-align:right;">
          ${actions}
        </td>
      </tr>
      `;
    }).join("");

    document.querySelectorAll(".btn-entregar").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        if(confirm(`¿Marcar pedido #${id} como ENTREGADO?`)){
          await actualizarEstadoCompra(id, "Entregado");
          cargarLista();
        }
      });
    });

    document.querySelectorAll(".btn-cancelar").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const id = e.currentTarget.getAttribute("data-id");
        if(confirm(`¿Seguro de CANCELAR el pedido #${id} y reponer el stock?`)){
          await actualizarEstadoCompra(id, "Cancelado");
          const compra = compras.find(c => c.id == id);
          if (compra) {
            for (const item of compra.items) {
              await reponerStock(item.id, item.cantidad);
            }
          }
          cargarLista();
        }
      });
    });
  }

  selectFilter?.addEventListener("change", (e) => {
    const estado = e.target.value;
    if(estado === "Todos") renderTabla(todasCompras);
    else renderTabla(todasCompras.filter(c => c.estado === estado));
  });

  cargarLista();
}
