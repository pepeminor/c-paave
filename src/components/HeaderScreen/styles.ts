import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  headerHeightIOS: {
    height: 100,
  },
  moreViewIOS: {
    height: 35,
  },
  headerHeightAndroid: {
    height: 60,
  },
  headerContainer: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    paddingHorizontal: 16,
  },
  blankSpace: {
    height: 24,
    width: 24,
    opacity: 0,
  },
  background: {
    backgroundColor: Colors.WHITE,
  },
  leftPart: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  rightPart: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    position: 'absolute',
    right: 20,
    zIndex: 1,
  },
});
