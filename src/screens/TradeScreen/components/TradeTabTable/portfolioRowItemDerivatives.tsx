import { RowComponentProps } from 'components/SheetData2';
import { IDrAccountOpenPositionItem } from 'interfaces/equity';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import { lightColors } from 'styles';
import { formatNumber } from 'utils';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';
import withMemo from 'HOC/withMemo';

interface AdditionalProps {
  closeOrder(data: IDrAccountOpenPositionItem): () => void;
}

const RenderRow = withMemo(
  ({ data, Wrapper, closeOrder }: RowComponentProps<IDrAccountOpenPositionItem> & AdditionalProps) => {
    const { t } = useTranslation();
    const { styles, dynamicColors } = useStyles();

    const onPress = useCallback(() => {
      closeOrder(data);
    }, []);

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        //   disabled={isDisableSymbolRemoved()}
      >
        <Wrapper>
          <View style={styles.col1}>
            <Text allowFontScaling={false}>{data.seriesID}</Text>
            <View style={styles.btnSellSymbol}>
              <Text style={styles.textSellSymbol}>{t('Close')}</Text>
            </View>
          </View>
          <View style={styles.col2}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(data.long > data.short ? data.long : data.short, 2)}
            </Text>
          </View>
          <View style={styles.col3}>
            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(data.long > data.short ? data.averageBid : data.averageAsk, 2)}
            </Text>

            <Text allowFontScaling={false} style={styles.quantity}>
              {formatNumber(data.marketPrice, 2)}
            </Text>
          </View>
          <View style={styles.col4}>
            <Text
              allowFontScaling={false}
              style={[
                styles.quantity,
                {
                  color:
                    data.floatingPL > 0
                      ? dynamicColors.LIGHTButtonGreen
                      : data.floatingPL === 0
                      ? dynamicColors.LIGHTTextContent
                      : dynamicColors.LIGHTButtonRed,
                },
              ]}
            >
              {formatNumber(data.floatingPL, 2)}
            </Text>
          </View>
        </Wrapper>
      </TouchableOpacity>
    );
  }
);

const useStyles = getStylesHook({
  container: {
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  col1: {
    width: 97,
    height: 53,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    borderLeftColor: lightColors.BORDER,
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSellSymbol: {
    backgroundColor: lightColors.LIGHTButtonRed,
    height: 22,
    width: 53,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: lightColors.LIGHTButtonRed,
    justifyContent: 'center',
    marginLeft: 5,
  },
  textSellSymbol: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    lineHeight: 16,
    color: lightColors.WHITE,
    textAlign: 'center',
  },
  col2: {
    width: 88.67,
    height: 53,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  col3: {
    width: 88.67,
    height: 53,
    borderRightColor: lightColors.BORDER,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  col4: {
    width: 80.67,
    height: 53,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 6,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: IS_IOS ? 'DINOT' : 'DINOT-Light',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextContent,
  },
});

export default function portfolioRowItemDerivatives(props: AdditionalProps) {
  return (hocProps: RowComponentProps<IDrAccountOpenPositionItem>) => <RenderRow {...hocProps} {...props} />;
}
