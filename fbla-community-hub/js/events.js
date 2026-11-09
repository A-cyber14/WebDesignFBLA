/* =========================================================
   events.js — Filters for the Community Events page.
   Only events whose end time is still in the future are shown.
   ========================================================= */

const typeSelect = document.getElementById("event-type");
const eventCitySelect = document.getElementById("event-city");
const eventList = document.getElementById("event-list");
const eventCount = document.getElementById("event-count");
const noEvents = document.getElementById("no-events");

const upcoming = upcomingEvents();

// Fill "Event type" with the types that are actually upcoming
upcoming.map(function (e) { return e.type; })
  .filter(function (type, i, all) { return all.indexOf(type) === i; })
  .sort()
  .forEach(function (type) { typeSelect.add(new Option(type, type)); });

function showEvents() {
  const type = typeSelect.value;
  const city = eventCitySelect.value;

  const matches = upcoming.filter(function (event) {
    return (type === "all" || event.type === type) && (city === "all" || event.city === city);
  });

  eventList.innerHTML = matches.map(createEventCard).join("");
  eventCount.textContent = upcoming.length
    ? `Showing ${matches.length} of ${upcoming.length} upcoming verified events`
    : "";

  if (upcoming.length === 0) {
    noEvents.innerHTML = eventsEmptyState();
    noEvents.hidden = false;
  } else if (matches.length === 0) {
    noEvents.innerHTML = `<div class="empty-state"><span class="empty-icon">${icon("calendar")}</span>
      <h3>No events match these filters</h3><p>Try “All types” or “All of Pinellas,” or check the official calendars below.</p></div>`;
    noEvents.hidden = false;
  } else {
    noEvents.hidden = true;
  }
}

typeSelect.addEventListener("change", function () { trackEvent("filtersUsed"); showEvents(); });
eventCitySelect.addEventListener("change", function () { trackEvent("filtersUsed"); showEvents(); });

// Official calendars (always shown at the bottom of the page)
document.getElementById("official-calendars").innerHTML = eventSources.map(function (s) {
  return `<li><a href="${s.url}" target="_blank" rel="noopener">${s.name}<span class="visually-hidden"> (opens in a new tab)</span></a> — ${s.note}</li>`;
}).join("");

showEvents();
