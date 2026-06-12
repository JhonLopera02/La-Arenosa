import "./styles/global.css";
import { initRouter, renderRoute, navigate } from "./router/router.js";
import { initTheme } from "./utils/theme.js";

// Inicializa el tema (Oscuro/Claro) antes de renderizar
initTheme();

// Arranca el router: escucha cambios de historial
initRouter();
// Renderiza la vista para la URL actual
renderRoute();

// Intercepta todos los clics en enlaces con data-link
document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  }
});
