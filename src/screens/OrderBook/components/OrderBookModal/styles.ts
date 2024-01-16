import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  inputContainer: {
    marginBottom: 10,
  },
  marginRight8: {
    marginRight: 8,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  title: {
    color: Colors.LIGHTTextTitle,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  marketPricePlaceHolder: {
    width: 90,
    height: 18,
  },
  formInfo: {
    marginBottom: 3,
  },
  formInfoValue: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '500',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  labelPlaceHolderContainer: {
    height: 16,
    width: 73,
  },
  quantityText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    paddingBottom: 10,
  },
});
