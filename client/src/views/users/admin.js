import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { obtenerTodosLosUsuarios } from "../../services/user.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER } from "../../utils/icons.js";

export function renderAdmin() {
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
            <a href="/dashboard" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Mi Panel</a>
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
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
      <div>
        <h1 class="ali-section-title" style="font-size:24px; color:#e62e04;">Panel de Administración</h1>
        <p style="font-size:14px; color:#777; margin:8px 0 0;">Gestión general de La Arenosa.</p>
      </div>
      <div style="display:flex; gap:12px;">
        <a href="/admin-productos" data-link class="ali-btn">📦 Gestionar Inventario</a>
        <a href="/admin-compras" data-link class="ali-btn-outline" style="background:#fff;">📋 Gestionar Pedidos</a>
      </div>
    </div>

    <!-- KPIs -->
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:24px;">
      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:20px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#999; text-transform:uppercase; margin:0 0 8px;">Usuarios Registrados</p>
        <p style="font-size:28px; font-weight:900; color:#222; margin:0;" id="kpi-usuarios">…</p>
      </div>
      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:20px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#999; text-transform:uppercase; margin:0 0 8px;">Total Productos</p>
        <p style="font-size:28px; font-weight:900; color:#222; margin:0;" id="kpi-productos">…</p>
      </div>
      <div style="background:#fff1ee; border:1px solid #ffd6cc; border-radius:4px; padding:20px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#e62e04; text-transform:uppercase; margin:0 0 8px;">Pedidos Totales</p>
        <p style="font-size:28px; font-weight:900; color:#e62e04; margin:0;" id="kpi-pedidos">…</p>
      </div>
      <div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:20px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#52c41a; text-transform:uppercase; margin:0 0 8px;">Ingresos (COP)</p>
        <p style="font-size:24px; font-weight:900; color:#52c41a; margin:0;" id="kpi-ingresos">…</p>
      </div>
    </div>

    <!-- Lista de Usuarios -->
    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px;">
      <div style="padding:16px 20px; border-bottom:1px solid #f0f0f0;">
        <h2 style="font-size:16px; font-weight:800; margin:0;">Directorio de Usuarios</h2>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%; border-collapse:collapse; text-align:left;">
          <thead>
            <tr style="background:#f9f9f9; font-size:11px; color:#777; text-transform:uppercase;">
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">ID</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Nombre Completo</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Correo</th>
              <th style="padding:12px 20px; border-bottom:1px solid #e8e8e8;">Roles</th>
            </tr>
          </thead>
          <tbody id="usuarios-tbody">
            <tr><td colspan="4" style="padding:20px; text-align:center; color:#aaa; font-size:13px;">Cargando usuarios...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export async function setupAdmin() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  try {
    const { obtenerProductos } = await import("../../services/producto.service.js");
    const { obtenerTodasLasCompras } = await import("../../services/compra.service.js");
    const [usuarios, productos, compras] = await Promise.all([
      obtenerTodosLosUsuarios(),
      obtenerProductos(),
      obtenerTodasLasCompras()
    ]);

    document.getElementById("kpi-usuarios").textContent = usuarios.length;
    document.getElementById("kpi-productos").textContent = productos.length;
    document.getElementById("kpi-pedidos").textContent = compras.length;

    const ingresosTotales = compras.reduce((acc, c) => acc + (c.estado !== "Cancelado" ? c.total : 0), 0);
    document.getElementById("kpi-ingresos").textContent = "$" + ingresosTotales.toLocaleString();

    const tbody = document.getElementById("usuarios-tbody");
    tbody.innerHTML = usuarios.map(u => `
      <tr style="border-bottom:1px solid #f0f0f0; transition:background .15s;" onmouseover="this.style.background='#fafafa'" onmouseout="this.style.background='transparent'">
        <td style="padding:12px 20px; font-size:13px; color:#555;">${u.id}</td>
        <td style="padding:12px 20px; font-size:13px; font-weight:700; color:#222;">${u.name} ${u.lastName}</td>
        <td style="padding:12px 20px; font-size:13px; color:#555;">${u.email}</td>
        <td style="padding:12px 20px;">
          ${u.role.map(r => {
            const isAd = r === "ADMIN";
            return `<span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:2px; ${isAd ? 'background:#fff1ee; color:#e62e04;' : 'background:#f0f0f0; color:#777;'}">${r}</span>`;
          }).join(" ")}
        </td>
      </tr>
    `).join("");
  } catch (error) {
    document.getElementById("usuarios-tbody").innerHTML = `<tr><td colspan="4" style="padding:20px; text-align:center; color:#e62e04;">Error cargando datos.</td></tr>`;
  }
}
