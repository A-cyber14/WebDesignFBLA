/* =========================================================
   saved.js — Shows the resources the user has saved.
   ========================================================= */

const savedList = document.getElementById("saved-list");
const emptyMessage = document.getElementById("empty-saved");
const savedTools = document.getElementById("saved-tools");

function showSaved() {
  const favorites = getFavorites();

  let html = "";
  favorites.forEach(function (id) {
    const resource = getResource(id);
    if (resource) html += createResourceCard(resource);
  });
  savedList.innerHTML = html;

  // Show the "nothing saved yet" message if the list is empty
  emptyMessage.hidden = favorites.length > 0;
  savedTools.hidden = favorites.length === 0;
}

// main.js calls this after a Save button is clicked,
// so un-saving a card removes it from this page right away.
function onFavoritesChanged() {
  showSaved();
}

// Print button: opens the browser's print window.
// styles.css hides the menu and buttons when printing.
document.getElementById("print-button").addEventListener("click", function () {
  trackEvent("listsPrinted");
  window.print();
});

document.getElementById("clear-button").addEventListener("click", function () {
  if (confirm("Remove all saved resources?")) {
    localStorage.removeItem("favorites");
    updateSavedCount();
    showSaved();
  }
});

showSaved();
