import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: 343,
    borderRadius: 20,
    paddingVertical: 16,
    backgroundColor: lightColors.WHITE,
  },
  modalTitle: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
  },
  modalContent: {
    padding: 16,
  },
  actionBtnContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnLeft: {
    flex: 1,
    marginRight: 8,
  },
  btnRight: {
    flex: 1,
    marginLeft: 8,
  },
});
