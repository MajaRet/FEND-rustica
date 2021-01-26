function deactivateSliderButton(btn) {
  const button = btn;
  button.classList.remove("slider__button--active");
  button.classList.add("slider__button--inactive");
  button.tabIndex = -1;
}

function activateSliderButton(btn) {
  const button = btn;
  button.classList.remove("slider__button--inactive");
  button.classList.add("slider__button--active");
  button.tabIndex = 0;
}

function jumpToSliderElem(index) {
  if (index !== this.activeIndex) {
    // Defines whether we move the slider left or right
    const slideLeft = index < this.activeIndex;

    const activeElementClasses = this.elements[this.activeIndex].classList;
    const prevElementClasses = this.elements[this.prevIndex].classList;
    const newElementClasses = this.elements[index].classList;

    // Remove the animation classes from the previous element.
    prevElementClasses.remove("left");
    prevElementClasses.remove("right");

    // Move the active class from the old to the new element...
    activeElementClasses.remove("active");
    activeElementClasses.remove("active--from-left");
    activeElementClasses.remove("active--from-right");
    newElementClasses.add("active");

    // ... and tab indicator.
    this.tabDots[this.activeIndex].classList.remove("tab-dot--active");
    this.tabDots[index].classList.add("tab-dot--active");

    // Add the direction-specific animation classes.
    if (slideLeft) {
      newElementClasses.add("active--from-left");
      activeElementClasses.add("right");
    } else {
      newElementClasses.add("active--from-right");
      activeElementClasses.add("left");
    }

    // Activate or deactivate slider buttons as necessary
    if (index === 0) {
      deactivateSliderButton(this.buttonLeft);
    } else if (index === this.elements.length - 1) {
      deactivateSliderButton(this.buttonRight);
    }
    if (this.activeIndex === 0) {
      activateSliderButton(this.buttonLeft);
    } else if (this.activeIndex === this.elements.length - 1) {
      activateSliderButton(this.buttonRight);
    }

    // Update the indices.
    this.prevIndex = this.activeIndex;
    this.activeIndex = index;
  }
}

function jumpSliderElementBy(offset) {
  const nextIndex = this.activeIndex + offset;
  if (nextIndex >= 0 && nextIndex < this.elements.length) {
    this.jumpToSliderElem(nextIndex);
  }
}

const sliders = document.querySelectorAll(".slider");

sliders.forEach(function addSliderListeners(slider) {
  const elements = slider.querySelectorAll(".slider__elem");
  const buttonLeft = slider.querySelector(".slider__button--left");
  const buttonRight = slider.querySelector(".slider__button--right");
  const tabDots = slider.querySelectorAll(".tab-dot");

  const sliderObj = {
    elements,
    tabDots,
    buttonLeft,
    buttonRight,
    activeIndex: 0,
    prevIndex: 0,
    jumpToSliderElem,
    jumpSliderElementBy,
  };

  // Clicking on the 'right' button moves the slider right by one.
  sliderObj.buttonRight.addEventListener(
    "click",
    jumpSliderElementBy.bind(sliderObj, 1)
  );
  // Clicking on the 'left' button moves the slider left by one.
  sliderObj.buttonLeft.addEventListener(
    "click",
    jumpSliderElementBy.bind(sliderObj, -1)
  );

  // Make it possible to jump to a specific page by clicking on the
  // corresponding dot.
  for (let i = 0; i < tabDots.length; i += 1) {
    tabDots[i].addEventListener("click", jumpToSliderElem.bind(sliderObj, i));
  }
});
