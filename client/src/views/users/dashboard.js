import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_FOOTER } from "../../utils/icons.js";

export function renderDashboard() {
  const usuario = obtenerSesion();
  return `
<!-- Promo Bar -->
<div class="ali-promo-bar">
  ${svgs.fuego} ¡DESCUENTO DEL 10% EN COMPRAS SUPERIORES A $50.000!
</div>

<header style="background:#fff; border-bottom:2px solid #e8e8e8; position:sticky; top:0; z-index:100; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <div class="ali-container" style="padding-top:10px; padding-bottom:10px; display:flex; align-items:center; justify-content:space-between;">
    <a href="/" data-link style="text-decoration:none; display:flex; align-items:center; gap:8px;">
      <div style="background:#e62e04; color:#fff; width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:14px; font-style:italic; letter-spacing:-1px;">LA</div>
      <div style="display:none; @media(min-width:640px){display:block;}">
        <div style="font-size:18px; font-weight:900; color:#e62e04; line-height:1; letter-spacing:-0.5px;">La Arenosa</div>
        <div style="font-size:9px; color:#777; font-weight:600; letter-spacing:1px; text-transform:uppercase;">Insumos de Confección</div>
      </div>
    </a>
    <div style="display:flex; align-items:center; gap:16px;">
      <a href="/tienda" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.catalog} Tienda</a>
      <a href="/dashboard" data-link style="text-decoration:none; color:#e62e04; font-size:13px; font-weight:700; display:flex; align-items:center; gap:4px;">${svgs.user} Mi Panel</a>
      <a href="/mis-compras" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.box} Mis Pedidos</a>
      ${usuario?.role.includes("ADMIN") ? `<a href="/admin" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.admin} Admin</a>` : ""}
      <button id="logout-btn" style="border:none; background:none; color:#777; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:4px;" onmouseover="this.style.color='#e62e04'" onmouseout="this.style.color='#777'">Salir</button>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:32px 0;">
  <div class="ali-container">
    
    <!-- Hero Dashboard -->
    <div style="background:linear-gradient(135deg, #e62e04, #ff6900); border-radius:4px; padding:32px 40px; color:#fff; margin-bottom:24px; position:relative; overflow:hidden;">
      <div style="position:relative; z-index:1;">
        <p style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px; opacity:0.9;">Mi Cuenta</p>
        <h1 style="font-size:32px; font-weight:900; margin:0 0 8px;">Bienvenido, ${usuario?.name}</h1>
        <p style="font-size:14px; opacity:0.9; margin:0;">Gestiona tus pedidos de herrajes e insumos.</p>
      </div>
      <div style="position:absolute; right:20px; top:50%; transform:translateY(-50%); opacity:0.1;">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
    </div>

    <!-- Stats -->
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px;">
      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:24px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#999; text-transform:uppercase; margin:0 0 12px;">Total Pedidos</p>
        <p style="font-size:36px; font-weight:900; color:#222; margin:0;" id="count-total">…</p>
      </div>
      <div style="background:#fff1ee; border:1px solid #ffd6cc; border-radius:4px; padding:24px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#e62e04; text-transform:uppercase; margin:0 0 12px;">Pendientes</p>
        <p style="font-size:36px; font-weight:900; color:#e62e04; margin:0;" id="count-pendientes">…</p>
      </div>
      <div style="background:#f6ffed; border:1px solid #b7eb8f; border-radius:4px; padding:24px; text-align:center;">
        <p style="font-size:11px; font-weight:800; color:#52c41a; text-transform:uppercase; margin:0 0 12px;">Entregados</p>
        <p style="font-size:36px; font-weight:900; color:#52c41a; margin:0;" id="count-entregados">…</p>
      </div>
    </div>

    <!-- Quick Links & Last Orders -->
    <div style="display:grid; grid-template-columns:1fr 2fr; gap:16px;">
      
      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:24px;">
        <h2 class="ali-section-title" style="margin-bottom:16px;">Accesos Rápidos</h2>
        <div style="display:grid; gap:12px;">
          <a href="/tienda" data-link style="display:flex; align-items:center; gap:12px; padding:12px 16px; border:1px solid #f0f0f0; border-radius:4px; text-decoration:none; color:#222; transition:all .15s;" onmouseover="this.style.borderColor='#e62e04'; this.style.background='#fff1ee'" onmouseout="this.style.borderColor='#f0f0f0'; this.style.background='transparent'">
            <div style="color:#e62e04;">${svgs.catalog}</div>
            <div>
              <p style="font-size:13px; font-weight:700; margin:0;">Ver Catálogo</p>
              <p style="font-size:11px; color:#777; margin:2px 0 0;">Herrajes, cierres y más</p>
            </div>
          </a>
          <a href="/mis-compras" data-link style="display:flex; align-items:center; gap:12px; padding:12px 16px; border:1px solid #f0f0f0; border-radius:4px; text-decoration:none; color:#222; transition:all .15s;" onmouseover="this.style.borderColor='#e62e04'; this.style.background='#fff1ee'" onmouseout="this.style.borderColor='#f0f0f0'; this.style.background='transparent'">
            <div style="color:#e62e04;">${svgs.box}</div>
            <div>
              <p style="font-size:13px; font-weight:700; margin:0;">Mis Pedidos</p>
              <p style="font-size:11px; color:#777; margin:2px 0 0;">Historial y estado</p>
            </div>
          </a>
          <a href="/profile" data-link style="display:flex; align-items:center; gap:12px; padding:12px 16px; border:1px solid #f0f0f0; border-radius:4px; text-decoration:none; color:#222; transition:all .15s;" onmouseover="this.style.borderColor='#e62e04'; this.style.background='#fff1ee'" onmouseout="this.style.borderColor='#f0f0f0'; this.style.background='transparent'">
            <div style="color:#e62e04;">${svgs.user}</div>
            <div>
              <p style="font-size:13px; font-weight:700; margin:0;">Editar Perfil</p>
              <p style="font-size:11px; color:#777; margin:2px 0 0;">Actualiza tus datos</p>
            </div>
          </a>
        </div>
      </div>

      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <h2 class="ali-section-title">Últimos Pedidos</h2>
          <a href="/mis-compras" data-link style="font-size:12px; color:#e62e04; font-weight:700; text-decoration:none;">Ver todos →</a>
        </div>
        <div id="ultimos-pedidos" style="display:grid; gap:12px;">
          <p style="color:#aaa; font-size:13px; padding:12px;">Cargando pedidos...</p>
        </div>
      </div>

    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export async function setupDashboard() {
  const usuario = obtenerSesion();
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  try {
    const { obtenerComprasPorUsuario } = await import("../../services/compra.service.js");
    const compras = await obtenerComprasPorUsuario(usuario.id);

    const pendientes = compras.filter(c => c.estado === "Pendiente").length;
    const entregados = compras.filter(c => c.estado === "Entregado").length;

    document.getElementById("count-total").textContent = compras.length;
    document.getElementById("count-pendientes").textContent = pendientes;
    document.getElementById("count-entregados").textContent = entregados;

    const ultimos = [...compras].sort((a, b) => b.id - a.id).slice(0, 3);
    const pedidosEl = document.getElementById("ultimos-pedidos");

    if (ultimos.length === 0) {
      pedidosEl.innerHTML = `
        <div style="text-center; padding:40px 0; color:#aaa;">
          <div style="display:flex; justify-content:center; margin-bottom:10px;">${svgs.box}</div>
          <p style="font-size:13px; text-align:center; margin:0 0 12px;">Aún no has hecho pedidos</p>
          <div style="text-align:center;"><a href="/tienda" data-link class="ali-btn-outline">Ver Catálogo</a></div>
        </div>`;
      return;
    }

    pedidosEl.innerHTML = ultimos.map(c => {
      let estadoStyles = "background:#f5f5f5; color:#777; border:1px solid #ddd;";
      if (c.estado === "Pendiente") estadoStyles = "background:#fff1ee; color:#e62e04; border:1px solid #ffd6cc;";
      if (c.estado === "Entregado") estadoStyles = "background:#f6ffed; color:#52c41a; border:1px solid #b7eb8f;";
      if (c.estado === "Cancelado") estadoStyles = "background:#fff1f0; color:#f5222d; border:1px solid #ffa39e;";
      
      return `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:16px; border:1px solid #f0f0f0; border-radius:4px; transition:border-color .2s;" onmouseover="this.style.borderColor='#e8e8e8'" onmouseout="this.style.borderColor='#f0f0f0'">
        <div>
          <p style="font-size:14px; font-weight:700; color:#222; margin:0 0 4px;">Pedido #${c.id}</p>
          <p style="font-size:12px; color:#777; margin:0;">${c.fecha} • ${c.items.length} artículo(s)</p>
        </div>
        <div style="text-align:right;">
          <p style="font-size:16px; font-weight:800; color:#e62e04; margin:0 0 6px;">$${c.total.toLocaleString()}</p>
          <span style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:2px; text-transform:uppercase; letter-spacing:0.5px; ${estadoStyles}">${c.estado}</span>
        </div>
      </div>`;
    }).join("");
  } catch {
    document.getElementById("count-total").textContent = "0";
    document.getElementById("count-pendientes").textContent = "0";
    document.getElementById("count-entregados").textContent = "0";
  }
}
