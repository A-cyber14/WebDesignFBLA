/* =========================================================
   map.js — The interactive Resource Map.
   Shows ONLY verified physical locations from data.js. Each
   place gets one pin; places shared by several organizations
   show a number on the pin. The list view shows exactly the same
   results for keyboard, screen reader, and offline users.
   ========================================================= */

const mapApp = document.getElementById("map-app");
const mapSearch = document.getElementById("map-search");
const mapCategory = document.getElementById("map-category");
const mapCity = document.getElementById("map-city");
const mapList = document.getElementById("map-list");
const mapCount = document.getElementById("map-count");
const mapExtra = document.getElementById("map-extra");
const preview = document.getElementById("map-preview");
const previewBody = document.getElementById("preview-body");

const mapReady = typeof L !== "undefined";
let map = null;
let markerLayer = null;
let markersByKey = {};

function placeKey(location) {
  return location.lat.toFixed(5) + "," + location.lng.toFixed(5);
}


/* ---------- 1. Which locations pass the filters? ---------- */
function filteredLocations() {
  const text = mapSearch.value.trim().toLowerCase();
  const categoryId = mapCategory.value;
  const city = mapCity.value;

  return allLocations().filter(function (item) {
    const r = item.resource;
    const haystack = (r.name + " " + r.description + " " + item.location.label + " " + item.location.address).toLowerCase();
    return (!text || haystack.includes(text)) &&
           (categoryId === "all" || r.categories.includes(categoryId)) &&
           (city === "all" || item.location.city === city);
  });
}

// Groups locations that share the exact same coordinates.
function groupByPlace(items) {
  const groups = {};
  items.forEach(function (item) {
    const key = placeKey(item.location);
    if (!groups[key]) groups[key] = { key: key, location: item.location, items: [] };
    groups[key].items.push(item);
  });
  return Object.values(groups);
}


/* ---------- 2. Preview card ---------- */
function showPreview(group) {
  previewBody.innerHTML = group.items.map(function (item) {
    const r = item.resource;
    const category = getCategory(r.categories[0]);
    const phone = item.location.phone || r.phones[0].number;
    return `
      <div class="preview-item">
        <span class="badge">${category.short}</span>
        <h3>${r.name}</h3>
        <p><strong>${item.location.label}</strong><br>${item.location.address}</p>
        <p>${item.location.hours || r.hours}</p>
        <div class="preview-actions">
          <a class="button button-small" href="${directionsURL(item.location.address)}" target="_blank" rel="noopener">Directions<span class="visually-hidden"> to ${r.name} (opens in a new tab)</span></a>
          <a class="button button-small button-secondary" href="${telHref(phone)}">Call</a>
          <button class="button button-small button-secondary details-button" type="button" data-id="${r.id}">Details</button>
        </div>
      </div>`;
  }).join("");
  preview.hidden = false;

  document.querySelectorAll(".pin.is-active").forEach(function (p) { p.classList.remove("is-active"); });
  const marker = markersByKey[group.key];
  if (marker && marker.getElement()) marker.getElement().querySelector(".pin").classList.add("is-active");

  document.querySelectorAll(".map-list-item").forEach(function (li) {
    li.classList.toggle("is-active", li.dataset.key === group.key);
  });
}

document.getElementById("preview-close").addEventListener("click", function () {
  preview.hidden = true;
  document.querySelectorAll(".pin.is-active").forEach(function (p) { p.classList.remove("is-active"); });
});


