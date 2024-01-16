import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { IS_IOS } from 'constants/main';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  optionContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: lightColors.BlueNewColor,
    marginLeft: 8,
  },
  selectedText: {
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
  indicatorLeaderBoard: {
    height: 4,
    backgroundColor: lightColors.WHITE,
  },
  indicator: {
    height: 4,
    backgroundColor: lightColors.BlueNewColor,
  },
  tabBar: {
    padding: 0,
    backgroundColor: lightColors.WHITE,
  },
  tabBarLeaderBoard: {
    padding: 0,
    backgroundColor: lightColors.BlueNewColor,
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: lightColors.BORDER,
  },
  titleModal: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  descriptionModal: {
    padding: 16,
  },
  buttonModal: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: lightColors.BORDER,
    borderColor: lightColors.BORDER,
  },
  closeButton: {
    top: 32,
  },
  containerButton: {
    marginLeft: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: 'absolute',
    left: 145,
    top: IS_IOS ? 111 : 72,
    zIndex: 20,
    elevation: 20,
  },
});
