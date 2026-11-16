/* ========================================================
   PETSATHI DISCLAIMER PAGE JAVASCRIPT (disclaimer.js)
   TOC Active Tracking & Accessible Navigation Enhancements
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Table of Contents active link tracking with IntersectionObserver
  const sections = document.querySelectorAll(".disc-card");
  const tocLinks = document.querySelectorAll(".disc-toc-list a");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tocLinks.forEach((link) => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active");
              link.setAttribute("aria-current", "true");
            } else {
              link.classList.remove("active");
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
  }

  // 2. Back to top button visibility
  const backToTop = document.querySelector(".disc-back-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    });

    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      const skipLink = document.querySelector(".skip-link");
      if (skipLink) {
        skipLink.focus();
      }
    });
  }
});
