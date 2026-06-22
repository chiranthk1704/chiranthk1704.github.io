import { useEffect, useRef } from "react";

/**
 * Space-time fabric background for the hero: a 3D grid plane drawn in
 * perspective, rippling very slowly, with a gentle gravity-well dip that
 * follows the cursor. Single muted color from the theme, canvas 2D,
 * no libraries. Respects reduced-motion (static frame, no interaction).
 */

const COLS = 48; // grid points across
const ROWS = 24; // grid points into the depth
const NEAR = 1; // nearest depth of the plane (world units)
const FAR = 6; // farthest depth (world units)
const CAM_HEIGHT = 1; // camera height above the plane
const WAVE_AMP = 0.045; // ripple height (world units) — keep small
const WAVE_SPEED = 0.012; // ripple speed per frame
const WELL_DEPTH = 0.3; // how far the fabric dips under the cursor
const WELL_RADIUS = 0.9; // radius of the dip (world units)

export default function HeroBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const color = getComputedStyle(document.documentElement)
      .getPropertyValue("--text-secondary")
      .trim();

    let width = 0;
    let height = 0;
    let focal = 0;
    let horizon = 0;
    let halfWidth = 0;

    // gravity well state (world coordinates), eased every frame
    const well = { x: 0, z: 0, strength: 0, targetX: 0, targetZ: 0, targetStrength: 0 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      focal = height * 1.15;
      horizon = height * 0.12; // screen y of the far edge
      // wide enough that the near edge of the plane overflows the screen
      halfWidth = (width / 2 / focal) * NEAR * 1.4;
    }

    function surfaceHeight(x, z, t) {
      let y = WAVE_AMP * Math.sin(1.6 * x + 0.8 * t) * Math.cos(1.1 * z + 0.6 * t);
      if (well.strength > 0.001) {
        const dx = x - well.x;
        const dz = z - well.z;
        y -= well.strength * WELL_DEPTH * Math.exp(-(dx * dx + dz * dz) / (WELL_RADIUS * WELL_RADIUS));
      }
      return y;
    }

    function project(x, y, z) {
      return {
        x: width / 2 + (x / z) * focal,
        y: horizon + ((CAM_HEIGHT + y) / z) * focal,
      };
    }

    function gridPoint(c, r, t) {
      const gx = (c / (COLS - 1)) * 2 - 1; // -1 .. 1
      const gz = r / (ROWS - 1); // 0 (near) .. 1 (far)
      const z = NEAR + gz * (FAR - NEAR);
      const x = gx * halfWidth * (z / NEAR);
      return project(x, surfaceHeight(x, z, t), z);
    }

    function rowAlpha(r) {
      const depth = r / (ROWS - 1);
      return 0.16 - depth * 0.12; // near rows brighter, far rows faint
    }

    function draw(t) {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      // precompute all projected points
      const pts = [];
      for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) row.push(gridPoint(c, r, t));
        pts.push(row);
      }

      // horizontal lines (one alpha per row)
      for (let r = 0; r < ROWS; r++) {
        ctx.globalAlpha = rowAlpha(r);
        ctx.beginPath();
        ctx.moveTo(pts[r][0].x, pts[r][0].y);
        for (let c = 1; c < COLS; c++) ctx.lineTo(pts[r][c].x, pts[r][c].y);
        ctx.stroke();
      }

      // vertical lines (per-segment alpha so they fade with depth)
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS - 1; r++) {
          ctx.globalAlpha = (rowAlpha(r) + rowAlpha(r + 1)) / 2;
          ctx.beginPath();
          ctx.moveTo(pts[r][c].x, pts[r][c].y);
          ctx.lineTo(pts[r + 1][c].x, pts[r + 1][c].y);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    }

    function onMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      const inside = mx >= 0 && mx <= rect.width && my > horizon + 8 && my <= rect.height;
      if (inside) {
        // invert the projection to find where on the plane the cursor sits
        const z = (CAM_HEIGHT * focal) / (my - horizon);
        const x = ((mx - width / 2) * z) / focal;
        well.targetX = x;
        well.targetZ = z;
        well.targetStrength = 1;
      } else {
        well.targetStrength = 0;
      }
    }

    function easeWell() {
      well.x += (well.targetX - well.x) * 0.08;
      well.z += (well.targetZ - well.z) * 0.08;
      well.strength += (well.targetStrength - well.strength) * 0.06;
    }

    resize();

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // touch devices have no cursor to drive the grid, so the motion would
    // just be a distraction behind the text — show one static frame instead
    const noPointer = !window.matchMedia("(pointer: fine)").matches;

    if (reducedMotion || noPointer) {
      draw(0);
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }

    let frameId;
    let t = 0;
    function loop() {
      t += WAVE_SPEED;
      easeWell();
      draw(t);
      frameId = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [theme]);

  return (
    <div className="hero-background" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
