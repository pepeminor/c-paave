import React, { memo, useRef } from 'react';
import { StackScreenProps } from 'screens/RootNavigation';
import SearchComponent from 'screens/SearchSymbolAndMember/SearchComponent';
import { View } from 'react-native';
import { SearchSymbolList } from 'components/SearchSymbolList';
import { useStyles } from './styles';

const SearchSymbol = (props: StackScreenProps<'SearchSymbol'>) => {
  const { styles } = useStyles();

  const searchSymbolListRef = useRef<SearchSymbolList>(null);

  const tradeTypeSearch = (value: string) => {
    searchSymbolListRef.current?.onSearchTextChange(value);
  };

  return (
    <View style={styles.container}>
      <SearchComponent
        placeholder={'Search'}
        searchText={''}
        goBack={props.navigation.goBack}
        onChangeSearchValue={tradeTypeSearch}
        doneBtnText=""
      />
      <SearchSymbolList ref={searchSymbolListRef} flow={'Trade'} />
    </View>
  );
};

export default memo(SearchSymbol);
