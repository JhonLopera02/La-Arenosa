export function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    console.log("Dark mode is now:", isDark); // Debug
    return isDark;
}

export function getThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");
    return isDark ? "🌙" : "☀️";
}

export function renderThemeToggle() {
    return `
    <button id="theme-toggle" class="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 shadow-sm pointer-events-auto" style="cursor: pointer; z-index: 9999;" aria-label="Toggle Theme">
      <span id="theme-icon">${getThemeIcon()}</span>
    </button>
  `;
}

export function setupThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-icon");
    if (!btn || !icon) {
        console.warn("Theme toggle button not found in DOM");
        return;
    }

    // Eliminamos cualquier listener previo
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isDark = toggleTheme();
        const iconSpan = newBtn.querySelector("#theme-icon");
        if (iconSpan) iconSpan.textContent = isDark ? "🌙" : "☀️";
    });
}
