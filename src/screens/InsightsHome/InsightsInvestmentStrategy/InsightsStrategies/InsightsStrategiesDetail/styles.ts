import { lightColors as Colors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';

export default getStylesHook({
  container: {
    backgroundColor: Colors.LIGHTBackground,
  },

  /* INTRO CONTAINER 1 */
  introContainer: {
    backgroundColor: Colors.WHITE,
  },
  introDesContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  introDesText: {
    fontSize: 14,
  },
  btnFollow: {
    backgroundColor: Colors.BlueNewColor,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  btnFollowed: {
    backgroundColor: Colors.LIGHTBGTab,
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonTextFollow: {
    fontSize: 14,
    marginLeft: 10,
    color: Colors.WHITE,
  },
  buttonTextFollowed: {
    fontSize: 14,
    marginLeft: 10,
    color: Colors.LIGHTTextTitle,
  },
  TabContainer: {
    height: 296,
  },

  /* OVERVIEW */
  overviewContainer: {
    backgroundColor: Colors.WHITE,
    marginTop: 8,
  },

  overviewTitleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  overviewTitleText: {
    fontSize: 18,
    fontWeight: '700',
  },

  overviewContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.LIGHTBackground,
  },
  overviewRatioContainer: {
    width: 140,
  },
  ratioIconContainer: {
    width: 24,
    height: 24,
  },
  ratioTextContainer: {
    width: 60,
    marginLeft: 10,
  },
  overviewContentLabelText: {
    fontSize: 14,
  },
  overviewContentRatioText: {
    fontSize: 16,
  },
  redText: {
    color: Colors.LIGHTRed,
  },
  grenText: {
    color: Colors.DARK_GREEN,
  },
  borderTop: {
    borderTopWidth: 1,
  },

  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonViewDetail: {
    paddingVertical: 11,
    backgroundColor: Colors.LIGHTBackground,
    borderRadius: 10,
  },
  buttonViewDetailText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.BlueNewColor,
  },
});
