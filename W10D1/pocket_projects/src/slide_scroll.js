window.addEventListener("scroll", () => {
  debounce(slideImages)();
});

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  // debugger
  // This is the function that is actually executed when
  // the DOM event is triggered.
  return function executedFunction() {
    // Store the context of this and any
    // parameters passed to executedFunction
    const context = this;
    const args = arguments;

    // The function to be called after debounce time has elapsed
    const later = function () {
      // null timeout to indicate the debounce ended
      timeout = null;

      // Call function now if you did not in the beginning
      if (!immediate) func.apply(context, args);
    };

    // Determine if you should call the function
    // on the leading or trail end
    const callNow = immediate && !timeout;

    // This will reset the waiting every function execution.
    clearTimeout(timeout);

    // Restart the debounce waiting period - returns true
    timeout = setTimeout(later, wait);

    // Call immediately if you're doing a leading end execution
    if (callNow) func.apply(context, args);
  };
}

/*
window.innerHeight --- height of current browser window
Element.getBoundingClientRect() --- position of ele relative to viewport
 --- use top and bottom to determine if it has been scrolled into view

- call ^^ function on the image in question
- check whether correct amount of image is visible in the screen
- if so, add class "active" to image.
*/

function slideImages () {
  const images = Array.from(document.querySelectorAll("img"));
  const screenHeight = window.innerHeight;

  images.forEach(image => {
    const position = image.getBoundingClientRect();
    const midPoint = image.height / 2;
    const top = position.top + midPoint;
    const bottom = position.bottom - midPoint;
    if (top >= 0 && bottom < screenHeight) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
}