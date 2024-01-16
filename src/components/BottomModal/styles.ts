import { Dimensions } from 'react-native';
import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalContainer: {
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    // paddingBottom: (30),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  background: {
    backgroundColor: Colors.BACKGROUND_MODAL,
  },
  dummyModal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
