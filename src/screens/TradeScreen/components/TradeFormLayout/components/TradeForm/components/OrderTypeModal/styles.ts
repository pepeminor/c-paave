import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND_MODAL,
    alignItems: 'flex-end',
  },
  topInfo: {
    height: 14,
  },
  modalContentContainer: {
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    width: '100%',
    paddingBottom: 30,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    paddingHorizontal: 16,
  },
  filterText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.MainBlue,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  filterItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
