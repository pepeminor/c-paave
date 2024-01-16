import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  rowData: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDataText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
    paddingLeft: 10,
    paddingVertical: 14,
  },
  rowDataNumber: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    paddingRight: 10,
  },

  inputTextContainer: {
    width: 158,
    height: 44,
    backgroundColor: Colors.LIGHTTitleTable,
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHTBackground,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  inputErrorContainer: {
    backgroundColor: Colors.red01,
    borderColor: Colors.Ask1,
  },
  inputText: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    width: 138,
    height: 44,
  },

  touchContainer: {
    backgroundColor: Colors.BlueNewColor,
    marginBottom: 37,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.BlueNewColor,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  touchContainerDisabled: {
    backgroundColor: Colors.LIGHTBackground,
    borderColor: Colors.LIGHTBackground,
  },

  touchText: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    color: Colors.WHITE,
  },
  touchTextDisabled: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    color: Colors.LIGHTTextDisable,
  },

  editMarginBottom: {
    marginTop: -16,
    marginHorizontal: -16,
  },
  rowDataItem: {
    paddingHorizontal: 16,
    paddingVertical: 13,
    maxHeight: 44,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  rowDataTextItem: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextBigTitle,
  },
  rowDataValue: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    alignItems: 'flex-end',
  },
  otpContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
