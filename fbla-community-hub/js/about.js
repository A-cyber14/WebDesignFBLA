/* =========================================================
   about.js — Shows the success metrics collected by trackEvent().
   ========================================================= */

// The metrics we track, with a plain-English label for each
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
  const metrics = JSON.parse(localStorage.getItem("metrics") || "{}");
  let rows = "";

  for (const key in metricLabels) {
    rows += `<tr><th scope="row">${metricLabels[key]}</th><td>${metrics[key] || 0}</td></tr>`;
  }
  document.getElementById("metrics-body").innerHTML = rows;

  // Two calculated rates (shown as percentages)
  const searches = metrics.searches || 0;
  const votes = (metrics.helpfulYes || 0) + (metrics.helpfulNo || 0);

  document.getElementById("zero-rate").textContent =
    searches ? Math.round((metrics.searchesWithNoResults || 0) / searches * 100) + "%" : "—";
  document.getElementById("helpful-rate").textContent =
    votes ? Math.round((metrics.helpfulYes || 0) / votes * 100) + "%" : "—";
}

document.getElementById("reset-metrics").addEventListener("click", function () {
  localStorage.removeItem("metrics");
  showMetrics();
});

showMetrics();
