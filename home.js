// SimProof home page motion.
// A particle field that changes shape with each chapter and reacts to the cursor,
// eased scroll, magnetic buttons, a custom cursor, tilting cards, word-by-word
// headlines, a chapter rail, a reading progress bar and counting numbers.
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window);

  // ---------- Headlines: wrap each word so it can slide in ----------
  let wordIndex = 0;
  function wrapWords(node) {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const w = document.createElement("span");
            w.className = "w";
            w.style.setProperty("--n", wordIndex++);
            w.textContent = part;
            frag.appendChild(w);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        wrapWords(child);
      }
    });
  }
  document.querySelectorAll(".reveal").forEach((el) => {
    wordIndex = 0;
    wrapWords(el);
  });

  // ---------- Sections come into view ----------
  const sections = Array.from(document.querySelectorAll("[data-shape]"));
  const seen = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        seen.unobserve(e.target);
      }
    }),
    { threshold: 0.25 }
  );
  sections.forEach((s) => seen.observe(s));

  // ---------- Counting numbers ----------
  const numbers = document.querySelector(".numbers");
  if (numbers) {
    const counted = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      counted.disconnect();
      numbers.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        if (reduceMotion || target === 0) { el.textContent = target + suffix; return; }
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1400, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = "0" + suffix;
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    counted.observe(numbers);
  }

  // ---------- Eased scroll ----------
  // Wheel ticks are accumulated into a target and the page glides toward it, the
  // way Lenis-style sites do. Keyboard, the scrollbar and touch scroll the page
  // natively; whenever that happens the target re-syncs so nothing fights.
  const docEl = document.documentElement;
  let scrollTarget = window.scrollY;
  let lastSetY = window.scrollY; // the value WE last pushed via scrollTo
  const maxScroll = () => Math.max(0, docEl.scrollHeight - window.innerHeight);

  if (finePointer && !reduceMotion) {
    window.addEventListener("wheel", (e) => {
      if (e.ctrlKey) return; // let pinch-zoom through untouched
      e.preventDefault();
      scrollTarget = Math.min(maxScroll(), Math.max(0, scrollTarget + e.deltaY));
    }, { passive: false });
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    const headerOffset = 76;
    const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    scrollTarget = Math.min(maxScroll(), Math.max(0, y));
    if (!finePointer || reduceMotion) {
      window.scrollTo({ top: scrollTarget, behavior: reduceMotion ? "auto" : "smooth" });
    }
    history.replaceState(null, "", "#" + id);
  });

  window.addEventListener("scroll", () => {
    // scrollTo() dispatches its own 'scroll' event on a later frame, after this
    // function's caller has already moved on, so a same-tick flag can't tell
    // our own scroll apart from the user's. Comparing against the last value we
    // set can: anything else (keyboard, scrollbar, touch) means they took over.
    if (Math.abs(window.scrollY - lastSetY) > 1.5) scrollTarget = window.scrollY;
  }, { passive: true });

  // ---------- Progress bar, rail and the active chapter ----------
  const bar = document.getElementById("progress-bar");
  const railLinks = Array.from(document.querySelectorAll("[data-rail]"));
  let activeShape = "drift";

  function updateChrome() {
    const max = maxScroll();
    if (bar) bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";

    const mid = window.innerHeight * 0.5;
    let best = null;
    let bestDist = Infinity;
    sections.forEach((s) => {
      const r = s.getBoundingClientRect();
      const d = r.top <= mid && r.bottom >= mid ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
      if (d < bestDist) { bestDist = d; best = s; }
    });
    if (best) {
      activeShape = best.dataset.shape;
      railLinks.forEach((a) => a.classList.toggle("on", a.dataset.rail === best.id));
    }
  }
  window.addEventListener("scroll", updateChrome, { passive: true });
  window.addEventListener("resize", updateChrome);
  updateChrome();

  // ---------- Magnetic buttons ----------
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn, .rail a").forEach((el) => {
      let raf = null;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${mx * 0.28}px, ${my * 0.32}px)`;
        });
      });
      el.addEventListener("mouseleave", () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
      });
    });
  }

  // ---------- Custom cursor ----------
  let mouseX = -999, mouseY = -999;
  if (finePointer) {
    document.body.classList.add("has-cursor");
    const cursor = document.createElement("div");
    cursor.className = "cursor-dot";
    cursor.setAttribute("aria-hidden", "true");
    document.body.appendChild(cursor);
    let cx = -999, cy = -999;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const over = e.target.closest("a, button, .btn, input, select, textarea, .example, .card");
      cursor.classList.toggle("is-big", Boolean(over));
    }, { passive: true });

    window.addEventListener("mouseleave", () => { mouseX = mouseY = -999; });

    function cursorFrame() {
      const ease = reduceMotion ? 1 : 0.22;
      cx += (mouseX - cx) * ease;
      cy += (mouseY - cy) * ease;
      cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
      requestAnimationFrame(cursorFrame);
    }
    requestAnimationFrame(cursorFrame);
  }

  // ---------- Card tilt ----------
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".card, .example").forEach((el) => {
      el.classList.add("tilt");
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  // ---------- The particle field ----------
  const canvas = document.getElementById("field");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  const COLORS = {
    blue: [42, 91, 246],
    teal: [15, 163, 163],
    amber: [227, 154, 28],
    red: [214, 64, 58],
    green: [31, 154, 92],
    ink: [60, 68, 84],
  };

  let W = 0, H = 0, DPR = 1, particles = [], shapes = {}, lattice = [];

  // Small seeded random so every reload draws the same field.
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  function build() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const narrow = W < 900;
    const count = Math.round(Math.min(900, Math.max(260, (W * H) / 2000)));
    // Where shapes sit: the right side on wide screens, the whole width on phones.
    const x0 = narrow ? W * 0.06 : W * 0.52;
    const x1 = narrow ? W * 0.94 : W * 0.95;
    const y0 = H * 0.16;
    const y1 = H * 0.86;
    const sw = x1 - x0;
    const sh = y1 - y0;

    seed = 7;
    const keep = particles;
    particles = [];
    for (let i = 0; i < count; i++) {
      const old = keep[i];
      particles.push({
        x: old ? old.x : rand() * W,
        y: old ? old.y : rand() * H,
        r: 1.3 + rand() * 2.4,
        ph: rand() * Math.PI * 2,
        sp: 0.4 + rand() * 0.8,
        c: old ? old.c.slice() : COLORS.blue.slice(),
        a: old ? old.a : 0,
        u: rand(), v: rand(), k: rand(),
      });
    }

    // 1. drift: loose scatter over the whole screen
    const drift = particles.map((p) => {
      const pick = p.k < 0.45 ? COLORS.blue : p.k < 0.75 ? COLORS.teal : p.k < 0.9 ? COLORS.amber : COLORS.ink;
      return { x: p.u * W, y: p.v * H, c: pick, a: 0.5 };
    });

    // 2. mesh: a triangle lattice with a few red nodes hiding in it
    const cols = narrow ? 9 : 12;
    const rows = narrow ? 7 : 9;
    const dx = sw / (cols - 1);
    const dy = sh / (rows - 1);
    lattice = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        lattice.push({ x: x0 + c * dx + (r % 2 ? dx / 2 : 0) - dx / 4, y: y0 + r * dy, bad: false });
      }
    }
    [Math.floor(lattice.length * 0.37), Math.floor(lattice.length * 0.71)].forEach((i) => { lattice[i].bad = true; });
    const mesh = particles.map((p, i) => {
      const n = lattice[i % lattice.length];
      const spread = i < lattice.length ? 0 : 6;
      return {
        x: n.x + (p.u - 0.5) * spread,
        y: n.y + (p.v - 0.5) * spread,
        c: n.bad ? COLORS.red : (p.k < 0.6 ? COLORS.blue : COLORS.teal),
        a: n.bad ? 1 : 0.75,
        bad: n.bad,
      };
    });

    // 3. grid: 32 small clusters, one per check. 29 pass, 1 warns, 2 fail.
    const gc = 8, gr = 4;
    const cells = [];
    for (let r = 0; r < gr; r++) {
      for (let c = 0; c < gc; c++) {
        cells.push({ x: x0 + (c + 0.5) * (sw / gc), y: y0 + sh * 0.12 + (r + 0.5) * (sh * 0.76 / gr) });
      }
    }
    const status = cells.map((_, i) => (i === 13 ? "warn" : i === 21 || i === 6 ? "fail" : "pass"));
    const cellR = Math.min(sw / gc, sh / gr) * 0.28;
    const grid = particles.map((p, i) => {
      const ci = i % cells.length;
      const ang = p.u * Math.PI * 2;
      const rad = Math.sqrt(p.v) * cellR;
      const st = status[ci];
      return {
        x: cells[ci].x + Math.cos(ang) * rad,
        y: cells[ci].y + Math.sin(ang) * rad,
        c: st === "fail" ? COLORS.red : st === "warn" ? COLORS.amber : COLORS.green,
        a: st === "pass" ? 0.7 : 1,
      };
    });

    // 4. trace: a report cluster and a source cluster, joined by a stream
    const A = { x: x0 + sw * 0.12, y: y0 + sh * 0.2 };
    const B = { x: x0 + sw * 0.88, y: y0 + sh * 0.8 };
    const trace = particles.map((p) => {
      if (p.k < 0.22) {
        const ang = p.u * Math.PI * 2, rad = Math.sqrt(p.v) * 44;
        return { x: A.x + Math.cos(ang) * rad, y: A.y + Math.sin(ang) * rad, c: COLORS.blue, a: 0.8 };
      }
      if (p.k < 0.44) {
        const ang = p.u * Math.PI * 2, rad = Math.sqrt(p.v) * 44;
        return { x: B.x + Math.cos(ang) * rad, y: B.y + Math.sin(ang) * rad, c: COLORS.teal, a: 0.8 };
      }
      return { stream: true, c: p.k < 0.75 ? COLORS.blue : COLORS.teal, a: 0.55, A, B };
    });

    shapes = { drift, mesh, grid, trace };
  }

  function streamPoint(t, A, B, wobble) {
    // A gentle S curve from the report to the source file.
    const cx1 = A.x + (B.x - A.x) * 0.15, cy1 = B.y;
    const cx2 = A.x + (B.x - A.x) * 0.85, cy2 = A.y;
    const mt = 1 - t;
    return {
      x: mt * mt * mt * A.x + 3 * mt * mt * t * cx1 + 3 * mt * t * t * cx2 + t * t * t * B.x,
      y: mt * mt * mt * A.y + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * B.y + wobble,
    };
  }

  const REPEL_R = 130;
  const REPEL_R2 = REPEL_R * REPEL_R;

  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const time = now / 1000;

    // Eased scroll: glide window.scrollY toward scrollTarget.
    const diff = scrollTarget - window.scrollY;
    if (finePointer && !reduceMotion && Math.abs(diff) > 0.5) {
      lastSetY = window.scrollY + diff * Math.min(1, dt * 9);
      // behavior: "instant" bypasses the page's CSS scroll-behavior: smooth.
      // Without it, the browser's own ~300ms eased scroll fights this loop's
      // easing on every frame and the page stalls partway to its target.
      window.scrollTo({ top: lastSetY, left: 0, behavior: "instant" });
    }

    ctx.clearRect(0, 0, W, H);

    const target = shapes[activeShape] || shapes.drift;
    const ease = reduceMotion ? 1 : 1 - Math.pow(0.0009, dt);

    // Faint lattice edges while the mesh is showing.
    if (activeShape === "mesh") {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(42, 91, 246, 0.08)";
      ctx.beginPath();
      const cols = W < 900 ? 9 : 12;
      for (let i = 0; i < lattice.length; i++) {
        const n = lattice[i];
        const right = (i + 1) % cols !== 0 ? lattice[i + 1] : null;
        const down = lattice[i + cols];
        if (right) { ctx.moveTo(n.x, n.y); ctx.lineTo(right.x, right.y); }
        if (down) { ctx.moveTo(n.x, n.y); ctx.lineTo(down.x, down.y); }
      }
      ctx.stroke();
    }

    const repel = finePointer && !reduceMotion && mouseY > -500;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const t = target[i];
      let tx, ty;
      if (t.stream) {
        const s = (p.u + time * 0.08 * p.sp) % 1;
        const pt = streamPoint(s, t.A, t.B, Math.sin(time * p.sp + p.ph) * 10 * (p.v - 0.5) * 2);
        tx = pt.x; ty = pt.y;
      } else {
        const sway = activeShape === "drift" ? 26 : 3;
        tx = t.x + (reduceMotion ? 0 : Math.sin(time * 0.6 * p.sp + p.ph) * sway);
        ty = t.y + (reduceMotion ? 0 : Math.cos(time * 0.5 * p.sp + p.ph) * sway);
      }
      p.x += (tx - p.x) * ease;
      p.y += (ty - p.y) * ease;
      for (let j = 0; j < 3; j++) p.c[j] += (t.c[j] - p.c[j]) * ease;
      p.a += (t.a - p.a) * ease;

      // The field leans away from the cursor, like iron filings near a magnet.
      if (repel) {
        const ddx = p.x - mouseX, ddy = p.y - mouseY;
        const d2 = ddx * ddx + ddy * ddy;
        if (d2 < REPEL_R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / REPEL_R) * 34;
          p.x += (ddx / d) * push;
          p.y += (ddy / d) * push;
        }
      }

      let r = p.r;
      if (t.bad && !reduceMotion) r *= 1.4 + Math.sin(time * 4 + p.ph) * 0.4;
      ctx.fillStyle = `rgba(${p.c[0] | 0}, ${p.c[1] | 0}, ${p.c[2] | 0}, ${p.a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (!reduceMotion || Math.abs(diff) > 0.5) requestAnimationFrame(frame);
  }

  build();
  window.addEventListener("resize", () => {
    build();
    scrollTarget = window.scrollY;
    if (reduceMotion) requestAnimationFrame(frame);
  });
  if (reduceMotion) {
    window.addEventListener("scroll", () => requestAnimationFrame(frame), { passive: true });
  }
  requestAnimationFrame(frame);
})();
