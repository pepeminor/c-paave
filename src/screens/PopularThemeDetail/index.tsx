import React, { memo } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { TodayMovement, ThemeHeader } from './components';
import { useScreenLogic } from './logic';
import TabSelector from 'components/TabSelector';
import { ThemeDetailTab } from './type';
import { RatioComparison } from './components/RatioComparison';

const PopularThemeDetail = (props: StackScreenProps<'PopularThemeDetail'>) => {
  const { themeName, highlightStockCode } = props.route.params;
  const { styles } = useStyles();
  const { state, handlers, period, themeCode } = useScreenLogic(props);

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={themeName} />
      <ThemeHeader period={period} themeName={themeName} />
      <TabSelector
        value={state.tab}
        type="UNDERLINE"
        setValue={handlers.onTabPressed}
        listValue={ThemeDetailTab}
        style={styles.tabSelectorContainer}
      />
      {state.tab === 'TodayMovement' && <TodayMovement themeName={themeName} period={props.route.params.period} />}
      {state.tab === 'RatioComparison' && (
        <RatioComparison themeCode={themeCode} highlightStockCode={highlightStockCode} />
      )}
    </View>
  );
};

export default memo(PopularThemeDetail);
