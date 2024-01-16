import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  ImageContainer: {
    width: 343,
    height: 110,
  },
  paginationStyle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 6,
    marginTop: 24,
  },
  Dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: Colors.LIGHTBGTab,
    marginTop: 24,
  },
  FastImageContainer: {
    borderRadius: 13,
  },
  bannerText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    paddingHorizontal: 16,
    marginTop: 16,
  },
});
