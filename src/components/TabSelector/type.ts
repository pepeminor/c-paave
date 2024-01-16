export const TAB_SELECTOR_TYPE = {
  UNDERLINE: 'UNDERLINE',
  SOLID: 'SOLID',
  SOLID_WITH_WRAPPER: 'SOLID_WITH_WRAPPER',
  SOLID_WITH_HIGHLIGHT: 'SOLID_WITH_HIGHLIGHT',
} as const;
export type TAB_SELECTOR_TYPE = keyof typeof TAB_SELECTOR_TYPE;