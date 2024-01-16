import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  buttonContainer: {
    ...globalStyles.flexDirectionRow,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
  },
  btnDisable: {
    opacity: 0.5,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
  },
  buttonSell: {
    marginRight: 10,
    backgroundColor: Colors.LIGHTButtonRed,
  },
  buttonBuy: {
    backgroundColor: Colors.DARKButtonGreen,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  buttonTextChoose: {
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
