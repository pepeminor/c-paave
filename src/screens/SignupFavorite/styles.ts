import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerSkipText: {
    fontWeight: '700',
    color: Colors.LIGHTTextBigTitle,
    fontSize: 14,
  },
  logoContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.LIGHTTextContent,
    marginLeft: 16,
    marginBottom: 30,
  },
  titleFavorite: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.LIGHTTextTitle,
    marginLeft: 16,
  },
  titleFavorite2: {
    marginTop: 30,
  },
  itemContainer: {
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  eachItem: {
    height: 34,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
    marginTop: 8,
  },
  eachItemSelected: {
    backgroundColor: Colors.BlueNewColor,
  },
  itemText: {
    color: Colors.LIGHTTextContent,
    fontSize: 14,
  },
  itemTextSelected: {
    color: Colors.WHITE,
  },
  submitContainer: {
    paddingTop: 30,
    paddingBottom: 5,
  },
  executeFormButton: {
    backgroundColor: Colors.BlueNewColor,
    height: 44,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
});
