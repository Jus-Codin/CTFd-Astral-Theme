const navbar = document.getElementsByClassName("navbar")[0];
const footer = document.getElementsByClassName("footer")[0];
const mainContent = document.getElementById("mainContent");
const titleScreen = document.getElementById("titleScreen");
const rocket = document.getElementsByClassName("rocket")[0];
const startupScreen = document.getElementById("startupScreen");
const startupText = document.getElementById("startupText");
const startupSound = document.getElementById("startupSound");

function showTitleScreen() {
  document.body.classList.add("titleScreenVisible");
  navbar.classList.add("d-none");
  mainContent.classList.add("d-none");
  footer.classList.add("d-none");

  titleScreen.classList.remove("d-none");
  startupScreen.classList.remove("d-none");
  window.localStorage.setItem("ybn_showTitleScreen", "true");

  // Add listener to hide the startup screen once the animation is done
  startupText.addEventListener(
    "animationend",
    () => {
      startupSound.volume = 0.3;
      startupSound.play();

      // 1 second delay before hiding the startup screen
      setTimeout(() => {
        hideStartupScreen();
        // Remove the animation class
        startupText.classList.remove("startupTextAnimation");

        // Add listener to hide the title screen on click
        titleScreen.addEventListener("click", () => {
          hideTitleScreen(true);
        });
      }, 1000);
    },
    { once: true },
  );

  // Add class with animation to the startup text
  startupText.classList.add("startupTextAnimation");
}

function hideTitleScreen(animate) {
  window.localStorage.setItem("ybn_showTitleScreen", "false");
  if (animate) {
    if (titleScreen.classList.contains("flashbang")) {
      return;
    }

    rocket.classList.add("rocketAnimation");

    titleScreen.classList.add("flashbang");
    setTimeout(() => {
      navbar.classList.remove("d-none");
      mainContent.classList.remove("d-none");
      footer.classList.remove("d-none");
    }, 1000);

    setTimeout(() => {
      document.body.classList.remove("titleScreenVisible");
      titleScreen.classList.remove("flashbang");
      titleScreen.classList.add("d-none");
      rocket.classList.remove("rocketAnimation");
    }, 2000);
  } else {
    document.body.classList.remove("titleScreenVisible");
    navbar.classList.remove("d-none");
    mainContent.classList.remove("d-none");
    footer.classList.remove("d-none");
    titleScreen.classList.add("d-none");
  }
}

function hideStartupScreen() {
  startupScreen.classList.add("d-none");
}

function initTitleScreen() {
  var shouldShowTitleScreen = localStorage.getItem("ybn_showTitleScreen");
  if (shouldShowTitleScreen === null) {
    localStorage.setItem("ybn_showTitleScreen", "true");
    shouldShowTitleScreen = "true";
  }

  if (shouldShowTitleScreen === "true") {
    showTitleScreen();
  } else {
    hideTitleScreen(false);
  }

  // Add listener to navbar-brand to show the title screen
  const navbarBrand = document.getElementsByClassName("navbar-brand")[0];
  navbarBrand.addEventListener("click", () => {
    showTitleScreen();
  });
}

(() => {
  initTitleScreen();
})();
