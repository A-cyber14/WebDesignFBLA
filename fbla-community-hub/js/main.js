/* =========================================================
   main.js
   Code shared by every page. It loads after data.js and
   before each page's own script.
   ========================================================= */

// Lets the CSS know JavaScript is running
document.documentElement.classList.add("js");


/* ---------- 1. Saving to the browser ---------- */
// localStorage can be turned off in some browsers, so we use
// try/catch. If it fails, the site still works but won't remember.
function storageGet(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) {
      return fallback;
    }
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Storage is off, so we just skip saving.
  }
}


/* ---------- 2. Icons ---------- */
// Simple line icons drawn for this site
const ICONS = {
  food: '<path d="M4 11h16a8 8 0 0 1-16 0Z"/><path d="M9 7c0-1.5 1.5-1.5 1.5-3M13.5 7c0-1.5 1.5-1.5 1.5-3"/>',
  housing: '<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5.5h4V20"/>',
  health: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M12 8v8M8 12h8"/>',
  jobs: '<rect x="3" y="7" width="18" height="13" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"/>',
  education: '<path d="M2.5 9 12 4.5 21.5 9 12 13.5Z"/><path d="M6.5 11v4.5c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11M21.5 9v5"/>',
  seniors: '<circle cx="11" cy="5" r="2.2"/><path d="M11 8v6l-2.5 6.5M11 14l3 6.5M8 10.5l3-2 3 2.5 2 0"/><path d="M17.5 12v8.5"/>',
  transportation: '<rect x="4.5" y="3" width="15" height="14" rx="3"/><path d="M4.5 10.5h15M8 20.5V17M16 20.5V17"/>',
  disability: '<circle cx="12" cy="4.5" r="2"/><path d="M5 8.5l7 1.2 7-1.2M12 9.7v4.8M8.8 21l3.2-6.5 3.2 6.5"/>',
  family: '<circle cx="8" cy="6" r="2.4"/><circle cx="16.5" cy="8" r="1.9"/><path d="M3.5 20v-3.5A4.5 4.5 0 0 1 12.5 16.5V20M13 20v-3a3.5 3.5 0 0 1 7 0v3"/>',
  emergency: '<path d="M12 3.5 21.5 20h-19Z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  financial: '<circle cx="12" cy="12" r="9"/><path d="M14.8 9.4c0-1.3-1.2-2.2-2.8-2.2s-2.8.9-2.8 2.1c0 2.9 5.6 1.6 5.6 4.6 0 1.3-1.2 2.4-2.8 2.4s-2.8-1-2.8-2.3M12 5.8v1.4M12 16.3v1.6"/>',
  veterans: '<path d="m12 3.5 2.5 5.3 5.8.6-4.3 4 1.2 5.7L12 16.2l-5.2 2.9L8 13.4l-4.3-4 5.8-.6Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  bookmark: '<path d="M6.5 3.5h11v17l-5.5-4.2-5.5 4.2Z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>'
};

// Returns the HTML for one icon
function icon(name) {
  return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + ICONS[name] + '</svg>';
}

// Fills in every <span data-icon="name"></span> in the HTML
function fillStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach(function (element) {
    element.innerHTML = icon(element.dataset.icon);
  });
}


/* ---------- 3. Small helpers ---------- */
// Makes text safe to put inside HTML (used for anything a user typed)
function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "(727) 555-0101" becomes "tel:7275550101"
function telHref(number) {
  return "tel:" + number.replace(/[^0-9]/g, "");
}

// Google Maps directions to a map pin
function directionsURL(location) {
  return "https://www.google.com/maps/dir/?api=1&destination=" + location.lat + "," + location.lng;
}

// Shows a short message at the bottom of the screen, like "Saved ...".
// It has role="status", so screen readers read it out loud too.
let toastTimer = null;

function announce(message, linkHTML) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.innerHTML = escapeHTML(message) + (linkHTML || "");
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 4000);
}


