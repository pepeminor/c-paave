import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  IConQuestion: {
    marginLeft: 3,
  },
  rowData: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  rowDataTextBranch: {
    fontWeight: 'bold',
    fontSize: 12,
    color: lightColors.LIGHTTextBigTitle,
    width: 343,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  rowDataTextAdd: {
    fontWeight: '400',
    fontSize: 12,
    color: lightColors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalBackground: {
    backgroundColor: lightColors.BACKGROUND_MODAL2,
  },
  modalView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  listOverviewContainer: {
    height: 635,
  },
  iconClose: {
    marginRight: 16,
  },
  modalContentContainer: {
    backgroundColor: lightColors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    paddingBottom: 14,
    width: '100%',
  },
  modalTitle: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: lightColors.BORDER,
  },
  filterTextOver: {
    fontWeight: 'bold',
    fontSize: 16,
    color: lightColors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  iconCloseAbs: {
    position: 'absolute',
    top: 18,
    right: 0,
  },
});
