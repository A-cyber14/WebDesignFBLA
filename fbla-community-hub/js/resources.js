/* =========================================================
   resources.js — Search and filters for the Resource Directory.
   ========================================================= */

// Grab the page elements we need
const searchInput = document.getElementById("search");
const audienceSelect = document.getElementById("audience");
const freeCheckbox = document.getElementById("free-only");
const sortSelect = document.getElementById("sort");
const categoryButtonsBox = document.getElementById("category-buttons");
const resultsList = document.getElementById("results");
const resultsCount = document.getElementById("results-count");
const noResults = document.getElementById("no-results");

// The category that is currently selected ("all" = no filter)
let selectedCategory = "all";


/* ---------- Build the category filter buttons ---------- */
function createCategoryButtons() {
  let html = `<button class="chip" data-category="all" aria-pressed="true">All</button>`;
  categories.forEach(function (category) {
    html += `<button class="chip" data-category="${category.id}" aria-pressed="false">
               <span aria-hidden="true">${category.icon}</span> ${category.name}
             </button>`;
  });
  categoryButtonsBox.innerHTML = html;
}

// Highlights the selected category button
function selectCategory(categoryId) {
  selectedCategory = categoryId;
  const buttons = categoryButtonsBox.querySelectorAll(".chip");
  buttons.forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.category === categoryId);
  });
}


/* ---------- The main function: filter, sort, and display ---------- */
function showResults() {
  const searchText = searchInput.value.trim().toLowerCase();
  const audience = audienceSelect.value;

  // Keep only the resources that pass EVERY filter
  const matches = resources.filter(function (resource) {
    const category = getCategory(resource.category);

    // Search looks at the name, description, and category name
    const textToSearch = (resource.name + " " + resource.description + " " + category.name).toLowerCase();
    const matchesSearch = textToSearch.includes(searchText);

    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    const matchesAudience = audience === "all" || resource.audience.includes(audience);
    const matchesCost = !freeCheckbox.checked || resource.cost === "Free";

    return matchesSearch && matchesCategory && matchesAudience && matchesCost;
  });

  // Sort A–Z or Z–A by name
  matches.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  if (sortSelect.value === "za") matches.reverse();

  // Build the cards
  let html = "";
  matches.forEach(function (resource) {
    html += createResourceCard(resource);
  });
  resultsList.innerHTML = html;

  // Update the count (screen readers announce it because of aria-live)
  resultsCount.textContent = `Showing ${matches.length} of ${resources.length} resources`;
  noResults.hidden = matches.length > 0;

  return matches.length;
}


/* ---------- Reset every filter ---------- */
function resetFilters() {
  searchInput.value = "";
  audienceSelect.value = "all";
  freeCheckbox.checked = false;
  sortSelect.value = "az";
  selectCategory("all");
  showResults();
}


/* ---------- Connect the controls ---------- */
createCategoryButtons();

// Results update as the user types
searchInput.addEventListener("input", showResults);

// When the user finishes a search (presses Enter or leaves the box),
// record it for our metrics, including searches that found nothing.
searchInput.addEventListener("change", function () {
  if (searchInput.value.trim() === "") return;
  trackEvent("searches");
  if (showResults() === 0) trackEvent("searchesWithNoResults");
});

// Pressing Enter in the search box should not reload the page
document.getElementById("filter-form").addEventListener("submit", function (event) {
  event.preventDefault();
});

audienceSelect.addEventListener("change", function () { trackEvent("filtersUsed"); showResults(); });
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
// Links like resources.html?category=food or ?search=rent
// open this page with that filter already applied.
const urlSettings = new URLSearchParams(window.location.search);

if (urlSettings.get("search")) {
  searchInput.value = urlSettings.get("search");
  trackEvent("searches");
}
if (getCategory(urlSettings.get("category"))) {
  selectCategory(urlSettings.get("category"));
}

if (showResults() === 0 && urlSettings.get("search")) {
  trackEvent("searchesWithNoResults");
}
