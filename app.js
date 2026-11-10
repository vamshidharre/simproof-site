// SimProof website.
// Everything shown in the hero, the demo and the terminal is real SimProof 0.1.0 output for the
// synthetic test model in tests/fixtures/pulsed_static (no client data).

const DECK_SHA = "84e4538f82591955";
const DECK_FILE = "tests/fixtures/pulsed_static/ds.dat";
const OUT_SHA = "004559a8d280e1d3";
const OUT_FILE = "tests/fixtures/pulsed_static/solve.out";

// Rows of the report's evidence appendix. `quoted` is the text the report prints next to the tag.
const EVIDENCE = {
  E1: { name: "Temperature Constraint applied at solve time", value: "35.0", unit: "°C", quoted: "35.00", location: "table _loadvari10, line 29; evaluated at t=0.012", line: 29, atSolve: true },
  E2: { name: "Temperature Constraint time-average", value: "34.854166666666664", unit: "°C", quoted: "34.85", location: "table _loadvari10, line 29; averaged over t=0..0.012", line: 29 },
  E3: { name: "Temperature Constraint peak", value: "35.0", unit: "°C", quoted: "35.00", location: "table _loadvari10, line 29; extreme over t=0..0.012", line: 29 },
  E4: { name: "Heat Flow applied at solve time", value: "100.0", unit: "mW/mm^2", quoted: "100.0", location: "table _loadvari11, line 43; evaluated at t=0.012", line: 43, atSolve: true },
  E5: { name: "Heat Flow time-average", value: "50.83333333333333", unit: "mW/mm^2", quoted: "50.83", location: "table _loadvari11, line 43; averaged over t=0..0.012", line: 43 },
  E6: { name: "Heat Flow peak", value: "100.0", unit: "mW/mm^2", quoted: "100.0", location: "table _loadvari11, line 43; extreme over t=0..0.012", line: 43 },
  E7: { name: "Heat Flow 2 applied at solve time", value: "0.0", unit: "mW/mm^2", quoted: "0.000", location: "table _loadvari12, line 63; evaluated at t=0.012", line: 63, atSolve: true },
  E8: { name: "Heat Flow 2 time-average", value: "33.333333333333336", unit: "mW/mm^2", quoted: "33.33", location: "table _loadvari12, line 63; averaged over t=0..0.012", line: 63 },
  E9: { name: "Heat Flow 2 peak", value: "80.0", unit: "mW/mm^2", quoted: "80.00", location: "table _loadvari12, line 63; extreme over t=0..0.012", line: 63 },
  E10: { name: "declared result request", value: "1.0", unit: "requests", quoted: "1.000", location: "SOLVE at line 116", line: 116 },
  E11: { name: "available result sets", value: "0.0", unit: "sets", quoted: "0.000", location: "run output present; no sibling file.rth or file.rst", file: OUT_FILE, sha: OUT_SHA },
  E12: { name: "requested endpoint time", value: "0.012", unit: "solver_time", quoted: "0.01200", location: "TIME active at SOLVE, line 116", line: 116, atSolve: true },
  E13: { name: "missing declared requests", value: "1.0", unit: "requests", quoted: "1.000", location: "run output present; no sibling file.rth or file.rst", file: OUT_FILE, sha: OUT_SHA },
  E14: { name: "missing requested substeps", value: "0.0", unit: "sets", quoted: "0.000", location: "run output present; no sibling file.rth or file.rst", file: OUT_FILE, sha: OUT_SHA },
  E15: { name: "unreadable declared requests", value: "0.0", unit: "requests", quoted: "0.000", location: "run output present; no sibling file.rth or file.rst", file: OUT_FILE, sha: OUT_SHA },
};