/* ---------- 3. Draw everything ---------- */
function render() {
  const items = filteredLocations();
  const groups = groupByPlace(items);
  const city = mapCity.value;

  // List view (always built — it is the accessible alternative)
  mapList.innerHTML = items.map(function (item) {
    const r = item.resource;
    const category = getCategory(r.categories[0]);
    return `
      <li class="map-list-item" data-key="${placeKey(item.location)}">
        <div>
          <p>${category.short}</p>
          <h3>${r.name}</h3>
          <p>${item.location.address}</p>
          <div class="map-list-actions">
            ${mapReady ? `<button type="button" data-show="${placeKey(item.location)}">Show on map<span class="visually-hidden">: ${r.name}</span></button>` : ""}
            <a href="${directionsURL(item.location.address)}" target="_blank" rel="noopener">Directions<span class="visually-hidden"> to ${r.name} (opens in a new tab)</span></a>
            <button type="button" class="details-button" data-id="${r.id}">Details<span class="visually-hidden"> for ${r.name}</span></button>
          </div>
        </div>
      </li>`;
  }).join("") || `<li class="empty-state"><p>No mapped places match.</p></li>`;

  mapCount.textContent = `${items.length} ${items.length === 1 ? "location" : "locations"}`;

  // Services with no walk-in location still serve residents
  const categoryId = mapCategory.value;
  const remote = resources.filter(function (r) {
    return r.locations.length === 0 && r.area === "countywide" &&
           (categoryId === "all" || r.categories.includes(categoryId));
  }).length;
  const cityParam = city !== "all" ? "&city=" + encodeURIComponent(city) : "";
  const catParam = categoryId !== "all" ? "category=" + categoryId : "";
  mapExtra.innerHTML = remote
    ? `+ ${remote} countywide ${remote === 1 ? "service" : "services"} by phone or online. <a href="resources.html?${catParam}${cityParam}">See all</a>`
    : "";

  // Pins
  if (!mapReady) return;
  markerLayer.clearLayers();
  markersByKey = {};
  preview.hidden = true;

  groups.forEach(function (group) {
    const category = getCategory(group.items[0].resource.categories[0]);
    const names = group.items.map(function (i) { return i.resource.name; }).join("; ");
    const marker = L.marker([group.location.lat, group.location.lng], {
      icon: pinIcon(category, group.items.length),
      title: names,
      alt: names,
      riseOnHover: true
    });
    marker.on("click", function () { showPreview(group); });
    marker.on("keypress", function (e) { if (e.originalEvent.key === "Enter") showPreview(group); });
    marker.addTo(markerLayer);
    markersByKey[group.key] = marker;
  });

  if (groups.length) {
    map.fitBounds(markerLayer.getBounds(), { padding: [50, 50], maxZoom: 15 });
  }
}


// Called by maptools.js if map tiles can't load: show the notice
// and switch to the list, which has every location.
function onTilesFailed() {
  document.getElementById("map-fallback").hidden = false;
  document.querySelector('[data-view-button="list"]').click();
}


/* ---------- 4. Map setup (only if Leaflet loaded) ---------- */
if (mapReady) {
  map = L.map("map", { zoomControl: true, scrollWheelZoom: true });
  addBaseTiles(map);
  markerLayer = L.featureGroup().addTo(map);
  map.setView([27.9, -82.73], 10); // Pinellas County
  document.getElementById("map-fallback").hidden = true;
} else {
  // Offline or blocked: switch to the list and explain why
  mapApp.dataset.view = "list";
  document.getElementById("map-fallback").hidden = false;
  document.querySelectorAll("[data-view-button]").forEach(function (b) {
    b.setAttribute("aria-pressed", b.dataset.viewButton === "list");
  });
}


/* ---------- 5. Controls ---------- */
mapSearch.addEventListener("input", render);
mapCategory.addEventListener("change", function () { trackEvent("filtersUsed"); render(); });
mapCity.addEventListener("change", function () { trackEvent("filtersUsed"); render(); });
document.getElementById("map-form").addEventListener("submit", function (e) { e.preventDefault(); });

// Map / List toggle (phones and tablets)
document.querySelectorAll("[data-view-button]").forEach(function (button) {
  button.addEventListener("click", function () {
    const view = button.dataset.viewButton;
    mapApp.dataset.view = view;
    document.querySelectorAll("[data-view-button]").forEach(function (b) {
      b.setAttribute("aria-pressed", b === button);
    });
    if (view === "map" && map) setTimeout(function () { map.invalidateSize(); }, 50);
  });
});

// "Show on map" in the list
mapList.addEventListener("click", function (event) {
  const button = event.target.closest("[data-show]");
  if (!button || !map) return;
  const group = groupByPlace(filteredLocations()).find(function (g) { return g.key === button.dataset.show; });
  if (!group) return;
  if (mapApp.dataset.view === "list" && window.matchMedia("(max-width: 1023px)").matches) {
    document.querySelector('[data-view-button="map"]').click();
  }
  map.setView([group.location.lat, group.location.lng], 15);
  showPreview(group);
  document.getElementById("map").focus();
});

// Read ?category= and ?city= from the address
const mapParams = new URLSearchParams(window.location.search);
if (getCategory(mapParams.get("category"))) mapCategory.value = mapParams.get("category");
if (cities.includes(mapParams.get("city"))) mapCity.value = mapParams.get("city");

render();

// Re-measure once fonts and layout have settled, then re-center on the pins
window.addEventListener("load", function () {
  if (!map) return;
  map.invalidateSize();
  if (markerLayer.getLayers().length) map.fitBounds(markerLayer.getBounds(), { padding: [50, 50], maxZoom: 15 });
});
