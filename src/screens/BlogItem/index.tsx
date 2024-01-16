import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, FlatList, Platform, ListRenderItemInfo, View } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import IconSearch from 'assets/icon/IconSearch.svg';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { StackScreenProps } from 'screens/RootNavigation';
import CalendarIcon from 'assets/icon/Calendar.svg';
import { navigate } from 'utils';
import ShareArrowIcon from 'assets/icon/ShareArrowIcon.svg';
import UserBlog from 'assets/icon/UserBlog.svg';

const investmentStategyList = [
  {
    label: 'Real Estate',
    value: 'realEstate',
  },
  {
    label: 'Healthcare',
    value: 'healthcare',
  },
  {
    label: 'Energy',
    value: 'energy',
  },
];

type IFakeTitleDataType = {
  title: string;
  content: string;
  description: string;
};

const fakeTitleData = [
  {
    title: `Hong Kong’s Hang Seng index jumps about 2% as stocks recover from early week slump`,
    description: 'Thứ ba 04/05/2021 - 12:06',
    user: 'Thuy Linh Do',
    content:
      'SINGAPORE — Shares in Hong Kong continued to see a rebound in Thursday morning trade from a two-day slump earlier in the week. Meanwhile, Asia-Pacific markets rose after the U.S. Federal Reserve left its benchmark interest rate near zero.',
    content1:
      'Hong Kong’s Hang Seng index jumped around 2% in morning trading on Thursday, continuing its bounce back after closing more than 1% up the day before. The index had dived more than 8% over two days early this week.',
    content2:
      'Chinese tech stocks in Hong Kong, which had been hit hard by the market rout earlier in the week, soared. Shares of Tencent jumped 6.62% while Alibaba gained 4.48% and Meituan climbed 8.44%. The Hang Seng Tech index traded 5.31% higher.',

    content3:
      'Chinese tech stocks in Hong Kong, which had been hit hard by the market rout earlier in the week, soared. Shares of Tencent jumped 6.62% while Alibaba gained 4.48% and Meituan climbed 8.44%. The Hang Seng Tech index traded 5.31% higher.',

    content4: 'In Japan, the Nikkei 225 advanced 0.51% while the Topix index gained 0.26%.',
    content5: 'Elsewhere, South Korea’s Kospi rose fractionally while the S&P/ASX 200 in Australia climbed 0.47%.',
    content6:
      'Chinese tech stocks in Hong Kong, which had been hit hard by the market rout earlier in the week, soared. Shares of Tencent jumped 6.62% while Alibaba gained 4.48% and Meituan climbed 8.44%. The Hang Seng Tech index traded 5.31% higher.',
  },
];

type IFakeDataType = {
  title: string;
  description: string;
};

const fakeData: IFakeDataType[] = [
  {
    title: `Activision Blizzard CEO Bobby Kotick full interview on ‘Mad Money’`,
    description: 'Thứ ba 04/05/2021 - 12:06',
  },
  {
    title: `CNBC ProSmall caps have slumped, but Jefferies says these `,
    description: 'Thứ ba 04/05/2021 - 12:06',
  },
  {
    title: `Bitcoin drops below $30,000, then recovers: We asked 5 experts what they’re doing`,
    description: 'Thứ ba 04/05/2021 - 12:06',
  },
];

