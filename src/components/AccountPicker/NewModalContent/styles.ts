import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export const CONTENT_HEIGHT = 300;

export default getStylesHook({
  container: {
    height: CONTENT_HEIGHT,
  },
  modalHeader: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  stickHeader: {
    width: 48,
    height: 6,
    backgroundColor: Colors.BaliHai,
    marginTop: 8,
    borderRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerHeader: {
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  bottomTab: {
    width: 96,
    height: 4,
    marginTop: 8,
    backgroundColor: Colors.BlueNewColor,
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
  },
  containerItem: {
    marginTop: 16,
    paddingLeft: 8,
    paddingRight: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textNameAccount: {
    flex: 1,
    marginLeft: 12,
  },
  containerIcon: {
    width: 24,
    height: 24,
  },
  containerLogo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  containerRequireLogin: { borderBottomWidth: 0 },
  containerEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
  },
  buttonConnect: {
    marginHorizontal: 32,
    marginTop: 16,
  },
  paaveLogo: {
    width: 180,
    height: 60,
    marginBottom: 24,
  },
});
