let sites = [];
let currentCategory = "All";

fetch("sites.json")
  .then(res => res.json())
  .then(data => {
    sites = data;
    createCategories();
    render();
  });

function createCategories(){
  const categories = ["All", ...new Set(sites.map(s => s.category))];
  const container = document.getElementById("categories");
  container.innerHTML = "";

  categories.forEach(cat=>{
    const btn = document.createElement("button");
    btn.textContent = cat;
    btn.className = "cat";
    if(cat === "All") btn.classList.add("active");

    btn.onclick = ()=>{
      currentCategory = cat;
      document.querySelectorAll(".cat").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      render();
    };

    container.appendChild(btn);
  });
}

function render(){
  const grid = document.getElementById("grid");
  const search = document.getElementById("search").value.toLowerCase();
  grid.innerHTML = "";

  sites
    .filter(s => 
      (currentCategory==="All" || s.category===currentCategory) &&
      s.name.toLowerCase().includes(search)
    )
    .forEach(site=>{
      const clicks = localStorage.getItem(site.name) || 0;

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${site.name}</h3>
        <a href="${site.url}" target="_blank" rel="noopener noreferrer">Open Website</a>
        <div class="click-count">Clicks: ${clicks}</div>
      `;

      card.querySelector("a").addEventListener("click", ()=>{
        localStorage.setItem(site.name, Number(clicks)+1);
      });

      grid.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input", render);


window.addEventListener("orientationchange", function() {
    console.log("Orientation changed");
});