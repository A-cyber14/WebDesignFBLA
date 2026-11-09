/* =========================================================
   maptools.js — Small helpers shared by the Home map preview
   and the full Map page. Uses Leaflet (open-source map library)
   with the free OpenStreetMap standard tile layer.
   No API key or billing account is required. (A styled provider
   such as Mapbox or Google Maps would need an API key and billing.)
   ========================================================= */

function addBaseTiles(map) {
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

// A teardrop pin in the category's color with its icon inside.
function pinIcon(category, count) {
  return L.divIcon({
    className: "",
    html: `<div class="pin" style="--cat:${category.color}">${icon(category.icon)}${count > 1 ? `<span class="pin-count">${count}</span>` : ""}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34]
  });
}
