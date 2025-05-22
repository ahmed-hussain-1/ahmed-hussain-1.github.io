/* ----------  DATA  ---------- */
const books = [
  {
    id: 1,
    title: "Dynamic Hedging",
    author: "Nassim Nicholas Taleb",
    date: "Nov 8, 2024",
    genres: ["Finance", "Textbook"],
    rating: 4,
    oneLiner: "Rules-of-thumb to survive as an options dealer",
    cover: "images/dynamic_hedging.jpg",
  },
  {
    id: 2,
    title: "Global Macro Trading",
    author: "Greg Gliner",
    date: "Apr 21, 2024",
    genres: ["Finance"],
    rating: 3,
    oneLiner: "Practical guide to macro-driven trades",
    cover: "images/global_macro_trading.jpg",
  },
  // 👉  add more book objects here
];

/* ----------  UTILITIES  ---------- */
function starString(n) { return "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n); }

/* ----------  RENDER CHIP BAR  ---------- */
const chipBar = document.getElementById("chipBar");
const allGenres = Array.from(new Set(books.flatMap(b => b.genres))).sort();
let activeGenre = "All";

function renderChips() {
  chipBar.innerHTML = "";
  ["All", ...allGenres].forEach(g => {
    const chip = document.createElement("span");
    chip.className = "chip" + (g === activeGenre ? " active" : "");
    chip.textContent = g;
    chip.addEventListener("click", () => { activeGenre = g; filterAndRender(); });
    chipBar.appendChild(chip);
  });
}

/* ----------  RENDER GRID  ---------- */
const bookGrid = document.getElementById("bookGrid");
const searchBox = document.getElementById("bookSearch");

function createCard(book) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img src="${book.cover}" alt="Cover of ${book.title}" class="card-img">
    <h3>${book.title}</h3>
    <p><em>${book.author}</em></p>
    <p style="font-size:.8rem;color:var(--neutral-dark);">${book.date}</p>
    <p>${starString(book.rating)}</p>
  `;
  card.addEventListener("click", () => openModal(book));
  return card;
}

function filterAndRender() {
  const term = searchBox.value.toLowerCase();
  bookGrid.innerHTML = "";
  books
    .filter(b => (activeGenre === "All" || b.genres.includes(activeGenre)))
    .filter(b => b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term))
    .forEach(b => bookGrid.appendChild(createCard(b)));
}

searchBox.addEventListener("input", filterAndRender);

/* ----------  MODAL  ---------- */
const modalOverlay = document.getElementById("modalOverlay");

function openModal(book) {
  modalOverlay.innerHTML = `
    <div class="modal">
      <span class="modal-close" onclick="closeModal()">&times;</span>
      <h2>${book.title}</h2>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Last read:</strong> ${book.date}</p>
      <p><strong>Stars:</strong> ${starString(book.rating)}</p>
      <p><strong>Genres:</strong> ${book.genres.join(", ")}</p>
      <p><strong>One-liner:</strong> ${book.oneLiner}</p>
    </div>`;
  modalOverlay.style.display = "flex";
}
function closeModal() { modalOverlay.style.display = "none"; }
modalOverlay.addEventListener("click", e => { if (e.target === modalOverlay) closeModal(); });

/* ----------  INIT ---------- */
renderChips();
filterAndRender();
