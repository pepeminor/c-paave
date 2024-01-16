import { lightColors as Colors, textStyles } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    marginTop: 5,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    backgroundColor: Colors.LIGHTTitleTable,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shownText: {
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: Colors.LIGHTTextContent,
  },
});