/* ---------- 4. Menu, accessibility panel, current page ---------- */
// The menu drawer and the accessibility panel are <dialog> elements.
// The browser keeps keyboard focus inside them and closes them with Escape.
// When one closes, we move focus back to the button that opened it.
function setupPanel(buttonId, dialogId) {
  const button = document.getElementById(buttonId);
  const dialog = document.getElementById(dialogId);
  if (!button || !dialog) {
    return;
  }

  button.addEventListener("click", function () {
    dialog.showModal();
    button.setAttribute("aria-expanded", "true");
  });

  dialog.addEventListener("close", function () {
    button.setAttribute("aria-expanded", "false");
    button.focus();
  });

  // Close when clicking the dark area outside, or any "close" button inside
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.closest("[data-close-dialog]")) {
      dialog.close();
    }
  });
}

// Each accessibility setting is a class on the <html> tag
const A11Y_SETTINGS = ["large-text", "high-contrast", "reading-highlight", "reading-spacing"];

function applyA11ySettings(settings) {
  A11Y_SETTINGS.forEach(function (name) {
    const isOn = settings[name] === true;
    document.documentElement.classList.toggle(name, isOn);

    const checkbox = document.querySelector('[data-pref="' + name + '"]');
    if (checkbox) {
      checkbox.checked = isOn;
    }
  });
}

function setupA11yPanel() {
  applyA11ySettings(storageGet("a11yPrefs", {}));

  document.querySelectorAll("[data-pref]").forEach(function (checkbox) {
    checkbox.addEventListener("change", function () {
      const settings = storageGet("a11yPrefs", {});
      settings[checkbox.dataset.pref] = checkbox.checked;
      storageSet("a11yPrefs", settings);
      applyA11ySettings(settings);
    });
  });

  const resetButton = document.getElementById("a11y-reset");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      storageSet("a11yPrefs", {});
      applyA11ySettings({});
      announce("Accessibility settings reset.");
    });
  }
}

// Underlines the link for the page you are on
function markCurrentPage() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .saved-link, #menu-drawer a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.setAttribute("aria-current", "page");
    }
  });
}


/* ---------- 5. Saved resources ---------- */
// Saved resources are stored as a list of ids, like ["harbor-table-pantry"]
function getFavorites() {
  const saved = storageGet("favorites", []);
  if (!Array.isArray(saved)) {
    return [];
  }
  // Skip ids that no longer exist in data.js
  return saved.filter(function (id) {
    return getResource(id) !== undefined;
  });
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(function (savedId) {
      return savedId !== id;
    });
  } else {
    favorites.push(id);
    trackEvent("favoritesAdded");
  }
  storageSet("favorites", favorites);
  updateSavedCount();
}

// The little number next to "Saved" in the header
function updateSavedCount() {
  const badge = document.getElementById("saved-count");
  if (!badge) {
    return;
  }
  const count = getFavorites().length;
  badge.textContent = count;
  badge.hidden = count === 0;
}


/* ---------- 6. Success metrics ---------- */
// Counts actions in this browser (shown on the About page).
// A real site would use an analytics tool instead.
function trackEvent(name) {
  const metrics = storageGet("metrics", {});
  metrics[name] = (metrics[name] || 0) + 1;
  storageSet("metrics", metrics);
}

// "Time to resource": seconds from opening the site to the first
// time someone opens a resource's details.
function recordTimeToResource() {
  try {
    if (sessionStorage.getItem("resourceFound")) {
      return;
    }
    sessionStorage.setItem("resourceFound", "yes");

    const start = Number(sessionStorage.getItem("sessionStart"));
    const seconds = Math.round((Date.now() - start) / 1000);

    const metrics = storageGet("metrics", {});
    metrics.timeToResource = (metrics.timeToResource || []).concat(seconds);
    storageSet("metrics", metrics);
  } catch (error) {
    // Storage is off, so we skip this measurement.
  }
}

