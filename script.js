document.querySelector(".dropdown select").addEventListener("change", function() {
  console.log("You selected: ", this.value);
});