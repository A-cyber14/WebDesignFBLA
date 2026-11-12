/* =========================================================
   events.js
   The Events page. Upcoming events are grouped by month.
   Events that have ended move to "Past events."
   ========================================================= */

const typeSelect = document.getElementById("event-type");
const eventCitySelect = document.getElementById("event-city");
const eventList = document.getElementById("event-list");
const eventCount = document.getElementById("event-count");
const noEvents = document.getElementById("no-events");
const pastBox = document.getElementById("past-events");
const pastList = document.getElementById("past-list");

const upcoming = upcomingEvents();

// Past events, most recent first
const past = events.filter(isPastEvent);
past.sort(function (a, b) {
  return new Date(b.start) - new Date(a.start);
});

// Fill the "Type" dropdown with each event type once, A to Z
const types = [];
events.forEach(function (event) {
  if (!types.includes(event.type)) {
    types.push(event.type);
  }
});
types.sort();
types.forEach(function (type) {
  typeSelect.add(new Option(type, type));
});


function matchesFilters(event) {
  const typeOK = typeSelect.value === "all" || event.type === typeSelect.value;
  const cityOK = eventCitySelect.value === "all" || event.city === eventCitySelect.value;
  return typeOK && cityOK;
}

// "November 2026" for an event
function monthName(event) {
  return new Date(event.start).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" });
}

function showEvents() {
  const matches = upcoming.filter(matchesFilters);
  const pastMatches = past.filter(matchesFilters);

  // Upcoming events, with a heading each time the month changes
  let html = "";
  let currentMonth = "";
  matches.forEach(function (event) {
    const month = monthName(event);
    if (month !== currentMonth) {
      if (currentMonth !== "") {
        html += "</div></section>";
      }
      html += `<section class="month-group" aria-label="${month}"><h2>${month}</h2><div class="event-list">`;
      currentMonth = month;
    }
    html += createEventCard(event);
  });
  if (currentMonth !== "") {
    html += "</div></section>";
  }
  eventList.innerHTML = html;

  if (matches.length === 1) {
    eventCount.textContent = "1 upcoming event";
  } else {
    eventCount.textContent = matches.length + " upcoming events";
  }

  // Messages for when nothing shows up
  if (upcoming.length === 0) {
    noEvents.innerHTML = eventsEmptyState();
    noEvents.hidden = false;
  } else if (matches.length === 0) {
    noEvents.innerHTML = `<div class="empty-state">${icon("calendar")}<h3>No Upcoming Events Match</h3><p>Try another type or city, or check past events.</p></div>`;
    noEvents.hidden = false;
  } else {
    noEvents.hidden = true;
  }

  // Past events
  if (pastMatches.length > 0) {
    let pastHTML = "";
    pastMatches.forEach(function (event) {
      pastHTML += createEventCard(event);
    });
    pastList.innerHTML = '<div class="event-list">' + pastHTML + "</div>";
  } else {
    pastList.innerHTML = '<p class="muted">No past events match these filters.</p>';
  }
  document.getElementById("past-count").textContent = pastMatches.length;
  pastBox.hidden = past.length === 0;
}

typeSelect.addEventListener("change", function () {
  trackEvent("filtersUsed");
  showEvents();
});

eventCitySelect.addEventListener("change", function () {
  trackEvent("filtersUsed");
  showEvents();
});

showEvents();
