import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import Switch from 'components/Switch';
import { useTranslation } from 'react-i18next';

type Props = {
  value: boolean | null;
  onValueChanged: (value: boolean) => void;
  title: string;
  description: string;
};

const ToggleRow = ({ value, onValueChanged, title, description }: Props) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();

  return (
    <View style={styles.container}>
      <View style={globalStyles.container}>
        <Text allowFontScaling={false} style={styles.notificationText}>
          {t(title)}
        </Text>
        <Text allowFontScaling={false} style={styles.notificationText2}>
          {t(description)}
        </Text>
      </View>
      <View style={styles.switchContainer}>
        {value == null ? (
          <ActivityIndicator />
        ) : (
          <Switch
            value={value}
            onValueChange={onValueChanged}
            disabled={false}
            circleSize={scaleSize(16)}
            barHeight={scaleSize(22)}
            circleBorderWidth={0}
            backgroundActive={dynamicColors.BlueNewColor}
            backgroundInactive={dynamicColors.LIGHTBGTab}
            circleActiveColor={dynamicColors.WHITE}
            circleInActiveColor={dynamicColors.WHITE}
            circleBorderActiveColor={dynamicColors.WHITE}
            circleBorderInactiveColor={dynamicColors.WHITE}
            innerCircleStyle={globalStyles.centered}
            switchLeftPx={2}
            switchRightPx={2}
            switchWidthMultiplier={2.5}
          />
        )}
      </View>
    </View>
  );
};

export default memo(ToggleRow);
