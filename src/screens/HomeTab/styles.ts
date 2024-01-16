import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  containerScreenTab: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
    backgroundColor: lightColors.WHITE,
  },
});