// The checks table of the generated report, in report order. The 23 skipped rows are summarised in the last entry.
const FINDINGS = [
  { status: "warn", title: "Solver errors and warnings", message: "2 solver warning(s) to review: extracted warning count (0) differs from summary count (2) in 'tests\\fixtures\\pulsed_static\\solve.out'." },
  { status: "pass", title: "Unit system known", message: "MPA units; temperatures in °C." },
  { status: "pass", title: "Thermal reference boundary present", message: "Parsed 2 thermal boundary condition(s): convection, temperature." },
  { status: "pass", title: "Defined loads are non-zero", message: "4 applicable parsed load(s) are non-zero." },
  { status: "pass", title: "Time-varying loads in a static solve", message: "'Temperature Constraint' at t=0.012 matches its time-average within tolerance.", evidence: ["E1", "E2", "E3"] },
  { status: "warn", title: "Time-varying loads in a static solve", message: "'Heat Flow' is applied at its t=0.012 value, which differs from its time-average by more than 5% of peak. Confirm which one is intended.", evidence: ["E4", "E5", "E6"] },
  { status: "fail", title: "Time-varying loads in a static solve", message: "'Heat Flow 2' is OFF at the solve time t=0.012: the static solve applies zero although the load is non-zero at other times. If an averaged load is intended, apply the time-average instead.", evidence: ["E7", "E8", "E9"] },
  { status: "pass", title: "Solver reports converged load steps", message: "No explicit non-convergence diagnostic was found in the read solver output." },
  { status: "warn", title: "Result fields read", message: "No result fields available (No result file (file.rth / file.rst); result fields not read.)." },
  { status: "fail", title: "Requested result sets are present and readable", message: "Declared result sets are missing from the observed inventory.", evidence: ["E10", "E11", "E12", "E13", "E14", "E15"] },
  { status: "skip", title: "23 more checks skipped", message: "Each states why: structural, modal and transient checks do not apply to a steady-state thermal model, and the result checks have no result file to read." },
];

// Lines of ds.dat shown in the deck viewer. null marks skipped lines.
const DECK_LINES = [
  [29, "*DIM,_loadvari10,TABLE,3,1,1,TIME, , ,0"],
  [30, "! Time values"],
  [31, "*TAXIS,_loadvari10(1),1,0.,1.e-004,1."],
  [32, "! Load values"],
  [33, "_loadvari10(1,1,1) = 0."],
  [34, "_loadvari10(2,1,1) = 35."],
  [35, "_loadvari10(3,1,1) = 35."],
  null,
  [43, "*DIM,_loadvari11,TABLE,9,1,1,TIME, , , 0"],
  [44, "! Time values"],
  [45, "*TAXIS,_loadvari11(1),1,0.,4.e-003,4.1e-003,9.9e-003,1.e-002,1.4e-002,1.41e-002,1.99e-002,2.e-002"],
  [46, "! Load values"],
  [47, "_loadvari11(1,1,1) = 100."],
  [48, "_loadvari11(2,1,1) = 100."],
  [49, "_loadvari11(3,1,1) = 0."],
  [50, "_loadvari11(4,1,1) = 0."],
  [51, "_loadvari11(5,1,1) = 100."],
  [52, "_loadvari11(6,1,1) = 100."],
  [53, "_loadvari11(7,1,1) = 0."],
  [54, "_loadvari11(8,1,1) = 0."],
  [55, "_loadvari11(9,1,1) = 100."],
  null,
  [63, "*DIM,_loadvari12,TABLE,6,1,1,TIME, , , 0"],
  [64, "! Time values"],
  [65, "*TAXIS,_loadvari12(1),1,0.,4.9e-003,5.e-003,9.9e-003,1.e-002,2.e-002"],
  [66, "! Load values"],
  [67, "_loadvari12(1,1,1) = 0."],
  [68, "_loadvari12(2,1,1) = 0."],
  [69, "_loadvari12(3,1,1) = 80."],
  [70, "_loadvari12(4,1,1) = 80."],
  [71, "_loadvari12(5,1,1) = 0."],
  [72, "_loadvari12(6,1,1) = 0."],
  null,
  [97, "antype,0                   ! static analysis"],
  null,
  [115, "time,1.2e-002"],
  [116, "solve"],
];
const SOLVE_TIME_LINE = 115;

document.addEventListener("DOMContentLoaded", () => {
  initScope();
  initDemo();
  initTerminal();
  initContactForm();
  initCopyButtons();
});

// ---------- Hero: sweep the solve cursor along the load table ----------

// Heat Flow 2, *TAXIS and values from ds.dat lines 65-72. MAPDL interpolates tables linearly.
const HF2_TIMES = [0, 0.0049, 0.005, 0.0099, 0.01, 0.02];
const HF2_VALUES = [0, 0, 80, 80, 0, 0];
const SOLVE_T = 0.012;

const plotX = (t) => 52 + (t / 0.02) * 528;
const plotY = (v) => 250 - v * 2.22;

