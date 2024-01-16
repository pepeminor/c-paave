import { getStylesHook } from 'hooks/useStyles';
import { Platform } from 'react-native';
import { lightColors, textStyles, height } from 'styles';

export const useStyles = getStylesHook({
  container: {
    backgroundColor: lightColors.LIGHTTitleTable,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: lightColors.LIGHTBackground,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollViewContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  currentText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    textAlign: 'center',
  },
  placeholderText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    textAlign: 'center',
    color: lightColors.LIGHTTextDisable,
  },
  pickerContainer: {
    maxHeight: height - 200,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 0,
  },
  pickerItem: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  unPickedText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
  },
  pickedText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: lightColors.BlueNewColor,
  },
});
