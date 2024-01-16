import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  stockInfoTitleContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  investmentText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
  },
  reportText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.BlueNewColor,
    marginRight: 9,
    fontSize: 14,
  },
  noDataSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  noDataText: {
    fontFamily: 'Roboto',
    marginTop: 16,
    fontSize: 16,
    lineHeight: 22,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  noDataBtn: {
    marginTop: 16,
    marginBottom: 7,
  },
  noDataBtnText: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.DARK_GREEN,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  executeFormButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
});
