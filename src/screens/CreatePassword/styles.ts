import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  wholeContainerStyle: {
    marginHorizontal: 16,
  },
  labelTextStyle: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 30,
  },
  textInputContainerStyle: {
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  textInputContainerStyleError: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  textInputStyle: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    marginLeft: 10,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  executeFormContainer: {
    marginHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  executeErrorFormButton: {
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.WHITE,
  },
  executeErrorFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextDisable,
  },
  executeFormTitle: {
    backgroundColor: Colors.LIGHTTitleTable,
    width: '100%',
    height: 104,
    borderRadius: 10,
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingTop: 16,
    marginTop: 16,
  },
  validateExItemContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    marginHorizontal: 16,
    alignItems: 'flex-start',
  },
  executeFormTitleText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },

  //MODAL
  SuccessContainer: {
    marginTop: 95,
  },
  successfulContainer: {
    width: 345,
    height: 56,
    backgroundColor: Colors.DARKButtonGreen,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  SuccessTitle: {
    marginVertical: 18,
    marginLeft: 18,
  },
  textSuccessful: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.WHITE,
    marginLeft: 12,
  },
});