function tableValue(t) {
  for (let i = 1; i < HF2_TIMES.length; i++) {
    if (t <= HF2_TIMES[i]) {
      const t0 = HF2_TIMES[i - 1];
      const t1 = HF2_TIMES[i];
      const f = (t - t0) / (t1 - t0);
      return HF2_VALUES[i - 1] + f * (HF2_VALUES[i] - HF2_VALUES[i - 1]);
    }
  }
  return HF2_VALUES[HF2_VALUES.length - 1];
}

function initScope() {
  const cursor = document.getElementById("scope-cursor");
  const label = document.getElementById("scope-cursor-label");
  const dot = document.getElementById("scope-dot");
  const readout = document.getElementById("scope-readout");
  const verdict = document.getElementById("scope-verdict");
  const replay = document.getElementById("scope-replay");
  if (!cursor || !dot || !readout || !verdict) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = null;
  let fallback = null;

  function draw(t, final) {
    const x = plotX(t);
    const v = tableValue(t);
    cursor.setAttribute("transform", `translate(${x.toFixed(2)} 0)`);
    dot.setAttribute("cx", x.toFixed(2));
    dot.setAttribute("cy", plotY(v).toFixed(2));
    label.textContent = final ? "solve, t = 0.012 s" : `t = ${t.toFixed(4)} s`;
    readout.textContent = `${v.toFixed(3)} mW/mm² at t = ${t.toFixed(4)} s`;
  }

  function land() {
    cancelAnimationFrame(frame);
    clearTimeout(fallback);
    draw(SOLVE_T, true);
    verdict.classList.remove("is-waiting");
    dot.classList.remove("is-landed");
    void dot.getBoundingClientRect();
    dot.classList.add("is-landed");
  }

  function play() {
    cancelAnimationFrame(frame);
    if (reduceMotion) {
      land();
      return;
    }
    verdict.classList.add("is-waiting");
    const duration = 2600;
    const delay = 350;
    let start = null;
    const step = (now) => {
      if (start === null) start = now;
      const elapsed = now - start - delay;
      const p = Math.min(Math.max(elapsed / duration, 0), 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      if (p < 1) {
        draw(eased * SOLVE_T, false);
        frame = requestAnimationFrame(step);
      } else {
        land();
      }
    };
    frame = requestAnimationFrame(step);
    // Browsers pause animation frames in hidden tabs; never leave the verdict hidden.
    clearTimeout(fallback);
    fallback = setTimeout(land, delay + duration + 800);
  }

  if (replay) replay.addEventListener("click", play);
  play();
}

// ---------- Demo: report findings, evidence record, deck lines ----------

const STATUS_LABEL = { pass: "Pass", warn: "Warn", fail: "Fail", skip: "Skip" };

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function initDemo() {
  const list = document.getElementById("findings");
  const deck = document.getElementById("deck");
  if (!list || !deck) return;

  list.innerHTML = FINDINGS.map((f) => {
    const evidence = (f.evidence || []).map((id) => {
      const ev = EVIDENCE[id];
      return `<li>${escapeHtml(ev.name)}: <span class="quoted">${escapeHtml(ev.quoted)} ${escapeHtml(ev.unit)}</span> <button class="tag" type="button" data-ev="${id}" aria-pressed="false">[${id}]</button></li>`;
    }).join("");
    return `
      <li class="finding">
        <span class="chip chip-${f.status}">${STATUS_LABEL[f.status]}</span>
        <div>
          <div class="finding-title">${escapeHtml(f.title)}</div>
          <p class="finding-message">${escapeHtml(f.message)}</p>
          ${evidence ? `<ul class="finding-evidence">${evidence}</ul>` : ""}
        </div>
      </li>`;
  }).join("");

  deck.innerHTML = DECK_LINES.map((row) => {
    if (row === null) return `<span class="deck-line is-gap"><span class="ln">…</span></span>`;
    const [n, text] = row;
    return `<span class="deck-line" data-line="${n}"><span class="ln">${n}</span>${escapeHtml(text)}</span>`;
  }).join("");

  document.addEventListener("click", (e) => {
    const tag = e.target.closest(".tag[data-ev]");
    if (!tag) return;
    const id = tag.getAttribute("data-ev");
    showEvidence(id);
    if (tag.hasAttribute("data-jump")) {
      document.getElementById("demo").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  });

  showEvidence("E7", { scrollDeck: false });
}

function showEvidence(id, { scrollDeck = true } = {}) {
  const ev = EVIDENCE[id];
  if (!ev) return;

  document.querySelectorAll("#findings .tag").forEach((t) => {
    t.setAttribute("aria-pressed", String(t.getAttribute("data-ev") === id));
  });

  document.getElementById("ev-heading").textContent = `Evidence ${id}`;
  document.getElementById("ev-record").innerHTML = `
    <dt>Quantity</dt><dd>${escapeHtml(ev.name)}</dd>
    <dt>Value</dt><dd class="mono">${escapeHtml(ev.value)}</dd>
    <dt>Unit</dt><dd class="mono">${escapeHtml(ev.unit)}</dd>
    <dt>Source file</dt><dd class="mono">${ev.file || DECK_FILE}</dd>
    <dt>Location</dt><dd class="mono">${escapeHtml(ev.location)}</dd>
    <dt>SHA-256</dt><dd class="mono">${ev.sha || DECK_SHA}</dd>`;

  document.getElementById("ev-verify").innerHTML =
    `The report quotes <strong>${escapeHtml(ev.quoted)}</strong>. Rounded to the same precision, the evidence value ` +
    `${escapeHtml(ev.value)} gives the same number, so <code>simproof verify</code> passes this tag.`;

  const deck = document.getElementById("deck");
  let cited = null;
  deck.querySelectorAll(".deck-line[data-line]").forEach((line) => {
    const n = Number(line.getAttribute("data-line"));
    line.classList.toggle("is-cited", n === ev.line);
    line.classList.toggle("is-related", Boolean(ev.atSolve) && n === SOLVE_TIME_LINE);
    if (n === ev.line) cited = line;
  });

  if (cited && scrollDeck) {
    deck.scrollTo({ top: cited.offsetTop - deck.offsetTop - 12, behavior: "smooth" });
  } else if (cited) {
    deck.scrollTop = cited.offsetTop - deck.offsetTop - 12;
  }
}

// ---------- Terminal ----------

const cmd = (s) => `<span class="t-cmd">${s}</span>`;
const dim = (s) => `<span class="t-dim">${s}</span>`;
const st = (kind, s) => `<span class="t-${kind}">${s}</span>`;
const tg = (s) => `<span class="t-tag">${s}</span>`;

const TERMINAL = {
  check: [
    cmd("simproof check tests/fixtures/pulsed_static"),
    "",
    "== pulsed_static: Pulsed heat test--Steady-State Thermal (A5) (thermal, static)",
    dim("  # 23 [skip] lines and the reader notes are left out here; each skip states its reason."),
    `  ${st("warn", "[WARN]")} solver_messages: 2 solver warning(s) to review: extracted warning count (0) differs from summary count (2) in 'tests\\fixtures\\pulsed_static\\solve.out'.`,
    `  ${st("pass", "[PASS]")} unit_system: MPA units; temperatures in °C.`,
    `  ${st("pass", "[PASS]")} thermal_boundary_present: Parsed 2 thermal boundary condition(s): convection, temperature.`,
    `  ${st("pass", "[PASS]")} zero_load: 4 applicable parsed load(s) are non-zero.`,
    `  ${st("pass", "[PASS]")} static_time_dependent_load: 'Temperature Constraint' at t=0.012 matches its time-average within tolerance.`,
    `         Temperature Constraint applied at solve time: 35 °C ${tg("[E1]")}`,
    `         Temperature Constraint time-average: 34.8542 °C ${tg("[E2]")}`,
    `         Temperature Constraint peak: 35 °C ${tg("[E3]")}`,
    `  ${st("warn", "[WARN]")} static_time_dependent_load: 'Heat Flow' is applied at its t=0.012 value, which differs from its time-average by more than 5% of peak. Confirm which one is intended.`,
    `         Heat Flow applied at solve time: 100 mW/mm^2 ${tg("[E4]")}`,
    `         Heat Flow time-average: 50.8333 mW/mm^2 ${tg("[E5]")}`,
    `         Heat Flow peak: 100 mW/mm^2 ${tg("[E6]")}`,
    `  ${st("fail", "[FAIL]")} static_time_dependent_load: 'Heat Flow 2' is OFF at the solve time t=0.012: the static solve applies zero although the load is non-zero at other times. If an averaged load is intended, apply the time-average instead.`,
    `         Heat Flow 2 applied at solve time: 0 mW/mm^2 ${tg("[E7]")}`,
    `         Heat Flow 2 time-average: 33.3333 mW/mm^2 ${tg("[E8]")}`,
    `         Heat Flow 2 peak: 80 mW/mm^2 ${tg("[E9]")}`,
    `  ${st("pass", "[PASS]")} solver_convergence: No explicit non-convergence diagnostic was found in the read solver output.`,
    `  ${st("warn", "[WARN]")} results_available: No result fields available (No result file (file.rth / file.rst); result fields not read.).`,
    `  ${st("fail", "[FAIL]")} result_set_completeness: Declared result sets are missing from the observed inventory.`,
    `         declared result request: 1 requests ${tg("[E10]")}`,
    `         available result sets: 0 sets ${tg("[E11]")}`,
    `         requested endpoint time: 0.012 solver_time ${tg("[E12]")}`,
    `         missing declared requests: 1 requests ${tg("[E13]")}`,
    `         missing requested substeps: 0 sets ${tg("[E14]")}`,
    `         unreadable declared requests: 0 requests ${tg("[E15]")}`,
  ],
  report: [
    cmd("simproof report tests/fixtures/pulsed_static -o report.md"),
    "",
    "{",
    '  "path": "report.md",',
    '  "verification": {',
    `    "ok": ${st("pass", "true")},`,
    '    "tagged_values": 16,',
    '    "mismatches": [],',
    '    "unknown_ids": [],',
    '    "untraced_values": [],',
    `    "appendix_intact": ${st("pass", "true")},`,
    '    "appendix_reason": ""',
    "  },",
    '  "notes": [],',
    '  "manifest": "report.md.evidence.json"',
    "}",
    "",
    dim("# The report is verified as it is written. Every number in it carries an [E#] tag,"),
    dim("# and its evidence appendix lists file, location and SHA-256 for each tag."),
  ],
  verify: [
    dim("# Later, after the report has been edited and passed around:"),
    cmd("simproof verify report.md"),
    "",
    "{",
    `  "ok": ${st("pass", "true")},`,
    '  "tagged_values": 16,',
    '  "mismatches": [],',
    '  "unknown_ids": [],',
    '  "untraced_values": [],',
    `  "appendix_intact": ${st("pass", "true")},`,
    '  "appendix_reason": ""',
    "}",
    "",
    dim("# A changed number shows up under mismatches; a number with no tag under untraced_values."),
  ],
  mcp: [
    dim("# Coming later: SimProof is not available to install yet."),
    dim("# During the free check we run it for you. Once released:"),
    cmd("claude mcp add simproof -- simproof-mcp"),
    "",
    dim("# Then ask in plain language, for example:"),
    "> Open C:\\sims\\heatsink\\dp0, run the checks and tell me",
    "  whether the steady-state models can be trusted.",
    "",
    dim("# Claude calls open_study, run_checks and build_report. Every number"),
    dim("# it quotes comes from SimProof, with its [E#] tag, so you can check it."),
  ],
};

// ---------- llm-ui: Streaming AI Agent Simulation Auditor ----------

const LLM_SCENARIOS = {
  pulsed: {
    id: "pulsed",
    title: "Pulsed thermal load",
    prompt: "Open tests/fixtures/pulsed_static and verify whether the steady-state thermal solve can be trusted.",
    tools: [
      {
        name: "open_study",
        args: 'path="tests/fixtures/pulsed_static"',
        result: "Loaded ds.dat (Ansys MAPDL Steady-State Thermal, 28,420 nodes)",
        status: "pass"
      },
      {
        name: "run_checks",
        args: 'checks=["unit_system", "static_time_dependent_load", "force_balance"]',
        result: "32 checks evaluated: 5 PASS, 3 WARN, 2 FAIL",
        status: "fail"
      }
    ],
    paragraphsBefore: [
      "The steady-state thermal solve <strong>cannot be trusted</strong> for heat dissipation sizing."
    ],
    finding: {
      status: "fail",
      title: "static_time_dependent_load: 'Heat Flow 2' is OFF at solve time t=0.012 s",
      items: [
        'Applied at solve instant: <strong class="mono">0.000 mW/mm²</strong> <button class="tag" data-ev="E7" data-jump>[E7]</button>',
        'Step time-average: <strong class="mono">33.33 mW/mm²</strong> <button class="tag" data-ev="E8" data-jump>[E8]</button>',
        'Peak load in table: <strong class="mono">80.00 mW/mm²</strong> <button class="tag" data-ev="E9" data-jump>[E9]</button>'
      ]
    },
    paragraphsAfter: [
      "The steady solve evaluated this load only at <code>t = 0.012 s</code>, where it is zero. Over the load step, the part absorbed a time-average of 33.33 mW/mm² [E8]. Applying zero under-predicts peak operating temperatures.",
      "<strong>Recommendation:</strong> Apply the time-average flux (33.33 mW/mm² [E8]) in <code>ds.dat</code> line 63, or switch to a transient thermal solve in MAPDL."
    ]
  },
  balance: {
    id: "balance",
    title: "Cantilever balance",
    prompt: "Check tests/fixtures/cantilever_beam.inp for static force equilibrium and reaction balance.",
    tools: [
      {
        name: "open_study",
        args: 'path="tests/fixtures/cantilever_beam"',
        result: "Loaded beam.inp (CalculiX static structural, 1,240 elements)",
        status: "pass"
      },
      {
        name: "run_checks",
        args: 'checks=["force_balance", "moment_balance", "strain_energy"]',
        result: "Global equilibrium checks: 3 PASS, 0 FAIL",
        status: "pass"
      }
    ],
    paragraphsBefore: [
      "The static structural solve <strong>satisfies global force and energy balance</strong>."
    ],
    finding: {
      status: "pass",
      title: "force_balance & strain_energy: Global equilibrium verified",
      items: [
        'Applied tip load: <strong class="mono">1000.0 N</strong> (downward force)',
        'Support reaction force: <strong class="mono">1000.0 N</strong> (upward reaction)',
        'Net force residual: <strong class="mono">0.000 %</strong> (tolerance: 0.1 %)'
      ]
    },
    paragraphsAfter: [
      "External work <code>1/2 W</code> matches internal elastic strain energy <code>U</code> within 0.04%. Material values (E = 210 GPa, ν = 0.3) and boundary conditions pass all setup checks.",
      "<strong>Sign-off status:</strong> Model passes deterministic balance criteria and is eligible for report sign-off."
    ]
  },
  modal: {
    id: "modal",
    title: "Unconstrained modal BC",
    prompt: "Audit tests/fixtures/bracket_modal.bdf before submitting the HPC cluster job.",
    tools: [
      {
        name: "open_study",
        args: 'path="tests/fixtures/bracket_modal"',
        result: "Loaded bracket.bdf (Nastran SOL 103 Modal, 64,110 DOFs)",
        status: "pass"
      },
      {
        name: "run_checks",
        args: 'checks=["displacement_constraints", "density_check"]',
        result: "Pre-solve audit: 1 FAIL, 1 PASS",
        status: "fail"
      }
    ],
    paragraphsBefore: [
      "The model has a <strong>critical pre-solve setup mistake</strong> that will waste cluster compute:"
    ],
    finding: {
      status: "fail",
      title: "displacement_constraints: Zero SPC constraints detected",
      items: [
        'Rigid-body modes: <strong class="mono">6 unconstrained DOFs (0.00 Hz)</strong>',
        'Mass matrix: <strong class="mono">Consistent mass generated from RHO</strong>',
        'Boundary supports: <strong class="mono">0 fixed nodes in SPC / SPC1 cards</strong>'
      ]
    },
    paragraphsAfter: [
      "Because the bracket has no fixed boundary condition, the Lanczos eigensolver will extract 6 rigid-body modes instead of the flexible structural modes.",
      "<strong>Action required:</strong> Constrain the bolt holes with SPC1 cards before submitting to the cluster queue."
    ]
  }
};

let currentScenarioId = "pulsed";
let activeStreamTimer = null;

function runLlmStream(scenarioId) {
  if (activeStreamTimer) {
    clearTimeout(activeStreamTimer);
    activeStreamTimer = null;
  }

  currentScenarioId = scenarioId;
  const scenario = LLM_SCENARIOS[scenarioId] || LLM_SCENARIOS.pulsed;
  const container = document.getElementById("llm-chat-stream");
  if (!container) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Render static initial structure: User message
  container.innerHTML = `
    <div class="llm-msg-user">
      <span class="llm-user-badge">User</span>
      <span class="llm-user-prompt">&gt; ${escapeHtml(scenario.prompt)}</span>
    </div>
    <div class="llm-msg-assistant" id="llm-assistant-msg"></div>
  `;

  const assistantMsg = document.getElementById("llm-assistant-msg");

  if (reducedMotion) {
    // Instant rendering without animation
    let toolsHtml = scenario.tools.map(t => `
      <div class="llm-tool-card">
        <div class="llm-tool-head">
          <span class="llm-tool-icon">⚙</span>
          <span>simproof:<span class="tool-name">${escapeHtml(t.name)}</span>(${escapeHtml(t.args)})</span>
        </div>
        <div class="llm-tool-result ${t.status === "fail" ? "has-fail" : ""}">✓ ${escapeHtml(t.result)}</div>
      </div>
    `).join("");

    let findingHtml = `
      <div class="llm-finding-card ${scenario.finding.status}">
        <div class="llm-finding-header">
          <span class="chip chip-${scenario.finding.status}">${scenario.finding.status.toUpperCase()}</span>
          <span>${escapeHtml(scenario.finding.title)}</span>
        </div>
        <ul class="llm-finding-list">
          ${scenario.finding.items.map(it => `<li>• ${it}</li>`).join("")}
        </ul>
      </div>
    `;

    assistantMsg.innerHTML = `
      ${toolsHtml}
      <div class="llm-response-content">
        ${scenario.paragraphsBefore.map(p => `<p>${p}</p>`).join("")}
        ${findingHtml}
        ${scenario.paragraphsAfter.map(p => `<p>${p}</p>`).join("")}
      </div>
    `;
    container.scrollTop = container.scrollHeight;
    return;
  }

  // Animated llm-ui token stream
  let toolIndex = 0;

  function renderNextTool() {
    if (toolIndex < scenario.tools.length) {
      const tool = scenario.tools[toolIndex];
      const toolCard = document.createElement("div");
      toolCard.className = "llm-tool-card";
      toolCard.innerHTML = `
        <div class="llm-tool-head">
          <span class="llm-tool-icon">⚙</span>
          <span>simproof:<span class="tool-name">${escapeHtml(tool.name)}</span>(${escapeHtml(tool.args)})</span>
        </div>
        <div class="llm-tool-result running" id="tool-res-${toolIndex}">...executing check</div>
      `;
      assistantMsg.appendChild(toolCard);
      container.scrollTop = container.scrollHeight;

      activeStreamTimer = setTimeout(() => {
        const resEl = document.getElementById(`tool-res-${toolIndex}`);
        if (resEl) {
          resEl.className = `llm-tool-result ${tool.status === "fail" ? "has-fail" : ""}`;
          resEl.innerHTML = `✓ ${escapeHtml(tool.result)}`;
        }
        toolIndex++;
        activeStreamTimer = setTimeout(renderNextTool, 180);
      }, 320);
    } else {
      // Tools completed: start streaming markdown and custom components
      startTextStreaming();
    }
  }

  function startTextStreaming() {
    const contentBox = document.createElement("div");
    contentBox.className = "llm-response-content";
    assistantMsg.appendChild(contentBox);

    // Prepare steps
    const steps = [];
    scenario.paragraphsBefore.forEach(p => steps.push({ type: "text", html: p }));
    steps.push({ type: "component", finding: scenario.finding });
    scenario.paragraphsAfter.forEach(p => steps.push({ type: "text", html: p }));

    let stepIndex = 0;

    function renderNextStep() {
      if (stepIndex >= steps.length) {
        // Stream completed
        const cursor = contentBox.querySelector(".llm-cursor");
        if (cursor) cursor.remove();
        return;
      }

      const currentStep = steps[stepIndex];
      if (currentStep.type === "component") {
        const finding = currentStep.finding;
        const findingCard = document.createElement("div");
        findingCard.className = `llm-finding-card ${finding.status}`;
        findingCard.innerHTML = `
          <div class="llm-finding-header">
            <span class="chip chip-${finding.status}">${finding.status.toUpperCase()}</span>
            <span>${escapeHtml(finding.title)}</span>
          </div>
          <ul class="llm-finding-list">
            ${finding.items.map(it => `<li>• ${it}</li>`).join("")}
          </ul>
        `;
        contentBox.appendChild(findingCard);
        container.scrollTop = container.scrollHeight;
        stepIndex++;
        activeStreamTimer = setTimeout(renderNextStep, 200);
      } else {
        // Text paragraph: stream words
        const p = document.createElement("p");
        contentBox.appendChild(p);

        // Split HTML tokens smoothly
        const tokens = currentStep.html.split(" ");
        let tokenIndex = 0;

        function streamToken() {
          if (tokenIndex < tokens.length) {
            tokenIndex++;
            p.innerHTML = tokens.slice(0, tokenIndex).join(" ") + '<span class="llm-cursor" aria-hidden="true"></span>';
            container.scrollTop = container.scrollHeight;
            const delay = tokens[tokenIndex - 1]?.endsWith(".") ? 45 : 18;
            activeStreamTimer = setTimeout(streamToken, delay);
          } else {
            p.innerHTML = currentStep.html; // Clean final tokens
            stepIndex++;
            activeStreamTimer = setTimeout(renderNextStep, 100);
          }
        }
        streamToken();
      }
    }

    renderNextStep();
  }

  renderNextTool();
}

function initTerminal() {
  const body = document.getElementById("terminal-body");
  const llmContainer = document.getElementById("llm-ui-container");
  const actions = document.getElementById("terminal-actions");
  const tabs = Array.from(document.querySelectorAll(".terminal-tabs [role=tab]"));
  const replayBtn = document.getElementById("stream-replay-btn");
  const presetPills = Array.from(document.querySelectorAll(".preset-pill"));

  if (!tabs.length) return;

  function select(tab, focus) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });

    const term = tab.dataset.term;
    if (term === "mcp") {
      if (body) body.hidden = true;
      if (llmContainer) llmContainer.hidden = false;
      if (actions) actions.hidden = false;
      // Start llm-ui stream if empty
      const stream = document.getElementById("llm-chat-stream");
      if (stream && !stream.hasChildNodes()) {
        runLlmStream(currentScenarioId);
      }
    } else {
      if (llmContainer) llmContainer.hidden = true;
      if (actions) actions.hidden = true;
      if (body) {
        body.hidden = false;
        body.setAttribute("aria-labelledby", tab.id);
        body.innerHTML = TERMINAL[term].join("\n");
        body.scrollTop = 0;
      }
    }
    if (focus) tab.focus();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab, false));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
      select(tabs[next], true);
    });
  });

  // Preset prompt switcher
  presetPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      presetPills.forEach(p => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const scenario = pill.dataset.scenario;
      runLlmStream(scenario);
    });
  });

  // Replay stream button
  if (replayBtn) {
    replayBtn.addEventListener("click", () => {
      runLlmStream(currentScenarioId);
    });
  }

  // Initial tab selection (Claude Code Live Agent)
  select(tabs[0], false);
}

