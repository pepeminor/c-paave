import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  postBtn: {
    backgroundColor: lightColors.LIGHTIconDisable,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  postBtnText: {
    ...textStyles.roboto700,
    ...textStyles.fontSize14,
    color: lightColors.BlueNewColor,
  },
  topPartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 12,
  },
  avatarImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 40,
    position: 'relative',
  },
  usernameContainer: {
    marginLeft: 8,
  },
  name: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextBigTitle,
  },
  username: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextTitle,
  },
  scrollViewContainer: {
    marginBottom: 40,
  },
  loadingContainer: {
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    zIndex: 100,
  },
});
