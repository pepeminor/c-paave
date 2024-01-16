import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  Skip: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  Title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginLeft: 16,
    width: 315,
    marginTop: 16,
  },

  boxTradingReal: {
    marginTop: 15,
    marginLeft: 16,
    height: 80,
    width: 164,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.88,
    elevation: 5,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },

  listContainer: {
    marginTop: 30,
    height: 580,
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
  TitleContainer: {
    height: 24,
    width: 343,
    marginTop: 16,
    marginLeft: 16,
  },
  TitleTextContainer: {
    height: 24,
    width: 343,
    marginTop: 48,
    marginLeft: 16,
  },
  TitleText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
});
