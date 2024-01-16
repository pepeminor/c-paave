import { IS_IOS } from 'constants/main';
import { getStylesHook } from 'hooks';
import { lightColors, textStyles } from 'styles';

export const useStyles = getStylesHook({
  container: {
    height: IS_IOS ? 100 : 60,
  },
  contentContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: IS_IOS ? 40 : 0,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textBtnContainer: {
    minWidth: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.WHITE,
  },
  textInputContainer: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: lightColors.LIGHTBackground,
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  textInputStyle: {
    flex: 1,
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
  },
  iconStyle: {
    marginRight: 10,
  },
  iconBtnContainer: {
    padding: 4,
  },
});
