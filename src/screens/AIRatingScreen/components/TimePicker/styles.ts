import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  optionPerformanceContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typePickerContainer: {
    paddingHorizontal: 10,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 10,
    height: 36,
    width: 130,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  performanceText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  colorLightTextContent: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextContent,
    width: 100,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
  },
  modalTitle: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  filterText: {
    ...textStyles.fontSize16,
    ...textStyles.roboto700,
    color: Colors.BlueNewColor,
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValue: {
    ...textStyles.fontSize16,
    ...textStyles.roboto400,
  },
  filterTextValueSelected: {
    color: Colors.MainBlue,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextTitle,
  },
});
