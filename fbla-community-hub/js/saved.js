/* =========================================================
   saved.js: shows the resources the user has saved.
   ========================================================= */

const savedList = document.getElementById("saved-list");
const emptyMessage = document.getElementById("empty-saved");
const savedTools = document.getElementById("saved-tools");

function showSaved() {
  const favorites = getFavorites();
  savedList.innerHTML = favorites.map(getResource).map(createResourceCard).join("");
  emptyMessage.hidden = favorites.length > 0;
  savedTools.hidden = favorites.length === 0;
  document.getElementById("saved-total").textContent = favorites.length + (favorites.length === 1 ? " resource" : " resources");
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
