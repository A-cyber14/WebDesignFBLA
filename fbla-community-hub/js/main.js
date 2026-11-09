/* =========================================================
   main.js — Shared code used by EVERY page.
   Loaded after data.js and before each page's own script.
   ========================================================= */


/* ---------- 1. Mobile menu button ---------- */
// On small screens the navigation links are hidden behind a
// "Menu" button. Clicking it shows or hides the links.
function setupMenu() {
  const menuButton = document.getElementById("menu-button");
  const nav = document.getElementById("main-nav");

  menuButton.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    // aria-expanded tells screen readers whether the menu is open
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}


/* ---------- 2. Larger text button ---------- */
// Adds the class "large-text" to the <html> tag, which makes all
// text bigger (see styles.css). The choice is remembered.
function setupTextSize() {
  const button = document.getElementById("text-size-button");

  if (localStorage.getItem("largeText") === "yes") {
    document.documentElement.classList.add("large-text");
    button.setAttribute("aria-pressed", "true");
  }

  button.addEventListener("click", function () {
    const isLarge = document.documentElement.classList.toggle("large-text");
    button.setAttribute("aria-pressed", isLarge);
    localStorage.setItem("largeText", isLarge ? "yes" : "no");
  });
}


/* ---------- 3. Saved resources (favorites) ---------- */
// Favorites are stored in the browser's localStorage as a list
// of resource ids, for example: [1, 5, 12]

