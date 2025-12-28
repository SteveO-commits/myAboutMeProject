(() => {
  const root = document.documentElement;

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Theme
  const key = "student_theme";
  const saved = localStorage.getItem(key);
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  } else {
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    root.setAttribute("data-theme", prefersLight ? "light" : "dark");
  }

  document.getElementById("themeBtn")?.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem(key, next);
  });

  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const close = () => {
    if (!mobileNav) return;
    mobileNav.hidden = true;
    menuBtn?.setAttribute("aria-expanded", "false");
  };
  menuBtn?.addEventListener("click", () => {
    if (!mobileNav) return;
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    mobileNav.hidden = open;
  });
  mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());

  // Copy bio
  const copyBio = document.getElementById("copyBio");
  copyBio?.addEventListener("click", async () => {
    const text = "Victor Onyedineke is a 300L Computer Science student interested in web development and building practical software using HTML, CSS, and JavaScript.";
    try{
      await navigator.clipboard.writeText(text);
      copyBio.textContent = "Copied ✓";
      setTimeout(() => copyBio.textContent = "Copy short bio", 1400);
    }catch{
      alert(text);
    }
  });

  // Contact form (demo)
  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Submitted! (Demo only — no backend attached.)");
    e.target.reset();
  });
})();