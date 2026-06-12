import { obtenerSesion, cerrarSesion, guardarSesion } from "../../services/auth.service.js";
import { actualizarUsuario, eliminarUsuario } from "../../services/user.service.js";
import { navigate } from "../../router/router.js";
import { svgs, COMMON_FOOTER } from "../../utils/icons.js";

export function renderProfile() {
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
      <a href="/dashboard" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.user} Mi Panel</a>
      <a href="/mis-compras" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.box} Mis Pedidos</a>
      ${usuario?.role.includes("ADMIN") ? `<a href="/admin" data-link style="text-decoration:none; color:#555; font-size:13px; font-weight:600; display:flex; align-items:center; gap:4px;">${svgs.admin} Admin</a>` : ""}
      <button id="logout-btn" style="border:none; background:none; color:#777; font-size:13px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:4px;" onmouseover="this.style.color='#e62e04'" onmouseout="this.style.color='#777'">Salir</button>
    </div>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; padding:32px 0;">
  <div class="ali-container">
    <div style="display:grid; grid-template-columns:300px 1fr; gap:24px;">
      
      <!-- Panel Izquierdo -->
      <div style="background:linear-gradient(135deg, #e62e04, #ff6900); border-radius:4px; padding:32px 24px; color:#fff; text-align:center;">
        <div style="width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.2); border:2px solid rgba(255,255,255,0.4); display:flex; align-items:center; justify-content:center; font-weight:900; font-size:28px; margin:0 auto 16px; font-style:italic;">LA</div>
        <p style="font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin:0 0 4px; opacity:0.9;">Mi Cuenta</p>
        <h1 style="font-size:24px; font-weight:900; margin:0 0 24px;">Mi Perfil</h1>
        
        <div style="background:rgba(0,0,0,0.1); border-radius:4px; padding:12px; margin-bottom:12px; text-align:left;">
          <p style="font-size:11px; color:rgba(255,255,255,0.7); margin:0 0 4px; text-transform:uppercase;">Rol de cuenta</p>
          <p style="font-size:13px; font-weight:800; margin:0;">${usuario?.role?.join(", ")}</p>
        </div>
        <div style="background:rgba(0,0,0,0.1); border-radius:4px; padding:12px; text-align:left;">
          <p style="font-size:11px; color:rgba(255,255,255,0.7); margin:0 0 4px; text-transform:uppercase;">Correo registrado</p>
          <p style="font-size:13px; font-weight:700; margin:0; word-break:break-all;">${usuario?.email || "—"}</p>
        </div>
      </div>

      <!-- Formulario -->
      <div style="background:#fff; border:1px solid #e8e8e8; border-radius:4px; padding:32px;">
        <h2 class="ali-section-title" style="margin-bottom:24px;">Actualizar Datos</h2>
        
        <div id="profile-success" style="display:none; background:#f6ffed; border:1px solid #b7eb8f; color:#52c41a; padding:12px 16px; font-size:13px; font-weight:700; border-radius:2px; margin-bottom:20px;"></div>
        <div id="profile-error" style="display:none; background:#fff1ee; border:1px solid #ffd6cc; border-left:4px solid #e62e04; color:#e62e04; padding:12px 16px; font-size:13px; font-weight:700; border-radius:2px; margin-bottom:20px;"></div>
        
        <form id="profile-form" style="display:grid; gap:20px; max-width:500px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Nombre</label>
            <input id="name" type="text" value="${usuario?.name || ""}"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Apellido</label>
            <input id="lastname" type="text" value="${usuario?.lastName || ""}"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Correo Electrónico</label>
            <input id="profile-email" type="email" value="${usuario?.email || ""}"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase;">Nueva Contraseña (opcional)</label>
            <input id="password-new" type="password" placeholder="Dejar vacío para no cambiar"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div style="display:flex; gap:12px; margin-top:8px;">
            <button type="submit" class="ali-btn">Guardar Cambios</button>
            <button type="button" id="delete-account-btn" style="background:#fff; color:#f5222d; border:1px solid #f5222d; border-radius:2px; font-weight:700; font-size:13px; padding:8px 20px; cursor:pointer;" onmouseover="this.style.background='#fff1f0'" onmouseout="this.style.background='#fff'">Eliminar Mi Cuenta</button>
          </div>
        </form>
      </div>

    </div>
  </div>
</main>
${COMMON_FOOTER}
`;
}

export function setupProfile() {
  const usuario = obtenerSesion();

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion(); navigate("/login");
  });

  document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const successBox = document.getElementById("profile-success");
    const errorBox = document.getElementById("profile-error");
    const datosActualizados = {
      ...usuario,
      name: document.getElementById("name").value.trim(),
      lastName: document.getElementById("lastname").value.trim(),
      email: document.getElementById("profile-email").value.trim(),
      password: document.getElementById("password-new").value.trim() || usuario.password,
    };
    try {
      const actualizado = await actualizarUsuario(usuario.id, datosActualizados);
      guardarSesion(actualizado);
      successBox.innerHTML = `${svgs.check} Perfil actualizado correctamente.`;
      successBox.style.display = "block";
      errorBox.style.display = "none";
    } catch {
      errorBox.innerHTML = `${svgs.x} Error al guardar los cambios. Verifica la conexión.`;
      errorBox.style.display = "block";
      successBox.style.display = "none";
    }
  });

  document.getElementById("delete-account-btn").addEventListener("click", async () => {
    if (confirm("¿Seguro que quieres eliminar tu cuenta de La Arenosa? Esta acción es irreversible.")) {
      try {
        await eliminarUsuario(usuario.id);
        cerrarSesion();
        navigate("/login");
      } catch {
        alert("Error al eliminar la cuenta.");
      }
    }
  });
}
