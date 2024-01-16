import globalStyles, { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  datePickerContainerForTradeScreen: {
    height: 30,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 10,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingLeft: 10,
    paddingRight: 12,
  },
  datePickerContainer: {
    height: 44,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    borderRadius: 10,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingLeft: 10,
    paddingRight: 12,
  },
  dateText: {
    ...globalStyles.container,
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  datePickerLabelStyle: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginBottom: 4,
  },
});
