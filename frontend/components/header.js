/*
 * PetSathi shared site header (logo, main navigation, login / get-started buttons).
 *
 * Edit the markup below to change the header on every page.
 * Include it where the header should appear, as a normal (non-async, non-defer) script:
 *   <script src="<path-to>/frontend/components/header.js"></script>
 * It writes the markup in place synchronously, so scripts that run later on the
 * page (e.g. main.js) find the header elements just as before.
 *
 * Write links relative to the project root and prefix them with ${ROOT}.
 * ROOT is the relative path from the current page back to the project root
 * (e.g. "" on index.html, "../../" on frontend/pages/about.html), worked out from
 * this script's own URL, so the same markup works from any folder depth,
 * over http:// and file://.
 */
(function () {
  const script = document.currentScript;
  const rootPath = new URL("../../", script.src).pathname;
  const pageDir = new URL(".", window.location.href).pathname;
  const ROOT = pageDir.startsWith(rootPath)
    ? "../".repeat(pageDir.slice(rootPath.length).split("/").filter(Boolean).length)
    : new URL("../../", script.src).href;
  script.insertAdjacentHTML(
    "beforebegin",
    `<header class="site-header">
  <a class="brand" href="${ROOT}index.html" aria-label="PetSathi home"><svg class="brand-mark" aria-hidden="true" viewBox="0 0 40 40" role="img" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="21" cy="8" r="4" fill="currentColor"/><circle cx="30" cy="12" r="4" fill="currentColor"/><path d="M20 17c-6 0-11 5-11 11 0 4 3 6 6 6 2 0 3-2 5-2s3 2 5 2c4 0 6-2 6-6 0-6-5-11-11-11Z" fill="currentColor"/></svg><span>Pet<span>Sathi</span></span></a>
  <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false"><i class="fa-solid fa-bars" aria-hidden="true"></i></button>
  <nav class="main-nav" aria-label="Main navigation">
    <a href="${ROOT}index.html">Home</a>
    <div class="nav-item"><a href="${ROOT}frontend/pages/pets/index.html">Explore Pets <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
      <div class="dropdown dropdown-explore">
        <a href="${ROOT}frontend/pages/pets/dogs/index.html">Dogs</a><a href="${ROOT}frontend/pages/pets/cats/index.html">Cats</a><a href="${ROOT}frontend/pages/pets/birds/index.html">Birds</a><a href="${ROOT}frontend/pages/pets/rabbits/index.html">Rabbits</a><a href="${ROOT}frontend/pages/pets/other/fish.html">Aquarium Fish</a><a href="${ROOT}frontend/pages/pets/other/reptiles.html">Reptiles</a>
      </div>
    </div>
    <div class="nav-item"><a href="${ROOT}frontend/pages/services/index.html">Services <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
      <div class="dropdown dropdown-services"><a href="${ROOT}frontend/pages/services/dog-walking.html">Dog Walking</a><a href="${ROOT}frontend/pages/services/cat-care.html">Cat Care</a><a href="${ROOT}frontend/pages/services/pet-care.html">Pet Care</a></div>
    </div>
    <div class="nav-item"><a href="${ROOT}frontend/pages/walker/index.html">Find a Walker <span class="nav-arrow" aria-hidden="true">&#x25BE;</span></a>
      <div class="dropdown dropdown-walker"><a href="${ROOT}frontend/pages/walker/dogs.html">Search Walkers</a><a href="${ROOT}frontend/pages/walker/cats.html">Walker Profiles</a><a href="${ROOT}frontend/pages/walker/index.html#bookings">My Bookings</a></div>
    </div>
    <a href="${ROOT}frontend/pages/about.html">About Us</a><a href="${ROOT}frontend/pages/auth/login.html">Log in</a><a class="button button-small" href="${ROOT}frontend/pages/auth/register.html">Get Started</a>
  </nav>
</header>`
  );
})();
