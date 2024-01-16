import React from 'react';
import { View } from 'react-native';
import { useNotificationGroupLogic } from './NotificationGroup.logic';
import { IProps } from './NotificationGroup.type';
import withMemo from 'HOC/withMemo';
import ToggleRow from '../ToggleRow';

const NotificationGroup = (props: IProps) => {
  const { handlers } = useNotificationGroupLogic(props);

  return (
    <View>
      <ToggleRow
        value={props.isHasNotification && props.settingNotificationGroup.aiRating}
        onValueChanged={handlers.onChangeAIRatingSwitch}
        title={'notification_top_5_ai_rating.title'}
        description={'notification_top_5_ai_rating.description'}
      />
      <ToggleRow
        value={props.isHasNotification && props.settingNotificationGroup.theme}
        onValueChanged={handlers.onChangeThemeSwitch}
        title={'notification_theme.title'}
        description={'notification_theme.description'}
      />
      <ToggleRow
        value={props.isHasNotification && props.settingNotificationGroup.vnindexReturns}
        onValueChanged={handlers.onChangeVNIndexStockReturnSwitch}
        title={'notification_vnindex_stock_return.title'}
        description={'notification_vnindex_stock_return.description'}
      />
      <ToggleRow
        value={props.isHasNotification && props.settingNotificationGroup.pinnedNews}
        onValueChanged={handlers.onChangePinnedNewsSwitch}
        title={'notification_pinned_news.title'}
        description={'notification_pinned_news.description'}
      />
    </View>
  );
};

export default withMemo(NotificationGroup);
