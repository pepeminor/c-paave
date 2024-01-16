import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ListRenderItemInfo } from 'react-native';
import globalStyles from 'styles';
import IconCalendar from 'assets/icon/IconCalendar.svg';
import useStyles from './styles';

type IArticleProps = {
  readonly data: IArticleDataProps[] | null;
  onPress(): void;
};

type IArticleDataProps = {
  readonly uri: string;
  readonly title: string;
  readonly date: string;
};

const Article = (props: IArticleProps) => {
  const data: IArticleDataProps[] = useMemo(() => {
    return props.data != null ? props.data : [];
  }, [props.data]);

  const { styles } = useStyles();

  const renderItem = ({ item }: ListRenderItemInfo<IArticleDataProps>) => {
    const onPress = () => {
      if (props.onPress != null) {
        props.onPress();
      }
    };

    return (
      <View style={[globalStyles.flexDirectionRow, globalStyles.centered, styles.marginVertical8]}>
        <TouchableOpacity onPress={onPress}>
          <Image style={[styles.sizeImage]} source={{ uri: item.uri }} />
        </TouchableOpacity>
        <View style={[globalStyles.flexDirectionCol, styles.paddingLeft8, styles.sizeContent]}>
          <TouchableOpacity onPress={onPress}>
            <Text numberOfLines={3} style={[styles.titleVideo, styles.lineHeightTitle]}>
              {item.title}
            </Text>
          </TouchableOpacity>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}>
            <IconCalendar />
            <Text style={[styles.paddingLeft8, styles.textCalendar]}>{item.date}</Text>
          </View>
        </View>
      </View>
    );
  };

  return <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={renderItem} scrollEnabled={false} />;
};

export default Article;
