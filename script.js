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