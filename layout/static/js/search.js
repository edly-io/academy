const no_filter = "all";

function applySearchFilters() {
  for (let card of document.getElementsByClassName("card")) {
    let visible = true;
    if (categoriesFilterValue != no_filter && categoriesFilterValue != card.getAttribute("attr-category")) {
      visible = false;
    }
    if (resourceTypeFilterValue != no_filter && resourceTypeFilterValue != card.getAttribute("attr-resource-type")) {
      visible = false;
    }
    card.style.display = visible ? "flex" : "none";
  }
}

//function to display the tutorials blogs
function displayTutorials(tutorialsData) {
  const tutorials = document.getElementById("tutorials");
  for (let i in tutorialsData) {
    let div = document.createElement("div");
    div.className = "detail-box";
    div.innerHTML =
      "<h2 class='tutorial-title'>" +
      tutorialsData[i].title +
      "</h2><div class='tutorial-description'>" +
      tutorialsData[i].description +
      "</div>" +
      "<div class='learn-more'><p>learn more</p><img class='right-arrow' src='static/images/chevron-right.svg' alt='right'></div>";
    tutorials.append(div);
  }
}

// Filters
// We have considered replacing these filters by a dropdown, but <select> elements are hard to style.

// Filter by resource type
const resourceFilter = document.getElementById("resource-type-filter");
var resourceTypeFilterValue = no_filter;
resourceFilter.onchange = function (event) {
  resourceTypeFilterValue = event.target.nextElementSibling.innerHTML;
  resourceFilterToggle();
  applySearchFilters();
};
function resourceFilterToggle() {
  resourceFilter.classList.toggle("invisible");
}
document.getElementById("resource-type-button").addEventListener("click", resourceFilterToggle);

// Filter by category
const categoriesFilter = document.getElementById("categories-filter");
var categoriesFilterValue = no_filter;
categoriesFilter.onchange = function (event) {
  categoriesFilterValue = event.target.value;
  categoriesFilterToggle();
  applySearchFilters();
};
function categoriesFilterToggle() {
  categoriesFilter.classList.toggle("invisible");
}
document.getElementById("categories-button").addEventListener("click", categoriesFilterToggle);
