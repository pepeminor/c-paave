import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flexDirection: 'row',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.BlueNewColor,
  },
  label: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  labelText: {
    alignSelf: 'center',
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
    fontSize: 14,
  },
});
