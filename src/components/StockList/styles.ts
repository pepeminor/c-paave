import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  skeletonContainer: {
    height: 250,
  },
  noDataSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    lineHeight: 22,
    color: lightColors.LIGHTTextContent,
    textAlign: 'center',
  },
  noDataBtn: {
    marginTop: 16,
    marginBottom: 7,
  },
  noDataBtnText: {
    fontSize: 14,
    lineHeight: 18,
    color: lightColors.DARK_GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdownContainer: {
    width: 150,
    height: 30,
    marginLeft: 20,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: lightColors.LIGHTBackground,
    borderWidth: 0.5,
    borderColor: lightColors.LIGHTTextDisable,
    paddingHorizontal: 10,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: lightColors.BlueNewColor,
  },
});
