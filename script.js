document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButton = document.getElementById("hamburger-button");
  const navLinks = document.getElementById("nav-links");

  if (hamburgerButton && navLinks) {
    hamburgerButton.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburgerButton.classList.toggle("active");
    });

    // Add event listener to close menu when a link is clicked
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          hamburgerButton.classList.remove("active");
        }
      });
    });
  }

  // Dynamic restaurant hours status
  const statusMessageElement = document.getElementById(
    "current-status-message"
  );
  if (statusMessageElement) {
    const hours = {
      // 0: Sunday, 1: Monday, ..., 6: Saturday
      0: { open: 9, close: 20 }, // Sunday 9 AM - 8 PM
      1: null, // Monday Closed
      2: { open: 9, close: 20 }, // Tuesday 9 AM - 8 PM
      3: { open: 9, close: 20 }, // Wednesday 9 AM - 8 PM
      4: { open: 9, close: 20 }, // Thursday 9 AM - 8 PM
      5: { open: 9, close: 20 }, // Friday 9 AM - 8 PM
      6: { open: 9, close: 20 }, // Saturday 9 AM - 8 PM
    };

    const now = new Date();
    const currentDay = now.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const currentHour = now.getHours(); // 0-23
    // const currentMinute = now.getMinutes(); // 0-59 (if needed for more precision)

    const todaysHours = hours[currentDay];
    let isOpen = false;

    if (todaysHours) {
      // Check if current time is within opening hours
      // Assuming close time means "up to the start of this hour"
      // e.g. if close is 20, it means open until 7:59 PM
      if (currentHour >= todaysHours.open && currentHour < todaysHours.close) {
        isOpen = true;
      }
    }

    if (isOpen) {
      statusMessageElement.textContent = "Open now";
      statusMessageElement.classList.remove("status-closed");
      statusMessageElement.classList.add("status-open");
    } else {
      statusMessageElement.textContent = "Closed today";
      statusMessageElement.classList.remove("status-open");
      statusMessageElement.classList.add("status-closed");
    }
  }

  // Intersection Observer for scroll animations
  const animatedSections = document.querySelectorAll(".fade-slide-in");

  if (animatedSections.length > 0) {
    const observerOptions = {
      root: null, // observes intersections relative to the viewport
      rootMargin: "0px",
      threshold: 0.6, // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Optional: stop observing after animation
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    animatedSections.forEach((section) => {
      intersectionObserver.observe(section);
    });
  }

  // Swiper.js initialization removed for pure CSS marquee

  // Dynamically set copyright year
  const copyrightYearElement = document.getElementById("copyright-year");
  if (copyrightYearElement) {
    copyrightYearElement.textContent = new Date().getFullYear();
  }
});
