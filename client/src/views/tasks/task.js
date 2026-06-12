import { obtenerTareas, eliminarTarea } from "../../services/task.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";

export function renderTask() {
  const usuario = obtenerSesion();

  return `
<header class="border-b border-blue-100 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a class="text-xl font-black text-blue-900" href="/" data-link>TaskFlowSPA</a>
    <nav class="hidden gap-3 md:flex">
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard" data-link>Dashboard</a>
      <a class="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white" href="/task" data-link>Tareas</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile" data-link>Perfil</a>
      ${usuario?.role.includes("ADMIN") ? `<a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/admin" data-link>Admin</a>` : ""}
      <a id="logout-btn" class="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Salir</a>
    </nav>
  </div>
</header>

<main class="mx-auto max-w-6xl px-6 py-10">
  <section class="flex flex-col gap-4 rounded-[2rem] bg-indigo-600 px-8 py-10 text-white md:flex-row md:items-end md:justify-between">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">Mis tareas</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight">Lista de tareas</h1>
      <p class="mt-4 max-w-2xl text-blue-50">Gestiona, edita y elimina tus tareas.</p>
    </div>
    <a class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50" href="/task-form" data-link>
      Crear tarea
    </a>
  </section>

  <section id="lista-tareas" class="mt-8 grid gap-4">
    <p class="text-slate-500">Cargando tareas...</p>
  </section>
</main>`;
}

export async function setupTask() {
  const usuario = obtenerSesion();

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion();
    navigate("/login");
  });

  const lista = document.getElementById("lista-tareas");

  try {
    const tareas = await obtenerTareas(usuario.id);

    if (tareas.length === 0) {
      lista.innerHTML = `<p class="text-slate-500">No tienes tareas todavía. <a class="font-semibold text-indigo-600" href="/task-form" data-link>Crea una</a>.</p>`;
      return;
    }

    lista.innerHTML = tareas.map(tarea => `
      <article class="rounded-3xl border border-blue-100 bg-white p-6 shadow-lg shadow-blue-50">
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600">${tarea.status}</p>
            <h2 class="mt-2 text-2xl font-bold text-slate-900">${tarea.title}</h2>
            <p class="mt-3 max-w-2xl text-slate-600">${tarea.description || ""}</p>
            ${tarea.date ? `<p class="mt-2 text-xs text-slate-400">Fecha límite: ${tarea.date}</p>` : ""}
          </div>
          <div class="flex gap-3">
            <a class="rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
               href="/task-form?id=${tarea.id}" data-link>Editar</a>
            <button class="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-violet-600 hover:bg-red-50"
               data-delete="${tarea.id}">Eliminar</button>
          </div>
        </div>
      </article>
    `).join("");

    // Botones de eliminar
    lista.querySelectorAll("[data-delete]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-delete");
        if (confirm("¿Eliminar esta tarea?")) {
          await eliminarTarea(id);
          setupTask(); // recarga la lista
        }
      });
    });

  } catch {
    lista.innerHTML = `<p class="text-violet-500">Error al cargar las tareas.</p>`;
  }
}
