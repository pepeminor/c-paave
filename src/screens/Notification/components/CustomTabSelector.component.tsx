import React, { memo } from 'react';
import TabSelector from 'components/TabSelector';
import { lightColors } from 'styles';
import { getStylesHook } from 'hooks/useStyles';
import { NotificationTab } from 'reduxs';
import { useAppSelector } from 'hooks';

type Props = {
  onChangeTab: (tab: NotificationTab) => void;
};

export const CustomTabSelector = memo(({ onChangeTab }: Props) => {
  const { styles } = useStyles();

  const tab = useAppSelector(state => state.Notification.tab);

  return (
    <TabSelector
      type="UNDERLINE"
      value={tab}
      setValue={onChangeTab}
      listValue={NotificationTab}
      selectedContainer={styles.selectedContainer}
      unSelectedContainer={styles.unSelectedContainer}
      unSelectedText={styles.unSelectedText}
    />
  );
});

const useStyles = getStylesHook({
  selectedContainer: {
    marginHorizontal: 0,
  },
  unSelectedContainer: {
    flex: 0,
    marginHorizontal: 0,
    paddingHorizontal: 16,
  },
  unSelectedText: {
    color: lightColors.LIGHTTextTitle,
  },
});
