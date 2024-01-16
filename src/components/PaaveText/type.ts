export const TEXT_TYPE = {
  /**
   * 10px, 12px lineHeight
   */
  REGULAR_10: 'REGULAR_10',

  /**
   * 12px, 16px lineHeight
   */
  REGULAR_12: 'REGULAR_12',
  /**
   * 14px, 16px lineHeight
   */
  REGULAR_14: 'REGULAR_14',
  /**
   * 16px, 22px lineHeight
   */
  REGULAR_16: 'REGULAR_16',
  /**
   * 18px, 24px lineHeight
   */
  REGULAR_18: 'REGULAR_18',
  /**
   * 24px, 30px lineHeight
   */
  REGULAR_24: 'REGULAR_24',
  /**
   * 12px, 16px lineHeight, 700
   */
  BOLD_10: 'BOLD_10',
  /**
   * 12px, 16px lineHeight, 700
   */
  BOLD_12: 'BOLD_12',

  /**
   * 14px, 18px lineHeight, 700
   */
  BOLD_14: 'BOLD_14',
  /**
   * 16px, 22px lineHeight, 700
   */
  BOLD_16: 'BOLD_16',
  /**
   * 18px, 24px lineHeight, 700
   */
  BOLD_18: 'BOLD_18',

  BOLD_20: 'BOLD_20',
} as const;

export type TEXT_TYPE = keyof typeof TEXT_TYPE;
