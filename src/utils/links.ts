/**
 * Anchor props for outbound links: web URLs open in a new tab, while
 * `mailto:` / `tel:` links stay in place (a new tab would just be left blank).
 */
export function externalLinkProps(url: string) {
  return /^(mailto|tel):/i.test(url) ? {} : { target: "_blank", rel: "noopener noreferrer" };
}
