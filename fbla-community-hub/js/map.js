/* =========================================================
   map.js
   The Map page. Every location gets a pin. The list next
   to the map shows the same places, so people who can't use the
   map (keyboard, screen reader, or offline) still get everything.
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

// Leaflet (the map library) loads from the internet. If it didn't load,
// "L" won't exist and we show the list instead.
const mapLoaded = typeof L !== "undefined";
let map = null;
let pinLayer = null;
let pins = [];          // pins[i] is the pin for shownPlaces[i]
let shownPlaces = [];   // the places that match the filters right now


/* ---------- 1. Which places match the filters? ---------- */
function getMatchingPlaces() {
  const searchText = mapSearch.value.trim().toLowerCase();
  const category = mapCategory.value;
  const city = mapCity.value;

  return allLocations().filter(function (place) {
    const resource = place.resource;
    const text = (resource.name + " " + resource.description + " " + place.location.address).toLowerCase();

    const matchesSearch = searchText === "" || text.includes(searchText);
    const matchesCategory = category === "all" || resource.categories.includes(category);
    const matchesCity = city === "all" || place.location.city === city;
    return matchesSearch && matchesCategory && matchesCity;
  });
}


/* ---------- 2. The card that opens when you pick a place ---------- */
function showPreview(index) {
  const place = shownPlaces[index];
  const resource = place.resource;
  const category = getCategory(resource.categories[0]);
  const phone = resource.phones[0].number;

  previewBody.innerHTML = `
    <div class="preview-item">
      <span class="badge">${category.short}</span>
      <h3>${resource.name}</h3>
      <p><strong>${place.location.label}</strong><br>${place.location.address}</p>
      <p>${resource.hours}</p>
      <div class="preview-actions">
        <a class="button button-small button-secondary" href="${telHref(phone)}">Call</a>
        <button class="button button-small button-secondary details-button" type="button" data-id="${resource.id}">Details</button>
      </div>
    </div>`;
  preview.hidden = false;

  // Highlight the matching pin and list item
  document.querySelectorAll(".pin.is-active").forEach(function (pin) {
    pin.classList.remove("is-active");
  });
  if (pins[index] && pins[index].getElement()) {
    pins[index].getElement().querySelector(".pin").classList.add("is-active");
  }
  document.querySelectorAll(".map-list-item").forEach(function (item) {
    item.classList.toggle("is-active", item.dataset.index === String(index));
  });
}

document.getElementById("preview-close").addEventListener("click", function () {
  preview.hidden = true;
  document.querySelectorAll(".pin.is-active").forEach(function (pin) {
    pin.classList.remove("is-active");
  });
});


/* ---------- 3. Draw the list and the pins ---------- */
function render() {
  shownPlaces = getMatchingPlaces();

  // The list
  let listHTML = "";
  shownPlaces.forEach(function (place, index) {
    const resource = place.resource;
    const category = getCategory(resource.categories[0]);

    let showOnMapButton = "";
    if (mapLoaded) {
      showOnMapButton = `<button type="button" data-show="${index}">Show on Map<span class="visually-hidden">: ${resource.name}</span></button>`;
    }

    listHTML += `
      <li class="map-list-item" data-index="${index}">
        <p>${category.short}</p>
        <h3>${resource.name}</h3>
        <p>${place.location.address}</p>
        <div class="map-list-actions">
          ${showOnMapButton}
          <button type="button" class="details-button" data-id="${resource.id}">Details<span class="visually-hidden"> for ${resource.name}</span></button>
        </div>
      </li>`;
  });
  if (shownPlaces.length === 0) {
    listHTML = '<li class="empty-state"><p>No mapped places match.</p></li>';
  }
  mapList.innerHTML = listHTML;

  if (shownPlaces.length === 1) {
    mapCount.textContent = "1 location";
  } else {
    mapCount.textContent = shownPlaces.length + " locations";
  }

  // Some services have no building (you call them), so they aren't on the map.
  // We mention them under the list.
  const phoneOnly = resources.filter(function (resource) {
    const matchesCategory = mapCategory.value === "all" || resource.categories.includes(mapCategory.value);
    return resource.locations.length === 0 && matchesCategory;
  });
  if (phoneOnly.length > 0) {
    mapExtra.innerHTML = "Plus " + phoneOnly.length + " countywide services by phone. " +
      '<a href="resources.html">See All Resources</a>';
  } else {
    mapExtra.innerHTML = "";
  }

  // The pins
  if (!mapLoaded) {
    return;
  }
  pinLayer.clearLayers();
  pins = [];
  preview.hidden = true;

  shownPlaces.forEach(function (place, index) {
    const category = getCategory(place.resource.categories[0]);
    const pin = L.marker([place.location.lat, place.location.lng], {
      icon: pinIcon(category),
      title: place.resource.name,
      alt: place.resource.name
    });
    pin.on("click", function () {
      showPreview(index);
    });
    pin.on("keypress", function (event) {
      if (event.originalEvent.key === "Enter") {
        showPreview(index);
      }
    });
    pin.addTo(pinLayer);
    pins.push(pin);
  });

  // Zoom the map to fit all the pins
  if (shownPlaces.length > 0) {
    fitPins();
  }
}


