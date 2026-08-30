"use client";

/**
 * Shader-glow experiment: iteration two of the AI glow, worn by the live
 * site so the AiButton FAB and the SiteChat composer can be judged in a
 * realistic scene. Dev-only, mounted by GlowExperimentMount behind `?glow`.
 *
 * One fullscreen WebGL2 canvas draws a traveling comet pulse along the
 * border of every visible `.ds-ai-button` and `.ds-composer` (up to four).
 * At rest the elements show their plain token outlines: the experiment
 * suppresses the production conic glow and the float shadows while active,
 * per the rest-state and shadow rules from the Traveling Glow POC.
 *
 * Nothing here persists or ships: settings live in memory, and the
 * production bundle never includes this module.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./GlowExperiment.module.css";

const MAX_TARGETS = 4;
const TARGET_SELECTOR = ".ds-ai-button, .ds-composer";
const RESCAN_MS = 500;
const STAGGER_S = 1.7;

const VERT = `#version 300 es
void main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2));
gl_Position=vec4(p*2.0-1.0,0.0,1.0);}`;

const FRAG = `#version 300 es
precision highp float;
const int N = ${MAX_TARGETS};
uniform vec2 u_res;uniform float u_dpr;
uniform vec2 u_center[N];uniform vec2 u_half[N];uniform float u_r[N];
uniform float u_head[N];uniform float u_vis[N];
uniform float u_comet;uniform float u_bloom;uniform float u_time;uniform float u_dark;
uniform vec3 u_c0;uniform vec3 u_c1;uniform vec3 u_c2;
out vec4 o;
float sdRR(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float perim(vec2 p,vec2 b,float r,out float P){
  vec2 c=max(b-vec2(r),vec2(0.));float arc=1.5707963*r;
  P=4.*c.x+4.*c.y+4.*arc;float s;
  if(abs(p.x)<=c.x){s=(p.y<=0.)?(p.x+c.x):(2.*c.x+2.*arc+2.*c.y+(c.x-p.x));}
  else if(abs(p.y)<=c.y){s=(p.x>0.)?(2.*c.x+arc+(p.y+c.y)):(4.*c.x+3.*arc+2.*c.y+(c.y-p.y));}
  else{vec2 cc=vec2(sign(p.x)*c.x,sign(p.y)*c.y);vec2 v=p-cc;float a=atan(v.y,v.x);
    if(p.x>0.&&p.y<0.)s=2.*c.x+(a+1.5707963)*r;
    else if(p.x>0.&&p.y>0.)s=2.*c.x+arc+2.*c.y+a*r;
    else if(p.x<0.&&p.y>0.)s=4.*c.x+2.*arc+2.*c.y+(a-1.5707963)*r;
    else s=4.*c.x+3.*arc+4.*c.y+(a+3.14159265)*r;}
  return s/max(P,1e-4);}
void main(){
  vec2 px=gl_FragCoord.xy/u_dpr;
  vec2 pcss=vec2(px.x,u_res.y-px.y);
  vec3 rgb=vec3(0.);float alpha=0.;
  for(int i=0;i<N;i++){
    if(u_vis[i]<=0.001||u_half[i].x<=0.)continue;
    vec2 p=pcss-u_center[i];
    if(abs(p.x)>u_half[i].x+130.||abs(p.y)>u_half[i].y+130.)continue;
    float P;float sn=perim(p,u_half[i],u_r[i],P);
    float d=sdRR(p,u_half[i],u_r[i]);float ad=abs(d);
    float ds=fract(u_head[i]-sn);
    float dmin=min(ds,1.-ds);
    float k=smoothstep(8.,64.,ad);
    float wTail=max(u_comet*0.28,1e-3)*(1.+ad*0.010);
    float wLead=0.010+ad*0.0040;
    float e1=exp(-1./wTail);float e2=exp(-1./wLead);
    float comet=exp(-ds/wTail)-e1*ds+exp(-(1.-ds)/wLead)-e2*(1.-ds);
    comet=mix(comet,wTail+wLead,0.9*k);
    float wHot=0.008+ad*0.003;
    float hot=exp(-(dmin*dmin)/(wHot*wHot*2.))*exp(-ad/16.);
    float pulse=(0.8*comet+0.6*hot)*u_vis[i];
    float wob=0.72+0.45*sin(6.2832*(sn*3.0)+u_time*1.4);
    float line=smoothstep(1.7,0.25,ad);
    float bN=exp(-ad/(5.5*wob));float bM=exp(-ad/(15.*wob));float bF=exp(-ad/26.);
    float side=mix(0.,1.,smoothstep(-1.5,1.5,d));
    float shimmer=0.94+0.12*hash(px*0.7+vec2(floor(u_time*9.)*13.7));
    float a=line*1.3*pulse+u_bloom*pulse*side*shimmer*mix(0.5,1.,u_dark)*(0.55*bN+0.32*bM+0.14*bF*u_dark);
    a*=1.-smoothstep(70.,120.,ad);
    float gx=clamp(p.x/(2.*u_half[i].x)+0.5,0.,1.);
    vec3 col=gx<0.5?mix(u_c0,u_c1,gx*2.):mix(u_c1,u_c2,gx*2.-1.);
    col=mix(col,vec3(1.),min(hot*u_vis[i],1.)*0.35*u_dark);
    a+=(hash(px)-0.5)*0.012*smoothstep(0.,0.03,a);
    a=clamp(a,0.,1.);
    rgb+=col*a;alpha+=a;
  }
  o=vec4(rgb,min(alpha,1.));}`;

type Mode = "pulse" | "cont";

type Settings = {
  cycle: number;
  comet: number;
  bloom: number;
  mode: Mode;
  focusGate: boolean;
};

const DEFAULTS: Settings = {
  cycle: 6,
  comet: 120,
  bloom: 1,
  mode: "pulse",
  focusGate: false,
};

function parseColor(value: string): [number, number, number] | null {
  const v = value.trim();
  const hex = v.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  const rgb = v.match(/^rgba?\(([^)]+)\)$/);
  if (rgb) {
    const parts = rgb[1].split(",").map((x) => parseFloat(x));
    if (parts.length >= 3) {
      return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
    }
  }
  return null;
}

function readThemeColors() {
  const rootStyle = getComputedStyle(document.documentElement);
  const token = (name: string, fallback: [number, number, number]) =>
    parseColor(rootStyle.getPropertyValue(name)) ?? fallback;
  /* The pre-paint script guarantees data-theme on the root; the body's own
     background is transparent (the ambient layer paints the page), so a
     luminance read would misreport the theme. */
  const dark =
    document.documentElement.getAttribute("data-theme") === "light" ? 0 : 1;
  return {
    c0: token("--color-ai-gradient-start", [0.95, 0.39, 0.52]),
    c1: token("--color-ai-gradient-mid", [0.2, 0.35, 0.77]),
    c2: token("--color-ai-gradient-end", [0.05, 0.43, 0.56]),
    dark,
  };
}

