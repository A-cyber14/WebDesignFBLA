/* =========================================================
   home.js — Fills in the Home page.
   ========================================================= */

// 1. Quick numbers in the hero section (counted from data.js)
document.getElementById("stat-resources").textContent = resources.length;
document.getElementById("stat-categories").textContent = categories.length;
document.getElementById("stat-events").textContent = events.length;

// 2. Category tiles. Each tile links to the Resources page with
//    that category already selected, e.g. resources.html?category=food
let tilesHTML = "";
categories.forEach(function (category) {
  const count = resources.filter(function (r) { return r.category === category.id; }).length;
  tilesHTML += `
    <li>
      <a class="category-tile" href="resources.html?category=${category.id}">
        <span class="tile-icon" aria-hidden="true">${category.icon}</span>
        <span class="tile-name">${category.name}</span>
        <span class="tile-count">${count} resources</span>
      </a>
    </li>`;
});
document.getElementById("category-grid").innerHTML = tilesHTML;

// 3. Featured resources (chosen by id)
const featuredIds = [1, 5, 9];
let featuredHTML = "";
featuredIds.forEach(function (id) {
  featuredHTML += createResourceCard(getResource(id));
});
document.getElementById("featured-list").innerHTML = featuredHTML;

// 4. The next three upcoming events
let eventsHTML = "";
events.slice(0, 3).forEach(function (event) {
  eventsHTML += createEventCard(event);
});
document.getElementById("home-events").innerHTML = eventsHTML;
