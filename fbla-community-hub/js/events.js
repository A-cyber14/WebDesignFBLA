/* =========================================================
   events.js — Filters for the Community Events page.
   ========================================================= */

const typeSelect = document.getElementById("event-type");
const timeSelect = document.getElementById("event-time");
const eventList = document.getElementById("event-list");
const eventCount = document.getElementById("event-count");
const noEvents = document.getElementById("no-events");

// Fill the "Event type" drop-down with each type used in data.js
const eventTypes = [];
events.forEach(function (event) {
  if (!eventTypes.includes(event.type)) eventTypes.push(event.type);
});
eventTypes.sort().forEach(function (type) {
  typeSelect.innerHTML += `<option value="${type}">${type}</option>`;
});

// Shows only the events that match both drop-downs
function showEvents() {
  const type = typeSelect.value;
  const maxDays = Number(timeSelect.value); // 7, 30, or 365

  const matches = events.filter(function (event) {
    const matchesType = type === "all" || event.type === type;
    const matchesTime = event.daysFromToday <= maxDays;
    return matchesType && matchesTime;
  });

  let html = "";
  matches.forEach(function (event) {
    html += createEventCard(event);
  });
  eventList.innerHTML = html;

  eventCount.textContent = `Showing ${matches.length} upcoming events`;
  noEvents.hidden = matches.length > 0;
}

typeSelect.addEventListener("change", function () { trackEvent("filtersUsed"); showEvents(); });
timeSelect.addEventListener("change", function () { trackEvent("filtersUsed"); showEvents(); });

showEvents();
