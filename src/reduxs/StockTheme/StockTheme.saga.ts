import { watchGetThemeDetail } from './sagas/GetThemeDetail';
import { watchGetThemeList } from './sagas/GetThemeList';
import { watchGetThemeRatioDetail } from './sagas/GetThemeRatioDetail';

export const StockThemeSagas = { watchGetThemeList, watchGetThemeDetail, watchGetThemeRatioDetail };
