import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  RealTradingSettingsContainer: {
    marginHorizontal: 16,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginLeft: 8,
    width: 315,
  },
  textContentT: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 40,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  textContent: {
    marginTop: 8,
    width: 290,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  contentContainer: {
    marginTop: 16,
  },
  CheckBoxItemContainer: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 37,
  },
  executeFormDisableButton: {
    opacity: 0.5,
  },
  containerText: {
    backgroundColor: Colors.WHITE,
    marginTop: -50,
  },
});
