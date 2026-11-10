/* =========================================================
   resources.js: search and filters for the Resource Directory.
   Search, category, city, and the checkboxes all work together.
   ========================================================= */

const searchInput = document.getElementById("search");
const citySelect = document.getElementById("city");
const freeCheckbox = document.getElementById("free-only");
const countywideCheckbox = document.getElementById("countywide-only");
const urgentCheckbox = document.getElementById("urgent-only");
const sortSelect = document.getElementById("sort");
const categoryBox = document.getElementById("category-options");
const resultsList = document.getElementById("results");
const resultsCount = document.getElementById("results-count");
const resultsNote = document.getElementById("results-note");
const noResults = document.getElementById("no-results");
const filterToggle = document.getElementById("filter-toggle");
const filtersPanel = document.getElementById("filters");


/* ---------- Category radio buttons ---------- */
categoryBox.innerHTML =
  `<label><input type="radio" name="category" value="all" checked> All</label>` +
  categories.map(function (c) {
    return `<label><input type="radio" name="category" value="${c.id}"> ${icon(c.icon)} ${c.short}</label>`;
  }).join("");

function selectedCategory() {
  return categoryBox.querySelector("input:checked").value;
}

function selectCategory(id) {
  categoryBox.querySelector(`input[value="${id}"]`).checked = true;
}


/* ---------- Filter, sort, display ---------- */
function showResults() {
  const searchText = searchInput.value.trim().toLowerCase();
  const city = citySelect.value;
  const category = selectedCategory();

  const matches = resources.filter(function (resource) {
    const categoryNames = resource.categories.map(function (id) { return getCategory(id).name; }).join(" ");
    const places = resource.locations.map(function (l) { return l.address; }).join(" ");
    const textToSearch = (resource.name + " " + resource.description + " " + categoryNames + " " + places + " " + (resource.areaNote || "")).toLowerCase();

    return textToSearch.includes(searchText) &&
           (category === "all" || resource.categories.includes(category)) &&
           servesCity(resource, city) &&
           (!freeCheckbox.checked || resource.free) &&
           (!countywideCheckbox.checked || resource.area === "countywide") &&
           (!urgentCheckbox.checked || resource.urgent);
  });

  matches.sort(function (a, b) { return a.name.localeCompare(b.name); });
  if (sortSelect.value === "urgent") {
    matches.sort(function (a, b) { return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0); });
  }

  resultsList.innerHTML = matches.map(createResourceCard).join("");
  resultsCount.textContent = `${matches.length} ${matches.length === 1 ? "resource" : "resources"}`;
  resultsNote.textContent = city !== "all" ? "Includes countywide services plus places in " + city + "." : "";
  noResults.hidden = matches.length > 0;

  // Keep the address bar in sync so results can be shared or bookmarked
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
  if (category !== "all") params.set("category", category);
  if (city !== "all") params.set("city", city);
  const query = params.toString();
  try {
    history.replaceState(null, "", query ? "?" + query : window.location.pathname);
  } catch (error) { /* some browsers block this for local files */ }

  return matches.length;
}

function resetFilters() {
  document.getElementById("filter-form").reset();
  showResults();
}


/* ---------- Connect the controls ---------- */
searchInput.addEventListener("input", showResults);
searchInput.addEventListener("change", function () {
  if (searchInput.value.trim() === "") return;
  trackEvent("searches");
  if (showResults() === 0) trackEvent("searchesWithNoResults");
});

document.getElementById("filter-form").addEventListener("submit", function (event) {
  event.preventDefault();
});

// Any filter change (radios, select, checkboxes) refreshes the results
filtersPanel.addEventListener("change", function () {
  trackEvent("filtersUsed");
  showResults();
});
sortSelect.addEventListener("change", showResults);

// Phones and tablets: show or hide the filter panel
filterToggle.addEventListener("click", function () {
  const open = filtersPanel.classList.toggle("is-open");
  filterToggle.setAttribute("aria-expanded", open);
});

document.getElementById("reset-button").addEventListener("click", resetFilters);
document.getElementById("reset-button-2").addEventListener("click", resetFilters);


/* ---------- Read settings from the web address ---------- */
// e.g. resources.html?category=food&city=Largo or ?search=rent
const urlSettings = new URLSearchParams(window.location.search);
if (urlSettings.get("search")) {
  searchInput.value = urlSettings.get("search");
  trackEvent("searches");
}
if (getCategory(urlSettings.get("category"))) selectCategory(urlSettings.get("category"));
if (cities.includes(urlSettings.get("city"))) citySelect.value = urlSettings.get("city");

if (showResults() === 0 && urlSettings.get("search")) trackEvent("searchesWithNoResults");