try {
  if (!sessionStorage.getItem("sessionStart")) {
    sessionStorage.setItem("sessionStart", String(Date.now()));
  }
} catch (error) {
  // Storage is off.
}


/* ---------- 7. Looking things up in data.js ---------- */
function getCategory(categoryId) {
  return categories.find(function (category) {
    return category.id === categoryId;
  });
}

function getResource(id) {
  return resources.find(function (resource) {
    return resource.id === id;
  });
}

// A resource shows up for a city if it serves the whole county
// or has a location in that city.
function servesCity(resource, city) {
  if (city === "all" || resource.area === "countywide") {
    return true;
  }
  return resource.locations.some(function (location) {
    return location.city === city;
  });
}

// Every location that has map coordinates
function allLocations() {
  const list = [];
  resources.forEach(function (resource) {
    resource.locations.forEach(function (location) {
      list.push({ resource: resource, location: location });
    });
  });
  return list;
}

function isPastEvent(event) {
  return new Date(event.end) <= new Date();
}

// Events that haven't ended yet, soonest first
function upcomingEvents() {
  return events
    .filter(function (event) {
      return !isPastEvent(event);
    })
    .sort(function (a, b) {
      return new Date(a.start) - new Date(b.start);
    });
}


/* ---------- 8. Building the HTML for resources and events ---------- */
// "All of Pinellas", or the city names where it has locations
function areaText(resource) {
  if (resource.area === "countywide") {
    return "All of Pinellas";
  }
  const cityNames = [];
  resource.locations.forEach(function (location) {
    if (!cityNames.includes(location.city)) {
      cityNames.push(location.city);
    }
  });
  return cityNames.join(", ");
}

function saveButton(resource) {
  const saved = isFavorite(resource.id);
  return `<button class="save-button" type="button" data-id="${resource.id}" aria-pressed="${saved}" aria-label="Save ${resource.name}">${icon("bookmark")}</button>`;
}

// One row in a list of resources
function createResourceCard(resource) {
  const category = getCategory(resource.categories[0]);
  const phoneNumbers = resource.phones.map(function (phone) {
    return phone.number;
  });

  return `
    <article class="resource">
      <div class="resource-info">
        <p class="resource-meta">${category.short} · ${areaText(resource)}</p>
        <h3>${resource.name}</h3>
        <p class="resource-text">${resource.description}</p>
        <p class="print-only">${phoneNumbers.join(" · ")}</p>
      </div>
      <div class="resource-actions">
        ${saveButton(resource)}
        <button class="button button-small button-secondary details-button" type="button" data-id="${resource.id}">
          Details<span class="visually-hidden"> for ${resource.name}</span>
        </button>
      </div>
    </article>`;
}

// Turns "9:00 AM" into "9 a.m." so event times match listing hours
function shortTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" })
    .replace(":00", "")
    .replace("AM", "a.m.")
    .replace("PM", "p.m.");
}

// The pieces of an event's date that we show on the page
function eventDateParts(event) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    month: start.toLocaleDateString("en-US", { month: "short", timeZone: "America/New_York" }),
    day: start.toLocaleDateString("en-US", { day: "numeric", timeZone: "America/New_York" }),
    full: start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "America/New_York" }),
    time: shortTime(start) + "–" + shortTime(end)
  };
}

// One row on the Events page. The title is a button that stretches
// over the whole row, so clicking anywhere on the row opens the details.
function createEventCard(event) {
  const date = eventDateParts(event);
  const past = isPastEvent(event);

  let rowClass = "event-card";
  let endedBadge = "";
  let hiddenText = ", view details";
  if (past) {
    rowClass = "event-card is-past";
    endedBadge = ' <span class="badge badge-demo">Ended</span>';
    hiddenText = ", past event, view details";
  }

  return `
    <article class="${rowClass}">
      <div class="event-date" aria-hidden="true">
        <span class="event-day">${date.day}</span>
        <span class="event-month">${date.month}</span>
      </div>
      <div>
        <span class="badge">${event.type}</span>${endedBadge}
        <h3><button class="event-open" type="button" data-event="${event.id}">${event.title}<span class="visually-hidden">${hiddenText}</span></button></h3>
        <p class="event-meta">${icon("calendar")} <span>${date.full} · ${date.time}</span></p>
        <p class="event-meta">${icon("pin")} <span>${event.location}, ${event.city}</span></p>
      </div>
    </article>`;
}