// Frames all the pins. On wide screens the list panel covers the left
// side of the map, so we leave extra room there.
function fitPins() {
  let leftSpace = 40;
  if (window.innerWidth >= 1024) {
    leftSpace = 400;
  }
  map.fitBounds(pinLayer.getBounds(), {
    paddingTopLeft: [leftSpace, 40],
    paddingBottomRight: [40, 40],
    maxZoom: 14
  });
}


/* ---------- 4. If the map can't load, show the list ---------- */
function showListInstead() {
  document.getElementById("map-fallback").hidden = false;
  document.getElementById("map-offline").hidden = false;
  switchView("list");
}

// maptools.js calls this if the map pictures (tiles) fail to load
function onTilesFailed() {
  showListInstead();
}


/* ---------- 5. Map / List switch (phones and tablets) ---------- */
function switchView(view) {
  mapApp.dataset.view = view;
  document.querySelectorAll("[data-view-button]").forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.viewButton === view);
  });
  // Leaflet needs to re-measure the map after it becomes visible again
  if (view === "map" && map) {
    setTimeout(function () {
      map.invalidateSize();
    }, 50);
  }
}

document.querySelectorAll("[data-view-button]").forEach(function (button) {
  button.addEventListener("click", function () {
    switchView(button.dataset.viewButton);
  });
});


/* ---------- 6. Set up the map ---------- */
if (mapLoaded) {
  // Turn off zoom animations if the device is set to reduce motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  map = L.map("map", {
    zoomAnimation: !reduceMotion,
    fadeAnimation: !reduceMotion,
    markerZoomAnimation: !reduceMotion
  });
  addBaseTiles(map);
  // Pins that are close together join into one numbered circle.
  // Clicking the circle zooms in so each pin can be picked.
  if (L.markerClusterGroup) {
    pinLayer = L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 40 });
  } else {
    pinLayer = L.featureGroup();
  }
  pinLayer.addTo(map);
  map.setView([27.9, -82.73], 10); // Pinellas County
} else {
  showListInstead();
}


/* ---------- 7. Filters and buttons ---------- */
mapSearch.addEventListener("input", render);

mapCategory.addEventListener("change", function () {
  trackEvent("filtersUsed");
  render();
});

mapCity.addEventListener("change", function () {
  trackEvent("filtersUsed");
  render();
});

// Pressing Enter in the search box shouldn't reload the page
document.getElementById("map-form").addEventListener("submit", function (event) {
  event.preventDefault();
});

// "Show on map" buttons in the list
mapList.addEventListener("click", function (event) {
  const button = event.target.closest("[data-show]");
  if (!button || !map) {
    return;
  }
  const index = Number(button.dataset.show);
  const place = shownPlaces[index];

  switchView("map");
  // If the pin is inside a numbered circle, zoom in until it shows
  if (pinLayer.zoomToShowLayer) {
    pinLayer.zoomToShowLayer(pins[index], function () {
      showPreview(index);
    });
  } else {
    map.setView([place.location.lat, place.location.lng], 15);
    showPreview(index);
  }
});

// Links like map.html?city=Largo open the map already filtered
const mapParams = new URLSearchParams(window.location.search);
if (getCategory(mapParams.get("category"))) {
  mapCategory.value = mapParams.get("category");
}
if (cities.includes(mapParams.get("city"))) {
  mapCity.value = mapParams.get("city");
}

render();
