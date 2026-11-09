(() => {
  const script = document.currentScript;
  const hostTool = window.location.hostname.split(".")[0];
  const hostToolMap = {
    hermeneutics: "hermeneutics",
    psalms: "psalms",
    psalmsexplorer: "psalms",
    sanctuary: "sanctuary",
    sanctuaryexplorer: "sanctuary",
    lastdayevents: "last-day-events",
    parables: "parables",
    romans: "romans",
    corinthians: "corinthians",
    galatians: "galatians",
    ephesians: "ephesians",
    philippians: "philippians",
    colossians: "colossians",
    james: "james",
    hebrews: "hebrews",
    isaiah: "isaiah",
    daniel: "daniel",
    revelation: "revelation",
    christ: "lifeofchrist",
    lifeofchrist: "lifeofchrist",
    "life-of-christ": "lifeofchrist",
  };
  const tool = script?.dataset.tool || hostToolMap[hostTool] || "parables";
  const assetBase = window.location.protocol === "file:" ? "assets/" : "/assets/";
  const logoSrc = `https://mybibleexplorer.com/assets/my-bible-explorer-logo.png?v=mbe-20260715-1`;

  const libraryItems = []; // Filled by the shared menu at https://mybibleexplorer.com/library.js

  const renderLibraryItems = (category) => libraryItems.filter((item) => item.category === category).map((item) => `
            <a class="mbe-library-item" href="${item.href}"${item.tool === tool ? ' aria-current="page"' : ""}>
              <span class="mbe-library-name">${item.name}</span>
            </a>`).join("");

  const libraryMarkup = `<div class="mbe-library-groups">
            <section class="mbe-library-group" aria-labelledby="mbe-books-heading">
              <p class="mbe-library-heading" id="mbe-books-heading">Books of the Bible</p>
              <div class="mbe-library-grid mbe-library-grid-books">${renderLibraryItems("book")}</div>
            </section>
            <section class="mbe-library-group" aria-labelledby="mbe-topics-heading">
              <p class="mbe-library-heading" id="mbe-topics-heading">Topics</p>
              <div class="mbe-library-grid mbe-library-grid-topics">${renderLibraryItems("topic")}</div>
            </section>
          </div>`;

  const headerMarkup = `
    <header class="mbe-global-shell" data-tool="${tool}" data-embedded="true" aria-label="My Bible Explorer ribbon">
      <div class="mbe-shell-wrap">
        <div class="mbe-ribbon-left">
          <a class="mbe-ribbon-brand" href="https://mybibleexplorer.com" aria-label="My Bible Explorer home">
            <img class="mbe-ribbon-logo" src="${logoSrc}" alt="My Bible Explorer" width="107" height="34">
          </a>
          <a class="mbe-ribbon-back" href="https://mybibleexplorer.com/#journeys">Back to Library</a>
        </div>
        <nav class="mbe-global-nav" aria-label="My Bible Explorer">
          <details class="mbe-library-menu">
            <summary class="mbe-library-toggle">Library</summary>
            <div class="mbe-library-panel">
              ${libraryMarkup}
            </div>
          </details>
          <a class="mbe-ribbon-give" href="https://mybibleexplorer.com/#donate">Support</a>
        </nav>
      </div>
    </header>`;

  const footerMarkup = `
    <footer class="mbe-global-footer" data-tool="${tool}">
      <div class="mbe-shell-wrap mbe-footer-wrap">
        <a class="mbe-footer-brand" href="https://mybibleexplorer.com" aria-label="My Bible Explorer home">
          <img class="mbe-footer-logo" src="${logoSrc}" alt="My Bible Explorer" width="107" height="34">
        </a>
        <span>Know the Word. Live the Word.</span>
        <span>To contact, email <a class="mbe-footer-link" href="mailto:admin@mybibleexplorer.com">admin@mybibleexplorer.com</a></span>
        <a class="mbe-footer-link" href="https://mybibleexplorer.com/#donate">Support</a>
        <span>&copy; <span data-mbe-year></span> My Bible Explorer</span>
      </div>
    </footer>`;

  function updateYear() {
    document.querySelectorAll("[data-mbe-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function ensureShell() {
    if (!document.body) return;
    document.body.classList.add("mbe-shell-managed");

    document.querySelectorAll(".mbe-global-shell").forEach((node, index) => {
      if (index > 0 || node.getAttribute("data-tool") !== tool || !node.hasAttribute("data-embedded")) {
        node.remove();
      }
    });

    if (!document.querySelector(`.mbe-global-shell[data-tool="${tool}"][data-embedded="true"]`)) {
      document.body.insertAdjacentHTML("afterbegin", headerMarkup);
    }

    const existingFooters = Array.from(document.querySelectorAll(".mbe-global-footer"));
    let footer = existingFooters.find((node) => node.getAttribute("data-tool") === tool) || null;
    existingFooters.forEach((node) => {
      if (node !== footer) node.remove();
    });

    if (!footer) {
      document.body.insertAdjacentHTML("beforeend", footerMarkup);
      footer = document.querySelector(`.mbe-global-footer[data-tool="${tool}"]`);
    }

    if (footer && footer.parentElement === document.body && footer !== document.body.lastElementChild) {
      document.body.appendChild(footer);
    }

    updateYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureShell, { once: true });
  } else {
    ensureShell();
  }

  window.addEventListener("load", () => {
    ensureShell();
    window.setTimeout(ensureShell, 300);
    window.setTimeout(ensureShell, 1000);
  });
})();

/* Shared Library menu: every study site shows the same list, kept in one file on mybibleexplorer.com. */
(function () {
  if (document.querySelector('script[src^="https://mybibleexplorer.com/library.js"]')) return;
  var s = document.createElement("script");
  s.src = "https://mybibleexplorer.com/library.js";
  s.defer = true;
  document.head.appendChild(s);
})();
