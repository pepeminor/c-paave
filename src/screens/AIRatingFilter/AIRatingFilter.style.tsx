import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { Dimensions, Platform } from 'react-native';

const { height } = Dimensions.get('window');

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    ...textStyles.fontSize20,
    ...textStyles.roboto700,
    color: lightColors.WHITE,
    marginLeft: 8,
  },
  stockTypeContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 16,
  },
  stockTypeItem: {
    marginRight: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 4,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  sliderTouchable: {
    marginRight: 16,
  },
  filterTitle: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    width: 120,
  },
  modalContainer: {
    position: 'relative',
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  contentContainer: {
    maxHeight: height * 0.6,
  },
  modalTitle: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
    marginBottom: 8,
    marginTop: 4,
    paddingBottom: 8,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
});
