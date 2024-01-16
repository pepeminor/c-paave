import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  marginHorizontal16: {
    marginHorizontal: 16,
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
  paddingLeft8: {
    paddingLeft: 8,
  },
  marginTop16: {
    marginTop: 16,
  },
  marginTop8: {
    marginTop: 8,
  },
  marginBottom8: {
    marginTop: 8,
  },
  videoSize: {
    backgroundColor: Colors.Ask,
    height: 211,
  },
  titleContent: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
  },
  textContent: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
    lineHeight: 18,
  },
  tags: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    lineHeight: 22,
  },
  tagItem: {
    fontSize: 16,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
    lineHeight: 22,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  marginLeft15: {
    marginLeft: 20,
  },
  tagBtn: {
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 8,
  },
  marginHorizontal5: {
    marginHorizontal: 5,
  },
  marginHorizontal8: {
    marginHorizontal: 8,
  },
  marginVertical8: {
    marginHorizontal: 8,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  border: {
    backgroundColor: Colors.BORDER2,
    height: 8,
  },
  lastestText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.LIGHTText,
    lineHeight: 24,
  },
  newsActionItem: {
    width: 66,
  },
  newsActionLike: {
    marginRight: 4,
  },
  newsActionShare: {
    marginLeft: 4,
  },
  newsActionValue: {
    fontSize: 14,
    color: Colors.LIGHTTextDisable,
  },
});
