import routes from "./routes.js";

const app = document.getElementById("app");

// Navega a una ruta sin recargar la página
export function navigate(path) {
  window.history.pushState({}, "", path);
  renderRoute();
}

// Renderiza la vista según la ruta actual
export function renderRoute() {
  const path = window.location.pathname;
  const route = routes[path];

  if (!route) {
    // Si la ruta no existe, redirige al 404
    app.innerHTML = routes["/notFound"].render();
    routes["/notFound"].setup?.();
    return;
  }

  // Si la ruta requiere login y no hay sesión, redirige
  if (route.protected) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      navigate("/login");
      return;
    }
  }

  // Si la ruta es solo para admin
  if (route.adminOnly) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario || !usuario.role.includes("ADMIN")) {
      navigate("/dashboard");
      return;
    }
  }

  app.innerHTML = route.render();

  // Ejecuta la lógica JS de la vista después de insertar el HTML
  route.setup?.();
}

// Escucha cuando el usuario usa los botones atrás/adelante del navegador
export function initRouter() {
  window.addEventListener("popstate", renderRoute);
}
