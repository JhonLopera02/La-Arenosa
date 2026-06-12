import { renderLogin, setupLogin } from "../views/auth/login.js";
import { renderNotFound } from "../views/auth/not-found.js";
import { renderRegister, setupRegister } from "../views/auth/register.js";
import { renderHome, setupHome } from "../views/home.js";
import { renderAdmin, setupAdmin } from "../views/users/admin.js";
import { renderDashboard, setupDashboard } from "../views/users/dashboard.js";
import { renderProfile, setupProfile } from "../views/users/profile.js";
import { renderTienda, setupTienda } from "../views/tienda/tienda.js";
import { renderMisCompras, setupMisCompras } from "../views/tienda/mis-compras.js";
import { renderAdminProductos, setupAdminProductos } from "../views/tienda/admin-productos.js";
import { renderProductoForm, setupProductoForm } from "../views/tienda/producto-form.js";
import { renderAdminCompras, setupAdminCompras } from "../views/tienda/admin-compras.js";

const routes = {
  "/": {
    render: renderHome,
    setup: setupHome,
  },

  "/login": {
    render: renderLogin,
    setup: setupLogin,
  },

  "/register": {
    render: renderRegister,
    setup: setupRegister,
  },

  "/dashboard": {
    render: renderDashboard,
    setup: setupDashboard,
    protected: true,
  },

  "/admin": {
    render: renderAdmin,
    setup: setupAdmin,
    protected: true,
    adminOnly: true,
  },

  "/profile": {
    render: renderProfile,
    setup: setupProfile,
    protected: true,
  },

  "/tienda": {
    render: renderTienda,
    setup: setupTienda,
  },

  "/mis-compras": {
    render: renderMisCompras,
    setup: setupMisCompras,
    protected: true,
  },

  "/admin-productos": {
    render: renderAdminProductos,
    setup: setupAdminProductos,
    protected: true,
    adminOnly: true,
  },

  "/producto-form": {
    render: renderProductoForm,
    setup: setupProductoForm,
    protected: true,
    adminOnly: true,
  },

  "/admin-compras": {
    render: renderAdminCompras,
    setup: setupAdminCompras,
    protected: true,
    adminOnly: true,
  },

  "/notFound": {
    render: renderNotFound,
  },
};

export default routes;
