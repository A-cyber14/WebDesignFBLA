/* =========================================================
   saved.js
   The Saved page: shows the resources you saved.
   ========================================================= */

const savedList = document.getElementById("saved-list");
const emptyMessage = document.getElementById("empty-saved");
const savedTools = document.getElementById("saved-tools");

function showSaved() {
  const favorites = getFavorites();

  let html = "";
  favorites.forEach(function (id) {
    html += createResourceCard(getResource(id), "h2");
  });
  savedList.innerHTML = html;

  emptyMessage.hidden = favorites.length > 0;
  savedTools.hidden = favorites.length === 0;

  if (favorites.length === 1) {
    document.getElementById("saved-total").textContent = "1 saved sample resource";
  } else {
    document.getElementById("saved-total").textContent = favorites.length + " saved sample resources";
  }
}

// main.js calls this after a Save button is clicked
function onFavoritesChanged() {
  showSaved();
}

document.getElementById("print-button").addEventListener("click", function () {
  trackEvent("listsPrinted");
  window.print();
});

document.getElementById("clear-button").addEventListener("click", function () {
  if (confirm("Remove all saved resources?")) {
    storageSet("favorites", []);
    updateSavedCount();
    showSaved();
  }
});

showSaved();
