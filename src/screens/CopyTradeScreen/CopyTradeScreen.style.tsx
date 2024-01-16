import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  mt5: {
    marginTop: 5,
  },
  mt8: {
    marginTop: 8,
  },
  ml16: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextTitle,
  },
  infoContainer: {
    marginTop: 5,
    // paddingVertical: (11),
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    backgroundColor: Colors.LIGHTTitleTable,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer2: {
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    backgroundColor: Colors.LIGHTTitleTable,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainerError: {
    backgroundColor: 'rgba(224, 64, 54, 0.1)',
    borderColor: 'rgba(235, 85, 76, 1)',
  },
  selectedItemContainer: {
    backgroundColor: Colors.BlueNewColor,
  },
  selectedItemText: {
    ...textStyles.roboto700,
    color: Colors.WHITE,
  },
  infoText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextContent,
  },
  minMaxValueText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextTitle,
  },
  minText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: Colors.DARK_GREEN,
  },
  maxText: {
    ...textStyles.fontSize12,
    ...textStyles.roboto400,
    color: Colors.LIGHTRed,
    marginLeft: 15,
  },
  submitBtn: {
    backgroundColor: Colors.BlueNewColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 13,
    marginBottom: 32,
    marginTop: 26,
  },
  submitBtnDisable: {
    opacity: 0.5,
  },
  submitBtnText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: Colors.WHITE,
    paddingRight: 16,
  },
  textInputStyle: {
    flex: 1,
    paddingBottom: 8,
    height: '100%',
  },
  agreementContainer: {
    paddingTop: 8,
    alignItems: 'center',
  },
});
