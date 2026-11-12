/* =========================================================
   resources.js
   Search and filters on the Resources page. The search box,
   category, city, and "More filters" all work together.
   Active filters show as small buttons you can click to remove.
   ========================================================= */

const form = document.getElementById("filter-form");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const citySelect = document.getElementById("city");
const freeCheckbox = document.getElementById("free-only");
const countywideCheckbox = document.getElementById("countywide-only");
const resultsList = document.getElementById("results");
const resultsCount = document.getElementById("results-count");
const resultsNote = document.getElementById("results-note");
const noResults = document.getElementById("no-results");
const activeList = document.getElementById("active-filters");
const resetButton = document.getElementById("reset-button");


/* ---------- 1. Does a resource match the filters? ---------- */
function matchesFilters(resource) {
  // Every word typed must appear somewhere, so "pantry largo" works
  const words = searchInput.value.trim().toLowerCase().split(" ");

  let text = resource.name + " " + resource.description + " " + (resource.areaNote || "");
  resource.categories.forEach(function (id) {
    text += " " + getCategory(id).name;
  });
  resource.locations.forEach(function (location) {
    text += " " + location.city;
  });
  text = text.toLowerCase();

  for (const word of words) {
    if (!text.includes(word)) {
      return false;
    }
  }

  if (categorySelect.value !== "all" && !resource.categories.includes(categorySelect.value)) {
    return false;
  }
  if (!servesCity(resource, citySelect.value)) {
    return false;
  }
  if (freeCheckbox.checked && !resource.free) {
    return false;
  }
  if (countywideCheckbox.checked && resource.area !== "countywide") {
    return false;
  }
  return true;
}


/* ---------- 2. Show the results ---------- */
function showResults() {
  const matches = resources.filter(matchesFilters);

  // A to Z by name
  matches.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  let html = "";
  matches.forEach(function (resource) {
    html += createResourceCard(resource);
  });
  resultsList.innerHTML = html;

  if (matches.length === 1) {
    resultsCount.textContent = "1 resource found";
  } else {
    resultsCount.textContent = matches.length + " resources found";
  }

  if (citySelect.value === "all") {
    resultsNote.textContent = "";
  } else {
    resultsNote.textContent = "Includes countywide services plus places in " + citySelect.value + ".";
  }

  noResults.hidden = matches.length > 0;
  showActiveFilters();
  updateAddressBar();

  return matches.length;
}


/* ---------- 3. Active filter buttons ---------- */
function showActiveFilters() {
  // Each item is [which filter, the label to show]
  const active = [];
  if (searchInput.value.trim() !== "") {
    active.push(["search", "“" + searchInput.value.trim() + "”"]);
  }
  if (categorySelect.value !== "all") {
    active.push(["category", getCategory(categorySelect.value).short]);
  }
  if (citySelect.value !== "all") {
    active.push(["city", citySelect.value]);
  }
  if (freeCheckbox.checked) {
    active.push(["free", "Free Only"]);
  }
  if (countywideCheckbox.checked) {
    active.push(["countywide", "Serves All of Pinellas"]);
  }

  let html = "";
  active.forEach(function (item) {
    html += `<li><button class="active-chip" type="button" data-clear="${item[0]}">${escapeHTML(item[1])} <span aria-hidden="true">×</span><span class="visually-hidden">, remove filter</span></button></li>`;
  });
  activeList.innerHTML = html;
  resetButton.hidden = active.length === 0;

  // Show how many "More filters" are on, like "More filters (1)"
  let moreCount = 0;
  if (freeCheckbox.checked) {
    moreCount++;
  }
  if (countywideCheckbox.checked) {
    moreCount++;
  }
  if (moreCount > 0) {
    document.getElementById("more-count").textContent = " (" + moreCount + ")";
  } else {
    document.getElementById("more-count").textContent = "";
  }
}

// Clicking an active filter button removes that filter
activeList.addEventListener("click", function (event) {
  const chip = event.target.closest("[data-clear]");
  if (!chip) {
    return;
  }

  const which = chip.dataset.clear;
  if (which === "search") {
    searchInput.value = "";
  } else if (which === "category") {
    categorySelect.value = "all";
  } else if (which === "city") {
    citySelect.value = "all";
  } else if (which === "free") {
    freeCheckbox.checked = false;
  } else if (which === "countywide") {
    countywideCheckbox.checked = false;
  }
  showResults();

  // Keep keyboard focus nearby
  const nextChip = activeList.querySelector("button");
  if (nextChip) {
    nextChip.focus();
  } else {
    searchInput.focus();
  }
});


/* ---------- 4. Keep the web address up to date ---------- */
// So a filtered list can be bookmarked or shared, like resources.html?category=food
function updateAddressBar() {
  const params = new URLSearchParams();
  if (searchInput.value.trim() !== "") {
    params.set("search", searchInput.value.trim());
  }
  if (categorySelect.value !== "all") {
    params.set("category", categorySelect.value);
  }
  if (citySelect.value !== "all") {
    params.set("city", citySelect.value);
  }

  let newAddress = window.location.pathname;
  if (params.toString() !== "") {
    newAddress = "?" + params.toString();
  }

  try {
    history.replaceState(null, "", newAddress);
  } catch (error) {
    // Some browsers block this when opening the file directly.
  }
}


/* ---------- 5. Buttons and inputs ---------- */
function resetFilters() {
  form.reset();
  showResults();
  searchInput.focus();
}

searchInput.addEventListener("input", showResults);

// When someone finishes typing a search, count it for the About page metrics
searchInput.addEventListener("change", function () {
  if (searchInput.value.trim() === "") {
    return;
  }
  trackEvent("searches");
  if (showResults() === 0) {
    trackEvent("searchesWithNoResults");
  }
});

// Pressing Enter shouldn't reload the page
form.addEventListener("submit", function (event) {
  event.preventDefault();
});

// Category, city, and the checkboxes
form.addEventListener("change", function (event) {
  if (event.target === searchInput) {
    return;
  }
  trackEvent("filtersUsed");
  showResults();
});

resetButton.addEventListener("click", resetFilters);
document.getElementById("reset-button-2").addEventListener("click", resetFilters);


/* ---------- 6. Start with any filters in the web address ---------- */
// For example resources.html?category=food&city=Largo or ?search=pantry
const urlSettings = new URLSearchParams(window.location.search);

if (urlSettings.get("search")) {
  searchInput.value = urlSettings.get("search");
  trackEvent("searches");
}
if (getCategory(urlSettings.get("category"))) {
  categorySelect.value = urlSettings.get("category");
}
if (cities.includes(urlSettings.get("city"))) {
  citySelect.value = urlSettings.get("city");
}

const startingCount = showResults();
if (startingCount === 0 && urlSettings.get("search")) {
  trackEvent("searchesWithNoResults");
}