// ---------- Contact: compose an email, store nothing ----------

const CONTACT_EMAIL = "vamshidharreddye@gmail.com";

function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  const email = document.getElementById("f-email");
  const emailError = document.getElementById("f-email-error");
  const interest = document.getElementById("f-interest");

  // Buttons that lead to the form preselect what the visitor is asking about.
  document.querySelectorAll("[data-interest]").forEach((link) => {
    link.addEventListener("click", () => {
      interest.value = link.getAttribute("data-interest");
    });
  });

  email.addEventListener("input", () => {
    if (email.validity.valid) {
      email.removeAttribute("aria-invalid");
      emailError.hidden = true;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!email.value.trim() || !email.validity.valid) {
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("aria-describedby", "f-email-error");
      emailError.textContent = email.value.trim()
        ? "This doesn't look like an email address. Check it and try again."
        : "Enter an email address so we can reply.";
      emailError.hidden = false;
      email.focus();
      return;
    }

    const data = new FormData(form);
    const subject = `SimProof: ${data.get("interest")}`;
    const body = [
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "-"}`,
      `Main solver: ${data.get("solver")}`,
      `Interested in: ${data.get("interest")}`,
      "",
      data.get("message") || "",
    ].join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = `Your email app should now be open with the request filled in. If nothing opened, reach out to us on LinkedIn.`;
  });
}

// ---------- Copy ----------

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(btn.getAttribute("data-copy"));
        btn.textContent = "Copied";
      } catch {
        btn.textContent = "Copy failed";
      }
      setTimeout(() => { btn.textContent = original; }, 1600);
    });
  });
}
