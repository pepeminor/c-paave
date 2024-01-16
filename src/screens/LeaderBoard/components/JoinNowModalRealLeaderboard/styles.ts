import { IS_IOS } from 'constants/main';
import { getStylesHook } from 'hooks/useStyles';
import { Colors } from 'styles';

export default getStylesHook({
  titleModal: {
    fontSize: 18,
    paddingBottom: 16,
    textAlign: 'center',
    color: Colors.Blue5,
    fontWeight: 'bold',
  },
  textDesc: {
    paddingBottom: 8,
    color: Colors.LIGHTButtonRed,
    fontSize: 14,
  },
  textDesc2: {
    paddingBottom: 8,
    color: Colors.BLACK,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text_2: {
    paddingTop: 8,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    backgroundColor: Colors.WHITE,
  },
  modalContentContainer: {
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 18,
    width: '100%',
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 8,
    padding: 8,
    shadowColor: Colors.Transparent,
    elevation: 2,
    zIndex: 2,
  },
  wrapJoinBy: {
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 6,
      height: 1.2,
    },
    shadowOpacity: IS_IOS ? 0.1 : 2,
    shadowRadius: 20.0,
    elevation: 2,
    marginBottom: 8,
  },
  wrapChooseAccount: {
    flexGrow: 0,
    paddingVertical: 8,
    maxHeight: 200,
  },
  touchJoinText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  joinText: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  touchBorder: {
    borderColor: Colors.BORDER2,
    borderBottomWidth: 1,
  },
  buttonBottom: {
    paddingVertical: 16,
  },
  circleShape: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 6,
    borderColor: Colors.Green2,
  },
});
