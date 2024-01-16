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
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
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
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
  },
  avaActionLoginText: {
    color: Colors.WHITE,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 16,
  },
  bannerContainer: {
    height: 126,
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextBigTitle,
    marginLeft: 15,
  },
});
