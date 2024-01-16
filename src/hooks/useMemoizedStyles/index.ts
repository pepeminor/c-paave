import { isEqual } from 'lodash';
import { useRef } from 'react';
import { ImageStyle } from 'react-native';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * useMemoizedStyles is a hook that memoizes styles.
 *
 * @param value input styles as Object
 * @param deepCompare
 * @returns
 */
export default function useMemoizedStyles<T extends MemoizedStyles>(value: T, deepCompare = false) {
  const paramsRef = useRef<T>(value);

  for (const key in paramsRef.current) {
    const compareFunc = deepCompare ? isEqual : shallowCompareStyle;
    if (!compareFunc(paramsRef.current[key], value[key])) {
      paramsRef.current[key] = value[key];
    }
  }

  return paramsRef.current;
}

type MemoizedStyles = {
  [key: string]: StyleProp<ViewStyle | TextStyle | ImageStyle>;
};

function shallowCompareStyle(
  oldStyle: StyleProp<ViewStyle | TextStyle | ImageStyle>,
  newStyle: StyleProp<ViewStyle | TextStyle | ImageStyle>
) {
  if (Array.isArray(oldStyle) && Array.isArray(newStyle)) {
    if (oldStyle.length !== newStyle.length || oldStyle.some((item, index) => item !== newStyle[index])) {
      return false;
    }
  } else if (oldStyle !== newStyle) {
    return false;
  }
  return true;
}
