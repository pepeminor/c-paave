import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  videoSize: {
    backgroundColor: Colors.Ask,
    height: 211,
  },
  marginTop6: {
    marginTop: 6,
  },
  marginTop16: {
    marginTop: 16,
  },
  marginVertical6: {
    marginVertical: 6,
  },
  marginHorizontal16: {
    marginHorizontal: 16,
  },
  paddingLeft8: {
    paddingLeft: 8,
  },
  titleVideo: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTText,
  },
  lineHeightTitle: {
    lineHeight: 22,
  },
  textCalendar: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.LIGHTTextDisable,
  },
  lineHeightContent: {
    lineHeight: 18,
  },
  textContent: {
    fontSize: 14,
  },
});
