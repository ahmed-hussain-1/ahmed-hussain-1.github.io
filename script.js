
const books = [
  {
    id: 4,
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    date: "40th Anniversary Ed.",
    genres: ["Science"],
    rating: 5,
    oneLiner: "",
    cover: "images/books/the_selfish_gene.png",
  },
  {
    id: 5,
    title: "The Art of Strategy",
    author: "Avinash K. Dixit & Barry Nalebuff",
    date: "2008",
    genres: ["Economics"],
    rating: 4,
    oneLiner: "",
    cover: "images/books/the_art_of_the_strategy.jpg",
  },
  {
    id: 6,
    title: "Inadequate Equilibria",
    author: "Eliezer Yudkowsky",
    date: "2017",
    genres: ["Economics"],
    rating: 4,
    oneLiner: "",
    cover: "images/books/inadequate_equilibria.png",
  },
{
    id: 13,
    title: "The Most Important Thing",
    author: "Howard Marks",
    date: "2011",
    genres: ["Finance"],
    rating: 4,
    oneLiner: "",
    cover: "images/books/the_most_important_thing.jpg",
  },
  {
    id: 14,
    title: "How Not to Be Wrong",
    author: "Jordan Ellenberg",
    date: "2014",
    genres: ["Science"],
    rating: 4,
    oneLiner: "Mathematical thinking for everyday insight.",
    cover: "images/books/how_not_to_be_wrong.jpg",
  },
  {
    id: 17,
    title: "Mastering ’Metrics",
    author: "Joshua D. Angrist & J-S Pischke",
    date: "2014",
    genres: ["Economics"],
    rating: 5,
    oneLiner: "Causal inference made intuitive with five core econometric tools.",
    cover: "images/books/mastering_metrics.jpg",
  },
  {
    id: 18,
    title: "Superforecasting",
    author: "Philip E. Tetlock & Dan Gardner",
    date: "2015",
    genres: ["Economics"],
    rating: 5,
    oneLiner: "Science of Forecasting",
    cover: "images/books/superforecasting.png",
  },
  {
    id: 19,
    title: "Think Again",
    author: "Adam Grant",
    date: "2021",
    genres: ["Psychology"],
    rating: 4,
    oneLiner: "",
    cover: "images/books/think_again.png",
  },
  {
    id: 21,
    title: "The Laws of Trading",
    author: "Agustín Lebron",
    date: "2019",
    genres: ["Finance"],
    rating: 4,
    oneLiner: "",
    cover: "images/books/the_laws_of_trading.jpg",
  },
  {
    id: 22,
    title: "Risk Management and Financial Institutions",
    author: "John C. Hull",
    date: "5th ed., 2021",
    genres: ["Finance"],
    rating: 3,
    oneLiner: "",
    cover: "images/books/risk_management.jpg",
  }

];

function starString(n) { return "★★★★★☆☆☆☆☆".slice(5 - n, 10 - n); }

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

renderChips();
filterAndRender();
