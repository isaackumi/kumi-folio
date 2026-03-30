/**
 * Sanity Studio — access via `npx sanity dev` locally
 * or deploy to https://[your-project].sanity.studio
 *
 * Embedded studio requires React 18. Since this project uses React 19,
 * run the studio separately:
 *   cd <project-root> && npx sanity dev
 */
export default function StudioRedirect() {
  return (
    <div style={{ fontFamily: "monospace", padding: "2rem" }}>
      <h1>Sanity Studio</h1>
      <p>Run <code>npx sanity dev</code> in the project root to access the studio locally.</p>
    </div>
  );
}
