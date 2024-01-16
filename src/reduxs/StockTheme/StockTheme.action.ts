import { ThemeDetailParams, ThemeListParams, ThemeRatioDetailParams } from 'interfaces/stockTheme';
import { generateToolkitAction } from 'utils';

export const getThemeList = generateToolkitAction<ThemeListParams>('StockTheme/getThemeList');

export const getThemeDetail = generateToolkitAction<ThemeDetailParams>('StockTheme/getThemeDetail');

export const getThemeRatioDetail = generateToolkitAction<ThemeRatioDetailParams>('StockTheme/getThemeRatioDetail');
