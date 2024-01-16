import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
  },
  containerContent: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionContainer: {
    paddingBottom: 8,
  },
  notificationStock: {
    flexDirection: 'row',
    marginTop: 10,
    paddingBottom: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  textBold: {
    fontWeight: '700',
    fontSize: 16,
    color: Colors.LIGHTTextBigTitle,
  },
  textRegular: {
    fontWeight: '400',
    fontSize: 14,
    color: Colors.LIGHTTextContent,
  },
  lightText: {
    color: Colors.LIGHTTextTitle,
  },
  textFiled: {
    width: 276,
    height: 44,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.LIGHTBackground,
    backgroundColor: Colors.LIGHTTitleTable,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
  button: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 11,
    lineHeight: 22,
  },
  sizeIcon: {
    width: 28,
    height: 28,
    marginLeft: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  codeQR: {
    width: 89,
    height: 89,
    backgroundColor: Colors.BLACK,
  },
});
