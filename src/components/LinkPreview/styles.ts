import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';

export default getStylesHook({
  container: {
    marginTop: 16,
    backgroundColor: lightColors.WHITE,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: lightColors.BORDER,
    paddingBottom: 10,
    marginHorizontal: 16,
  },
  containerRow: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: lightColors.WHITE,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: lightColors.BORDER,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textTitle: {
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 10,
  },
  textDescription: {
    marginTop: 4,
    paddingHorizontal: 10,
  },
  containerLeft: {
    padding: 27,
    backgroundColor: lightColors.BORDER,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRight: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
});
