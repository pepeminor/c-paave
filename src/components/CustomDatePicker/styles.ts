import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
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
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  datePickerLabelStyle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginBottom: 4,
  },
});
