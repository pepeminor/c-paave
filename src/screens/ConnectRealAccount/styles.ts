import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  rightText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.WHITE,
  },
  boxTradingReal: {
    marginTop: 15,
    marginLeft: 16,
    height: 80,
    width: 164,
  },
  containerFlat: {
    height: 700,
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
    marginTop: 16,
    marginLeft: 16,
  },
  TitleText: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
  },
  TitleTextTrading: {
    fontWeight: '700',
    fontSize: 14,
    color: Colors.LIGHTTextTitle,
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
    marginBottom: 5,
  },
});
