import { useEffect, useRef } from "react";

/**
 * Circular custom cursor (desktop only — devices with a fine pointer).
 * - Follows the mouse with slight smoothing.
 * - Grows when hovering links and buttons.
 * - Grows when the mouse is shaken, like the macOS "shake to find" pointer.
 * Uses mix-blend-mode: difference so it stays visible on both themes.
 */

const FOLLOW = 1; // position smoothing (1 = instant)
const HOVER_SCALE = 2.2; // size over links/buttons
const SHAKE_SCALE = 5; // size while shaking
const SHAKE_WINDOW = 300; // ms of movement history used to detect a shake

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    // touchscreens and trackpads without hover keep the native behavior
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");
    const dot = dotRef.current;

    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let scale = 1;
    let hoverScale = 1;
    let shakeScale = 1;
    let visible = false;
    const trail = [];

    function onMouseMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      visible = true;
      trail.push({ x: targetX, y: targetY, t: performance.now() });
    }

    function onMouseOver(event) {
      hoverScale = event.target.closest("a, button") ? HOVER_SCALE : 1;
    }

    function onMouseLeave() {
      visible = false;
    }

    function detectShake(now) {
      while (trail.length && now - trail[0].t > SHAKE_WINDOW) trail.shift();
      if (trail.length < 6) return false;

      let path = 0;
      for (let i = 1; i < trail.length; i++) {
        path += Math.hypot(
          trail[i].x - trail[i - 1].x,
          trail[i].y - trail[i - 1].y
        );
      }
      const first = trail[0];
      const last = trail[trail.length - 1];
      const net = Math.hypot(last.x - first.x, last.y - first.y);

      // a shake covers a lot of distance but ends up near where it started
      return path > 500 && path > net * 4;
    }

    let frameId;
    function loop() {
      const now = performance.now();

      const shaking = detectShake(now);
      // grow quickly, shrink back gently
      shakeScale += ((shaking ? SHAKE_SCALE : 1) - shakeScale) * (shaking ? 0.25 : 0.08);

      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      const targetScale = Math.max(hoverScale, shakeScale);
      scale += (targetScale - scale) * 0.2;

      dot.style.opacity = visible ? "1" : "0";
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;

      frameId = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
