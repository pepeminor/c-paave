import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  chatInpurtArea: {
    height: 44,
    paddingHorizontal: 16,
  },
  textInputStyle: {
    height: 36,
    backgroundColor: Colors.LIGHTTitleTable,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  textInputStyle2: {
    fontSize: 14,
    height: 18,
  },
  marginLeft10: {
    marginLeft: 10,
  },
  chatView: {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  myChatContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 230,
    backgroundColor: Colors.BlueNewColor,
    marginBottom: 10,
    borderRadius: 10,
  },
  notMyChatContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 230,
    backgroundColor: Colors.LIGHTBGTab,
    marginBottom: 10,
    borderRadius: 10,
  },
  myChatText: {
    color: Colors.WHITE,
    flexWrap: 'wrap',
  },
  notMyChatText: {
    color: Colors.LIGHTTextContent,
    flexWrap: 'wrap',
  },
  myAvatarContainer: {
    width: 32,
    height: 32,
    marginLeft: 8,
    backgroundColor: 'red',
  },
  myAvatarContainer2: {
    width: 32,
    height: 32,
    marginLeft: 8,
  },
  notMyAvatarContainer: {
    width: 32,
    height: 32,
    marginRight: 8,
    backgroundColor: 'red',
  },
  notMyAvatarContainer2: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
});
