import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  containerMain: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  textLine: {
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
  },
  checkbox: {
    width: 24,
    height: 24,
  },
});
