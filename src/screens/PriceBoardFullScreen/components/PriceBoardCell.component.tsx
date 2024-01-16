import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import withMemo from 'HOC/withMemo';
import { getStylesHook, useColors } from 'hooks/useStyles';
import { lightColors, textStyles } from 'styles';
import { hexToRgba } from 'utils';
import FlashColorBackground from 'components/FlashColorBackground';
import { ItemHeight } from '../PriceBoardFullScreen.type';
import { SymbolType } from 'constants/enum';
import { CellTextProps } from '../constants';
import useMemoizedStyles from 'hooks/useMemoizedStyles';

type PriceBoardCell<T> = {
  cellData?: T;
  symbolType?: keyof typeof SymbolType;
  textColor?: { color: string };
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  smolTextThreshold?: number;

  formatter?: (value: T, symbolType?: keyof typeof SymbolType) => string;
};

const PriceBoardCell = <T,>({
  cellData,
  symbolType,
  textColor,
  containerStyles,
  textStyles,
  smolTextThreshold = Infinity,
  formatter,
}: PriceBoardCell<T>) => {
  const { styles } = useStyles();
  const Colors = useColors();

  const memoizedStyles = useMemoizedStyles({
    stringText: [typeof cellData === 'string' && styles.stringText, textStyles, textColor],
    flashTextStyles: [styles.numberText, textStyles, textColor],
    smolTextStyles: [styles.smolNumberText, textStyles, textColor],
  });

  if (typeof cellData !== 'number' && typeof cellData !== 'string') {
    return <EmptyCell textStyles={textStyles} containerStyles={containerStyles} />;
  }

  return (
    <View style={containerStyles}>
      {typeof cellData === 'string' && (
        <Text allowFontScaling={false} style={memoizedStyles.stringText}>
          {formatter ? formatter(cellData) : cellData}
        </Text>
      )}
      {typeof cellData === 'number' && (
        <FlashColorBackground
          changeNumber={cellData}
          displayValue={formatter ? formatter(cellData, symbolType) : cellData}
          textStyles={
            Math.abs(cellData) >= (symbolType === 'FUTURES' ? smolTextThreshold / 1000 : smolTextThreshold)
              ? memoizedStyles.smolTextStyles
              : memoizedStyles.flashTextStyles
          }
          containerStyles={styles.flashTextContainer}
          startColor={Colors.Transparent}
          endColor={Colors.Transparent}
          steadyColor={textColor ? hexToRgba(textColor.color, 0.3) : hexToRgba(Colors.DARKTextBigTitle, 0.4)}
          textProps={CellTextProps}
        />
      )}
    </View>
  );
};

export default withMemo(PriceBoardCell) as typeof PriceBoardCell;

type EmptyCell = {
  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
};

export const EmptyCell = withMemo(({ containerStyles, textStyles }: EmptyCell) => {
  const { styles } = useStyles();

  const { textStyle } = useMemoizedStyles({
    textStyle: [styles.stringText, textStyles],
  });

  return (
    <View style={containerStyles}>
      <Text allowFontScaling={false} style={textStyle}>
        -
      </Text>
    </View>
  );
});

export const EmptyRow = withMemo(() => {
  const { styles } = useStyles();
  return <View style={styles.emptyRow} />;
});

const useStyles = getStylesHook({
  stringText: {
    ...textStyles.fontSize10,
    ...textStyles.roboto700,
  },
  numberText: {
    ...textStyles.fontSize10,
    ...textStyles.dinOt500,
    fontSize: 9,
    textAlign: 'right',
  },
  smolNumberText: {
    ...textStyles.fontSize10,
    ...textStyles.dinOt500,
    fontSize: 8,
    textAlign: 'right',
  },
  emptyRow: {
    height: ItemHeight,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  flashTextContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});
