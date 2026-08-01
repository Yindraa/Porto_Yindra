// Pure CSS (grid drift + scanline sweep), so no client JS is needed here.
// Reduced-motion is already handled by the global media query in globals.css.
export function TechBackground() {
  return (
    <>
      <div className="tech-grid" aria-hidden="true" />
      <div className="tech-scanline" aria-hidden="true" />
    </>
  );
}
