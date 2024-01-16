import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  ItemBorder: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  Item: {
    height: 44,
    paddingLeft: 16,
    paddingRight: 10,
  },
  Flag: {
    alignItems: 'flex-end',
  },
  CustomPickerText: {
    fontFamily: 'Roboto',
    color: Colors.LIGHTTextContent,
    marginRight: 8,
    fontSize: 14,
  },
  modalBackground: {
    paddingHorizontal: 16,
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    alignItems: 'stretch',
    borderRadius: 21,
    width: '100%',
  },
  modalTitle: {
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
  Label: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  selectedLabel: {
    color: Colors.BlueNewColor,
  },
  touchAbleLabelStyle: {
    paddingHorizontal: 10,
  },
  touchAbleStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  closeButtonContainer: {
    paddingHorizontal: 16,
  },
});
