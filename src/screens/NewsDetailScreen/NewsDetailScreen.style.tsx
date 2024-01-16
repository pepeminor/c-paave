import { lightColors, width } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  containerNoPost: {
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    paddingHorizontal: 16,
  },
  containerRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: 6,
  },
  image: {
    marginTop: 16,
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  content: {
    paddingVertical: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  icon: {
    marginLeft: 8,
  },

  titleLatest: {
    paddingVertical: 12,
  },
  containerContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    marginTop: 8,
  },
  line: {
    width: width,
    left: -16,
    height: 8,
    backgroundColor: lightColors.LIGHTBackground,
    marginTop: 16,
  },
  containerBottomPost: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: lightColors.BORDER,
    borderBottomColor: lightColors.BORDER,
    paddingVertical: 10,
    marginTop: 16,
  },
  containerLikes: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
