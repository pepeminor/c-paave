import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  priceContainer: {
    paddingBottom: 8,
    paddingTop: 10,
  },
  navReturnValueText: {
    marginLeft: 16,
    fontSize: 24,
    color: Colors.DARK_GREEN,
  },
  zid9999: {
    zIndex: 9999,
  },
  requireLoginText: {
    width: 228,
    fontSize: 18,
    color: Colors.LIGHTTextTitle,
    textAlign: 'center',
  },
  paddingRight8: {
    paddingRight: 8,
  },
  navRateText: {
    color: Colors.WHITE,
    fontSize: 16,
  },
  grayArea: {
    height: 30,
    width: 49,
    borderRadius: 8,
    backgroundColor: Colors.LIGHTGRAY,
    marginRight: 16,
  },
  chartContainer: {
    height: 300,
  },
  bannerContainer: {
    height: 110,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  stockInfoContainer: {
    height: 50,
    marginTop: 4,
  },
  stockInfoTitleContainer: {
    height: 44,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  investmentText: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.LIGHTTextBigTitle,
  },
  profitLossReportContainer: {
    alignItems: 'flex-end',
    backgroundColor: Colors.LIGHTBackground,
    height: 38,
    width: 148,
    borderRadius: 8,
  },
  reportText: {
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  executeFormContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    width: 343,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  signUpText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
    marginHorizontal: 41,
    marginBottom: 18,
  },
  text: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  signInText: {
    color: Colors.BlueNewColor,
    fontSize: 14,
    fontWeight: '700',
    paddingLeft: 5,
  },
  marginTop21: {
    marginTop: 21,
  },
  marginTop10: {
    marginTop: 10,
  },
});
