import { lightColors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    // height: 310,
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    minHeight: 600,
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  containerSeeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerImage: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  textTitle: {
    marginTop: 12,
  },
  textContent: {
    marginTop: 8,
  },
  containerList: {
    paddingLeft: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: lightColors.BORDER,
  },
  containerContent: {
    paddingRight: 16,
  },
  noMarginHorizontal: {
    marginHorizontal: 0,
  },
  textSelected: {
    color: lightColors.BlueNewColor,
  },
  textUnSelected: {
    ...textStyles.fontSize14,
    ...textStyles.roboto700,
    color: lightColors.LIGHTTextDisable,
  },
});
