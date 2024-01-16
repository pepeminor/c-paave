import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import React from 'react';
import { ScrollView, View } from 'react-native';
import globalStyles from 'styles';
import useStyles from './styles';
import StrategiesItem from 'components/StrategiesItem';

const StrategiesData = [
  {
    id: 0,
    title: 'Momentum & Valuation',
    ratio: 21.59,
  },
  {
    id: 1,
    title: 'TGIF',
    ratio: 44.7,
  },
  {
    id: 2,
    title: 'Dividend Harvesting',
    ratio: 12.16,
  },
];

const InsightStrategies = (props: StackScreenProps<'InsightStrategies'>) => {
  const [flwList, setFlwList] = React.useState<number[]>([]);
  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.goBack();
  };

  const onHandleFollow = (id: number) => {
    const isFollowed = flwList.includes(id);
    isFollowed ? setFlwList(flwList.filter(item => item !== id)) : setFlwList([...flwList, id]);
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderScreen headerTitle={'Investment Strategies'} leftButtonIcon={true} goBackAction={goBack} />
      <ScrollView style={[globalStyles.container, styles.container]} showsVerticalScrollIndicator={false}>
        <View style={styles.containerContentScrollView}>
          <View style={[globalStyles.flexDirectionCol, styles.blockContainer]}>
            {StrategiesData.map((el, idx) => (
              <StrategiesItem
                key={idx}
                marginTop={idx > 0}
                data={el}
                onFollowPress={onHandleFollow}
                followed={flwList.includes(el.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InsightStrategies;
