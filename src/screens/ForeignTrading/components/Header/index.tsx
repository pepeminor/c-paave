import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { formatDateToString, navigate } from 'utils';
import Icon from 'components/Icon';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import globalStyles from 'styles';
import IconRefresh from 'assets/icon/iconRefresh.svg';
import { ForeignTradingActions, ForeignTradingSelector } from 'reduxs';
import { useAppSelector } from 'hooks';
import { store } from 'screens/App';

const ForeignTrading_goToForeignTrading = () => {
  navigate({
    key: ScreenNames.ForeignTrading,
  });
  track(AMPLITUDE_EVENT.VIEW_FOREIGN_TRADING_DETAILS);
};

const ReloadBtnHitSlop = {
  top: 0,
  bottom: 0,
  left: 15,
  right: 15,
};

const ForeignTrading_onReloadBtnPressed = () => {
  store.dispatch(
    ForeignTradingActions.getData({
      marketType: store.getState().foreignTrading.selectedMarket,
      refresh: true,
    })
  );
};

type Props = {
  showTitle?: boolean;
};

export const ForeignTradingHeader = memo(({ showTitle = true }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  const lastUpdated = useAppSelector(ForeignTradingSelector.selectLastUpdated);

  return (
    <>
      {showTitle && (
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.headerText}>
            {t('Foreign Trading')}
          </Text>
          <TouchableOpacity style={styles.seeAllBtn} onPress={ForeignTrading_goToForeignTrading}>
            <Text allowFontScaling={false} style={styles.seeAllBtnText}>
              {t('See all')}
            </Text>
            <Icon color={dynamicColors.BlueNewColor} name={'arrow-right-double'} size={16} />
          </TouchableOpacity>
        </View>
      )}
      <View style={globalStyles.flexDirectionRow}>
        <Text allowFontScaling={false} style={styles.basedOnText}>
          {t('Last Updated')}: {lastUpdated ?? formatDateToString(new Date(), 'HH:mm dd/MM/yyyy')}
        </Text>
        {showTitle && (
          <TouchableOpacity
            style={globalStyles.centered}
            hitSlop={ReloadBtnHitSlop}
            onPress={ForeignTrading_onReloadBtnPressed}
          >
            <IconRefresh fill={dynamicColors.BlueNewColor} scaleX={1.25} scaleY={1.25} />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
});
