import globalStyles, { lightColors as Colors, scaleSize, width } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  executeButton: {
    ...globalStyles.centered,
    height: 40,
    borderRadius: 10,
    alignSelf: 'flex-end',
    _width: width - scaleSize(24),
    marginHorizontal: 12,
    marginTop: 4,
  },
  backgroundColorBuy: {
    backgroundColor: Colors.DARK_GREEN,
  },
  backgroundColorSell: {
    backgroundColor: Colors.LIGHTButtonRed,
  },
  executeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
