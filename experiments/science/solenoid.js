export default {
  id: "magnetic-field-solenoid",
  key: "SCI-PHY-104",
  subject: "science",
  title: "Magnetic Field Due to a Current-Carrying Solenoid",
  category: "ELECTROMAGNETISM",
  description:
    "Explore how electric current, coil turns, solenoid length, current direction, and core material govern magnetic field strength, uniformity, and polarity.",
  styles: `
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #0f172a;
      --bg-card: #ffffff;
      --bg-subtle: #f8fafc;
      --border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #475569;
      --accent: #2563eb;
      --accent-soft: #eff6ff;
      --north: #dc2626;
      --south: #1d4ed8;
      --copper: #d97706;
      --copper-light: #fbbf24;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .lab-shell {
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) minmax(300px, 1fr);
      gap: 1.25rem;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      padding: 0.75rem;
    }

    @media (max-width: 920px) {
      .lab-shell {
        grid-template-columns: 1fr;
      }
    }

    .stage-column,
    .controls-column {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 0;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 14px;
      box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
      overflow: hidden;
    }

    .stage-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      padding: 0.85rem 1.1rem;
      background: var(--bg-subtle);
      border-bottom: 1px solid var(--border);
    }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.28rem 0.7rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
    }

    .status-pill.on {
      background: #dcfce7;
      color: #166534;
      border: 1px solid #86efac;
    }

    .status-pill.off {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
      transition: transform 0.25s ease;
    }

    .status-pill.on .status-dot {
      transform: scale(1.15);
    }

    .polarity-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.28rem 0.75rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 600;
      background: #fff;
      border: 1px solid var(--border);
      color: var(--text-main);
    }

    .pole-tag {
      padding: 0.08rem 0.4rem;
      border-radius: 5px;
      font-weight: 700;
      font-size: 0.72rem;
      color: #fff;
      transition: background-color 0.25s ease;
    }

    .pole-tag.north { background: var(--north); }
    .pole-tag.south { background: var(--south); }
    .pole-tag.neutral { background: #94a3b8; }

    .canvas-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      min-height: 320px;
      background: radial-gradient(circle at 50% 45%, #0f172a 0%, #090d16 100%);
      touch-action: none;
      user-select: none;
    }

    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }

    .canvas-hint {
      position: absolute;
      left: 0.85rem;
      bottom: 0.75rem;
      padding: 0.3rem 0.65rem;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.78);
      border: 1px solid rgba(148, 163, 184, 0.25);
      color: #e2e8f0;
      font-size: 0.75rem;
      pointer-events: none;
      backdrop-filter: blur(4px);
    }

    .compass-readout {
      position: absolute;
      right: 0.85rem;
      bottom: 0.75rem;
      padding: 0.35rem 0.7rem;
      border-radius: 8px;
      background: rgba(15, 23, 42, 0.84);
      border: 1px solid rgba(148, 163, 184, 0.28);
      color: #f8fafc;
      font-size: 0.76rem;
      font-variant-numeric: tabular-nums;
      pointer-events: none;
      backdrop-filter: blur(4px);
    }

    .telemetry-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0.65rem;
      padding: 0.9rem 1.1rem;
      background: var(--bg-subtle);
      border-top: 1px solid var(--border);
    }

    @media (max-width: 600px) {
      .telemetry-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .metric-box {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 0.6rem 0.75rem;
    }

    .metric-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
      font-weight: 600;
      margin-bottom: 0.2rem;
    }

    .metric-value {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
      font-variant-numeric: tabular-nums;
    }

    .metric-sub {
      font-size: 0.72rem;
      color: var(--text-muted);
      margin-top: 0.1rem;
    }

    .panel-section {
      padding: 1rem 1.1rem;
      border-bottom: 1px solid var(--border);
    }

    .panel-section:last-child {
      border-bottom: none;
    }

    .section-title {
      margin: 0 0 0.75rem 0;
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--text-muted);
    }

    .primary-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.6rem;
    }

    button {
      font-family: inherit;
      cursor: pointer;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.85rem;
      transition: transform 0.12s ease, background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    }

    button:active {
      transform: scale(0.98);
    }

    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }

    .btn-switch {
      padding: 0.65rem 0.85rem;
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      color: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
    }

    .btn-switch.active {
      background: #16a34a;
      border-color: #15803d;
      color: #ffffff;
      box-shadow: 0 2px 8px rgba(22, 163, 74, 0.28);
    }

    .btn-reverse {
      padding: 0.65rem 0.85rem;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #0f172a;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
    }

    .btn-reverse:hover {
      background: #f1f5f9;
    }

    .control-group {
      margin-bottom: 0.9rem;
    }

    .control-group:last-child {
      margin-bottom: 0;
    }

    .control-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.35rem;
      font-size: 0.84rem;
    }

    .control-label {
      font-weight: 600;
      color: var(--text-main);
    }

    .control-val {
      font-weight: 700;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }

    input[type="range"] {
      width: 100%;
      accent-color: var(--accent);
      cursor: pointer;
      height: 6px;
      border-radius: 999px;
    }

    .range-ticks {
      display: flex;
      justify-content: space-between;
      font-size: 0.7rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    select {
      width: 100%;
      padding: 0.55rem 0.7rem;
      border-radius: 9px;
      border: 1px solid #cbd5e1;
      background: #fff;
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-main);
      cursor: pointer;
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .toggle-chip {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.5rem 0.65rem;
      border-radius: 9px;
      border: 1px solid var(--border);
      background: var(--bg-subtle);
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--text-main);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .toggle-chip:hover {
      background: #f1f5f9;
    }

    .toggle-chip input {
      accent-color: var(--accent);
      width: 15px;
      height: 15px;
      margin: 0;
      cursor: pointer;
    }

    .preset-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .btn-preset {
      padding: 0.52rem 0.65rem;
      border: 1px solid var(--border);
      background: var(--bg-subtle);
      color: var(--text-main);
      font-size: 0.78rem;
      text-align: left;
      line-height: 1.25;
    }

    .btn-preset:hover {
      border-color: var(--accent);
      background: var(--accent-soft);
      color: #1e40af;
    }

    .formula-box {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 0.75rem 0.85rem;
      font-size: 0.82rem;
      line-height: 1.5;
      color: var(--text-muted);
    }

    .formula-math {
      font-family: "Cambria Math", "Times New Roman", Georgia, serif;
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.35rem;
    }

    .insight-banner {
      padding: 0.85rem 1.1rem;
      background: #eff6ff;
      border-top: 1px solid #bfdbfe;
      font-size: 0.84rem;
      line-height: 1.45;
      color: #1e3a8a;
    }

    .insight-banner strong {
      color: #172554;
    }
  `,
  mount({ root, signal, reducedMotion, announce }) {
    // Physical constants and core permeability lookup
    const MU_0 = 4 * Math.PI * 1e-7; // T·m/A
    const CORES = {
      air: {
        name: "Air Core (Hollow)",
        muR: 1,
        colorFill: "rgba(148, 163, 184, 0.12)",
        colorStroke: "rgba(148, 163, 184, 0.45)",
        note: "Weak non-magnetic core (μᵣ ≈ 1). Field lines remain moderate."
      },
      aluminum: {
        name: "Aluminum Rod (Paramagnetic)",
        muR: 1.000022,
        colorFill: "rgba(203, 213, 225, 0.32)",
        colorStroke: "rgba(226, 232, 240, 0.65)",
        note: "Paramagnetic core (μᵣ ≈ 1.000022). Negligible amplification over air."
      },
      iron: {
        name: "Soft Iron Core (Ferromagnetic)",
        muR: 800,
        colorFill: "rgba(100, 116, 139, 0.72)",
        colorStroke: "rgba(203, 213, 225, 0.85)",
        note: "Ferromagnetic core (μᵣ ≈ 800) concentrates magnetic flux strongly, forming a powerful temporary electromagnet."
      }
    };

    // Simulation state
    const state = {
      powerOn: true,
      current: 2.5, // Amperes (0.5 to 5.0 A)
      turns: 24, // Number of turns N (10 to 50)
      lengthCm: 16, // Length L in cm (8 to 24 cm)
      reversed: false, // false = left end South, right end North; true = left North, right South
      core: "air",
      showFieldLines: true,
      showFilings: false,
      showRightHand: false,
      electronFlow: false,
      // Smooth animated physics values
      animPower: 1,
      animPolarity: 1, // +1 = Right is North, -1 = Left is North
      animMuBoost: 1,
      phaseOffset: 0,
      // Compass normalized coordinates (-1 to 1 relative to stage) and needle dynamics
      compass: {
        nx: 0.0,
        ny: -0.34,
        angle: 0,
        angularVel: 0,
        dragging: false
      }
    };

    // Deterministic procedural iron filings pool
    const filings = Array.from({ length: 260 }, (_, idx) => {
      // Golden-angle quasi-random distribution across canvas
      const phi = (idx * 0.61803398875) % 1;
      const psi = ((idx * 0.38196601125) + 0.17) % 1;
      return {
        u: (phi - 0.5) * 1.86,
        v: (psi - 0.5) * 1.76,
        len: 7 + (idx % 5) * 1.5
      };
    });

    // Build accessible DOM inside Shadow Root
    root.innerHTML = `
      <div class="lab-shell">
        <div class="stage-column">
          <div class="card">
            <div class="stage-header">
              <div class="badge-row">
                <span id="circuit-status" class="status-pill on" role="status">
                  <span class="status-dot"></span>
                  <span id="circuit-status-text">Circuit Closed (ON)</span>
                </span>
                <span class="polarity-pill" id="polarity-badge">
                  Left: <span id="left-pole" class="pole-tag south">S</span>
                  &nbsp;|&nbsp;
                  Right: <span id="right-pole" class="pole-tag north">N</span>
                </span>
              </div>
              <div style="font-size: 0.78rem; color: #475569; font-weight: 600;">
                Interactive Magnetic Field Visualizer
              </div>
            </div>

            <div class="canvas-wrap" id="canvas-wrap">
              <canvas id="sim-canvas" aria-label="Interactive simulation of a current-carrying solenoid showing copper coils, battery circuit, magnetic field lines, and a draggable magnetic compass."></canvas>
              <div class="canvas-hint">Drag the compass needle anywhere inside or around the solenoid</div>
              <div class="compass-readout" id="compass-readout">Compass B: 0.00 mT | Angle: 0°</div>
            </div>

            <div class="telemetry-grid">
              <div class="metric-box">
                <div class="metric-label">Internal Field (B)</div>
                <div class="metric-value" id="metric-b">0.47 mT</div>
                <div class="metric-sub" id="metric-b-sub">Uniform inside core</div>
              </div>
              <div class="metric-box">
                <div class="metric-label">Turn Density (n = N/L)</div>
                <div class="metric-value" id="metric-n">150 turns/m</div>
                <div class="metric-sub" id="metric-n-sub">24 turns / 0.16 m</div>
              </div>
              <div class="metric-box">
                <div class="metric-label">Current (I)</div>
                <div class="metric-value" id="metric-i">+2.50 A</div>
                <div class="metric-sub" id="metric-i-sub">Conventional flow</div>
              </div>
              <div class="metric-box">
                <div class="metric-label">Relative Perm. (μᵣ)</div>
                <div class="metric-value" id="metric-mur">1</div>
                <div class="metric-sub" id="metric-mur-sub">Air Core</div>
              </div>
            </div>

            <div class="insight-banner" id="insight-banner">
              <strong>Observation:</strong> Inside the solenoid, magnetic field lines are parallel and equally spaced, indicating a <strong>uniform magnetic field</strong>. Outside, the field resembles that of a bar magnet.
            </div>
          </div>
        </div>

        <div class="controls-column">
          <div class="card">
            <div class="panel-section">
              <h3 class="section-title">Power &amp; Polarity Controls</h3>
              <div class="primary-actions">
                <button type="button" id="btn-power" class="btn-switch active" aria-pressed="true">
                  <span id="power-icon">⚡</span>
                  <span id="power-label">Switch: ON</span>
                </button>
                <button type="button" id="btn-reverse" class="btn-reverse">
                  <span>⇄</span>
                  <span>Reverse Current</span>
                </button>
              </div>
            </div>

            <div class="panel-section">
              <h3 class="section-title">Solenoid Parameters</h3>

              <div class="control-group">
                <div class="control-header">
                  <label class="control-label" for="slider-current">Electric Current (I)</label>
                  <span class="control-val" id="val-current">2.5 A</span>
                </div>
                <input type="range" id="slider-current" min="0.5" max="5.0" step="0.1" value="2.5" />
                <div class="range-ticks"><span>0.5 A</span><span>2.5 A</span><span>5.0 A</span></div>
              </div>

              <div class="control-group">
                <div class="control-header">
                  <label class="control-label" for="slider-turns">Number of Turns (N)</label>
                  <span class="control-val" id="val-turns">24 turns</span>
                </div>
                <input type="range" id="slider-turns" min="10" max="48" step="2" value="24" />
                <div class="range-ticks"><span>10 turns</span><span>28 turns</span><span>48 turns</span></div>
              </div>

              <div class="control-group">
                <div class="control-header">
                  <label class="control-label" for="slider-length">Solenoid Length (L)</label>
                  <span class="control-val" id="val-length">16 cm</span>
                </div>
                <input type="range" id="slider-length" min="10" max="24" step="1" value="16" />
                <div class="range-ticks"><span>10 cm (Compact)</span><span>17 cm</span><span>24 cm (Stretched)</span></div>
              </div>

              <div class="control-group">
                <div class="control-header">
                  <label class="control-label" for="select-core">Core Material</label>
                </div>
                <select id="select-core">
                  <option value="air" selected>Air Core (Hollow, μᵣ = 1)</option>
                  <option value="aluminum">Aluminum Rod (Paramagnetic, μᵣ ≈ 1)</option>
                  <option value="iron">Soft Iron Core (Electromagnet, μᵣ = 800)</option>
                </select>
              </div>
            </div>

            <div class="panel-section">
              <h3 class="section-title">Visual Overlays</h3>
              <div class="toggle-grid">
                <label class="toggle-chip">
                  <input type="checkbox" id="chk-field" checked />
                  <span>Field Lines</span>
                </label>
                <label class="toggle-chip">
                  <input type="checkbox" id="chk-filings" />
                  <span>Iron Filings</span>
                </label>
                <label class="toggle-chip">
                  <input type="checkbox" id="chk-rhr" />
                  <span>Right-Hand Rule</span>
                </label>
                <label class="toggle-chip">
                  <input type="checkbox" id="chk-electrons" />
                  <span>Electron Flow (e⁻)</span>
                </label>
              </div>
            </div>

            <div class="panel-section">
              <h3 class="section-title">Class 10 Inquiry Presets</h3>
              <div class="preset-grid">
                <button type="button" class="btn-preset" data-preset="standard">
                  <strong>1. Baseline Solenoid</strong><br />Air core, 2.5 A, 24 turns
                </button>
                <button type="button" class="btn-preset" data-preset="reverse">
                  <strong>2. Polarity Reversal</strong><br />Flip battery terminals
                </button>
                <button type="button" class="btn-preset" data-preset="electromagnet">
                  <strong>3. Soft Iron Core</strong><br />Build a strong electromagnet
                </button>
                <button type="button" class="btn-preset" data-preset="dense">
                  <strong>4. High Turn Density</strong><br />48 turns in 10 cm length
                </button>
              </div>
            </div>

            <div class="panel-section">
              <div class="formula-box">
                <div class="formula-math">B = μ₀ · μᵣ · (N / L) · I</div>
                <div>
                  <strong>Key Principles:</strong> Magnetic field strength <em>B</em> is directly proportional to current (<em>I</em>) and turn density (<em>n = N/L</em>). Reversing current reverses North and South poles.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Cache DOM references
    const canvasWrap = root.getElementById("canvas-wrap");
    const canvas = root.getElementById("sim-canvas");
    const ctx = canvas.getContext("2d");

    const elCircuitStatus = root.getElementById("circuit-status");
    const elCircuitStatusText = root.getElementById("circuit-status-text");
    const elLeftPole = root.getElementById("left-pole");
    const elRightPole = root.getElementById("right-pole");
    const elCompassReadout = root.getElementById("compass-readout");

    const elMetricB = root.getElementById("metric-b");
    const elMetricBSub = root.getElementById("metric-b-sub");
    const elMetricN = root.getElementById("metric-n");
    const elMetricNSub = root.getElementById("metric-n-sub");
    const elMetricI = root.getElementById("metric-i");
    const elMetricISub = root.getElementById("metric-i-sub");
    const elMetricMur = root.getElementById("metric-mur");
    const elMetricMurSub = root.getElementById("metric-mur-sub");
    const elInsightBanner = root.getElementById("insight-banner");

    const btnPower = root.getElementById("btn-power");
    const elPowerIcon = root.getElementById("power-icon");
    const elPowerLabel = root.getElementById("power-label");
    const btnReverse = root.getElementById("btn-reverse");

    const sliderCurrent = root.getElementById("slider-current");
    const valCurrent = root.getElementById("val-current");
    const sliderTurns = root.getElementById("slider-turns");
    const valTurns = root.getElementById("val-turns");
    const sliderLength = root.getElementById("slider-length");
    const valLength = root.getElementById("val-length");
    const selectCore = root.getElementById("select-core");

    const chkField = root.getElementById("chk-field");
    const chkFilings = root.getElementById("chk-filings");
    const chkRhr = root.getElementById("chk-rhr");
    const chkElectrons = root.getElementById("chk-electrons");

    // Canvas resize & DPI scaling
    let width = 800;
    let height = 500;
    let dpr = 1;

    function resizeCanvas() {
      const rect = canvasWrap.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    resizeObserver.observe(canvasWrap);
    resizeCanvas();

    // Physics computation helper
    function getPhysics() {
      const lengthM = state.lengthCm / 100;
      const turnDensity = state.turns / lengthM; // turns/m
      const coreData = CORES[state.core];
      const effectiveI = state.powerOn ? state.current : 0;
      const bTesla = MU_0 * coreData.muR * turnDensity * effectiveI;
      const bMilliTesla = bTesla * 1000;
      const polaritySign = state.reversed ? -1 : 1; // +1: Right is N, Left is S
      return {
        lengthM,
        turnDensity,
        coreData,
        effectiveI,
        bTesla,
        bMilliTesla,
        polaritySign
      };
    }

    // Compute normalized magnetic field vector (Bx, By) at world point (px, py)
    // Uses a finite solenoid magnetic charge / two-pole + interior uniform blend model
    function evaluateMagneticField(px, py, geom, polaritySign, strengthFactor) {
      if (strengthFactor <= 0.0001) {
        return { bx: 0, by: 0, mag: 0, inside: false };
      }

      const { cx, cy, halfW, halfH } = geom;
      const dx = px - cx;
      const dy = py - cy;

      const insideX = Math.abs(dx) <= halfW;
      const insideY = Math.abs(dy) <= halfH * 0.84;
      const inside = insideX && insideY;

      // Pole faces positioned near ends of solenoid
      const poleOffset = halfW * 0.94;
      const northX = cx + polaritySign * poleOffset;
      const southX = cx - polaritySign * poleOffset;

      // Softened inverse-square monopole contributions from North (+) and South (-) ends
      const soften = Math.max(halfH * 0.78, 18);
      const softenSq = soften * soften;

      const rNx = px - northX;
      const rNy = py - cy;
      const dNSq = rNx * rNx + rNy * rNy + softenSq;
      const dN = Math.sqrt(dNSq);

      const rSx = px - southX;
      const rSy = py - cy;
      const dSSq = rSx * rSx + rSy * rSy + softenSq;
      const dS = Math.sqrt(dSSq);

      // Exterior pole field (points away from North, toward South)
      const poleScale = halfW * halfH * 1.65;
      let bxExt = poleScale * (rNx / (dNSq * dN) - rSx / (dSSq * dS));
      let byExt = poleScale * (rNy / (dNSq * dN) - rSy / (dSSq * dS));

      // Smooth interior window function so field inside solenoid is strongly uniform along axis
      const wx = 1 / (1 + Math.pow(Math.abs(dx) / (halfW * 1.04), 8));
      const wy = 1 / (1 + Math.pow(Math.abs(dy) / (halfH * 0.92), 6));
      const interiorWeight = wx * wy;

      const bxInt = polaritySign * 1.25;
      const byInt = 0;

      // Blend interior uniform field with exterior dipole field
      let bx = bxExt * (1 - interiorWeight * 0.88) + bxInt * interiorWeight;
      let by = byExt * (1 - interiorWeight * 0.94) + byInt * interiorWeight;

      const rawMag = Math.hypot(bx, by);
      return {
        bx: bx * strengthFactor,
        by: by * strengthFactor,
        mag: rawMag * strengthFactor,
        inside
      };
    }

    // Update UI readouts & insight text
    function syncUI(announceChange = false) {
      const phys = getPhysics();

      // Power button & status badge
      btnPower.classList.toggle("active", state.powerOn);
      btnPower.setAttribute("aria-pressed", String(state.powerOn));
      elPowerIcon.textContent = state.powerOn ? "⚡" : "⏻";
      elPowerLabel.textContent = state.powerOn ? "Switch: ON" : "Switch: OFF";

      elCircuitStatus.className = `status-pill ${state.powerOn ? "on" : "off"}`;
      elCircuitStatusText.textContent = state.powerOn ? "Circuit Closed (ON)" : "Circuit Open (OFF)";

      // Polarity tags
      if (!state.powerOn) {
        elLeftPole.className = "pole-tag neutral";
        elLeftPole.textContent = "—";
        elRightPole.className = "pole-tag neutral";
        elRightPole.textContent = "—";
      } else if (!state.reversed) {
        elLeftPole.className = "pole-tag south";
        elLeftPole.textContent = "S";
        elRightPole.className = "pole-tag north";
        elRightPole.textContent = "N";
      } else {
        elLeftPole.className = "pole-tag north";
        elLeftPole.textContent = "N";
        elRightPole.className = "pole-tag south";
        elRightPole.textContent = "S";
      }

      // Slider labels
      valCurrent.textContent = `${state.current.toFixed(1)} A`;
      valTurns.textContent = `${state.turns} turns`;
      valLength.textContent = `${state.lengthCm} cm`;
      selectCore.value = state.core;

      // Telemetry metrics
      if (!state.powerOn) {
        elMetricB.textContent = "0.00 mT";
        elMetricBSub.textContent = "No current flowing";
      } else if (phys.bMilliTesla >= 100) {
        elMetricB.textContent = `${phys.bMilliTesla.toFixed(0)} mT`;
        elMetricBSub.textContent = "Strong electromagnet";
      } else {
        elMetricB.textContent = `${phys.bMilliTesla.toFixed(2)} mT`;
        elMetricBSub.textContent = "Uniform inside core";
      }

      elMetricN.textContent = `${Math.round(phys.turnDensity)} turns/m`;
      elMetricNSub.textContent = `${state.turns} turns / ${phys.lengthM.toFixed(2)} m`;

      const signedI = state.powerOn ? (state.reversed ? -state.current : state.current) : 0;
      elMetricI.textContent = `${signedI > 0 ? "+" : ""}${signedI.toFixed(2)} A`;
      elMetricISub.textContent = state.electronFlow ? "Electron flow (e⁻)" : "Conventional (+ → −)";

      elMetricMur.textContent = phys.coreData.muR === 1.000022 ? "1.00002" : String(phys.coreData.muR);
      elMetricMurSub.textContent = phys.coreData.name.split(" (")[0];

      // Dynamic scientific observation banner
      if (!state.powerOn) {
        elInsightBanner.innerHTML =
          "<strong>Circuit Open:</strong> With zero current (<em>I = 0 A</em>), no magnetic field is produced around the solenoid. The compass needle settles horizontally.";
      } else if (state.core === "iron") {
        elInsightBanner.innerHTML = `<strong>Electromagnet Effect:</strong> Inserting a <strong>soft iron core</strong> amplifies the internal magnetic field by ~${phys.coreData.muR}× (to <strong>${phys.bMilliTesla.toFixed(0)} mT</strong>) because magnetic domains align with the coil's field.`;
      } else if (state.reversed) {
        elInsightBanner.innerHTML =
          "<strong>Polarity Reversed:</strong> Reversing the battery terminals reverses current direction in every loop—flipping the <strong>North pole to the left</strong> and <strong>South pole to the right</strong>.";
      } else {
        elInsightBanner.innerHTML = `<strong>Uniform Interior Field:</strong> Inside the ${state.lengthCm} cm solenoid (${Math.round(phys.turnDensity)} turns/m), field lines are parallel and equally spaced (<strong>B = ${phys.bMilliTesla.toFixed(2)} mT</strong>).`;
      }

      if (announceChange && typeof announce === "function") {
        const poleDesc = !state.powerOn
          ? "Circuit off, magnetic field zero."
          : `Circuit on, current ${state.current.toFixed(1)} amperes, left pole ${state.reversed ? "North" : "South"}, right pole ${state.reversed ? "South" : "North"}, internal magnetic field ${phys.bMilliTesla.toFixed(2)} millitesla.`;
        announce(poleDesc);
      }
    }

    // Geometry helper based on current canvas dimensions and solenoid length
    function getGeometry() {
      const cx = width * 0.5;
      const cy = height * 0.42;
      // Map lengthCm (10..24) to visual width
      const lengthRatio = (state.lengthCm - 10) / 14; // 0..1
      const minW = Math.min(width * 0.34, 210);
      const maxW = Math.min(width * 0.62, 430);
      const solW = minW + lengthRatio * (maxW - minW);
      const solH = Math.min(height * 0.24, 108);
      return {
        cx,
        cy,
        solW,
        solH,
        halfW: solW * 0.5,
        halfH: solH * 0.5
      };
    }

    // Draw battery, switch, and connecting wires
    function drawCircuit(geom) {
      const { cx, cy, halfW, halfH } = geom;
      const leftLeadX = cx - halfW + 6;
      const rightLeadX = cx + halfW - 6;
      const wireBottomY = Math.min(height * 0.84, cy + halfH + 108);
      const batteryX = cx;

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Wire path segments
      ctx.strokeStyle = state.powerOn ? "#f59e0b" : "#64748b";
      ctx.lineWidth = 3.2;

      // Left wire down to battery
      ctx.beginPath();
      ctx.moveTo(leftLeadX, cy + halfH * 0.72);
      ctx.lineTo(leftLeadX, wireBottomY);
      ctx.lineTo(batteryX - 42, wireBottomY);
      ctx.stroke();

      // Right wire down to switch and battery
      const switchLeftX = batteryX + 42;
      const switchRightX = batteryX + 96;

      ctx.beginPath();
      ctx.moveTo(rightLeadX, cy + halfH * 0.72);
      ctx.lineTo(rightLeadX, wireBottomY);
      ctx.lineTo(switchRightX, wireBottomY);
      ctx.stroke();

      // Switch blade
      ctx.beginPath();
      ctx.arc(switchLeftX, wireBottomY, 4, 0, Math.PI * 2);
      ctx.arc(switchRightX, wireBottomY, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#e2e8f0";
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(switchLeftX, wireBottomY);
      const liftAngle = (1 - state.animPower) * -0.48;
      const bladeLen = switchRightX - switchLeftX;
      ctx.lineTo(
        switchLeftX + Math.cos(liftAngle) * bladeLen,
        wireBottomY + Math.sin(liftAngle) * bladeLen
      );
      ctx.strokeStyle = state.powerOn ? "#4ade80" : "#94a3b8";
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Switch label
      ctx.fillStyle = "#94a3b8";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(state.powerOn ? "KEY CLOSED" : "KEY OPEN", (switchLeftX + switchRightX) * 0.5, wireBottomY + 18);

      // Battery symbol at bottom center
      // Standard: left side positive when !reversed, right side positive when reversed
      const posOnLeft = !state.reversed;
      const cellPositions = [-22, -6, 10, 26];
      cellPositions.forEach((offset, idx) => {
        const isLongPlate = posOnLeft ? idx % 2 === 0 : idx % 2 === 1;
        const plateH = isLongPlate ? 22 : 11;
        ctx.beginPath();
        ctx.moveTo(batteryX + offset, wireBottomY - plateH);
        ctx.lineTo(batteryX + offset, wireBottomY + plateH);
        ctx.strokeStyle = isLongPlate ? "#f87171" : "#60a5fa";
        ctx.lineWidth = isLongPlate ? 3 : 4.5;
        ctx.stroke();
      });

      // + and - terminal labels
      ctx.font = "700 14px system-ui, sans-serif";
      ctx.fillStyle = "#f87171";
      ctx.fillText("+", posOnLeft ? batteryX - 34 : batteryX + 36, wireBottomY - 12);
      ctx.fillStyle = "#60a5fa";
      ctx.fillText("−", posOnLeft ? batteryX + 36 : batteryX - 34, wireBottomY - 12);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.fillText(`DC Supply (${state.current.toFixed(1)} A)`, batteryX, wireBottomY + 32);

      // Animated charge carriers along circuit wires when powered on
      if (state.animPower > 0.05) {
        const flowDir = (state.reversed ? -1 : 1) * (state.electronFlow ? -1 : 1);
        const carrierColor = state.electronFlow ? "#38bdf8" : "#fde047";
        const spacing = 36;
        const shift = ((state.phaseOffset * flowDir) % spacing + spacing) % spacing;

        ctx.fillStyle = carrierColor;
        // Left vertical wire
        for (let y = cy + halfH * 0.75 + shift; y < wireBottomY; y += spacing) {
          drawChargeDot(leftLeadX, y, state.electronFlow ? "−" : "+", carrierColor);
        }
        // Right vertical wire
        for (let y = cy + halfH * 0.75 + (spacing - shift); y < wireBottomY; y += spacing) {
          drawChargeDot(rightLeadX, y, state.electronFlow ? "−" : "+", carrierColor);
        }
      }

      ctx.restore();
    }

    function drawChargeDot(x, y, symbol, color) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = "#0f172a";
      ctx.font = "800 9px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(symbol, x, y + 0.5);
      ctx.restore();
    }

    // Draw back half of copper windings (behind core)
    function drawSolenoidBackCoils(geom) {
      const { cx, cy, solW, halfW, halfH } = geom;
      const turns = state.turns;
      const pitch = solW / turns;

      ctx.save();
      for (let i = 0; i < turns; i++) {
        const x = cx - halfW + (i + 0.5) * pitch;
        ctx.beginPath();
        ctx.ellipse(x, cy, Math.max(4, pitch * 0.34), halfH, 0, Math.PI * 0.5, Math.PI * 1.5);
        ctx.strokeStyle = "#78350f";
        ctx.lineWidth = Math.max(2.4, Math.min(5.2, pitch * 0.42));
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw core cylinder (Air / Aluminum / Soft Iron)
    function drawCore(geom) {
      const { cx, cy, solW, solH, halfW, halfH } = geom;
      const coreData = CORES[state.core];
      const coreW = solW + 28;
      const coreH = solH * 0.76;
      const rx = 10;

      ctx.save();
      const grad = ctx.createLinearGradient(cx, cy - coreH * 0.5, cx, cy + coreH * 0.5);
      if (state.core === "iron") {
        grad.addColorStop(0, "#475569");
        grad.addColorStop(0.35, "#94a3b8");
        grad.addColorStop(0.7, "#475569");
        grad.addColorStop(1, "#1e293b");
      } else if (state.core === "aluminum") {
        grad.addColorStop(0, "rgba(203,213,225,0.28)");
        grad.addColorStop(0.4, "rgba(241,245,249,0.48)");
        grad.addColorStop(1, "rgba(148,163,184,0.25)");
      } else {
        grad.addColorStop(0, "rgba(148,163,184,0.06)");
        grad.addColorStop(0.5, "rgba(148,163,184,0.14)");
        grad.addColorStop(1, "rgba(148,163,184,0.06)");
      }

      ctx.fillStyle = grad;
      ctx.strokeStyle = coreData.colorStroke;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.roundRect(cx - coreW * 0.5, cy - coreH * 0.5, coreW, coreH, rx);
      ctx.fill();
      ctx.stroke();

      // Core label
      ctx.fillStyle = state.core === "iron" ? "#f8fafc" : "rgba(226,232,240,0.72)";
      ctx.font = "600 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(coreData.name.toUpperCase(), cx, cy);

      // Pole badges at ends of solenoid when powered
      if (state.animPower > 0.1) {
        const alpha = Math.min(1, state.animPower);
        const leftIsNorth = state.reversed;
        drawEndPoleBadge(cx - halfW - 26, cy, leftIsNorth ? "N" : "S", leftIsNorth, alpha);
        drawEndPoleBadge(cx + halfW + 26, cy, leftIsNorth ? "S" : "N", !leftIsNorth, alpha);
      }
      ctx.restore();
    }

    function drawEndPoleBadge(x, y, label, isNorth, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, 15, 0, Math.PI * 2);
      ctx.fillStyle = isNorth ? "#dc2626" : "#2563eb";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "800 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, x, y + 0.5);
      ctx.restore();
    }

    // Draw front half of copper windings + directional current arrows on coils
    function drawSolenoidFrontCoils(geom) {
      const { cx, cy, solW, halfW, halfH } = geom;
      const turns = state.turns;
      const pitch = solW / turns;
      const wireWidth = Math.max(2.6, Math.min(5.5, pitch * 0.44));

      ctx.save();
      for (let i = 0; i < turns; i++) {
        const x = cx - halfW + (i + 0.5) * pitch;
        const grad = ctx.createLinearGradient(x - 4, cy - halfH, x + 4, cy + halfH);
        grad.addColorStop(0, "#fbbf24");
        grad.addColorStop(0.5, "#d97706");
        grad.addColorStop(1, "#92400e");

        ctx.beginPath();
        ctx.ellipse(x, cy, Math.max(4, pitch * 0.34), halfH, 0, -Math.PI * 0.5, Math.PI * 0.5);
        ctx.strokeStyle = grad;
        ctx.lineWidth = wireWidth;
        ctx.stroke();

        // Draw animated directional arrowheads on every 3rd turn
        if (state.animPower > 0.08 && i % 3 === 1) {
          // Conventional current goes upward on front face when !reversed (giving Right=N by Right-Hand Grip Rule)
          const dirSign = (state.reversed ? 1 : -1) * (state.electronFlow ? -1 : 1);
          const pulse = Math.sin(state.phaseOffset * 0.08 + i * 0.5) * 6;
          const arrowX = x + Math.max(4, pitch * 0.34);
          const arrowY = cy + pulse * dirSign;

          ctx.save();
          ctx.translate(arrowX, arrowY);
          ctx.rotate(dirSign < 0 ? -Math.PI * 0.5 : Math.PI * 0.5);
          ctx.beginPath();
          ctx.moveTo(5, 0);
          ctx.lineTo(-4, -3.8);
          ctx.lineTo(-4, 3.8);
          ctx.closePath();
          ctx.fillStyle = state.electronFlow ? "#38bdf8" : "#fef08a";
          ctx.fill();
          ctx.restore();
        }
      }
      ctx.restore();
    }

    // Integrate and render continuous magnetic field lines
    function drawMagneticFieldLines(geom, phys) {
      if (!state.showFieldLines || state.animPower <= 0.03) return;

      const { cx, cy, halfW, halfH } = geom;
      const strengthFactor = Math.min(2.5, (phys.bMilliTesla / 0.5) * 0.45 + 0.45) * state.animPower;
      const polaritySign = phys.polaritySign;

      // Number of interior field lines scales with field intensity (5 to 11 lines)
      const normIntensity = Math.min(1, Math.log10(1 + phys.bMilliTesla * 8) / 2.6);
      const lineCount = Math.round(5 + normIntensity * 6) | 1; // Odd number so center axis is always drawn

      ctx.save();
      const baseAlpha = Math.min(0.92, 0.35 + normIntensity * 0.57) * state.animPower;

      for (let idx = 0; idx < lineCount; idx++) {
        const frac = lineCount === 1 ? 0 : (idx / (lineCount - 1)) * 2 - 1; // -1 to +1
        const startY = cy + frac * (halfH * 0.68);
        const startX = cx;

        // Trace forward (along B) and backward (against B) from center plane
        const forwardPts = traceFieldLine(startX, startY, 1, geom, polaritySign, strengthFactor);
        const backwardPts = traceFieldLine(startX, startY, -1, geom, polaritySign, strengthFactor);

        const fullPts = backwardPts.reverse().concat(forwardPts.slice(1));
        if (fullPts.length < 3) continue;

        ctx.beginPath();
        ctx.moveTo(fullPts[0].x, fullPts[0].y);
        for (let p = 1; p < fullPts.length; p++) {
          ctx.lineTo(fullPts[p].x, fullPts[p].y);
        }

        ctx.strokeStyle = `rgba(56, 189, 248, ${baseAlpha.toFixed(3)})`;
        ctx.lineWidth = Math.abs(frac) < 0.05 ? 2.1 : 1.55;
        ctx.stroke();

        // Draw animated directional chevrons along the field line
        const chevronSpacing = 95;
        const offset = (state.phaseOffset * 1.15) % chevronSpacing;
        let accumDist = 0;
        for (let p = 1; p < fullPts.length; p++) {
          const p0 = fullPts[p - 1];
          const p1 = fullPts[p];
          const segLen = Math.hypot(p1.x - p0.x, p1.y - p0.y);
          accumDist += segLen;
          if (accumDist >= offset && segLen > 0.1) {
            accumDist -= chevronSpacing;
            const angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
            drawFieldChevron(p1.x, p1.y, angle, baseAlpha);
          }
        }
      }

      ctx.restore();
    }

    function traceFieldLine(x0, y0, dir, geom, polaritySign, strengthFactor) {
      const pts = [{ x: x0, y: y0 }];
      let x = x0;
      let y = y0;
      const stepSize = 6;
      const maxSteps = 220;

      for (let s = 0; s < maxSteps; s++) {
        const f1 = evaluateMagneticField(x, y, geom, polaritySign, strengthFactor);
        if (f1.mag < 1e-5) break;
        const ux1 = (f1.bx / f1.mag) * dir;
        const uy1 = (f1.by / f1.mag) * dir;

        // RK2 midpoint integration for smooth closed loops
        const mx = x + ux1 * stepSize * 0.5;
        const my = y + uy1 * stepSize * 0.5;
        const f2 = evaluateMagneticField(mx, my, geom, polaritySign, strengthFactor);
        if (f2.mag < 1e-5) break;
        const ux2 = (f2.bx / f2.mag) * dir;
        const uy2 = (f2.by / f2.mag) * dir;

        x += ux2 * stepSize;
        y += uy2 * stepSize;

        if (x < -40 || x > width + 40 || y < -40 || y > height + 40) break;

        pts.push({ x, y });

        // Stop if loop closes back near center plane after traveling outward
        if (s > 18 && Math.abs(x - x0) < stepSize * 0.8 && Math.abs(y - y0) < stepSize * 1.4) {
          pts.push({ x: x0, y: y0 });
          break;
        }
      }
      return pts;
    }

    function drawFieldChevron(x, y, angle, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(4.5, 0);
      ctx.lineTo(-3.5, -3.2);
      ctx.lineTo(-1.8, 0);
      ctx.lineTo(-3.5, 3.2);
      ctx.closePath();
      ctx.fillStyle = `rgba(186, 230, 253, ${Math.min(1, alpha + 0.15).toFixed(3)})`;
      ctx.fill();
      ctx.restore();
    }

    // Draw procedural iron filings aligned with local B vector
    function drawIronFilings(geom, phys) {
      if (!state.showFilings) return;

      const strengthFactor = state.powerOn ? 1 : 0;
      ctx.save();
      for (let i = 0; i < filings.length; i++) {
        const f = filings[i];
        const px = width * 0.5 + f.u * (width * 0.48);
        const py = height * 0.44 + f.v * (height * 0.44);

        // Skip filings overlapping battery/switch area at very bottom
        if (py > height * 0.8) continue;

        const field = evaluateMagneticField(px, py, geom, phys.polaritySign, strengthFactor);
        let angle = (i * 1.37) % Math.PI; // Random resting angle when unpowered
        let alpha = 0.28;

        if (state.animPower > 0.05 && field.mag > 0.0005) {
          const targetAngle = Math.atan2(field.by, field.bx);
          angle = targetAngle;
          alpha = Math.min(0.88, 0.32 + Math.min(1, field.mag * 1.4) * 0.55);
        }

        const halfL = f.len * 0.5;
        const dx = Math.cos(angle) * halfL;
        const dy = Math.sin(angle) * halfL;

        ctx.beginPath();
        ctx.moveTo(px - dx, py - dy);
        ctx.lineTo(px + dx, py + dy);
        ctx.strokeStyle = `rgba(226, 232, 240, ${alpha.toFixed(2)})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      ctx.restore();
    }

    // Draw Right-Hand Grip Rule instructional vector overlay
    function drawRightHandRuleOverlay(geom) {
      if (!state.showRightHand || !state.powerOn) return;

      const { cx, cy, halfH } = geom;
      const boxW = 290;
      const boxH = 58;
      const bx = cx - boxW * 0.5;
      const by = Math.max(12, cy - halfH - 74);

      ctx.save();
      ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bx, by, boxW, boxH, 10);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#38bdf8";
      ctx.font = "700 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("RIGHT-HAND GRIP RULE", cx, by + 17);

      ctx.fillStyle = "#f8fafc";
      ctx.font = "500 11px system-ui, sans-serif";
      const curlDir = state.reversed ? "downward on front coils" : "upward on front coils";
      const thumbDir = state.reversed ? "LEFT (North Pole)" : "RIGHT (North Pole)";
      ctx.fillText(`Fingers curl ${curlDir}`, cx, by + 34);
      ctx.fillStyle = "#fca5a5";
      ctx.font = "700 11px system-ui, sans-serif";
      ctx.fillText(`Thumb points ${thumbDir}`, cx, by + 49);
      ctx.restore();
    }

    // Update & render draggable magnetic compass
    function updateAndDrawCompass(geom, phys, dt) {
      const compX = width * 0.5 + state.compass.nx * (width * 0.44);
      const compY = height * 0.44 + state.compass.ny * (height * 0.42);

      const strengthFactor = state.powerOn ? 1 : 0;
      const localField = evaluateMagneticField(compX, compY, geom, phys.polaritySign, strengthFactor);

      // Target angle: align with local magnetic field vector when powered, or settle east-west gently
      const targetAngle =
        state.powerOn && localField.mag > 0.0002
          ? Math.atan2(localField.by, localField.bx)
          : 0;

      if (reducedMotion || !state.powerOn) {
        state.compass.angle = targetAngle;
        state.compass.angularVel = 0;
      } else {
        // Shortest angular difference [-PI, PI]
        let diff = targetAngle - state.compass.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        // Damped harmonic oscillator for realistic compass needle settle
        const stiffness = 28;
        const damping = 7.5;
        const accel = stiffness * diff - damping * state.compass.angularVel;
        state.compass.angularVel += accel * dt;
        state.compass.angle += state.compass.angularVel * dt;
      }

      // Compute approximate local mT reading for student feedback
      const localMilliTesla = state.powerOn
        ? phys.bMilliTesla * Math.min(1.0, localField.mag / 1.25)
        : 0;
      const deg = (((state.compass.angle * 180) / Math.PI) % 360 + 360) % 360;
      elCompassReadout.textContent = `Compass B: ${
        localMilliTesla >= 100 ? localMilliTesla.toFixed(0) : localMilliTesla.toFixed(2)
      } mT | Dir: ${Math.round(deg)}°`;

      // Render compass housing & needle
      const radius = 23;
      ctx.save();
      ctx.translate(compX, compY);

      // Outer shadow & bezel
      ctx.beginPath();
      ctx.arc(0, 0, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = state.compass.dragging ? "#38bdf8" : "#cbd5e1";
      ctx.stroke();

      // Dial face
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#f8fafc";
      ctx.fill();

      // Tick marks
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      for (let t = 0; t < 8; t++) {
        const a = (t * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(a) * (radius - 4), Math.sin(a) * (radius - 4));
        ctx.lineTo(Math.cos(a) * (radius - 1), Math.sin(a) * (radius - 1));
        ctx.stroke();
      }

      // Rotating needle
      ctx.rotate(state.compass.angle);

      // North tip (Red)
      ctx.beginPath();
      ctx.moveTo(radius - 4, 0);
      ctx.lineTo(0, -4.5);
      ctx.lineTo(0, 4.5);
      ctx.closePath();
      ctx.fillStyle = "#dc2626";
      ctx.fill();

      // South tip (Blue)
      ctx.beginPath();
      ctx.moveTo(-(radius - 4), 0);
      ctx.lineTo(0, -4.5);
      ctx.lineTo(0, 4.5);
      ctx.closePath();
      ctx.fillStyle = "#2563eb";
      ctx.fill();

      // Center pivot pin
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();

      ctx.restore();
    }

    // Main render loop
    let rafId = null;
    let lastTime = performance.now();

    function render(now) {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      // Smooth transitions for power state and animations
      const targetPower = state.powerOn ? 1 : 0;
      const lerpRate = reducedMotion ? 1 : Math.min(1, dt * 10);
      state.animPower += (targetPower - state.animPower) * lerpRate;

      if (!reducedMotion && state.powerOn) {
        const speed = 35 + state.current * 18;
        state.phaseOffset += speed * dt;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Subtle laboratory grid background
      ctx.strokeStyle = "rgba(148, 163, 184, 0.07)";
      ctx.lineWidth = 1;
      const gridStep = 28;
      for (let gx = (width % gridStep) * 0.5; gx < width; gx += gridStep) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      for (let gy = (height % gridStep) * 0.5; gy < height; gy += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      const geom = getGeometry();
      const phys = getPhysics();

      drawIronFilings(geom, phys);
      drawCircuit(geom);
      drawSolenoidBackCoils(geom);
      drawCore(geom);
      drawMagneticFieldLines(geom, phys);
      drawSolenoidFrontCoils(geom);
      drawRightHandRuleOverlay(geom);
      updateAndDrawCompass(geom, phys, dt);

      ctx.restore();

      rafId = requestAnimationFrame(render);
    }

    // Pointer interaction for dragging the compass smoothly
    function updateCompassFromPointer(clientX, clientY) {
      const rect = canvasWrap.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      const nx = ((px - rect.width * 0.5) / (rect.width * 0.44));
      const ny = ((py - rect.height * 0.44) / (rect.height * 0.42));
      state.compass.nx = Math.max(-0.96, Math.min(0.96, nx));
      state.compass.ny = Math.max(-0.92, Math.min(0.82, ny));
    }

    canvasWrap.addEventListener(
      "pointerdown",
      (e) => {
        state.compass.dragging = true;
        canvasWrap.setPointerCapture(e.pointerId);
        updateCompassFromPointer(e.clientX, e.clientY);
      },
      { signal }
    );

    canvasWrap.addEventListener(
      "pointermove",
      (e) => {
        if (!state.compass.dragging) return;
        updateCompassFromPointer(e.clientX, e.clientY);
      },
      { signal }
    );

    const endDrag = (e) => {
      if (!state.compass.dragging) return;
      state.compass.dragging = false;
      if (canvasWrap.hasPointerCapture(e.pointerId)) {
        canvasWrap.releasePointerCapture(e.pointerId);
      }
    };

    canvasWrap.addEventListener("pointerup", endDrag, { signal });
    canvasWrap.addEventListener("pointercancel", endDrag, { signal });

    // UI Control Listeners (all bound with AbortSignal)
    btnPower.addEventListener(
      "click",
      () => {
        state.powerOn = !state.powerOn;
        syncUI(true);
      },
      { signal }
    );

    btnReverse.addEventListener(
      "click",
      () => {
        state.reversed = !state.reversed;
        if (!state.powerOn) state.powerOn = true;
        syncUI(true);
      },
      { signal }
    );

    sliderCurrent.addEventListener(
      "input",
      () => {
        state.current = parseFloat(sliderCurrent.value);
        syncUI(false);
      },
      { signal }
    );

    sliderTurns.addEventListener(
      "input",
      () => {
        state.turns = parseInt(sliderTurns.value, 10);
        syncUI(false);
      },
      { signal }
    );

    sliderLength.addEventListener(
      "input",
      () => {
        state.lengthCm = parseInt(sliderLength.value, 10);
        syncUI(false);
      },
      { signal }
    );

    selectCore.addEventListener(
      "change",
      () => {
        state.core = selectCore.value;
        syncUI(true);
      },
      { signal }
    );

    chkField.addEventListener(
      "change",
      () => {
        state.showFieldLines = chkField.checked;
      },
      { signal }
    );

    chkFilings.addEventListener(
      "change",
      () => {
        state.showFilings = chkFilings.checked;
      },
      { signal }
    );

    chkRhr.addEventListener(
      "change",
      () => {
        state.showRightHand = chkRhr.checked;
      },
      { signal }
    );

    chkElectrons.addEventListener(
      "change",
      () => {
        state.electronFlow = chkElectrons.checked;
        syncUI(false);
      },
      { signal }
    );

    // Preset inquiry buttons
    const presetButtons = root.querySelectorAll("[data-preset]");
    presetButtons.forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const preset = btn.getAttribute("data-preset");
          state.powerOn = true;
          if (preset === "standard") {
            state.current = 2.5;
            state.turns = 24;
            state.lengthCm = 16;
            state.reversed = false;
            state.core = "air";
          } else if (preset === "reverse") {
            state.current = 3.0;
            state.turns = 24;
            state.lengthCm = 16;
            state.reversed = !state.reversed;
            state.core = "air";
          } else if (preset === "electromagnet") {
            state.current = 3.5;
            state.turns = 32;
            state.lengthCm = 14;
            state.reversed = false;
            state.core = "iron";
          } else if (preset === "dense") {
            state.current = 4.0;
            state.turns = 48;
            state.lengthCm = 10;
            state.reversed = false;
            state.core = "air";
          }

          sliderCurrent.value = String(state.current);
          sliderTurns.value = String(state.turns);
          sliderLength.value = String(state.lengthCm);
          syncUI(true);
        },
        { signal }
      );
    });

    // Initialize UI and start animation loop
    syncUI(false);
    rafId = requestAnimationFrame(render);

    // Cleanup function executed when experiment is closed or switched
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      resizeObserver.disconnect();
    };
  }
};