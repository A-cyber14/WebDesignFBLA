/* emergency.js: shows the directory's emergency listings */
document.getElementById("emergency-list").innerHTML = resources
  .filter(function (r) { return r.categories.includes("emergency"); })
  .map(createResourceCard).join("");
