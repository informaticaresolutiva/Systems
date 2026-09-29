document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (menu && nav) {
    menu.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
  }

  document.querySelectorAll(".consult-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product || "un producto";
      const message = `Hola Informática Resolutiva, quiero consultar por ${product} y pedir información sobre disponibilidad e instalación.`;
      window.open(`https://wa.me/5491165590532?text=${encodeURIComponent(message)}`, "_blank");
    });
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const message =
        `Hola Informática Resolutiva, soy ${data.get("nombre")}.%0A%0A` +
        `Necesito: ${data.get("servicio")}%0A` +
        `Mensaje: ${data.get("mensaje")}`;
      window.open(`https://wa.me/5491165590532?text=${message}`, "_blank");
    });
  }
});
