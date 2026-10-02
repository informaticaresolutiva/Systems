const REVIEWS_KEY = "informatica_resolutiva_reviews_v1";

const seedReviews = [
  {id:"seed-1",name:"María G.",service:"Mantenimiento / reparación de PC",rating:5,text:"Me solucionaron un problema de la computadora que venía arrastrando hace semanas. Muy buena atención y me explicaron todo antes de hacer el trabajo.",date:"2026-08-18T12:00:00"},
  {id:"seed-2",name:"Agustín R.",service:"Redes informáticas",rating:5,text:"Necesitábamos mejorar la conexión de la oficina y nos dieron una solución acorde a lo que realmente necesitábamos. Muy conformes con el resultado.",date:"2026-08-20T15:30:00"},
  {id:"seed-3",name:"Lucas C.",service:"Compra de hardware",rating:5,text:"Excelente asesoramiento para actualizar las PCs. Pudimos mejorar el rendimiento sin gastar de más.",date:"2026-08-22T10:15:00"}
];

function getReviews(){
  try {
    const saved = JSON.parse(localStorage.getItem(REVIEWS_KEY));
    if(Array.isArray(saved) && saved.length) return saved;
  } catch(e){}
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(seedReviews));
  return seedReviews;
}

function saveReviews(reviews){ localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews)); }

function stars(rating){
  return "★★★★★".split("").map((s,i)=>i < rating ? "★" : "☆").join("");
}

function renderReviews(){
  const list = document.getElementById("reviewsList");
  if(!list) return;
  let reviews = getReviews();
  const sort = document.getElementById("reviewSort").value;
  reviews.sort((a,b)=> sort === "recent"
    ? new Date(b.date)-new Date(a.date)
    : (b.rating-a.rating) || (new Date(b.date)-new Date(a.date)));

  const average = reviews.length ? (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length) : 0;
  document.getElementById("averageRating").innerHTML = reviews.length ? `${average.toFixed(1)}<span>/5</span>` : `—<span>/5</span>`;
  document.getElementById("averageStars").textContent = reviews.length ? stars(Math.round(average)) : "☆☆☆☆☆";
  document.getElementById("reviewCount").textContent = reviews.length === 1 ? "1 reseña publicada" : `${reviews.length} reseñas publicadas`;

  // La web muestra como máximo 6 reseñas simultáneamente.
  reviews = reviews.slice(0, 6);

  if(!reviews.length){
    list.innerHTML = '<div class="review-empty" style="grid-column:1/-1">Sé el primero en dejar una reseña.</div>';
    return;
  }

  list.innerHTML = reviews.map(r => `
    <article class="user-review-card reveal">
      <div class="review-head">
        <div><div class="review-name">${escapeHTML(r.name)}</div><div class="review-service">${escapeHTML(r.service)}</div></div>
        <div class="stars">${stars(Number(r.rating))}</div>
      </div>
      <p class="review-text">“${escapeHTML(r.text)}”</p>
      <div class="review-head">
        <span class="review-date">${formatDate(r.date)}</span>
        ${r.userCreated ? `<button class="review-delete" data-delete="${r.id}">Eliminar</button>` : ""}
      </div>
    </article>
  `).join("");

  list.querySelectorAll("[data-delete]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      if(!confirm("¿Querés eliminar esta reseña de este navegador?")) return;
      saveReviews(getReviews().filter(r=>r.id !== btn.dataset.delete));
      renderReviews();
    });
  });
}

function escapeHTML(value){
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function formatDate(date){
  return new Intl.DateTimeFormat("es-AR",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(date));
}

document.addEventListener("DOMContentLoaded", ()=>{
  const form = document.getElementById("reviewForm");
  const sort = document.getElementById("reviewSort");
  if(!form) return;

  renderReviews();
  sort.addEventListener("change", renderReviews);

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const rating = Number(document.querySelector('input[name="rating"]:checked').value);
    const review = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      name: document.getElementById("reviewName").value.trim(),
      service: document.getElementById("reviewService").value,
      rating,
      text: document.getElementById("reviewText").value.trim(),
      date: new Date().toISOString(),
      userCreated: true
    };
    if(!review.name || !review.text) return;
    const reviews = getReviews();
    reviews.push(review);
    saveReviews(reviews);
    form.reset();
    document.getElementById("star5").checked = true;
    sort.value = "recent";
    renderReviews();
    document.getElementById("reviewsList").scrollIntoView({behavior:"smooth",block:"start"});
  });
});
