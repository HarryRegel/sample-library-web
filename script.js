/* ---------- Books page ---------- */
const books = [
  { title: "The Salt Garden", author: "Meera Kapoor", cat: "fiction", copies: 3, color: "#0E6B63" },
  { title: "Orbit Notes", author: "Daniel Reyes", cat: "science", copies: 2, color: "#13233A" },
  { title: "Rivers of Delhi", author: "Anil Sethi", cat: "history", copies: 4, color: "#C97B63" },
  { title: "Glass Moons", author: "Ira Banerjee", cat: "scifi", copies: 1, color: "#5B8DB8" },
  { title: "A Brief Tour of Atoms", author: "Lena Fischer", cat: "science", copies: 5, color: "#0A4F49" },
  { title: "The Last Cartographer", author: "Omar Haddad", cat: "fiction", copies: 0, color: "#7FB5A8" },
  { title: "Empire of Salt Roads", author: "Kavya Nair", cat: "history", copies: 2, color: "#13233A" },
  { title: "Signal from Kepler", author: "Tom Whitlock", cat: "scifi", copies: 3, color: "#0E6B63" },
  { title: "Quiet Machines", author: "Sana Qureshi", cat: "scifi", copies: 2, color: "#C97B63" },
  { title: "The Tea Merchant's Ledger", author: "Rohan Gupta", cat: "history", copies: 1, color: "#5B8DB8" },
  { title: "Small Hours", author: "Alice Moreno", cat: "fiction", copies: 6, color: "#0A4F49" },
  { title: "How Bridges Stand", author: "Peter Lang", cat: "science", copies: 2, color: "#13233A" }
];

const grid = document.getElementById("book-grid");

function renderBooks(list) {
  const count = document.getElementById("result-count");
  count.textContent = list.length + " books found";
  grid.innerHTML = "";
  list.forEach((b) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="cover" style="background:${b.color}">${b.title[0]}</div>
      <h3>${b.title}</h3>
      <p class="muted">${b.author}</p>
      <span class="tag">${b.cat}</span>
      <p class="copies" id="copies-${books.indexOf(b)}">${b.copies} copies left</p>
      <button class="btn btn-sm borrow-btn" data-index="${books.indexOf(b)}">Borrow</button>`;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const q = document.getElementById("search").value;
  const cat = document.getElementById("category").value;
  const result = books.filter((b) =>
    b.title.includes(q) && (cat === "all" || b.cat === cat)
  );
  renderBooks(result);
}

if (grid) {
  renderBooks(books);
  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("category").addEventListener("change", applyFilters);

  grid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("borrow-btn")) return;
    const i = e.target.dataset.index;
    books[i].copies--;
    document.getElementById("copies-" + i).textContent = books[i].copies + " copies left";
    const msg = document.getElementById("borrow-msg");
    msg.hidden = false;
    msg.textContent = "You borrowed " + books[i].title + ". Return it in 14 days.";
  });
}

/* ---------- Contact page ---------- */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const err = document.getElementById("name-error");
    const ok = document.getElementById("form-success");
    if (!name) {
      err.textContent = "Please enter your name.";
      ok.hidden = true;
      return;
    }
    err.textContent = "";
    ok.hidden = false;
    ok.textContent = "Thanks, " + name + "! We'll get back to you soon.";
  });
}
