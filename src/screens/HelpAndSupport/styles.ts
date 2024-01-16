import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  settingContainer: {
    height: 44,
    paddingHorizontal: 16,
  },
  settingContainer2: {
    height: 62,
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  marginLeft8: {
    marginLeft: 8,
  },
  borderBottom5: {
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 5,
  },
  settingItemText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
  },
  settingItemText2: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  settingItemTextTitle: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 18,
  },

  backgroundContainer: {
    backgroundColor: Colors.WHITE,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  containerItem: {
    width: 164,
    height: 128,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.WHITE,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  textUser: {
    color: Colors.BLACK,
    fontSize: 14,
    lineHeight: 18,
    paddingTop: 10,
  },
  notificationText: {
    color: Colors.LIGHTText,
    fontWeight: '700',
    marginBottom: 2,
    fontSize: 14,
  },
  notificationText2: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    flexWrap: 'wrap',
  },
  switchContainer: {
    paddingLeft: 57,
  },
});
