/**
 * Body scroll lock with counted owners. Two overlays can be open at once —
 * the chat panel and MegaNav's mobile drawer — and whichever closes first
 * must not unlock the page while the other still covers it. Each caller
 * locks under its own key; the body unlocks only when the last key releases.
 */
const owners = new Set<string>();

export function lockBodyScroll(owner: string) {
  owners.add(owner);
  document.body.style.overflow = "hidden";
}

export function unlockBodyScroll(owner: string) {
  owners.delete(owner);
  if (owners.size === 0) {
    document.body.style.overflow = "";
  }
}
