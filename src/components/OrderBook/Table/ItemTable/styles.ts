import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  col: {
    flexGrow: 1,
  },
  columHeader: {
    // padding: (13,
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: Colors.BORDER2,
    backgroundColor: Colors.LIGHTBackground,
  },
  largeTextStyle: {
    fontSize: 14,
    lineHeight: 18,
  },
  symbolInfoStyle: {
    backgroundColor: Colors.WHITE,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 10,
    backgroundColor: Colors.LIGHTTitleTable,
  },
  minWithButton: {
    width: 163.5,
    height: 34,
  },
  buttonModify: {
    backgroundColor: Colors.LIGHTYellow,
  },
  buttonCancel: {
    backgroundColor: Colors.LIGHTGRAY,
  },
  buttonFadeUp: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.UpIconBackGround,
    height: 22,
  },
  wrapperIcon: {
    paddingVertical: 3,
  },
});
