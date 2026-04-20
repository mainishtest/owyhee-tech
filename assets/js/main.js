(function () {
  "use strict";

  // Sticky nav shadow on scroll
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 8) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Mark active nav link based on current path
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const hrefPath = href.replace(/\/$/, "");
    const isHome = (path === "" || path === "/" || /index\.html$/.test(path));
    if ((isHome && (href === "index.html" || href === "/" || href === "./")) ||
        (!isHome && hrefPath && path.endsWith(hrefPath))) {
      a.classList.add("active");
    }
  });

  // Contact form: lightweight client-side handling (no backend required)
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const success = document.querySelector("#contact-success");
      if (success) success.classList.add("show");
      form.reset();
      if (success) success.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Update footer year
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
