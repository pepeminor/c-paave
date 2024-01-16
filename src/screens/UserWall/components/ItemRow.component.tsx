import withMemo from 'HOC/withMemo';
import Icon from 'components/Icon';
import { WalkthroughTooltip } from 'components/WalkthroughTooltip';
import { getStylesHook } from 'hooks/useStyles';
import { isNotNilOrEmpty } from 'ramda-adjunct';
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { lightColors } from 'styles';
import { formatNumber, getColor } from 'utils';

interface IProps {
  label: string;
  data?: number;
  prefix?: number;
  isPercent?: boolean;
  tooltip?: {
    title: string;
    placement: 'right' | 'left';
    content: string;
  };
  hasDynamicColor?: boolean;
}

const ItemRow = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { label, data, prefix = 2, isPercent = true } = props;

  return (
    <View style={styles.container}>
      <View style={styles.containerLabel}>
        <Text allowFontScaling={false} style={styles.overviewItem}>
          {label}
        </Text>
        {isNotNilOrEmpty(props.tooltip) && (
          <WalkthroughTooltip
            placement={props.tooltip?.placement}
            title={props.tooltip?.title}
            content={props.tooltip?.content ?? ''}
          >
            <Icon name={'question-2'} color={dynamicColors.MainBlue} size={16} />
          </WalkthroughTooltip>
        )}
      </View>

      <Text
        allowFontScaling={false}
        style={
          props.hasDynamicColor
            ? [styles.overviewItemValue, getColor(data, 0, undefined, undefined, undefined).textStyle]
            : styles.overviewItemValue
        }
      >
        {data == null ? '-' : formatNumber(data, prefix)} {isPercent ? '%' : ''}
      </Text>
    </View>
  );
};

const useStyles = getStylesHook({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  containerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewItem: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  overviewItemValue: {
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    fontFamily: Platform.OS === 'ios' ? 'DINOT' : 'DINOT-Medium',
  },
});

export default withMemo(ItemRow);
