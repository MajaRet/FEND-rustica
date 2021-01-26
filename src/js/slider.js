function nextSliderElem(sliderElems, advance) {
  for (let i = 0; i < sliderElems.length; i += 1) {
    if (
      sliderElems[advance(i)] &&
      Array.prototype.includes.call(sliderElems[i].classList, "active")
    ) {
      sliderElems[i].classList.remove("active");
      sliderElems[advance(i)].classList.add("active");

      if (sliderElems[i - 1]) sliderElems[i - 1].classList.remove("left");
      if (sliderElems[advance(i) - 1]) {
        sliderElems[advance(i) - 1].classList.add("left");
      }
      if (sliderElems[i + 1]) sliderElems[i + 1].classList.remove("right");
      if (sliderElems[advance(i) + 1]) {
        sliderElems[advance(i) + 1].classList.add("right");
      }
      return;
    }
  }
}

const sliders = document.querySelectorAll(".slider");
sliders.forEach(function addSliderListeners(slider) {
  const sliderElems = slider.querySelectorAll(".slider__elem");
  const buttonLeft = slider.querySelector(".slider__button--left");
  const buttonRight = slider.querySelector(".slider__button--right");

  buttonRight.addEventListener(
    "click",
    nextSliderElem.bind(null, sliderElems, (n) => n + 1)
  );
  buttonLeft.addEventListener(
    "click",
    nextSliderElem.bind(null, sliderElems, (n) => n - 1)
  );
});
