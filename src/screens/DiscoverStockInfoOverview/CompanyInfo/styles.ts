import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  grayLine: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.BORDER,
    marginBottom: 15,
  },
  bio: {
    lineHeight: 22,
    fontSize: 14,
    color: Colors.BLACK,
    paddingHorizontal: 16,
  },
  info: {
    marginVertical: 13,
    marginHorizontal: 16,
  },
  infoTitle: {
    flex: 1,
    color: Colors.LIGHTTextBigTitle,
    fontWeight: '700',
    fontSize: 14,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  updateInfo: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  updateInfoText: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 18,
  },
  bioContainer: {
    paddingHorizontal: 14,
    paddingBottom: 16,
  },
  labelPlaceHolderContainer: {
    height: 20,
    width: 360,
  },
  marginVertical: {
    marginVertical: 2,
  },
  bioText: {
    fontSize: 16,
    color: Colors.BlueNewColor,
    fontWeight: '700',
  },
  paddingVertical8: {
    paddingVertical: 8,
  },
});
