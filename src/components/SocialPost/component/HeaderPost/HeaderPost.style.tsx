import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  containerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  containerDescriptionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: lightColors.TextDescription,
    marginHorizontal: 8,
  },
  containerModal: {
    paddingBottom: 24,
    paddingTop: 8,
  },
  stickHeader: {
    width: 48,
    height: 6,
    backgroundColor: lightColors.LIGHTGRAY,
    borderRadius: 4,
    alignSelf: 'center',
  },
  containerButton: {
    flexDirection: 'row',
    borderColor: lightColors.BORDER,
    borderBottomWidth: 1,
    padding: 16,
  },
  buttonIconContainer: {
    marginRight: 8,
  },
  optionSeparator: {
    height: 8,
    backgroundColor: lightColors.BORDER,
    width: '100%',
  },
});
