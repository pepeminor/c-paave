import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    paddingBottom: 10,
    borderBottomColor: lightColors.BORDER,
    borderBottomWidth: 8,
  },
  containerTag: {
    flexDirection: 'row',
    marginTop: 4,
    paddingHorizontal: 16,
    flexWrap: 'wrap',
  },
  textContent: {
    lineHeight: 23,
    marginTop: 8,
    marginHorizontal: 16,
  },
  textTag: {
    marginRight: 8,
  },
  textUrl: {
    color: lightColors.MainBlue,
  },
  containerBottomPost: {
    marginTop: 8,
    // paddingTop: 10,
    // paddingHorizontal: 36,
    borderTopWidth: 1,
    borderTopColor: lightColors.BORDER,
  },
  containerSymbol: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: lightColors.BORDER,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerItemStyle: {
    paddingTop: 10,
  },
  containerLikes: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
