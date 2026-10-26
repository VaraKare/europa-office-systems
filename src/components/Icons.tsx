type P = { className?: string }
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export const PhoneIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 3.5h3.2l1.6 4.2-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 4.2 1.6V17a2.5 2.5 0 0 1-2.7 2.5C9.3 19 5 14.7 4.5 6.2A2.5 2.5 0 0 1 5 3.5Z" />
  </svg>
)

/** Generic chat-bubble glyph (not the WhatsApp trademark logo). */
export const ChatIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z" />
    <path d="M9 10.5h6M9 13.5h4" />
  </svg>
)

export const ArrowIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ChevronIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export const FormIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="5" y="3.5" width="14" height="17" rx="1" />
    <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
  </svg>
)

export const MapIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
)

export const MenuIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const CheckIcon = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)
