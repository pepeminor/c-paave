import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  headerIconLeft: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  tabBar: {
    backgroundColor: lightColors.Transparent,
  },
  tab: {
    padding: 0,
  },
  indicator: {
    display: 'none',
  },
  optionContainer: {
    width: 156,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  optionContainerSelected: {
    borderBottomWidth: 3,
    borderBottomColor: lightColors.BlueNewColor,
  },
  questionIcon: {
    marginLeft: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: 'absolute',
    left: 105,
    top: Platform.OS === 'ios' ? 109 : 70,
    zIndex: 20,
    elevation: 20,
  },
  questionIconAdvisor: {
    marginLeft: 4,
    paddingHorizontal: 5,
    paddingVertical: 5,
    position: 'absolute',
    left: 305,
    top: Platform.OS === 'ios' ? 105 : 66,
    zIndex: 20,
    elevation: 20,
  },
  text: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    lineHeight: 24,
    paddingBottom: 5,
    marginRight: 35,
  },
  selectedText: {
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
  containerQuestionAdvisor: {
    flexDirection: 'row',
    width: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
