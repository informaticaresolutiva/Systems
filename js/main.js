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

  // --- BOT DE RESPUESTAS RÁPIDAS ---
  initIrBot();
});

function initIrBot() {
  const waBtn = document.querySelector(".whatsapp");
  if (!waBtn) return;

  // Evitar redirección inmediata y abrir el asistente
  waBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleBotModal();
  });

  const botModal = document.createElement("div");
  botModal.className = "ir-chat-modal";
  botModal.id = "irChatModal";
  botModal.innerHTML = `
    <div class="ir-chat-header">
      <div class="ir-chat-head-left">
        <div class="ir-chat-avatar">IR</div>
        <div class="ir-chat-info">
          <strong>Asistente Resolutivo</strong>
          <small>En línea · Respuestas al instante</small>
        </div>
      </div>
      <button class="ir-chat-close" id="irCloseChat" aria-label="Cerrar chat">✕</button>
    </div>
    <div class="ir-chat-body" id="irChatBody"></div>
    <div class="ir-chat-footer">
      <a class="ir-chat-direct-wa" href="https://wa.me/5491165590532?text=Hola%20Inform%C3%A1tica%20Resolutiva%2C%20quiero%20hacer%20una%20consulta%20directa." target="_blank" rel="noopener">
        <span>💬</span> <span>Escribir directo a WhatsApp</span>
      </a>
      <button class="ir-reset-btn" id="irResetChat">Reiniciar opciones</button>
    </div>
  `;
  document.body.appendChild(botModal);

  document.getElementById("irCloseChat").addEventListener("click", () => toggleBotModal(false));
  document.getElementById("irResetChat").addEventListener("click", () => renderBotWelcome());

  document.addEventListener("click", (e) => {
    if (botModal.classList.contains("active") && !botModal.contains(e.target) && !waBtn.contains(e.target)) {
      toggleBotModal(false);
    }
  });

  renderBotWelcome();
}

function toggleBotModal(force) {
  const modal = document.getElementById("irChatModal");
  if (!modal) return;
  if (typeof force === "boolean") {
    modal.classList.toggle("active", force);
  } else {
    modal.classList.toggle("active");
  }
}

const botQnA = [
  {
    id: "camaras",
    label: "📹 Cámaras y Videovigilancia",
    q: "¿Cómo cotizan e instalan las cámaras?",
    a: "Instalamos circuitos completos (cámaras HD/IP, DVR/NVR/XVR y discos para grabación continua) con medidas de diseño para evitar puntos ciegos y monitoreo en vivo en tu celular o tablet.",
    waText: "Hola Informática Resolutiva, quiero consultar por presupuesto para instalación o mantenimiento de cámaras de seguridad."
  },
  {
    id: "redes",
    label: "🌐 Redes informáticas y Wi-Fi",
    q: "¿Cómo mejoran la velocidad y el Wi-Fi?",
    a: "Realizamos mantenimiento, reajuste y cableado prolijo de red, optimizando routers, switches y repetidores para brindarte máxima velocidad y cobertura total sin cortes ni caídas.",
    waText: "Hola Informática Resolutiva, quiero consultar por mantenimiento, reajuste u optimización de mi red y Wi-Fi."
  },
  {
    id: "pc",
    label: "💻 Armado de PC a medida",
    q: "¿Cómo es el armado de computadoras?",
    a: "Te asesoramos para elegir la mejor combinación de componentes según tu uso diario (oficina, diseño, arquitectura o gaming) y presupuesto. Te la entregamos testeada y lista para usar.",
    waText: "Hola Informática Resolutiva, quiero pedir presupuesto para el armado de una computadora a medida."
  },
  {
    id: "cobertura",
    label: "📍 Zonas de atención y visitas",
    q: "¿Qué zonas de atención cubren?",
    a: "Nuestra base está en Valentín Gómez 3666 (Caseros). Realizamos instalaciones y trabajos a domicilio en Caseros, Tres de Febrero, Gran Buenos Aires y CABA.",
    waText: "Hola Informática Resolutiva, quiero consultar disponibilidad para un trabajo a domicilio en mi zona."
  },
  {
    id: "garantia",
    label: "🛡️ Garantía de trabajo",
    q: "¿Qué garantía tienen los servicios?",
    a: "Todos nuestros trabajos incluyen prueba y puesta en marcha en el momento frente a vos, garantía en la instalación y componentes, y soporte de seguimiento por WhatsApp.",
    waText: "Hola Informática Resolutiva, quiero consultar sobre las garantías y formas de pago."
  }
];

function renderBotWelcome() {
  const body = document.getElementById("irChatBody");
  if (!body) return;
  body.innerHTML = `
    <div class="ir-msg ir-msg-bot">
      ¡Hola! 👋 Soy el asistente virtual de <strong>Informática Resolutiva</strong>.<br><br>
      Elegí una consulta para ver información rápida o chatear con nosotros:
    </div>
    <div class="ir-chat-options" id="irOptionsList">
      ${botQnA.map(item => `
        <button class="ir-opt-btn" data-qid="${item.id}">
          <span>${item.label}</span> <span>→</span>
        </button>
      `).join("")}
    </div>
  `;

  body.querySelectorAll(".ir-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const qid = btn.dataset.qid;
      handleBotQuestion(qid);
    });
  });
}

function handleBotQuestion(qid) {
  const item = botQnA.find(q => q.id === qid);
  if (!item) return;

  const body = document.getElementById("irChatBody");
  const options = document.getElementById("irOptionsList");
  if (options) options.remove();

  // Mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "ir-msg ir-msg-user";
  userMsg.textContent = item.label;
  body.appendChild(userMsg);

  // Respuesta del bot con delay natural
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "ir-msg ir-msg-bot";
    botMsg.innerHTML = `
      <p style="margin:0 0 8px">${item.a}</p>
      <a class="ir-msg-cta" href="https://wa.me/5491165590532?text=${encodeURIComponent(item.waText)}" target="_blank" rel="noopener">
        Hablar con un técnico por WhatsApp →
      </a>
      <div style="margin-top:10px">
        <button class="ir-reset-btn" onclick="renderBotWelcome()">↩ Ver otras consultas</button>
      </div>
    `;
    body.appendChild(botMsg);
    body.scrollTop = body.scrollHeight;
  }, 300);

  body.scrollTop = body.scrollHeight;
}
