import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputComponent from 'components/TextInput';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import { WatchListActions } from 'reduxs';
import { IGetAllWatchlistResponse } from 'interfaces/favorite';
import { useFocusEffect } from '@react-navigation/native';
import SquareCheckBox from 'components/SquareCheckBox';
import AddWatchListBlueColor from 'assets/icon/AddWatchListBlueColor.svg';
import config from 'config';
import { onEnterScreen, onLeaveScreen } from './action';
import { ACCOUNT_TYPE } from 'global';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import Modal from 'components/Modal';
import { StackScreenProps } from 'screens/RootNavigation';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { useAppSelector } from 'hooks/useAppSelector';
import withMemo from 'HOC/withMemo';

const AddToWatchlist = (props: StackScreenProps<'AddToWatchlists'>) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();
  const currentSymbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const watchList = useAppSelector(state => state.WatchListReducer);
  const [version] = useState<number>(0); // to clear list when submitForm success
  const [addListModalVisible, setAddListModalVisible] = useState<boolean>(false);
  const [watchListName, setWatchlistName] = useState<string>('');
  const [watchListNameError, setWatchListNameError] = useState<boolean>(false);
  const [watchListNameErrorContent, setWatchListNameErrorContent] = useState<string>('');
  const [deleteSymbolList, setDeleteSymbolList] = useState<number[]>([]);
  const [addSymbolList, setAddSymbolList] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const selectedWatchListList = useRef<number[]>(watchList.watchlistIncludeItem.data);
  const inputRef = React.useRef<TextInput>(null);
  const showKeyboard = () => {
    if (inputRef.current && Platform.OS === 'android') {
      inputRef.current.focus();
    }
  };
  const selectedAccount = useAppSelector(state => state.selectedAccount);

  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    if (selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL) return;
    dispatch(onEnterScreen({}));
  }, [currentSymbolCode]);

  useEffect(() => {
    selectedWatchListList.current = watchList.watchlistIncludeItem.data;
  }, [watchList.watchlistIncludeItem.data]);

  useFocusEffect(() => {
    cleanUp();
  });

  const cleanUp = () => {
    selectedWatchListList.current = [];
    dispatch(onLeaveScreen({}));
  };

  const onPressCreateWatchlist = () => {
    if (selectedAccountType === ACCOUNT_TYPE.DEMO) {
      dispatch(showNonLoginModal());
      return;
    }
    setAddListModalVisible(true);
  };

  const onPressCancelCreateWatchlist = () => {
    setAddListModalVisible(false);
    setWatchListNameError(false);
    setWatchListNameErrorContent('');
    setWatchlistName('');
  };

  const onChangeWatchlistName = (value: string) => {
    setWatchlistName(value);
  };

  const RightElement = () => {
    return (
      <Text style={styles.textLimit}>
        {watchListName.length}/{config.watchlistNameFullLength}
      </Text>
    );
  };

  const onPressConfirmCreateWatchlist = () => {
    if (validateCreateWatchListName(watchListName)) {
      dispatch(
        WatchListActions.onCreateWatchList({
          name: watchListName,
          isSetSelected: true,
        })
      );
      setWatchlistName('');
      setAddListModalVisible(false);
    }
  };

  const validateCreateWatchListName = (value: string): boolean => {
    const findIndexWatchlistName: IGetAllWatchlistResponse | null | undefined =
      watchList.watchListList?.data && watchList.watchListList.data.find(x => x.watchListName === value);
    if (findIndexWatchlistName != null) {
      setWatchListNameError(true);
      setWatchListNameErrorContent('WATCHLIST_NAME_EXIST');
      return false;
    } else {
      setWatchListNameError(false);
      setWatchListNameErrorContent('');
    }
    return true;
  };

  const handleConfirmSymbolAction = () => {
    const isAddSymbol = (addSymbolList != null && addSymbolList.length > 0) || selectedWatchListList.current.length > 0;
    const isDeleteSymbol = deleteSymbolList != null && deleteSymbolList.length > 0;
    setIsAdding(true);
    if ((!isAddSymbol && !isDeleteSymbol) || (addSymbolList?.length === 0 && deleteSymbolList?.length === 0)) {
      goBack();
    } else {
      isAddSymbol &&
        dispatch(
          WatchListActions.onAddSymbol({
            code: [currentSymbolCode],
            watchListId: addSymbolList && addSymbolList.length > 0 ? addSymbolList : selectedWatchListList.current,
            callback: {
              handleSuccess: goBack,
              handleFail: goBack,
            },
          })
        );

      if (isDeleteSymbol) {
        switch (selectedAccount.type) {
          case ACCOUNT_TYPE.VIRTUAL:
            dispatch(
              WatchListActions.onDeleteSymbolMulti({
                code: currentSymbolCode,
                watchListIds: deleteSymbolList,
                callback: {
                  handleSuccess: goBack,
                  handleFail: goBack,
                },
              })
            );
            break;
          case ACCOUNT_TYPE.KIS:
            dispatch(
              WatchListActions.onDeleteSymbolMultiKIS({
                code: currentSymbolCode,
                watchListIds: deleteSymbolList,
              })
            );
            break;
          case ACCOUNT_TYPE.DEMO:
            dispatch(
              WatchListActions.onDeleteSymbolMultiNonLogin({
                code: currentSymbolCode,
                watchListIds: deleteSymbolList,
              })
            );
            goBack();
            break;
          default:
            break;
        }
      }
    }
  };

  const renderListWatchlist = (item: ListRenderItemInfo<IGetAllWatchlistResponse>) => {
    if (item.item.watchListId === -1) return null;
    return (
      <SquareCheckBox
        value={
          // prevent using include symbol in watchlist for KIS
          selectedAccount.type !== ACCOUNT_TYPE.VIRTUAL && selectedAccount.type !== ACCOUNT_TYPE.DEMO
            ? false
            : watchList.watchlistIncludeItem.data.length > 0
            ? watchList.watchlistIncludeItem.data.includes(item.item.watchListId)
            : false
        }
        dataToFire={item.item}
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.alignCenter,
          globalStyles.justifySpaceBetween,
          styles.symbolItemContainer2,
        ]}
        key={item.index}
        iconViewStyle={styles.squareStyle}
        labelViewStyle={styles.label}
        labelViewTextStyle={styles.labelViewTextStyle}
        labelTextStyle={styles.labelTextWatchlist}
        labelTextNumberOfStock={styles.labelTextNumberOfStock}
        label={item.item.watchListName}
        numberOfStock={item.item.numberOfStocks}
        disableSelectIcon={
          item.item.numberOfStocks >= config.maxNumberOfSymbol &&
          !selectedWatchListList.current.includes(item.item.watchListId)
        }
        setDeleteSymbolList={setDeleteSymbolList}
        watchListId={item.item.watchListId}
        deleteSymbolList={deleteSymbolList}
        addSymbolList={addSymbolList}
        setAddSymbolList={setAddSymbolList}
      />
    );
  };

  useEffect(() => {
    if (watchList.watchListList.status !== ReducerStatus.SUCCESS) {
      dispatch(
        WatchListActions.initWatchList({
          screenId: ScreenNames.AddToWatchlists,
          pageSize: config.pageSize,
          watchListListOnly: true,
        })
      );
    }
  }, []);

  return (
    <View style={[globalStyles.container, globalStyles.flexDirectionCol, styles.container]}>
      <HeaderScreen
        leftButtonIcon={props.navigation.canGoBack()}
        goBackAction={props.navigation.canGoBack() ? goBack : undefined}
        headerTitle={'Select Watchlist'}
        // subAccountVisible={true}
        rightButtonListIcon={[
          <TouchableOpacity onPress={handleConfirmSymbolAction} style={styles.btnEnable}>
            {!isAdding && (
              <Text allowFontScaling={false} style={styles.cancelText}>
                {t('Done')}
              </Text>
            )}
            {isAdding && <ActivityIndicator size={'small'} color={Colors.WHITE} />}
          </TouchableOpacity>,
        ]}
      />
      <View style={[globalStyles.container, globalStyles.justifyCenter, styles.container]}>
        <View style={globalStyles.container}>
          {watchList.watchListList.data != null && watchList.watchListList.status === ReducerStatus.SUCCESS && (
            <FlatList
              showsVerticalScrollIndicator={false}
              key={version}
              initialNumToRender={15}
              renderItem={renderListWatchlist}
              data={watchList.watchListList.data}
            />
          )}
        </View>
        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.executeFormContainer]}>
          <View style={[globalStyles.container]}>
            <TouchableOpacity
              onPress={onPressCreateWatchlist}
              style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.executeFormButton2]}
            >
              <AddWatchListBlueColor width={scaleSize(24)} height={scaleSize(24)} />
              <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                {t('Create New Watchlist')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Create Watchlist */}
      <Modal
        visible={addListModalVisible}
        onRequestClose={onPressCancelCreateWatchlist}
        childrenContent={
          <View style={[globalStyles.container, globalStyles.flexDirectionRow, styles.modalWatchlist]}>
            <View style={[globalStyles.justifyCenter, styles.modalCreateWatchListContainer]}>
              <View style={[globalStyles.centered, styles.modalTitleCreateWatchlist]}>
                <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                  {t('Create New Watchlist')}
                </Text>
              </View>
              <View style={styles.modalContent}>
                <View>
                  <TextInputComponent
                    value={watchListName}
                    onChangeText={onChangeWatchlistName}
                    wholeContainerStyle={styles.wholeContainerStyle}
                    labelTextStyle={styles.wlNameText}
                    labelText={'Watchlist Name'}
                    textInputContainerStyle={[
                      globalStyles.flexDirectionRow,
                      globalStyles.alignCenter,
                      styles.textInputContainerStyle,
                    ]}
                    placeholder={'Enter your new watchlist name'}
                    placeholderTextColor={Colors.LIGHTTextDisable}
                    textInputStyle={styles.textInputStyle}
                    maxLength={config.watchlistNameFullLength}
                    iconRight={<RightElement />}
                    autoFocus
                    ref1={inputRef}
                    onLayout={showKeyboard}
                    error={watchListNameError}
                    errorContent={watchListNameErrorContent}
                  />
                </View>
                <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                  <TouchableOpacity
                    onPress={onPressConfirmCreateWatchlist}
                    style={[
                      globalStyles.centered,
                      watchListName ? styles.executeFormButton : styles.executeFormButton2,
                    ]}
                    disabled={watchListName ? false : true}
                  >
                    <Text
                      allowFontScaling={false}
                      style={watchListName ? styles.executeFormButtonText : styles.executeFormButtonTextDisable}
                    >
                      {t('Create')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={globalStyles.fillWidth}>
                  <TouchableOpacity
                    onPress={onPressCancelCreateWatchlist}
                    style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                  >
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
    </View>
  );
};

export default withMemo(AddToWatchlist);
