import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
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
    marginTop: 8,
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  textTitle: {
    marginTop: 4,
  },
  textContent: {
    marginTop: 8,
  },
  containerList: {
    marginTop: 16,
    paddingLeft: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: lightColors.BORDER,
  },
  containerContent: {
    paddingRight: 16,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerBottomPost: {
    width: 150,
    marginTop: 8,
    justifyContent: 'flex-start',
  },
});
