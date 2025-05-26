document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.getElementById("hamburger-button");
  const navLinks = document.getElementById("nav-links");

  if (hamburgerButton && navLinks) {
    hamburgerButton.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburgerButton.classList.toggle("active");
    });
  }
});
