import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: lightColors.Transparent,
    padding: 8,
    paddingBottom: 0,
  },
  containerChild: {
    backgroundColor: lightColors.WHITE,
    padding: 12,
  },
  textContent: {
    marginTop: 8,
    marginLeft: 16,
  },
  containerBottomPost: {
    marginTop: 8,
    marginLeft: 16,
  },
  containerHeader: {
    paddingHorizontal: 0,
    paddingTop: 0,
    alignItems: 'center',
    paddingRight: 16,
  },
  containerImageAvatar: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: lightColors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textUrl: {
    color: lightColors.MainBlue,
  },
  containerImage: {
    flex: 1,
    marginLeft: 16,
  },
  containerContent: {
    paddingLeft: 44,
  },
  containerItemStyle: {
    justifyContent: 'flex-start',
  },
});
