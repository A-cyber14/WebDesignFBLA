/* =========================================================
   home.js: fills in the Home page.
   ========================================================= */

// 1. Category tiles → resources.html?category=food
document.getElementById("category-grid").innerHTML = categories.map(function (category) {
  return `<li><a class="category-tile" href="resources.html?category=${category.id}">${icon(category.icon)}<span>${category.short}</span></a></li>`;
}).join("");

// 2. "Start here": widely used, countywide services
const featuredIds = ["first-contact-211", "pinellas-human-services", "hope-villages-food"];
document.getElementById("featured-list").innerHTML = featuredIds
  .map(getResource)
  .filter(Boolean)
  .map(createResourceCard)
  .join("");

// 3. Map preview (decorative; the whole card links to the full map)
(function drawHomeMap() {
  const box = document.getElementById("home-map");
  if (!box || typeof L === "undefined") return; // offline: the card still links to the map page

  const map = L.map(box, {
    zoomControl: false, dragging: false, scrollWheelZoom: false, doubleClickZoom: false,
    boxZoom: false, keyboard: false, touchZoom: false, tap: false
  });
  addBaseTiles(map);

  const markers = [];
  const seen = {};
  allLocations().forEach(function (item) {
    const key = item.location.lat + "," + item.location.lng;
    if (seen[key]) return;
    seen[key] = true;
    markers.push(L.marker([item.location.lat, item.location.lng], {
      icon: pinIcon(getCategory(item.resource.categories[0]), 1), keyboard: false, interactive: false
    }).addTo(map));
  });
  map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [30, 30] });
})();
