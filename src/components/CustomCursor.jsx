import { useEffect, useRef } from "react";

/**
 * A small circle that trails the normal cursor with a slight delay.
 * The native OS cursor is left completely untouched — this is purely
 * a decorative follower. Desktop only (devices with a fine pointer);
 * disabled for reduced-motion users.
 */

const FOLLOW = 0.15; // lower = more lag/delay behind the cursor

export default function CustomCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    let targetX = -100;
    let targetY = -100;
    let x = -100;
    let y = -100;
    let visible = false;

    function onMouseMove(event) {
      targetX = event.clientX;
      targetY = event.clientY;
      visible = true;
    }

    function onMouseLeave() {
      visible = false;
    }

    let frameId;
    function loop() {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
      dot.style.opacity = visible ? "1" : "0";
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener("mousemove", onMouseMove);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
