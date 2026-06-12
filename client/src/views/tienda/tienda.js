import { obtenerProductos } from "../../services/producto.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { procesarCompra } from "../../services/compra.service.js";
import { navigate } from "../../router/router.js";
import { CATEGORIAS_TIENDA } from "../home.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER, CAT_ICONS } from "../../utils/icons.js";

export function renderTienda() {
  const usuario = obtenerSesion();
  return COMMON_HEADER + `
      <!-- Barra de Búsqueda -->
      <div style="flex:1; display:flex; max-width:600px; margin:0 16px;">
        <input id="tienda-search" type="text" placeholder="Buscar en La Arenosa..." class="ali-search" style="font-size:13px;" />
        <button id="tienda-search-btn" class="ali-search-btn">${svgs.buscar}</button>
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
              <a href="/dashboard" data-link style="display:block; padding:10px 14px; font-size:13px; color:#222; text-decoration:none;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Mi Panel</a>
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

        <button id="cart-drawer-open" style="border:none; background:none; text-align:center; font-size:12px; color:#555; cursor:pointer; position:relative; padding:0;">
          <div style="display:flex; justify-content:center;">${svgs.carrito}</div>
          <div style="font-weight:600; margin-top:2px;">Carrito</div>
          <span id="cart-badge" style="display:none; position:absolute; top:-4px; right:-8px; background:#e62e04; color:#fff; font-size:9px; font-weight:900; width:17px; height:17px; border-radius:50%; align-items:center; justify-content:center;">0</span>
        </button>
      </div>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:24px 0;">
  <div class="ali-container">
    <div style="display:grid; grid-template-columns:220px 1fr; gap:16px;">
      
      <!-- Panel Izquierdo: Filtros -->
      <div class="ali-filter-panel" style="align-self:start;">
        <h4 style="margin-bottom:12px;">Categorías</h4>
        <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:24px;" id="cat-filter-container">
          <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer; color:#333;">
            <input type="radio" name="catFilter" value="" checked style="accent-color:#e62e04;" />
            Todas
          </label>
          ${CATEGORIAS_TIENDA.map(cat => `
            <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer; color:#333;">
              <input type="radio" name="catFilter" value="${cat}" style="accent-color:#e62e04;" />
              ${cat}
            </label>
          `).join("")}
        </div>

        <h4 style="margin-bottom:12px;">Promociones</h4>
        <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer; color:#333; margin-bottom:12px;">
          <input type="checkbox" id="filter-ofertas" style="accent-color:#e62e04; width:16px; height:16px;" />
          Ver solo Ofertas ${svgs.fuego}
        </label>
      </div>

      <!-- Catálogo de Productos -->
      <div>
        <!-- Cabecera de listado -->
        <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:12px 16px; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between;">
          <span id="resultados-count" style="font-size:13px; color:#555; font-weight:600;">Cargando...</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; color:#777;">Ordenar por:</span>
            <select id="sort-select" style="border:1px solid #ddd; border-radius:2px; padding:4px 8px; font-size:12px; outline:none;">
              <option value="relevancia">Relevancia</option>
              <option value="precioAsc">Precio: Menor a Mayor</option>
              <option value="precioDesc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <div id="productos-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px;">
          <!-- Productos inyectados aquí -->
        </div>
      </div>

    </div>
  </div>
</main>

<!-- Carrito Lateral (Drawer) -->
<div id="cart-overlay" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:999; backdrop-filter:blur(2px);"></div>
<div id="cart-drawer" class="ali-cart-drawer" style="position:fixed; top:0; right:-400px; width:400px; height:100vh; z-index:1000; transition:right .3s ease; display:flex; flex-direction:column; max-width:100vw;">
  <div style="padding:16px 20px; border-bottom:1px solid #e8e8e8; display:flex; justify-content:space-between; align-items:center;">
    <h2 style="margin:0; font-size:18px; font-weight:800; color:#222; display:flex; align-items:center; gap:8px;">${svgs.carrito} Mi Carrito</h2>
    <button id="cart-drawer-close" style="background:none; border:none; font-size:24px; color:#999; cursor:pointer;">&times;</button>
  </div>
  
  <div style="background:#fff1ee; padding:10px 20px; border-bottom:1px solid #ffd6cc; font-size:12px; font-weight:700; color:#e62e04; text-align:center;">
    ¡Envío Gratis en compras superiores a $80.000 COP!
  </div>

  <div id="cart-items" style="flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:16px;">
    <!-- Items del carrito -->
  </div>

  <div style="padding:20px; border-top:1px solid #e8e8e8; background:#fafafa;">
    <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#555;">
      <span>Subtotal</span>
      <span id="cart-subtotal">$0</span>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size:13px; color:#e62e04; font-weight:700;">
      <span>Descuento (10% > $50k)</span>
      <span id="cart-discount">-$0</span>
    </div>
    <div style="display:flex; justify-content:space-between; margin-bottom:20px; font-size:18px; font-weight:900; color:#222;">
      <span>Total COP</span>
      <span id="cart-total">$0</span>
    </div>
    <button id="cart-checkout-btn" class="ali-btn" style="width:100%; padding:14px; font-size:16px;">Pagar y Completar Pedido</button>
  </div>
</div>
${COMMON_FOOTER}
`;
}

