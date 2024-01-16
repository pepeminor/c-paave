import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useDeleteSymbolsLogic } from './DeleteSymbols.logic';
import useStyles from './DeleteSymbols.style';
import { IProps } from './DeleteSymbols.type';
import withMemo from 'HOC/withMemo';
import { lightColors as Colors, scaleSize } from 'styles';
import TextInputComponent from 'components/TextInput';
import Search from 'assets/icon/Search.svg';
import { IGetAllSymbolFavoriteResponse } from 'interfaces/favorite';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import SymbolItem from './SymbolItem.component';
import LazyFlashList from 'components/LazyFlashList';
import { ListRenderItemInfo } from '@shopify/flash-list';
const DeleteSymbols = (props: IProps) => {
  // eslint-disable-next-line no-empty-pattern
  const { handlers, state } = useDeleteSymbolsLogic(props);
  const { selectedWatchlistSymbolList } = props;
  const { t } = useTranslation();
  const { styles } = useStyles();

  const renderItem = useCallback(({ item }: ListRenderItemInfo<IGetAllSymbolFavoriteResponse>) => {
    const handleSymbolItem = () => handlers.handleSymbolItem(item);
    const isHeart = handlers.checkSymbol(item.code);

    return <SymbolItem item={item} handleSymbolItem={handleSymbolItem} isHeart={isHeart} />;
  }, []);

  return (
    <View style={styles.paddingFix}>
      <HeaderScreen headerTitle={'Delete Symbols'} leftButtonIcon={true} goBackAction={props.navigation.goBack} />
      <View style={styles.headerTitleContainer}>
        <TextInputComponent
          defaultValue={state.txtSearch}
          onChangeText={handlers.onChangeText}
          wholeContainerStyle={styles.wholeContainerStyleIOS}
          placeholder={'Search'}
          textInputContainerStyle={styles.textInputContainerIOS}
          placeholderTextColor={Colors.LIGHTTextDisable}
          textInputStyle={styles.textInputSearchStyle}
        />
        <Search height={scaleSize(18)} width={scaleSize(18)} style={styles.iconStyle} />
      </View>
      <LazyFlashList
        data={state.txtSearch === '' ? selectedWatchlistSymbolList?.data : state.dataSearch}
        renderItem={renderItem}
        estimatedItemSize={100}
        bounces={true}
        scrollEventThrottle={16}
        lazy={false}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        onPress={handlers.handleConfirmSymbolAction}
        style={styles.btnEnable}
        disabled={state.isDeleted}
      >
        {!state.isDeleted && (
          <Text allowFontScaling={false} style={styles.cancelText}>
            {t('Done')}
          </Text>
        )}
        {state.isDeleted && <ActivityIndicator size={'small'} color={Colors.WHITE} />}
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(DeleteSymbols);
