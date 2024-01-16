import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ListRenderItemInfo, Platform } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import ArrowRight from 'assets/icon/ArrowRight.svg';
import ShareArrowIcon from 'assets/icon/ShareArrowIcon.svg';
import { navigate } from 'utils';

type IFakeDataType = {
  title: string;
  description: string;
};

const fakeData: IFakeDataType[] = [
  {
    title: `Fed's Powell: It's 'very, very unlikely' the U.S. will see 1970s-style inflation Fed's Powell: It's 'very, very unlikely' the U.S.`,
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

const Video = () => {
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

  const openInSigntsVideosDetail = () => {
    navigate({ key: 'InsightsVideosDetail' });
  };

  const renderIndexChartItem = ({ item, index }: ListRenderItemInfo<IFakeDataType>) => {
    return (
      <View key={index} style={[styles.cardVideoList]}>
        <TouchableOpacity onPress={openInSigntsVideosDetail}>
          <View style={[styles.CardVideoListAvatar]} />
          <Text style={[styles.CardVideoListTitle]} numberOfLines={3}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const goToInsightsVideo = () => {
    navigate({ key: 'InsightsVideos' });
  };

  const goToInsightsVideoDetail = () => {
    navigate({ key: 'InsightsVideosDetail' });
  };

  return (
    <>
      <View style={styles.container}>
        {/* TITLE CONTAINER */}
        <View
          style={[
            globalStyles.alignCenter,
            globalStyles.flexDirectionRow,
            globalStyles.justifySpaceBetween,
            styles.containerTitle,
          ]}
        >
          <Text style={[styles.TextTitle]}>Video</Text>
          <TouchableOpacity
            style={[
              globalStyles.alignCenter,
              globalStyles.flexDirectionRow,
              globalStyles.justifySpaceBetween,
              styles.btnSeeAll,
            ]}
            onPress={goToInsightsVideo}
          >
            <Text style={[styles.seeAllTitle]}>See all</Text>
            <ArrowRight width={scaleSize(9)} height={scaleSize(6)} />
          </TouchableOpacity>
        </View>

        {/* VIDEO CARD */}
        <View style={[globalStyles.justifyCenter, styles.videoCard]}>
          <TouchableOpacity onPress={goToInsightsVideoDetail}>
            <View style={[globalStyles.justifyCenter, styles.bigVideo]} />
            <View style={[globalStyles.justifyCenter, styles.videoCardTitleContainer]}>
              <Text style={[styles.videoCardTitle]}>
                Stock index futures are mildly higher after Nasdaq closes at record
              </Text>
            </View>
            <View style={[globalStyles.justifyCenter, styles.videoCardContentContainer]}>
              <Text numberOfLines={3} style={[styles.videoCardContent]}>
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed
                to usingThe point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                opposed to using
              </Text>
            </View>
          </TouchableOpacity>

          {/* Action */}
          <View style={[globalStyles.flexDirectionRow, styles.videoActionContainer]}>
            {/* <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              globalStyles.justifySpaceAround,
              styles.videoActionItem,
              styles.videoActionLike,
            ]}
          >
            <TouchableOpacity key={index} onPress={() => handleLikeItem(index)}>
              {liked.includes(index) ? (
                <LikeOutline width={scaleSize(19)} height={scaleSize(20)} />
              ) : (
                <IconLike width={scaleSize(19)} height={scaleSize(20)} />
              )}
            </TouchableOpacity>
            <Text style={styles.newsActionValue}>{likes}</Text>
          </View> */}
            <View
              style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                globalStyles.justifySpaceAround,
                styles.videoActionItem,
                styles.videoActionShare,
              ]}
            >
              <TouchableOpacity onPress={handleShareItem}>
                <ShareArrowIcon width={scaleSize(24)} height={scaleSize(24)} />
              </TouchableOpacity>
              <Text style={styles.newsActionValue}>{share}</Text>
            </View>
          </View>
        </View>

        {/* VIDEO SCROLL LIST */}
        <View style={[globalStyles.alignCenter, styles.containerVideoList]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={fakeData.slice(0, 5)}
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
    </>
  );
};

export default Video;