export async function setupTienda() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  const urlParams = new URLSearchParams(window.location.search);
  const qBuscar = urlParams.get("buscar") || "";
  const qCat = urlParams.get("categoria") || "";
  const qOfertas = urlParams.get("ofertas") === "true";

  if(qBuscar) document.getElementById("tienda-search").value = qBuscar;
  if(qCat) {
    const radio = document.querySelector(`input[name="catFilter"][value="${qCat}"]`);
    if(radio) radio.checked = true;
  }
  if(qOfertas) document.getElementById("filter-ofertas").checked = true;

  document.getElementById("tienda-search-btn").addEventListener("click", () => filterYRender());
  document.getElementById("tienda-search").addEventListener("keyup", (e) => {
    if(e.key === "Enter") filterYRender();
  });
  document.querySelectorAll('input[name="catFilter"]').forEach(r => r.addEventListener("change", filterYRender));
  document.getElementById("filter-ofertas").addEventListener("change", filterYRender);
  document.getElementById("sort-select").addEventListener("change", filterYRender);

  let todosProductos = [];
  try {
    todosProductos = await obtenerProductos();
    filterYRender();
  } catch {
    document.getElementById("productos-grid").innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#e62e04;font-weight:700;background:#fff1ee;padding:16px;border:1px solid #ffd6cc;">Error al cargar catálogo.</p>`;
  }

  function filterYRender() {
    const searchTxt = document.getElementById("tienda-search").value.toLowerCase();
    const catSelec = document.querySelector('input[name="catFilter"]:checked').value;
    const soloOfertas = document.getElementById("filter-ofertas").checked;
    const sortVal = document.getElementById("sort-select").value;

    let filtrados = todosProductos.filter(p => {
      if (catSelec && p.categoria !== catSelec) return false;
      if (soloOfertas && !p.esOferta) return false;
      if (searchTxt && !p.nombre.toLowerCase().includes(searchTxt) && !p.categoria.toLowerCase().includes(searchTxt)) return false;
      return true;
    });

    if(sortVal === "precioAsc") filtrados.sort((a,b) => calcularPrecio(a) - calcularPrecio(b));
    else if(sortVal === "precioDesc") filtrados.sort((a,b) => calcularPrecio(b) - calcularPrecio(a));
    else filtrados.sort((a,b) => b.id - a.id);

    renderGrid(filtrados);
    document.getElementById("resultados-count").textContent = `${filtrados.length} resultados encontrados`;
  }

  function calcularPrecio(p) {
    return p.esOferta ? p.precio - (p.precio * (p.descuento / 100)) : p.precio;
  }

  function renderGrid(productos) {
    const grid = document.getElementById("productos-grid");
    if (productos.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; padding:64px; text-align:center; background:#fff; border:1px solid #e8e8e8; border-radius:4px;">
          <div style="color:#ddd; margin-bottom:16px; display:flex; justify-content:center;">${svgs.buscar}</div>
          <p style="font-size:16px; font-weight:700; color:#555; margin:0 0 8px;">No encontramos resultados</p>
          <p style="font-size:13px; color:#aaa; margin:0;">Prueba con otras palabras clave o elimina los filtros.</p>
        </div>`;
      return;
    }

    grid.innerHTML = productos.map(p => {
      const precioFinal = calcularPrecio(p);
      let starsHtml = "";
      for(let i=0; i<5; i++) starsHtml += svgs.star;

      return `
      <div class="ali-card" style="display:flex; flex-direction:column;">
        <div style="height:180px; position:relative; overflow:hidden; background:#f5f5f5;">
          <img src="${p.imagen}" style="width:100%; height:100%; object-fit:cover;" />
          ${p.esOferta ? `<span class="ali-badge" style="position:absolute; top:8px; left:8px;">-${p.descuento}%</span>` : ""}
          ${p.stock === 0 ? `<div style="position:absolute; inset:0; background:rgba(255,255,255,0.7); display:flex; align-items:center; justify-content:center; font-weight:900; color:#f5222d; font-size:18px; transform:rotate(-15deg);">AGOTADO</div>` : ""}
        </div>
        <div style="padding:12px; flex:1; display:flex; flex-direction:column; gap:4px;">
          <p style="font-size:13px; font-weight:600; color:#222; line-height:1.4; margin:0; overflow:hidden; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical;">${p.nombre}</p>
          <div style="color:var(--ali-yellow); margin-top:2px; display:flex; align-items:center; gap:2px;">
            ${starsHtml} <span style="color:#777; font-size:10px; margin-left:4px;">1k+ vendidos</span>
          </div>
          <div style="margin-top:auto; padding-top:8px;">
            ${p.esOferta ? `<div class="ali-original-price">$${p.precio.toLocaleString()}</div>` : ""}
            <div class="ali-price" style="font-size:18px;">$${precioFinal.toLocaleString()}</div>
            <div style="font-size:10px; color:#555; margin-top:2px;">Stock: ${p.stock}</div>
            <button class="add-to-cart ali-btn" data-id="${p.id}" ${p.stock === 0 ? "disabled" : ""} style="width:100%; margin-top:8px; ${p.stock === 0 ? 'background:#ccc;cursor:not-allowed;' : ''}">
              ${p.stock === 0 ? 'Sin Stock' : 'Añadir al carrito'}
            </button>
          </div>
        </div>
      </div>
      `;
    }).join("");

    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        const prod = todosProductos.find(p => p.id === id);
        if(prod) addToCart(prod);
      });
    });
  }

  // Lógica del Carrito Lateral
  let carrito = JSON.parse(localStorage.getItem("la-arenosa-cart")) || [];
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  
  function openCart() { drawer.style.right = "0"; overlay.style.display = "block"; document.body.style.overflow="hidden"; }
  function closeCart() { drawer.style.right = "-400px"; overlay.style.display = "none"; document.body.style.overflow=""; }
  
  document.getElementById("cart-drawer-open").addEventListener("click", openCart);
  document.getElementById("cart-drawer-close").addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);

  function addToCart(p) {
    const itemEnCart = carrito.find(x => x.id === p.id);
    if(itemEnCart) {
      if(itemEnCart.cantidad < p.stock) itemEnCart.cantidad++;
      else alert("No hay más stock disponible de este producto.");
    } else {
      carrito.push({...p, cantidad: 1});
    }
    guardarYRenderCart();
    openCart();
  }

  function guardarYRenderCart() {
    localStorage.setItem("la-arenosa-cart", JSON.stringify(carrito));
    renderCart();
  }

  function renderCart() {
    const container = document.getElementById("cart-items");
    const badge = document.getElementById("cart-badge");
    
    let totalItems = 0;
    let subtotal = 0;

    if(carrito.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:40px 0; color:#aaa;">
          <div style="display:flex; justify-content:center; margin-bottom:16px;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </div>
          <p style="font-size:14px; font-weight:700; color:#555; margin:0 0 8px;">Tu carrito está vacío</p>
          <p style="font-size:12px;">¡Agrega algunos herrajes y empieza a crear!</p>
        </div>`;
      badge.style.display = "none";
    } else {
      container.innerHTML = carrito.map((c, index) => {
        totalItems += c.cantidad;
        const precioUnitario = c.esOferta ? c.precio - (c.precio * (c.descuento/100)) : c.precio;
        subtotal += precioUnitario * c.cantidad;

        return `
        <div style="display:flex; gap:12px; padding:12px; border:1px solid #e8e8e8; border-radius:4px; background:#fff;">
          <img src="${c.imagen}" style="width:60px; height:60px; object-fit:cover; border-radius:2px; border:1px solid #f0f0f0;" />
          <div style="flex:1; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; gap:8px;">
              <p style="font-size:12px; font-weight:600; color:#222; margin:0; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${c.nombre}</p>
              <button class="cart-remove" data-index="${index}" style="background:none; border:none; color:#999; cursor:pointer; padding:0; height:fit-content;" onmouseover="this.style.color='#f5222d'" onmouseout="this.style.color='#999'">${svgs.trash}</button>
            </div>
            <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:flex-end;">
              <div style="display:flex; align-items:center; border:1px solid #ddd; border-radius:2px; overflow:hidden;">
                <button class="cart-minus" data-index="${index}" style="background:#f9f9f9; border:none; border-right:1px solid #ddd; width:24px; height:24px; display:flex; align-items:center; justify-content:center; cursor:pointer;">-</button>
                <div style="width:30px; text-align:center; font-size:12px; font-weight:600;">${c.cantidad}</div>
                <button class="cart-plus" data-index="${index}" style="background:#f9f9f9; border:none; border-left:1px solid #ddd; width:24px; height:24px; display:flex; align-items:center; justify-content:center; cursor:pointer;">+</button>
              </div>
              <p style="font-size:14px; font-weight:800; color:#e62e04; margin:0;">$${(precioUnitario * c.cantidad).toLocaleString()}</p>
            </div>
          </div>
        </div>
        `;
      }).join("");

      badge.style.display = "flex";
      badge.textContent = totalItems;
    }

    let descuentoGlobal = 0;
    if(subtotal > 50000) {
      descuentoGlobal = subtotal * 0.10;
    }
    const totalFinal = subtotal - descuentoGlobal;

    document.getElementById("cart-subtotal").textContent = "$" + subtotal.toLocaleString();
    document.getElementById("cart-discount").textContent = "-$" + descuentoGlobal.toLocaleString();
    document.getElementById("cart-total").textContent = "$" + totalFinal.toLocaleString();

    document.querySelectorAll(".cart-plus").forEach(btn => btn.addEventListener("click", (e) => {
      const idx = e.currentTarget.getAttribute("data-index");
      if(carrito[idx].cantidad < carrito[idx].stock) carrito[idx].cantidad++;
      guardarYRenderCart();
    }));
    document.querySelectorAll(".cart-minus").forEach(btn => btn.addEventListener("click", (e) => {
      const idx = e.currentTarget.getAttribute("data-index");
      if(carrito[idx].cantidad > 1) carrito[idx].cantidad--;
      guardarYRenderCart();
    }));
    document.querySelectorAll(".cart-remove").forEach(btn => btn.addEventListener("click", (e) => {
      const idx = e.currentTarget.getAttribute("data-index");
      carrito.splice(idx, 1);
      guardarYRenderCart();
    }));
  }

  document.getElementById("cart-checkout-btn").addEventListener("click", async () => {
    const usr = obtenerSesion();
    if(!usr) {
      alert("Inicia sesión para completar tu pedido.");
      navigate("/login");
      return;
    }
    if(carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    try {
      const response = await procesarCompra(usr.id, carrito);
      if(response.error) {
        alert("Error: " + response.error);
        return;
      }
      carrito = [];
      localStorage.removeItem("la-arenosa-cart");
      renderCart();
      closeCart();
      alert("¡Pedido realizado con éxito! En breve será despachado.");
      navigate("/mis-compras");
    } catch {
      alert("Ocurrió un error al procesar el pedido.");
    }
  });

  // Render inicial del carrito side
  renderCart();
}
