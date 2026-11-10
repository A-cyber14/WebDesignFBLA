/* =========================================================
   main.js — Shared code used by EVERY page.
   Loaded after data.js and before each page's own script.
   ========================================================= */

document.documentElement.classList.add("js");


/* ---------- 1. Safe browser storage ---------- */
// localStorage can be blocked (private windows, strict settings),
// so every read and write is wrapped in try/catch.
function storageGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    /* storage unavailable — the site still works, it just won't remember */
  }
}


/* ---------- 2. Icons ---------- */
// Simple line icons drawn for this site (24×24, stroke-based).
const ICONS = {
  food: '<path d="M4 11h16a8 8 0 0 1-16 0Z"/><path d="M9 7c0-1.5 1.5-1.5 1.5-3M13.5 7c0-1.5 1.5-1.5 1.5-3"/>',
  housing: '<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  health: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 8v8M8 12h8"/>',
  jobs: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"/>',
  education: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5Z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5"/>',
  seniors: '<circle cx="11" cy="5" r="2.2"/><path d="M11 8v6l-2.5 6.5M11 14l3 6.5M8 10.5l3-2 3 2.5 2 0"/><path d="M17.5 12v8.5"/>',
  transportation: '<rect x="4.5" y="3" width="15" height="14" rx="3"/><path d="M4.5 10.5h15M8 20.5V17M16 20.5V17"/><circle cx="8.5" cy="13.8" r=".6" fill="currentColor"/><circle cx="15.5" cy="13.8" r=".6" fill="currentColor"/>',
  disability: '<circle cx="12" cy="4.5" r="2"/><path d="M5 8.5l7 1.2 7-1.2M12 9.7v4.8M8.8 21l3.2-6.5 3.2 6.5"/>',
  family: '<circle cx="8" cy="6" r="2.4"/><circle cx="16.5" cy="8" r="1.9"/><path d="M3.5 20v-3.5A4.5 4.5 0 0 1 12.5 16.5V20M13 20v-3a3.5 3.5 0 0 1 7 0v3"/>',
  emergency: '<path d="M12 3.5 21.5 20h-19Z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  financial: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.4c0-1.3-1.2-2.2-2.8-2.2s-2.8.9-2.8 2.1c0 2.9 5.6 1.6 5.6 4.6 0 1.3-1.2 2.4-2.8 2.4s-2.8-1-2.8-2.3M12 5.8v1.4M12 16.3v1.6"/>',
  veterans: '<path d="m12 3.5 2.5 5.3 5.8.6-4.3 4 1.2 5.7L12 16.2l-5.2 2.9L8 13.4l-4.3-4 5.8-.6Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  phone: '<path d="M5 3.5h3.2l1.6 4.4-2.1 1.5a12 12 0 0 0 6.9 6.9l1.5-2.1 4.4 1.6V19a1.6 1.6 0 0 1-1.7 1.6A16.5 16.5 0 0 1 3.4 5.2 1.6 1.6 0 0 1 5 3.5Z"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z"/>',
  check: '<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.2 7.5 9.5 4.3-1.3 7.5-4.9 7.5-9.5V6Z"/><path d="m8.8 12 2.2 2.2 4.3-4.4"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  map: '<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6Z"/><path d="M9 4v14M15 6v14"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r=".8" fill="currentColor"/><circle cx="4.5" cy="12" r=".8" fill="currentColor"/><circle cx="4.5" cy="18" r=".8" fill="currentColor"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  directions: '<path d="M12 2.8 21.2 12 12 21.2 2.8 12Z"/><path d="M9.5 14v-2.5h4.5M12 9l2.2 2.5L12 14"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  external: '<path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>'
};

function icon(name, className) {
  return `<svg class="icon ${className || ""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ""}</svg>`;
}

// Fills every <span data-icon="name"></span> written in the HTML.
function fillStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach(function (element) {
    element.innerHTML = icon(element.dataset.icon);
  });
}


/* ---------- 3. Text helpers ---------- */
// Escapes text before putting it inside HTML (used for anything a user typed).
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// "727-464-4200" → "tel:7274644200"
function telHref(number) {
  return "tel:" + number.replace(/[^0-9]/g, "");
}

// "2026-11-09" → "Nov 9, 2026"
function formatVerified(isoDate) {
  const parts = isoDate.split("-");
  const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function directionsURL(address) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(address);
}


