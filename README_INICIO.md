# CinePolis — Cómo correr el proyecto

## Requisitos
- Node.js instalado

---

## 1. Iniciar la API (backend)

```bash
cd api
npm install
npm start
```

La API queda corriendo en: http://localhost:3000

---

## 2. Iniciar el cliente (frontend)

Abre otra terminal:

```bash
cd client
npm install
npm run dev
```

El cliente queda corriendo en: http://localhost:5173

---

## Qué hace cada carpeta

```
TaskFlowSPA/
├── api/
│   ├── database/db.json      ← aquí se guardan usuarios y tareas
│   └── package.json          ← npm start levanta el servidor
│
└── client/
    └── src/
        ├── main.js            ← punto de entrada, inicia el router
        ├── router/
        │   ├── router.js      ← lógica de navegación SPA
        │   └── routes.js      ← lista de rutas y sus vistas
        ├── services/
        │   ├── auth.service.js   ← login, registro, sesión
        │   ├── task.service.js   ← CRUD de tareas
        │   └── user.service.js   ← gestión de usuarios
        └── views/
            ├── auth/          ← login, register, 404
            ├── tasks/         ← lista de tareas, formulario
            └── users/         ← dashboard, perfil, admin
```

## Funcionalidades implementadas

- Registro de usuarios (se guardan en la API)
- Login con validación real (busca en la base de datos)
- Sesión guardada en localStorage
- Rutas protegidas (redirigen al login si no hay sesión)
- Ruta de admin (solo accesible con rol ADMIN)
- CRUD completo de tareas (crear, listar, editar, eliminar)
- Perfil editable con opción de eliminar cuenta
- Panel de admin: ver usuarios, cambiar rol, eliminar
- Dashboard con contadores reales de tareas
- Navegación SPA sin recargar la página
