import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import globalStyles from 'styles';

export default getStylesHook({
  pdTouch: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  containerStyle: {
    position: 'relative',
    backgroundColor: Colors.WHITE,
    minHeight: 460,
    maxHeight: 460,
    marginTop: 48,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  modalTitle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    backgroundColor: Colors.WHITE,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  filterText: {
    ...globalStyles.container,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    marginRight: 54,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    position: 'absolute',
    top: 18,
    right: 18,
  },
  marginContent: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
  normalText: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  viewRankingModal: {
    position: 'relative',
    backgroundColor: Colors.WHITE,
    minHeight: 460,
    maxHeight: 460,
    marginTop: 48,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
});
