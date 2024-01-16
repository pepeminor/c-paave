import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native';
import useStyles from './styles';
import SearchComponent from 'screens/SearchSymbolAndMember/SearchComponent';
import { useDispatch } from 'react-redux';
import { StackScreenProps } from 'screens/RootNavigation';
import Heart from 'assets/icon/Heart.svg';
import NoHeart from 'assets/icon/NoHeart.svg';
import globalStyles, { lightColors as Colors, scaleSize } from 'styles';
import { navigate, isBlank, navigateToSymbolInfoOverview } from 'utils';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import AddWatchListBlueColor from 'assets/icon/AddWatchListBlueColor.svg';
import CalendarIcon from 'assets/icon/Calendar.svg';
import TextInputComponent from 'components/TextInput';
import ImagesLogo from 'components/ImagesLogo';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useTranslation } from 'react-i18next';
import Modal from 'components/Modal';
import { MarketStock, MarketSymbol } from 'reduxs/SymbolData';
import { useTypedSelector } from 'hooks/useAppSelector';

type IFakeArticlesDataType = {
  Title: string;
  DateTime: string;
};

const fakeArticlesBank: IFakeArticlesDataType[] = [
  {
    Title: '"Tố" HSX yếu kém, VAFI vạch trần hàng loạt góc khuất',
    DateTime: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    Title: 'Sacombank muốn bán hơn 81 triệu cổ phiếu quỹ khi giá tăng "nóng"',
    DateTime: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    Title: 'Giá vàng lao dốc, dồn dập mua vào',
    DateTime: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    Title: 'Nhân viên ngân hàng nào thu nhập "khủng" nhất Việt Nam?',
    DateTime: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    Title: 'Nữ chủ tịch xinh đẹp bước vào HĐQT Kienlongbank như thế nào?',
    DateTime: 'Thứ Ba 04/05/2021 - 12:06',
  },
];

type IFakeWatchListType = {
  name: string;
  symbolList: {
    stockCode: string;
    companyName: string;
    price1: string;
    rate1: number;
    price2: string;
  }[];
};

