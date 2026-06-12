import { obtenerSesion, cerrarSesion } from "../services/auth.service.js";
import { navigate } from "../router/router.js";

export const CATEGORIAS_TIENDA = [
  "Colección Pines Halloween",
  "Colección Pines Navideños",
  "Adornos y Decoración",
  "Agujas y Alfileres",
  "Bisutería",
  "Botones",
  "Broches Remaches y Ojaletes",
  "Cierres",
  "Cintas y Reatas",
  "Hebillas",
  "Herrajes",
  "Herrajes Plásticos y Complementos",
  "Herramientas para la Confección",
  "Hilos y Cordones",
  "Pines y Llaveros",
  "Telas",
  "Tijeras y Pinzas"
];

const svgs = {
  cuenta: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  pedidos: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  carrito: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
  buscar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  admin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  fuego: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-3px;margin-right:2px;"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>',
  rayo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--ali-red);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  star: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  tarjeta: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
  billete: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
  banco: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
  pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  tel: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
  mail: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  reloj: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
};

const CAT_ICONS = {
  "Cierres": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 6h8M8 10h8M8 14h8M8 18h8"/></svg>',
  "Hebillas": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="16" height="12" rx="2"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="16" y1="12" x2="20" y2="12"/></svg>',
  "Botones": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="10" cy="10" r="1.5"/><circle cx="14" cy="10" r="1.5"/><circle cx="10" cy="14" r="1.5"/><circle cx="14" cy="14" r="1.5"/></svg>',
  "Agujas y Alfileres": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 5l-14 14M16 4l4 4M21 3l-3 3M4 16l-1 5 5-1z"/></svg>',
  "Tijeras y Pinzas": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>',
  "Hilos y Cordones": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="6" y1="8" x2="18" y2="8"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="6" y1="16" x2="18" y2="16"/></svg>',
  "Pines y Llaveros": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M12 12v10"/><line x1="9" y1="15" x2="15" y2="15"/></svg>',
  "Herrajes": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  "Bisutería": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15 8 22 9 17 14 18 21 12 18 6 21 7 14 2 9 9 8 12 2"/></svg>',
  "Herramientas para la Confección": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
  "Cintas y Reatas": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12c-2-2.5-4-5-8-5 0 5 4 8 8 10 4-2 8-5 8-10 0-5-6-2.5-8 5z"/></svg>',
  "Broches Remaches y Ojaletes": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>',
  "Adornos y Decoración": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  "Herrajes Plásticos y Complementos": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
  "Colección Pines Halloween": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C6.5 22 2 18 2 12S6.5 2 12 2s10 4 10 10-4.5 10-10 10zM12 2v20M8 8v4M16 8v4M8 16h8"/></svg>',
  "Colección Pines Navideños": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 18 10 14 10 20 18 4 18 10 10 6 10 12 2"/><rect x="10" y="18" width="4" height="4"/></svg>',
  "Telas": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5a2 2 0 0 1 2-2h13.4a.5.5 0 0 1 .49.6l-2 10a.5.5 0 0 1-.49.4h-9.8l-.6 6"/><path d="M2 19h10"/></svg>',
  "default": '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>'
};

