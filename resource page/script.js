import { resource_data, tutorials_data } from "../static/data.js";

const heading = document.querySelector(".heading");
const description = document.querySelector(".description");
// const code_snippet = document.querySelector(".code-snippet-container");
const target_audience = document.querySelector(".target-audience");
const learning_outcomes = document.querySelector(".learning-outcomes");
const content = document.querySelector(".content");
//get parameters from query string
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}
var contentType = getUrlParameter("content");
var contentName = getUrlParameter("name");

//display title link in the route of page
const titleRef = document.querySelector(".title-ref");
titleRef.innerHTML = contentName;

//getting the content of the page and displaying according to the type
var contentData;
if (contentType == "blog") {
  //resource blog case
  var resourceType = getUrlParameter("type");
  contentData = resource_data.find(
    (resource) =>
      resource.name === contentName && resource.type === resourceType
  );
  heading.innerHTML = contentData.name;
  description.innerHTML = contentData.description;

  let audience_ul = document.createElement("ul");
  audience_ul.className = "audience-list";

  contentData.target_audience.forEach((element) => {
    audience_ul.innerHTML = audience_ul.innerHTML + `<li>${element}</li>`;
  });
  target_audience.append(audience_ul);

  //display learning outcome
  let outcomes_ul = document.createElement("ul");
  outcomes_ul.className = "outcomes-list";

  contentData.learning_outcomes.forEach((element) => {
    outcomes_ul.innerHTML = outcomes_ul.innerHTML + `<li>${element}</li>`;
  });
  learning_outcomes.append(outcomes_ul);

  //display video content (title, video and description)
  content.innerHTML = `<h2 class="content-heading">${contentData.video_title} </h2>
<iframe class="video-content" width="560" height="315" src=${contentData.video_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="content-description">${contentData.video_description}</p>`;
} else {
  //tutorial case
  contentData = tutorials_data.find(
    (tutorial) => tutorial.title == contentName
  );
  heading.innerHTML = contentData.title;
  description.innerHTML = contentData.description;

  learning_outcomes.style.display = "none";
  target_audience.style.display = "none";
  code_snippet.style.display = "none";
}

// code editor

var editor = ace.edit("editor");
editor.setTheme("ace/theme/tomorrow_night");
editor.session.setMode("ace/mode/text");

editor.setOptions({
  autoScrollEditorIntoView: true,
  copyWithEmptySelection: true,
  highlightActiveLine: false,
  showGutter: false,
});