const SearchBlogs = (props: StackScreenProps<'SearchBlogs'>) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const stockList = useTypedSelector(state => state.SymbolData.marketData.stockList);
  const [searchArticlesText, setSearchArticlesText] = useState(fakeArticlesBank);
  // const [searchArticles, setSearchArticles] = useState('');
  const [masterData] = useState(fakeArticlesBank);
  // const [selectedArticles, setSelectedArticles] = useState<IFakeArticlesDataType>();
  const [searchText, setSearchText] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const [symbolListRender, setSymbolListRender] = useState<MarketStock[]>(stockList);
  const [heartModalVisible, setHeartModalVisible] = React.useState(false);
  const [liked, setLiked] = useState([-1]);
  const [checkBox, setCheckBox] = useState([-1]);
  const [watchlist, setWatchlist] = useState<IFakeWatchListType[]>([{ name: 'My Watchlist', symbolList: [] }]);
  const [addListModalVisible, setAddListModalVisible] = useState<boolean>(false);
  const [watchListName, setWatchlistName] = useState<string>('');
  const [watchlistNameError, setWatchlistNameError] = useState<boolean>(false);
  const [watchlistNameErrorContent, setWatchlistNameErrorContent] = useState<string>('');

  const onPressCancelCreateWatchlist = () => {
    setWatchlistNameError(false);
    setWatchlistNameErrorContent('');
    setAddListModalVisible(false);
  };

  const onPressConfirmCreateWatchlist = () => {
    if (validateWatchlistName(watchListName)) {
      setWatchlist([...watchlist, { name: watchListName, symbolList: [] }]);
      setAddListModalVisible(false);
      setHeartModalVisible(true);
    }
  };

  const validateWatchlistName = (value: string) => {
    if (isBlank(value)) {
      setWatchlistNameError(true);
      setWatchlistNameErrorContent('Name cannot be blank');
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
  };

  const onSelectedArticles = (_item: IFakeArticlesDataType) => {
    // setSelectedArticles(item);
    navigate({ key: 'BlogItem' });
  };

  const onPressCreateWatchlist = () => {
    setHeartModalVisible(false);
    setAddListModalVisible(true);
  };

  React.useEffect(() => {
    setSymbolListRender(stockList.filter(item => item.symbolCode.includes(searchText.toUpperCase())));
  }, [searchText]);

  const handleSymbolItem = (item: MarketSymbol) => {
    navigateToSymbolInfoOverview(item.symbolCode, dispatch);
  };

  const handleVisibleModal = () => {
    setIsSelected(pre => !pre);
  };

  const onChangeSearchValue = (value: string) => {
    setSearchText(value);
    searchFilterArticles(value);
  };

  // const openHeartModal = () => {
  //   setHeartModalVisible(true);
  // };

  // const handleSearchArticles = () => {
  //   Keyboard.dismiss();
  // };

  const closeModal = () => {
    setHeartModalVisible(false);
  };
  const submitForm = () => {
    setHeartModalVisible(false);
    props.navigation.navigate(ScreenNames.DiscoverWatchlist);
  };

  const searchFilterArticles = (text: string) => {
    if (text) {
      const newData = searchArticlesText.filter(item => {
        const itemData = item.Title ? item.Title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSearchArticlesText(newData);
      // setSearchArticles(text);
    } else {
      setSearchArticlesText(masterData);
      // setSearchArticles(text);
    }
  };

  const renderItemSearch = ({ item, index }: ListRenderItemInfo<IFakeArticlesDataType>) => {
    return (
      <TouchableOpacity key={index} onPress={() => onSelectedArticles(item)} style={[styles.rowData]}>
        <Text allowFontScaling={false} style={[styles.rowDataTextBranch]}>
          {item.Title}
        </Text>
        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blogUserUpdateContainer]}>
          <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
          <Text style={[styles.rowDataTextAdd]}>{item.DateTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const ItemSeparatorView = () => {
    return <View style={[styles.SeparatorContainer]} />;
  };

  const renderSymbolSearchItem = ({ item, index }: ListRenderItemInfo<MarketSymbol>) => {
    return (
      <TouchableOpacity
        style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.symbolItemContainer]}
        key={index}
        onPress={() => handleSymbolItem(item)}
      >
        <ImagesLogo
          codeLogo={item.symbolCode}
          logoSize={34}
          logoStyle={[globalStyles.overflowHidden, styles.logoContainer]}
        />

        <View style={[globalStyles.container, styles.nameContainer]}>
          <Text allowFontScaling={false} style={styles.stockCodeText}>
            {item.symbolCode}
          </Text>
          <Text allowFontScaling={false} style={styles.fullNameText}>
            {item.vietnameseName}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (liked.includes(index)) {
              const unlike = liked.filter(elem => elem !== index);
              setLiked(unlike);
            } else {
              setLiked([...liked, index]);
            }
          }}
        >
          {liked.includes(index) ? (
            <Heart width={scaleSize(20)} height={scaleSize(19)} />
          ) : (
            <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <>
      <SearchComponent
        placeholder={'Search'}
        searchText={searchText}
        goBack={goBack}
        onChangeSearchValue={onChangeSearchValue}
        // goOpenHeart={isSelected ? () => handleSearchArticles() : () => openHeartModal()}
      />
      <View style={styles.background}>
        <View style={[globalStyles.flexDirectionRow, styles.screenOption]}>
          <TouchableOpacity
            onPress={handleVisibleModal}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              isSelected && styles.optionContainerSelected,
            ]}
          >
            <Text style={isSelected ? styles.selectedText : styles.unselectedText}>Articles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleVisibleModal}
            style={[
              globalStyles.centered,
              globalStyles.container,
              styles.optionContainer,
              !isSelected && styles.optionContainerSelected,
            ]}
          >
            <Text style={isSelected ? styles.unselectedText : styles.selectedText}>Securities</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isSelected ? (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchArticlesText}
            renderItem={renderItemSearch}
            style={[globalStyles.container, globalStyles.flexDirectionCol]}
            keyExtractor={(_item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[...symbolListRender]}
            renderItem={renderSymbolSearchItem}
            style={[globalStyles.container]}
            keyExtractor={(_item, index) => `key + ${index}`}
          />
        </View>
      )}
      <Modal
        visible={heartModalVisible}
        onRequestClose={closeModal}
        childrenContent={
          <View style={[globalStyles.container, globalStyles.flexDirectionRow, styles.modalBackground]}>
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={[globalStyles.centered, globalStyles.fillWidth, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[styles.filterText]}>
                  Add To Watchlists
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    globalStyles.positionAbsolute,
                    globalStyles.fillHeight,
                    globalStyles.justifyCenter,
                    styles.cancelContainer,
                  ]}
                >
                  <Text allowFontScaling={false} style={[styles.cancelText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={globalStyles.container}>
                {watchlist.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.symbolItemContainer2]}
                      key={index}
                      onPress={() => {
                        if (checkBox.includes(index)) {
                          const UnCheck = checkBox.filter(elem => elem !== index);
                          setCheckBox(UnCheck);
                        } else {
                          setCheckBox([...checkBox, index]);
                        }
                      }}
                    >
                      <View style={globalStyles.flexDirectionRow}>
                        {checkBox.includes(index) ? (
                          <SelectedIcon height={scaleSize(24)} width={scaleSize(24)} />
                        ) : (
                          <UnselectedIcon height={scaleSize(24)} width={scaleSize(24)} />
                        )}
                        <View style={[globalStyles.justifyCenter, styles.label]}>
                          <Text allowFontScaling={false} style={styles.labelText}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.executeFormContainer,
                  styles.executeFormContainer2,
                ]}
              >
                <View style={[globalStyles.container]}>
                  <TouchableOpacity onPress={submitForm} style={[globalStyles.centered, styles.executeFormButton]}>
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.executeFormContainer]}>
                <View style={[globalStyles.container]}>
                  <TouchableOpacity
                    onPress={onPressCreateWatchlist}
                    style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.executeFormButton3]}
                  >
                    <AddWatchListBlueColor width={scaleSize(24)} height={scaleSize(24)} />
                    <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                      Create new Watchlist
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        }
      />

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
                      watchlistNameError === false
                        ? styles.textInputContainerStyle
                        : styles.textInputContainerStyleError,
                    ]}
                    placeholder={'Enter your new watchlist name'}
                    placeholderTextColor={Colors.LIGHTTextDisable}
                    textInputStyle={[globalStyles.fillHeight, styles.textInputStyle]}
                    error={watchlistNameError}
                    errorContent={watchlistNameErrorContent}
                    maxLength={24}
                    iconRight={<Text style={styles.textLimit}>{watchListName.length}/24</Text>}
                  />
                </View>
                <View style={[globalStyles.fillWidth, styles.marginBottom]}>
                  <TouchableOpacity
                    onPress={onPressConfirmCreateWatchlist}
                    style={[globalStyles.centered, styles.executeFormButton2]}
                  >
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      Create
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={[globalStyles.fillWidth]}>
                  <TouchableOpacity
                    onPress={onPressCancelCreateWatchlist}
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
        }
      />

      <Modal
        visible={heartModalVisible}
        onRequestClose={closeModal}
        childrenContent={
          <View style={[globalStyles.container, globalStyles.flexDirectionRow, styles.modalBackground]}>
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <View style={[globalStyles.centered, globalStyles.fillWidth, styles.modalTitle]}>
                <Text allowFontScaling={false} style={[styles.filterText]}>
                  Add to watchlists
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    globalStyles.positionAbsolute,
                    globalStyles.fillHeight,
                    globalStyles.justifyCenter,
                    styles.cancelContainer,
                  ]}
                >
                  <Text allowFontScaling={false} style={[styles.cancelText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={globalStyles.container}>
                {watchlist.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.symbolItemContainer2]}
                      key={index}
                      onPress={() => {
                        if (checkBox.includes(index)) {
                          const UnCheck = checkBox.filter(elem => elem !== index);
                          setCheckBox(UnCheck);
                        } else {
                          setCheckBox([...checkBox, index]);
                        }
                      }}
                    >
                      <View style={globalStyles.flexDirectionRow}>
                        {checkBox.includes(index) ? (
                          <SelectedIcon height={scaleSize(24)} width={scaleSize(24)} />
                        ) : (
                          <UnselectedIcon height={scaleSize(24)} width={scaleSize(24)} />
                        )}
                        <View style={[globalStyles.justifyCenter, styles.label]}>
                          <Text allowFontScaling={false} style={styles.labelText}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.executeFormContainer,
                  styles.executeFormContainer2,
                ]}
              >
                <View style={[globalStyles.container]}>
                  <TouchableOpacity onPress={submitForm} style={[globalStyles.centered, styles.executeFormButton]}>
                    <Text allowFontScaling={false} style={styles.executeFormButtonText}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.executeFormContainer]}>
                <View style={[globalStyles.container]}>
                  <TouchableOpacity
                    onPress={onPressCreateWatchlist}
                    style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.executeFormButton3]}
                  >
                    <AddWatchListBlueColor width={scaleSize(24)} height={scaleSize(24)} />
                    <Text allowFontScaling={false} style={styles.executeFormButtonText2}>
                      Create new Watchlist
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={globalStyles.invisibleBackground} onPress={closeModal} />
          </View>
        }
      />
    </>
  );
};

export default memo(SearchBlogs);