const BlogItem = (props: StackScreenProps<'BlogItem'>) => {
  // const [liked, setLiked] = useState([0]);
  // const [likes, updateLikes] = useState(73);
  // const [likeSd, updateLikeSd] = useState(false);
  const [share, updateShares] = useState(3);
  const [shared] = useState(false);

  const { styles } = useStyles();

  const handleShareItem = () => {
    updateShares(shares => shares + (shared ? -1 : 1));
  };

  // const handleLikeItem = (index: number) => {
  //   updateLikes(likes => likes + (likeSd ? 1 : -1));
  //   if (liked.includes(index)) {
  //     let unlike = liked.filter(elem => elem !== index);
  //     setLiked(unlike);
  //     updateLikeSd(liked => !liked);
  //   } else {
  //     setLiked([...liked, index]);
  //     updateLikeSd(liked => !liked);
  //   }
  // };

  const headerBlogs = ({ index }: ListRenderItemInfo<IFakeTitleDataType>) => {
    return (
      <View style={[globalStyles.justifyCenter, styles.blockNewsContainer]}>
        <View style={[styles.blockNewsAvatar]} />
        {fakeTitleData.map(item => (
          <View>
            <View style={[globalStyles.justifyCenter, styles.blockNewsTitleContainer]}>
              <Text style={[styles.blockNewsTitleText]}>{item.title}</Text>
            </View>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blockNewsUpDateContainer]}>
              <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
              <Text style={[styles.DateTime]}>{item.description}</Text>
            </View>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blogUserUpdateContainer]}>
              <UserBlog width={scaleSize(16)} height={scaleSize(16)} />
              <Text style={[styles.DateTime]}>{item.user}</Text>
            </View>
            <View style={[globalStyles.centered, styles.blogsNewsActionContainer]}>
              <Text style={[styles.blockNewsContentText]}>{item.content}</Text>
              <Text style={[styles.blockNewsContentText]}>{item.content1}</Text>
              <View style={[styles.blogNewsAvatar]} />
              <Text style={[styles.blockNewsContentText]}>{item.content2}</Text>
              <Text style={[styles.blockNewsContentText]}>{item.content3}</Text>
              <Text style={[styles.blockNewsContentText]}>{item.content4}</Text>
              <Text style={[styles.blockNewsContentText]}>{item.content5}</Text>
              <Text style={[styles.blockNewsContentText]}>{item.content6}</Text>
            </View>
          </View>
        ))}

        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blockNewsDescContainer]}>
          <Text style={[styles.textTag]}>Tags</Text>
          <TouchableOpacity key={index} style={[globalStyles.flexDirectionRow, styles.favoriteContainer]}>
            {investmentStategyList.map((item, index) => (
              <View style={styles.favoriteItemContainer} key={index}>
                <Text allowFontScaling={false} style={styles.favoriteItemText}>
                  {item.label}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
        </View>

        <View style={[globalStyles.flexDirectionRow, styles.blogsNewsActionContainer]}>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.justifySpaceAround,
              styles.newsActionItem,
              styles.newsActionLike,
            ]}
          >
            <TouchableOpacity onPress={handleShareItem}>
              <ShareArrowIcon width={scaleSize(24)} height={scaleSize(24)} />
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>{share}</Text>
            {/* <TouchableOpacity key={index} onPress={() => handleLikeItem(index)}>
              {liked.includes(index) ? (
                <LikeOutline width={scaleSize(24)} height={scaleSize(24)} />
              ) : (
                <IconLike width={scaleSize(24)} height={scaleSize(24)} />
              )}
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>{likes}</Text> */}
          </View>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.justifySpaceAround,
              styles.newsActionItem,
              styles.newsActionShare,
            ]}
          >
            {/* <TouchableOpacity onPress={handleShareItem}>
              <ShareArrowIcon width={scaleSize(24)} height={scaleSize(24)} />
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>{share}</Text> */}
          </View>
        </View>
        <View style={[styles.OtherStyle, globalStyles.justifyCenter]}>
          <Text style={[styles.textOther]}>Other blogs</Text>
        </View>
      </View>
    );
  };

  const renderIndexBlogItem = ({ item, index }: ListRenderItemInfo<IFakeDataType>) => {
    const blogItemTab = () => {
      navigate({ key: 'BlogItem' });
    };

    return (
      <TouchableOpacity onPress={blogItemTab}>
        <View key={index} style={[styles.cardNewsList]}>
          <View style={[styles.blockNewsListUpDateContainer, globalStyles.flexDirectionRow]}>
            <View style={[styles.CardNewsListAvatar]} />
            <View>
              <Text style={[styles.CardNewsListTitle]}>{item.title}</Text>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.dateTime]}>
                <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
                <Text style={[styles.blockNewsListUpDateText]}>{item.description}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SearchBlogs = () => {
    navigate({ key: 'SearchBlogs' });
  };

  const GoBackBlog = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={GoBackBlog}
        headerTitle={'Blog'}
        rightButtonListIcon={[
          <TouchableOpacity onPress={SearchBlogs}>
            <IconSearch width={scaleSize(24)} height={scaleSize(24)}></IconSearch>
          </TouchableOpacity>,
        ]}
      />
      <FlatList
        ListHeaderComponent={headerBlogs}
        data={fakeData}
        contentContainerStyle={[
          globalStyles.alignCenter,
          Platform.OS === 'android' ? styles.itemIndexStyle : undefined,
        ]}
        renderItem={renderIndexBlogItem}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[globalStyles.container]}
      />
    </View>
  );
};

export default memo(BlogItem);