/* ---------- 4. Menu, current page, and larger text ---------- */
function setupMenu() {
  const button = document.getElementById("menu-button");
  const panel = document.getElementById("menu-panel");
  if (!button) return;

  function setOpen(open) {
    panel.hidden = !open;
    button.setAttribute("aria-expanded", open);
    button.innerHTML = icon(open ? "close" : "menu");
  }
  button.addEventListener("click", function () { setOpen(panel.hidden); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); }
  });
}

// Marks the link to the current page in the header and menu
function markCurrentPage() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-header a").forEach(function (link) {
    if (link.getAttribute("href") === page && !link.classList.contains("logo")) link.setAttribute("aria-current", "page");
  });
}

function setupTextSize() {
  const button = document.getElementById("text-size-button");
  if (!button) return;

  if (storageGet("largeText", false) === true) {
    document.documentElement.classList.add("large-text");
    button.setAttribute("aria-pressed", "true");
  }

  button.addEventListener("click", function () {
    const isLarge = document.documentElement.classList.toggle("large-text");
    button.setAttribute("aria-pressed", isLarge);
    storageSet("largeText", isLarge);
  });
}


/* ---------- 5. Saved resources (favorites) ---------- */
// Stored as a list of resource ids, e.g. ["psta", "hope-villages-food"].
// Ids that no longer exist (for example, from an older version
// of the site) are ignored.
function getFavorites() {
  const saved = storageGet("favorites", []);
  if (!Array.isArray(saved)) return [];
  return saved.filter(function (id) { return typeof id === "string" && getResource(id); });
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(function (savedId) { return savedId !== id; });
  } else {
    favorites.push(id);
    trackEvent("favoritesAdded");
  }
  storageSet("favorites", favorites);
  updateSavedCount();
}

function updateSavedCount() {
  const badge = document.getElementById("saved-count");
  if (!badge) return;
  const count = getFavorites().length;
  badge.textContent = count;
  badge.hidden = count === 0;
}


/* ---------- 6. Success metrics ---------- */
// Counts actions in this browser. A real site would use a
// privacy-friendly analytics tool instead.
function trackEvent(name) {
  const metrics = storageGet("metrics", {});
  metrics[name] = (metrics[name] || 0) + 1;
  storageSet("metrics", metrics);
}


/* ---------- 7. Data helpers ---------- */
function getCategory(categoryId) {
  return categories.find(function (category) { return category.id === categoryId; });
}

function getResource(id) {
  return resources.find(function (resource) { return resource.id === id; });
}

// A resource is available in a city when it serves the whole
// county, has a location in that city, or (when the source does
// not state a service area and there is no physical location)
// may serve it — those show a "call to confirm" note.
function servesCity(resource, city) {
  if (!city || city === "all") return true;
  if (resource.area === "countywide") return true;
  if (resource.locations.some(function (location) { return location.city === city; })) return true;
  return resource.area === "unstated" && resource.locations.length === 0;
}

// All map-ready locations, one entry per physical place.
function allLocations() {
  const list = [];
  resources.forEach(function (resource) {
    resource.locations.forEach(function (location) {
      if (typeof location.lat === "number") list.push({ resource: resource, location: location });
    });
  });
  return list;
}

// Events whose end time has not passed yet, soonest first.
function upcomingEvents() {
  const now = new Date();
  return events
    .filter(function (event) { return new Date(event.end) > now; })
    .sort(function (a, b) { return new Date(a.start) - new Date(b.start); });
}


/* ---------- 8. Shared pieces of HTML ---------- */
// Short "where" text for a card: all of Pinellas, or the cities it is in
function areaText(resource) {
  if (resource.area === "countywide") return "All of Pinellas";
  const cityNames = resource.locations.map(function (l) { return l.city; })
    .filter(function (c, i, all) { return all.indexOf(c) === i; });
  return cityNames.length ? cityNames.join(", ") : "Call to confirm area";
}

function saveButton(resource) {
  const saved = isFavorite(resource.id);
  return `<button class="save-button" type="button" data-id="${resource.id}" aria-pressed="${saved}" aria-label="Save ${resource.name}">${icon("heart")}</button>`;
}

