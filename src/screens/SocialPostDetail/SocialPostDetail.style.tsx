import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_ANDROID, IS_IOS } from 'constants/main';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerBottom: {
    bottom: 0,
    backgroundColor: lightColors.WHITE,
    paddingBottom: IS_ANDROID ? 8 : 24,
  },
  containerPost: {
    borderBottomWidth: 1,
  },
  containerList: {
    flex: 1,
  },
  containerTextInput: {
    minHeight: 40,
    maxHeight: 300,
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: lightColors.BORDER,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: IS_IOS ? 8 : 44,
  },
  containerInputExpand: {
    height: 300,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: lightColors.BORDER,
    paddingVertical: 0,
  },
  separator: {
    height: 1,
    backgroundColor: lightColors.BORDER,
  },
  replyText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: 120,
    height: 120,
    backgroundColor: lightColors.AirCraftWhite,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  containerImage: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
