function dothing() {
  this.querySelectorAll("input[required]").forEach(function (field) {
    field.classList.add("required");
  });
}

document.querySelectorAll("form").forEach(function (form) {
  const submitButton = form.querySelector("input[type=submit]");
  if (submitButton) {
    // const requiredFields = form.querySelector("input[required]");
    submitButton.addEventListener("click", dothing.bind(form));
  }
});
