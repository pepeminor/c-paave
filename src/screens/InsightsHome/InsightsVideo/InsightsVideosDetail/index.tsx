import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { Tabs } from 'react-native-collapsible-tab-view';
import HeaderScreen from 'components/HeaderScreen';
import Article from 'components/Article';
import globalStyles, { scaleSize } from 'styles';
import IconSearch from 'assets/icon/IconSearch.svg';
import IconCalendar from 'assets/icon/IconCalendar.svg';
import IconLike from 'assets/icon/Iconlike.svg';
import LikeOutline from 'assets/icon/LikeOutline.svg';
import IconShare from 'assets/icon/IconShareVideo.svg';
import useStyles from './styles';
import { navigate } from 'utils';

type IFakeInsightsVideosDetailArticle = {
  uri: string;
  title: string;
  date: string;
};

const fakeInsightsVideosArticle: IFakeInsightsVideosDetailArticle[] = [
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
const InsightsVideosDetail = (props: StackScreenProps<'InsightsVideosDetail'>, index: number) => {
  const [liked, setLiked] = useState([0]);
  const [likes, updateLikes] = useState(73);
  const [likeSd, updateLikeSd] = useState(false);

  const { styles } = useStyles();

  const [share, updateShares] = useState(3);
  const [shared] = useState(false);

  const handleShareItem = () => {
    updateShares(shares => shares + (shared ? -1 : 1));
  };
  const goBack = () => {
    props.navigation.goBack();
  };

  const tabBarTabView = () => {
    return null;
  };

  const openInSigntsVideosDetail = () => {
    props.navigation.navigate('InsightsVideosDetail');
  };

  const handleLikeItem = (index: number) => {
    updateLikes(likes => likes + (likeSd ? 1 : -1));
    if (liked.includes(index)) {
      const unlike = liked.filter(elem => elem !== index);
      setLiked(unlike);
      updateLikeSd(liked => !liked);
    } else {
      setLiked([...liked, index]);
      updateLikeSd(liked => !liked);
    }
  };

  const SearchBlogs = () => {
    navigate({ key: 'SearchBlogs' });
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={styles.marginHorizontal16}>
        <Text style={[styles.titleVideo, styles.lineHeightTitle, styles.marginTop16]}>
          Contrary to popular belief, Lorem Ipsum is not simply
        </Text>
        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
          <IconCalendar />
          <Text style={[styles.paddingLeft8, styles.textCalendar]}>Thứ Ba 04/05/2021 - 12:06</Text>
        </View>
      </View>
      <View style={[styles.videoSize, styles.marginTop16]} />
      <View style={[styles.marginHorizontal16, styles.marginTop16]}>
        <Text style={styles.titleContent}>
          The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
          using
        </Text>
        <Text style={[styles.marginTop8, styles.textContent]}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Text>
      </View>
      <View
        style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.marginHorizontal16, styles.marginTop16]}
      >
        <Text style={[styles.tags, styles.marginBottom8]}>Tags</Text>
        <View style={[globalStyles.flexDirectionRow, styles.marginLeft15, styles.flexWrap]}>
          <TouchableOpacity
            style={[globalStyles.centered, styles.tagBtn, styles.marginHorizontal5, styles.marginBottom8]}
          >
            <Text style={styles.tagItem}>Real Estate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.centered, styles.tagBtn, styles.marginHorizontal5, styles.marginBottom8]}
          >
            <Text style={styles.tagItem}>Healthcare</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.centered, styles.tagBtn, styles.marginHorizontal5, styles.marginBottom8]}
          >
            <Text style={styles.tagItem}>Energy</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[globalStyles.flexDirectionRow, styles.marginHorizontal16, styles.marginTop16]}>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            globalStyles.justifySpaceAround,
            styles.newsActionItem,
            styles.newsActionLike,
          ]}
        >
          <TouchableOpacity key={index} onPress={() => handleLikeItem(index)}>
            {liked.includes(index) ? (
              <LikeOutline width={scaleSize(24)} height={scaleSize(24)} />
            ) : (
              <IconLike width={scaleSize(24)} height={scaleSize(24)} />
            )}
          </TouchableOpacity>
          <Text style={styles.newsActionValue}>{likes}</Text>
        </View>
        <View
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.alignCenter,
            globalStyles.justifySpaceAround,
            styles.newsActionItem,
          ]}
        >
          <TouchableOpacity onPress={handleShareItem}>
            <IconShare width={scaleSize(24)} height={scaleSize(24)} />
          </TouchableOpacity>
          <Text style={styles.newsActionValue}>{share}</Text>
        </View>
      </View>
      <View style={[styles.border, styles.marginTop16]} />
      <View style={styles.marginHorizontal16}>
        <Text style={[styles.lastestText, styles.marginTop8]}>Latest video</Text>
        <View style={[styles.marginTop16]}>
          <Tabs.Container renderTabBar={tabBarTabView}>
            <Tabs.Tab name="InsightVideos">
              <Article data={fakeInsightsVideosArticle} onPress={openInSigntsVideosDetail} />
            </Tabs.Tab>
          </Tabs.Container>
        </View>
      </View>
    </ScrollView>
  );
};

export default memo(InsightsVideosDetail);
