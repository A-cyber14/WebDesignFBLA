/* =========================================================
   home.js
   Fills in the Home page.
   ========================================================= */

// 1. Category links (each one opens Resources filtered to that category)
let categoryHTML = "";
categories.forEach(function (category) {
  categoryHTML += `<li><a class="need-link" href="resources.html?category=${category.id}">${icon(category.icon)}<span>${category.short}</span></a></li>`;
});
document.getElementById("category-grid").innerHTML = categoryHTML;


// 2. "Start Here": three popular listings
const featuredIds = ["harbor-table-pantry", "bayview-housing-help", "coastline-community-clinic"];
let featuredHTML = "";
featuredIds.forEach(function (id) {
  featuredHTML += createResourceCard(getResource(id));
});
document.getElementById("featured-list").innerHTML = featuredHTML;


// 3. Small map preview. It can't be moved; clicking it opens the Map page.
const homeMapBox = document.getElementById("home-map");

if (homeMapBox && typeof L !== "undefined") {
  const homeMap = L.map(homeMapBox, {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
    zoomAnimation: false,
    fadeAnimation: false
  });
  addBaseTiles(homeMap);

  const pinGroup = L.featureGroup().addTo(homeMap);
  allLocations().forEach(function (place) {
    const category = getCategory(place.resource.categories[0]);
    L.marker([place.location.lat, place.location.lng], {
      icon: pinIcon(category),
      interactive: false,
      keyboard: false
    }).addTo(pinGroup);
  });

  homeMap.fitBounds(pinGroup.getBounds(), { padding: [30, 30] });
}
