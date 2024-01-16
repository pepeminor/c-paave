import InfoTVChart from 'components/InfoTVChart';
import { LANG } from 'global';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { memo } from 'react';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import globalStyles from 'styles';
import { navigate } from 'utils';
import useStyles from './styles';
import { FilterChart, OtherButton, TVChartFilter } from 'components/InfoTVChart/InfoTVChart.type';

export const TVChart = memo(() => {
  const lang: LANG = useAppSelector(state => state.lang);
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);

  // STYLE
  const { styles } = useStyles();
  const normalTvBtnStyle = [globalStyles.centered, styles.filterButton];
  const selectedTvBtnStyle = [globalStyles.centered, styles.filterButton, styles.activeItem];
  const lastBtnStyle = [globalStyles.centered, styles.filterButton, styles.marginRight0];
  const normalTvBtnLabelStyle = [styles.buttonTextFilter];
  const selectedTvBtnLabelStyle = [styles.buttonTextFilter, styles.textWhite];

  const modifyTvBtnList = (defaultBtnList: (OtherButton | TVChartFilter)[]) => {
    (defaultBtnList[defaultBtnList.length - 1] as OtherButton).onPress = () => {
      navigate({ key: ScreenNames.TradingView, params: { s: currentSymbolCode } });
    };
    (defaultBtnList[defaultBtnList.length - 1] as OtherButton).style = lastBtnStyle;
    return defaultBtnList;
  };

  return (
    <InfoTVChart
      s={currentSymbolCode}
      lang={lang}
      defaultSelected={FilterChart.THREE_MONTH}
      modifyDefaultButtonList={modifyTvBtnList}
      containerStyle={styles.stockChart}
      tvContainerStyle={styles.chartContainer}
      btnContainerStyle={styles.chartFilter}
      btnStyle={normalTvBtnStyle}
      btnLabelStyle={normalTvBtnLabelStyle}
      selectedBtnStyle={selectedTvBtnStyle}
      selectedBtnLabelStyle={selectedTvBtnLabelStyle}
      enableChartSetting
    />
  );
});
