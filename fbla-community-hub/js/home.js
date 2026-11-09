/* =========================================================
   home.js — Fills in the Home page.
   ========================================================= */

// 1. Quick facts, counted directly from data.js (no made-up numbers)
const placeKeys = allLocations().map(function (item) { return item.location.lat + "," + item.location.lng; });
document.getElementById("stat-resources").textContent = resources.length;
document.getElementById("stat-places").textContent = new Set(placeKeys).size;
document.getElementById("stat-cities").textContent = cities.length;
document.getElementById("stat-verified").textContent = formatVerified(LAST_VERIFIED).replace(/, \d{4}$/, "");


// 2. Category tiles → resources.html?category=food
let tilesHTML = "";
categories.forEach(function (category) {
  const count = resources.filter(function (r) { return r.categories.includes(category.id); }).length;
  tilesHTML += `
    <li>
      <a class="category-tile" href="resources.html?category=${category.id}" style="--cat:${category.color}">
        <span class="cat-icon">${icon(category.icon)}</span>
        <span class="tile-name">${category.name}</span>
        <span class="tile-count">${count} ${count === 1 ? "resource" : "resources"}</span>
      </a>
    </li>`;
});
document.getElementById("category-grid").innerHTML = tilesHTML;


// 3. "Start here" — widely used, countywide services
const featuredIds = ["first-contact-211", "pinellas-human-services", "hope-villages-food",
                     "psta-td-program", "careersource-tampa-bay", "area-agency-on-aging"];
document.getElementById("featured-list").innerHTML = featuredIds
  .map(function (id) { return getResource(id); })
  .filter(Boolean)
  .map(createResourceCard)
  .join("");


// 4. The next three verified events (or a helpful empty state)
const nextEvents = upcomingEvents().slice(0, 3);
document.getElementById("home-events").innerHTML = nextEvents.length
  ? nextEvents.map(createEventCard).join("")
  : eventsEmptyState();


// 5. Map preview (decorative — the whole card links to the full map)
(function drawHomeMap() {
  const box = document.getElementById("home-map");
  if (!box || typeof L === "undefined") return; // offline: the card still links to the map page

  const map = L.map(box, {
    zoomControl: false, attributionControl: true, dragging: false, scrollWheelZoom: false,
    doubleClickZoom: false, boxZoom: false, keyboard: false, touchZoom: false, tap: false
  });
  addBaseTiles(map);

  const markers = [];
  const seen = {};
  allLocations().forEach(function (item) {
    const key = item.location.lat + "," + item.location.lng;
    if (seen[key]) return;
    seen[key] = true;
    const category = getCategory(item.resource.categories[0]);
    markers.push(L.marker([item.location.lat, item.location.lng], {
      icon: pinIcon(category, 1), keyboard: false, interactive: false
    }).addTo(map));
  });
  map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [30, 30] });
})();