function createResourceCard(resource) {
  const category = getCategory(resource.categories[0]);
  return `
    <article class="card">
      <div class="card-top">
        <span class="card-cat">${icon(category.icon)} ${category.short}</span>
        ${saveButton(resource)}
      </div>
      <h3>${resource.name}</h3>
      <p class="card-place">${icon("pin")} ${areaText(resource)}</p>
      <p class="card-text">${resource.description}</p>
      <p class="print-only">${resource.phones.map(function (p) { return p.number; }).join(" · ")} · ${resource.locations.map(function (l) { return l.address; }).join(" · ")} · ${resource.website}</p>
      <div class="card-foot">
        <button class="text-button details-button" type="button" data-id="${resource.id}">
          Details<span class="visually-hidden"> for ${resource.name}</span> ${icon("arrow")}
        </button>
        ${resource.urgent ? '<span class="badge badge-urgent">24/7</span>' : ""}
      </div>
    </article>`;
}

function eventDateParts(event) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const zone = { timeZone: "America/New_York" };
  return {
    month: start.toLocaleDateString("en-US", Object.assign({ month: "short" }, zone)),
    day: start.toLocaleDateString("en-US", Object.assign({ day: "numeric" }, zone)),
    full: start.toLocaleDateString("en-US", Object.assign({ weekday: "long", month: "long", day: "numeric" }, zone)),
    time: start.toLocaleTimeString("en-US", Object.assign({ hour: "numeric", minute: "2-digit" }, zone)) +
      "–" + end.toLocaleTimeString("en-US", Object.assign({ hour: "numeric", minute: "2-digit" }, zone))
  };
}

function createEventCard(event) {
  const date = eventDateParts(event);
  return `
    <article class="event-card">
      <div class="event-date" aria-hidden="true">
        <span class="event-month">${date.month}</span>
        <span class="event-day">${date.day}</span>
      </div>
      <div>
        <span class="badge">${event.type}</span>
        <h3>${event.title}</h3>
        <p class="event-meta">${icon("calendar")} <span>${date.full} · ${date.time}</span></p>
        <p class="event-meta">${icon("pin")} <span>${event.location}, ${event.address}</span></p>
        <p class="event-desc">${event.description}</p>
        <p class="event-links">
          <span>${event.organizer} · ${event.cost}</span>
          <a href="${event.source}" target="_blank" rel="noopener">Official listing<span class="visually-hidden"> (opens in a new tab)</span></a>
          <a href="${directionsURL(event.address)}" target="_blank" rel="noopener">Directions<span class="visually-hidden"> (opens in a new tab)</span></a>
        </p>
      </div>
    </article>`;
}

function eventsEmptyState() {
  return `
    <div class="empty-state">
      ${icon("calendar")}
      <h3>No upcoming events listed</h3>
      <p>We only list verified events and remove them once they end. Check an official calendar below.</p>
    </div>`;
}