export function renderHome() {
  const usuario = obtenerSesion();
  return `
<!-- Header AliExpress Style -->
<header style="background:#fff; border-bottom:2px solid #e8e8e8; position:sticky; top:0; z-index:100; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
  <div class="ali-container" style="padding-top:10px; padding-bottom:10px;">
    <div style="display:flex; align-items:center; gap:20px;">
      
      <!-- Logo -->
      <a href="/" data-link style="text-decoration:none; flex-shrink:0;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="background:#e62e04; color:#fff; width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:14px; font-style:italic; letter-spacing:-1px; flex-shrink:0;">LA</div>
          <div>
            <div style="font-size:18px; font-weight:900; color:#e62e04; line-height:1; letter-spacing:-0.5px;">La Arenosa</div>
            <div style="font-size:9px; color:#777; font-weight:600; letter-spacing:1px; text-transform:uppercase;">Insumos de Confección</div>
          </div>
        </div>
      </a>

      <!-- Botón Categorías Desplegable -->
      <div style="position:relative; flex-shrink:0;" id="cat-dropdown-trigger">
        <button style="background:#f5f5f5; border:1px solid #e8e8e8; color:#333; font-weight:700; font-size:13px; padding:10px 16px; border-radius:4px; display:flex; align-items:center; gap:8px; cursor:pointer; transition:background .2s;">
          ${svgs.menu} Categorías
        </button>
        <div id="cat-dropdown-menu" style="display:none; position:absolute; top:110%; left:0; width:280px; background:#fff; border:1px solid #e8e8e8; border-radius:4px; box-shadow:0 8px 24px rgba(0,0,0,0.12); z-index:200; overflow-y:auto; max-height:400px;">
          ${CATEGORIAS_TIENDA.map(cat => `
            <a href="/tienda?categoria=${encodeURIComponent(cat)}" data-link style="display:flex; align-items:center; gap:12px; padding:10px 16px; font-size:13px; color:#333; text-decoration:none; border-bottom:1px solid #f9f9f9; transition:all .15s;" onmouseover="this.style.color='#e62e04'; this.style.paddingLeft='22px'; this.style.background='#fff1ee';" onmouseout="this.style.color='#333'; this.style.paddingLeft='16px'; this.style.background='transparent';">
              <span style="display:inline-block; width:16px; height:16px; color:#555;">${CAT_ICONS[cat] || CAT_ICONS.default}</span> ${cat}
            </a>
          `).join("")}
          <a href="/tienda" data-link style="display:block; text-align:center; padding:12px; background:#f9f9f9; color:#e62e04; font-weight:700; font-size:12px; text-decoration:none;">VER TODOS LOS PRODUCTOS</a>
        </div>
      </div>

      <!-- Barra de Búsqueda -->
      <div style="flex:1; display:flex; max-width:600px;">
        <input id="header-search" type="text" placeholder="Buscar en La Arenosa: cierres, botones, tijeras..." class="ali-search" style="font-size:13px;" />
        <button id="header-search-btn" class="ali-search-btn">${svgs.buscar}</button>
      </div>

      <!-- Acciones Derecha -->
      <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
        <div style="position:relative; cursor:pointer;" id="account-dropdown-trigger">
          <div style="text-align:center; font-size:12px; color:#555;">
            <div style="display:flex; justify-content:center;">${svgs.cuenta}</div>
            <div style="font-weight:600; white-space:nowrap; margin-top:2px;">${usuario ? usuario.name : "Cuenta"}</div>
          </div>
          <div id="account-menu" style="display:none; position:absolute; right:0; top:110%; background:#fff; border:1px solid #e8e8e8; min-width:180px; box-shadow:0 4px 16px rgba(0,0,0,0.12); z-index:200; border-radius:4px; overflow:hidden;">
            ${usuario ? `
              <div style="padding:10px 14px; font-size:11px; font-weight:700; color:#777; border-bottom:1px solid #f0f0f0; text-transform:uppercase; letter-spacing:0.5px;">Hola, ${usuario.name}</div>
              <a href="/dashboard" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none; transition:background .15s;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Mi Panel</a>
              <a href="/mis-compras" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Mis Pedidos</a>
              <a href="/profile" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Editar Perfil</a>
              ${usuario.role.includes("ADMIN") ? `<a href="/admin" data-link style="display:block; padding:10px 14px; font-size:13px; font-weight:700; color:#e62e04; text-decoration:none; border-top:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">${svgs.admin} Admin Portal</a>` : ""}
              <button id="logout-btn" style="width:100%; text-align:left; padding:10px 14px; font-size:13px; color:#e62e04; border:none; background:none; cursor:pointer; border-top:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Cerrar Sesión</button>
            ` : `
              <a href="/login" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Iniciar Sesión</a>
              <a href="/register" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Registrarse</a>
            `}
          </div>
        </div>

        <a href="/mis-compras" data-link style="text-align:center; font-size:12px; color:#555; text-decoration:none; cursor:pointer;">
          <div style="display:flex; justify-content:center;">${svgs.pedidos}</div>
          <div style="font-weight:600; margin-top:2px;">Pedidos</div>
        </a>

        <a href="/tienda" data-link style="text-align:center; font-size:12px; color:#555; text-decoration:none; cursor:pointer; position:relative;">
          <div style="display:flex; justify-content:center;">${svgs.carrito}</div>
          <div style="font-weight:600; margin-top:2px;">Carrito</div>
          <span id="home-cart-badge" style="display:none; position:absolute; top:-4px; right:-4px; background:#e62e04; color:#fff; font-size:9px; font-weight:900; width:17px; height:17px; border-radius:50%; align-items:center; justify-content:center;">0</span>
        </a>

        <a href="/tienda?ofertas=true" data-link style="display:flex; align-items:center; background:#e62e04; color:#fff; font-weight:800; font-size:12px; padding:6px 14px; border-radius:2px; text-decoration:none; white-space:nowrap; letter-spacing:0.3px;">
          ${svgs.fuego} OFERTAS
        </a>
        
      </div>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh;">
  <div class="ali-container" style="padding-top:16px; padding-bottom:32px;">
    
    <!-- Banner Principal -->
    <div style="position:relative; background:linear-gradient(135deg, #e62e04 0%, #ff4f1f 40%, #ff6900 70%, #ffc200 100%); border-radius:4px; overflow:hidden; min-height:360px; display:flex; align-items:center; margin-bottom:16px;">
      <div style="position:absolute; inset:0; background:url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&auto=format&fit=crop&q=60') center/cover; opacity:0.15;"></div>
      <div style="position:relative; z-index:1; padding:40px 48px; max-width:60%;">
        <div style="background:rgba(255,255,255,0.15); color:#fff; font-size:10px; font-weight:900; letter-spacing:2px; text-transform:uppercase; padding:4px 12px; border-radius:2px; display:inline-block; margin-bottom:16px; border:1px solid rgba(255,255,255,0.3);">🇨🇴 Temporada Colombia</div>
        <h1 style="color:#fff; font-size:48px; font-weight:900; line-height:1.05; margin:0 0 12px; text-shadow:0 2px 8px rgba(0,0,0,0.2);">La Arenosa<br><span style="font-size:32px; opacity:0.9;">Confección & Herrajes</span></h1>
        <p style="color:rgba(255,255,255,0.85); font-size:16px; margin:0 0 24px; line-height:1.6;">Los mejores insumos de costura, herrajes y accesorios para profesionales y diseñadores colombianos.</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a href="/tienda" data-link style="background:#fff; color:#e62e04; font-weight:900; font-size:15px; padding:14px 32px; border-radius:2px; text-decoration:none; letter-spacing:0.3px; box-shadow:0 2px 8px rgba(0,0,0,0.15);">Comprar Ahora</a>
          <a href="/tienda?ofertas=true" data-link style="display:flex; align-items:center; background:rgba(255,255,255,0.15); color:#fff; font-weight:700; font-size:15px; padding:14px 28px; border-radius:2px; text-decoration:none; border:1px solid rgba(255,255,255,0.4);">Ver Ofertas ${svgs.fuego}</a>
        </div>
      </div>

      <!-- Flash Deal Timer -->
      <div style="position:absolute; right:40px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); padding:32px; border-radius:8px; text-align:center; border:1px solid rgba(255,255,255,0.15);">
        <div style="color:rgba(255,255,255,0.7); font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:12px;">${svgs.rayo} Oferta termina en</div>
        <div id="countdown-banner" class="ali-timer" style="font-size:32px; letter-spacing:4px; color:#ffc200;">00:00:00</div>
        <div style="color:rgba(255,255,255,0.6); font-size:12px; margin-top:12px; font-weight:600;">10% DTO > $50.000</div>
      </div>
    </div>

    <!-- Flash Deals Section -->
    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:24px; margin-bottom:16px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <h2 class="ali-section-title" style="font-size:20px;">${svgs.rayo} Ofertas Flash</h2>
          <span id="countdown-deals" class="ali-timer" style="font-size:14px;">00:00:00</span>
        </div>
        <a href="/tienda?ofertas=true" data-link style="font-size:13px; color:#e62e04; font-weight:700; text-decoration:none;">Ver todas →</a>
      </div>
      <div id="ofertas-grid" style="display:grid; grid-template-columns:repeat(5,1fr); gap:16px;">
        <p style="color:#aaa; font-size:13px; text-align:center; grid-column:1/-1; padding:24px;">Cargando ofertas...</p>
      </div>
    </div>

    <!-- Productos Destacados -->
    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:24px;">
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
        <h2 class="ali-section-title" style="font-size:20px;">Telas e Insumos Destacados</h2>
        <a href="/tienda" data-link style="font-size:13px; color:#e62e04; font-weight:700; text-decoration:none;">Ver catálogo completo →</a>
      </div>
      <div id="destacados-grid" style="display:grid; grid-template-columns:repeat(5,1fr); gap:16px;">
        <p style="color:#aaa; font-size:13px; text-align:center; grid-column:1/-1; padding:24px;">Cargando productos...</p>
      </div>
    </div>

  </div>
</main>

<!-- Footer AliExpress Style -->
<footer style="background:#3c3c3c; color:#ccc; padding:32px 0 16px; margin-top:0;">
  <div class="ali-container">
    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:32px; margin-bottom:24px;">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
          <div style="background:#e62e04; color:#fff; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:12px; font-style:italic;">LA</div>
          <span style="font-size:16px; font-weight:900; color:#fff; letter-spacing:-0.5px;">La Arenosa</span>
        </div>
        <p style="font-size:12px; line-height:1.7; color:#aaa;">Tu proveedor de confianza de herrajes, cierres, botones, hilos y herramientas para confección en Colombia.</p>
        <div style="display:flex; gap:8px; margin-top:12px; color:#aaa;">
          ${svgs.tarjeta} ${svgs.billete} ${svgs.banco}
        </div>
      </div>
      <div>
        <h4 style="color:#fff; font-size:13px; font-weight:700; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">Categorías Populares</h4>
        ${["Cierres", "Hebillas", "Botones", "Tijeras y Pinzas", "Hilos y Cordones"].map(c => `
          <a href="/tienda?categoria=${encodeURIComponent(c)}" data-link style="display:block; font-size:12px; color:#aaa; text-decoration:none; padding:3px 0; transition:color .15s;" onmouseover="this.style.color='#e62e04'" onmouseout="this.style.color='#aaa'">${c}</a>
        `).join("")}
      </div>
      <div>
        <h4 style="color:#fff; font-size:13px; font-weight:700; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">Mi Cuenta</h4>
        ${[["Mis Pedidos","/mis-compras"],["Mi Dashboard","/dashboard"],["Editar Perfil","/profile"],["Iniciar Sesión","/login"]].map(([t,l]) => `
          <a href="${l}" data-link style="display:block; font-size:12px; color:#aaa; text-decoration:none; padding:3px 0;" onmouseover="this.style.color='#e62e04'" onmouseout="this.style.color='#aaa'">${t}</a>
        `).join("")}
      </div>
      <div>
        <h4 style="color:#fff; font-size:13px; font-weight:700; margin:0 0 12px; text-transform:uppercase; letter-spacing:0.5px;">Contacto</h4>
        <p style="font-size:12px; color:#aaa; line-height:2;">
          ${svgs.pin} Barranquilla, Colombia<br>
          ${svgs.tel} (+57) 300 000 0000<br>
          ${svgs.mail} ventas@laarenosa.co<br>
          ${svgs.reloj} Lun–Sáb 8am–6pm
        </p>
      </div>
    </div>
    <div style="border-top:1px solid #555; padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
      <p style="font-size:11px; color:#777; margin:0;">© 2025 La Arenosa — Todos los derechos reservados.</p>
      <p style="font-size:11px; color:#777; margin:0;">Colombia | COP $</p>
    </div>
  </div>
</footer>
`;
}

