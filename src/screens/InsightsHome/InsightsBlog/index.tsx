import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, ListRenderItemInfo, FlatList } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import ArrowRight from 'assets/icon/ArrowRight.svg';
import ShareArrowIcon from 'assets/icon/ShareArrowIcon.svg';
import CalendarIcon from 'assets/icon/Calendar.svg';
import { navigate } from 'utils';

type IFakeDataType = {
  title: string;
  description: string;
};

const fakeData: IFakeDataType[] = [
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation`,
    description: '',
  },
  {
    title: `Watch Fed Chair Power full, before House Covid 19`,
    description: '',
  },
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation`,
    description: '',
  },
  {
    title: `Watch Fed Chair Power full, before House Covid 19`,
    description: '',
  },
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation`,
    description: '',
  },
  {
    title: `Watch Fed Chair Power full, before House Covid 19`,
    description: '',
  },
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation`,
    description: '',
  },
  {
    title: `Watch Fed Chair Power full, before House Covid 19`,
    description: '',
  },
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation`,
    description: '',
  },
  {
    title: `Watch Fed Chair Power full, before House Covid 19`,
    description: '',
  },
];

const Blog = () => {
  const [share, updateShares] = useState(3);
  const [shared] = useState(false);

  const { styles } = useStyles();

  const handleShareItem = () => {
    updateShares(shares => shares + (shared ? -1 : 1));
  };

  const Blogs = () => {
    navigate({ key: 'Blogs' });
  };

  const BlogItemTab = () => {
    navigate({ key: 'BlogItem' });
  };

  const renderIndexChartItem = ({ item, index }: ListRenderItemInfo<IFakeDataType>) => {
    const BlogItemTab = () => {
      navigate({ key: 'BlogItem' });
    };
    return (
      <View style={[styles.cardNewsList]}>
        <TouchableOpacity style={[globalStyles.container]} key={index} onPress={BlogItemTab}>
          <View style={[globalStyles.backgroundColorDown, styles.CardNewsListAvatar]} />
          <Text numberOfLines={3} style={[styles.CardNewsListTitle]}>
            {item.title}
          </Text>
        </TouchableOpacity>
        <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blockNewsListUpDateContainer]}>
          <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
          <Text style={[styles.blockNewsListUpDateText]}>Thứ ba 04/05/2021 - 12:06</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* BLOCK TITLE */}
      <View
        style={[
          globalStyles.alignCenter,
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          styles.blockTitleContainer,
        ]}
      >
        <Text style={[styles.blockTitleText]}>Blog</Text>
        <TouchableOpacity
          onPress={Blogs}
          style={[
            globalStyles.alignCenter,
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            styles.btnSeeAll,
          ]}
        >
          <Text style={[styles.seeAllTitle]}>See all</Text>
          <ArrowRight width={scaleSize(9)} height={scaleSize(10.06)} />
        </TouchableOpacity>
      </View>

      {/* BLOCK NEWS */}
      <View style={[globalStyles.justifyCenter, styles.blockNewsContainer]}>
        <TouchableOpacity onPress={BlogItemTab}>
          <View style={[styles.blockNewsAvatar]} />
          <View style={[globalStyles.justifyCenter, styles.blockNewsTitleContainer]}>
            <Text numberOfLines={2} style={[styles.blockNewsTitleText]}>
              GameStop shares jump after the company raises over $1 bilion in stock sale
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blockNewsUpDateContainer]}>
            <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
            <Text>Thứ ba 04/05/2021 - 12:06</Text>
          </View>
          <View style={[globalStyles.justifyCenter, styles.blockNewsDescContainer]}>
            <Text numberOfLines={3} style={[styles.blockNewsContentText]}>
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
              using
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action */}
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
            {/* <TouchableOpacity>
              <LikeOutline width={scaleSize(24)} height={scaleSize(24)}%`)} />
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>73</Text> */}
            <TouchableOpacity onPress={handleShareItem}>
              <ShareArrowIcon width={scaleSize(24)} height={scaleSize(24)} />
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>{share}</Text>
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
            {/* <TouchableOpacity>
              <ShareArrowIcon width={scaleSize(24)} height={scaleSize(24)} />
            </TouchableOpacity>
            <Text style={[styles.newsActionValue]}>3</Text> */}
          </View>
        </View>
      </View>

      {/* BLOCK NEWS LIST */}
      <View style={[styles.blockNewsListContainer]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={index => index.toString()}
          data={fakeData}
          contentContainerStyle={[
            globalStyles.alignCenter,
            Platform.OS === 'android' ? styles.itemIndexStyle : undefined,
          ]}
          renderItem={renderIndexChartItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[globalStyles.container]}
        />
      </View>
    </View>
  );
};

export default memo(Blog);
