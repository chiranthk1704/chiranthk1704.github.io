/**
 * Resolves a path inside the `public/` folder to a URL that works both in
 * development and after deployment (e.g. on GitHub Pages).
 *
 * Example: asset("images/projects/plantefy.png")
 */
export function asset(path) {
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
