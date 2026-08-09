/**
 * Every site path the model cites must actually exist. The model can invent
 * `/foundations/colour` with complete confidence; this is the single
 * highest-yield programmatic check in the eval. Routes come from
 * scripts/site-routes.mjs — the filesystem, the same authority the coverage
 * validator uses.
 */
import { resolvesOnSite } from '../../scripts/site-routes.mjs';

// A path candidate: starts a `/`, lowercase-slug segments, not preceded by a
// word character, `/`, `.` or `:` (which would make it a URL tail, a file
// path like src/components, or a fraction).
const PATH_PATTERN = /(?<![\w/.:])\/[a-z][a-z0-9-]*(?:\/[a-z0-9-]+)*/g;

export default function assertPaths(output) {
  const cited = [...new Set(String(output).match(PATH_PATTERN) ?? [])];
  const broken = cited.filter((path) => !resolvesOnSite(path));
  if (broken.length === 0) {
    return { pass: true, score: 1, reason: cited.length ? `all cited paths resolve: ${cited.join(', ')}` : 'no paths cited' };
  }
  return { pass: false, score: 0, reason: `cited paths that do not exist: ${broken.join(', ')}` };
}
