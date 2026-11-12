/* =========================================================
   about.js
   Shows the success metrics counted in this browser
   (in "Live counts from this browser" on the About page).
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

// Turns 3 out of 10 into "30%". Shows a dash if there's nothing to count.
function percent(part, total) {
  if (total === 0) {
    return "—";
  }
  return Math.round(part / total * 100) + "%";
}

function showMetrics() {
  const metrics = storageGet("metrics", {});

  // The table of counts
  let rows = "";
  for (const key in metricLabels) {
    rows += `<tr><th scope="row">${metricLabels[key]}</th><td>${metrics[key] || 0}</td></tr>`;
  }
  document.getElementById("metrics-body").innerHTML = rows;

  // Zero-result rate and helpful rating
  const searches = metrics.searches || 0;
  const noResults = metrics.searchesWithNoResults || 0;
  const yesVotes = metrics.helpfulYes || 0;
  const allVotes = yesVotes + (metrics.helpfulNo || 0);
  document.getElementById("zero-rate").textContent = percent(noResults, searches);
  document.getElementById("helpful-rate").textContent = percent(yesVotes, allVotes);

  // Median (middle) time to resource
  const times = (metrics.timeToResource || []).slice();
  times.sort(function (a, b) {
    return a - b;
  });
  if (times.length === 0) {
    document.getElementById("time-to-resource").textContent = "—";
  } else {
    const middle = times[Math.floor(times.length / 2)];
    document.getElementById("time-to-resource").textContent = middle + " s (" + times.length + " sessions)";
  }
}

document.getElementById("reset-metrics").addEventListener("click", function () {
  storageSet("metrics", {});
  showMetrics();
});

showMetrics();
