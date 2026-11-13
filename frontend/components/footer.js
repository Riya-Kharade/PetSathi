/*
 * PetSathi shared site footer (brand, Explore / Information / Connect links, copyright).
 *
 * Edit the markup below to change the footer on every page.
 * Include it where the footer should appear, as a normal (non-async, non-defer) script:
 *   <script src="<path-to>/frontend/components/footer.js"></script>
 * It writes the markup in place synchronously, so scripts that run later on the
 * page (e.g. main.js) find the footer elements just as before.
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
    `<footer class="footer">
  <div class="section-wrap footer-grid">
    <div><a class="brand" href="${ROOT}index.html" aria-label="PetSathi home"><svg class="brand-mark" aria-hidden="true" viewBox="0 0 40 40" role="img" focusable="false"><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="21" cy="8" r="4" fill="currentColor"/><circle cx="30" cy="12" r="4" fill="currentColor"/><path d="M20 17c-6 0-11 5-11 11 0 4 3 6 6 6 2 0 3-2 5-2s3 2 5 2c4 0 6-2 6-6 0-6-5-11-11-11Z" fill="currentColor"/></svg><span>Pet<span>Sathi</span></span></a><p>Your pet's trusted companion. Making pet care easier, one paw at a time.</p></div>
    <div><b>Explore</b><a href="${ROOT}index.html#home">Home</a><a href="${ROOT}frontend/pages/pets/index.html">Explore Pets</a><a href="${ROOT}frontend/pages/services/index.html">Services</a><a href="${ROOT}frontend/pages/walker/index.html">Find a Walker</a></div>
    <div><b>Information</b><a href="${ROOT}frontend/pages/about.html">About Us</a><a href="${ROOT}frontend/pages/contact.html">Contact Us</a><a href="${ROOT}frontend/pages/faq.html">FAQ / Help Center</a><a href="#privacy">Privacy Policy</a><a href="#terms">Terms &amp; Conditions</a></div>
    <div><b>Connect With Us</b><a href="https://github.com/Riya-Kharade/PetSathi" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/riyakharade/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://petsathi-nsoc.netlify.app/" target="_blank" rel="noopener noreferrer">Live Website</a></div>
  </div>
  <div class="section-wrap footer-bottom"><span>&copy; 2026 PetSathi. All rights reserved.</span><span>Made with &hearts; for pets.</span><span>&#x0924;&#x0941;&#x092E;&#x091A;&#x094D;&#x092F;&#x093E; Pet &#x091A;&#x093E; &#x0935;&#x093F;&#x0936;&#x094D;&#x0935;&#x093E;&#x0938;&#x0942; &#x0938;&#x093E;&#x0925;&#x0940;!</span></div>
</footer>`
  );
})();
