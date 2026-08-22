/**
 * Body scroll lock with counted owners. Two overlays can be open at once —
 * the chat panel and MegaNav's mobile drawer — and whichever closes first
 * must not unlock the page while the other still covers it. Each caller
 * locks under its own key; the body unlocks only when the last key releases.
 *
 * The lock fixes the body in place rather than hiding its overflow. iOS
 * Safari ignores `overflow: hidden` on the body: a touch still scrolls the
 * document, and focusing a field scrolls it programmatically to bring the
 * field above the keyboard — which slid the page out from under the
 * fixed chat panel. A fixed body has no scrollable overflow at all, so
 * neither can move it. The body is pinned at its current scroll offset so
 * the page behind the overlay does not visibly jump, and the offset is
 * restored when the last owner releases.
 */
const owners = new Set<string>();
let lockedScrollY = 0;

export function lockBodyScroll(owner: string) {
  if (owners.size === 0) {
    lockedScrollY = window.scrollY;
    const { style } = document.body;
    style.position = "fixed";
    style.top = `-${lockedScrollY}px`;
    style.left = "0";
    style.right = "0";
    style.overflow = "hidden";
  }
  owners.add(owner);
}

export function unlockBodyScroll(owner: string) {
  /* Callers release on cleanup whether or not they locked; releasing a key
     that was never held must not touch the page. */
  if (!owners.delete(owner) || owners.size > 0) return;
  const { style } = document.body;
  style.position = "";
  style.top = "";
  style.left = "";
  style.right = "";
  style.overflow = "";
  /* Instant, not smooth: the html element opts into smooth scrolling, and
     this is a restore, not a movement the visitor should see. */
  window.scrollTo({ top: lockedScrollY, behavior: "instant" });
}
