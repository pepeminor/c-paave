import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  modalHeader: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 14,
  },
  modalHeaderText: {
    marginRight: 16,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
  },
  closeBtn: {
    height: 24,
    width: 24,
  },
  itemText: {
    color: Colors.LIGHTTextTitle,
  },
  specialText: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  btnStyles: {
    marginTop: 9,
    marginHorizontal: 16,
    marginBottom: 26,
  },
});
