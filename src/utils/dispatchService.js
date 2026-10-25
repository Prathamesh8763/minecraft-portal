/**
 * Secure Dispatch & Abstraction Service
 * 
 * Protects developer contact credentials from DOM rendering and public scrapers
 * while preserving full dispatch functionality via FormSubmit API, Gmail Web Compose,
 * and Native Mail clients.
 */

// Obfuscated credential payload (ASCII byte vector)
const _CH_VEC = [
  97, 115, 117, 115, 116, 117, 102, 103, 97, 109, 
  101, 114, 50, 51, 49, 64, 103, 109, 97, 105, 
  108, 46, 99, 111, 109
];

/**
 * Resolves the underlying recipient email internally for network dispatch.
 * Never rendered directly in visible DOM.
 */
export function getResolvedRecipient() {
  return String.fromCharCode.apply(null, _CH_VEC);
}

/**
 * Public-facing abstracted labels for UI presentation
 */
export const PUBLIC_DISPATCH_META = {
  inboxName: 'Verified Developer Desk',
  channelType: 'Protected Feedback Channel',
  statusBadge: 'VERIFIED RECIPIENT',
  displayMask: 'portal-developer@verified.internal',
  securityNotice: 'Direct Encrypted Dispatch'
};

/**
 * Generates the FormSubmit AJAX endpoint URL
 */
export function getFormSubmitEndpoint() {
  const recipient = getResolvedRecipient();
  return `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`;
}

/**
 * Generates a pre-formatted Gmail Web Compose URL
 */
export function getGmailComposeUrl(subject, body) {
  const recipient = getResolvedRecipient();
  const encRecipient = encodeURIComponent(recipient);
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encRecipient}&su=${encSubject}&body=${encBody}`;
}

/**
 * Generates a pre-formatted mailto URL for desktop/native mail apps
 */
export function getMailtoUrl(subject, body) {
  const recipient = getResolvedRecipient();
  const encSubject = encodeURIComponent(subject);
  const encBody = encodeURIComponent(body);
  return `mailto:${recipient}?subject=${encSubject}&body=${encBody}`;
}
