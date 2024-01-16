import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  settingItemText: {
    flex: 1,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: lightColors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightColors.BACKGROUND_MODAL,
  },
  modalContent: {
    width: '90%',
    backgroundColor: lightColors.WHITE,
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  btnContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  paaveLogo: {
    width: 177,
    height: 82,
  },
});
