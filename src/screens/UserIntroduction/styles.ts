import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  textInputContainerStyle: {
    paddingHorizontal: 10,
    paddingTop: 3,
  },
  textInputStyle: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  actionGroup: {
    height: 130,
  },
  confirmButton: {
    backgroundColor: Colors.BlueNewColor,
    width: 343,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 5,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  cancelButton: {
    backgroundColor: Colors.LIGHTBackground,
    width: 343,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 5,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  textInputContainer: {
    width: 343,
    // height: (90),
    backgroundColor: Colors.LIGHTTitleTable,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
    borderRadius: 10,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  introTextLengthStyle: {
    marginLeft: 16,
    color: Colors.LIGHTTextDisable,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});
