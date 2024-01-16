import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    marginLeft: 32,
    marginTop: 8,
    paddingHorizontal: 8,
    width: 311,
    borderRadius: 15,
    backgroundColor: Colors.WHITE,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowRadius: 15,
    elevation: 6,
    shadowOffset: {
      height: 0,
      width: 15,
    },
    opacity: 1,
  },
  separator: {
    width: '100%',
    borderTopColor: Colors.BORDER,
    borderTopWidth: 1,
  },
  itemContainer: {
    paddingVertical: 13,
    paddingHorizontal: 16,
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.LIGHTTextContent,
  },
});
