import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 0.865,
    borderRadius: 10,
  },
  containerLayout2: {
    flex: 1,
    backgroundColor: lightColors.WHITE,
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageLayout2Left: {
    width: '100%',
    aspectRatio: 0.95,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageLayout2Right: {
    aspectRatio: 0.95,
    width: '100%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerImageLayout2: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  containerImageLayout2Right: {
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 4,
  },
  containerLayout3Right: {
    flex: 1,
    marginLeft: 4,
  },
  containerLayout3Left: {
    flex: 1,
  },
  imageLayout3Left: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageLayout3Right: {
    width: '100%',
    aspectRatio: 1,
    borderTopRightRadius: 10,
  },
  imageLayout3RightBottom: {
    width: '100%',
    aspectRatio: 1,
    borderBottomRightRadius: 10,
  },
  imageLayout4Left: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
  },
  imageLayout4LeftBottom: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 10,
  },
  containerImageLayout3Top: {
    flex: 1,
    marginBottom: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerImageLayout3Bottom: {
    flex: 1,
    marginTop: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerImageLayout4Left: {
    flex: 1,
    borderTopLeftRadius: 10,
    marginBottom: 2,
  },
  containerImageLayout4LeftBottom: {
    flex: 1,
    marginTop: 2,
    borderBottomLeftRadius: 10,
  },
});
