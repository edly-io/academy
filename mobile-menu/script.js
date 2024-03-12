const closeButton = document.querySelector(".close-button");
closeButton.addEventListener("click", (event) => {
  window.history.back();
});
