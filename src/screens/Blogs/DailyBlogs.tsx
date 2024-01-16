import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, ListRenderItemInfo } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import CalendarIcon from 'assets/icon/Calendar.svg';
import ShareArrowIcon from 'assets/icon/ShareArrowIcon.svg';
import { navigate } from 'utils';
// import { IStackRouteProps } from 'screens/RootNavigation';
// import { StackScreenProps } from 'screens/RootNavigation';

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

type IFakeTitleDataType = {
  title: string;
  content: string;
  description: string;
};

const fakeTitleData = [
  {
    title: `GameStop shares jump after the company raises over $1 billion in stock sale`,
    description: 'Thứ ba 04/05/2021 - 12:06',
    content:
      'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using',
  },
];

// type IBlogsItemBaseProps = {};

// type IBlogsItemProps = StackScreenProps<'BlogItem'> & IBlogsItemBaseProps;

const DailyBlogs = () => {
  // const [liked, setLiked] = useState([0]);
  // const [likes, updateLikes] = useState(73);
  // const [likeSd, updateLikeSd] = useState(false);

  const { styles } = useStyles();

  const [share, updateShares] = useState(3);
  const [shared] = useState(false);

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
    const blogItemTab = () => {
      navigate({ key: 'BlogItem' });
    };

    return (
      <View style={[globalStyles.justifyCenter, styles.blockNewsContainer]}>
        <TouchableOpacity key={index} onPress={blogItemTab}>
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
              <View style={[globalStyles.justifyCenter, styles.blockNewsDescContainer]}>
                <Text style={[styles.blockNewsContentText]}>{item.content}</Text>
              </View>
            </View>
          ))}
        </TouchableOpacity>

        <View style={[globalStyles.flexDirectionRow, styles.blockNewsActionContainer]}>
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
            </TouchableOpacity> */}
            {/* <Text style={[styles.newsActionValue]}>{share}</Text> */}
          </View>
        </View>
      </View>
    );
  };

  const renderIndexBlogItem = ({ item, index }: ListRenderItemInfo<IFakeDataType>) => {
    const blogItemTab = () => {
      navigate({ key: 'BlogItem' });
    };

    return (
      <TouchableOpacity key={index} onPress={blogItemTab}>
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

  return (
    <View style={[globalStyles.container, styles.tabBlock]}>
      <FlatList
        ListHeaderComponent={headerBlogs}
        data={fakeData}
        contentContainerStyle={[
          globalStyles.alignCenter,
          Platform.OS === 'android' ? styles.itemIndexStyle : undefined,
        ]}
        renderItem={renderIndexBlogItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[globalStyles.container]}
      />
    </View>
  );
};

export default memo(DailyBlogs);
