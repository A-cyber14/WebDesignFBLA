/* =========================================================
   maptools.js
   Map helpers used by the Home page preview and the Map page.
   The maps use Leaflet with free OpenStreetMap tiles, so no
   API key or account is needed.
   ========================================================= */

// Adds the map pictures (tiles) to a map
function addBaseTiles(map) {
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  tiles.addTo(map);

  // If the tiles can't load (no internet), tell the Map page
  tiles.once("tileerror", function () {
    if (typeof onTilesFailed === "function") {
      onTilesFailed();
    }
  });
}

// A round blue pin with the category's icon inside
function pinIcon(category) {
  return L.divIcon({
    className: "",
    html: '<div class="pin">' + icon(category.icon) + "</div>",
    iconSize: [34, 34],
    iconAnchor: [17, 34]
  });
}
