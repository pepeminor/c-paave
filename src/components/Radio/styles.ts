import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  containerBox: {
    marginTop: 30,
  },
  TxtTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginLeft: 8,
    width: 315,
  },
  container: {
    marginTop: -15,
  },
  textContentT: {
    marginBottom: 8,
    marginLeft: 40,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  textContent: {
    width: 290,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  containerText: {
    marginTop: 8,
  },
});
