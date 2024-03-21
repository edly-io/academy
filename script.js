import { resource_data, tutorials_data } from "./static/data.js";

var resource_to_display = resource_data;

//function to display the cards of any data
function displayResources(resourcesData) {
  const dataCont = document.getElementById("resources");
  dataCont.innerHTML = "";
  for (let i in resourcesData) {
    let div = document.createElement("div");
    div.className = `card ${
      resourcesData[i].coming_soon ? "coming-soon-card" : " "
    } ${resourcesData[i].external_link ? "external-link-card" : " "}`;
    var dyn_class = resourcesData[i].type === "video" ? "orange" : "green";
    div.innerHTML =
      `<div class="${dyn_class} card-tag">` +
      (resourcesData[i].type == "video"
        ? "<img class='play' src='static/images/play-solid.svg' alt='play'><p class='card-tag-text'>"
        : "<img class='guide' src='static/images/file-lines.svg' alt='file'><p class='card-tag-text'>") +
      resourcesData[i].type +
      "</p></div>" +
      ` ${
        resourcesData[i].coming_soon
          ? "<div class='coming-soon-tag'><p class='coming-soon-text'>coming soon</p></div>"
          : " "
      }` +
      "<h2 class='card-title'>" +
      resourcesData[i].name +
      `${
        resourcesData[i].external_link
          ? `<a class='link-ref' href=${resourcesData[i].external_link} target='_blank' ><img class='link' src='static/images/link.svg' alt='link'></a>`
          : " "
      }` +
      "</h2><p class='card-desc'> " +
      resourcesData[i].description +
      "</p>";
    dataCont.append(div);
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

//display default data upon load before any filter is applied
window.onload = () => {
  displayResources(resource_to_display);
  displayTutorials(tutorials_data);
  setBlogClickEvent();
  setTutorialClickEvent();
};

// resource filter display
var showResourceFilter = false;
var resourceTypes = ["All", "Video", "Guide", "Tutorial", "Course"];
const resourceButton = document.getElementById("resource-type-button");

function resourceFilterToggle() {
  if (showResourceFilter) {
    showResourceFilter = false;
  } else {
    showResourceFilter = true;
  }
  const resourceFilter = document.getElementById("resource-type-filter");
  if (showResourceFilter) {
    resourceFilter.style.display = "block";
  } else {
    resourceFilter.style.display = "none";
  }
}

resourceButton.addEventListener("click", resourceFilterToggle);
const resourceFilter = document.getElementById("resource-type-filter");

for (let filter of resourceTypes) {
  let div = document.createElement("div");
  div.className = "resource-type-option";
  div.innerHTML = `<input class='resource-type-input' type='radio' name="resourceRadioInput" ${
    filter === "All" ? "checked" : ""
  } }></input> <label class='form-check-label' for=${filter}>${filter}</label>`;
  resourceFilter.append(div);
}

//function to apply both filters when any of them changes
function applyBothFilters(resourceType, topic, data) {
  var filteredData;
  if (resourceType == "All") {
    filteredData = data;
  } else {
    filteredData = data.filter((element) => {
      return element.type.toLowerCase() === resourceType.toLowerCase();
    });
  }
  if (topic == "All") {
    filteredData = filteredData;
  } else {
    filteredData = filteredData.filter((element) => {
      return element.category.toLowerCase() === topic.toLowerCase();
    });
  }

  return filteredData;
}

//resource filter functionality
var resourceFilterType = "All";
resourceFilter.onchange = function (event) {
  const filterId = event.target.nextElementSibling.innerHTML;
  resourceFilterType = filterId;
  resource_to_display = applyBothFilters(
    resourceFilterType,
    topicsFilterType,
    resource_data
  );
  displayResources(resource_to_display);
  setBlogClickEvent();
};

//topics filter display
var showTopicsFilter = false;
function topicsFilterToggle() {
  if (showTopicsFilter) {
    showTopicsFilter = false;
  } else {
    showTopicsFilter = true;
  }

  const topicsFilter = document.getElementById("topics-filter");
  if (showTopicsFilter) {
    topicsFilter.style.display = "block";
  } else {
    topicsFilter.style.display = "none";
  }
}

const topicsButton = document.getElementById("topics-button");
topicsButton.addEventListener("click", topicsFilterToggle);

var topics = [
  "All",
  "Aritificial Intelligence",
  "Career Growth",
  "Coding",
  "Experience",
  "Software Design",
  "Technology",
];

const topicsFilter = document.getElementById("topics-filter");
for (let topic of topics) {
  let div = document.createElement("div");
  div.className = "topic-option";
  div.innerHTML = `<input class='topic-input' type='radio' name="topicsRadioInput" ${
    topic === "All" ? "checked" : ""
  } }></input> <label class='form-check-label' for=${topic}>${topic}</label>`;
  topicsFilter.append(div);
}

//topics filter functionality
var topicsFilterType = "All";
topicsFilter.onchange = function (event) {
  const topicsType = event.target.nextElementSibling.innerHTML;
  topicsFilterType = topicsType;
  resource_to_display = applyBothFilters(
    resourceFilterType,
    topicsFilterType,
    resource_data
  );
  displayResources(resource_to_display);
  setBlogClickEvent();
};

//function to set click event on every resource card
const setBlogClickEvent = () => {
  const cards = Array.from(document.getElementsByClassName("card"));
  cards.forEach((card) => {
    const isComingSoon = Array.from(card.classList).includes(
      "coming-soon-card"
    );
    const isExternalLink = Array.from(card.classList).includes(
      "external-link-card"
    );
    if (!isComingSoon && !isExternalLink) {
      card.addEventListener("click", () => {
        //right now, we have a dummy resource page, but the commented code can be used upon making different resource pages inside resource folder
        // const name = card.querySelector(".card-title").innerHTML.toLowerCase();
        // window.location.href = `resource/${name}`;
        window.location.href = `resource/`;
      });
    }
  });
};

//function to set up click event for the tutorials
const setTutorialClickEvent = () => {
  const tutorials = Array.from(document.getElementsByClassName("detail-box"));
  tutorials.forEach((tutorial) => {
    tutorial.addEventListener("click", () => {
      // const name = tutorial.querySelector(".tutorial-title").innerHTML;
      window.location.href = "resource/index.html";
    });
  });
};

//mobile menu display toggle
const closeButton = document.querySelector(".close-button");
const mobileMenu = document.querySelector(".mobile-menu");
closeButton.addEventListener("click", (event) => {
  mobileMenu.style.visibility = "hidden";
});

const menuButton = document.querySelector(".mobile-menu-link");
menuButton.addEventListener("click", (event) => {
  mobileMenu.style.visibility = "visible";
});
