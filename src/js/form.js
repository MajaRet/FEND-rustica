document.querySelectorAll("form").forEach((form) => {
  const submitButton = form.querySelector("input[type=submit]");
  if (submitButton) {
    submitButton.addEventListener("click", () =>
      form.querySelectorAll("input[required]").forEach((field) => {
        field.classList.add("required");
      })
    );
  }
});
