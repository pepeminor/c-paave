import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  versionUpdateModal: {
    backgroundColor: Colors.BACKGROUND_MODAL2,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  versionUpdateContainer: {
    backgroundColor: Colors.WHITE,
    height: 270,
    width: 375,
  },
  versionUpdateImage: {
    position: 'absolute',
    bottom: 170,
  },
  versionUpdateWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 35,
  },
  versionUpdateBox: {
    height: 28,
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: Colors.BlueNewColor,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  versionUpdateText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  versionUpdateText2: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
    color: Colors.BlueNewColor,
    textAlign: 'left',
    paddingVertical: 8,
  },
  versionUpdateText3: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
  },
  versionUpdateText6: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
    paddingTop: 8,
  },
  versionUpdateText4: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  versionUpdateText5: {
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    color: Colors.LIGHTTextContent,
    textAlign: 'left',
  },
  versionUpdateButton: {
    height: 44,
    width: 343,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paddingTop16: {
    paddingTop: 16,
  },
  marginButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
  paddingTop8: {
    paddingTop: 8,
  },
  wrapContent: {
    flexWrap: 'wrap',
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
