/* ==========================================================================
   PetSathi - Privacy Policy JavaScript (frontend/js/privacy-policy.js)
   Table of Contents active tracking via IntersectionObserver &
   accessible smooth navigation enhancements.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Table of Contents active link tracking with IntersectionObserver
  const sections = document.querySelectorAll(".privacy-section");
  const tocLinks = document.querySelectorAll(".privacy-toc-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -70% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          tocLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
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

  // 2. Back to top button visibility and smooth scroll
  const backToTop = document.querySelector(".privacy-back-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    }, { passive: true });

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