function getFavorites() {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

// Adds the id if it is not saved yet, or removes it if it is.
function toggleFavorite(id) {
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(function (savedId) { return savedId !== id; });
  } else {
    favorites.push(id);
    trackEvent("favoritesAdded");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateSavedCount();
}

// Shows the number of saved resources next to "Saved" in the menu.
function updateSavedCount() {
  const badge = document.getElementById("saved-count");
  const count = getFavorites().length;
  badge.textContent = count;
  badge.hidden = count === 0;
}


/* ---------- 4. Simple success metrics ---------- */
// Counts actions (searches, detail views, etc.) in localStorage.
// A real website would send these to an analytics tool instead.
// The About page displays these numbers.
function trackEvent(name) {
  const metrics = JSON.parse(localStorage.getItem("metrics") || "{}");
  metrics[name] = (metrics[name] || 0) + 1;
  localStorage.setItem("metrics", JSON.stringify(metrics));
}


/* ---------- 5. Helper functions ---------- */

// Finds a category object by its id, e.g. "food".
function getCategory(categoryId) {
  return categories.find(function (category) { return category.id === categoryId; });
}

// Finds a resource object by its id number.
function getResource(id) {
  return resources.find(function (resource) { return resource.id === id; });
}

// Turns an event's "daysFromToday" into a real Date object.
function getEventDate(event) {
  const date = new Date();
  date.setDate(date.getDate() + event.daysFromToday);
  return date;
}

// Builds the HTML for one event card (used on Home and Events).
function createEventCard(event) {
  const date = getEventDate(event);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const fullDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return `
    <article class="event-card">
      <div class="event-date" aria-hidden="true">
        <span class="event-month">${month}</span>
        <span class="event-day">${day}</span>
      </div>
      <div class="event-info">
        <span class="tag">${event.type}</span>
        <h3>${event.title}</h3>
        <p class="event-meta"><strong>${fullDate}</strong> · ${event.time}</p>
        <p class="event-meta">📍 ${event.location} · ${event.cost}</p>
        <p>${event.description}</p>
      </div>
    </article>`;
}

// Builds the HTML for one resource card. Used on Home,
// Resources, and Saved so every card looks the same.
function createResourceCard(resource) {
  const category = getCategory(resource.category);
  const saved = isFavorite(resource.id);

  return `
    <article class="resource-card">
      <div class="card-top">
        <span class="card-icon" aria-hidden="true">${category.icon}</span>
        <span class="tag">${category.name}</span>
        <span class="cost ${resource.cost === "Free" ? "cost-free" : ""}">${resource.cost}</span>
      </div>
      <h3>${resource.name}</h3>
      <p>${resource.description}</p>
      <p class="card-hours">🕒 ${resource.hours}</p>
      <p class="print-only">${resource.address} · Phone: ${resource.phone}</p>
      <div class="card-buttons">
        <button class="button button-small details-button" data-id="${resource.id}">
          View details <span class="visually-hidden">for ${resource.name}</span>
        </button>
        <button class="save-button" data-id="${resource.id}" aria-pressed="${saved}"
                aria-label="Save ${resource.name}">
          <span aria-hidden="true">${saved ? "♥" : "♡"}</span> ${saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>`;
}


/* ---------- 6. Resource details pop-up ---------- */
// Uses the built-in HTML <dialog> element, which handles the
// Escape key and keeps keyboard focus inside the pop-up.
function openDetails(id) {
  const resource = getResource(id);
  const category = getCategory(resource.category);
  const dialog = document.getElementById("details-dialog");

  document.getElementById("dialog-content").innerHTML = `
    <span class="tag">${category.icon} ${category.name}</span>
    <h2 id="dialog-title">${resource.name}</h2>
    <p>${resource.description}</p>
    <dl class="details-list">
      <dt>Address</dt>   <dd>${resource.address}</dd>
      <dt>Phone</dt>     <dd><a href="tel:${resource.phone}">${resource.phone}</a></dd>
      <dt>Hours</dt>     <dd>${resource.hours}</dd>
      <dt>Cost</dt>      <dd>${resource.cost}</dd>
      <dt>Who it serves</dt> <dd>${resource.audience.join(", ")}</dd>
      <dt>Languages</dt> <dd>${resource.languages.join(", ")}</dd>
    </dl>
    <div class="helpful-box">
      <p id="helpful-question">Was this information helpful?</p>
      <button class="button button-small button-outline" data-helpful="yes">👍 Yes</button>
      <button class="button button-small button-outline" data-helpful="no">👎 No</button>
    </div>`;

  dialog.showModal();
  trackEvent("detailViews");
}

// Sets up the close button and the "Was this helpful?" buttons.
function setupDialog() {
  const dialog = document.getElementById("details-dialog");
  if (!dialog) return; // this page has no pop-up

  document.getElementById("close-dialog").addEventListener("click", function () {
    dialog.close();
  });

  // Clicking the dark area outside the pop-up also closes it.
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    const answer = event.target.closest("[data-helpful]");
    if (!answer) return;
    trackEvent(answer.dataset.helpful === "yes" ? "helpfulYes" : "helpfulNo");
    answer.parentElement.innerHTML = "<p role='status'>Thank you! Your feedback helps us improve.</p>";
  });
}


/* ---------- 7. Card buttons (works for every card on every page) ---------- */
// One click listener for the whole page. It checks whether the
// clicked element is a "View details" or "Save" button.
document.addEventListener("click", function (event) {
  const detailsButton = event.target.closest(".details-button");
  const saveButton = event.target.closest(".save-button");
  const phoneLink = event.target.closest("a[href^='tel:']");

  // A tap on a phone number means the user is contacting a resource
  if (phoneLink) {
    trackEvent("phoneTaps");
  }

  if (detailsButton) {
    openDetails(Number(detailsButton.dataset.id));
  }

  if (saveButton) {
    const id = Number(saveButton.dataset.id);
    toggleFavorite(id);
    const saved = isFavorite(id);
    saveButton.setAttribute("aria-pressed", saved);
    saveButton.innerHTML = `<span aria-hidden="true">${saved ? "♥" : "♡"}</span> ${saved ? "Saved" : "Save"}`;

    // The Saved page defines this function so it can refresh its list.
    if (typeof onFavoritesChanged === "function") onFavoritesChanged();
  }
});


/* ---------- 8. Run the shared setup on every page ---------- */
setupMenu();
setupTextSize();
setupDialog();
updateSavedCount();
document.getElementById("year").textContent = new Date().getFullYear();
