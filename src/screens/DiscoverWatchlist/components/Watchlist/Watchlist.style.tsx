import globalStyles, { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  noSymbolsText: {
    color: lightColors.LIGHTTextContent,
    fontSize: 16,
    lineHeight: 22,
    marginTop: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    _color: lightColors.WHITE,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButton: {
    ...globalStyles.centered,
    ...globalStyles.flexDirectionRow,
    backgroundColor: lightColors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
    marginBottom: 16,
    marginTop: 8,
  },
  separator: {
    height: 8,
  },
  containerEmpty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
});
