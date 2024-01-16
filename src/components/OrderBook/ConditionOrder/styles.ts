import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    paddingBottom: 30,
  },
  containerFirstCol: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  col: {
    flexGrow: 1,
  },
  marginTop8: {
    marginTop: 8,
  },
  headerTitle: {
    color: Colors.LIGHTTextDisable,
  },
  quantityText: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  quantityText3: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  quantityText2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  largeTextStyle: {
    fontSize: 14,
  },
  fontSize14: {
    fontSize: 14,
  },
  stockTextStyle: {
    marginBottom: 5,
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    textAlign: 'center',
  },
  btnIsVisible: {
    backgroundColor: Colors.BlueNewColor,
    padding: 3.5,
    borderRadius: 6,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 3.5,
    borderColor: Colors.LIGHTTextDisable,
  },
  firstColumn: { flexDirection: 'row', justifyContent: 'space-between' },
  btnWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 0,
  },
  selectedBtnStyle: {
    backgroundColor: Colors.LIGHTRed2,
    borderRadius: 10,
    marginBottom: 10,
    height: 44,
  },
  cancelAllBtnStyle: {
    backgroundColor: Colors.BORDER,
    borderRadius: 10,
    height: 44,
  },
  textStyle: {
    paddingVertical: 6,
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
  },
  textStyle1: {
    paddingVertical: 6,
    fontSize: 16,
    color: Colors.WHITE,
    fontWeight: '700',
  },
  skeletonContainer: {
    paddingHorizontal: 16,
  },
  skeletonHeaderView: {
    height: 40,
    marginBottom: 1,
  },
  tableHeaderItem: {
    width: '100%',
    height: '100%',
  },
  marginRight: {
    marginRight: 1,
  },
  skeletonBodyItem: {
    height: 60,
    marginBottom: 1,
  },
  textLoading: {
    textAlign: 'center',
    color: Colors.LIGHTTextDisable,
  },
  padding16: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
