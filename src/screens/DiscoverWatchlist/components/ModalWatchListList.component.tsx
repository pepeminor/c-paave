import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform, FlatList, ListRenderItemInfo } from 'react-native';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import StickIcon from 'assets/icon/StickIcon.svg';
import config from 'config';
import { getStylesHook } from 'hooks/useStyles';
import { WatchListActions } from 'reduxs';

export interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  onResetPagination?: () => void;
}

const ModalCreateWatchList = (props: IProps) => {
  const watchListList = useSelector((state: IState) => state.WatchListReducer.watchListList);
  const selectedWatchList = useSelector((state: IState) => state.WatchListReducer.selectedWatchList);
  const dispatch = useDispatch();
  const { isVisible, onCloseModal, onResetPagination } = props;

  const { t } = useTranslation();
  const { styles } = useStyles();

  const handleCurrentWatchList = useCallback(
    (item: IGetAllWatchlistResponse) => () => {
      dispatch(
        WatchListActions.onChangeSelectedWatchList({
          selectedWatchList: item,
          getAllSymbolFavorite: { pageSize: config.pageSize },
        })
      );
      // reset local pagination
      onResetPagination?.();

      onCloseModal();
    },
    []
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<IGetAllWatchlistResponse>) => {
      return (
        <TouchableOpacity key={index} onPress={handleCurrentWatchList(item)} style={styles.filterItemContainer}>
          <Text
            allowFontScaling={false}
            style={[
              styles.filterTextValue,
              item.watchListId === selectedWatchList?.watchListId
                ? styles.filterTextValueSelected
                : styles.filterTextValueUnselected,
            ]}
          >
            {item.watchListId === -1 ? t('my_portfolio') : item.watchListName}
          </Text>
          {item.watchListId === selectedWatchList?.watchListId && <StickIcon />}
        </TouchableOpacity>
      );
    },
    [selectedWatchList]
  );

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <View style={[styles.modalBackground]}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('Watchlist List')}
              </Text>
              <TouchableOpacity style={styles.closeModalTextList} onPress={onCloseModal}>
                <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            {watchListList.data != null && (
              <FlatList
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                data={watchListList.data}
                initialNumToRender={10}
              />
            )}
          </View>
          <TouchableOpacity style={globalStyles.invisibleBackground} onPress={onCloseModal} />
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  modalBackground: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND_MODAL2,
  },
  modalContentContainer: {
    ...globalStyles.justifyEnd,
    backgroundColor: Colors.WHITE,
    borderTopStartRadius: 21,
    borderTopEndRadius: 21,
    width: 375,
    marginTop: Platform.OS === 'ios' ? 80 : 60,
  },
  modalTitle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    height: 56,
    marginTop: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterText: {
    ...globalStyles.container,
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22,
    color: Colors.BlueNewColor,
    marginLeft: 16,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  closeModalTextList: {
    marginRight: 16,
  },
  filterItemContainer: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    paddingHorizontal: 16,
    height: 54,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  filterTextValue: {
    ...globalStyles.container,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  filterTextValueSelected: {
    color: Colors.BlueNewColor,
  },
  filterTextValueUnselected: {
    color: Colors.LIGHTTextContent,
  },
});

export default withMemo(ModalCreateWatchList);
