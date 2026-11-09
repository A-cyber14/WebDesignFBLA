/* =========================================================
   resources.js — Search and filters for the Resource Directory.
   Search, category, location, and cost filters all work together.
   ========================================================= */

const searchInput = document.getElementById("search");
const citySelect = document.getElementById("city");
const freeCheckbox = document.getElementById("free-only");
const sortSelect = document.getElementById("sort");
const categoryButtonsBox = document.getElementById("category-buttons");
const resultsList = document.getElementById("results");
const resultsCount = document.getElementById("results-count");
const resultsNote = document.getElementById("results-note");
const noResults = document.getElementById("no-results");

let selectedCategory = "all";


/* ---------- Category filter buttons ---------- */
function createCategoryButtons() {
  let html = `<button class="chip" type="button" data-category="all" aria-pressed="true">All</button>`;
  categories.forEach(function (category) {
    html += `<button class="chip" type="button" data-category="${category.id}" aria-pressed="false" style="--cat:${category.color}">
               ${icon(category.icon)} ${category.name}
             </button>`;
  });
  categoryButtonsBox.innerHTML = html;
}

function selectCategory(categoryId) {
  selectedCategory = categoryId;
  categoryButtonsBox.querySelectorAll(".chip").forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.category === categoryId);
  });
}


/* ---------- Filter, sort, display ---------- */
function showResults() {
  const searchText = searchInput.value.trim().toLowerCase();
  const city = citySelect.value;

  const matches = resources.filter(function (resource) {
    const categoryNames = resource.categories.map(function (id) { return getCategory(id).name; }).join(" ");
    const places = resource.locations.map(function (l) { return l.address; }).join(" ");
    const textToSearch = (resource.name + " " + resource.description + " " + categoryNames + " " + places + " " + (resource.areaNote || "")).toLowerCase();

    return textToSearch.includes(searchText) &&
           (selectedCategory === "all" || resource.categories.includes(selectedCategory)) &&
           servesCity(resource, city) &&
           (!freeCheckbox.checked || resource.free);
  });

  if (sortSelect.value === "urgent") {
    // Crisis lines first, then A–Z
    matches.sort(function (a, b) { return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0) || a.name.localeCompare(b.name); });
  } else {
    matches.sort(function (a, b) { return a.name.localeCompare(b.name); });
    if (sortSelect.value === "za") matches.reverse();
  }

  resultsList.innerHTML = matches.map(createResourceCard).join("");

  resultsCount.textContent = `Showing ${matches.length} of ${resources.length} resources` + (city !== "all" ? ` available in ${city}` : "");
  resultsNote.textContent = city !== "all" ? "Includes services for all of Pinellas County, plus places located in " + city + "." : "";
  noResults.hidden = matches.length > 0;

  // Keep the address bar in sync so results can be shared or bookmarked
  const params = new URLSearchParams();
  if (searchInput.value.trim()) params.set("search", searchInput.value.trim());
  if (selectedCategory !== "all") params.set("category", selectedCategory);
  if (city !== "all") params.set("city", city);
  const query = params.toString();
  try {
    history.replaceState(null, "", query ? "?" + query : window.location.pathname);
  } catch (error) { /* some browsers block this for local files */ }

  return matches.length;
}

function resetFilters() {
  searchInput.value = "";
  citySelect.value = "all";
  freeCheckbox.checked = false;
  sortSelect.value = "az";
  selectCategory("all");
  showResults();
}


/* ---------- Connect the controls ---------- */
createCategoryButtons();

searchInput.addEventListener("input", showResults);
searchInput.addEventListener("change", function () {
  if (searchInput.value.trim() === "") return;
  trackEvent("searches");
  if (showResults() === 0) trackEvent("searchesWithNoResults");
});

document.getElementById("filter-form").addEventListener("submit", function (event) {
  event.preventDefault();
});

citySelect.addEventListener("change", function () { trackEvent("filtersUsed"); showResults(); });
freeCheckbox.addEventListener("change", function () { trackEvent("filtersUsed"); showResults(); });
sortSelect.addEventListener("change", showResults);

categoryButtonsBox.addEventListener("click", function (event) {
  const button = event.target.closest(".chip");
  if (!button) return;
  selectCategory(button.dataset.category);
  trackEvent("filtersUsed");
  showResults();
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
