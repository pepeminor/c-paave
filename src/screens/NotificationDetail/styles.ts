import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.WHITE,
  },
  wrapContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  titleContainer: {
    marginTop: 10,
  },
  avatarContainer: {
    width: 60,
    marginRight: 15,
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
  timeText: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    marginTop: 5,
  },
  contentContainer: {
    marginTop: 8,
  },
  contentText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    color: Colors.LIGHTTextContent,
  },
});
