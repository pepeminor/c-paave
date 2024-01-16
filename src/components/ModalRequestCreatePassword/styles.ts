import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  modalBackground2: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerSetting: {
    backgroundColor: Colors.WHITE,
    borderRadius: 21,
    // height: (338),
    width: 343,
  },
  headerModalSetting: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: Colors.BORDER,
    borderBottomWidth: 1,
  },
  headerModalSettingTitle: {
    fontSize: 18,
    color: Colors.BlueNewColor,
    fontWeight: '700',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
  },
  sectionModalSetting: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSection: {
    fontSize: 14,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    textAlign: 'center',
    marginTop: 4,
  },
  executeFormButtonText2: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.WHITE,
  },
  goToSettingButton: {
    marginTop: 17,
    backgroundColor: Colors.BlueNewColor,
    marginHorizontal: 16,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
