import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
  },
  containerContent: {
    paddingBottom: 24,
    paddingTop: 4,
  },
  textInputStyle: {
    fontSize: 12,
    color: lightColors.LIGHTTextContent,
    height: 36,
    width: '80%',
    marginLeft: 8,
  },
  textInputContainer: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: lightColors.LIGHTBackground,
    backgroundColor: lightColors.LIGHTTitleTable,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: 36,
    marginTop: 8,
    marginBottom: 8,
  },
  titleLatestNews: {
    marginTop: 16,
    marginLeft: 16,
  },
  title: {
    marginLeft: 16,
    marginTop: 8,
  },
});