function setTheme(value: "light" | "dark") {
  document.documentElement.setAttribute("data-theme", value);
  localStorage.setItem("theme", value);
}

export default function GlowExperiment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [panelOpen, setPanelOpen] = useState(true);
  const [themeAuto, setThemeAuto] = useState(false);
  const [glStatus, setGlStatus] = useState<"pending" | "active" | "unavailable">(
    "pending",
  );
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Auto-cycle the theme so the effect can be judged adapting live. */
  useEffect(() => {
    if (!themeAuto) return;
    const id = window.setInterval(() => {
      const current =
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
      setTheme(current === "light" ? "dark" : "light");
    }, 4000);
    return () => window.clearInterval(id);
  }, [themeAuto]);

  /* The whole engine: GL setup, target discovery, draw loop. */
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      setGlStatus("unavailable");
      return;
    }

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("[glow-experiment]", gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setGlStatus("unavailable");
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[glow-experiment]", gl.getProgramInfoLog(prog));
      setGlStatus("unavailable");
      return;
    }
    gl.useProgram(prog);
    const U: Record<string, WebGLUniformLocation | null> = {};
    [
      "u_res",
      "u_dpr",
      "u_center",
      "u_half",
      "u_r",
      "u_head",
      "u_vis",
      "u_comet",
      "u_bloom",
      "u_time",
      "u_dark",
      "u_c0",
      "u_c1",
      "u_c2",
    ].forEach((n) => {
      U[n] = gl.getUniformLocation(prog, n);
    });
    setGlStatus("active");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = () => {
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    size();
    window.addEventListener("resize", size);

    /* The suppressed shadows live on wrapper elements whose class names are
       CSS-module hashes (the FAB pill), so they are found by computed style
       and restored on cleanup. */
    let targets: HTMLElement[] = [];
    const shadowPatched = new Map<HTMLElement, string>();
    const rescan = () => {
      targets = Array.from(
        document.querySelectorAll<HTMLElement>(TARGET_SELECTOR),
      )
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        })
        .slice(0, MAX_TARGETS);
      targets.forEach((el) => {
        const parent = el.parentElement;
        if (!parent || shadowPatched.has(parent)) return;
        if (getComputedStyle(parent).boxShadow !== "none") {
          shadowPatched.set(parent, parent.style.boxShadow);
          parent.style.boxShadow = "none";
        }
      });
    };
    rescan();
    const rescanId = window.setInterval(() => {
      rescan();
      /* Self-heal the buffer size: a mount while the viewport reports 0x0
         (a hidden embedded pane) leaves a 1px canvas, and no resize event
         is guaranteed when the pane comes back. */
      if (canvas.width !== Math.max(1, Math.round(window.innerWidth * dpr))) {
        size();
      }
    }, RESCAN_MS);

    let colors = readThemeColors();
    const applyBlend = () => {
      canvas.style.mixBlendMode = colors.dark ? "screen" : "normal";
    };
    applyBlend();
    const themeObserver = new MutationObserver(() => {
      colors = readThemeColors();
      applyBlend();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const centers = new Float32Array(MAX_TARGETS * 2);
    const halves = new Float32Array(MAX_TARGETS * 2);
    const radii = new Float32Array(MAX_TARGETS);
    const heads = new Float32Array(MAX_TARGETS);
    const vises = new Float32Array(MAX_TARGETS);

    /* Dev introspection for the experiment itself. */
    const debug: {
      frames: number;
      lastActive: number;
      targets: () => string[];
      colors: () => ReturnType<typeof readThemeColors>;
      step?: (now: number) => void;
      canvas: HTMLCanvasElement;
      lastState: Record<string, unknown>;
    } = {
      frames: 0,
      lastActive: 0,
      targets: () => targets.map((t) => t.className),
      colors: () => colors,
      canvas,
      lastState: {},
    };
    (window as unknown as { __glowX?: typeof debug }).__glowX = debug;

    let raf = 0;
    const draw = (now: number) => {
      const s = settingsRef.current;
      let anyActive = false;
      for (let i = 0; i < MAX_TARGETS; i++) {
        const el = targets[i];
        halves[i * 2] = 0;
        vises[i] = 0;
        if (!el || !el.isConnected) continue;
        const r = el.getBoundingClientRect();
        if (r.width <= 0) continue;
        if (
          s.focusGate &&
          el.classList.contains("ds-composer") &&
          !el.matches(":focus-within")
        ) {
          continue;
        }
        const t = ((now / 1000 + i * STAGGER_S) / s.cycle) % 1;
        let head = t;
        let vis = 1;
        if (s.mode === "pulse") {
          const sweep = 0.44;
          if (t < sweep) {
            const u = t / sweep;
            head = u;
            vis = Math.min(1, u / 0.14) * (1 - Math.max(0, (u - 0.82) / 0.18));
          } else {
            vis = 0;
          }
        }
        if (vis <= 0) continue;
        centers[i * 2] = r.left + r.width / 2;
        centers[i * 2 + 1] = r.top + r.height / 2;
        halves[i * 2] = r.width / 2;
        halves[i * 2 + 1] = r.height / 2;
        const cssRadius = parseFloat(
          getComputedStyle(el).borderTopLeftRadius,
        );
        radii[i] = Math.min(
          Number.isFinite(cssRadius) ? cssRadius : r.height / 2,
          r.height / 2,
        );
        heads[i] = head;
        vises[i] = vis;
        anyActive = true;
      }
      debug.frames++;
      if (anyActive) debug.lastActive = now;
      debug.lastState = {
        anyActive,
        mode: s.mode,
        vises: Array.from(vises),
        centers: Array.from(centers.slice(0, 4)),
        halves: Array.from(halves.slice(0, 4)),
        radii: Array.from(radii.slice(0, 2)),
        heads: Array.from(heads.slice(0, 2)),
        canvasW: canvas.width,
        glError: gl.getError(),
      };
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      if (!anyActive) return;
      gl.uniform2f(U.u_res, window.innerWidth, window.innerHeight);
      gl.uniform1f(U.u_dpr, dpr);
      gl.uniform2fv(U.u_center, centers);
      gl.uniform2fv(U.u_half, halves);
      gl.uniform1fv(U.u_r, radii);
      gl.uniform1fv(U.u_head, heads);
      gl.uniform1fv(U.u_vis, vises);
      gl.uniform1f(U.u_comet, s.comet / 360);
      gl.uniform1f(U.u_bloom, s.bloom);
      gl.uniform1f(U.u_time, now / 1000);
      gl.uniform1f(U.u_dark, colors.dark);
      gl.uniform3fv(U.u_c0, colors.c0);
      gl.uniform3fv(U.u_c1, colors.c1);
      gl.uniform3fv(U.u_c2, colors.c2);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!document.hidden) draw(now);
    };
    raf = requestAnimationFrame(tick);
    debug.step = draw;

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(rescanId);
      window.removeEventListener("resize", size);
      themeObserver.disconnect();
      shadowPatched.forEach((value, el) => {
        el.style.boxShadow = value;
      });
      /* Deliberately no loseContext() here: under StrictMode the effect
         re-runs against the same canvas, and a freed context would poison
         the second setup. The context goes away with the canvas node. */
    };
  }, [reducedMotion]);

  const set = useCallback(
    (patch: Partial<Settings>) =>
      setSettings((prev) => ({ ...prev, ...patch })),
    [],
  );

  return (
    <>
      {/* While the experiment is live, the production conic glow and the
          float shadows stand down: the shader owns the effect, and at rest
          both targets show their plain token outlines. */}
      <style>{`
        html[data-glow-experiment] .ds-ai-button::before,
        html[data-glow-experiment] .ds-ai-button::after,
        html[data-glow-experiment] .ds-composer--ai-glow::before,
        html[data-glow-experiment] .ds-composer--ai-glow::after { display: none !important; }
        html[data-glow-experiment] .ds-ai-button {
          box-shadow: inset 0 0 0 var(--border-md) var(--color-input-border-primary);
        }
        html[data-glow-experiment] .ds-composer { box-shadow: none; }
        html[data-glow-experiment] .ds-composer--ai-glow:focus-within {
          border-color: var(--color-input-border-primary);
        }
      `}</style>
      <MarkRoot />
      {!reducedMotion && (
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden />
      )}
      <aside
        className={
          panelOpen ? styles.panel : `${styles.panel} ${styles.panelCollapsed}`
        }
        aria-label="Glow experiment controls"
      >
        <header className={styles.panelHeader}>
          <span className={styles.panelTitle}>Glow experiment</span>
          <button
            type="button"
            className={styles.collapse}
            onClick={() => setPanelOpen((v) => !v)}
          >
            {panelOpen ? "Hide" : "Show"}
          </button>
        </header>
        {panelOpen && (
          <div className={styles.body}>
            {reducedMotion && (
              <p className={styles.note}>
                Reduced motion is on, so the pulse stays off and the targets
                keep their plain outlines.
              </p>
            )}
            {glStatus === "unavailable" && (
              <p className={styles.note}>WebGL is unavailable in this browser.</p>
            )}
            <label className={styles.row}>
              <span>Cycle</span>
              <input
                type="range"
                min={2}
                max={12}
                step={0.5}
                value={settings.cycle}
                onChange={(e) => set({ cycle: Number(e.target.value) })}
              />
              <output>{settings.cycle.toFixed(1)}s</output>
            </label>
            <label className={styles.row}>
              <span>Comet</span>
              <input
                type="range"
                min={40}
                max={220}
                step={5}
                value={settings.comet}
                onChange={(e) => set({ comet: Number(e.target.value) })}
              />
              <output>{settings.comet}&deg;</output>
            </label>
            <label className={styles.row}>
              <span>Bloom</span>
              <input
                type="range"
                min={0}
                max={1.6}
                step={0.05}
                value={settings.bloom}
                onChange={(e) => set({ bloom: Number(e.target.value) })}
              />
              <output>{settings.bloom.toFixed(2)}</output>
            </label>
            <div className={styles.row}>
              <span>Mode</span>
              <div className={styles.seg}>
                <button
                  type="button"
                  aria-pressed={settings.mode === "pulse"}
                  onClick={() => set({ mode: "pulse" })}
                >
                  Pulse
                </button>
                <button
                  type="button"
                  aria-pressed={settings.mode === "cont"}
                  onClick={() => set({ mode: "cont" })}
                >
                  Loop
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <span>Composer</span>
              <div className={styles.seg}>
                <button
                  type="button"
                  aria-pressed={!settings.focusGate}
                  onClick={() => set({ focusGate: false })}
                >
                  Always
                </button>
                <button
                  type="button"
                  aria-pressed={settings.focusGate}
                  onClick={() => set({ focusGate: true })}
                >
                  On focus
                </button>
              </div>
            </div>
            <div className={styles.row}>
              <span>Theme</span>
              <div className={styles.seg}>
                <button type="button" onClick={() => setTheme("light")}>
                  Light
                </button>
                <button type="button" onClick={() => setTheme("dark")}>
                  Dark
                </button>
                <button
                  type="button"
                  aria-pressed={themeAuto}
                  onClick={() => setThemeAuto((v) => !v)}
                >
                  Cycle
                </button>
              </div>
            </div>
            <p className={styles.note}>
              Open the chat to see the composer. Remove ?glow from the URL to
              turn the experiment off.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}

/** Stamps the root attribute the suppression CSS keys off, and removes it
 *  when the experiment unmounts. */
function MarkRoot() {
  useEffect(() => {
    document.documentElement.setAttribute("data-glow-experiment", "");
    return () => {
      document.documentElement.removeAttribute("data-glow-experiment");
    };
  }, []);
  return null;
}
