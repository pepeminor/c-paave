import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export const useStyles = getStylesHook({
  recommendedContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: lightColors.WHITE,
    borderColor: lightColors.BORDER,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    zIndex: 1,
    marginTop: IS_IOS ? 40 : 0,
    height: 300,
  },
  recommendContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  avatarImg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 40,
    position: 'relative',
  },
  avatarImgText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.WHITE,
    fontSize: 17,
  },
  itemContentContainer: {
    marginLeft: 10,
  },
  fullname: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.MainBlue,
  },
  username: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
  },
  symbolCode: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextContent,
  },
  numberOfCode: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextDisable,
  },
  logoCode: {
    overflow: 'hidden',
    borderRadius: 99,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 32,
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});
