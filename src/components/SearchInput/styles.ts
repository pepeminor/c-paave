import { getStylesHook } from 'hooks/useStyles';
import { Colors } from 'styles';

export default getStylesHook({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    backgroundColor: Colors.LIGHTTitleTable,
    borderWidth: 1,
    borderColor: Colors.BORDER,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    backgroundColor: Colors.UpIconBackGround,
    borderRadius: 25,
    padding: 3,
  },
  inputStyle: {
    flex: 1,
    fontSize: 12,
    color: Colors.LIGHTTextContent,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    height: 40,
    marginLeft: 10,
  },
});