function eventsEmptyState() {
  return `
    <div class="empty-state">
      ${icon("calendar")}
      <h3>No Upcoming Events Listed</h3>
      <p>Events are removed once they end. Check back soon.</p>
    </div>`;
}


/* ---------- 9. The details pop-up ---------- */
// We remember which button opened the pop-up so we can move
// keyboard focus back to it when the pop-up closes.
let detailsOpener = null;

function showDetailsDialog(opener) {
  detailsOpener = opener;
  document.getElementById("details-dialog").showModal();
}

// Details for one resource
function openDetails(id, opener) {
  const resource = getResource(id);

  const categoryBadges = resource.categories.map(function (categoryId) {
    return `<span class="badge">${getCategory(categoryId).short}</span>`;
  }).join("");

  const phones = resource.phones.map(function (phone) {
    return `<li><a href="${telHref(phone.number)}">${phone.number}</a> <span class="muted">· ${phone.label}</span></li>`;
  }).join("");

  let locations = "<li>No walk-in location. Contact them by phone.</li>";
  if (resource.locations.length > 0) {
    locations = resource.locations.map(function (location) {
      return `<li><strong>${location.label}</strong><br>${location.address}
        <br><a href="${directionsURL(location)}" target="_blank" rel="noopener">Get Directions<span class="visually-hidden"> (opens in a new tab)</span></a></li>`;
    }).join("");
  }

  let serviceArea = "Local area";
  if (resource.area === "countywide") {
    serviceArea = "All of Pinellas County";
  }
  if (resource.areaNote) {
    serviceArea += `<br><span class="muted">${resource.areaNote}</span>`;
  }

  document.getElementById("dialog-content").innerHTML = `
    <div class="dialog-tags">${categoryBadges}</div>
    <h2 id="dialog-title">${resource.name}</h2>
    <p class="dialog-lead">${resource.description}</p>
    <dl class="details-list">
      <dt>Phone</dt>        <dd><ul>${phones}</ul></dd>
      <dt>Locations</dt>    <dd><ul>${locations}</ul></dd>
      <dt>Hours</dt>        <dd>${resource.hours}</dd>
      <dt>Eligibility</dt>  <dd>${resource.eligibility}</dd>
      <dt>Cost</dt>         <dd>${resource.cost}</dd>
      <dt>Service Area</dt> <dd>${serviceArea}</dd>
    </dl>
    <div class="dialog-actions">${saveButton(resource)} <span class="muted">Save to Your List</span></div>
    <p class="dialog-verified">${icon("info")} <span>Hours can change, so call ahead before you go.</span></p>
    <div class="helpful">
      <span>Was this helpful?</span>
      <button class="button button-small button-secondary" type="button" data-helpful="yes">Yes</button>
      <button class="button button-small button-secondary" type="button" data-helpful="no">No</button>
    </div>`;

  showDetailsDialog(opener);
  trackEvent("detailViews");
  recordTimeToResource();
}

// Details for one event
function openEvent(id, opener) {
  const event = events.find(function (e) {
    return e.id === id;
  });
  const date = eventDateParts(event);

  let endedBadge = "";
  if (isPastEvent(event)) {
    endedBadge = '<span class="badge">This Event Has Ended</span>';
  }

  document.getElementById("dialog-content").innerHTML = `
    <div class="dialog-tags"><span class="badge">${event.type}</span>${endedBadge}</div>
    <h2 id="dialog-title">${event.title}</h2>
    <p class="dialog-lead">${event.description}</p>
    <dl class="details-list">
      <dt>Date</dt>      <dd>${date.full}</dd>
      <dt>Time</dt>      <dd>${date.time} (Eastern Time)</dd>
      <dt>Location</dt>  <dd>${event.location}<br><span class="muted">${event.city}, FL</span></dd>
      <dt>Hosted By</dt> <dd>${event.organizer}</dd>
      <dt>Cost</dt>      <dd>${event.cost}</dd>
    </dl>
    <div class="dialog-actions">
      <a class="button button-small" href="map.html?city=${encodeURIComponent(event.city)}">See ${event.city} on the Map</a>
    </div>`;

  showDetailsDialog(opener);
}

