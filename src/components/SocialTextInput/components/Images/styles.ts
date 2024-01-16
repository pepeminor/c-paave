import { getStylesHook } from 'hooks';
import { lightColors } from 'styles';

export const useStyles = getStylesHook({
  container: {
    alignItems: 'center',
  },
  scrollViewContainer: {
    paddingHorizontal: 14,
  },
  bigImageItem: {
    width: 347,
    height: 400,
    backgroundColor: lightColors.AirCraftWhite,
    borderRadius: 10,
  },
  smallImageItem: {
    width: 200,
    height: 260,
    backgroundColor: lightColors.AirCraftWhite,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  closeIconContainer: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  altContainer: {
    position: 'absolute',
    paddingVertical: 4,
    paddingHorizontal: 8,
    margin: 8,
    bottom: 0,
    left: 0,
    backgroundColor: lightColors.BLACK_65,
    borderRadius: 8,
  },
});
