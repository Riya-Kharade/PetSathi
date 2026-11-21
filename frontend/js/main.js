/**
 * PetSathi Main Application & Global Layout Script
 * Handles reusable header & footer component rendering, mobile navigation drawer,
 * sub-accordions, and dynamic year.
 */

(function () {
  function getRootPrefix() {
    const headerEl = document.getElementById("header");
    if (headerEl && headerEl.getAttribute("data-root") !== null) {
      return headerEl.getAttribute("data-root");
    }

    const path = (window.location.pathname || "").replace(/\\/g, "/");
    const marker = "frontend/pages/";
    const idx = path.indexOf(marker);
    if (idx !== -1) {
      const sub = path.substring(idx + marker.length);
      const segments = sub.split("/").filter(Boolean);
      const depth = 2 + (segments.length - 1);
      return "../".repeat(depth);
    }

    const scripts = document.querySelectorAll("script[src]");
    for (const s of scripts) {
      const src = s.getAttribute("src") || "";
      if (src.includes("main.js") || src.includes("components.js")) {
        const parts = src.split("/js/")[0].split("/components/")[0];
        if (parts === "frontend" || parts === "./frontend") {
          return "";
        }
        const count = (parts.match(/\.\.\//g) || []).length;
        if (count > 0) {
          return "../".repeat(count + 1);
        }
      }
    }

    return "";
  }

  function adjustRelativeLinks(html, rootPrefix) {
    if (!rootPrefix) return html;
    return html.replace(/\bhref="([^"]+)"/g, (match, href) => {
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return match;
      }
      return 'href="' + rootPrefix + href + '"';
    });
  }

  const RAW_HEADER_HTML = `<header class="site-header">
    <a class="brand" href="index.html" aria-label="PetSathi home"><svg class="brand-mark" aria-hidden="true"
        viewBox="0 0 40 40" role="img" focusable="false">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <circle cx="21" cy="8" r="4" fill="currentColor" />
        <circle cx="30" cy="12" r="4" fill="currentColor" />
        <path d="M20 17c-6 0-11 5-11 11 0 4 3 6 6 6 2 0 3-2 5-2s3 2 5 2c4 0 6-2 6-6 0-6-5-11-11-11Z"
          fill="currentColor" />
      </svg><span>Pet<span>Sathi</span></span></a>
    <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <i class="fa-solid fa-bars" aria-hidden="true"></i>
    </button>
    <nav class="main-nav" aria-label="Main navigation">
      <a href="index.html">Home</a>
      <div class="nav-item">
        <a href="frontend/pages/pets/index.html">Explore Pets
          <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
        <div class="dropdown dropdown-explore">
          <a href="frontend/pages/pets/dogs/index.html">Dogs</a><a href="frontend/pages/pets/cats/index.html">Cats</a><a
            href="frontend/pages/pets/birds/index.html">Birds</a><a
            href="frontend/pages/pets/rabbits/index.html">Rabbits</a><a
            href="frontend/pages/pets/other/fish.html">Aquarium Fish</a><a
            href="frontend/pages/pets/other/reptiles.html">Reptiles</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="frontend/pages/services/index.html">Services
          <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
        <div class="dropdown dropdown-services">
          <a href="frontend/pages/services/dog-walking.html">Dog Walking</a><a
            href="frontend/pages/services/cat-care.html">Cat Care</a><a href="frontend/pages/services/pet-care.html">Pet
            Care</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="frontend/pages/walker/index.html">Find a Walker
          <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
        <div class="dropdown dropdown-walker">
          <a href="frontend/pages/walker/dogs.html">Search Walkers</a><a href="frontend/pages/walker/cats.html">Walker
            Profiles</a><a href="frontend/pages/walker/index.html#bookings">My Bookings</a>
        </div>
      </div>
      <a href="frontend/pages/about.html">About Us</a><a href="frontend/pages/auth/login.html">Log in</a><a
        class="button button-small" href="frontend/pages/auth/register.html">Get Started</a>
    </nav>
  </header>`;

  const RAW_FOOTER_HTML = `<style>
@font-face {
  font-family: "Font Awesome 6 Brands";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-brands-400.woff2") format("woff2"),
       url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/webfonts/fa-brands-400.ttf") format("truetype");
}
body .footer i.fa-brands,
body .footer i.fa-brands::before,
body .footer .fa-brands,
body .footer .fa-brands::before,
body .footer [class*="fa-brands"],
body .footer [class*="fa-brands"]::before,
body .footer .footer-social-btn i,
body .footer .footer-social-btn i::before,
body .footer .footer-links a i.fa-brands,
body .footer .footer-links a i.fa-brands::before {
  font-family: "Font Awesome 6 Brands" !important;
  font-weight: 400 !important;
  font-style: normal !important;
}
</style>
<footer class="footer">
  <!-- Left Decor: Dog + Cat + Heart + Hills -->
  <div class="footer-decor-left" aria-hidden="true">
    <img src="data:image/png;base64,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" alt="" style="width: 100%; height: auto; display: block;" />
  </div>

  <!-- Right Decor: Rolling Hills + Font Awesome Climbing Paws -->
  <div class="footer-decor-right" aria-hidden="true">
    <svg class="footer-decor-wave-right" viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">
      <!-- Back darker wave -->
      <path d="M 80 110 Q 140 85 240 38 L 240 110 Z" fill="#144b24" />
      <!-- Front wave with S-curve -->
      <path d="M 10 110 C 50 108 70 82 100 82 C 130 82 150 90 180 80 C 205 72 225 60 240 52 L 240 110 Z" fill="#2a7b33" />
    </svg>
    <i class="fa-solid fa-paw footer-paw-icon footer-paw-1" aria-hidden="true"></i>
    <i class="fa-solid fa-paw footer-paw-icon footer-paw-2" aria-hidden="true"></i>
  </div>

  <div class="footer-container section-wrap">
    <div class="footer-grid">
      <!-- Col 1: Brand & Social -->
      <div class="footer-col">
        <a class="brand footer-brand" href="index.html" aria-label="PetSathi home">
          <i class="fa-solid fa-paw footer-brand-paw" aria-hidden="true"></i>
          <span class="footer-brand-name">PetSathi</span>
        </a>
        <div class="footer-brand-accent"></div>
        <p class="footer-desc">
          Your pet's trusted companion. Making pet care easier, one paw at a time.
        </p>
        <div class="footer-social-row">
          <a href="https://www.youtube.com/@Riya-Kharade" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="footer-social-btn">
            <i class="fa-brands fa-youtube" aria-hidden="true"></i>
          </a>
          <a href="https://www.instagram.com/riiyyyaaaa16?cplk=MWdleXI5azdhYXlsdA%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-btn">
            <i class="fa-brands fa-instagram" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/riyakharade/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-social-btn">
            <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
          </a>
          <a href="https://github.com/Riya-Kharade" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="footer-social-btn">
            <i class="fa-brands fa-github" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <!-- Col 2: Explore -->
      <div class="footer-col">
        <h3 class="footer-heading">
          <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
          <span>Explore</span>
        </h3>
        <ul class="footer-links">
          <li>
            <a href="index.html">
              <i class="fa-solid fa-house" aria-hidden="true"></i>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/pets/index.html">
              <i class="fa-solid fa-paw" aria-hidden="true"></i>
              <span>Explore Pets</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/services/index.html">
              <i class="fa-solid fa-heart" aria-hidden="true"></i>
              <span>Services</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/walker/index.html">
              <i class="fa-solid fa-person-walking" aria-hidden="true"></i>
              <span>Find a Walker</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Col 3: Information -->
      <div class="footer-col">
        <h3 class="footer-heading">
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
          <span>Information</span>
        </h3>
        <ul class="footer-links">
          <li>
            <a href="frontend/pages/about.html">
              <i class="fa-solid fa-user-group" aria-hidden="true"></i>
              <span>About Us</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/contact.html">
              <i class="fa-solid fa-envelope" aria-hidden="true"></i>
              <span>Contact Us</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/faq.html">
              <i class="fa-solid fa-circle-question" aria-hidden="true"></i>
              <span>FAQ / Help Center</span>
            </a>
          </li>
          <li>
            <a href="#privacy">
              <i class="fa-solid fa-shield-halved" aria-hidden="true"></i>
              <span>Privacy Policy</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/terms-and-conditions.html">
              <i class="fa-solid fa-file-contract" aria-hidden="true"></i>
              <span>Terms & Conditions</span>
            </a>
          </li>
          <li>
            <a href="frontend/pages/sitemap.html">
              <i class="fa-solid fa-sitemap" aria-hidden="true"></i>
              <span>Sitemap</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Col 4: Connect With Us -->
      <div class="footer-col">
        <h3 class="footer-heading">
          <i class="fa-solid fa-link" aria-hidden="true"></i>
          <span>Connect With Us</span>
        </h3>
        <ul class="footer-links">
          <li>
            <a href="https://github.com/Riya-Kharade" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github" aria-hidden="true"></i>
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/riyakharade/" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a href="https://petsathi-nsoc.netlify.app/" target="_blank" rel="noopener noreferrer">
              <i class="fa-solid fa-globe" aria-hidden="true"></i>
              <span>Live Website</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Divider Line matching reference with left & right margins and bold 2px thickness -->
  <div class="footer-divider-container">
    <div class="footer-divider-line"></div>
  </div>

  <!-- Bottom Bar -->
  <div class="footer-bottom">
    <div class="footer-bottom-wrap section-wrap">
      <span>&copy; <span id="year">2026</span> PetSathi. All rights reserved.</span>
      <div class="footer-bottom-center">
        <i class="fa-solid fa-paw footer-bottom-paw" aria-hidden="true"></i>
        <span class="footer-bottom-sep">|</span>
        <span>Made with <i class="fa-solid fa-heart footer-bottom-heart" aria-hidden="true"></i> for pets.</span>
        <span class="footer-bottom-sep">|</span>
        <i class="fa-solid fa-paw footer-bottom-paw" aria-hidden="true"></i>
      </div>
      <span class="footer-marathi">&#x0924;&#x0941;&#x092E;&#x091A;&#x094D;&#x092F;&#x093E; Pet &#x091A;&#x093E; &#x0935;&#x093F;&#x0936;&#x094D;&#x0935;&#x093E;&#x0938;&#x0942; &#x0938;&#x093E;&#x0925;&#x0940;!</span>
    </div>
  </div>
</footer>
`;

  async function loadHtml(url, fallbackRaw) {
    try {
      if (window.location.protocol === "file:") {
        return fallbackRaw;
      }
      const res = await fetch(url);
      if (res.ok) {
        return await res.text();
      }
    } catch (e) {
      // CORS or offline fallback
    }
    return fallbackRaw;
  }

  function initNav() {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");

    if (toggle && nav && !toggle.__petsathi_bound) {
      toggle.__petsathi_bound = true;

      // 1. Mobile menu toggle button
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = open
          ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
          : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

        // Reset any open sub-accordions when closing the drawer
        if (!open) {
          nav.querySelectorAll(".nav-item.is-open").forEach((item) => {
            item.classList.remove("is-open");
            const parentLink = item.querySelector(":scope > a");
            if (parentLink) {
              parentLink.setAttribute("aria-expanded", "false");
            }
          });
        }
      });

      // 2. Mobile accordion toggle for dropdown parents
      const navItemsWithDropdown = nav.querySelectorAll(".nav-item");
      navItemsWithDropdown.forEach((item) => {
        const parentLink = item.querySelector(":scope > a");
        const dropdown = item.querySelector(".dropdown");

        if (parentLink && dropdown && !parentLink.__petsathi_bound) {
          parentLink.__petsathi_bound = true;
          parentLink.setAttribute("aria-haspopup", "true");
          parentLink.setAttribute("aria-expanded", "false");

          parentLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 850) {
              e.preventDefault();
              const isOpen = item.classList.toggle("is-open");
              parentLink.setAttribute("aria-expanded", String(isOpen));

              navItemsWithDropdown.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("is-open")) {
                  otherItem.classList.remove("is-open");
                  const otherLink = otherItem.querySelector(":scope > a");
                  if (otherLink) {
                    otherLink.setAttribute("aria-expanded", "false");
                  }
                }
              });
            }
          });
        }
      });

      // 3. Close drawer ONLY on leaf navigation link clicks
      nav.querySelectorAll("a").forEach((link) => {
        if (
          link.closest(".nav-item") &&
          link.parentElement.classList.contains(".nav-item") &&
          link.nextElementSibling?.classList.contains("dropdown")
        ) {
          return;
        }

        link.addEventListener("click", () => {
          if (window.innerWidth <= 850) {
            nav.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

            nav.querySelectorAll(".nav-item.is-open").forEach((item) => {
              item.classList.remove("is-open");
              const parentLink = item.querySelector(":scope > a");
              if (parentLink) {
                parentLink.setAttribute("aria-expanded", "false");
              }
            });
          }
        });
      });

      // 4. Handle resize from mobile to desktop
      window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
          nav.querySelectorAll(".nav-item.is-open").forEach((item) => {
            item.classList.remove("is-open");
            const parentLink = item.querySelector(":scope > a");
            if (parentLink) {
              parentLink.setAttribute("aria-expanded", "false");
            }
          });
        }
      });
    }

    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  async function loadComponents() {
    if (window.__PETSATHI_COMPONENTS_LOADED__) {
      initNav();
      return;
    }
    window.__PETSATHI_COMPONENTS_LOADED__ = true;

    const rootPrefix = getRootPrefix();

    const headerPlaceholder =
      document.getElementById("header") ||
      document.getElementById("site-header") ||
      document.getElementById("header-placeholder");

    const footerPlaceholder =
      document.getElementById("footer") ||
      document.getElementById("site-footer") ||
      document.getElementById("footer-placeholder");

    const promises = [];

    if (headerPlaceholder) {
      const headerUrl = rootPrefix + "frontend/components/header.html";
      promises.push(
        loadHtml(headerUrl, RAW_HEADER_HTML).then((html) => {
          headerPlaceholder.innerHTML = adjustRelativeLinks(html, rootPrefix);
          initNav();
        })
      );
    } else {
      initNav();
    }

    if (footerPlaceholder) {
      const footerUrl = rootPrefix + "frontend/components/footer.html";
      promises.push(
        loadHtml(footerUrl, RAW_FOOTER_HTML).then((html) => {
          footerPlaceholder.innerHTML = adjustRelativeLinks(html, rootPrefix);
          const year = document.getElementById("year");
          if (year) year.textContent = new Date().getFullYear();
        })
      );
    }

    await Promise.all(promises);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadComponents);
  } else {
    loadComponents();
  }

  window.loadPetSathiComponents = loadComponents;
})();