function setupDialog() {
  const dialog = document.getElementById("details-dialog");
  if (!dialog) {
    return;
  }

  document.getElementById("close-dialog").addEventListener("click", function () {
    dialog.close();
  });

  // Put keyboard focus back where it was
  dialog.addEventListener("close", function () {
    if (detailsOpener && document.contains(detailsOpener)) {
      detailsOpener.focus();
    }
  });

  dialog.addEventListener("click", function (event) {
    // Clicking the dark area outside closes the pop-up
    if (event.target === dialog) {
      dialog.close();
    }

    // "Was this helpful?" buttons
    const answer = event.target.closest("[data-helpful]");
    if (answer) {
      if (answer.dataset.helpful === "yes") {
        trackEvent("helpfulYes");
      } else {
        trackEvent("helpfulNo");
      }
      answer.parentElement.innerHTML = "<span role='status'>Thanks for the feedback.</span>";
    }
  });
}


/* ---------- 10. Buttons inside lists ---------- */
// Resource and event rows are added by JavaScript, so we listen for
// clicks on the whole page and check what was clicked.
document.addEventListener("click", function (event) {
  if (event.target.closest("a[href^='tel:']")) {
    trackEvent("phoneTaps");
  }

  const detailsButton = event.target.closest(".details-button");
  if (detailsButton) {
    openDetails(detailsButton.dataset.id, detailsButton);
  }

  const eventButton = event.target.closest(".event-open");
  if (eventButton) {
    openEvent(eventButton.dataset.event, eventButton);
  }

  const clickedSave = event.target.closest(".save-button");
  if (clickedSave) {
    const id = clickedSave.dataset.id;
    toggleFavorite(id);
    const saved = isFavorite(id);

    // Update every save button for this resource (the row and the pop-up)
    document.querySelectorAll('.save-button[data-id="' + id + '"]').forEach(function (button) {
      button.setAttribute("aria-pressed", saved);
    });

    const name = getResource(id).name;
    if (saved) {
      announce("Saved " + name + ". ", '<a href="saved.html">View Saved</a>');
    } else {
      announce("Removed " + name + ".");
    }

    // The Saved page defines this function so it can redraw its list
    if (typeof onFavoritesChanged === "function") {
      onFavoritesChanged();
    }
  }
});


/* ---------- 11. Fade-in on scroll ---------- */
// Sections with the class "reveal" fade in when you scroll to them.
// This is skipped if the device asks for reduced motion.
function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
}


/* ---------- 12. Filling in dropdown menus ---------- */
// Any <select data-fill="cities"> or <select data-fill="categories">
function fillSelects() {
  document.querySelectorAll("select[data-fill='cities']").forEach(function (select) {
    cities.forEach(function (city) {
      select.add(new Option(city, city));
    });
  });

  document.querySelectorAll("select[data-fill='categories']").forEach(function (select) {
    categories.forEach(function (category) {
      select.add(new Option(category.short, category.id));
    });
  });
}


/* ---------- 13. Run everything ---------- */
fillStaticIcons();
fillSelects();
setupPanel("menu-button", "menu-drawer");
setupPanel("a11y-button", "a11y-panel");
setupA11yPanel();
markCurrentPage();
setupDialog();
updateSavedCount();
setupReveal();

document.querySelectorAll(".js-year").forEach(function (element) {
  element.textContent = new Date().getFullYear();
});
