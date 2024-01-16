import React, { memo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { Tabs } from 'react-native-collapsible-tab-view';
import HeaderScreen from 'components/HeaderScreen';
import Article from 'components/Article';
import globalStyles, { scaleSize } from 'styles';
import IconSearch from 'assets/icon/IconSearch.svg';
import IconCalendar from 'assets/icon/IconCalendar.svg';
import useStyles from './styles';
import { navigate } from 'utils';

type IFakeInsightsVideosArticle = {
  uri: string;
  title: string;
  date: string;
};

const fakeInsightsVideosArticle: IFakeInsightsVideosArticle[] = [
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Earthquake shakes Melbourne and southeast Australia',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Autopsy confirms Gaby Petitos remains and rules cause of death to be homicide',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Autopsy confirms Gaby Petitos remains and rules cause of death to be homicide',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Autopsy confirms Gaby Petitos remains and rules cause of death to be homicide',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Autopsy confirms Gaby Petitos remains and rules cause of death to be homicide',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    uri: 'https://media-cdn.laodong.vn/storage/newsportal/2021/2/4/877748/Chung-Khoan.jpeg?w=720&crop=auto&scale=both',
    title: 'Autopsy confirms Gaby Petitos remains and rules cause of death to be homicide',
    date: 'Thứ Ba 04/05/2021 - 12:06',
  },
];

const InsightsVideos = (props: StackScreenProps<'InsightsVideos'>) => {
  const { styles } = useStyles();
  const goBack = () => {
    props.navigation.goBack();
  };

  const tabBarTabView = () => {
    return null;
  };

  const openInSigntsVideosDetail = () => {
    props.navigation.navigate('InsightsVideosDetail');
  };

  const SearchBlogs = () => {
    navigate({ key: 'SearchBlogs' });
  };

  return (
    <View style={globalStyles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={goBack}
        headerTitle={'Video'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={SearchBlogs}>
            <IconSearch width={scaleSize(24)} height={scaleSize(24)}></IconSearch>
          </TouchableOpacity>,
        ]}
      />
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={openInSigntsVideosDetail} style={[styles.videoSize, styles.marginTop16]} />
        <View style={[styles.marginHorizontal16]}>
          <TouchableOpacity style={[styles.marginVertical6]} onPress={openInSigntsVideosDetail}>
            <Text style={[styles.titleVideo, styles.lineHeightTitle]}>
              Contrary to popular belief, Lorem Ipsum is not simply
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            <IconCalendar />
            <Text style={[styles.paddingLeft8, styles.textCalendar]}>Thứ Ba 04/05/2021 - 12:06</Text>
          </View>
          <Text style={[styles.lineHeightContent, styles.textContent, styles.marginTop6]}>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
            using
          </Text>
          <View style={[styles.marginTop16]}>
            <Tabs.Container renderTabBar={tabBarTabView}>
              <Tabs.Tab name="InsightVideos">
                <Article data={fakeInsightsVideosArticle} onPress={openInSigntsVideosDetail} />
              </Tabs.Tab>
            </Tabs.Container>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(InsightsVideos);
