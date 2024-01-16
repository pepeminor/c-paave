import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import globalStyles, { scaleSize, Colors } from 'styles';
import useStyles from './styles';
import { getColor, handleNumberAI, navigateToSymbolInfoOverview } from 'utils';
import ImagesLogo from 'components/ImagesLogo';
import IncreaseIcon from 'assets/icon/UpThinArrow.svg';
import DecreaseIcon from 'assets/icon/DownThinArrow.svg';
import ScoreCircle from './ScoreCircle';
import { useDispatch } from 'react-redux';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { useAppSelector } from 'hooks/useAppSelector';
import { ACCOUNT_TYPE } from 'global';
import { WatchListActions } from 'reduxs';

export interface AIRatingStockProps {
  stock: string;
  rank: number;
  change: number;
  overall: number;
  techScore: number;
  valuationScore: number;
  gsCore: number;
  disablePress?: boolean;
}

const MAX_POINT = 5;

const AIRatingStock = ({
  stock,
  rank,
  change,
  overall,
  techScore,
  valuationScore,
  gsCore,
  disablePress = false,
}: AIRatingStockProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const goToStockInfo = () => {
    if (selectedAccountType === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: stock }));
    }
    if (selectedAccountType === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: stock, partnerId: 'kis' }));
    }
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: stock,
      })
    );
    navigateToSymbolInfoOverview(stock, dispatch);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={[globalStyles.container, globalStyles.flexDirectionRow]}
          onPress={goToStockInfo}
          disabled={disablePress}
        >
          <ImagesLogo codeLogo={stock} logoSize={scaleSize(48)} logoStyle={styles.logoContainer} />
          <View style={[globalStyles.container, styles.pl18]}>
            <Text allowFontScaling={false} style={styles.stockCode}>
              {stock}
            </Text>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
              <View style={[styles.rankContainer, rank > 99 && styles.rankContainerBig]}>
                <Text allowFontScaling={false} style={styles.rankText}>
                  {rank}
                </Text>
              </View>
              <View style={styles.ph8}>
                {change > 0 && <IncreaseIcon width={scaleSize(7)} height={scaleSize(10)} />}
                {change < 0 && <DecreaseIcon width={scaleSize(7)} height={scaleSize(10)} />}
              </View>
              <Text
                style={[styles.rankChangeText, getColor(change, 0, undefined, undefined, true).textStyle]}
                allowFontScaling={false}
              >
                {change === 0 ? '-' : Math.abs(change)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <ScoreCircle
          size={scaleSize(36)}
          strokeWidth={scaleSize(3)}
          point={overall / MAX_POINT}
          text={String(handleNumberAI(overall))}
          color={overall >= 4 ? Colors.DARK_GREEN : overall > 2 ? Colors.Yellow2 : Colors.LIGHTRed}
        />
        <Text allowFontScaling={false} style={styles.performanceText}>
          {overall >= 4 && t('Outperform')}
          {overall > 2 && overall < 4 && t('Neutral')}
          {overall <= 2 && t('Under Perform')}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={globalStyles.container}>
          <Text allowFontScaling={false} style={styles.scoreTitle}>
            {t('Technical')}
          </Text>
          <Text allowFontScaling={false} style={styles.scoreValue}>
            {handleNumberAI(techScore)}
          </Text>
        </View>
        <View style={globalStyles.container}>
          <Text allowFontScaling={false} style={styles.scoreTitle}>
            {t('Valuation')}
          </Text>
          <Text allowFontScaling={false} style={styles.scoreValue}>
            {handleNumberAI(valuationScore)}
          </Text>
        </View>
        <View style={globalStyles.container}>
          <Text allowFontScaling={false} style={styles.scoreTitle}>
            {t('Quality')}
          </Text>
          <Text allowFontScaling={false} style={styles.scoreValue}>
            {handleNumberAI(gsCore)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(AIRatingStock);
