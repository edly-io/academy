//this is just dummy data which is used to display content on the page
var contentData = {
  id: 1,
  type: "video",
  name: "Web Development Fundamentals",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  category: "Technology",
  coming_soon: false,
  target_audience: ["Managers", "Coders", "Bussiness Men"],
  learning_outcomes: ["optimize website", "ad-strategy"],
  video_title: "Lorem Ipsum Dolor",
  video_link: "https://www.youtube.com/embed/W6NZfCO5SIk?si=GZvL_wxd3FlWeMx1",
  video_description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
};
//display title link in the route of page
const titleRef = document.querySelector(".title-ref");
titleRef.innerHTML = contentData.name;

//display heading and description
const heading = document.querySelector(".heading");
const description = document.querySelector(".description");
heading.innerHTML = contentData.name;
description.innerHTML = contentData.description;

//display target audience
const target_audience = document.querySelector(".target-audience");
if (contentData.target_audience) {
  target_audience.innerHTML = "<h2>Who is this for?</h2>";
  let audience_ul = document.createElement("ul");
  audience_ul.className = "audience-list";
  contentData.target_audience.forEach((element) => {
    audience_ul.innerHTML = audience_ul.innerHTML + `<li>${element}</li>`;
  });
  target_audience.append(audience_ul);
} else {
  target_audience.style.display = "none";
}

//display learning outcome
const learning_outcomes = document.querySelector(".learning-outcomes");
if (contentData.learning_outcomes) {
  learning_outcomes.innerHTML = "<h2>What you'll learn</h2>";
  let outcomes_ul = document.createElement("ul");
  outcomes_ul.className = "outcomes-list";

  contentData.learning_outcomes.forEach((element) => {
    outcomes_ul.innerHTML = outcomes_ul.innerHTML + `<li>${element}</li>`;
  });
  learning_outcomes.append(outcomes_ul);
} else {
  learning_outcomes.style.display = "none";
}

//display video content (title, video and description)
const content = document.querySelector(".content");
if (contentData.video_title) {
  content.innerHTML = `<h2 class="content-heading">${contentData.video_title} </h2>
<iframe class="video-content" width="560" height="315" src=${contentData.video_link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p class="content-description">${contentData.video_description}</p>`;
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
