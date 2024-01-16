import { Platform } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  topInfo: {
    height: 14,
  },
  modalBackground: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    alignItems: 'flex-end',
  },
  modalContentContainer: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  modalTitle: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.MainBlue,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  filterItemContainer: {
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValue: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
  },
  filterTextValueSelected: {
    color: Colors.MainBlue,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextTitle,
  },
});
