const no_filter = "all";

function applySearchFilters() {
  for (let card of document.getElementsByClassName("card")) {
    let visible = true;
    if (
      categoriesFilterValue != no_filter &&
      categoriesFilterValue != card.getAttribute("attr-category")
    ) {
      visible = false;
    }
    if (
      resourceTypeFilterValue != no_filter &&
      resourceTypeFilterValue != card.getAttribute("attr-resource-type")
    ) {
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

for (let option of document.getElementsByClassName("resource-type-option")) {
  option.addEventListener("click", (event) => {
    resourceTypeFilterValue = event.currentTarget.lastElementChild.innerHTML;
    resourceFilterToggle();
    applySearchFilters();

    const input = event.currentTarget.firstElementChild;

    input.checked = true;
  });
}

function resourceFilterToggle() {
  resourceFilter.classList.toggle("invisible");
}
document
  .getElementById("resource-type-button")
  .addEventListener("click", resourceFilterToggle);

// Filter by category
const categoriesFilter = document.getElementById("categories-filter");
var categoriesFilterValue = no_filter;

for (let option of document.getElementsByClassName("category-option")) {
  option.addEventListener("click", (event) => {
    categoriesFilterValue = event.currentTarget.lastElementChild.innerHTML;
    categoriesFilterToggle();
    applySearchFilters();

    const input = event.currentTarget.firstElementChild;

    input.checked = true;
  });
}

function categoriesFilterToggle() {
  categoriesFilter.classList.toggle("invisible");
}
document
  .getElementById("categories-button")
  .addEventListener("click", categoriesFilterToggle);
