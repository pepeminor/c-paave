import React from 'react';
import { View, Text } from 'react-native';
import { useWatchListHeaderLogic } from './WatchListHeader.logic';
import useStyles from './WatchListHeader.style';
import { IProps } from './WatchListHeader.type';
import withMemo from 'HOC/withMemo';
import TouchableScale from 'components/TouchableScale';
import TextFieldList from 'components/TextFieldList';
import ManageWatchlist from 'assets/icon/ManageWatchlist.svg';
import { useTranslation } from 'react-i18next';
import globalStyles, { scaleSize } from 'styles';
import { HitSlop } from 'constants/enum';
import Icon from 'components/Icon';

const WatchListHeader = (props: IProps) => {
  const { handlers, modals, state } = useWatchListHeaderLogic(props);
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const { ModalManageWatchList, ModalCreateWatchList, ModalWatchListList } = modals;
  const { accessToken, showButtonMore = false } = props;

  const isWatchList = props.selectedWatchList.watchListId !== -1;

  return (
    <View style={styles.watchListOptionPicker}>
      <Text allowFontScaling={false} style={styles.watchListText}>
        {t('Watchlist')}
      </Text>

      <TextFieldList
        input={isWatchList ? props.selectedWatchList?.watchListName ?? '' : t('my_portfolio')}
        onChange={handlers.openModalTextList}
        containerStyle={styles.watchListTextField}
      />

      <TouchableScale onPress={handlers.openModalManageWatchList} style={styles.arrowIconContainer}>
        <ManageWatchlist width={scaleSize(24)} height={scaleSize(24)} />
      </TouchableScale>

      {showButtonMore && (
        <TouchableScale
          onPress={handlers.goToDiscoverWatchlist}
          style={[!accessToken && globalStyles.disableBackground, styles.arrowIconContainer]}
          disabled={!accessToken ? true : false}
          hitSlop={HitSlop}
        >
          <Icon name={'arrow-right-double'} color={dynamicColors.BlueNewColor} size={16} />
        </TouchableScale>
      )}

      {ModalManageWatchList.current && (
        <ModalManageWatchList.current
          isVisible={state.manageWatchlistVisible}
          onCloseModal={handlers.onCloseManageWatchList}
          onPressCreateWatchlist={handlers.onCreateWatchList}
        />
      )}

      {ModalCreateWatchList.current && (
        <ModalCreateWatchList.current
          isVisible={state.addListModalVisible}
          onCloseModal={handlers.onPressCancelCreateWatchList}
        />
      )}

      {ModalWatchListList.current && (
        <ModalWatchListList.current isVisible={state.textTypeModalVisible} onCloseModal={handlers.closeModalTextList} />
      )}
    </View>
  );
};

export default withMemo(WatchListHeader);
