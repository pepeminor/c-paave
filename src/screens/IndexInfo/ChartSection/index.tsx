import React from 'react';
import globalStyles from 'styles';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import InfoTVChart from 'components/InfoTVChart';
import { ParamListBase } from '@react-navigation/native';
import { LANG } from 'global';
import { FilterChart, OtherButton, TVChartFilter } from 'components/InfoTVChart/InfoTVChart.type';
import { StackNavigationProp } from '@react-navigation/stack';

interface IChartSectionProps {
  symbolCode: string;
  lang: LANG;
  navigation: StackNavigationProp<ParamListBase, string>;
}

const ChartSection = (props: IChartSectionProps) => {
  const modifyTvBtnList = (defaultBtnList: (OtherButton | TVChartFilter)[]) => {
    (defaultBtnList[defaultBtnList.length - 1] as OtherButton).onPress = () => {
      props.navigation.navigate(ScreenNames.TradingView, { s: props.symbolCode });
    };
    (defaultBtnList[defaultBtnList.length - 1] as OtherButton).style = lastBtnStyle;
    return defaultBtnList;
  };

  // STYLE
  const { styles } = useStyles();
  const normalTvBtnStyle = [globalStyles.centered, styles.filterButton];
  const selectedTvBtnStyle = [globalStyles.centered, styles.filterButton, styles.activeItem];
  const lastBtnStyle = [globalStyles.centered, styles.filterButton, styles.marginRight0];
  const btnContainerStyle = [globalStyles.flexDirectionRow, styles.actionContainer];
  const selectedTvBtnLabelStyle = [styles.buttonText, styles.textWhite];

  return (
    <InfoTVChart
      s={props.symbolCode}
      lang={props.lang}
      defaultSelected={FilterChart.ONE_DAY}
      modifyDefaultButtonList={modifyTvBtnList}
      containerStyle={styles.stockChart}
      tvContainerStyle={styles.chartContainer}
      btnContainerStyle={btnContainerStyle}
      btnStyle={normalTvBtnStyle}
      btnLabelStyle={styles.buttonText}
      selectedBtnStyle={selectedTvBtnStyle}
      selectedBtnLabelStyle={selectedTvBtnLabelStyle}
      enableChartSetting
    />
  );
};

export default ChartSection;
