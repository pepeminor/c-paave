import React, { memo, useRef, useState } from 'react';
import { Modal, Platform, Text, TouchableOpacity, UIManager, View, Animated } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ComputerMac from 'assets/icon/Computer-Mac.svg';
import ComputerWin from 'assets/icon/Computer-Windows.svg';
import MobileAndroid from 'assets/icon/Mobile-Android.svg';
import MobileIphone from 'assets/icon/Mobile-Iphone.svg';
import Trash from 'assets/icon/Trash.svg';
import TextInputComponent from 'components/TextInput';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import useStyles from './styles';
import { isBlank } from 'utils';

import { useDispatch } from 'react-redux';
import { IModifyWatchlistResponse, IDeleteWatchlistResponse, IDevices } from 'interfaces/favorite';
import HeaderScreen from 'components/HeaderScreen';
import { WatchListActions } from 'reduxs';

const watchListDefault: IDevices[] = [
  {
    deviceId: 1,
    deviceName: 'Safari - Macbook',
    isThisDevice: true,
    icon: <ComputerMac height={scaleSize(36)} width={scaleSize(36)} />,
    time: 'Oct 16, 2021 23:07',
    isLogin: true,
  },
  {
    deviceId: 2,
    deviceName: 'Chrome - Samsung Mobile',
    isThisDevice: false,
    icon: <MobileAndroid height={scaleSize(36)} width={scaleSize(36)} />,
    time: 'Oct 16, 2021 23:07',
    isLogin: true,
  },
  {
    deviceId: 3,
    deviceName: 'Chrome - PC',
    isThisDevice: false,
    icon: <ComputerWin height={scaleSize(36)} width={scaleSize(36)} />,
    time: 'Oct 16, 2021 23:07',
    isLogin: false,
  },
  {
    deviceId: 4,
    deviceName: 'Safari - iOS',
    isThisDevice: false,
    icon: <MobileIphone height={scaleSize(36)} width={scaleSize(36)} />,
    time: 'Oct 16, 2021 23:07',
    isLogin: false,
  },
  {
    deviceId: 5,
    deviceName: 'Safari - iOS',
    isThisDevice: false,
    icon: <MobileIphone height={scaleSize(36)} width={scaleSize(36)} />,
    time: 'Oct 16, 2021 23:07',
    isLogin: false,
  },
];

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Devices = (props: StackScreenProps<'Devices'>) => {
  const [watchList, setWatchList] = useState(watchListDefault);
  const [infoDelete, setInfoDelete] = useState<null | IDevices | IDeleteWatchlistResponse>(null);
  const [infoEdit, setInfoEdit] = useState<null | IDevices | IModifyWatchlistResponse>(null);
  const [watchListId, setWatchListId] = useState(Number);
  const [watchListName, setWatchlistName] = useState('');
  const [watchlistNameError, setWatchlistNameError] = useState(false);
  const [watchlistNameErrorContent, setWatchlistNameErrorContent] = useState('');
  const itemRefs = useRef(new Map());
  const [logOut, setLogOut] = useState<number[]>([]);
  const [loggedOut] = useState<number[]>([]);

  const dispatch = useDispatch();

  const { styles } = useStyles();

  const confirmLogout = (deviceId: number) => {
    setLogOut([...logOut, deviceId]);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onCloseSwiping = (closeCurrent: boolean, itemToCompare?: IDevices) => {
    if (closeCurrent === false) {
      [...itemRefs.current.entries()].forEach(([key, ref]) => {
        if (key !== itemToCompare?.deviceId && ref) ref.close();
      });
    } else {
      [...itemRefs.current.entries()].forEach(([_key, ref]) => {
        if (ref) ref.close();
      });
    }
  };

  const onOpenDeleteModal = (_item: IDevices | IDeleteWatchlistResponse) => {
    // setInfoDelete(item);
  };

  const validateWatchlistName = (value: string) => {
    if (isBlank(value)) {
      setWatchlistNameError(true);
      setWatchlistNameErrorContent('Watchlist name cannot be blank');
      return false;
    } else {
      setWatchlistNameError(false);
      setWatchlistNameErrorContent('');
    }
    return true;
  };

  const onChangeWatchlistName = (value: string) => {
    validateWatchlistName(value);
    setWatchlistName(value);
    setWatchListId(Number);
  };

  const submitEdit = (item: IModifyWatchlistResponse) => {
    if (validateWatchlistName(watchListName)) {
      dispatch(
        WatchListActions.onModifyWatchList({
          watchListId: watchListId,
          watchListName: watchListName,
        })
      );
    }
    setInfoEdit(item);
  };

  const rightSwipe = (
    _progress: Animated.AnimatedInterpolation,
    _dragX: Animated.AnimatedInterpolation,
    item: IDevices
  ) => {
    // const scale = dragX.interpolate({
    //   inputRange: [0, 100],
    //   outputRange: [0, 1],
    //   extrapolate: 'clamp',
    // });
    return (
      // <TouchableOpacity activeOpacity={0.6}>
      //   <View>
      //     <Animated.Text style={{ transform: [{ scale: scale }] }}>Delete</Animated.Text>
      //   </View>
      // </TouchableOpacity>
      <View style={[globalStyles.flexDirectionRow]}>
        <TouchableOpacity
          style={[globalStyles.centered, globalStyles.flexDirectionRow, styles.deleteContainer]}
          onPress={() => onOpenDeleteModal(item)}
        >
          <Trash height={scaleSize(24)} width={scaleSize(24)} />
          <Text style={styles.deleteDeviceText}>Delete device</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({
    item,
  }: // index, drag, isActive
  RenderItemParams<IDevices>) => {
    return (
      <ScaleDecorator>
        {/* <SwipeableItem
          key={item.id}  
          item={item}
          ref={ref => {
            if (ref && !itemRefs.current.get(item.id)) {
              itemRefs.current.set(item.id, ref);
            }
          }}
          onChange={({ open }) => {
            if (open) {
              // Close all other open items
              onCloseSwiping(false, item);
            }
          }}
          overSwipe={OVERSWIPE_DIST}
          renderUnderlayLeft={() => (
            <Animated.View style={[globalStyles.flexDirectionRow, globalStyles.container, styles.UnderlayLeft]}>
              <TouchableOpacity
                style={[globalStyles.centered, styles.editContainer]}
                onPress={() => onOpenEditModal(item)}
              >
                <Edit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.centered, styles.deleteContainer]}
                onPress={() => onOpenDeleteModal(item)}
              >
                <Trash height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </Animated.View>
          )}
          snapPointsLeft={[scaleSize(130)]}
        > */}
        <Swipeable
          key={item.deviceId}
          // // item={item}
          // ref={ref => {
          //   if (ref && !itemRefs.current.get(item.deviceId)) {
          //     itemRefs.current.set(item.deviceId, ref);
          //   }
          // }}

          renderRightActions={(progressAnimatedValue, dragAnimatedValue) =>
            rightSwipe(progressAnimatedValue, dragAnimatedValue, item)
          }
          onSwipeableRightWillOpen={() => onCloseSwiping(false)}
          // onChange={({ open }) => {
          //   if (open) {
          //     // Close all other open items
          //     onCloseSwiping(false, item);
          //   }
          // }}
          // overSwipe={OVERSWIPE_DIST}
          // renderUnderlayLeft={() => (
          //   <Animated.View style={[globalStyles.flexDirectionRow, globalStyles.container, styles.UnderlayLeft]}>
          //     <TouchableOpacity
          //       style={[globalStyles.centered, styles.editContainer]}
          //       onPress={() => onOpenEditModal(item)}
          //     >
          //       <Edit height={hp(`${getPercentHeight(24)}%`)} width={wp(`${getPercentWidth(24)}%`)} />
          //     </TouchableOpacity>
          //     <TouchableOpacity
          //       style={[globalStyles.centered, styles.deleteContainer]}
          //       onPress={() => onOpenDeleteModal(item)}
          //     >
          //       <Trash height={hp(`${getPercentHeight(24)}%`)} width={wp(`${getPercentWidth(24)}%`)} />
          //     </TouchableOpacity>
          //   </Animated.View>
          // )}
          // snapPointsLeft={[wp(`${getPercentWidth(130)}%`)]}
        >
          <View
            style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.watchListItemConatainer]}
            // onPress={() => {
            //   [...itemRefs.current.entries()].forEach(([key, ref]) => {
            //     if (ref) ref.close();
            //   });
            // }}
            // disabled={isActive}
            // style={[styles.rowItem, { backgroundColor: isActive ? 'red' : item.backgroundColor }]}
          >
            {item.icon}
            <View style={[globalStyles.container, styles.deviceInfo]}>
              <Text style={[styles.deviceNameText]}>{item.deviceName}</Text>
              <View style={[globalStyles.flexDirectionRow]}>
                {item.isThisDevice === true && <Text style={styles.thisDeviceText}>Thiết bị này -</Text>}
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>

            {!logOut.includes(item.deviceId) && (
              <>
                <TouchableOpacity
                  onPress={() => confirmLogout(item.deviceId)}
                  style={[globalStyles.centered, styles.logoutButton]}
                >
                  <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
              </>
            )}
            {logOut.includes(item.deviceId) && !loggedOut.includes(item.deviceId) && (
              <View style={[globalStyles.centered, styles.loggedoutButton]}>
                <Text style={styles.loggedoutButtonText}>logged out</Text>
              </View>
            )}
          </View>
          {/* </SwipeableItem> */}
        </Swipeable>
      </ScaleDecorator>
    );
  };

  const handleCloseModal = () => {
    if (infoDelete != null) {
      setInfoDelete(null);
    } else {
      setInfoEdit(null);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Devices'} />
      <DraggableFlatList
        data={watchList}
        onDragEnd={({ data }) => setWatchList(data)}
        keyExtractor={item => `${item.deviceId}`}
        renderItem={renderItem}
        onScrollBeginDrag={() => onCloseSwiping(true)}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoDelete != null || infoEdit != null}
        onRequestClose={handleCloseModal}
      >
        <View
          style={[globalStyles.container, globalStyles.centered, globalStyles.flexDirectionRow, styles.modalBackground]}
        >
          <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
            <View style={[globalStyles.centered, styles.modalTitle]}>
              <Text allowFontScaling={false} style={[styles.modalTitleText]}>
                {infoDelete != null ? 'Delete Watchlist' : 'Edit Watchlist'}
              </Text>
            </View>
            <View style={styles.modalContent}>
              {infoDelete != null && (
                <Text allowFontScaling={false} style={styles.doText2}>
                  Do you want delete
                </Text>
              )}
              {infoDelete != null ? (
                <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText22}>
                  Do you want delete
                </Text>
              ) : (
                <TextInputComponent
                  value={watchListName}
                  onChangeText={onChangeWatchlistName}
                  wholeContainerStyle={styles.wholeContainerStyle}
                  labelTextStyle={styles.doText2}
                  labelText={'New Watchlist name'}
                  textInputContainerStyle={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    watchlistNameError === false ? styles.textInputContainerStyle : styles.textInputContainerStyleError,
                  ]}
                  placeholder={'Enter your new watchlist name'}
                  placeholderTextColor={Colors.LIGHTTextDisable}
                  textInputStyle={[globalStyles.fillHeight, styles.textInputStyle]}
                  error={watchlistNameError}
                  errorContent={watchlistNameErrorContent}
                />
              )}
              <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                <TouchableOpacity
                  onPress={() => {
                    if (infoDelete != null) {
                      // submitDelete(infoDelete);
                    } else {
                      submitEdit(infoEdit as IModifyWatchlistResponse);
                    }
                  }}
                  style={[globalStyles.centered, styles.executeFormButton2]}
                >
                  <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                    {infoDelete != null ? 'Confirm' : 'Save'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[globalStyles.fillWidth]}>
                <TouchableOpacity
                  onPress={handleCloseModal}
                  style={[globalStyles.centered, styles.cancelExecuteFormButton2]}
                >
                  <Text allowFontScaling={false} style={styles.cancelExecuteFormButtonText2}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default memo(Devices);
