const header = document.querySelector(".header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
const mobileNav = window.matchMedia("(max-width: 767.98px)");

function setNavOpen(open) {
  const expanded = mobileNav.matches && open;
  navToggle.setAttribute("aria-expanded", String(expanded));
  navToggle.setAttribute("aria-label", expanded ? "Cerrar menú" : "Abrir menú");
  navMenu.classList.toggle("is-open", expanded);
  // Hidden links must not receive focus, including during the closing animation.
  navMenu.inert = mobileNav.matches && !expanded;
}

navToggle.addEventListener("click", () => {
  setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
});

header.addEventListener("click", event => {
  const link = event.target.closest("a");
  if (!link || !mobileNav.matches) return;

  const href = link.getAttribute("href");
  const target = href.startsWith("#") ? document.querySelector(href) : null;
  if (target) {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  } else {
    navToggle.focus({ preventScroll: true });
  }
  setNavOpen(false);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    navToggle.focus({ preventScroll: true });
    setNavOpen(false);
  }
});

document.addEventListener("pointerdown", event => {
  if (!header.contains(event.target) && navToggle.getAttribute("aria-expanded") === "true") {
    if (navMenu.contains(document.activeElement)) navToggle.focus({ preventScroll: true });
    setNavOpen(false);
  }
});

header.addEventListener("focusout", event => {
  if (!header.contains(event.relatedTarget)) setNavOpen(false);
});

mobileNav.addEventListener("change", () => {
  if (mobileNav.matches && navMenu.contains(document.activeElement)) {
    navToggle.focus({ preventScroll: true });
  } else if (!mobileNav.matches && document.activeElement === navToggle) {
    header.querySelector(".logo").focus({ preventScroll: true });
  }
  setNavOpen(false);
});

setNavOpen(false);
header.classList.add("nav-ready");

const cards = document.querySelectorAll(".card");
const servicioTexto = document.getElementById("servicioSeleccionado");
const precioTexto = document.getElementById("precioSeleccionado");
const whatsappBtn = document.getElementById("whatsappBtn");

const numeroWhatsApp = "528334430781";

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("activo"));

    card.classList.add("activo");

    const servicio = card.dataset.servicio;
    const precio = card.dataset.precio;

    servicioTexto.textContent = servicio;
    precioTexto.textContent = `$${precio}`;

    const mensaje = `Hola, quiero agendar el servicio ${servicio} de Aqua Glow Auto Spa. Precio: $${precio}.`;

    whatsappBtn.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    card.classList.add("click-animation");

    setTimeout(() => {
      card.classList.remove("click-animation");
    }, 400);
  });
});

document.querySelectorAll(".btn, .nav-whatsapp, .float-whatsapp").forEach(boton => {
  boton.addEventListener("click", () => {
    boton.style.transform = "scale(0.92)";

    setTimeout(() => {
      boton.style.transform = "";
    }, 180);
  });
});