let timerInterval;

export function setupHome() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/");
  });

  // Badge del carrito
  const carrito = JSON.parse(localStorage.getItem("la-arenosa-cart")) || [];
  const cartCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById("home-cart-badge");
  if (badge && cartCount > 0) {
    badge.style.display = "flex";
    badge.textContent = cartCount;
  }

  // Dropdowns (Cuenta y Categorías)
  const setups = [
    { trigger: "account-dropdown-trigger", menu: "account-menu" },
    { trigger: "cat-dropdown-trigger", menu: "cat-dropdown-menu" }
  ];

  setups.forEach(({ trigger, menu }) => {
    const tEl = document.getElementById(trigger);
    const mEl = document.getElementById(menu);
    tEl?.addEventListener("mouseenter", () => mEl.style.display = "block");
    tEl?.addEventListener("mouseleave", () => setTimeout(() => { if (!mEl.matches(":hover")) mEl.style.display = "none"; }, 150));
    mEl?.addEventListener("mouseleave", () => mEl.style.display = "none");
  });

  // Búsqueda desde header
  document.getElementById("header-search-btn")?.addEventListener("click", () => {
    const q = document.getElementById("header-search").value.trim();
    if (q) navigate(`/tienda?buscar=${encodeURIComponent(q)}`);
    else navigate("/tienda");
  });
  document.getElementById("header-search")?.addEventListener("keyup", (e) => {
    if (e.key === "Enter") document.getElementById("header-search-btn").click();
  });

  // Countdown
  let targetTime = parseInt(localStorage.getItem("mh-promo-end"));
  if (!targetTime || targetTime < Date.now()) {
    targetTime = Date.now() + (2 * 24 * 60 * 60 * 1000);
    localStorage.setItem("mh-promo-end", targetTime);
  }

  function updateTimers() {
    const diff = Math.max(0, targetTime - Date.now());
    const h = Math.floor(diff / (60 * 60 * 1000));
    const m = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const s = Math.floor((diff % (60 * 1000)) / 1000);
    const str = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
    ["countdown-home","countdown-banner","countdown-deals"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = str;
    });
  }
  if (timerInterval) clearInterval(timerInterval);
  updateTimers();
  timerInterval = setInterval(updateTimers, 1000);

  cargarProductosHome();
}

