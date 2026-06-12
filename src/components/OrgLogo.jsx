import { useState } from "react";
import { asset } from "../utils.js";

/**
 * Organization logo for the experience timeline.
 * Falls back to a clean initials badge when no logo file is provided
 * or the image fails to load.
 */
export default function OrgLogo({ logo, organization }) {
  const [failed, setFailed] = useState(false);

  const initials = organization
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  if (!logo || failed) {
    return (
      <div className="org-logo org-logo-fallback" aria-hidden="true">
        {initials}
      </div>
    );
  }

  return (
    <img
      className="org-logo"
      src={asset(logo)}
      alt={`${organization} logo`}
      width="84"
      height="84"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
