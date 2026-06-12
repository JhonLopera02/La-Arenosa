import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { obtenerComprasPorUsuario, cancelarCompra } from "../../services/compra.service.js";
import { reponerStock } from "../../services/producto.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER } from "../../utils/icons.js";

export async function renderMisCompras() {
  const usuario = obtenerSesion();
  if (!usuario) {
    navigate("/login");
    return "";
  }

  let html = COMMON_HEADER + `
      <!-- Acciones Derecha -->
      <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
        <div style="position:relative; cursor:pointer;" id="account-dropdown-trigger">
          <div style="text-align:center; font-size:12px; color:#555;">
            <div style="display:flex; justify-content:center;">${svgs.cuenta}</div>
            <div style="font-weight:600; white-space:nowrap; margin-top:2px;">${usuario.name}</div>
          </div>
          <div id="account-menu" style="display:none; position:absolute; right:0; top:110%; background:#fff; border:1px solid #e8e8e8; min-width:180px; box-shadow:0 4px 16px rgba(0,0,0,0.12); z-index:200; border-radius:4px; overflow:hidden;">
            <a href="/dashboard" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Mi Panel</a>
            <a href="/profile" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Editar Perfil</a>
            ${usuario.role.includes("ADMIN") ? `<a href="/admin" data-link style="display:block; padding:10px 14px; font-size:13px; font-weight:700; color:#e62e04; text-decoration:none; border-top:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">${svgs.admin} Admin</a>` : ""}
            <button id="logout-btn" style="width:100%; text-align:left; padding:10px 14px; font-size:13px; color:#e62e04; border:none; background:none; cursor:pointer; border-top:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Cerrar Sesión</button>
          </div>
        </div>
        <a href="/tienda" data-link style="text-align:center; font-size:12px; color:#555; text-decoration:none; cursor:pointer;">
          <div style="display:flex; justify-content:center;">${svgs.catalog}</div>
          <div style="font-weight:600; margin-top:2px;">Tienda</div>
        </a>
      </div>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:32px 0;">
  <div class="ali-container">
    <div style="margin-bottom:24px;">
      <h1 class="ali-section-title" style="font-size:24px;">Mis Pedidos</h1>
      <p style="font-size:14px; color:#777; margin:8px 0 0;">Revisa el estado de tus compras y envíos.</p>
    </div>

    <div id="historial-compras" style="display:grid; gap:16px;">
      <p style="color:#aaa; font-size:13px;">Cargando tus pedidos...</p>
    </div>
  </div>
</main>
${COMMON_FOOTER}
  `;
  return html;
}

export async function setupMisCompras() {
  const usuario = obtenerSesion();

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  const historialDiv = document.getElementById("historial-compras");

  async function cargarHistorial() {
    try {
      const compras = await obtenerComprasPorUsuario(usuario.id);
      compras.sort((a, b) => b.id - a.id);

      if (compras.length === 0) {
        historialDiv.innerHTML = `
          <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:64px 20px; text-align:center;">
            <div style="color:#ddd; margin-bottom:16px; display:flex; justify-content:center;">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <p style="font-size:16px; font-weight:700; color:#555; margin:0 0 8px;">Aún no tienes pedidos</p>
            <p style="font-size:13px; color:#aaa; margin:0 0 24px;">Explora el catálogo y aprovecha las ofertas.</p>
            <a href="/tienda" data-link class="ali-btn" style="padding:10px 24px;">Ir a la Tienda</a>
          </div>`;
        return;
      }

      historialDiv.innerHTML = compras.map(c => {
        let itemsHtml = c.items.map(i => `
          <div style="display:flex; justify-content:space-between; font-size:13px; color:#555; padding:4px 0; border-bottom:1px dashed #f0f0f0;">
            <span>${i.cantidad}x ${i.nombre}</span>
            <span style="font-weight:700;">$${(i.precio * i.cantidad).toLocaleString()}</span>
          </div>
        `).join("");

        let estadoStyles = "background:#f5f5f5; color:#777; border:1px solid #ddd;";
        if (c.estado === "Pendiente") estadoStyles = "background:#fff1ee; color:#e62e04; border:1px solid #ffd6cc;";
        if (c.estado === "Entregado") estadoStyles = "background:#f6ffed; color:#52c41a; border:1px solid #b7eb8f;";
        if (c.estado === "Cancelado") estadoStyles = "background:#fff1f0; color:#f5222d; border:1px solid #ffa39e;";

        return `
        <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; overflow:hidden;">
          <div style="background:#f9f9f9; padding:16px 24px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <p style="font-size:14px; font-weight:800; color:#222; margin:0 0 4px;">Pedido #${c.id}</p>
              <p style="font-size:12px; color:#777; margin:0;">${c.fecha}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:11px; font-weight:800; padding:4px 10px; border-radius:2px; text-transform:uppercase; letter-spacing:0.5px; ${estadoStyles}; display:inline-block; margin-bottom:4px;">${c.estado}</span>
              <p style="font-size:18px; font-weight:900; color:#e62e04; margin:0;">$${c.total.toLocaleString()}</p>
            </div>
          </div>
          <div style="padding:16px 24px;">
            ${itemsHtml}
            ${c.estado === "Pendiente" ? `
              <div style="margin-top:16px; text-align:right;">
                <button class="btn-cancelar" data-id="${c.id}" style="background:transparent; color:#f5222d; border:1px solid #f5222d; padding:6px 14px; font-size:12px; font-weight:700; border-radius:2px; cursor:pointer;" onmouseover="this.style.background='#fff1f0'" onmouseout="this.style.background='transparent'">Cancelar Pedido</button>
              </div>
            ` : ""}
          </div>
        </div>`;
      }).join("");

      document.querySelectorAll(".btn-cancelar").forEach(btn => {
        btn.addEventListener("click", async (e) => {
          const idCompra = e.target.getAttribute("data-id");
          if (confirm("¿Seguro que deseas cancelar este pedido?")) {
            try {
              await cancelarCompra(idCompra);
              const compra = compras.find(c => c.id == idCompra);
              if (compra) {
                for (const item of compra.items) {
                  await reponerStock(item.id, item.cantidad);
                }
              }
              alert("Pedido cancelado. El stock ha sido liberado.");
              cargarHistorial();
            } catch {
              alert("Error al cancelar el pedido.");
            }
          }
        });
      });
    } catch {
      historialDiv.innerHTML = `<p style="color:#e62e04; font-weight:700; background:#fff1ee; padding:16px; border:1px solid #ffd6cc;">Error cargando tus pedidos.</p>`;
    }
  }

  cargarHistorial();
}
