import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import UserBlog from 'assets/icon/UserBlog.svg';
import CalendarIcon from 'assets/icon/Calendar.svg';
import { ScrollView } from 'react-native-gesture-handler';
import ShareArrowIcon from 'assets/icon/ShareArrowIcon.svg';

const faceDataEducation = [
  {
    title: 'Relative Strength Index (RSI)',
    description: 'Thứ Ba 04/05/2021 - 12:06',
    user: 'Thuy Linh Do',
    titleContent1: '1. Introduction',
    titleContent2: '2. Calculating RSI',
    content:
      'Relative Strength Index (RSI) introduced by J. Welles Wilder Jr. in 1978, was a momentum indicator in technical analysis of financial instruments. RSI measures the extent of recent price changes to evaluate the status of oversold (oversold) or overbought (overbought) of stocks or other assets. The RSI is represented by a line plot that moves between two extreme points and has values between 0 and 100.',
    content1:
      'Relative Strength Index (RSI) introduced by J. Welles Wilder Jr. in 1978, was a momentum indicator in technical analysis of financial instruments. RSI measures the extent of recent price changes to evaluate the status of oversold (oversold) or overbought (overbought) of stocks or other assets. The RSI is represented by a line plot that moves between two extreme points and has values between 0 and 100.',
    content2: 'RS = Average Profit / Average Loss',
    content3:
      'Average profit or average loss is the average profit or loss over a period (n) in the past. The average loss is taken as the absolute value.',
    content4:
      'For example: During 14 trading days (T to T + 14), VNM share price increases 8 days, average price increases 10,000 VND and decreases the other 6 days with average -8,000 VND. Average Profit (AG) will be calculated = 10,000 / 14 = 714.29, Average Loss (AL) will be calculated = 8,000 / 14 = 571.43.',
  },
];

const EducationItem = (props: StackScreenProps<'EducationItem'>) => {
  // const [liked, setLiked] = useState([0]);
  // const [likes, updateLikes] = useState(73);
  // const [likeSd, updateLikeSd] = useState(false);
  const { styles } = useStyles();

  const [share] = useState(3);
  // const [shared] = useState(false);

  const handleShareItem = () => {
    // updateShares(shares => shares + (shared ? -1 : 1));
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

  const GoBackBlog = () => {
    props.navigation.goBack();
  };

  return (
    <View style={globalStyles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={GoBackBlog} headerTitle={'Relative Strength Index (RSI)'} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[globalStyles.justifyCenter, styles.blockNewsContainer]}>
          {faceDataEducation.map(item => (
            <View>
              <View style={[styles.OtherStyle, globalStyles.justifyCenter]}>
                <Text style={[styles.textOther]}>{item.title}</Text>
              </View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blockNewsUpDateContainer]}>
                <CalendarIcon width={scaleSize(16)} height={scaleSize(16)} />
                <Text style={[styles.DateTime]}>{item.description}</Text>
              </View>
              <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.blogUserUpdateContainer]}>
                <UserBlog width={scaleSize(16)} height={scaleSize(16)} />
                <Text style={[styles.DateTime]}>{item.user}</Text>
              </View>
              <View style={[globalStyles.justifyCenter, styles.blockNewsTitleContainer]}>
                <Text style={[styles.blockNewsTitleText]}>{item.titleContent1}</Text>
              </View>
              <View style={[globalStyles.centered, styles.blogsNewsActionContainer]}>
                <Text style={[styles.blockNewsContentText]}>{item.content}</Text>
              </View>
              <View style={[styles.blockNewsAvatar]} />
              <View style={[globalStyles.justifyCenter, styles.blockNewsTitleContainer]}>
                <Text style={[styles.blockNewsTitleText]}>{item.titleContent2}</Text>
              </View>
              <View style={[globalStyles.centered, styles.blogsNewsActionContainer]}>
                <Text style={[styles.blockNewsContentText]}>{item.content1}</Text>
                <Text style={[styles.blockNewsContentText]}>{item.content3}</Text>
                <Text style={[styles.blockNewsContentText]}>{item.content4}</Text>
              </View>
            </View>
          ))}

          <View style={[globalStyles.flexDirectionRow, styles.tabLike]}>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(EducationItem);
