import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  line: {
    position: 'absolute',
    top: 16,
    left: 32,
    width: 1.5,
    height: '100%',
    backgroundColor: lightColors.LIGHTGRAY,
    zIndex: -1,
  },
  containerList: {
    backgroundColor: lightColors.Transparent,
  },
  bottomList: {
    width: '100%',
    backgroundColor: lightColors.WHITE,
    height: 16,
  },
  bottomListHidden: {
    position: 'absolute',
    width: '100%',
    backgroundColor: lightColors.WHITE,
    height: 16,
    bottom: -16,
  },
  containerItem: {
    marginTop: 12,
  },
  containerReplies: {
    marginLeft: 60,
    marginTop: 12,
  },
});
