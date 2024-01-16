import { lightColors as Colors, isPlatformIOs } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  Dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.LIGHTGRAY,
    marginHorizontal: 4,
    marginTop: 10,
  },
  activeDot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 4,
    marginTop: 10,
  },
  paginationStyle: {
    position: 'relative',
    justifyContent: 'center',
    top: 0,
  },
  swiperContainer: {
    width: 370,
    height: isPlatformIOs ? 465 : 480,
  },
  imageWrapper: {
    width: 370,
    height: isPlatformIOs ? 465 : 480,
    alignItems: 'center',
  },
  marginLeft24: {
    marginLeft: 24,
  },
});
