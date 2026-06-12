import { crearProducto, obtenerProductoPorId, actualizarProducto } from "../../services/producto.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { CATEGORIAS_TIENDA } from "../home.js";
import { svgs, COMMON_HEADER, COMMON_FOOTER } from "../../utils/icons.js";

export function renderProductoForm() {
  const usuario = obtenerSesion();
  if (!usuario?.role.includes("ADMIN")) {
    navigate("/");
    return "";
  }

  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get("id");
  const titulo = idProducto ? "Editar Producto" : "Nuevo Producto";

  return COMMON_HEADER + `
      <div style="display:flex; align-items:center; gap:16px; flex-shrink:0;">
        <div style="position:relative; cursor:pointer;" id="account-dropdown-trigger">
          <div style="text-align:center; font-size:12px; color:#555;">
            <div style="display:flex; justify-content:center; color:#e62e04;">${svgs.admin}</div>
            <div style="font-weight:600; white-space:nowrap; margin-top:2px; color:#e62e04;">Admin</div>
          </div>
          <div id="account-menu" style="display:none; position:absolute; right:0; top:110%; background:#fff; border:1px solid #e8e8e8; min-width:180px; box-shadow:0 4px 16px rgba(0,0,0,0.12); z-index:200; border-radius:4px; overflow:hidden;">
            <a href="/admin-productos" data-link style="display:block; padding:10px 14px; font-size:13px; font-weight:700; color:#e62e04; text-decoration:none; border-bottom:1px solid #f0f0f0;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Inventario</a>
            <button id="logout-btn" style="width:100%; text-align:left; padding:10px 14px; font-size:13px; color:#e62e04; border:none; background:none; cursor:pointer;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:32px 0;">
  <div class="ali-container" style="max-width:800px;">
    
    <div style="display:flex; align-items:center; gap:16px; margin-bottom:24px;">
      <a href="/admin-productos" data-link style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; background:#fff; border:1px solid #e8e8e8; border-radius:4px; color:#555; text-decoration:none; transition:all .15s;" onmouseover="this.style.borderColor='#e62e04';this.style.color='#e62e04'" onmouseout="this.style.borderColor='#e8e8e8';this.style.color='#555'">&larr;</a>
      <h1 class="ali-section-title" style="font-size:24px; color:#e62e04; margin:0;" id="form-titulo">${titulo}</h1>
    </div>

    <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:32px;">
      <div id="form-error" style="display:none; background:#fff1ee; border:1px solid #ffd6cc; border-left:4px solid #e62e04; padding:12px 16px; font-size:13px; color:#e62e04; font-weight:700; border-radius:2px; margin-bottom:20px;"></div>
      
      <form id="producto-form" style="display:grid; gap:20px;">
        <input type="hidden" id="prod-id" />
        
        <div style="display:grid; grid-template-columns:2fr 1fr; gap:16px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Nombre del Producto</label>
            <input id="prod-nombre" type="text" placeholder="Ej: Cierre diente de perro 15cm" required
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Categoría</label>
            <select id="prod-categoria" required
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box; background:#fff;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'">
              <option value="">Selecciona...</option>
              ${CATEGORIAS_TIENDA.map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
          </div>
        </div>

        <div>
          <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">URL de la Imagen</label>
          <input id="prod-imagen" type="url" placeholder="https://ejemplo.com/imagen.jpg" required
            style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
            onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
        </div>

        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:16px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Precio (COP)</label>
            <input id="prod-precio" type="number" min="0" placeholder="0" required
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Stock Inicial</label>
            <input id="prod-stock" type="number" min="0" placeholder="0" required
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">¿Es Oferta?</label>
            <div style="display:flex; align-items:center; gap:8px; height:42px; padding:0 14px; border:1px solid #ddd; border-radius:2px; background:#fafafa;">
              <input type="checkbox" id="prod-esOferta" style="width:16px; height:16px; accent-color:#e62e04; cursor:pointer;" />
              <span style="font-size:13px; color:#555; font-weight:600;">Sí, aplicar DCTO</span>
            </div>
          </div>
        </div>

        <div id="descuento-container" style="display:none;">
          <label style="display:block; font-size:12px; font-weight:700; color:#e62e04; margin-bottom:6px; text-transform:uppercase;">Porcentaje de Descuento (%)</label>
          <input id="prod-descuento" type="number" min="1" max="99" value="0"
            style="width:100%; border:1px solid #ffd6cc; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box; background:#fff1ee; color:#e62e04; font-weight:700;"
            onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ffd6cc'" />
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:16px; padding-top:20px; border-top:1px solid #e8e8e8;">
          <a href="/admin-productos" data-link class="ali-btn-outline" style="background:#fff;">Cancelar</a>
          <button type="submit" class="ali-btn">Guardar Producto</button>
        </div>
      </form>
    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export async function setupProductoForm() {
  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  const trigger = document.getElementById("account-dropdown-trigger");
  const menu = document.getElementById("account-menu");
  trigger?.addEventListener("mouseenter", () => menu.style.display = "block");
  trigger?.addEventListener("mouseleave", () => setTimeout(() => { if (!menu.matches(":hover")) menu.style.display = "none"; }, 150));
  menu?.addEventListener("mouseleave", () => menu.style.display = "none");

  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get("id");
  
  const checkboxOferta = document.getElementById("prod-esOferta");
  const descuentoCont = document.getElementById("descuento-container");
  
  checkboxOferta.addEventListener("change", (e) => {
    descuentoCont.style.display = e.target.checked ? "block" : "none";
  });

  if (idProducto) {
    try {
      const p = await obtenerProductoPorId(idProducto);
      document.getElementById("prod-id").value = p.id;
      document.getElementById("prod-nombre").value = p.nombre;
      document.getElementById("prod-categoria").value = p.categoria;
      document.getElementById("prod-precio").value = p.precio;
      document.getElementById("prod-stock").value = p.stock;
      document.getElementById("prod-imagen").value = p.imagen;
      if (p.esOferta) {
        checkboxOferta.checked = true;
        descuentoCont.style.display = "block";
        document.getElementById("prod-descuento").value = p.descuento || 0;
      }
    } catch {
      alert("Error cargando el producto.");
      navigate("/admin-productos");
    }
  }

  document.getElementById("producto-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorBox = document.getElementById("form-error");
    
    const prod = {
      nombre: document.getElementById("prod-nombre").value.trim(),
      categoria: document.getElementById("prod-categoria").value,
      precio: parseFloat(document.getElementById("prod-precio").value),
      stock: parseInt(document.getElementById("prod-stock").value),
      imagen: document.getElementById("prod-imagen").value.trim(),
      esOferta: document.getElementById("prod-esOferta").checked,
      descuento: parseInt(document.getElementById("prod-descuento").value) || 0
    };

    if (!prod.nombre || !prod.categoria || isNaN(prod.precio) || isNaN(prod.stock) || !prod.imagen) {
      errorBox.innerHTML = `${svgs.x} Completa los campos obligatorios.`;
      errorBox.style.display = "block";
      return;
    }

    try {
      if (idProducto) {
        await actualizarProducto(idProducto, prod);
        alert("Producto actualizado con éxito.");
      } else {
        await crearProducto(prod);
        alert("Producto creado con éxito.");
      }
      navigate("/admin-productos");
    } catch {
      errorBox.innerHTML = `${svgs.x} Error al guardar el producto. Intenta de nuevo.`;
      errorBox.style.display = "block";
    }
  });
}
