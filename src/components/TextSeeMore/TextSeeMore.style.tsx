import { lightColors, width } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  textSeeMore: {
    marginTop: 2,
    paddingHorizontal: 16,
  },
  textHidden: {
    position: 'absolute',
    opacity: 0,
    left: -width, //important to get layout
    lineHeight: 23,
    marginHorizontal: 16,
  },

  textUrl: {
    color: lightColors.MainBlue,
  },
});
