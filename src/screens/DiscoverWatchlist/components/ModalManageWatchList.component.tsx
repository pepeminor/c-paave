import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import CloseFilter from 'assets/icon/CloseFilter.svg';
import { ACCOUNT_TYPE } from 'global';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { navigate } from 'utils';
import { getStylesHook } from 'hooks/useStyles';

export interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  onPressCreateWatchlist: () => void;
}

const ModalCreateWatchList = (props: IProps) => {
  const selectedAccountType = useSelector((state: IState) => state.selectedAccount.type);
  const dispatch = useDispatch();
  const { isVisible, onCloseModal, onPressCreateWatchlist } = props;

  const { t } = useTranslation();
  const { styles } = useStyles();

  const goToManageWatchList = useCallback(() => {
    onCloseModal();
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(showNonLoginModal());
      return;
    }
    navigate({ key: ScreenNames.ManageWatchlist });
  }, [selectedAccountType]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <View style={styles.modalBackground}>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalTitle}>
              <Text allowFontScaling={false} style={styles.filterText}>
                {t('Manage Watchlist')}
              </Text>
              <TouchableOpacity style={[styles.closeModalTextList]} onPress={onCloseModal}>
                <CloseFilter height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPressCreateWatchlist} style={styles.filterItemContainer}>
              <Text allowFontScaling={false} style={styles.filterTextValue}>
                {t('Create New Watchlist')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToManageWatchList} style={styles.filterItemContainer}>
              <Text allowFontScaling={false} style={styles.filterTextValue}>
                {t('Manage Watchlist')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={onCloseModal} />
          </View>
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
    paddingBottom: 32,
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
    color: Colors.LIGHTTextTitle,
  },
});

export default withMemo(ModalCreateWatchList);
