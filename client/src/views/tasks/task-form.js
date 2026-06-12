import { crearTarea, obtenerTareaPorId, actualizarTarea } from "../../services/task.service.js";
import { obtenerSesion, cerrarSesion } from "../../services/auth.service.js";
import { navigate } from "../../router/router.js";

export function renderTaskForm() {
  return `
<header class="border-b border-blue-100 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
    <a class="text-xl font-black text-blue-900" href="/" data-link>TaskFlowSPA</a>
    <nav class="hidden gap-3 md:flex">
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/dashboard" data-link>Dashboard</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/task" data-link>Tareas</a>
      <a class="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700" href="/profile" data-link>Perfil</a>
      <a id="logout-btn" class="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50">Salir</a>
    </nav>
  </div>
</header>

<main class="mx-auto max-w-5xl px-6 py-10">
  <section class="rounded-[2rem] border border-blue-100 bg-white p-8 shadow-xl shadow-blue-50">
    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Formulario</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-900" id="form-title">Crear tarea</h1>

    <form id="task-form" class="mt-8 grid gap-5">
      <input type="hidden" id="task-id" />
      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="title">Título</label>
        <input id="title" type="text" placeholder="Ej. Preparar proyecto final"
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none" />
      </div>

      <div>
        <label class="mb-2 block text-sm font-medium text-slate-700" for="description">Descripción</label>
        <textarea id="description" rows="5" placeholder="Describe la tarea..."
          class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"></textarea>
      </div>

      <div class="grid gap-5 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="status">Estado</label>
          <select id="status" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none">
            <option>Pendiente</option>
            <option>En progreso</option>
            <option>Completada</option>
          </select>
        </div>
        <div>
          <label class="mb-2 block text-sm font-medium text-slate-700" for="date">Fecha límite</label>
          <input id="date" type="date" class="w-full rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-slate-900 focus:border-blue-400 focus:outline-none" />
        </div>
      </div>

      <div id="form-error" class="hidden rounded-2xl bg-red-50 px-4 py-3 text-sm text-violet-600"></div>

      <div class="flex flex-col gap-3 pt-2 sm:flex-row">
        <button type="submit"
          class="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-500">
          Guardar tarea
        </button>
        <a class="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
          href="/task" data-link>Cancelar</a>
      </div>
    </form>
  </section>
</main>`;
}

export async function setupTaskForm() {
  const usuario = obtenerSesion();

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    cerrarSesion();
    navigate("/login");
  });

  // Revisa si viene el parámetro ?id= en la URL para modo edición
  const params = new URLSearchParams(window.location.search);
  const tareaId = params.get("id");

  if (tareaId) {
    // Modo edición: carga los datos de la tarea
    document.getElementById("form-title").textContent = "Editar tarea";
    try {
      const tarea = await obtenerTareaPorId(tareaId);
      document.getElementById("task-id").value = tarea.id;
      document.getElementById("title").value = tarea.title;
      document.getElementById("description").value = tarea.description || "";
      document.getElementById("status").value = tarea.status;
      document.getElementById("date").value = tarea.date || "";
    } catch {
      document.getElementById("form-error").textContent = "No se pudo cargar la tarea.";
      document.getElementById("form-error").classList.remove("hidden");
    }
  }

  document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const errorBox = document.getElementById("form-error");
    const id = document.getElementById("task-id").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value;
    const date = document.getElementById("date").value;

    if (!title) {
      errorBox.textContent = "El título es obligatorio.";
      errorBox.classList.remove("hidden");
      return;
    }

    const tarea = { title, description, status, date, userId: usuario.id };

    try {
      if (id) {
        await actualizarTarea(id, tarea);
      } else {
        await crearTarea(tarea);
      }
      navigate("/task");
    } catch {
      errorBox.textContent = "Error al guardar la tarea.";
      errorBox.classList.remove("hidden");
    }
  });
}
