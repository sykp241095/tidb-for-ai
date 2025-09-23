export const ANIMATION_DELAYS = {
  subheadline: '0.1s',
  command: '0.2s',
  buttons: '0.3s',
  stats: '0.5s',
  features: '0.7s',
} as const

export const ANIMATION_DURATIONS = {
  fast: '0.15s',
  normal: '0.3s',
  slow: '0.5s',
  extraSlow: '0.8s',
} as const

export const ANIMATION_EASINGS = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const