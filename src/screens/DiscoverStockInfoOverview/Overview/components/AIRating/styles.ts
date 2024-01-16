import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  titleText: {
    ...textStyles.fontSize18,
    ...textStyles.roboto700,
    color: Colors.LIGHTTextBigTitle,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  askScoreIcon: {
    marginTop: 3,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
