import { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import { EventListener } from 'utils';
import { KeywordConfig } from './types';

const SocialTextInputEventListener = new EventListener();

export const SocialTextInputEventHandler = {
  openModal(position: ViewStyle) {
    SocialTextInputEventListener.propogate('SocialTextInput/onUpdateModalPosition', position);
  },
  useSubscribeOpenModal(callBack: (position: unknown) => void) {
    useEffect(() => {
      const unSubs = SocialTextInputEventListener.subscribe('SocialTextInput/onUpdateModalPosition', callBack);
      return unSubs;
    }, [callBack]);
  },
  updateKeywordConfig(config: KeywordConfig) {
    SocialTextInputEventListener.propogate('SocialTextInput/onUpdateConfig', config);
  },
  useKeywordConfig(callBack: (config: KeywordConfig) => void) {
    useEffect(() => {
      const unSubs = SocialTextInputEventListener.subscribe('SocialTextInput/onUpdateConfig', callBack);
      return unSubs;
    }, [callBack]);
  },
};
