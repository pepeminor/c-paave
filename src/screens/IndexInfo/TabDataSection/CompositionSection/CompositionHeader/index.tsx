import React, { ComponentProps, memo, useCallback, useMemo } from 'react';
import { HeaderComponentProps } from 'components/SheetData3';
import SheetDataHeader from 'components/SheetDataHeader';
import { t } from 'i18next';
import withInjectedProps from 'HOC/withInjectProps';
import { Text, TouchableOpacity, View } from 'react-native';
import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import Icon from 'components/Icon';

type AdditionalProps = {
  isChangePercent: boolean;
  setIsChangePercent: (cb: (value: boolean) => boolean) => void;
};

const CompositionHeader = ({
  frozenStyle,
  isChangePercent,
  setIsChangePercent,
}: HeaderComponentProps & AdditionalProps) => {
  const { styles, dynamicColors } = useStyles();

  const onPressChange = useCallback(() => {
    setIsChangePercent(prev => !prev);
  }, [setIsChangePercent]);

  const SheetDataConfig: ComponentProps<typeof SheetDataHeader>['data'] = useMemo(
    () => [
      { content: 'Symbol', width: 170, frozen: true },
      { content: 'Current Price', width: 90 },
      {
        content: (
          <TouchableOpacity onPress={onPressChange} style={styles.container}>
            <View style={styles.groupIcon}>
              <Icon
                style={styles.iconLeft}
                name={'line'}
                color={isChangePercent ? dynamicColors.MainBlue : dynamicColors.LIGHTGRAY}
                size={8}
              />
              <Icon
                style={styles.iconLeft}
                name={'line'}
                color={!isChangePercent ? dynamicColors.MainBlue : dynamicColors.LIGHTGRAY}
                size={8}
              />
            </View>
            <Text allowFontScaling={false} style={styles.headerText}>
              {t('Change')} {isChangePercent ? '%' : ''}
            </Text>
          </TouchableOpacity>
        ),
        width: 90,
      },
      { content: 'Trading Volume', width: 120 },
    ],
    [isChangePercent, onPressChange, styles]
  );

  return <SheetDataHeader height={44} data={SheetDataConfig} frozenStyle={frozenStyle} />;
};

export default withInjectedProps<HeaderComponentProps, AdditionalProps>(memo(CompositionHeader));

const useStyles = getStylesHook({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
    textAlign: 'center',
  },
  groupIcon: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginVertical: -2,
  },
});
