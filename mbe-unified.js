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

  const libraryItems = [
    {
      name: "Hermeneutics",
      desc: "Learn to read Scripture faithfully",
      href: "https://hermeneutics.mybibleexplorer.com",
      tool: "hermeneutics",
    },
    {
      name: "Psalms",
      desc: "Worship, lament, praise, and prayer",
      href: "https://psalms.mybibleexplorer.com",
      tool: "psalms",
    },
    {
      name: "Sanctuary",
      desc: "A blueprint of salvation",
      href: "https://sanctuary.mybibleexplorer.com/#structure",
      tool: "sanctuary",
    },
    {
      name: "Last Day Events",
      desc: "Earth's final chapter",
      href: "https://lastdayevents.mybibleexplorer.com/index.html",
      tool: "last-day-events",
    },
    {
      name: "Parables",
      desc: "Stories of the kingdom",
      href: "https://parables.mybibleexplorer.com",
      tool: "parables",
    },
    {
      name: "Romans",
      desc: "Righteousness by faith and life in the Spirit",
      href: "https://romans.mybibleexplorer.com",
      tool: "romans",
    },
    {
      name: "Corinthians",
      desc: "Unity, worship, holy living, and resurrection",
      href: "https://corinthians.mybibleexplorer.com/",
      tool: "corinthians",
    },
    {
      name: "Hebrews",
      desc: "Christ, covenant, sanctuary, and persevering faith",
      href: "https://hebrews.mybibleexplorer.com/",
      tool: "hebrews",
    },
    {
      name: "Isaiah",
      desc: "Judgment, comfort, and gospel hope",
      href: "https://isaiah.mybibleexplorer.com/",
      tool: "isaiah",
    },
    {
      name: "Daniel",
      desc: "Prophecy and providence",
      href: "https://daniel.mybibleexplorer.com",
      tool: "daniel",
    },
    {
      name: "Revelation",
      desc: "Symbols, judgment, and final hope",
      href: "https://revelation.mybibleexplorer.com/",
      tool: "revelation",
    },
    {
      name: "Life of Christ",
      desc: "The life and ministry of Jesus",
      href: "https://christ.mybibleexplorer.com/",
      tool: "lifeofchrist",
    }
  ];

  const libraryMarkup = libraryItems.map((item) => `
            <a class="mbe-library-item" href="${item.href}"${item.tool === tool ? ' aria-current="page"' : ""}>
              <span class="mbe-library-name">${item.name}</span>
              <span class="mbe-library-desc">${item.desc}</span>
            </a>`).join("");

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
              <div class="mbe-library-grid">${libraryMarkup}
              </div>
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
