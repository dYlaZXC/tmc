import type { ReactNode } from "react";

/** Line icons used across the site (24×24, stroke = currentColor). */
const PATHS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 8.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1z" />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.8" r=".8" fill="currentColor" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M8 3v5a4 4 0 0 0 8 0V3" />
      <path d="M6 3h4M14 3h4M12 12v3a4 4 0 0 0 8 0v-1" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  stethoscopeFull: (
    <>
      <path d="M8 3v5a4 4 0 0 0 8 0V3" />
      <path d="M6 3h4M14 3h4M12 12v3a4 4 0 0 0 8 0v-1" />
      <circle cx="20" cy="12" r="2" />
      <path d="M12 19v2" />
    </>
  ),
  stethoscopeLine: <path d="M8 3v5a4 4 0 0 0 8 0V3M6 3h4M14 3h4M12 12v3a4 4 0 0 0 8 0v-1" />,
  chat: (
    <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
  ),
  monitoring: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2M4 5l2-2M20 5l-2-2" />
    </>
  ),
  medicalCross: (
    <>
      <path d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
  document: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
  adult: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="7" r="3" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2M9 14h6" />
    </>
  ),
  female: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v9M8 17h8" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7h.01" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

interface IconProps {
  name: IconName;
  /** Rendered width/height in px; omit to size via CSS. */
  size?: number;
  strokeWidth?: number;
}

export function Icon({ name, size, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12.04 2C6.55 2 2.08 6.47 2.08 11.96c0 1.76.46 3.47 1.34 4.98L2 22l5.2-1.36a9.93 9.93 0 0 0 4.83 1.23h.01c5.49 0 9.96-4.47 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0 0 12.04 2zm0 18.18a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.09.81.82-3.01-.2-.31a8.18 8.18 0 1 1 6.95 3.83zm4.5-6.13c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.56.13-.17.25-.65.81-.79.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.3 3.79.6.26 1.07.41 1.43.52.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}
