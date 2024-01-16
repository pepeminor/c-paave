import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerBackground: {
    backgroundColor: Colors.WHITE,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  marginRight16: {
    marginRight: 16,
  },
  marginBottom16: {
    marginBottom: 16,
  },
  chooseTypeBlock: {
    width: 343,
    marginVertical: 10,
  },
  chooseTypeLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  labelIconStyle: {
    width: 24,
    height: 24,
    color: Colors.LIGHTTextDisable,
  },
  containerFirstCol: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  largeTextStyle: {
    fontSize: 14,
  },
  stockTextStyle: {
    color: Colors.BlueNewColor,
    textAlign: 'center',
  },
  normalTextStyle: {
    fontSize: 14,
    color: Colors.BLACK,
    textAlign: 'center',
  },
  firstColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 38,
  },
  alignRight: {
    textAlign: 'right',
  },
  pR: {
    paddingRight: 10,
  },
  pB16: {
    paddingBottom: 16,
  },
});
