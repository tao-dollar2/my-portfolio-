(() => {
  const themeButton = document.querySelector("[data-theme-toggle]");
  const menuButton = document.querySelector("[data-menu-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("basotaj-theme") || "light";
  } catch {
    // Keep the light default when browser storage is unavailable.
  }
  document.body.dataset.theme = savedTheme;

  const syncThemeButton = () => {
    if (!themeButton) return;
    const isDark = document.body.dataset.theme === "dark";
    themeButton.textContent = isDark ? "Light mode" : "Dark mode";
    themeButton.setAttribute("aria-pressed", String(isDark));
  };
  syncThemeButton();

  themeButton?.addEventListener("click", () => {
    const theme = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = theme;
    try {
      localStorage.setItem("basotaj-theme", theme);
    } catch {
      // Theme still works for this page when browser storage is unavailable.
    }
    syncThemeButton();
  });

  menuButton?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("is-open") ?? false;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      if (menuButton) menuButton.textContent = "Menu";
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      navLinks?.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
      if (menuButton) menuButton.textContent = "Menu";
    }
  });
})();
