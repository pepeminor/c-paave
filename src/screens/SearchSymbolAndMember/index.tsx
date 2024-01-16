import React, { memo, useState, useRef } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import useStyles from './styles';
import SearchComponent from './SearchComponent';
import { ScreenTab, SearchScreenTabRef } from './type';
import { SearchSymbolList } from 'components/SearchSymbolList';
import TabSelector from 'components/TabSelector';
import { SearchMember } from './SearchMember';
import { SearchHashtag } from './SearchHashtag';
import SearchNews from './SearchNews';

const SearchSymbolAndMember = (props: StackScreenProps<'SearchSymbolAndMember'>) => {
  const { styles } = useStyles();

  const [tab, setTab] = useState<ScreenTab>(props.route?.params?.initTab ?? 'SEC');

  const searchScreenTabRef = useRef<SearchScreenTabRef>(null);

  const onChangeValue = (value: string) => {
    searchScreenTabRef.current?.onSearchTextChange(value);
  };

  return (
    <View style={styles.container}>
      <SearchComponent
        selectedTab={tab}
        placeholder={'Search'}
        searchText={''}
        goBack={props.navigation.goBack}
        onChangeSearchValue={onChangeValue}
      />
      <TabSelector
        value={tab}
        setValue={setTab}
        listValue={ScreenTab}
        type="UNDERLINE"
        style={styles.tabSelectorContainer}
        selectedContainer={styles.selectedContainer}
        unSelectedContainer={styles.unSelectedContainer}
      />
      {tab === 'SEC' && <SearchSymbolList ref={searchScreenTabRef} flow={'Search'} />}
      {tab === 'HASHTAG' && <SearchHashtag ref={searchScreenTabRef} />}
      {tab === 'NEWS' && <SearchNews ref={searchScreenTabRef} />}
      {tab === 'MEM' && <SearchMember ref={searchScreenTabRef} />}
    </View>
  );
};

export default memo(SearchSymbolAndMember);
