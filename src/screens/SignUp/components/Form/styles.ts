import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const localColors = {
  white10: Colors.white10,
  white15: Colors.white15,
  DARKTextTitle: Colors.DARKTextTitle,
  DARKTextBigTitle: Colors.DARKTextBigTitle,
};

export default getStylesHook({
  wholeContainerVerticalStyle: {
    marginTop: 15,
  },
  labelTextStyle: {
    color: localColors.DARKTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  textInputContainerStyle: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: localColors.white10,
  },
  textInputContainerStyleError: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.Ask1,
  },
  iconStyle: {
    marginHorizontal: 14,
  },
  textInputStyle: {
    width: 216,
    height: '100%',
    fontSize: 14,
    paddingTop: 0,
    paddingBottom: 0,
    color: localColors.DARKTextBigTitle,
  },
  eyeIconStyle: {
    marginHorizontal: 16,
  },
  executeFormContainerLogin: {
    marginTop: 23,
  },
});
