import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import withMemo from 'HOC/withMemo';
import Icon, { IconName } from 'components/Icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { insertObjectIf } from 'utils';
import { getStylesHook } from 'hooks/useStyles';
import { FONT_TEXT } from 'constants/font';
import { lightColors as Colors, scaleSize } from 'styles';

export const tabBarBottomOption: BottomTabNavigationOptions = {
  lazy: true,
  headerShown: false,
};

interface IProps {
  isFocused: boolean;
  onPress: () => void;
  routeName: string;
}

export const TabBarItem = withMemo((props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, insertObjectIf(props.isFocused, styles.containerFocused)]}>
      <Icon
        name={tabBarJson[props?.routeName].iconName}
        style={[styles.icon, insertObjectIf(props.isFocused, styles.iconActive)]}
        size={scaleSize(24)}
      />
      <Text allowFontScaling={false} style={[styles.label, insertObjectIf(props.isFocused, styles.labelActive)]}>
        {t(tabBarJson[props?.routeName].label)}
      </Text>
      {props?.routeName === 'Social' && (
        <Icon name={'tag-2'} color={dynamicColors.Yellow2} size={scaleSize(18)} style={styles.iconTag} />
      )}
    </View>
  );
});

const useStyles = getStylesHook({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerFocused: {
    borderRadius: 8,
    backgroundColor: Colors.LIGHTBGTab,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: FONT_TEXT.MEDIUM,
    color: Colors.LIGHTGRAY,
  },
  labelActive: {
    color: Colors.BlueNewColor,
    fontFamily: FONT_TEXT.BOLD,
  },
  icon: {
    color: Colors.LIGHTGRAY,
  },
  iconActive: {
    color: Colors.BlueNewColor,
  },
  iconTag: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export const tabBarJson: {
  [key: string]: {
    iconName: IconName;
    label: string;
  };
} = {
  ['Home']: {
    iconName: 'portfolio-2',
    label: 'PORTFOLIO',
  },
  ['Discover']: {
    iconName: 'discover',
    label: 'Discover',
  },
  ['Trade']: {
    iconName: 'trading',
    label: 'Trade',
  },
  ['Social']: {
    iconName: 'social',
    label: 'Social',
  },
  ['AIRating']: {
    iconName: 'notice',
    label: 'AI Insights',
  },
};
