import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  headerTitleSingleString: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
  headerTitleSingleStringText: {
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
  },
  headerTitleSingleStringBorderRight: {
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  headerTitleSingleStringBorderRightFrozen: {
    borderRightWidth: 1,
    borderRightColor: Colors.BORDER,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  backgroundCheckBoxLabel: {
    backgroundColor: Colors.LIGHTTitleTable,
  },
});
