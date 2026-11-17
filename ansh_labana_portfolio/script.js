
/* =========================================
   ANSH LABANA — PORTFOLIO INTERACTIONS
   V1 / METALLIC CRIMSON EDITION
========================================= */

(() => {
  "use strict";

  /* =======================================
     01. HELPERS
  ======================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================
     02. PAGE LOADER
  ======================================= */

  const loader = $(".page-loader");

  const hideLoader = () => {
    loader?.classList.add("is-hidden");
  };

  if (document.readyState === "complete") {
    window.setTimeout(hideLoader, 280);
  } else {
    window.addEventListener(
      "load",
      () => window.setTimeout(hideLoader, 280),
      { once: true }
    );
  }

  // Fallback if an external asset takes too long.
  window.setTimeout(hideLoader, 2500);


  /* =======================================
     03. STICKY NAVIGATION
  ======================================= */

  const header = $(".nav");

  const updateHeader = () => {
    header?.classList.toggle(
      "scrolled",
      window.scrollY > 24
    );
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* =======================================
     04. MOBILE NAVIGATION
  ======================================= */

  const menuButton = $(".menu-toggle");

  const nav =
    $(".main-nav") ||
    $(".nav nav");

  menuButton?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );
    });
  });


  /* =======================================
     05. METALLIC LIQUID CURSOR
  ======================================= */

  const glow = $(".cursor-glow");

  let pointerFrame = null;

  const isDesktopPointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (isDesktopPointer && !prefersReducedMotion) {

    window.addEventListener("pointermove", event => {

      if (event.pointerType === "touch") return;

      if (pointerFrame) {
        cancelAnimationFrame(pointerFrame);
      }

      pointerFrame = requestAnimationFrame(() => {

        const x = event.clientX;
        const y = event.clientY;

        document.documentElement.style.setProperty(
          "--pointer-x",
          `${x}px`
        );

        document.documentElement.style.setProperty(
          "--pointer-y",
          `${y}px`
        );

        if (glow) {
          glow.style.left = `${x}px`;
          glow.style.top = `${y}px`;
        }

      });

    }, { passive: true });

  }


  /* =======================================
     06. GENERATE PIXEL FACE
  ======================================= */

  const heroArt = $(".hero-art");

  const pixelPattern = [
    "000001111100000",
    "000111111111000",
    "001111111111100",
    "011111111111110",
    "011111111111110",
    "111111111111111",
    "111111111111111",
    "111111111111111",
    "111111111111111",
    "111111111111111",
    "011111111111110",
    "011111111111110",
    "001111111111100",
    "000111111111000",
    "000001111100000"
  ];

  const shadowPattern = [
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000",
    "000000000000000"
  ];

  function createPixelFace() {

    if (!heroArt || $(".pixel-face", heroArt)) return;

    const aura = document.createElement("div");
    aura.className = "face-aura";

    const face = document.createElement("div");
    face.className = "pixel-face";
    face.setAttribute("aria-hidden", "true");

    const grid = document.createElement("div");
    grid.className = "pixel-face-grid";

    pixelPattern.forEach((line, rowIndex) => {

      [...line].forEach((pixelValue, columnIndex) => {

        const pixel = document.createElement("span");

        pixel.className = "pixel";

        if (pixelValue === "0") {
          pixel.style.visibility = "hidden";
        }

        // Darker pixels on the lower and right edges.
        if (
          pixelValue === "1" &&
          (rowIndex > 9 || columnIndex > 10)
        ) {
          pixel.classList.add("pixel-shadow");
        }

        // Two bright eyes.
        const isLeftEye =
          rowIndex === 6 &&
          (columnIndex === 4 || columnIndex === 5);

        const isRightEye =
          rowIndex === 6 &&
          (columnIndex === 9 || columnIndex === 10);

        if (isLeftEye || isRightEye) {
          pixel.classList.add("pixel-eye");
        }

        // Add a small mouth.
        if (
          rowIndex === 10 &&
          columnIndex >= 6 &&
          columnIndex <= 8
        ) {
          pixel.classList.add("pixel-eye");
        }

        grid.appendChild(pixel);

      });

    });

    face.appendChild(grid);

    heroArt.appendChild(aura);
    heroArt.appendChild(face);

  }

  createPixelFace();


  /* =======================================
     07. PIXEL FACE SCROLL MOVEMENT
  ======================================= */

  const pixelFace = $(".pixel-face");

  let scrollFrame = null;

  function updatePixelFace() {

    if (!pixelFace || prefersReducedMotion) return;

    const scrollY = window.scrollY;

    const movement = Math.min(scrollY * 0.035, 65);
    const rotation = Math.max(
      -8,
      Math.min(8, scrollY * 0.006)
    );

    pixelFace.style.setProperty(
      "--face-movement",
      `${movement}px`
    );

    pixelFace.style.setProperty(
      "--face-rotation",
      `${rotation}deg`
    );

  }

  window.addEventListener("scroll", () => {

    if (scrollFrame) {
      cancelAnimationFrame(scrollFrame);
    }

    scrollFrame = requestAnimationFrame(updatePixelFace);

  }, { passive: true });

  updatePixelFace();


  /* =======================================
     08. SECTION REVEAL ANIMATION
  ======================================= */

  const revealItems = $$(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealItems.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealItems.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =======================================
     09. TOOLKIT STAGGERED ANIMATION
  ======================================= */

  const toolItems = $$(".tool-list > div");

  toolItems.forEach((item, index) => {

    item.style.setProperty(
      "--tool-delay",
      `${index * 110}ms`
    );

  });

  if ("IntersectionObserver" in window && !prefersReducedMotion) {

    const toolObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("tool-visible");

            toolObserver.unobserve(entry.target);

          }

        });

      },
      { threshold: 0.2 }
    );

    toolItems.forEach(item => {
      toolObserver.observe(item);
    });

  } else {

    toolItems.forEach(item => {
      item.classList.add("tool-visible");
    });

  }


  /* =======================================
     10. SECTION COUNTER
  ======================================= */

  const sections = [
    $(".hero"),
    $(".about"),
    $(".experience"),
    $(".work"),
    $(".toolkit"),
    $(".contact")
  ].filter(Boolean);

  let counterCurrent = null;
  let counterFill = null;
  let counterElement = null;

  function createSectionCounter() {

    if ($(".section-counter")) {
      counterElement = $(".section-counter");
      counterCurrent = $(".counter-current", counterElement);
      counterFill = $(".counter-fill", counterElement);
      return;
    }

    counterElement = document.createElement("div");
    counterElement.className = "section-counter";

    counterElement.setAttribute("aria-label", "Page section progress");

    counterElement.innerHTML = `
      <span class="counter-current">01</span>
      <span class="counter-divider"></span>
      <span class="counter-total">06</span>
      <span class="counter-track">
        <span class="counter-fill"></span>
      </span>
    `;

    document.body.appendChild(counterElement);

    counterCurrent = $(".counter-current", counterElement);
    counterFill = $(".counter-fill", counterElement);

  }

  createSectionCounter();

  function updateSectionCounter(index) {

    if (!counterCurrent || !counterFill) return;

    const current = String(index + 1).padStart(2, "0");

    const total = String(sections.length).padStart(2, "0");

    counterElement.classList.add("counter-changing");

    counterCurrent.textContent = current;

    const totalElement = $(".counter-total", counterElement);

    if (totalElement) {
      totalElement.textContent = total;
    }

    const progress = sections.length > 1
      ? index / (sections.length - 1)
      : 1;

    counterFill.style.transform = `scaleY(${progress})`;

    window.setTimeout(() => {
      counterElement?.classList.remove("counter-changing");
    }, 250);

  }

  if ("IntersectionObserver" in window && sections.length) {

    const counterObserver = new IntersectionObserver(
      entries => {

        const visibleSections = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleSections.length) return;

        const activeSection = visibleSections[0].target;

        const index = sections.indexOf(activeSection);

        if (index !== -1) {
          updateSectionCounter(index);
        }

      },
      {
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-15% 0px -15% 0px"
      }
    );

    sections.forEach(section => {
      counterObserver.observe(section);
    });

  }

  updateSectionCounter(0);


  /* =======================================
     11. PROJECT CARD 3D HOVER
  ======================================= */

  if (isDesktopPointer && !prefersReducedMotion) {

    $$(".project-card").forEach(card => {

      card.addEventListener("pointermove", event => {

        const rect = card.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        card.style.transform = `
          perspective(1000px)
          rotateY(${x * 2}deg)
          rotateX(${-y * 2}deg)
          translateY(-3px)
        `;

      });

      card.addEventListener("pointerleave", () => {
        card.style.transform = "";
      });

    });

  }


  /* =======================================
     12. SMOOTH ANCHOR NAVIGATION
  ======================================= */

  $$('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = $(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

    });

  });


  /* =======================================
     13. CURRENT YEAR
  ======================================= */

  const currentYear = String(new Date().getFullYear());
  $("#currentYear, [data-current-year]").forEach(element => {
    element.textContent = currentYear;
  });


  /* =======================================
     14. INITIALIZE
  ======================================= */

  document.documentElement.classList.add("js-ready");

  console.log(
    "%c ANSH LABANA — PORTFOLIO ",
    "background:#8d0f22;color:white;padding:8px 12px;font-weight:bold;"
  );

  console.log("Portfolio interactions initialized.");

})();
