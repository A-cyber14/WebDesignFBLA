/* =========================================================
   about.js — Success metrics demo + the full list of data sources.
   ========================================================= */

const metricLabels = {
  searches: "Searches made",
  searchesWithNoResults: "Searches with no results",
  filtersUsed: "Filters used",
  detailViews: "Resource details opened",
  favoritesAdded: "Resources saved",
  phoneTaps: "Phone numbers tapped",
  helpfulYes: "“Helpful” votes",
  helpfulNo: "“Not helpful” votes",
  listsPrinted: "Saved lists printed",
  feedbackSent: "Contact forms sent"
};

function showMetrics() {
  const metrics = storageGet("metrics", {});
  let rows = "";
  for (const key in metricLabels) {
    rows += `<tr><th scope="row">${metricLabels[key]}</th><td>${metrics[key] || 0}</td></tr>`;
  }
  document.getElementById("metrics-body").innerHTML = rows;

  const searches = metrics.searches || 0;
  const votes = (metrics.helpfulYes || 0) + (metrics.helpfulNo || 0);
  document.getElementById("zero-rate").textContent =
    searches ? Math.round((metrics.searchesWithNoResults || 0) / searches * 100) + "%" : "—";
  document.getElementById("helpful-rate").textContent =
    votes ? Math.round((metrics.helpfulYes || 0) / votes * 100) + "%" : "—";
}

document.getElementById("reset-metrics").addEventListener("click", function () {
  storageSet("metrics", {});
  showMetrics();
});

showMetrics();


// Data sources: one row per listing, built from data.js so it can never drift
document.getElementById("data-sources").innerHTML = resources
  .slice()
  .sort(function (a, b) { return a.name.localeCompare(b.name); })
  .map(function (r) {
    return `<tr><th scope="row">${r.name}</th>
      <td><a href="${r.source}" target="_blank" rel="noopener">${r.source.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></td>
      <td>${formatVerified(r.verified)}</td></tr>`;
  }).join("");

document.getElementById("event-sources").innerHTML = events
  .map(function (e) {
    return `<tr><th scope="row">${e.title}</th>
      <td><a href="${e.source}" target="_blank" rel="noopener">${e.organizer}</a></td>
      <td>${formatVerified(LAST_VERIFIED)}</td></tr>`;
  }).join("");
