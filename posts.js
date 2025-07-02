const posts = [
  {
    title: "Forecasting Markets with Sparse Models",
    topic: "Forecasting",
    excerpt: "Using LASSO and Ridge regression for asset returns. Thoughts on sparse modeling under limited signal-to-noise ratios.",
    link: "https://your-substack.com/p/forecasting-sparse"
  },
  {
    title: "Macro Regimes and Factor Timing",
    topic: "Macro",
    excerpt: "Factor investing behaves differently in easing vs. tightening cycles. Here’s a framework to time macro risk exposure.",
    link: "posts/macro-regimes.html"
  },
  {
    title: "Financial Risk Management Lessons",
    topic: "Finance",
    excerpt: "What I learned from working with convexity, tail risk, and hedging. Reflections from recent risk models.",
    link: "posts/finance-risk.html"
  },
  {
    title: "Bayesian Inference in Statistics",
    topic: "Statistics",
    excerpt: "Why priors matter and how Bayesian inference handles uncertainty in low-sample-size scenarios.",
    link: "https://your-substack.com/p/bayesian-inference"
  }
];


const topics = [...new Set(posts.map(p => p.topic))];
const postTopicMenu = document.getElementById("postTopicMenu");
const postGrid = document.getElementById("postGrid");

let activeTopic = null;

function renderTopics() {
  postTopicMenu.innerHTML = "";
  ["All", ...topics].forEach(label => {
    const isActive = (activeTopic === null && label === "All") ||
                     (activeTopic === label);

    const chip = document.createElement("div");
    chip.className = "topic-chip" + (isActive ? " active" : "");
    chip.textContent = label;

    chip.addEventListener("click", () => {
      // null means “All”, otherwise store the topic string
      activeTopic = label === "All" ? null : label;
      renderTopics();    // refresh chip highlighting
      renderPosts();     // refresh the list
    });

    postTopicMenu.appendChild(chip);
  });
}

function renderPosts() {
  postGrid.innerHTML = "";

  const visible = (activeTopic === null)
    ? posts
    : posts.filter(p => p.topic === activeTopic);

  visible.forEach(p => {
    const div = document.createElement("div");
    div.className = "post-entry";
    div.innerHTML = `
      <h3><a href="${p.link}" target="_blank">${p.title}</a></h3>
      <p>${p.excerpt}</p>
    `;
    postGrid.appendChild(div);
  });
}

renderTopics();
renderPosts();
