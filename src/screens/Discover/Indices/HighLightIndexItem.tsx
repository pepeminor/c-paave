import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import UpArrow from 'assets/icon/UpArrow.svg';
import DownArrow from 'assets/icon/DownArrow.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from '../styles';
import { formatNumber, getColor, navigateToSymbolInfoOverview } from 'utils';
import MiniChart from 'components/Chart/MiniChart';
import { LANG } from 'global';
import withMemo from 'HOC/withMemo';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import Animated, { SharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

interface IHighlightIndexItemProps {
  code: string;
  showDetail: SharedValue<boolean>;
}

const indexChartItemContainer = {
  height: scaleSize(60),
  marginTop: scaleSize(10),
  marginBottom: scaleSize(15),
  marginLeft: scaleSize(-10),
};

const HighLightIndexItem = ({ code, showDetail }: IHighlightIndexItemProps) => {
  const lang = useAppSelector(state => state.lang);
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const indexSymbol = useAppSelector(SymbolDataSelector.selectIndexSymbol(code), {
    vietnameseName: true,
    englishName: true,
    currentPrice: true,
    changeRate: true,
    referencePrice: true,
  });

  const chartAnimatedStyle = useAnimatedStyle(() => ({
    height: withSpring(showDetail.value ? indexChartItemContainer.height : 0, { damping: 10, stiffness: 150 }),
    marginTop: withSpring(showDetail.value ? indexChartItemContainer.marginTop : 0, { damping: 10, stiffness: 150 }),
    marginBottom: withSpring(showDetail.value ? indexChartItemContainer.marginBottom : 0, {
      damping: 10,
      stiffness: 150,
    }),
    opacity: withSpring(showDetail.value ? 1 : 0, { damping: 20, stiffness: 150 }),
    marginLeft: indexChartItemContainer.marginLeft,
  }));

  const animatedDecoLine = useAnimatedStyle(() => ({
    opacity: withSpring(showDetail.value ? 0 : 1, { damping: 20, stiffness: 150 }),
  }));

  const goToIndexInfo = useCallback(() => {
    navigateToSymbolInfoOverview(code, dispatch);
  }, []);

  const priceParts = getPriceParts(indexSymbol?.currentPrice);
  return (
    <TouchableOpacity style={styles.indexChartListEachItem} onPress={goToIndexInfo}>
      <Animated.View
        style={[
          styles.indicesDeco,
          indexSymbol?.changeRate != null && {
            backgroundColor: getColor(indexSymbol.changeRate, 0, undefined, undefined, undefined).textStyle.color,
          },
          animatedDecoLine,
        ]}
      />
      <Text allowFontScaling={false} style={styles.indexItemName}>
        {indexSymbol && (lang === LANG.VI ? indexSymbol.vietnameseName : indexSymbol.englishName)}
      </Text>
      <Animated.View style={chartAnimatedStyle}>
        {priceParts && indexSymbol ? (
          <MiniChart
            containerStyle={[globalStyles.container, globalStyles.centered]}
            chartConfig={{ hideXAxis: true, hideYAxis: true }}
            chartStyle={styles.symbolHeaderChartStyle}
            placeHolderStyle={styles.symbolHeaderChartStyle}
            symbolCode={indexSymbol.symbolCode}
            reload={false}
            resolution={'1'}
          />
        ) : (
          <View>
            <View style={styles.symbolHeaderChartStyle} />
          </View>
        )}
      </Animated.View>
      <View style={[styles.skeCh]}>
        {priceParts && indexSymbol && (
          <View style={globalStyles.flexDirectionRow}>
            <Text
              style={[
                styles.indexItemPrice1,
                getColor(indexSymbol.changeRate, 0, undefined, undefined, undefined).textStyle,
              ]}
              allowFontScaling={false}
            >
              {priceParts[0]}
            </Text>
            <View>
              <Text
                style={[
                  styles.indexItemPrice3,
                  getColor(indexSymbol.changeRate, 0, undefined, undefined, undefined).textStyle,
                ]}
                allowFontScaling={false}
              >
                .{priceParts[1]}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.indexRateArea]}>
        {indexSymbol && indexSymbol.changePrice != null && (
          <Text
            style={[
              styles.indexItemPrice2,
              indexSymbol.changeRate != null &&
                getColor(indexSymbol.changeRate, 0, undefined, undefined, undefined).textStyle,
            ]}
            allowFontScaling={false}
          >
            {formatNumber(indexSymbol.changePrice, 2)}
          </Text>
        )}

        {indexSymbol?.changeRate != null &&
          (indexSymbol.changeRate === 0 ? (
            <View style={styles.middleArrow} />
          ) : indexSymbol.changeRate < 0 ? (
            <DownArrow width={scaleSize(8)} height={scaleSize(7)} style={styles.middleArrow} />
          ) : (
            <UpArrow width={scaleSize(8)} height={scaleSize(7)} style={styles.middleArrow} />
          ))}
        {indexSymbol && indexSymbol.changeRate != null ? (
          <Text
            style={[
              styles.indexItemRate1,
              getColor(indexSymbol.changeRate, 0, undefined, undefined, undefined).textStyle,
            ]}
            allowFontScaling={false}
          >
            {`${formatNumber(indexSymbol.changeRate, 2, undefined, true)}%`}
          </Text>
        ) : (
          <View>
            <View style={[styles.skeRa]} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const getPriceParts = (price?: number) => {
  if (price == null) return null;
  const priceStr = formatNumber(price, 2, undefined, true);
  if (!priceStr.includes('.')) return [priceStr, '00'];
  return priceStr.split('.');
};

export default withMemo(HighLightIndexItem);