async function cargarProductosHome() {
  try {
    const { obtenerProductos } = await import("../services/producto.service.js");
    const productos = await obtenerProductos();

    // Ofertas Flash
    const ofertas = productos.filter(p => p.esOferta).slice(0, 5);
    const ofertasGrid = document.getElementById("ofertas-grid");
    if (ofertasGrid) {
      if (ofertas.length === 0) {
        ofertasGrid.innerHTML = `<p style="color:#aaa;text-align:center;grid-column:1/-1;padding:24px;">No hay ofertas activas.</p>`;
      } else {
        ofertasGrid.innerHTML = ofertas.map(p => renderMiniCard(p)).join("");
      }
    }

    // Destacados
    const destacados = productos.slice(0, 10);
    const destGrid = document.getElementById("destacados-grid");
    if (destGrid) {
      destGrid.innerHTML = destacados.map(p => renderMiniCard(p)).join("");
    }
  } catch {
    ["ofertas-grid","destacados-grid"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = `<p style="color:#aaa;text-align:center;grid-column:1/-1;padding:24px;">Error cargando productos.</p>`;
    });
  }
}

function renderMiniCard(p) {
  const precio = p.esOferta ? (p.precio - (p.precio * (p.descuento / 100))) : p.precio;
  let starsHtml = "";
  for(let i=0; i<5; i++) starsHtml += svgs.star;
  return `
  <a href="/tienda" data-link class="ali-card" style="display:flex;flex-direction:column;text-decoration:none;color:inherit;">
    <div style="height:200px;overflow:hidden;background:#f5f5f5;position:relative;">
      <img src="${p.imagen}" alt="${p.nombre}" style="width:100%;height:100%;object-fit:cover;transition:transform .3s;" onmouseover="this.style.transform='scale(1.07)'" onmouseout="this.style.transform='scale(1)'" />
      ${p.esOferta ? `<span class="ali-badge" style="position:absolute;top:8px;left:8px;">-${p.descuento}%</span>` : ""}
    </div>
    <div style="padding:12px;flex:1;display:flex;flex-direction:column;gap:4px;">
      <div class="ali-tag" style="align-self:flex-start;">${p.categoria}</div>
      <p style="font-size:13px;font-weight:600;color:#222;line-height:1.4;margin:4px 0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${p.nombre}</p>
      <div style="margin-top:auto;padding-top:8px;border-top:1px solid #f0f0f0;">
        ${p.esOferta ? `<div class="ali-original-price">$${p.precio.toLocaleString()}</div>` : ""}
        <div class="ali-price" style="font-size:18px;">$${precio.toLocaleString()}</div>
        <div style="color:var(--ali-yellow); margin-top:4px; display:flex; align-items:center; gap:2px;">
          ${starsHtml} <span style="color:#777;font-size:10px;margin-left:4px;">(${Math.floor(Math.random()*200)+50})</span>
        </div>
      </div>
    </div>
  </a>`;
}
