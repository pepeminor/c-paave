export type StockStatus = 'Advanced' | 'Unchanged' | 'Declined';

export const ThemeDetailTab = {
  TodayMovement: 'today_movement',
  RatioComparison: 'ratio_comparison',
} as const;
export type ThemeDetailTab = keyof typeof ThemeDetailTab;
