import { getStylesHook } from 'hooks';
import { StyleSheet } from 'react-native';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.Transparent,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: lightColors.Transparent,
  },
  centerItem: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperVideo: {
    width: '100%',
    height: '100%',
  },
  styleImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
