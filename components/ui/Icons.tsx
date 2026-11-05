import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.7 1 1.4 1.7 1.9.4.3.8.5 1.2.7.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.3.1.4.2.4.4 0 .6-.3 1.4-.9 1.7-.6.3-1.5.4-3.2-.3-1.9-.8-3.3-2.5-3.9-3.4-.5-.8-.9-1.8-.9-2.7 0-.8.3-1.3.5-1.6z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V16M8 8v.01M11.5 16v-5.5M11.5 13c0-1.5 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function YouTubeIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" />
    </svg>
  );
}
