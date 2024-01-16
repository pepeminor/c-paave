import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import News from './Videos.view';
import { ACCOUNT_TYPE } from 'global';
import { VideosActions, VideosSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => {
  const videosList = VideosSelectors.selectedFullVideos(state);
  const videosShortList = VideosSelectors.selectedShortVideos(state);
  const videosEducationList = VideosSelectors.selectedEducationVideos(state);
  const isDemo = state.selectedAccount.type === ACCOUNT_TYPE.DEMO;

  return {
    videosList,
    videosShortList,
    videosEducationList,
    isDemo,
  };
};

export const mapDispatchToProps = {
  getVideosListRequest: VideosActions.getVideosListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
