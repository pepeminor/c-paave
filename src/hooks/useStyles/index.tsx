import { getDarkColorBy, scaleSize } from 'styles';
import { StatusBarStyle, StyleSheet as RNStyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { darkColors, lightColors } from 'styles';
import { useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers/index';
import { includes } from 'ramda';

export const objectColorMode = (object: any, forDarkMode = false) => {
  return Object.keys(object).reduce((result: { [x: string]: any }, key: string) => {
    const styleField = object[key];

    const typeOfField = typeof styleField;
    const skipChangeColorOrScaleSize = key?.[0] === '_';

    if (forDarkMode && typeOfField === 'string' && !skipChangeColorOrScaleSize) {
      result[key] = getDarkColorBy(styleField);
    } else {
      const shouldScale =
        typeOfField === 'number' &&
        !includes(key, [
          'opacity',
          'shadowOpacity',
          'zIndex',
          'elevation',
          'aspectRatio',
          'shadowRadius',
          'flex',
          'flexGrow',
        ]) &&
        !skipChangeColorOrScaleSize;

      const newKey = skipChangeColorOrScaleSize ? key.substring(1) : key;
      result[newKey] = shouldScale ? scaleSize(styleField) : styleField;
    }

    return result;
  }, {});
};

export type AddPrefixToObject<T, P extends string> = {
  // @ts-nocheck
  [K in keyof T as K extends string ? `${P}${K}` : never]: T[K];
};
type InputStyle =
  | TextStyle
  | ViewStyle
  | ImageStyle
  | AddPrefixToObject<ViewStyle, '_'>
  | AddPrefixToObject<TextStyle, '_'>
  | AddPrefixToObject<ImageStyle, '_'>;

export type InputNamedStyles<T> = {
  [K in keyof T]: InputStyle;
};

const objectMap = (object: InputNamedStyles<any>, mapFn: any) => {
  return Object.keys(object).reduce((result: { [s: string]: InputStyle }, key) => {
    result[key] = mapFn(object[key]);
    return result;
  }, {}) as RNStyleSheet.NamedStyles<any>;
};

export const PaaveStyleSheet = {
  create: <T extends InputNamedStyles<T> | InputNamedStyles<any>>(
    styleSheet: T | InputNamedStyles<T>,
    forDarkMode = false
  ): T => RNStyleSheet.create(objectMap(styleSheet, (style: InputStyle) => objectColorMode(style, forDarkMode))) as T,
};

// const darkColorScheme = 'dark'; // change darkColorScheme = 'light' to test in dev

export const useColors = () => {
  // const systemColorScheme = useColorScheme();

  // const isDarkMode = systemColorScheme === darkColorScheme;
  const isDarkMode = useSelector((state: IState) => state.currentUserSetting?.darkMode);

  return isDarkMode ? darkColors : lightColors;
};

export const getStylesHook = <T extends InputNamedStyles<T> | InputNamedStyles<any>>(
  inputStyles: T | InputNamedStyles<T>
) => {
  const lightStyle = PaaveStyleSheet.create(inputStyles);
  const darkStyle = PaaveStyleSheet.create(inputStyles, true);

  return () => {
    // const systemColorScheme = useColorScheme();
    const isDarkMode = useSelector((state: IState) => state.currentUserSetting?.darkMode);

    const styles = isDarkMode ? darkStyle : lightStyle;
    const dynamicColors = isDarkMode ? darkColors : lightColors;
    const barStyle: StatusBarStyle = isDarkMode ? 'light-content' : 'dark-content';

    return { styles, isDarkMode, dynamicColors, barStyle };
  };
};
