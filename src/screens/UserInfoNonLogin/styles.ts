import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  avaNameContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  avaNameBlock: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 60,
    borderColor: Colors.BlueNewColor,
  },
  avaNameIcon: {},
  avaNameText: {
    marginLeft: 8,
    color: Colors.LIGHTTextContent,
    fontWeight: '700',
    fontSize: 16,
  },
  avaActionContainer: {
    marginTop: 8,
  },
  avaAction: {
    paddingVertical: 11,
    borderRadius: 10,
  },
  avaActionRegister: {
    backgroundColor: Colors.LIGHTBackground,
    marginRight: 9,
  },
  avaActionLogin: {
    backgroundColor: Colors.BlueNewColor,
    marginLeft: 9,
  },
  avaActionText: {
    fontSize: 16,
  },
  avaActionRegisterText: {
    color: Colors.BlueNewColor,
  },
  avaActionLoginText: {
    color: Colors.WHITE,
    fontWeight: '700',
  },
  bannerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 110,
  },
  banner: {
    borderRadius: 13,
  },
  btnAction: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnActionName: {},
  btnActionNameText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    marginLeft: 15,
  },
});
