/* =========================================================
   maptools.js — Small helpers shared by the Home map preview
   and the full Map page. Uses Leaflet (open-source map library)
   with the free OpenStreetMap standard tile layer.
   No API key or billing account is required. (A styled provider
   such as Mapbox or Google Maps would need an API key and billing.)
   ========================================================= */

function addBaseTiles(map) {
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  // If tiles are blocked, the pins still show on a plain background,
  // and the Map page tells people the list has every location.
  tiles.once("tileerror", function () {
    const fallback = document.getElementById("map-fallback");
    if (fallback && typeof onTilesFailed === "function") onTilesFailed();
  });
}

// A round blue pin with the category icon inside.
function pinIcon(category, count) {
  return L.divIcon({
    className: "",
    html: `<div class="pin">${icon(category.icon)}${count > 1 ? `<span class="pin-count">${count}</span>` : ""}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34]
  });
}
