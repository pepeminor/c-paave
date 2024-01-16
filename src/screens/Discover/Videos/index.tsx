import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import News from './Videos.view';
import { ACCOUNT_TYPE } from 'global';
import { VideosActions, VideosSelectors } from 'reduxs';

export const mapStateToProps = (state: IState) => {
  const videosFullList = VideosSelectors.selectedFirst5FullVideos(state);
  const videosShortList = VideosSelectors.selectedFirst5ShortVideos(state);
  const videosEducationList = VideosSelectors.selectedFirst5Education(state);
  const isDemo = state.selectedAccount.type === ACCOUNT_TYPE.DEMO;

  return {
    videosFullList,
    videosShortList,
    videosEducationList,
    isDemo,
  };
};

export const mapDispatchToProps = {
  getVideosListRequest: VideosActions.getVideosListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(News);
