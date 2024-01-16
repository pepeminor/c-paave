import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { navigate } from 'utils';

/* ICONS */
import ArrowRight from 'assets/icon/ArrowRight.svg';

/* COMPONENT */
import StrategiesItem from 'components/StrategiesItem';

interface IStrategies {
  id: number;
  title: string;
  ratio: number;
}

const StrategiesData: IStrategies[] = [
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

const InvestmentStrategy = () => {
  const [flwList, setFlwList] = React.useState<number[]>([]);

  const { styles } = useStyles();

  const onGoToStrategies = () => {
    navigate({ key: 'InsightStrategies' });
  };

  const onHandleFollow = (id: number) => {
    const isFollowed = flwList.includes(id);
    isFollowed ? setFlwList(flwList.filter(item => item !== id)) : setFlwList([...flwList, id]);
  };

  return (
    <View
      style={[globalStyles.container, globalStyles.flexDirectionCol, globalStyles.justifySpaceAround, styles.container]}
    >
      {/* TITLE */}
      <View
        style={[
          globalStyles.flexDirectionRow,
          globalStyles.justifySpaceBetween,
          globalStyles.alignCenter,
          styles.blockTitleContainer,
        ]}
      >
        <View style={[globalStyles.flexDirectionRow]}>
          <Text style={[styles.blockTitleText]}>Investment Strategy - Equity</Text>
        </View>

        <TouchableOpacity
          onPress={onGoToStrategies}
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

      {/* Chart */}
      <View style={[globalStyles.flexDirectionCol, globalStyles.justifySpaceBetween, styles.blockContainer]}>
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

      {/* Action */}
      <View style={[globalStyles.justifyCenter, styles.actionContainer]}>
        <TouchableOpacity onPress={onGoToStrategies} style={[globalStyles.centered, styles.btnAction]}>
          <Text style={[styles.txtAction]}>See all Strategies</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InvestmentStrategy;
