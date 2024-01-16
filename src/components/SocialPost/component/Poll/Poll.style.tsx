import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
  },
  containerItem: {
    paddingVertical: 12,
    marginTop: 8,
    width: '100%',
    borderRadius: 10,
    backgroundColor: lightColors.Gray3,
    flexDirection: 'row',
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: lightColors.WHITE,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  containerResult: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: lightColors.TextDescription,
    marginHorizontal: 8,
  },
  textResult: {
    flex: 1,
    textAlign: 'right',
    marginRight: 16,
  },
  indicator: {
    position: 'absolute',
    width: 340,
    height: 40,
    left: 0,
    backgroundColor: lightColors.CrystalBlue,
    borderRadius: 10,
    zIndex: -1,
  },
  textNote: {
    marginTop: 8,
  },
});
