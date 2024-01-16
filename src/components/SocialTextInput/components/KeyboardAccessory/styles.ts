import { IS_ANDROID } from 'constants/main';
import { getStylesHook } from 'hooks';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    position: IS_ANDROID ? 'absolute' : 'relative',
    bottom: 0,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
    paddingRight: 12,
    borderColor: lightColors.BORDER,
    borderTopWidth: 1,
    backgroundColor: lightColors.WHITE,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  accItemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  langIconContainer: {
    width: 16,
    height: 16,
    borderColor: lightColors.BlueNewColor,
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: lightColors.BlueNewColor,
  },
  postBtn: {
    backgroundColor: lightColors.LIGHTIconDisable,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  postBtnText: {
    ...textStyles.roboto700,
    ...textStyles.fontSize14,
    color: lightColors.BlueNewColor,
  },
});