/* ---------- 9. Resource details pop-up ---------- */
function openDetails(id) {
  const resource = getResource(id);
  if (!resource) return;
  const dialog = document.getElementById("details-dialog");

  const categoryTags = resource.categories.map(function (catId) {
    const c = getCategory(catId);
    return `<span class="tag" style="--cat:${c.color}">${c.name}</span>`;
  }).join("");

  const phones = resource.phones.map(function (p) {
    const href = p.sms ? "sms:" + p.number : telHref(p.number);
    return `<li><a href="${href}">${p.number}</a> <span class="muted">· ${p.label}</span></li>`;
  }).join("");

  const locations = resource.locations.length
    ? resource.locations.map(function (l) {
        return `<li><strong>${l.label}</strong><br>${l.address}
          ${l.hours ? `<br><span class="muted">${l.hours}</span>` : ""}
          ${l.phone ? `<br><a href="${telHref(l.phone)}">${l.phone}</a>` : ""}
          <br><a href="${directionsURL(l.address)}" target="_blank" rel="noopener">Get directions<span class="visually-hidden"> (opens in a new tab)</span></a></li>`;
      }).join("")
    : "<li>No public walk-in location listed. Contact by phone or online.</li>";

  const extraLinks = (resource.links || []).map(function (link) {
    return `<li><a href="${link.url}" target="_blank" rel="noopener">${link.label}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`;
  }).join("");

  document.getElementById("dialog-content").innerHTML = `
    <div class="dialog-tags">${resource.categories.map(function (c) { return `<span class="badge">${getCategory(c).short}</span>`; }).join("")}${resource.urgent ? '<span class="badge badge-urgent">24/7 crisis line</span>' : ""}</div>
    <h2 id="dialog-title">${resource.name}</h2>
    <p class="dialog-lead">${resource.description}</p>
    <dl class="details-list">
      <dt>Phone</dt>       <dd><ul>${phones}</ul></dd>
      <dt>Locations</dt>   <dd><ul>${locations}</ul></dd>
      <dt>Hours</dt>       <dd>${resource.hours}</dd>
      <dt>Eligibility</dt> <dd>${resource.eligibility}</dd>
      <dt>Cost</dt>        <dd>${resource.cost}</dd>
      <dt>Service area</dt><dd>${resource.area === "countywide" ? "All of Pinellas County" : "Not stated by the organization. Call to confirm."}${resource.areaNote ? `<br><span class="muted">${resource.areaNote}</span>` : ""}</dd>
      <dt>Links</dt>       <dd><ul><li><a href="${resource.website}" target="_blank" rel="noopener">Official website<span class="visually-hidden"> (opens in a new tab)</span></a></li>${extraLinks}</ul></dd>
    </dl>
    <div class="dialog-actions">${saveButton(resource)} <span class="muted">Save to your list</span></div>
    <p class="dialog-verified">${icon("check")} <span>Verified ${formatVerified(resource.verified)} against the <a href="${resource.source}" target="_blank" rel="noopener">official source</a>. Confirm before you go.</span></p>
    <div class="helpful">
      <span id="helpful-question">Was this helpful?</span>
      <button class="button button-small button-secondary" type="button" data-helpful="yes">Yes</button>
      <button class="button button-small button-secondary" type="button" data-helpful="no">No</button>
    </div>`;

  dialog.showModal();
  trackEvent("detailViews");
}

function setupDialog() {
  const dialog = document.getElementById("details-dialog");
  if (!dialog) return;

  document.getElementById("close-dialog").addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close(); // click on the backdrop
    const answer = event.target.closest("[data-helpful]");
    if (!answer) return;
    trackEvent(answer.dataset.helpful === "yes" ? "helpfulYes" : "helpfulNo");
    answer.parentElement.innerHTML = "<span role='status'>Thanks for the feedback.</span>";
  });
}


/* ---------- 10. Card buttons (event delegation) ---------- */
document.addEventListener("click", function (event) {
  const detailsButton = event.target.closest(".details-button");
  const saveButton = event.target.closest(".save-button");

  if (event.target.closest("a[href^='tel:']")) trackEvent("phoneTaps");

  if (detailsButton) openDetails(detailsButton.dataset.id);

  if (saveButton) {
    const id = saveButton.dataset.id;
    toggleFavorite(id);
    const saved = isFavorite(id);
    document.querySelectorAll('.save-button[data-id="' + id + '"]').forEach(function (button) {
      button.setAttribute("aria-pressed", saved);
    });
    if (typeof onFavoritesChanged === "function") onFavoritesChanged();
  }
});


/* ---------- 11. Gentle reveal-on-scroll animation ---------- */
// Sections with class "reveal" fade up as they enter the screen.
// Skipped entirely for people who prefer reduced motion.
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (item) { item.classList.add("is-visible"); });
    return;
  }
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach(function (item) { observer.observe(item); });
}


/* ---------- 12. Fill in shared select menus ---------- */
// Any <select data-fill="cities"> or data-fill="categories"
function fillSelects() {
  document.querySelectorAll("select[data-fill='cities']").forEach(function (select) {
    cities.forEach(function (city) { select.add(new Option(city, city)); });
  });
  document.querySelectorAll("select[data-fill='categories']").forEach(function (select) {
    categories.forEach(function (c) { select.add(new Option(c.name, c.id)); });
  });
}


/* ---------- 13. Run the shared setup on every page ---------- */
fillStaticIcons();
fillSelects();
setupMenu();
markCurrentPage();
setupTextSize();
setupDialog();
updateSavedCount();
setupReveal();
document.querySelectorAll(".js-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });
document.querySelectorAll(".js-verified").forEach(function (el) { el.textContent = formatVerified(LAST_VERIFIED); });
