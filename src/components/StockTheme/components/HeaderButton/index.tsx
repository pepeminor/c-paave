import { Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback } from 'react';
import { useStyles } from './styles';
import { SortType } from 'components/StockTheme/StockTheme.type';
import Icon from 'components/Icon';
import { t } from 'i18next';

type Props = {
  text: string;
  sortType?: SortType;
  onPress?: (sortType: SortType) => void;
};

const HeaderButton = ({ text, sortType, onPress }: Props) => {
  const { styles, dynamicColors } = useStyles();

  const handlePress = useCallback(() => {
    switch (sortType) {
      case 'ASC':
        onPress?.('DESC');
        break;
      case 'DESC':
        onPress?.('ASC');
        break;
      default:
        onPress?.('DESC');
        break;
    }
  }, [sortType]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} disabled={!onPress}>
      <Text allowFontScaling={false} style={styles.text}>
        {t(text)}
      </Text>
      {onPress != null && (
        <View style={styles.iconContainer}>
          <Icon
            name="arrow-up-2"
            style={styles.shiftDown4}
            size={16}
            color={sortType === 'ASC' ? dynamicColors.LIGHTText : dynamicColors.LIGHTIconDisable}
          />
          <Icon
            name="arrow-down-2"
            style={styles.shiftUp4}
            size={16}
            color={sortType === 'DESC' ? dynamicColors.LIGHTText : dynamicColors.LIGHTIconDisable}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default memo(HeaderButton);
