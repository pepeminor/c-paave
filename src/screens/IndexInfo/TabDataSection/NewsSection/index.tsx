import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import Calendar from 'assets/icon/Calendar.svg';
import useStyles from './styles';

type IFakeNews = {
  title: string;
  time: string;
};

const fakeNewsList: IFakeNews[] = [
  {
    title: '"Tố" HSX yếu kém, VAFI vạch trần hàng loạt góc khuất',
    time: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    title: 'Sacombank muốn bán hơn 81 triệu cổ phiếu quỹ khi giá tăng "nóng"',
    time: 'Thứ Ba 04/05/2021 - 12:06',
  },
  {
    title: 'Giá vàng lao dốc, dồn dập mua vào',
    time: 'Thứ Ba 04/05/2021 - 12:06',
  },
];

const News = () => {
  const { styles } = useStyles();
  return (
    <ScrollView style={[globalStyles.container]}>
      {fakeNewsList.map((item, index) => {
        return (
          <View style={[globalStyles.flexDirectionRow, styles.newsEachItemContainer]} key={index}>
            <View style={styles.newsEachItemImageContainer}></View>
            <View style={[globalStyles.container]}>
              <Text allowFontScaling={false} style={styles.newsEachItemContentTitleText}>
                {item.title}
              </Text>
              <View
                style={[
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.newsEachItemContentTimeContainer,
                ]}
              >
                <Calendar width={scaleSize(16)} height={scaleSize(16)} />
                <Text allowFontScaling={false} style={styles.newsEachItemContentTimeText}>
                  {item.time}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default News;
