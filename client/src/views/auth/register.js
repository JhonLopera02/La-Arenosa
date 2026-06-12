import { registrarUsuario, guardarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";
import { svgs } from "../../utils/icons.js";

export function renderRegister() {
  return `
<div style="background:#e62e04; color:#fff; text-align:center; font-size:12px; font-weight:700; padding:8px;">
  ${svgs.fuego} ¡DESCUENTO DEL 10% EN COMPRAS SUPERIORES A $50.000! ${svgs.fuego}
</div>

<header style="background:#fff; border-bottom:2px solid #e8e8e8; padding:12px 0; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
  <div class="ali-container" style="display:flex; align-items:center; justify-content:space-between;">
    <a href="/" data-link style="display:flex; align-items:center; gap:8px; text-decoration:none;">
      <div style="background:#e62e04; color:#fff; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:13px; font-style:italic;">LA</div>
      <div>
        <div style="font-size:17px; font-weight:900; color:#e62e04; line-height:1;">La Arenosa</div>
        <div style="font-size:9px; color:#777; font-weight:600; letter-spacing:1px; text-transform:uppercase;">Insumos de Confección</div>
      </div>
    </a>
    <a href="/login" data-link style="font-size:13px; color:#e62e04; font-weight:700; text-decoration:none; border:1px solid #e62e04; padding:6px 16px; border-radius:2px;" onmouseover="this.style.background='#fff1ee'" onmouseout="this.style.background='transparent'">Ya tengo cuenta</a>
  </div>
</header>

<main style="background:#f5f5f5; min-height:100vh; display:flex; align-items:center; justify-content:center; padding:32px 16px;">
  <div style="display:grid; grid-template-columns:1fr 1fr; max-width:900px; width:100%; background:#fff; border:1px solid #e8e8e8; border-radius:4px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
    <!-- Panel izquierdo -->
    <div style="background:linear-gradient(135deg, #e62e04, #ff6900); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 32px; text-align:center;">
      <div style="background:rgba(255,255,255,0.15); width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:900; font-size:28px; font-style:italic; color:#fff; margin-bottom:20px; border:2px solid rgba(255,255,255,0.3);">LA</div>
      <h2 style="color:#fff; font-size:24px; font-weight:900; margin:0 0 10px;">La Arenosa</h2>
      <p style="color:rgba(255,255,255,0.8); font-size:13px; line-height:1.7; margin:0 0 24px;">Únete y empieza a comprar los mejores insumos de confección.</p>
      <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
        ${["📦 Envíos rápidos","🔥 Ofertas exclusivas","💳 Pagos seguros"].map(v => `
          <div style="background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.9); font-size:12px; font-weight:600; padding:8px 14px; border-radius:2px; text-align:left; border:1px solid rgba(255,255,255,0.2); display:flex; align-items:center; gap:8px;">${svgs.check} ${v.substring(2)}</div>
        `).join("")}
      </div>
    </div>

    <!-- Panel derecho: formulario -->
    <div style="padding:48px 40px;">
      <h1 style="font-size:24px; font-weight:900; color:#222; margin:0 0 6px;">Crear Cuenta</h1>
      <p style="font-size:13px; color:#777; margin:0 0 28px;">Completa tus datos para registrarte gratis.</p>

      <div id="register-error" style="display:none; background:#fff1ee; border:1px solid #ffd6cc; border-left:4px solid #e62e04; padding:10px 14px; font-size:13px; color:#e62e04; font-weight:600; border-radius:2px; margin-bottom:20px;"></div>

      <form id="register-form" style="display:grid; gap:16px;">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Nombre</label>
            <input id="register-name" type="text" placeholder="Tu nombre"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Apellido</label>
            <input id="register-lastname" type="text" placeholder="Tu apellido"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
        </div>
        <div>
          <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Correo Electrónico</label>
          <input id="register-email" type="email" placeholder="usuario@laarenosa.co"
            style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
            onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Contraseña</label>
            <input id="register-password" type="password" placeholder="Min. 6 caracteres"
              style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box;"
              onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'" />
          </div>
          <div>
            <label style="display:block; font-size:12px; font-weight:700; color:#555; margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px;">Rol</label>
            <select id="register-role" style="width:100%; border:1px solid #ddd; border-radius:2px; padding:10px 14px; font-size:14px; outline:none; transition:border-color .2s; box-sizing:border-box; background:#fff;" onfocus="this.style.borderColor='#e62e04'" onblur="this.style.borderColor='#ddd'">
              <option value="USER">Cliente (USER)</option>
              <option value="ADMIN">Administrador (ADMIN)</option>
            </select>
          </div>
        </div>
        <button type="submit" class="ali-btn" style="width:100%; padding:12px; font-size:15px; border-radius:2px; margin-top:4px;">
          Registrarme →
        </button>
      </form>
      <p style="text-align:center; font-size:13px; color:#777; margin-top:20px;">
        ¿Ya tienes cuenta? <a href="/login" data-link style="color:#e62e04; font-weight:700; text-decoration:none;">Inicia sesión</a>
      </p>
    </div>
  </div>
</main>
`;
}

export function setupRegister() {
  const form = document.getElementById("register-form");
  const errorBox = document.getElementById("register-error");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("register-name").value.trim();
    const apellido = document.getElementById("register-lastname").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const role = document.getElementById("register-role").value;
    if (!nombre || !apellido || !email || !password) {
      errorBox.innerHTML = `${svgs.x} Por favor completa todos los campos.`;
      errorBox.style.display = "block";
      return;
    }
    try {
      const usuarioCreado = await registrarUsuario({ name: nombre, lastName: apellido, email, password, role: [role] });
      guardarSesion(usuarioCreado);
      navigate("/dashboard");
    } catch {
      errorBox.innerHTML = `${svgs.x} No se pudo registrar. Intenta de nuevo.`;
      errorBox.style.display = "block";
    }
  });
}
