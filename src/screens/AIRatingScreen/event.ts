import { useEffect } from 'react';
import { EventListener } from 'utils';

const AIRatingEventListener = new EventListener();

export const SurveyModalEventHandler = {
  openSurveyModal() {
    AIRatingEventListener.propogate('AIRating/OpenSurveyModal');
  },
  useSubscribeOpenSurveyModal(callBack: () => void) {
    useEffect(() => {
      const unSubs = AIRatingEventListener.subscribe('AIRating/OpenSurveyModal', callBack);
      return unSubs;
    }, []);
  },
};
