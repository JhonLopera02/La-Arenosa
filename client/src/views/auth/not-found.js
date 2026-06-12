export function renderNotFound() {
  return `
<main class="flex min-h-screen items-center justify-center px-6 bg-slate-950">
  <div class="text-center">
    <p class="text-violet-500 text-sm font-bold uppercase tracking-widest mb-4">Error de navegación</p>
    <h1 class="text-8xl font-black text-white mb-4">404</h1>
    <p class="text-slate-400 mb-8">La página que buscas no existe.</p>
    <div class="flex justify-center gap-4">
      <a class="rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white hover:bg-violet-500" href="/" data-link>Ir al inicio</a>
      <a class="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 hover:bg-slate-800" href="/login" data-link>Iniciar sesión</a>
    </div>
  </div>
</main>`;
}
