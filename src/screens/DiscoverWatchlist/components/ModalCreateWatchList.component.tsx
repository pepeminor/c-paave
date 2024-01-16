import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';
import withMemo from 'HOC/withMemo';
import Modal from 'components/Modal';
import { useTranslation } from 'react-i18next';
import globalStyles, { lightColors as Colors } from 'styles';
import TextInputComponent from 'components/TextInput';
import config from 'config';
import useMergingState from 'hooks/useMergingState';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import { getStylesHook } from 'hooks/useStyles';
import { WatchListActions } from 'reduxs';

export interface IProps {
  isVisible: boolean;
  onCloseModal: () => void;
  isEdit?: boolean;
  watchListName?: string;
  watchListId?: number;
}

const ModalCreateWatchList = (props: IProps) => {
  const watchListList = useSelector((state: IState) => state.WatchListReducer.watchListList);
  const { isVisible, onCloseModal, isEdit = false, watchListName = '', watchListId } = props;
  const [state, setState] = useMergingState({
    watchListName: watchListName,
    watchListNameError: false,
    watchListNameErrorContent: '',
  });

  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current && Platform.OS === 'ios') {
      inputRef.current.focus();
    }
  }, [isVisible]);

  const showKeyboard = useCallback(() => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  }, []);

  const onChangeText = useCallback((value: string) => {
    setState({
      watchListName: value,
    });
  }, []);

  const onPressConfirmCreateWatchlist = useCallback(() => {
    const isValidWatchName = validateCreateWatchListName(state.watchListName);

    if (isEdit) {
      if (state.watchListName === watchListName) {
        onCloseModal();
      } else if (isValidWatchName) {
        watchListId != null &&
          dispatch(
            WatchListActions.onModifyWatchList({
              watchListId,
              watchListName: state.watchListName,
            })
          );
        onCloseModal();
      }

      return;
    }

    if (isValidWatchName) {
      dispatch(
        WatchListActions.onCreateWatchList({
          name: state.watchListName,
          isSetSelected: true,
        })
      );
      onCloseModal();
    }
  }, [state.watchListName]);

  const validateCreateWatchListName = useCallback((value: string): boolean => {
    const findIndexWatchlistName: IGetAllWatchlistResponse | null | undefined =
      watchListList?.data && watchListList.data.find(x => x.watchListName === value);
    if (findIndexWatchlistName != null) {
      setState({
        watchListNameErrorContent: 'WATCHLIST_NAME_EXIST',
        watchListNameError: true,
      });
      return false;
    }

    setState({
      watchListNameErrorContent: '',
      watchListNameError: false,
    });

    return true;
  }, []);

  const RightElement = useCallback(() => {
    return (
      <Text style={styles.textLimit}>
        {state.watchListName.length}/{config.watchlistNameFullLength}
      </Text>
    );
  }, [state.watchListName]);

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onCloseModal}
      childrenContent={
        <View style={styles.modalWatchList}>
          <View style={styles.modalCreateWatchListContainer}>
            <View style={styles.modalTitleCreateWatchList}>
              <Text allowFontScaling={false} style={styles.modalTitleText}>
                {t(isEdit ? 'Edit Watchlist' : 'Create New Watchlist')}
              </Text>
            </View>
            <View style={styles.modalContent}>
              <TextInputComponent
                value={state.watchListName}
                onChangeText={onChangeText}
                wholeContainerStyle={styles.wholeContainerStyle}
                labelTextStyle={styles.wlNameText}
                labelText={'Watchlist Name'}
                textInputContainerStyle={styles.textInputContainerStyle}
                placeholder={'Enter your new watchlist name'}
                placeholderTextColor={Colors.LIGHTTextDisable}
                textInputStyle={styles.textInputStyle}
                maxLength={config.watchlistNameFullLength}
                iconRight={RightElement}
                autoFocus
                ref1={inputRef}
                onLayout={showKeyboard}
                error={state.watchListNameError}
                errorContent={state.watchListNameErrorContent}
              />
              <View style={styles.marginBottom}>
                <TouchableOpacity
                  onPress={onPressConfirmCreateWatchlist}
                  style={state.watchListName ? styles.executeFormButton : styles.executeFormButton2}
                  disabled={state.watchListName ? false : true}
                >
                  <Text
                    allowFontScaling={false}
                    style={state.watchListName ? styles.executeFormButtonText : styles.executeFormButtonTextDisable}
                  >
                    {t(isEdit ? 'Edit' : 'Create')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.fillWidth]}>
                <TouchableOpacity onPress={onCloseModal} style={styles.cancelExecuteFormButton2}>
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                    {t('Cancel')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
};

const useStyles = getStylesHook({
  modalWatchList: {
    ...globalStyles.container,
    ...globalStyles.flexDirectionRow,
    paddingHorizontal: 16,
    backgroundColor: Colors.BACKGROUND_MODAL2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCreateWatchListContainer: {
    ...globalStyles.justifyCenter,
    backgroundColor: Colors.WHITE,
    height: 267,
    borderRadius: 21,
    width: 343,
  },
  modalTitleCreateWatchList: {
    ...globalStyles.centered,
    height: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER,
  },
  modalTitleText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: 'bold',
    color: Colors.BlueNewColor,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  modalContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  wholeContainerStyle: {
    marginBottom: 17,
  },
  wlNameText: {
    color: Colors.LIGHTTextTitle,
    marginBottom: 5,
    fontSize: 14,
  },
  textInputContainerStyle: {
    ...globalStyles.flexDirectionRow,
    ...globalStyles.alignCenter,
    backgroundColor: Colors.LIGHTTitleTable,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDF0F4',
    paddingHorizontal: 10,
  },
  textInputStyle: {
    height: 44,
    width: 260,
    fontSize: 14,
  },
  marginBottom: {
    ...globalStyles.fillWidth,
    marginBottom: 10,
  },
  executeFormButton: {
    ...globalStyles.centered,
    backgroundColor: Colors.BlueNewColor,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButton2: {
    ...globalStyles.centered,
    backgroundColor: Colors.LIGHTBackground,
    width: '100%',
    height: 44,
    borderRadius: 10,
  },
  executeFormButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginLeft: 10,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  executeFormButtonTextDisable: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.LIGHTTextDisable,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  cancelExecuteFormButton2: {
    ...globalStyles.centered,
    backgroundColor: Colors.LIGHTBackground,
    height: 44,
    borderRadius: 10,
  },
  cancelExecuteFormButtonText2: {
    fontSize: 16,
    color: Colors.LIGHTTextContent,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
  textLimit: {
    color: Colors.LIGHTTextDisable,
    fontSize: 12,
    lineHeight: 16,
    marginRight: -8,
    fontWeight: '400',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
  },
});

export default withMemo(ModalCreateWatchList);
