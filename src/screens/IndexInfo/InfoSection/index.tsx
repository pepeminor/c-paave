import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { formatNumber, getColor, getIconColor } from 'utils';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
// Icon
import IconIncrease from 'assets/icon/IconIncreaseSymbol.svg';
import IconDecrease from 'assets/icon/IconDecreaseSymbol.svg';
import IconUpArrow from 'assets/icon/IconUpArrow.svg';
import IconCircleFreeze from 'assets/icon/IconCircleFreeze.svg';
import IconUpDown from 'assets/icon/IconUpDown.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector, SymbolTypeChecker } from 'reduxs/SymbolData';

type Props = {
  symbolCode: string;
};

const InfoSection = ({ symbolCode }: Props) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const indexSymbol = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode), {
    changePrice: true,
    currentPrice: true,
    changeRate: true,
    tradingVolume: true,
    tradingValue: true,
    indexChange: true,
  });
  const isDataExist = SymbolTypeChecker.isIndexSymbol(indexSymbol);

  return (
    <View style={[globalStyles.flexDirectionRow, globalStyles.justifySpaceBetween, styles.chartInfoContainer]}>
      {/* 1 */}
      <View>
        {isDataExist && (
          <Text
            style={[
              styles.textColorGreen,
              styles.infoLeftNumberTitle,
              getColor(indexSymbol.changePrice, 0, undefined, undefined).textStyle,
            ]}
          >
            {indexSymbol != null && indexSymbol.currentPrice != null
              ? formatNumber(indexSymbol.currentPrice, 2, undefined, true)
              : '-'}
          </Text>
        )}

        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            globalStyles.alignCenter,
            styles.infoLeftNumberContentContainer,
          ]}
        >
          {isDataExist && (
            <Text
              style={[
                styles.infoLeftNumberContent1,
                getColor(indexSymbol.changePrice, 0, undefined, undefined).textStyle,
              ]}
            >
              {formatNumber(indexSymbol.changePrice, 2)}
            </Text>
          )}
          {isDataExist &&
            getIconColor(
              indexSymbol.changePrice,
              0,
              undefined,
              undefined,
              <IconIncrease style={styles.increaseIconStyle6} />,
              <IconDecrease style={styles.increaseIconStyle4} />
            )}
          {isDataExist && (
            <Text
              style={[
                styles.infoLeftNumberContent2,
                getColor(indexSymbol.changePrice, 0, undefined, undefined).textStyle,
              ]}
            >
              {`${formatNumber(indexSymbol.changeRate, 2, undefined, true)}%`}
            </Text>
          )}
        </View>
      </View>

      {/* 2 */}
      <View style={[styles.chartInfoTradingContainer]}>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            !isDataExist && styles.marginBottom2,
          ]}
        >
          <Text style={[styles.infoRightLabel]}>{t('Trading Vol')}:</Text>
          {isDataExist && <Text style={[styles.infoRightContent]}>{formatNumber(indexSymbol.tradingVolume, 2)}</Text>}
        </View>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            !isDataExist && styles.marginBottom2,
          ]}
        >
          <Text style={[styles.infoRightLabel]}>{t('Trading Val')}:</Text>
          {isDataExist && (
            <Text style={[styles.infoRightContent]}>
              {formatNumber(indexSymbol.tradingValue, 2, 1000000000)} {t('Bil')}
            </Text>
          )}
        </View>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            globalStyles.alignCenter,
            globalStyles.hide,
          ]}
        >
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              globalStyles.alignCenter,
              styles.infoRightNumberContainer65,
            ]}
          >
            {isDataExist && (
              <>
                <IconUpArrow width={scaleSize(12)} height={scaleSize(12)} />
                <Text style={[styles.textColorGreen]}>
                  {indexSymbol.indexChange != null ? indexSymbol.indexChange.upCount : 0}
                </Text>
              </>
            )}

            {isDataExist && (
              <Text style={[styles.textColorPurple]}>{`(${
                indexSymbol.indexChange ? indexSymbol.indexChange.ceilingCount : 0
              })`}</Text>
            )}
          </View>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              globalStyles.alignCenter,
              styles.infoRightNumberContainer30,
            ]}
          >
            {isDataExist && (
              <>
                <IconCircleFreeze width={scaleSize(12)} height={scaleSize(12)} />
                <Text style={[styles.textColorYellow]}>
                  {indexSymbol.indexChange ? indexSymbol.indexChange.unChangeCount : 0}
                </Text>
              </>
            )}
          </View>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              globalStyles.alignCenter,
              styles.infoRightNumberContainer65,
            ]}
          >
            {isDataExist && (
              <>
                <IconUpDown width={scaleSize(12)} height={scaleSize(12)} />
                <Text style={[styles.textColorRed]}>
                  {indexSymbol.indexChange ? indexSymbol.indexChange.downCount : 0}
                </Text>
              </>
            )}

            {isDataExist && (
              <Text style={[styles.textColorTeal]}>{`(${
                indexSymbol.indexChange ? indexSymbol.indexChange.floorCount : 0
              })`}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(InfoSection);
